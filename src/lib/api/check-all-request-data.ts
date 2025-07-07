// src/lib/api/check-all-data-request.ts

export async function checkAllDataRequest(
  token: string
): Promise<{ status: string | null; requestId: number | null }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/permohonan/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch requests');
    }

    const result = await response.json();

    // Cari permintaan yang memiliki scope 'semua'
    const allDataRequest = result.data.find(
      (item: any) => item.scope === 'semua'
    );

    if (allDataRequest) {
      return {
        status: allDataRequest.status_permohonan,
        requestId: allDataRequest.id,
      };
    }

    return { status: null, requestId: null };
  } catch (error) {
    console.error("Error checking 'all data' request status:", error);
    return { status: null, requestId: null };
  }
}
