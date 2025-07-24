export async function exportSingleFile(
  downloadToken: string
): Promise<Response> {
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
    let errorMessage = `Failed to download file: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.clone().json();
      errorMessage = errorData?.message || errorMessage;
    } catch {
      const textError = await response.text();
      errorMessage = `Download failed. Server response: ${textError.substring(
        0,
        150
      )}...`;
    }
    throw new Error(errorMessage);
  }

  return response;
}
