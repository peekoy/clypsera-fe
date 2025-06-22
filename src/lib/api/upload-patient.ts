import { AddPatienPayload } from '@/types/patient';

export async function uploadPatientData(
  token: string | null,
  payload: AddPatienPayload,
  beforeFiles: File[],
  afterFiles: File[]
) {
  try {
    if (!token) {
      throw new Error('Authentication token is required');
    }

    const diagnosisResponse = await fetch(
      'https://0b2d-118-99-106-123.ngrok-free.app/api/diagnosis',
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    const diagnosisData = await diagnosisResponse.json();
    const matchedDiagnosis = diagnosisData.data.find(
      (item: any) =>
        item.nama_diagnosis.toLowerCase() === payload.diagnosis.toLowerCase()
    );

    const jenisKelainanResponse = await fetch(
      'https://0b2d-118-99-106-123.ngrok-free.app/api/jenis-kelainan',
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    const jenisKelainanData = await jenisKelainanResponse.json();
    const matchedJenisKelainan = jenisKelainanData.data.find(
      (item: any) =>
        item.nama_kelainan.toLowerCase() ===
        payload.cleftPalateType.toLowerCase()
    );

    const jenisTerapiResponse = await fetch(
      'https://0b2d-118-99-106-123.ngrok-free.app/api/jenis-terapi',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    const jenisTerapiData = await jenisTerapiResponse.json();
    const matchedJenisTerapi = jenisTerapiData.data.find(
      (item: any) =>
        item.nama_terapi.toLowerCase() === payload.therapyType.toLowerCase()
    );

    const operatorId = localStorage.getItem('userId');

    const formData = new FormData();
    formData.append('nama_pasien', payload.patientName);
    formData.append('kelainan_kotigental', payload.congenitalComorbidities);
    formData.append('pasien_anak_ke_berapa', payload.whichChild.toString());
    formData.append('tanggal_lahir', payload.dateOfBirth);
    formData.append('jenis_kelamin', payload.patientGender);
    formData.append('tanggal_operasi', payload.dateOfSurgery);
    formData.append('umur_pasien', payload.patientAge.toString());
    formData.append('tehnik_operasi', payload.operationTechnique);
    formData.append('alamat_pasien', payload.patientAddress);
    formData.append('nama_penyelenggara', payload.providerName);
    formData.append('suku_pasien', payload.ethnicity);
    formData.append('lokasi_operasi', payload.surgeryLocation);
    formData.append('jenis_terapi', payload.therapyType);
    formData.append('riwayat_kehamilan', payload.motherPregnancyHistory);
    formData.append('riwayat_keluarga_pasien', payload.familyHistory);
    formData.append('riwayat_kawin_berabat', payload.residentsMaritalHistory);
    formData.append('riwayat_terdahulu', payload.previousMedicalHistory);
    formData.append('follow_up', payload.followUp);
    formData.append('jenis_kelainan_cleft_id', matchedJenisKelainan.id);
    formData.append('jenis_terapi_id', matchedJenisTerapi.id);
    formData.append('diagnosis_id', matchedDiagnosis.id);
    formData.append('operator_id', operatorId ?? '');

    if (beforeFiles[0]) {
      formData.append('foto_sebelum_operasi', beforeFiles[0]);
    }
    if (afterFiles[0]) {
      formData.append('foto_setelah_operasi', afterFiles[0]);
    }

    // console.log('Data yang dikirim:', dataToSend);

    const response = await fetch(
      'https://0b2d-118-99-106-123.ngrok-free.app/api/pasien/store',
      {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('API Error Response:', result);
      throw new Error(result.message || 'Gagal upload data');
    }

    console.log('Upload successful:', result);
    return result;
  } catch (error: any) {
    console.error('Upload error:', error);
    throw new Error(error.message || 'Terjadi kesalahan saat mengupload data.');
  }
}
