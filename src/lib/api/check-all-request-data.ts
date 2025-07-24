export async function checkAllDataRequest(
  token: string
): Promise<{ status: string | null; requestId: number | null }> {
  try {
    const currentUserId = localStorage.getItem('userId');
    if (!currentUserId) {
      return { status: null, requestId: null };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/permohonan/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        cache: 'no-cache',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch requests');
    }

    const result = await response.json();

    if (!result || !Array.isArray(result.data)) {
      return { status: null, requestId: null };
    }

    const allDataRequestsForUser = result.data.filter(
      (item: any) =>
        item.scope === 'semua' && item.user_id === Number(currentUserId)
    );

    if (allDataRequestsForUser.length === 0) {
      return { status: null, requestId: null };
    }

    allDataRequestsForUser.sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const latestRequest = allDataRequestsForUser[0];

    return {
      status: latestRequest.status_permohonan,
      requestId: latestRequest.id,
    };
  } catch (error) {
    console.error("Error checking 'all data' request status:", error);
    return { status: null, requestId: null };
  }
}
