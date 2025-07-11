export async function requestPasswordReset(email: string): Promise<any> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({ email }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.error('API Error Response:', result);
    throw new Error(result.message || 'Failed to send password reset link.');
  }

  return result;
}
