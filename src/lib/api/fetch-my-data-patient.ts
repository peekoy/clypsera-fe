import { MyDataPatient } from '@/types/patient';

// Definisikan tipe untuk data mentah dari API
type ApiPatient = {
  id: number;
  nama_pasien: string;
  umur_pasien: number;
  jenis_kelamin: 'P' | 'L';
  tanggal_lahir: string;
  operasi?: {
    operator?: {
      id: number;
      name: string;
    };
    tanggal_operasi?: string;
    lokasi_operasi?: string;
    tehnik_operasi?: string;
  };
};

// Definisikan tipe untuk response API
type ApiResponse = {
  data: ApiPatient[];
};

export async function getMyPatient(
  token: string
): Promise<MyDataPatient[] | null> {
  try {
    const userId = localStorage.getItem('userId');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/pasien`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
    });

    const contentType = res.headers.get('content-type');

    if (!res.ok) {
      const text = await res.text();
      console.error('Failed to fetch users:', res.status, text);
      return null;
    }

    if (!contentType?.includes('application/json')) {
      const text = await res.text();
      console.error('Expected JSON but got:', text);
      return null;
    }

    const apiResponse: ApiResponse = await res.json();

    const filteredData = apiResponse.data.filter(
      (item: ApiPatient) => item.operasi?.operator?.id === Number(userId)
    );

    console.log(filteredData);

    const mappedData = filteredData.map((item: ApiPatient) => ({
      id: item.id,
      patientName: item.nama_pasien,
      age: item.umur_pasien,
      gender: item.jenis_kelamin === 'P' ? 'Women' : 'Men',
      dateOfBirth: item.tanggal_lahir,
      operationDate: item.operasi?.tanggal_operasi ?? 'N/A',
      organizer: item.operasi?.lokasi_operasi ?? 'N/A',
      operationalTechniques: item.operasi?.tehnik_operasi ?? 'N/A',
      uploadedBy: item.operasi?.operator?.name ?? 'N/A',
    }));

    console.log('yaya', mappedData);
    return mappedData;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
