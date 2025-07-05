export async function getRequestCategories(
  token: string
): Promise<{ label: string; value: string }[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/kategori_permohonan`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch categories:', response.statusText);
      return [];
    }

    const data = await response.json();

    // Pastikan data.data ada dan merupakan array
    if (data && Array.isArray(data.data)) {
      return data.data.map((cat: any) => ({
        label: cat.kategori,
        value: cat.kategori.toLowerCase(),
      }));
    }

    return [];
  } catch (error) {
    console.error('Error in getRequestCategories:', error);
    return [];
  }
}
