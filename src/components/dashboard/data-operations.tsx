'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Car } from 'lucide-react';
import Image from 'next/image';
import { getPatientById, type DetailedPatientData } from '@/data/data';

export default function OperationDetail() {
  const params = useParams();
  const router = useRouter();
  const [patient, setPatient] = useState<DetailedPatientData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const patientId = Number.parseInt(params.id as string);
    const patientData = getPatientById(patientId);

    setPatient(patientData);
    setLoading(false);
  }, [params.id]);

  const handleBackToBrowse = () => {
    router.push('/browse-data');
  };

  const handleRequestData = () => {
    router.push(`/operations/${patient?.id}/request`);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className='p-6'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>
            Operation Data Not Found
          </h1>
          <p className='text-gray-600 mb-4'>
            The operation data you're looking for doesn't exist.
          </p>
          <Button onClick={handleBackToBrowse}>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Browse Data
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className='mx-6 p-0'>
      <CardHeader className='bg-gradient-to-r from-[#4F959D]/78 to-[#4971A9]/78 text-white rounded-lg p-6 gap-0'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <CardTitle className='text-2xl font-bold'>Patient Data</CardTitle>
          </div>
          <Button
            className='bg-primary hover:bg-[#4971A9]/90 cursor-pointer text-white px-6'
            onClick={handleRequestData}
          >
            Request Data
          </Button>
        </div>
      </CardHeader>
      <CardContent className='flex justify-between'>
        <div className='text-md space-y-4'>
          <p>
            <strong>Nama Pasien:</strong> {patient.name}
          </p>
          <p>
            <strong>Tanggal Lahir:</strong> {patient.birthDate}
          </p>
          <p>
            <strong>Umur Pasien:</strong> {patient.age}
          </p>
          <p>
            <strong>Alamat Pasien:</strong> {patient.address}
          </p>
          <p>
            <strong>Suku:</strong> {patient.ethnicity}
          </p>
          <p>
            <strong>Kelainan Kongenital Penyerta</strong>{' '}
            {patient.congenitalAbnormalities}
          </p>
          <p>
            <strong>Tanggal Operasi:</strong> {patient.operationDate}
          </p>
          <p>
            <strong>Teknik Operasi Yang Digunakan:</strong>{' '}
            {patient.surgicalTechnique}
          </p>
          <p>
            <strong>Nama Penyelenggara:</strong> {patient.organizer}
          </p>
          <p>
            <strong>Lokasi Operasi:</strong> {patient.operationLocation}
          </p>
          <p>
            <strong>Pasien Merupakan Anak Ke-berapa:</strong>{' '}
            {patient.childNumber}
          </p>
          <p>
            <strong>Jenis Kelamin Pasien:</strong> {patient.gender}
          </p>
          <p>
            <strong>Jenis Kelainan Cleft:</strong> {patient.cleftType}
          </p>
          <p>
            <strong>Jenis Terapi:</strong> {patient.therapyType}
          </p>
          <p>
            <strong>Diagnosa:</strong> {patient.diagnosis}
          </p>
        </div>
        <Card className='rounded-xl w-150 p-0'>
          <CardContent className='p-6 space-y-4'>
            <div>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Riwayat kehamilan ibu dari pasien:
              </h3>
              <p className='text-sm text-gray-600'>
                {patient.pregnancyHistory}
              </p>
            </div>
            <div>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Riwayat keluarga pasien:
              </h3>
              <p className='text-sm text-gray-600'>{patient.familyHistory}</p>
            </div>
            <div>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Riwayat kawin kerabat:
              </h3>
              <p className='text-sm text-gray-600'>
                {patient.relativeMarriageHistory}
              </p>
            </div>
            <div>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Riwayat penyakit terdahulu:
              </h3>
              <p className='text-sm text-gray-600'>
                {patient.previousIllnessHistory}
              </p>
            </div>
            <div>
              <h3 className='font-semibold text-gray-800 mb-2'>Follow-up:</h3>
              <p className='text-sm text-gray-600'>{patient.followUp}</p>
            </div>
            <div className='pt-4 border-t'>
              <div className='text-xs text-gray-500 space-y-1'>
                <p>
                  <span className='font-medium'>Data diuangah oleh:</span>{' '}
                  {patient.uploadedBy}
                </p>
                <p>
                  <span className='font-medium'>Tanggal pembuatan data:</span>{' '}
                  {patient.creationDate}
                </p>
                <p>
                  <span className='font-medium'>
                    Tanggal terakhir update data:
                  </span>{' '}
                  {patient.lastUpdate}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>

      <Card className='rounded-xl bg-[#4F959D]/11 p-0 m-6'>
        <CardContent className='p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='text-center'>
              <div className='bg-white rounded-lg p-4 shadow-sm'>
                <Image
                  src={patient.preOpImage || '/placeholder.svg'}
                  alt='Pre-Operation'
                  width={200}
                  height={200}
                  className='mx-auto rounded-lg'
                />
              </div>
              <h3 className='mt-3 font-medium text-teal-600'>
                Pre-Op (Sebelum Operasi)
              </h3>
            </div>
            <div className='text-center'>
              <div className='bg-white rounded-lg p-4 shadow-sm'>
                <Image
                  src={patient.postOpImage || '/placeholder.svg'}
                  alt='Post-Operation'
                  width={200}
                  height={200}
                  className='mx-auto rounded-lg'
                />
              </div>
              <h3 className='mt-3 font-medium text-teal-600'>
                Post-Op (Setelah Operasi)
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </Card>
  );
}
