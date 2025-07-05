export async function getChartData(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/chart`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch chart data:', response.statusText);
      return null;
    }

    const data = await response.json();
    if (data.status === 'success') {
      return data;
    }

    console.error('API did not return a success status:', data.message);
    return null;
  } catch (error) {
    console.error('Error in getChartData:', error);
    return null;
  }
}
