import { UserRole } from './user';

export type FilterBrowse = {
  foundation: string;
  operationTechnique: string;
  gender: string;
  age: string;
  patientName: string;
};

export type FilterAdmin = {
  name: string;
  email: string;
  role: UserRole;
};
