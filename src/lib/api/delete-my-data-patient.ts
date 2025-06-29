export async function deleteMyDataPatient(token: string, patientId: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/pasien/${patientId}/delete`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Gagal membatalkan permohonan');
  }

  return true;
}
