export async function deleteUser(token: string, userId: number) {
  const response = await fetch(
    `https://835e-103-194-173-102.ngrok-free.app/api/user/${userId}/delete`,
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
