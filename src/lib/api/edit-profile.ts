import { UserProfile } from '@/types/user';

export async function editProfile(
  payload: UserProfile,
  token: string,
  profilePicture: File | null
) {
  console.log('payload user', payload);
  const userId = localStorage.getItem('userId');

  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('email', payload.email);
  formData.append('umur', payload.age.toString());
  formData.append('nik', payload.nik);
  formData.append('pekerjaan', payload.job);
  formData.append('tanggal_lahir', payload.birthDate);
  formData.append('alamat', payload.address);
  formData.append('jenis_kelamin', payload.gender);
  formData.append('no_telepon', payload.phone);
  formData.append('user_id', userId?.toString() || '');

  if (payload.password && payload.password.length > 0) {
    formData.append('password', payload.password);
  }

  if (profilePicture) {
    formData.append('photo', profilePicture);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/edit-profile`,
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

  const data = await res.json();

  if (!res.ok) {
    console.error('API Error Response:', data);
    throw new Error(data.message || 'Failed to register');
  }

  return data;
}
