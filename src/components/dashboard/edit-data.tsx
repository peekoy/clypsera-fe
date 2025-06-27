'use client';

import { useEffect, useState, type FormEvent } from 'react';
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
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { DetailedPatientData, EditPatientPayload } from '@/types/patient';
import { getMyPatientById } from '@/lib/api/fetch-data-patient-by-id';
import { editPatientData } from '@/lib/api/edit-data-patient';

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

  console.log(patientData?.gender);

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
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientData({
      ...patientData,
      [e.target.name]:
        e.target.type === 'number'
          ? parseFloat(e.target.value)
          : e.target.value,
    } as PatientFormState);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    } as PatientFormState);
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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData(event.currentTarget);

    const formValues: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });

    const payloadToSend: EditPatientPayload = {
      patientName: formValues.patientName || '',
      congenitalComorbidities: formValues.congenitalComorbidities || '',
      whichChild: parseFloat(formValues.whichChild || '0'),
      dateOfBirth: formValues.dateOfBirth || '',
      patientGender: formValues.patientGender || '',
      dateOfSurgery: formValues.dateOfSurgery || '',
      patientAge: parseFloat(formValues.patientAge || '0'),
      operationTechnique: formValues.operationTechnique || '',
      patientAddress: formValues.patientAddress || '',
      providerName: formValues.providerName || '',
      ethnicity: formValues.ethnicity || '',
      surgeryLocation: formValues.surgeryLocation || '',
      motherPregnancyHistory: formValues.motherPregnancyHistory || '',
      familyHistory: formValues.familyHistory || '',
      residentsMaritalHistory: formValues.residentsMaritalHistory || '',
      previousMedicalHistory: formValues.previousMedicalHistory || '',
      followUp: formValues.followUp || '',
      cleftPalateType: formValues.cleftPalateType || '',
      therapyType: formValues.therapyType || '',
      diagnosis: formValues.diagnosis || '',
    };

    console.log('Payload to send:', payloadToSend);

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
      alert(error.message);
    }
  };

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
        <form id='cleft-lip-form' onSubmit={onSubmit} className='space-y-6'>
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
                value={patientData?.patientName || ''}
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
                value={patientData?.congenitalComorbidities || ''}
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
                value={patientData?.whichChild || ''}
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
              <Input
                name='dateOfBirth'
                type='date'
                className='bg-gray-100 border-0'
                value={patientData?.dateOfBirth || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className='space-y-2'>
              <label
                htmlFor='dateOfSurgery'
                className='text-sm font-medium text-gray-700'
              >
                Date of Surgery
              </label>
              <Input
                name='dateOfSurgery'
                type='date'
                className='bg-gray-100 border-0'
                value={patientData?.dateOfSurgery || ''}
                onChange={handleChange}
                required
              />
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
                  setPatientData({
                    ...patientData,
                    patientGender: value,
                  } as PatientFormState)
                }
                name='patientGender'
                value={
                  patientData?.patientGender === 'L'
                    ? 'male'
                    : patientData?.patientGender === 'P'
                    ? 'female'
                    : ''
                }
              >
                <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                  <SelectValue placeholder='Female' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='female'>Female</SelectItem>
                  <SelectItem value='male'>Male</SelectItem>
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
                value={patientData?.patientAge || ''}
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
                value={patientData?.operationTechnique || ''}
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
                  setPatientData({
                    ...patientData,
                    cleftPalateType: value,
                  } as PatientFormState)
                }
                name='cleftPalateType'
                value={
                  patientData?.cleftPalateType === 'Sindromic Cleft'
                    ? 'Sindromic Cleft'
                    : patientData?.cleftPalateType === 'Nonsindromic Cleft'
                    ? 'Nonsindromic Cleft'
                    : ''
                }
              >
                <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                  <SelectValue placeholder='Sindromic Cleft' />
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
                value={patientData?.patientAddress || ''}
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
                value={patientData?.providerName || ''}
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
                  setPatientData({
                    ...patientData,
                    therapyType: value,
                  } as PatientFormState)
                }
                name='therapyType'
                value={patientData?.therapyType || ''}
              >
                <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                  <SelectValue placeholder='Palatoschisis' />
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
                value={patientData?.ethnicity || ''}
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
                value={patientData?.surgeryLocation || ''}
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
                  setPatientData({
                    ...patientData,
                    diagnosis: value,
                  } as PatientFormState)
                }
                name='diagnosis'
                value={patientData?.diagnosis || ''}
              >
                <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                  <SelectValue placeholder='Labioschisis' />
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
                value={patientData?.motherPregnancyHistory || ''}
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
                value={patientData?.familyHistory || ''}
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
                value={patientData?.residentsMaritalHistory || ''}
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
                value={patientData?.previousMedicalHistory || ''}
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
                value={patientData?.followUp || ''}
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
                  <div className='border-2 border-dashed border-[#4971A9] bg-[#4971A9]/11 rounded-lg p-8 text-center'>
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
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-700 mb-2 block'>
                    Photo after surgery
                  </label>
                  <div className='border-2 border-dashed border-[#4971A9] bg-[#4971A9]/11 rounded-lg p-8 text-center'>
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
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
