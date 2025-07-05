'use client';

import { useState, type FormEvent, useEffect, DragEvent } from 'react';
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
import { Calendar as CalendarIcon, Plus, X } from 'lucide-react';
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

  const [beforeSurgeryFiles, setBeforeSurgeryFiles] = useState<File[]>([]);
  const [afterSurgeryFiles, setAfterSurgeryFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
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

    // Tambahkan validasi untuk gambar di sini
    if (beforeSurgeryFiles.length === 0 || afterSurgeryFiles.length === 0) {
      Swal.fire({
        title: 'Error!',
        text: 'Please upload both before and after surgery photos.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
      setLoading(false); // Hentikan loading jika gambar belum diunggah
      return; // Hentikan eksekusi fungsi
    }

    setLoading(true);
    setError('');

    const payload = {
      ...formData,
      whichChild: Number(formData.whichChild) || 0,
      patientAge: Number(formData.patientAge) || 0,
    };

    try {
      await uploadPatientData(
        token,
        payload,
        beforeSurgeryFiles,
        afterSurgeryFiles
      );

      Swal.fire({
        title: 'Success!',
        text: 'Patient data has been successfully uploaded.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        router.push('/my-data');
      });
    } catch (error: any) {
      const errorMessage =
        error.message || 'Gagal mengupload data. Silakan coba lagi.';
      setError(errorMessage);
      Swal.fire({
        title: 'Upload Failed!',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false);
    }
  }

  const handleFileUpload = (
    files: FileList | null,
    type: 'before' | 'after'
  ) => {
    if (files) {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter((file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
          setError('Hanya file gambar yang diperbolehkan');
          return false;
        }
        return true;
      });

      if (type === 'before') {
        setBeforeSurgeryFiles((prev) => [...prev, ...validFiles]);
      } else {
        setAfterSurgeryFiles((prev) => [...prev, ...validFiles]);
      }
    }
  };

  const removeFile = (index: number, type: 'before' | 'after') => {
    if (type === 'before') {
      setBeforeSurgeryFiles((prev) => prev.filter((_, i) => i !== index));
    } else {
      setAfterSurgeryFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleDragEvents = (
    e: DragEvent<HTMLDivElement>,
    isEntering: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (isEntering) {
      setIsDragging(true);
    } else {
      setIsDragging(false);
    }
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

  const FilePreview = ({
    files,
    type,
  }: {
    files: File[];
    type: 'before' | 'after';
  }) => (
    <div className='mt-2 grid grid-cols-2 gap-2'>
      {files.map((file, index) => (
        <div key={index} className='relative'>
          <Image
            src={URL.createObjectURL(file)}
            alt={`preview ${index}`}
            width={100}
            height={100}
            className='w-full h-auto rounded-md'
          />
          <button
            type='button'
            onClick={() => removeFile(index, type)}
            className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700'
          >
            <X className='h-3 w-3' />
          </button>
        </div>
      ))}
    </div>
  );

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
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
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
        <form
          id='cleft-lip-form'
          onSubmit={(e) => e.preventDefault()}
          className='space-y-6 pt-6'
        >
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
                      'w-full justify-start text-left font-normal bg-gray-100 border-0',
                      !formData.dateOfBirth && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {formData.dateOfBirth ? (
                      format(new Date(formData.dateOfBirth), 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
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
                      'w-full justify-start text-left font-normal bg-gray-100 border-0',
                      !formData.dateOfSurgery && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {formData.dateOfSurgery ? (
                      format(new Date(formData.dateOfSurgery), 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
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
                  <SelectItem value='Sindromic Cleft'>
                    Sindromic Cleft
                  </SelectItem>
                  <SelectItem value='Nonsindromic Cleft'>
                    Nonsindromic Cleft
                  </SelectItem>
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
                  <SelectItem value='Labioshisis'>Labioshisis</SelectItem>
                  <SelectItem value='Palatoschisis'>Palatoschisis</SelectItem>
                  <SelectItem value='Labiopalatoschisis'>
                    Labiopalatoschisis
                  </SelectItem>
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
                  <SelectItem value='labioschisis'>Labioschisis</SelectItem>
                  <SelectItem value='palatoschisis'>Palatoschisis</SelectItem>
                  <SelectItem value='labiopalatoschisis'>
                    Labiopalatoschisis
                  </SelectItem>
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
                Patient's mother's pregnancy history
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
                Patient's family history
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
                Residents' marital history
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

          {/* Photo Upload Section */}
          <div className='bg-[#4F959D]/11 p-6 rounded-lg'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div>
                <h3 className='primary-color font-medium mb-3'>
                  Photo upload rules:
                </h3>
                <div className='text-md space-y-1'>
                  <p>1. The size must have a 1:1 ratio (eg: 512x512).</p>
                  <p>
                    2. The patient's eyes must be covered / given a black box to
                    cover their eyes.
                  </p>
                  <p>
                    3. The patient's face must face the camera screen when
                    photographed.
                  </p>
                  <p>
                    4. The patient's lips must be visible when photographed.
                  </p>
                </div>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='text-sm font-medium text-gray-700 mb-2 block'>
                    Photo before surgery
                  </label>
                  {beforeSurgeryFiles.length === 0 ? (
                    <div
                      className={cn(
                        'border-2 border-dashed border-[#4971A9] bg-[#4971A9]/11 rounded-lg p-8 text-center transition-colors',
                        isDragging && 'bg-blue-200 border-blue-500'
                      )}
                      onDragEnter={(e) => handleDragEvents(e, true)}
                      onDragLeave={(e) => handleDragEvents(e, false)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, 'before')}
                    >
                      <input
                        type='file'
                        multiple
                        accept='image/*'
                        onChange={(e) =>
                          handleFileUpload(e.target.files, 'before')
                        }
                        className='hidden'
                        id='before-surgery'
                        name='beforeSurgery'
                      />
                      <label
                        htmlFor='before-surgery'
                        className='flex items-center justify-center gap-2 cursor-pointer'
                      >
                        <Plus className='h-6 w-6 primary-color' />
                        <p className='primary-color text-sm'>
                          Add files{' '}
                          <span className='text-[#868686]'>
                            or drop files here
                          </span>
                        </p>
                      </label>
                    </div>
                  ) : (
                    <FilePreview files={beforeSurgeryFiles} type='before' />
                  )}
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-700 mb-2 block'>
                    Photo after surgery
                  </label>
                  {afterSurgeryFiles.length === 0 ? (
                    <div
                      className={cn(
                        'border-2 border-dashed border-[#4971A9] bg-[#4971A9]/11 rounded-lg p-8 text-center transition-colors',
                        isDragging && 'bg-blue-200 border-blue-500'
                      )}
                      onDragEnter={(e) => handleDragEvents(e, true)}
                      onDragLeave={(e) => handleDragEvents(e, false)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, 'after')}
                    >
                      <input
                        type='file'
                        multiple
                        accept='image/*'
                        onChange={(e) =>
                          handleFileUpload(e.target.files, 'after')
                        }
                        className='hidden'
                        id='after-surgery'
                        name='afterSurgery'
                      />
                      <label
                        htmlFor='after-surgery'
                        className='flex items-center justify-center gap-2 cursor-pointer'
                      >
                        <Plus className='h-6 w-6 primary-color' />
                        <p className='primary-color text-sm'>
                          Add files{' '}
                          <span className='text-[#868686]'>
                            or drop files here
                          </span>
                        </p>
                      </label>
                    </div>
                  ) : (
                    <FilePreview files={afterSurgeryFiles} type='after' />
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
