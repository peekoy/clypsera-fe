export async function getTherapyTypes(
  token: string
): Promise<{ label: string; value: string }[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/jenis-terapi`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
        cache: 'no-cache',
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch therapy types');
    }

    const result = await res.json();
    if (!result || !Array.isArray(result.data)) {
      return [];
    }

    return result.data.map((item: { nama_terapi: string }) => ({
      label: item.nama_terapi,
      value: item.nama_terapi,
    }));
  } catch (error) {
    console.error('Error fetching therapy types:', error);
    return [];
  }
}

export async function getDiagnosisTypes(
  token: string
): Promise<{ label: string; value: string }[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/diagnosis`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
        cache: 'no-cache',
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch diagnosis types');
    }

    const result = await res.json();
    if (!result || !Array.isArray(result.data)) {
      return [];
    }

    return result.data.map((item: { nama_diagnosis: string }) => ({
      label: item.nama_diagnosis,
      value: item.nama_diagnosis,
    }));
  } catch (error) {
    console.error('Error fetching diagnosis types:', error);
    return [];
  }
}

export async function getCleftPalateTypes(
  token: string
): Promise<{ label: string; value: string }[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/jenis-kelainan`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
        cache: 'no-cache',
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch cleft palate types');
    }

    const result = await res.json();
    if (!result || !Array.isArray(result.data)) {
      return [];
    }

    return result.data.map((item: { nama_kelainan: string }) => ({
      label: item.nama_kelainan,
      value: item.nama_kelainan,
    }));
  } catch (error) {
    console.error('Error fetching cleft palate types:', error);
    return [];
  }
}
