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

export type RequestDataById = {
  name: string;
  email: string;
  nik: string;
  phoneNumber: string;
  category: string;
  purpose: string;
  status: string;
  createdAt: string;
  requestOperationId: number;
};
