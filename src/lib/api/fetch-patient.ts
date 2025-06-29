import { PatientData } from '@/types/patient';

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

    console.log('tes', token);

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
    data = data.data.map((item: any) => ({
      id: item.id,
      patientName: item.nama_pasien,
      age: item.umur_pasien,
      gender: item.jenis_kelamin === 'P' ? 'Women' : 'Men',
      dateOfBirth: item.tanggal_lahir,
      operationDate: item.operasi.tanggal_operasi,
      organizer: item.operasi.nama_penyelenggara,
      operationalTechniques: item.operasi.tehnik_operasi,
      uploadedBy: item.operasi.operator.name,
      therapyType: item.operasi.jenis_terapi.nama_terapi,
    }));
    console.log('yaya', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
