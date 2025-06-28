import { User } from '@/types/user';

export async function getUserById(
  token: string,
  userId: number
): Promise<User | null> {
  try {
    const res = await fetch(
      `https://dd13-118-99-106-123.ngrok-free.app/api/user/find/${userId}`,
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
      password: '',
      confirmPassword: '',
      role: data.roles.length <= 0 ? 'not found' : data.roles[0].name,
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
