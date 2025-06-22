import { AllUsers } from '@/types/user';

export async function getAllUsers(token: string): Promise<AllUsers[] | null> {
  try {
    const res = await fetch(
      'https://0b2d-118-99-106-123.ngrok-free.app/api/user',
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

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
      email: item.email,
      name: item.name,
      userCreationDate: new Date(item.detail_user.created_at),
      role: item.roles.length <= 0 ? 'not found' : item.roles[0].name,
    }));
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
