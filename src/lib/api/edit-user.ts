import { EditUserPayload } from '@/types/user';

export async function editUser(
  payload: EditUserPayload,
  userId: number,
  token: string
) {
  console.log('payload user', payload);
  if (payload.password !== payload.confirmPassword) {
    throw new Error('Password and Confirm Password do not match');
  }

  const res = await fetch(
    `https://dd13-118-99-106-123.ngrok-free.app/api/auth/update-user/${userId}?_method=PATCH`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        password_confirmation: payload.confirmPassword,
        role: payload.role,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to register');
  }

  return data;
}
