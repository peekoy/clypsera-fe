'use client';

import { useEffect, useState, type FormEvent, DragEvent } from 'react';
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
import { useParams, useRouter } from 'next/navigation';
import { DetailedPatientData, EditPatientPayload } from '@/types/patient';
import { getMyPatientById } from '@/lib/api/fetch-data-patient-by-id';
import { editPatientData } from '@/lib/api/edit-data-patient';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import Image from 'next/image';
import Swal from 'sweetalert2';
import {
  getTherapyTypes,
  getDiagnosisTypes,
  getCleftPalateTypes,
} from '@/lib/api/fetch-form-options';

type PatientFormState = DetailedPatientData & {
  patientName: string;
  congenitalComorbidities: string;
  whichChild: number;
  dateOfBirth: string;
  patientGender: string;
  dateOfSurgery: string;
  patientAge: number;
  operationTechnique: string;
  patientAddress: string;
  providerName: string;
  surgeryLocation: string;
  motherPregnancyHistory: string;
  residentsMaritalHistory: string;
  previousMedicalHistory: string;
  cleftPalateType: string;
};

export default function EditDataForm() {
  const params = useParams();
  const router = useRouter();
  const [patientData, setPatientData] = useState<PatientFormState | null>(null);

  const [beforeSurgeryFile, setBeforeSurgeryFile] = useState<File | null>(null);
  const [afterSurgeryFile, setAfterSurgeryFile] = useState<File | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);

  const [therapyOptions, setTherapyOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [diagnosisOptions, setDiagnosisOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [cleftPalateTypeOptions, setCleftPalateTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token tidak ditemukan');
      setIsFetchingData(false);
      return;
    }

    const fetchInitialData = async () => {
      try {
        const [patient, therapies, diagnoses, cleftTypes] = await Promise.all([
          getMyPatientById(token, Number.parseInt(params.id as string)),
          getTherapyTypes(token),
          getDiagnosisTypes(token),
          getCleftPalateTypes(token),
        ]);

        if (patient) {
          setPatientData({
            ...patient,
            patientName: patient.name,
            congenitalComorbidities: patient.congenitalAbnormalities,
            whichChild: parseFloat(patient.childNumber),
            dateOfBirth: patient.birthDate,
            dateOfSurgery: patient.operationDate,
            patientAge: parseFloat(patient.age),
            operationTechnique: patient.surgicalTechnique,
            providerName: patient.organizer,
            surgeryLocation: patient.operationLocation,
            patientGender: patient.gender,
            cleftPalateType: patient.cleftType,
            motherPregnancyHistory: patient.pregnancyHistory,
            residentsMaritalHistory: patient.relativeMarriageHistory,
            previousMedicalHistory: patient.previousIllnessHistory,
            patientAddress: patient.address,
          });
        }

        setTherapyOptions(therapies);
        setDiagnosisOptions(diagnoses);
        setCleftPalateTypeOptions(cleftTypes);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        Swal.fire(
          'Error',
          'Failed to load initial data. Please try again.',
          'error'
        );
      } finally {
        setIsFetchingData(false);
      }
    };

    fetchInitialData();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!patientData) return;
    setPatientData({
      ...patientData,
      [e.target.name]:
        e.target.type === 'number'
          ? parseFloat(e.target.value)
          : e.target.value,
    });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!patientData) return;
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (
    files: FileList | null,
    type: 'before' | 'after'
  ) => {
    if (files && files[0]) {
      const file = files[0];
      if (type === 'before') {
        setBeforeSurgeryFile(file);
      } else {
        setAfterSurgeryFile(file);
      }
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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to update this patient's data?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, update it!',
      customClass: {
        icon: 'no-border',
        cancelButton: 'swal-cancel-button-outline',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsSubmitting(true);
        const token = localStorage.getItem('token');

        if (!patientData) {
          Swal.fire('Error!', 'Patient data is not loaded yet.', 'error');
          setIsSubmitting(false);
          return;
        }

        const payloadToSend: EditPatientPayload = {
          patientName: patientData.patientName,
          congenitalComorbidities: patientData.congenitalComorbidities,
          whichChild: patientData.whichChild,
          dateOfBirth: patientData.dateOfBirth,
          patientGender: patientData.patientGender,
          dateOfSurgery: patientData.dateOfSurgery,
          patientAge: patientData.patientAge,
          operationTechnique: patientData.operationTechnique,
          patientAddress: patientData.patientAddress,
          providerName: patientData.providerName,
          ethnicity: patientData.ethnicity,
          surgeryLocation: patientData.surgeryLocation,
          motherPregnancyHistory: patientData.motherPregnancyHistory,
          familyHistory: patientData.familyHistory,
          residentsMaritalHistory: patientData.residentsMaritalHistory,
          previousMedicalHistory: patientData.previousMedicalHistory,
          followUp: patientData.followUp,
          cleftPalateType: patientData.cleftPalateType,
          therapyType: patientData.therapyType,
          diagnosis: patientData.diagnosis,
        };

        try {
          await editPatientData(
            token,
            Number(params.id),
            payloadToSend,
            beforeSurgeryFile ? [beforeSurgeryFile] : [],
            afterSurgeryFile ? [afterSurgeryFile] : []
          );
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Patient data has been updated successfully.',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            router.push('/my-data');
          });
        } catch (error: unknown) {
          const message =
            error instanceof Error
              ? error.message
              : 'An unknown error occurred.';
          console.error('Upload error:', message);
          Swal.fire(
            'Update Failed!',
            `Failed to update data: ${message}`,
            'error'
          );
        } finally {
          setIsSubmitting(false);
        }
      }
    });
  };

  if (isFetchingData) {
    return (
      <div className='flex items-center justify-center h-full'>
        <p>Loading patient data...</p>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className='flex items-center justify-center h-full'>
        <p>Patient data not found.</p>
      </div>
    );
  }

  return (
    <Card className='w-full p-0'>
      <CardHeader className='bg-gradient-to-r from-[#4F959D]/78 to-[#4971A9]/78 text-white rounded-lg p-6 gap-0'>
        <div className='flex justify-between items-center'>
          <CardTitle className='text-xl font-medium'>
            Edit Cleft Lip Patient Data
          </CardTitle>
          <Button
            type='submit'
            form='cleft-lip-form'
            className='bg-primary hover:bg-[#4971A9]/90 cursor-pointer text-white px-6'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className='px-6 pb-6'>
        <form
          id='cleft-lip-form'
          onSubmit={onSubmit}
          className='space-y-6 pt-6'
        >
          {/* ...Form fields... */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <label
                htmlFor='patientName'
                className='text-sm font-medium text-gray-700'
              >
                Patient Name
              </label>
              <Input
                name='patientName'
                className='bg-gray-100 border-0'
                value={patientData.patientName}
                onChange={handleChange}
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
                name='congenitalComorbidities'
                className='bg-gray-100 border-0'
                value={patientData.congenitalComorbidities}
                onChange={handleChange}
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
                value={patientData.whichChild}
                onChange={handleChange}
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
                      !patientData.dateOfBirth && 'text-muted-foreground'
                    )}
                  >
                    {patientData.dateOfBirth ? (
                      format(new Date(patientData.dateOfBirth), 'PPP')
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
                      patientData.dateOfBirth
                        ? new Date(patientData.dateOfBirth)
                        : undefined
                    }
                    onSelect={(date) =>
                      setPatientData({
                        ...patientData,
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
                      !patientData.dateOfSurgery && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {patientData.dateOfSurgery ? (
                      format(new Date(patientData.dateOfSurgery), 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={
                      patientData.dateOfSurgery
                        ? new Date(patientData.dateOfSurgery)
                        : undefined
                    }
                    onSelect={(date) =>
                      setPatientData({
                        ...patientData,
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
                  setPatientData({ ...patientData, patientGender: value })
                }
                name='patientGender'
                value={patientData.patientGender}
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
                value={patientData.patientAge}
                onChange={handleChange}
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
                name='operationTechnique'
                className='bg-gray-100 border-0'
                value={patientData.operationTechnique}
                onChange={handleChange}
                required
              />
            </div>
            {/* DIUBAH: Gunakan data dinamis untuk dropdown */}
            <div className='space-y-2'>
              <label
                htmlFor='cleftPalateType'
                className='text-sm font-medium text-gray-700'
              >
                Type of cleft palate categories
              </label>
              <Select
                onValueChange={(value) =>
                  setPatientData({ ...patientData, cleftPalateType: value })
                }
                name='cleftPalateType'
                value={patientData.cleftPalateType}
              >
                <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                  <SelectValue placeholder='Select type' />
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
                name='patientAddress'
                className='bg-gray-100 border-0'
                value={patientData.patientAddress}
                onChange={handleChange}
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
                name='providerName'
                className='bg-gray-100 border-0'
                value={patientData.providerName}
                onChange={handleChange}
                required
              />
            </div>
            {/* DIUBAH: Gunakan data dinamis untuk dropdown */}
            <div className='space-y-2'>
              <label
                htmlFor='therapyType'
                className='text-sm font-medium text-gray-700'
              >
                Type of therapy
              </label>
              <Select
                onValueChange={(value) =>
                  setPatientData({ ...patientData, therapyType: value })
                }
                name='therapyType'
                value={patientData.therapyType}
              >
                <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                  <SelectValue placeholder='Select therapy' />
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
                name='ethnicity'
                className='bg-gray-100 border-0'
                value={patientData.ethnicity}
                onChange={handleChange}
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
                name='surgeryLocation'
                className='bg-gray-100 border-0'
                value={patientData.surgeryLocation}
                onChange={handleChange}
                required
              />
            </div>
            {/* DIUBAH: Gunakan data dinamis untuk dropdown */}
            <div className='space-y-2'>
              <label
                htmlFor='diagnosis'
                className='text-sm font-medium text-gray-700'
              >
                Diagnosis
              </label>
              <Select
                onValueChange={(value) =>
                  setPatientData({ ...patientData, diagnosis: value })
                }
                name='diagnosis'
                value={patientData.diagnosis}
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
                value={patientData.motherPregnancyHistory}
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
                value={patientData.familyHistory}
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
                value={patientData.residentsMaritalHistory}
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
                value={patientData.previousMedicalHistory}
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
                value={patientData.followUp}
                onChange={handleTextAreaChange}
                required
              />
            </div>
          </div>
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
                    3. The patient&apos;s face must face the camera screen when
                    photographed.
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
                    {beforeSurgeryFile || patientData.preOpImage ? (
                      <div className='relative w-full h-full'>
                        <Image
                          src={
                            beforeSurgeryFile
                              ? URL.createObjectURL(beforeSurgeryFile)
                              : patientData.preOpImage
                          }
                          alt='Preview before surgery'
                          layout='fill'
                          className='object-contain rounded-lg'
                        />
                        <label
                          htmlFor='before-surgery'
                          className='absolute top-2 right-2 z-10'
                        >
                          <Button
                            type='button'
                            size='sm'
                            className='cursor-pointer bg-red-500 hover:bg-red-600 text-white'
                            asChild
                          >
                            <span>Change</span>
                          </Button>
                        </label>
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
                    {afterSurgeryFile || patientData.postOpImage ? (
                      <div className='relative w-full h-full'>
                        <Image
                          src={
                            afterSurgeryFile
                              ? URL.createObjectURL(afterSurgeryFile)
                              : patientData.postOpImage
                          }
                          alt='Preview after surgery'
                          layout='fill'
                          className='object-contain rounded-lg'
                        />
                        <label
                          htmlFor='after-surgery'
                          className='absolute top-2 right-2 z-10'
                        >
                          <Button
                            type='button'
                            size='sm'
                            className='cursor-pointer bg-red-500 hover:bg-red-600 text-white'
                            asChild
                          >
                            <span>Change</span>
                          </Button>
                        </label>
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
      </CardContent>
    </Card>
  );
}
