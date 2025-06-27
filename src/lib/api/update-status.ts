export async function updateRequestData(
  token: string,
  statusPayload: string,
  requestId: number
) {
  try {
    const res = await fetch(
      `https://dd13-118-99-106-123.ngrok-free.app/api/permohonan/status/${requestId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ status_permohonan: statusPayload }),
      }
    );

    const contentType = res.headers.get('content-type');

    if (!res.ok) {
      const text = await res.text();
      console.error('Failed to fetch users:', res.status, text);
      return null;
    }

    if (!contentType?.includes('application/json')) {
      const text = await res.text();
      console.error('Expected JSON but got:', text);
      return null;
    }

    let data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
