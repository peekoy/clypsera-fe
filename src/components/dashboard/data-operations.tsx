'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { DetailedPatientData } from '@/types/patient';
import { getDetailedPatient } from '@/lib/api/fetch-show-patient-data';
import { checkIfDataRequested } from '@/lib/api/check-request';
import { deleteRequest } from '@/lib/api/delete-request';

export default function OperationDetail() {
  const params = useParams();
  const router = useRouter();
  const [isDataRequested, setIsDataRequested] = useState(false);
  const [requestId, setRequestId] = useState<number | null>(null);
  const [statusRequest, setStatusRequest] = useState('');
  const [detailedPatient, setDetailedPatient] = useState<DetailedPatientData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  console.log('tata', detailedPatient);

  useEffect(() => {
    const fetchDetailedPatient = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token tidak ditemukan');
        return;
      }
      setIsLoading(true);
      let patient =
        (await getDetailedPatient(
          token,
          Number.parseInt(params.id as string)
        )) || [];

      console.log(patient);

      if (patient.length > 0) {
        setDetailedPatient(patient);
        const { requested, requestId, status } = await checkIfDataRequested(
          token,
          patient[0].id
        );
        console.log(requestId);
        setIsDataRequested(requested);
        setRequestId(requestId);
        setStatusRequest(status);
      }
      setIsLoading(false);
    };

    fetchDetailedPatient();
  }, []);

  console.log(detailedPatient);
  let detailPatient = detailedPatient[0];

  const handleBackToBrowse = () => {
    router.push('/browse-data');
  };

  const handleRequestData = () => {
    router.push(`/operations/${detailPatient.id}/request`);
  };

  const handleDownloadData = () => {
    router.push('');
  };

  const handleCancelRequest = async () => {
    if (!requestId) return;
    const token = localStorage.getItem('token');
    try {
      await deleteRequest(token!, requestId);
      setIsDataRequested(false);
      setRequestId(null);
      alert('Permohonan berhasil dibatalkan.');
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (!detailPatient) {
    return (
      <div className='flex justify-center items-center h-full p-6'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>
            Operation Data Not Found
          </h1>
          <p className='text-gray-600 mb-4'>
            The operation data you're looking for doesn't exist.
          </p>
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
          <div className='space-x-4'>
            {statusRequest === '' ? (
              <></>
            ) : (
              <Button
                className='bg-[#93BBF3] hover:bg-[#93BBF3]/90 cursor-pointer disabled:opacity-100'
                disabled
              >
                {statusRequest === 'pending'
                  ? 'Request Pending'
                  : statusRequest === 'approved'
                  ? 'Request Approved'
                  : 'Request Data'}
              </Button>
            )}

            <Button
              className='bg-primary hover:bg-[#4971A9]/90 cursor-pointer text-white px-6 disabled:opacity-50'
              onClick={
                statusRequest === 'pending'
                  ? handleCancelRequest
                  : statusRequest === 'approved'
                  ? handleDownloadData
                  : handleRequestData
              }
            >
              {statusRequest === 'pending'
                ? 'Cancel Request'
                : statusRequest === 'approved'
                ? 'Download Data'
                : 'Request Data'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex justify-between'>
        <div className='text-md space-y-4'>
          <p>
            <strong>Nama Pasien:</strong> {detailPatient.name}
          </p>
          <p>
            <strong>Tanggal Lahir:</strong> {detailPatient.birthDate}
          </p>
          <p>
            <strong>Umur Pasien:</strong> {detailPatient.age}
          </p>
          <p>
            <strong>Alamat Pasien:</strong> {detailPatient.address}
          </p>
          <p>
            <strong>Suku:</strong> {detailPatient.ethnicity}
          </p>
          <p>
            <strong>Kelainan Kongenital Penyerta</strong>{' '}
            {detailPatient.congenitalAbnormalities}
          </p>
          <p>
            <strong>Tanggal Operasi:</strong> {detailPatient.operationDate}
          </p>
          <p>
            <strong>Teknik Operasi Yang Digunakan:</strong>{' '}
            {detailPatient.surgicalTechnique}
          </p>
          <p>
            <strong>Nama Penyelenggara:</strong> {detailPatient.organizer}
          </p>
          <p>
            <strong>Lokasi Operasi:</strong> {detailPatient.operationLocation}
          </p>
          <p>
            <strong>Pasien Merupakan Anak Ke-berapa:</strong>{' '}
            {detailPatient.childNumber}
          </p>
          <p>
            <strong>Jenis Kelamin Pasien:</strong> {detailPatient.gender}
          </p>
          <p>
            <strong>Jenis Kelainan Cleft:</strong> {detailPatient.cleftType}
          </p>
          <p>
            <strong>Jenis Terapi:</strong> {detailPatient.therapyType}
          </p>
          <p>
            <strong>Diagnosa:</strong> {detailPatient.diagnosis}
          </p>
        </div>
        <Card className='rounded-xl w-150 p-0'>
          <CardContent className='p-6 space-y-4'>
            <div>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Riwayat kehamilan ibu dari pasien:
              </h3>
              <p className='text-sm text-gray-600'>
                {detailPatient.pregnancyHistory}
              </p>
            </div>
            <div>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Riwayat keluarga pasien:
              </h3>
              <p className='text-sm text-gray-600'>
                {detailPatient.familyHistory}
              </p>
            </div>
            <div>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Riwayat kawin kerabat:
              </h3>
              <p className='text-sm text-gray-600'>
                {detailPatient.relativeMarriageHistory}
              </p>
            </div>
            <div>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Riwayat penyakit terdahulu:
              </h3>
              <p className='text-sm text-gray-600'>
                {detailPatient.previousIllnessHistory}
              </p>
            </div>
            <div>
              <h3 className='font-semibold text-gray-800 mb-2'>Follow-up:</h3>
              <p className='text-sm text-gray-600'>{detailPatient.followUp}</p>
            </div>
            <div className='pt-4 border-t'>
              <div className='text-xs text-gray-500 space-y-1'>
                <p>
                  <span className='font-medium'>Data diuangah oleh:</span>{' '}
                  {detailPatient.uploadedBy}
                </p>
                <p>
                  <span className='font-medium'>Tanggal pembuatan data:</span>{' '}
                  {detailPatient.creationDate}
                </p>
                <p>
                  <span className='font-medium'>
                    Tanggal terakhir update data:
                  </span>{' '}
                  {detailPatient.lastUpdate}
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
                  src={detailPatient.preOpImage || '/placeholder.svg'}
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
                  src={detailPatient.postOpImage || '/placeholder.svg'}
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
