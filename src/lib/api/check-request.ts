export async function checkIfDataRequested(
  token: string,
  operasiId: number
): Promise<{ requested: boolean; requestId: number | null; status: string }> {
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

    const result = await response.json();
    console.log(result.data);

    const searchOperasi = result.data.find(
      (item: any) => item.operasi_id === operasiId
    );

    console.log(searchOperasi.status_permohonan);

    if (searchOperasi) {
      return {
        requested: true,
        requestId: searchOperasi.id,
        status: searchOperasi.status_permohonan,
      };
    }

    return {
      requested: false,
      requestId: null,
      status: '',
    };
  } catch (error) {
    console.log(error);
    return {
      requested: false,
      requestId: null,
      status: '',
    };
  }
}
