import { generateDownloadToken } from './generate-download-token';

export async function exportAllData(
  token: string,
  requestId: number
): Promise<Response> {
  const downloadToken = await generateDownloadToken(token, requestId);
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/export/${downloadToken}`;

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
