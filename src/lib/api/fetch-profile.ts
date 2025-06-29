import { UserProfile } from '@/types/user';

export async function getUserProfile(
  token: string
): Promise<UserProfile | null> {
  try {
    const userId = localStorage.getItem('userId');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/find/${userId}`,
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
    data = data.data;
    console.log('data user', data);
    return {
      name: data.name,
      email: data.email,
      gender: data.detail_user.jenis_kelamin,
      birthDate: data.detail_user.tanggal_lahir,
      phone: data.detail_user.no_telepon,
      job: data.detail_user.pekerjaan,
      nik: data.detail_user.nik,
      address: data.detail_user.alamat,
      age: data.detail_user.umur,
    };

    // data = data.data.map((item: any) => ({
    //   name: item.name,
    //   email: item.email,
    //   password: item.password,
    //   confirmPassword: item.password_confirmation,
    //   role: item.roles.length <= 0 ? 'not found' : item.roles[0].name,
    // }));
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
