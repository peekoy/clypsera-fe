import { DetailedPatientData } from '@/types/patient';

export async function getDetailedPatient(
  token: string,
  id: number
): Promise<DetailedPatientData[] | null> {
  try {
    const res = await fetch(
      `https://dd13-118-99-106-123.ngrok-free.app/api/operasi/show/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    console.log('Fetching patient ID:', id);

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

    let response = await res.json();
    const dataArray = Array.isArray(response.data)
      ? response.data
      : [response.data];

    const mappedData = dataArray.map((item: any) => ({
      id: id,
      name: item.pasien.nama_pasien,
      birthDate: item.pasien.tanggal_lahir,
      age: item.pasien.umur_pasien,
      address: item.pasien.alamat_pasien,
      ethnicity: item.pasien.suku_pasien,
      congenitalAbnormalities: item.pasien.kelainan_kotigental,
      operationDate: item.tanggal_operasi,
      surgicalTechnique: item.tehnik_operasi,
      organizer: item.nama_penyelengara,
      operationLocation: item.lokasi_operasi,
      childNumber: item.pasien.pasien_anak_ke_berapa,
      gender: item.pasien.jenis_kelamin,
      cleftType: item.jenis_kelainan.nama_kelainan,
      therapyType: item.jenis_terapi.nama_terapi,
      diagnosis: item.diagnosis.nama_diagnosis,
      pregnancyHistory: item.pasien.riwayat_kehamilan,
      familyHistory: item.pasien.riwayat_keluarga_pasien,
      relativeMarriageHistory: item.pasien.riwayat_kawin_berabat,
      previousIllnessHistory: item.pasien.riwayat_terdahulu,
      followUp: item.follow_up,
      uploadedBy: item.operator.name,
      creationDate: item.created_at,
      lastUpdate: item.updated_at,
      preOpImage: item.foto_sebelum_operasi,
      postOpImage: item.foto_setelah_operasi,
    }));
    console.log('yaya', mappedData);
    return mappedData;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
