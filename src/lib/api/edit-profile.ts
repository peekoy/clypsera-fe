import { UserProfile } from '@/types/user';

export async function editProfile(payload: UserProfile, token: string) {
  console.log('payload user', payload);
  const userId = localStorage.getItem('userId');

  const requestBody: any = {
    name: payload.name,
    email: payload.email,
    umur: payload.age,
    nik: payload.nik,
    pekerjaan: payload.job,
    tanggal_lahir: payload.birthDate,
    alamat: payload.address,
    jenis_kelamin: payload.gender,
    no_telepon: payload.phone,
  };

  if (payload.password && payload.password.length > 0) {
    requestBody.password = payload.password;
  }

  console.log('Sending request body:', JSON.stringify(requestBody, null, 2)); // Add this line

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userId}/update`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(requestBody),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error('API Error Response:', data); // Log the full error response from the API
    throw new Error(data.message || 'Failed to register');
  }

  return data;
}
