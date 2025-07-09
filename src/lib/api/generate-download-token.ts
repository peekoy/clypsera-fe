// src/lib/api/generate-download-token.ts
export async function generateDownloadToken(
  token: string,
  requestId: number
): Promise<string> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/permohonan/${requestId}/generate-token`;

  const response = await fetch(url, {
    method: 'GET', // Atau GET, sesuaikan dengan metode API Anda
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.message ||
      `Failed to generate download token: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();
  if (!data.token) {
    throw new Error('Download token not found in API response.');
  }

  return data.token;
}
