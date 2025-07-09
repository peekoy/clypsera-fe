export async function exportAllData(token: string): Promise<Response> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/export/${token}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.message || `Failed to download file: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return response;
}
