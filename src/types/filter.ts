import { UserRole } from './user';

export type FilterBrowse = {
  foundation: string;
  operationTechnique: string;
  gender: string;
  age: string;
  patientName: string;
};

export type FilterMyData = {
  foundation: string;
  operationTechnique: string;
  gender: string;
  age: string;
  patientName: string;
};

export type FilterRequestData = {
  category: string;
  status: string;
  email: string;
  name: string;
};

export type FilterAdmin = {
  name: string;
  email: string;
  role: UserRole;
};
