export async function checkIfDataRequested(
  token: string,
  operasiId: number
): Promise<{ requested: boolean; requestId: number | null }> {
  try {
    const response = await fetch(
      `https://835e-103-194-173-102.ngrok-free.app/api/permohonan/`,
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

    const searchOperasiId = result.data.find(
      (item: any) => item.operasi_id === operasiId
    );

    console.log(searchOperasiId.id);

    if (searchOperasiId) {
      return {
        requested: true,
        requestId: searchOperasiId.id,
      };
    }

    return {
      requested: false,
      requestId: null,
    };
  } catch (error) {
    console.log(error);
    return {
      requested: false,
      requestId: null,
    };
  }
}
