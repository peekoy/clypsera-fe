'use client';

import { useState, useEffect, DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { uploadPatientData } from '@/lib/api/upload-patient';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Swal from 'sweetalert2';
import {
  getTherapyTypes,
  getDiagnosisTypes,
  getCleftPalateTypes,
} from '@/lib/api/fetch-form-options';

export default function CleftLipPatientForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    patientName: '',
    congenitalComorbidities: '',
    whichChild: '',
    dateOfBirth: '',
    patientGender: '',
    dateOfSurgery: '',
    patientAge: '',
    operationTechnique: '',
    patientAddress: '',
    providerName: '',
    ethnicity: '',
    surgeryLocation: '',
    motherPregnancyHistory: '',
    familyHistory: '',
    residentsMaritalHistory: '',
    previousMedicalHistory: '',
    followUp: '',
    cleftPalateType: '',
    therapyType: '',
    diagnosis: '',
  });

  const [therapyOptions, setTherapyOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [diagnosisOptions, setDiagnosisOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [cleftPalateTypeOptions, setCleftPalateTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [beforeSurgeryFile, setBeforeSurgeryFile] = useState<File | null>(null);
  const [afterSurgeryFile, setAfterSurgeryFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingOptions, setIsFetchingOptions] = useState(true);

  const [token, setToken] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    const fetchOptions = async () => {
      if (!storedToken) {
        console.error('Token not found for fetching form options.');
        setIsFetchingOptions(false);
        return;
      }
      try {
        const [therapies, diagnoses, cleftTypes] = await Promise.all([
          getTherapyTypes(storedToken),
          getDiagnosisTypes(storedToken),
          getCleftPalateTypes(storedToken),
        ]);
        setTherapyOptions(therapies);
        setDiagnosisOptions(diagnoses);
        setCleftPalateTypeOptions(cleftTypes);
      } catch (error) {
        console.error('Failed to load form options', error);
      } finally {
        setIsFetchingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fieldLabels: { [key: string]: string } = {
    patientName: 'Patient Name',
    congenitalComorbidities: 'Congenital Comorbidities',
    whichChild: 'Which Child',
    dateOfBirth: 'Date Of Birth',
    patientGender: 'Patient Gender',
    dateOfSurgery: 'Date of Surgery',
    patientAge: 'Patient Age',
    operationTechnique: 'Operation Technique',
    patientAddress: 'Patient Address',
    providerName: 'Provider Name',
    ethnicity: 'Ethnicity',
    surgeryLocation: 'Surgery Location',
    motherPregnancyHistory: 'Mother Pregnancy History',
    familyHistory: 'Family History',
    residentsMaritalHistory: 'Residents Marital History',
    previousMedicalHistory: 'Previous Medical History',
    followUp: 'Follow Up',
    cleftPalateType: 'Cleft Palate Type',
    therapyType: 'Therapy Type',
    diagnosis: 'Diagnosis',
  };

  async function handleConfirmSubmit() {
    const requiredFields = Object.keys(fieldLabels);
    const emptyFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (emptyFields.length > 0) {
      const emptyFieldLabels = emptyFields.map((field) => fieldLabels[field]);
      Swal.fire({
        title: 'Error!',
        text: `Please fill in all required fields: ${emptyFieldLabels.join(
          ', '
        )}`,
        icon: 'error',
        confirmButtonColor: '#d33',
      });
      return;
    }

    if (!beforeSurgeryFile || !afterSurgeryFile) {
      Swal.fire({
        title: 'Error!',
        text: 'Please upload both before and after surgery photos.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      whichChild: Number(formData.whichChild) || 0,
      patientAge: Number(formData.patientAge) || 0,
    };

    try {
      await uploadPatientData(
        token,
        payload,
        [beforeSurgeryFile],
        [afterSurgeryFile]
      );

      Swal.fire({
        title: 'Success!',
        text: 'Patient data has been successfully uploaded.',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        router.push('/my-data');
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Gagal mengupload data. Silakan coba lagi.';
      Swal.fire({
        title: 'Upload Failed!',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleFileUpload = (
    files: FileList | null,
    type: 'before' | 'after'
  ) => {
    if (files && files[0]) {
      const file = files[0];
      const isImage = file.type.startsWith('image/');
      if (isImage) {
        if (type === 'before') {
          setBeforeSurgeryFile(file);
        } else {
          setAfterSurgeryFile(file);
        }
      }
    }
  };

  const removeFile = (type: 'before' | 'after') => {
    if (type === 'before') {
      setBeforeSurgeryFile(null);
    } else {
      setAfterSurgeryFile(null);
    }
  };

  const handleDragEvents = (
    e: DragEvent<HTMLDivElement>,
    isEntering: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEntering);
  };

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    type: 'before' | 'after'
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files, type);
  };

  return (
    <Card className='w-full p-0'>
      <CardHeader className='bg-gradient-to-r from-[#4F959D]/78 to-[#4971A9]/78 text-white rounded-lg p-6 gap-0'>
        <div className='flex justify-between items-center'>
          <CardTitle className='text-xl font-medium'>
            Upload Cleft Lip Patient Data
          </CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type='button'
                className='bg-primary hover:bg-[#4971A9]/90 cursor-pointer text-white px-6'
                disabled={isSubmitting || isFetchingOptions}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Data Submission</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure all the data you entered is correct? This action
                  will submit the patient data to the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className='cursor-pointer'>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className='hover:bg-[#4971A9]/90 cursor-pointer'
                  onClick={handleConfirmSubmit}
                >
                  Yes, Submit Data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent className='px-6 pb-6'>
        {isFetchingOptions ? (
          <div className='flex justify-center items-center h-96'>
            <p>Loading form options...</p>
          </div>
        ) : (
          <form
            id='cleft-lip-form'
            onSubmit={(e) => e.preventDefault()}
            className='space-y-6 pt-6'
          >
            {/* ... Isi form Anda ... */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='patientName'
                  className='text-sm font-medium text-gray-700'
                >
                  Patient Name
                </label>
                <Input
                  type='text'
                  name='patientName'
                  className='bg-gray-100 border-0'
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="Enter patient's name"
                  required
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='congenitalComorbidities'
                  className='text-sm font-medium text-gray-700'
                >
                  Congenital comorbidities
                </label>
                <Input
                  type='text'
                  name='congenitalComorbidities'
                  className='bg-gray-100 border-0'
                  value={formData.congenitalComorbidities}
                  onChange={handleChange}
                  placeholder='Enter congenital comorbidities'
                  required
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='whichChild'
                  className='text-sm font-medium text-gray-700'
                >
                  Which child is the patient?
                </label>
                <Input
                  type='number'
                  name='whichChild'
                  className='bg-gray-100 border-0'
                  value={formData.whichChild}
                  onChange={handleChange}
                  placeholder='Enter child number'
                  required
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='dateOfBirth'
                  className='text-sm font-medium text-gray-700'
                >
                  Date of Birth
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-between text-left font-normal bg-gray-100 border-0',
                        !formData.dateOfBirth && 'text-muted-foreground'
                      )}
                    >
                      {formData.dateOfBirth ? (
                        format(new Date(formData.dateOfBirth), 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='mr-2 h-4 w-4' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={
                        formData.dateOfBirth
                          ? new Date(formData.dateOfBirth)
                          : undefined
                      }
                      onSelect={(date) =>
                        setFormData({
                          ...formData,
                          dateOfBirth: date ? format(date, 'yyyy-MM-dd') : '',
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='dateOfSurgery'
                  className='text-sm font-medium text-gray-700'
                >
                  Date of Surgery
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-between text-left font-normal bg-gray-100 border-0',
                        !formData.dateOfSurgery && 'text-muted-foreground'
                      )}
                    >
                      {formData.dateOfSurgery ? (
                        format(new Date(formData.dateOfSurgery), 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='mr-2 h-4 w-4' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={
                        formData.dateOfSurgery
                          ? new Date(formData.dateOfSurgery)
                          : undefined
                      }
                      onSelect={(date) =>
                        setFormData({
                          ...formData,
                          dateOfSurgery: date ? format(date, 'yyyy-MM-dd') : '',
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='patientGender'
                  className='text-sm font-medium text-gray-700'
                >
                  Patient gender
                </label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, patientGender: value })
                  }
                  name='patientGender'
                >
                  <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                    <SelectValue placeholder='Select gender' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='P'>Female</SelectItem>
                    <SelectItem value='L'>Male</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='patientAge'
                  className='text-sm font-medium text-gray-700'
                >
                  Patient Age
                </label>
                <Input
                  type='number'
                  name='patientAge'
                  className='bg-gray-100 border-0'
                  value={formData.patientAge}
                  onChange={handleChange}
                  placeholder="Enter patient's age"
                  required
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='operationTechnique'
                  className='text-sm font-medium text-gray-700'
                >
                  Operation technique used
                </label>
                <Input
                  type='text'
                  name='operationTechnique'
                  className='bg-gray-100 border-0'
                  value={formData.operationTechnique}
                  onChange={handleChange}
                  placeholder='Enter operation technique'
                  required
                />
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor='cleftPalateType'
                  className='text-sm font-medium text-gray-700'
                >
                  Type of cleft palate categories
                </label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, cleftPalateType: value })
                  }
                  name='cleftPalateType'
                >
                  <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                    <SelectValue placeholder='Select cleft palate type' />
                  </SelectTrigger>
                  <SelectContent>
                    {cleftPalateTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='patientAddress'
                  className='text-sm font-medium text-gray-700'
                >
                  Patient Address
                </label>
                <Input
                  type='text'
                  name='patientAddress'
                  className='bg-gray-100 border-0'
                  value={formData.patientAddress}
                  onChange={handleChange}
                  placeholder="Enter patient's address"
                  required
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='providerName'
                  className='text-sm font-medium text-gray-700'
                >
                  Name of provider
                </label>
                <Input
                  type='text'
                  name='providerName'
                  className='bg-gray-100 border-0'
                  value={formData.providerName}
                  onChange={handleChange}
                  placeholder='Enter provider name'
                  required
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='therapyType'
                  className='text-sm font-medium text-gray-700'
                >
                  Type of therapy
                </label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, therapyType: value })
                  }
                  name='therapyType'
                >
                  <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                    <SelectValue placeholder='Select therapy type' />
                  </SelectTrigger>
                  <SelectContent>
                    {therapyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='ethnicity'
                  className='text-sm font-medium text-gray-700'
                >
                  Ethnicity
                </label>
                <Input
                  type='text'
                  name='ethnicity'
                  className='bg-gray-100 border-0'
                  value={formData.ethnicity}
                  onChange={handleChange}
                  placeholder='Enter ethnicity'
                  required
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='surgeryLocation'
                  className='text-sm font-medium text-gray-700'
                >
                  Location of surgery
                </label>
                <Input
                  type='text'
                  name='surgeryLocation'
                  className='bg-gray-100 border-0'
                  value={formData.surgeryLocation}
                  onChange={handleChange}
                  placeholder='Enter surgery location'
                  required
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='diagnosis'
                  className='text-sm font-medium text-gray-700'
                >
                  Diagnosis
                </label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, diagnosis: value })
                  }
                  name='diagnosis'
                >
                  <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                    <SelectValue placeholder='Select diagnosis' />
                  </SelectTrigger>
                  <SelectContent>
                    {diagnosisOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='motherPregnancyHistory'
                  className='text-sm font-medium text-gray-700'
                >
                  Patient&apos;s mother&apos;s pregnancy history
                </label>
                <Textarea
                  name='motherPregnancyHistory'
                  placeholder="Please fill in the patient's mother's pregnancy history"
                  className='bg-gray-100 border-0 min-h-[100px] text-sm'
                  value={formData.motherPregnancyHistory}
                  onChange={handleTextAreaChange}
                  required
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='familyHistory'
                  className='text-sm font-medium text-gray-700'
                >
                  Patient&apos;s family history
                </label>
                <Textarea
                  name='familyHistory'
                  placeholder="Please fill in the patient's family history"
                  className='bg-gray-100 border-0 min-h-[100px] text-sm'
                  value={formData.familyHistory}
                  onChange={handleTextAreaChange}
                  required
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='residentsMaritalHistory'
                  className='text-sm font-medium text-gray-700'
                >
                  Residents&apos; marital history
                </label>
                <Textarea
                  name='residentsMaritalHistory'
                  placeholder="Residents' marital history"
                  className='bg-gray-100 border-0 min-h-[100px] text-sm'
                  value={formData.residentsMaritalHistory}
                  onChange={handleTextAreaChange}
                  required
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='previousMedicalHistory'
                  className='text-sm font-medium text-gray-700'
                >
                  Previous medical history
                </label>
                <Textarea
                  name='previousMedicalHistory'
                  placeholder="Please fill in the patient's previous medical history"
                  className='bg-gray-100 border-0 min-h-[120px] text-sm'
                  value={formData.previousMedicalHistory}
                  onChange={handleTextAreaChange}
                  required
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='followUp'
                  className='text-sm font-medium text-gray-700'
                >
                  Follow up
                </label>
                <Textarea
                  name='followUp'
                  placeholder='Please fill in the follow up'
                  className='bg-gray-100 border-0 min-h-[120px] text-sm'
                  value={formData.followUp}
                  onChange={handleTextAreaChange}
                  required
                />
              </div>
            </div>

            {/* DIUBAH: Struktur JSX untuk Photo Upload Section */}
            <div className='bg-[#4F959D]/11 p-6 rounded-lg'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div>
                  <h3 className='primary-color font-medium mb-3'>
                    Photo upload rules:
                  </h3>
                  <div className='text-md space-y-1'>
                    <p>1. The size must have a 1:1 ratio (eg: 512x512).</p>
                    <p>
                      2. The patient&apos;s eyes must be covered / given a black
                      box to cover their eyes.
                    </p>
                    <p>
                      3. The patient&apos;s face must face the camera screen
                      when photographed.
                    </p>
                    <p>
                      4. The patient&apos;s lips must be visible when
                      photographed.
                    </p>
                  </div>
                </div>

                <div className='space-y-4'>
                  {/* Before Surgery Upload */}
                  <div>
                    <label className='text-sm font-medium text-gray-700 mb-2 block'>
                      Photo before surgery
                    </label>
                    <div
                      className={cn(
                        'relative border-2 border-dashed border-[#4971A9] bg-[#4971A9]/11 rounded-lg p-4 h-48 flex justify-center items-center transition-colors',
                        isDragging && 'bg-blue-200 border-blue-500'
                      )}
                      onDragEnter={(e) => handleDragEvents(e, true)}
                      onDragLeave={(e) => handleDragEvents(e, false)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, 'before')}
                    >
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(e) =>
                          handleFileUpload(e.target.files, 'before')
                        }
                        className='hidden'
                        id='before-surgery'
                      />
                      {beforeSurgeryFile ? (
                        <div className='relative w-full h-full'>
                          <Image
                            src={URL.createObjectURL(beforeSurgeryFile)}
                            alt='Preview before surgery'
                            layout='fill'
                            className='object-contain rounded-lg'
                          />
                          <Button
                            type='button'
                            size='sm'
                            variant='destructive'
                            onClick={() => removeFile('before')}
                            className='absolute top-2 right-2 h-7 w-auto px-2 z-10 cursor-pointer'
                          >
                            Change
                          </Button>
                        </div>
                      ) : (
                        <label
                          htmlFor='before-surgery'
                          className='flex items-center justify-center gap-2 cursor-pointer w-full h-full'
                        >
                          <Plus className='h-6 w-6 primary-color' />
                          <p className='primary-color text-sm'>
                            Add file{' '}
                            <span className='text-[#868686]'>
                              or drop file here
                            </span>
                          </p>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* After Surgery Upload */}
                  <div>
                    <label className='text-sm font-medium text-gray-700 mb-2 block'>
                      Photo after surgery
                    </label>
                    <div
                      className={cn(
                        'relative border-2 border-dashed border-[#4971A9] bg-[#4971A9]/11 rounded-lg p-4 h-48 flex justify-center items-center transition-colors',
                        isDragging && 'bg-blue-200 border-blue-500'
                      )}
                      onDragEnter={(e) => handleDragEvents(e, true)}
                      onDragLeave={(e) => handleDragEvents(e, false)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, 'after')}
                    >
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(e) =>
                          handleFileUpload(e.target.files, 'after')
                        }
                        className='hidden'
                        id='after-surgery'
                      />
                      {afterSurgeryFile ? (
                        <div className='relative w-full h-full'>
                          <Image
                            src={URL.createObjectURL(afterSurgeryFile)}
                            alt='Preview after surgery'
                            layout='fill'
                            className='object-contain rounded-lg'
                          />
                          <Button
                            type='button'
                            size='sm'
                            variant='destructive'
                            onClick={() => removeFile('after')}
                            className='absolute top-2 right-2 h-7 w-auto px-2 z-10 cursor-pointer'
                          >
                            Change
                          </Button>
                        </div>
                      ) : (
                        <label
                          htmlFor='after-surgery'
                          className='flex items-center justify-center gap-2 cursor-pointer w-full h-full'
                        >
                          <Plus className='h-6 w-6 primary-color' />
                          <p className='primary-color text-sm'>
                            Add file{' '}
                            <span className='text-[#868686]'>
                              or drop file here
                            </span>
                          </p>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
