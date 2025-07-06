// src/lib/api/export-single-file.ts

export async function exportSingleFile(
  token: string,
  requestId: number
): Promise<Response> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/permohonan/${requestId}/export`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Atau 'text/csv' tergantung respons API
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!response.ok) {
    // Mencoba membaca pesan error dari body jika ada
    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.message || `Failed to download file: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return response;
}
