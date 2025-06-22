'use client';

import { useState, type FormEvent, useEffect } from 'react';
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
import { Plus, X } from 'lucide-react';
import { uploadPatientData } from '@/lib/api/upload-patient';

export default function CleftLipPatientForm() {
  const [formData, setFormData] = useState({
    patientName: '',
    congenitalComorbidities: '',
    whichChild: 0,
    dateOfBirth: '',
    patientGender: '',
    dateOfSurgery: '',
    patientAge: 0,
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
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await uploadPatientData(
        token,
        formData,
        beforeSurgeryFiles,
        afterSurgeryFiles
      );

      setSuccess('Data pasien berhasil diupload!');

      // Reset form
      // resetForm();
    } catch (error: any) {
      setError(error.message || 'Gagal mengupload data. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  // const resetForm = () => {
  //   setPatientName('');
  //   setCongenitalComorbidities('');
  //   setWhichChild('');
  //   setDateOfBirth('');
  //   setPatientGender('');
  //   setDateOfSurgery('');
  //   setPatientAge(undefined);
  //   setOperationTechnique('');
  //   setPatientAddress('');
  //   setProviderName('');
  //   setEthnicity('');
  //   setSurgeryLocation('');
  //   setMotherPregnancyHistory('');
  //   setFamilyHistory('');
  //   setResidentsMaritalHistory('');
  //   setPreviousMedicalHistory('');
  //   setFollowUp('');
  //   setCleftPalateType('');
  //   setTherapyType('');
  //   setDiagnosis('');
  //   setBeforeSurgeryFiles([]);
  //   setAfterSurgeryFiles([]);
  // };

  const handleFileUpload = (
    files: FileList | null,
    type: 'before' | 'after'
  ) => {
    if (files) {
      const fileArray = Array.from(files);

      // Validate file types
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

  // const removeFile = (index: number, type: 'before' | 'after') => {
  //   if (type === 'before') {
  //     setBeforeSurgeryFiles((prev) => prev.filter((_, i) => i !== index));
  //   } else {
  //     setAfterSurgeryFiles((prev) => prev.filter((_, i) => i !== index));
  //   }
  // };

  // const FileList = ({
  //   files,
  //   type,
  // }: {
  //   files: File[];
  //   type: 'before' | 'after';
  // }) => (
  //   <div className='mt-2 space-y-2'>
  //     {files.map((file, index) => (
  //       <div
  //         key={index}
  //         className='flex items-center justify-between bg-white p-2 rounded border'
  //       >
  //         <span className='text-sm text-gray-600 truncate'>{file.name}</span>
  //         <button
  //           type='button'
  //           onClick={() => removeFile(index, type)}
  //           className='text-red-500 hover:text-red-700'
  //         >
  //           <X className='h-4 w-4' />
  //         </button>
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <Card className='w-full p-0'>
      <CardHeader className='bg-gradient-to-r from-[#4F959D]/78 to-[#4971A9]/78 text-white rounded-lg p-6 gap-0'>
        <div className='flex justify-between items-center'>
          <CardTitle className='text-xl font-medium'>
            Upload Cleft Lip Patient Data
          </CardTitle>
          <Button
            type='submit'
            form='cleft-lip-form'
            className='bg-primary hover:bg-[#4971A9]/90 cursor-pointer text-white px-6'
          >
            Submit
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
                type='text'
                name='patientName'
                className='bg-gray-100 border-0'
                value={formData.patientName}
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
                type='text'
                name='congenitalComorbidities'
                className='bg-gray-100 border-0'
                value={formData.congenitalComorbidities}
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
                value={formData.whichChild}
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
                type='date'
                name='dateOfBirth'
                className='bg-gray-100 border-0'
                value={formData.dateOfBirth}
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
                type='date'
                name='dateOfSurgery'
                className='bg-gray-100 border-0'
                value={formData.dateOfSurgery}
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
                  setFormData({ ...formData, patientGender: value })
                }
                name='patientGender'
              >
                <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                  <SelectValue placeholder='Female' />
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
                type='text'
                name='patientAddress'
                className='bg-gray-100 border-0'
                value={formData.patientAddress}
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
                type='text'
                name='providerName'
                className='bg-gray-100 border-0'
                value={formData.providerName}
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
                  setFormData({ ...formData, therapyType: value })
                }
                name='therapyType'
              >
                <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                  <SelectValue placeholder='Labioshisis' />
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
                  <SelectValue placeholder='Labioschisis' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='labioschisis'>Labioschisis</SelectItem>
                  <SelectItem value='palatoschisis'>Palatoschisis</SelectItem>
                  <SelectItem value='labiopalatoshisis'>
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
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
