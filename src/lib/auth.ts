import type { User } from '@/types/user';

export async function loginUser(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const res = await fetch(
      'https://7abe-118-99-81-224.ngrok-free.app/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await res.text();
      console.error(
        'Non-JSON response received:',
        textResponse.substring(0, 200)
      );
      throw new Error(
        'Server mengembalikan response yang tidak valid (bukan JSON)'
      );
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `HTTP Error: ${res.status}`);
    }

    if (!data.access_token || !data.user?.id) {
      throw new Error('Response tidak memiliki struktur yang diharapkan');
    }

    const token = data.access_token;
    localStorage.setItem('token', token);

    const userId = data.user.id;

    const roleRes = await fetch(
      `https://7abe-118-99-81-224.ngrok-free.app/api/user/find/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    const roleContentType = roleRes.headers.get('content-type');
    if (!roleContentType || !roleContentType.includes('application/json')) {
      const textResponse = await roleRes.text();
      console.error('Non-JSON role response:', textResponse.substring(0, 200));
      throw new Error('Server mengembalikan response role yang tidak valid');
    }

    const roleData = await roleRes.json();

    if (!roleRes.ok) {
      throw new Error(
        roleData.message || `Role fetch error: ${roleRes.status}`
      );
    }

    const userRole = roleData.data?.roles?.[0]?.name || 'user';

    const user: User = {
      id: userId,
      name: data.user.name,
      avatar: data.user.avatar || '/placeholder.svg',
      role: userRole,
    };

    localStorage.setItem('user', JSON.stringify(user));

    return user;
  } catch (err) {
    if (err instanceof TypeError && err.message.includes('fetch')) {
      console.error('Network error: check if API server is running');
      return null;
    }

    if (err instanceof SyntaxError && err.message.includes('JSON')) {
      console.error('Received HTML instead of JSON - API endpoint issue');
      return null;
    }

    return null;
  }
}
