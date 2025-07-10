import { DetailedPatientData } from '@/types/patient';

export async function getMyPatientById(
  token: string,
  patientId: number
): Promise<DetailedPatientData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/pasien/show/${patientId}`,
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

    let data = await res.json();
    data = data.data[0];
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    return {
      id: data.id,
      name: data.nama_pasien,
      birthDate: data.tanggal_lahir,
      age: data.umur_pasien,
      address: data.alamat_pasien,
      ethnicity: data.suku_pasien,
      congenitalAbnormalities: data.kelainan_kotigental,
      operationDate: data.operasi.tanggal_operasi,
      surgicalTechnique: data.operasi.tehnik_operasi,
      organizer: data.operasi.nama_penyelenggara,
      operationLocation: data.operasi.lokasi_operasi,
      childNumber: data.pasien_anak_ke_berapa,
      gender: data.jenis_kelamin,
      cleftType: data.operasi.jenis_kelainan.nama_kelainan,
      therapyType: data.operasi.jenis_terapi.nama_terapi,
      diagnosis: data.operasi.diagnosis.nama_diagnosis,
      pregnancyHistory: data.riwayat_kehamilan,
      familyHistory: data.riwayat_keluarga_pasien,
      relativeMarriageHistory: data.riwayat_kawin_kerabat,
      previousIllnessHistory: data.riwayat_terdahulu,
      followUp: data.operasi.follow_up,
      uploadedBy: data.operasi.operator.name,
      creationDate: data.created_at,
      lastUpdate: data.updated_at,
      preOpImage: data.operasi.foto_sebelum_operasi
        ? `${baseUrl}${data.operasi.foto_sebelum_operasi}`.replace('/api', '')
        : '',
      postOpImage: data.operasi.foto_setelah_operasi
        ? `${baseUrl}${data.operasi.foto_setelah_operasi}`.replace('/api', '')
        : '',
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
