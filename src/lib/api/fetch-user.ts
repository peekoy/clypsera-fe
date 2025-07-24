import { AllUsers, UserRole } from '@/types/user'; // Impor UserRole

// Definisikan tipe untuk item pengguna dari API
type ApiUser = {
  id: number;
  email: string;
  name: string;
  detail_user: {
    created_at: string;
  };
  roles: { name: string }[];
};

// Definisikan tipe untuk response API
type ApiResponse = {
  data: ApiUser[];
};

export async function getAllUsers(token: string): Promise<AllUsers[] | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
    });

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

    const apiResponse: ApiResponse = await res.json();
    const mappedData: AllUsers[] = apiResponse.data.map((item: ApiUser) => ({
      id: item.id,
      email: item.email,
      name: item.name,
      userCreationDate: new Date(item.detail_user.created_at).toISOString(),
      // Tambahkan 'as UserRole' untuk type assertion
      role: (item.roles.length <= 0
        ? 'not found'
        : item.roles[0].name) as UserRole,
    }));
    return mappedData;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
