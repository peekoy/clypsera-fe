export async function uploadProfilePhoto(file: File, token: string) {
  const userId = localStorage.getItem('userId');

  const formData = new FormData();
  formData.append('photo', file);
  formData.append('_method', 'PATCH');

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userId}/update?_method=PATCH`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error('API Error Response:', data);
    throw new Error(data.message || 'Failed to upload profile photo');
  }

  return data;
}
