import { DetailedPatientData } from '@/types/patient';

type ApiPatientData = {
  id: number;
  pasien: {
    nama_pasien: string;
    tanggal_lahir: string;
    umur_pasien: string;
    alamat_pasien: string;
    suku_pasien: string;
    kelainan_kotigental: string;
    pasien_anak_ke_berapa: string;
    jenis_kelamin: string;
    riwayat_kehamilan: string;
    riwayat_keluarga_pasien: string;
    riwayat_kawin_kerabat: string;
    riwayat_terdahulu: string;
  };
  tanggal_operasi: string;
  tehnik_operasi: string;
  nama_penyelenggara: string;
  lokasi_operasi: string;
  jenis_kelainan: { nama_kelainan: string };
  jenis_terapi: { nama_terapi: string };
  diagnosis: { nama_diagnosis: string };
  operator: { name: string };
  follow_up: string;
  created_at: string;
  updated_at: string;
  foto_sebelum_operasi: string | null;
  foto_setelah_operasi: string | null;
};

type ApiResponse = {
  data: ApiPatientData[] | ApiPatientData;
};

export async function getDetailedPatient(
  token: string,
  id: number
): Promise<DetailedPatientData[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/operasi/show/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

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

    const response: ApiResponse = await res.json();
    const dataArray = Array.isArray(response.data)
      ? response.data
      : [response.data];
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const mappedData = dataArray.map((item: ApiPatientData) => ({
      id: id,
      name: item.pasien.nama_pasien,
      birthDate: item.pasien.tanggal_lahir,
      age: item.pasien.umur_pasien,
      address: item.pasien.alamat_pasien,
      ethnicity: item.pasien.suku_pasien,
      congenitalAbnormalities: item.pasien.kelainan_kotigental,
      operationDate: item.tanggal_operasi,
      surgicalTechnique: item.tehnik_operasi,
      organizer: item.nama_penyelenggara,
      operationLocation: item.lokasi_operasi,
      childNumber: item.pasien.pasien_anak_ke_berapa,
      gender: item.pasien.jenis_kelamin,
      cleftType: item.jenis_kelainan.nama_kelainan,
      therapyType: item.jenis_terapi.nama_terapi,
      diagnosis: item.diagnosis.nama_diagnosis,
      pregnancyHistory: item.pasien.riwayat_kehamilan,
      familyHistory: item.pasien.riwayat_keluarga_pasien,
      relativeMarriageHistory: item.pasien.riwayat_kawin_kerabat,
      previousIllnessHistory: item.pasien.riwayat_terdahulu,
      followUp: item.follow_up,
      uploadedBy: item.operator.name,
      creationDate: item.created_at,
      lastUpdate: item.updated_at,
      preOpImage: item.foto_sebelum_operasi
        ? `${baseUrl}${item.foto_sebelum_operasi}`.replace('/api', '')
        : '',
      postOpImage: item.foto_setelah_operasi
        ? `${baseUrl}${item.foto_setelah_operasi}`.replace('/api', '')
        : '',
    }));
    return mappedData;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
