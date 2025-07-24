import { PatientData } from '@/types/patient';

type ApiPatient = {
  id: number;
  nama_pasien: string;
  umur_pasien: number;
  jenis_kelamin: 'P' | 'L';
  tanggal_lahir: string;
  operasi?: {
    tanggal_operasi?: string;
    nama_penyelenggara?: string;
    tehnik_operasi?: string;
    operator?: {
      name?: string;
    };
    jenis_terapi?: {
      nama_terapi?: string;
    };
  };
};

type ApiResponse = {
  data: ApiPatient[];
};

export async function getAllPatient(
  token: string
): Promise<PatientData[] | null> {
  try {
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
    const mappedData = apiResponse.data.map((item: ApiPatient) => ({
      id: item.id,
      patientName: item.nama_pasien,
      age: item.umur_pasien,
      gender: item.jenis_kelamin === 'P' ? 'Women' : 'Men',
      dateOfBirth: item.tanggal_lahir,
      operationDate: item.operasi?.tanggal_operasi ?? 'N/A',
      organizer: item.operasi?.nama_penyelenggara ?? 'N/A',
      operationalTechniques: item.operasi?.tehnik_operasi ?? 'N/A',
      uploadedBy: item.operasi?.operator?.name ?? 'N/A',
      therapyType: item.operasi?.jenis_terapi?.nama_terapi ?? 'N/A',
    }));
    return mappedData;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
