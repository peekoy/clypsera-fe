export interface PatientData {
  id: number;
  patientName: string;
  age: number;
  gender: string;
  dateOfBirth: string;
  operationDate: string;
  organizer: string;
  operationalTechniques: string;
  uploadedBy: string;
}

export interface MyDataPatient {
  patientName: string;
  age: number;
  gender: string;
  dateOfBirth: string;
  operationDate: string;
  organizer: string;
  operationalTechniques: string;
  uploadedBy: string;
}

export interface DetailedPatientData {
  id: number;
  name: string;
  birthDate: string;
  age: string;
  address: string;
  ethnicity: string;
  congenitalAbnormalities: string;
  operationDate: string;
  surgicalTechnique: string;
  organizer: string;
  operationLocation: string;
  childNumber: string;
  gender: string;
  cleftType: string;
  therapyType: string;
  diagnosis: string;
  pregnancyHistory: string;
  familyHistory: string;
  relativeMarriageHistory: string;
  previousIllnessHistory: string;
  followUp: string;
  uploadedBy: string;
  creationDate: string;
  lastUpdate: string;
  preOpImage: string;
  postOpImage: string;
}

export interface AddPatienPayload {
  patientName: string;
  congenitalComorbidities: string;
  whichChild: number;
  dateOfBirth: string;
  patientGender: string;
  dateOfSurgery: string;
  patientAge: number;
  operationTechnique: string;
  patientAddress: string;
  providerName: string;
  ethnicity: string;
  surgeryLocation: string;
  motherPregnancyHistory: string;
  familyHistory: string;
  residentsMaritalHistory: string;
  previousMedicalHistory: string;
  followUp: string;
  cleftPalateType: string;
  therapyType: string;
  diagnosis: string;
}
