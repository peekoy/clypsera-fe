import { EditPatientPayload } from '@/types/patient';

export async function editPatientData(
  token: string | null,
  patientId: number,
  payload: EditPatientPayload,
  beforeFiles: File[],
  afterFiles: File[]
) {
  try {
    if (!token) throw new Error('Authentication token is required');

    const diagnosisResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/diagnosis`,
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
        item?.nama_diagnosis?.toLowerCase() === payload.diagnosis.toLowerCase()
    );
    if (!matchedDiagnosis) {
      throw new Error(`Diagnosis '${payload.diagnosis}' not found.`);
    }

    const jenisKelainanResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/jenis-kelainan`,
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
        item?.nama_kelainan?.toLowerCase() ===
        payload.cleftPalateType.toLowerCase()
    );
    if (!matchedJenisKelainan) {
      throw new Error(
        `Cleft Palate Type '${payload.cleftPalateType}' not found.`
      );
    }

    const jenisTerapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/jenis-terapi`,
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
        item?.nama_terapi?.toLowerCase() === payload.therapyType.toLowerCase()
    );
    if (!matchedJenisTerapi) {
      throw new Error(`Therapy Type '${payload.therapyType}' not found.`);
    }

    const operatorId = localStorage.getItem('userId') ?? '';
    const gender =
      payload.patientGender === 'male'
        ? 'L'
        : payload.patientGender === 'female'
        ? 'P'
        : '';

    const formData = new FormData();
    formData.append('nama_pasien', payload.patientName);
    formData.append('tanggal_lahir', payload.dateOfBirth);
    formData.append('umur_pasien', payload.patientAge.toString());
    formData.append('jenis_kelamin', gender);
    formData.append('alamat_pasien', payload.patientAddress);
    formData.append('suku_pasien', payload.ethnicity);
    formData.append('kelainan_kotigental', payload.congenitalComorbidities);
    formData.append('pasien_anak_ke_berapa', payload.whichChild.toString());
    formData.append('riwayat_kehamilan', payload.motherPregnancyHistory);
    formData.append('riwayat_keluarga_pasien', payload.familyHistory);
    formData.append('riwayat_kawin_berabat', payload.residentsMaritalHistory);
    formData.append('riwayat_terdahulu', payload.previousMedicalHistory);
    formData.append('tanggal_operasi', payload.dateOfSurgery);
    formData.append('tehnik_operasi', payload.operationTechnique);
    formData.append('nama_penyelenggara', payload.providerName);
    formData.append('lokasi_operasi', payload.surgeryLocation);
    formData.append('jenis_kelainan_cleft_id', matchedJenisKelainan.id);
    formData.append('jenis_terapi_id', matchedJenisTerapi.id);
    formData.append('diagnosis_id', matchedDiagnosis.id);
    formData.append('follow_up', payload.followUp);
    formData.append('operator_id', operatorId);

    if (beforeFiles[0]) {
      formData.append('foto_sebelum_operasi', beforeFiles[0]);
    }
    if (afterFiles[0]) {
      formData.append('foto_setelah_operasi', afterFiles[0]);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/pasien/${patientId}/update?_method=PATCH`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
        body: formData,
      }
    );

    const result = await res.json();
    if (!res.ok) {
      console.error('Error editing patient:', result);
      throw new Error(result.message || 'Gagal mengedit data pasien');
    }

    return result;
  } catch (error: any) {
    console.error('Upload error:', error);
    throw new Error(error.message || 'Terjadi kesalahan saat mengupload data.');
  }
}
