import { AddUserPayload } from '@/types/user';

export async function addUser(payload: AddUserPayload) {
  if (payload.password !== payload.confirmPassword) {
    throw new Error('Password and Confirm Password do not match');
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
