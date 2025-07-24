type PermohonanItem = {
  id: number;
  operasi_id: number;
  user_id: number;
  created_at: string;
  status_permohonan: string;
};

export async function checkIfDataRequested(
  token: string,
  operasiId: number
): Promise<{ requested: boolean; requestId: number | null; status: string }> {
  try {
    const currentUserId = localStorage.getItem('userId');
    if (!currentUserId) {
      return { requested: false, requestId: null, status: '' };
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
      console.error('Gagal mengambil data permohonan:', response.statusText);
      return { requested: false, requestId: null, status: '' };
    }

    const result = await response.json();

    if (!result || !Array.isArray(result.data)) {
      return { requested: false, requestId: null, status: '' };
    }

    const userRequestsForOperation = result.data.filter(
      (item: PermohonanItem) =>
        item.operasi_id === operasiId && item.user_id === Number(currentUserId)
    );

    if (userRequestsForOperation.length === 0) {
      return { requested: false, requestId: null, status: '' };
    }

    userRequestsForOperation.sort(
      (a: PermohonanItem, b: PermohonanItem) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const latestRequest = userRequestsForOperation[0];

    return {
      requested: true,
      requestId: latestRequest.id,
      status: latestRequest.status_permohonan,
    };
  } catch (error) {
    console.error('Error di dalam checkIfDataRequested:', error);
    return {
      requested: false,
      requestId: null,
      status: '',
    };
  }
}
