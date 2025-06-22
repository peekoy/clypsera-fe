export type CheckRequestData = {
  id: number;
  name: string;
  email: string;
  category: string;
  status: string;
  createdAt: string;
};

export type RequestDataPayload = {
  name: string;
  email: string;
  nik: string;
  phoneNumber: string;
  category: string;
  purpose: string;
};
