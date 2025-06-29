import { PatientData } from '@/types/patient';

export async function getMyPatient(
  token: string,
  currentUser: string
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

    console.log('tes', currentUser);

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

    let filteredData = data.data.filter(
      (item: any) => item.operasi.operator.name === currentUser
    );

    filteredData = filteredData.map((item: any) => ({
      id: item.id,
      patientName: item.nama_pasien,
      age: item.umur_pasien,
      gender: item.jenis_kelamin === 'P' ? 'Women' : 'Men',
      dateOfBirth: item.tanggal_lahir,
      operationDate: item.operasi.tanggal_operasi,
      organizer: item.operasi.lokasi_operasi, // ini masih bingung
      operationalTechniques: item.operasi.tehnik_operasi,
    }));
    console.log('yaya', filteredData);
    return filteredData;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
