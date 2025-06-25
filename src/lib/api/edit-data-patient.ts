import { EditPatientPayload } from '@/types/patient';

export async function editPatientData(
  token: string | null,
  patientId: number,
  formValues: EditPatientPayload
): Promise<EditPatientPayload | null> {
  // mapping dari camelCase → snake_case
  const payload = {
    // data pasien
    nama_pasien: formValues.patientName,
    tanggal_lahir: formValues.dateOfBirth,
    umur_pasien: Number(formValues.patientAge),
    jenis_kelamin: formValues.patientGender,
    alamat_pasien: formValues.patientAddress,
    suku_pasien: formValues.ethnicity,
    kelainan_kotigental: formValues.congenitalComorbidities,
    pasien_anak_ke_berapa: Number(formValues.whichChild),

    // riwayat
    riwayat_kehamilan: formValues.motherPregnancyHistory,
    riwayat_keluarga_pasien: formValues.familyHistory,
    riwayat_kawin_kerabat: formValues.residentsMaritalHistory,
    riwayat_terdahulu: formValues.previousMedicalHistory,

    // data operasi
    tanggal_operasi: formValues.dateOfSurgery,
    tehnik_operasi: formValues.operationTechnique,
    nama_penyelenggara: formValues.providerName,
    lokasi_operasi: formValues.surgeryLocation,
    jenis_kelainan_cleft_id: Number(formValues.cleftPalateType),
    jenis_terapi_id: Number(formValues.therapyType),
    diagnosis_id: Number(formValues.diagnosis),
    follow_up: formValues.followUp,

    // // file
    // foto_sebelum_operasi: formValues.beforeSurgery,
    // foto_setelah_operasi: formValues.afterSurgery,
  };

  console.log('pelod', payload);
  console.log('fomrsvaue', formValues);

  try {
    const res = await fetch(
      `https://835e-103-194-173-102.ngrok-free.app/api/pasien/${patientId}/update?_method=PATCH`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      console.error('Update failed', res.status, await res.text());
      return null;
    }

    const { data } = await res.json();
    return data;
  } catch (err) {
    console.error('Network / parsing error', err);
    return null;
  }
}
