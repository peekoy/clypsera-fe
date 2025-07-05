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
import { Calendar as CalendarIcon, Plus, X } from 'lucide-react';
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
  const [beforeSurgeryFiles, setBeforeSurgeryFiles] = useState<File[]>([]);
  const [afterSurgeryFiles, setAfterSurgeryFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const fetchPatientById = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('Token tidak ditemukan');
          return;
        }
        let patient = await getMyPatientById(
          token,
          Number.parseInt(params.id as string)
        );
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
      } catch (error) {
        console.error('Failed to fetch patient:', error);
      }
    };
    fetchPatientById();
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
    if (files) {
      const fileArray = Array.from(files);
      if (type === 'before') {
        setBeforeSurgeryFiles(fileArray);
      } else {
        setAfterSurgeryFiles(fileArray);
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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    if (!patientData) {
      alert('Patient data is not loaded yet.');
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
        beforeSurgeryFiles,
        afterSurgeryFiles
      );
      alert('Data berhasil diperbarui!');
      router.push('/my-data');
    } catch (error: any) {
      console.error('Upload error:', error.message);
      alert(`Gagal memperbarui data: ${error.message}`);
    }
  };

  if (!patientData) {
    return (
      <div className='flex items-center justify-center h-full'>
        <p>Loading patient data...</p>
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
          >
            Update
          </Button>
        </div>
      </CardHeader>
      <CardContent className='px-6 pb-6'>
        <form
          id='cleft-lip-form'
          onSubmit={onSubmit}
          className='space-y-6 pt-6'
        >
          {/* Patient Details */}
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
                      'w-full justify-start text-left font-normal bg-gray-100 border-0',
                      !patientData.dateOfBirth && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {patientData.dateOfBirth ? (
                      format(new Date(patientData.dateOfBirth), 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
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
                  <SelectItem value='Labioschisis'>Labioschisis</SelectItem>
                  <SelectItem value='Palatoschisis'>Palatoschisis</SelectItem>
                  <SelectItem value='Labiopalatoshisis'>
                    Labiopalatoshisis
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
                Patient's family history
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
                Residents' marital history
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
                  <div
                    className={cn(
                      'border-2 border-dashed border-[#4971A9] bg-[#4971A9]/11 rounded-lg p-4 text-center transition-colors',
                      isDragging && 'bg-blue-200 border-blue-500'
                    )}
                    onDragEnter={(e) => handleDragEvents(e, true)}
                    onDragLeave={(e) => handleDragEvents(e, false)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, 'before')}
                  >
                    {beforeSurgeryFiles.length > 0 ? (
                      <FilePreview files={beforeSurgeryFiles} type='before' />
                    ) : patientData.preOpImage ? (
                      <div className='relative'>
                        <Image
                          src={patientData.preOpImage}
                          alt='Preview before surgery'
                          width={200}
                          height={200}
                          className='w-full h-auto rounded-md'
                        />
                        <Button
                          type='button'
                          size='sm'
                          onClick={() =>
                            setPatientData({ ...patientData, preOpImage: '' })
                          }
                          className='absolute cursor-pointer  top-1 right-1 bg-red-500 hover:bg-red-600 text-white'
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor='before-surgery'
                        className='flex items-center justify-center gap-2 cursor-pointer h-full py-4'
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
                          name='foto_sebelum_operasi'
                        />
                        <Plus className='h-6 w-6 primary-color' />
                        <p className='primary-color text-sm'>
                          Add files{' '}
                          <span className='text-[#868686]'>
                            or drop files here
                          </span>
                        </p>
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-700 mb-2 block'>
                    Photo after surgery
                  </label>
                  <div
                    className={cn(
                      'border-2 border-dashed border-[#4971A9] bg-[#4971A9]/11 rounded-lg p-4 text-center transition-colors',
                      isDragging && 'bg-blue-200 border-blue-500'
                    )}
                    onDragEnter={(e) => handleDragEvents(e, true)}
                    onDragLeave={(e) => handleDragEvents(e, false)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, 'after')}
                  >
                    {afterSurgeryFiles.length > 0 ? (
                      <FilePreview files={afterSurgeryFiles} type='after' />
                    ) : patientData.postOpImage ? (
                      <div className='relative'>
                        <Image
                          src={patientData.postOpImage}
                          alt='Preview after surgery'
                          width={200}
                          height={200}
                          className='w-full h-auto rounded-md'
                        />
                        <Button
                          type='button'
                          size='sm'
                          onClick={() =>
                            setPatientData({ ...patientData, postOpImage: '' })
                          }
                          className='absolute cursor-pointer top-1 right-1 bg-red-500 hover:bg-red-600 text-white'
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor='after-surgery'
                        className='flex items-center justify-center gap-2 cursor-pointer h-full py-4'
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
                          name='foto_setelah_operasi'
                        />
                        <Plus className='h-6 w-6 primary-color' />
                        <p className='primary-color text-sm'>
                          Add files{' '}
                          <span className='text-[#868686]'>
                            or drop files here
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
