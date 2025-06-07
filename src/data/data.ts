export interface PatientData {
  id: number;
  name: string;
  age: number;
  gender: 'Men' | 'Women';
  dateOfBirth: string;
  email: string;
  role: string;
  category: string;
  status: string;
  operationDate: string;
  organizer: string;
  operationalTechniques: string;
  uploadedBy: string;
  userCreationDate: string;
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

// Data untuk browse table
export const patientData: PatientData[] = [
  {
    id: 1,
    name: 'Ahmad Rizki',
    email: 'ahmadrizki123@gmail.com',
    age: 2,
    gender: 'Men',
    role: 'Oral Surgeon',
    category: 'Riset/Penelitian',
    status: 'Pending',
    dateOfBirth: '2022-05-07',
    operationDate: '2024-05-07',
    organizer: 'RS Elizabeth',
    operationalTechniques: 'Operation Method A',
    uploadedBy: 'RS AL-Ikhlas',
    userCreationDate: '2024-07-11 19:52:01',
  },
  {
    id: 2,
    name: 'Gabriel Sagala',
    email: 'gabrielsagala123@gmail.com',
    age: 5,
    gender: 'Men',
    role: 'Operator',
    category: 'Riset/Penelitian',
    status: 'Pending',
    dateOfBirth: '2019-07-04',
    operationDate: '2024-07-09',
    organizer: 'RS Bunda Halimah',
    operationalTechniques: 'Operation Method C',
    uploadedBy: 'RS Bunda Halimah',
    userCreationDate: '2024-07-11 19:52:02',
  },
  {
    id: 3,
    name: 'Chandra Salima',
    email: 'chandrasalima123@gmail.com',
    age: 5,
    gender: 'Women',
    role: 'Operator',
    category: 'Riset/Penelitian',
    status: 'Pending',
    dateOfBirth: '2019-05-07',
    operationDate: '2024-07-09',
    organizer: 'RS Bunda Halimah',
    operationalTechniques: 'Operation Method B',
    uploadedBy: 'RS Bunda Halimah',
    userCreationDate: '2024-07-11 19:52:03',
  },
  {
    id: 4,
    name: 'Clarisa Nayla',
    email: 'clarisanayla123@gmail.com',
    age: 6,
    gender: 'Women',
    role: 'Operator',
    category: 'Lainnya',
    status: 'Pending',
    dateOfBirth: '2018-03-01',
    operationDate: '2024-07-03',
    organizer: 'X Foundation',
    operationalTechniques: 'Operation Method C',
    uploadedBy: 'X Foundation',
    userCreationDate: '2024-07-11 19:52:04',
  },
  {
    id: 5,
    name: 'Erik Gustar Firmando',
    email: 'erikgustar123@gmail.com',
    age: 3,
    gender: 'Men',
    role: 'Nurse',
    category: 'Lainnya',
    status: 'Pending',
    dateOfBirth: '2021-09-03',
    operationDate: '2024-07-01',
    organizer: 'X Foundation',
    operationalTechniques: 'Operation Method B',
    uploadedBy: 'X Foundation',
    userCreationDate: '2024-07-11 19:52:01',
  },
  {
    id: 6,
    name: 'Damara Salma',
    email: 'damarasalma123@gmail.com',
    age: 4,
    gender: 'Women',
    role: 'Operator',
    category: 'Komersil',
    status: 'Pending',
    dateOfBirth: '2020-05-07',
    operationDate: '2024-04-02',
    organizer: 'X Foundation',
    operationalTechniques: 'Operation Method A',
    uploadedBy: 'X Foundation',
    userCreationDate: '2024-07-11 19:52:01',
  },
  {
    id: 7,
    name: 'Emma Amanda',
    email: 'emmaamanda123@gmail.com',
    age: 5,
    gender: 'Women',
    role: 'Operator',
    category: 'Komersil',
    status: 'Pending',
    dateOfBirth: '2019-05-02',
    operationDate: '2024-07-09',
    organizer: 'X Foundation',
    operationalTechniques: 'Operation Method A',
    uploadedBy: 'X Foundation',
    userCreationDate: '2024-07-11 19:52:01',
  },
  {
    id: 8,
    name: 'Budi Santoso',
    email: 'budisantoso123@gmail.com',
    age: 7,
    gender: 'Men',
    role: 'Operator',
    category: 'Komersil',
    status: 'Pending',
    dateOfBirth: '2017-03-15',
    operationDate: '2024-08-12',
    organizer: 'RS Elizabeth',
    operationalTechniques: 'Operation Method B',
    uploadedBy: 'RS Elizabeth',
    userCreationDate: '2024-07-11 19:52:01',
  },
  {
    id: 9,
    name: 'Sari Dewi',
    email: 'saridewi123@gmail.com',
    age: 4,
    gender: 'Women',
    role: 'Nurse',
    category: 'Komersil',
    status: 'Pending',
    dateOfBirth: '2020-11-22',
    operationDate: '2024-06-18',
    organizer: 'RS Bunda Halimah',
    operationalTechniques: 'Operation Method A',
    uploadedBy: 'RS Bunda Halimah',
    userCreationDate: '2024-07-11 19:52:01',
  },
  {
    id: 10,
    name: 'Andi Pratama',
    email: 'andipratama123@gmail.com',
    age: 6,
    gender: 'Men',
    role: 'Oral Surgeon',
    category: 'Komersil',
    status: 'Pending',
    dateOfBirth: '2018-08-30',
    operationDate: '2024-09-05',
    organizer: 'X Foundation',
    operationalTechniques: 'Operation Method C',
    uploadedBy: 'X Foundation',
    userCreationDate: '2024-07-11 19:52:01',
  },
  {
    id: 11,
    name: 'Maya Sari',
    email: 'mayasari123@gmail.com',
    age: 3,
    gender: 'Women',
    role: 'Oral Surgeon',
    category: 'Komersil',
    status: 'Pending',
    dateOfBirth: '2021-12-10',
    operationDate: '2024-10-20',
    organizer: 'RS AL-Ikhlas',
    operationalTechniques: 'Operation Method B',
    uploadedBy: 'RS AL-Ikhlas',
    userCreationDate: '2024-07-11 19:52:01',
  },
  {
    id: 12,
    name: 'Reza Firmansyah',
    email: 'rezafirmansyah123@gmail.com',
    age: 8,
    gender: 'Men',
    role: 'Oral Surgeon',
    category: 'Komersil',
    status: 'Pending',
    dateOfBirth: '2016-04-25',
    operationDate: '2024-11-15',
    organizer: 'RS Elizabeth',
    operationalTechniques: 'Operation Method A',
    uploadedBy: 'RS Elizabeth',
    userCreationDate: '2024-07-11 19:52:01',
  },
];

// Data detail untuk halaman operasi
export const detailedPatientData: Record<number, DetailedPatientData> = {
  1: {
    id: 1,
    name: 'Ahmad Rizki',
    birthDate: '2022-05-07',
    age: '2 tahun',
    address: 'Jl. Merdeka No. 123, Jakarta Pusat',
    ethnicity: 'Jawa',
    congenitalAbnormalities: 'Tidak',
    operationDate: '2024-05-07',
    surgicalTechnique: 'Teknik Operasi A',
    organizer: 'RS Elizabeth',
    operationLocation: 'Jl. Sudirman No. 456 Jakarta',
    childNumber: '1',
    gender: 'Laki-laki',
    cleftType: 'Labioschisis',
    therapyType: 'labioplasty',
    diagnosis: 'labioschisis',
    pregnancyHistory:
      'Riwayat kehamilan ibu dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Kehamilan berlangsung normal tanpa komplikasi berarti.',
    familyHistory:
      'Riwayat keluarga dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Tidak ada riwayat kelainan serupa dalam keluarga.',
    relativeMarriageHistory:
      'Riwayat kawin kerabat dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Tidak ada riwayat perkawinan sedarah.',
    previousIllnessHistory:
      'Riwayat penyakit terdahulu dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Pasien tidak memiliki riwayat penyakit serius sebelumnya.',
    followUp:
      'Deskripsi follow up harus ditulis di bagian ini oleh pengguna agar jelas apa yang telah dilakukan pada pasien. Kontrol rutin setiap 3 bulan untuk memantau perkembangan.',
    uploadedBy: 'RS AL-Ikhlas',
    creationDate: '2024-07-11 21:30:28',
    lastUpdate: '2024-07-11 21:30:28',
    preOpImage: '/placeholder.svg?height=200&width=200',
    postOpImage: '/placeholder.svg?height=200&width=200',
  },
  2: {
    id: 2,
    name: 'Gabriel Sagala',
    birthDate: '2019-07-04',
    age: '5 tahun',
    address:
      'Jl. Telekomunikasi, 1, Terusan Buahbatu - Bojongsoang, Telkom University, Sukapura',
    ethnicity: 'Kalimantan Selatan',
    congenitalAbnormalities: 'Tidak',
    operationDate: '2024-07-09',
    surgicalTechnique: 'Teknik Operasi C',
    organizer: 'RS Bunda Halimah',
    operationLocation: 'Jl. Soekarno Hatta No. 520 Kota Bandung',
    childNumber: '1',
    gender: 'Laki-laki',
    cleftType: 'Palatoschisis',
    therapyType: 'gnatoplasty',
    diagnosis: 'palatoschisis',
    pregnancyHistory:
      'Riwayat kehamilan ibu dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Kehamilan normal dengan pemeriksaan rutin.',
    familyHistory:
      'Riwayat keluarga dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Ada riwayat kelainan serupa pada keluarga jauh.',
    relativeMarriageHistory:
      'Riwayat kawin kerabat dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Tidak ada riwayat perkawinan sedarah.',
    previousIllnessHistory:
      'Riwayat penyakit terdahulu dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Riwayat infeksi saluran pernapasan atas berulang.',
    followUp:
      'Deskripsi follow up harus ditulis di bagian ini oleh pengguna agar jelas apa yang telah dilakukan pada pasien. Terapi wicara rutin dan kontrol bedah setiap 6 bulan.',
    uploadedBy: 'RS Bunda Halimah',
    creationDate: '2024-07-11 21:30:28',
    lastUpdate: '2024-07-11 21:30:28',
    preOpImage: '/placeholder.svg?height=200&width=200',
    postOpImage: '/placeholder.svg?height=200&width=200',
  },
  3: {
    id: 3,
    name: 'Chandra Salima',
    birthDate: '2019-05-07',
    age: '5 tahun',
    address: 'Jl. Kebon Jeruk No. 789, Jakarta Barat',
    ethnicity: 'Sunda',
    congenitalAbnormalities: 'Tidak',
    operationDate: '2024-07-09',
    surgicalTechnique: 'Teknik Operasi B',
    organizer: 'RS Bunda Halimah',
    operationLocation: 'Jl. Soekarno Hatta No. 520 Kota Bandung',
    childNumber: '2',
    gender: 'Perempuan',
    cleftType: 'Palatoschisis',
    therapyType: 'palatoplasty',
    diagnosis: 'palatoschisis',
    pregnancyHistory:
      'Riwayat kehamilan ibu dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Kehamilan dengan komplikasi ringan pada trimester kedua.',
    familyHistory:
      'Riwayat keluarga dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Tidak ada riwayat kelainan dalam keluarga.',
    relativeMarriageHistory:
      'Riwayat kawin kerabat dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Tidak ada riwayat perkawinan sedarah.',
    previousIllnessHistory:
      'Riwayat penyakit terdahulu dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Riwayat gangguan makan pada masa bayi.',
    followUp:
      'Deskripsi follow up harus ditulis di bagian ini oleh pengguna agar jelas apa yang telah dilakukan pada pasien. Program terapi makan dan kontrol rutin setiap 4 bulan.',
    uploadedBy: 'RS Bunda Halimah',
    creationDate: '2024-07-11 21:30:28',
    lastUpdate: '2024-07-11 21:30:28',
    preOpImage: '/placeholder.svg?height=200&width=200',
    postOpImage: '/placeholder.svg?height=200&width=200',
  },
  4: {
    id: 4,
    name: 'Clarisa Nayla',
    birthDate: '2018-03-01',
    age: '6 tahun',
    address: 'Jl. Pahlawan No. 456, Surabaya',
    ethnicity: 'Jawa',
    congenitalAbnormalities: 'Tidak',
    operationDate: '2024-07-03',
    surgicalTechnique: 'Teknik Operasi C',
    organizer: 'X Foundation',
    operationLocation: 'Jl. Ahmad Yani No. 123 Surabaya',
    childNumber: '1',
    gender: 'Perempuan',
    cleftType: 'Labiopalatochisis',
    therapyType: 'labioplasty',
    diagnosis: 'labiopalatochisis',
    pregnancyHistory:
      'Riwayat kehamilan ibu dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Kehamilan dengan pemantauan khusus karena usia ibu yang muda.',
    familyHistory:
      'Riwayat keluarga dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Ada riwayat kelainan kongenital pada saudara kandung.',
    relativeMarriageHistory:
      'Riwayat kawin kerabat dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Tidak ada riwayat perkawinan sedarah.',
    previousIllnessHistory:
      'Riwayat penyakit terdahulu dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Riwayat operasi hernia pada usia 2 tahun.',
    followUp:
      'Deskripsi follow up harus ditulis di bagian ini oleh pengguna agar jelas apa yang telah dilakukan pada pasien. Terapi wicara intensif dan kontrol bedah plastik setiap 3 bulan.',
    uploadedBy: 'X Foundation',
    creationDate: '2024-07-11 21:30:28',
    lastUpdate: '2024-07-11 21:30:28',
    preOpImage: '/placeholder.svg?height=200&width=200',
    postOpImage: '/placeholder.svg?height=200&width=200',
  },
  5: {
    id: 5,
    name: 'Erik Gustar Firmando',
    birthDate: '2021-09-03',
    age: '3 tahun',
    address: 'Jl. Diponegoro No. 321, Medan',
    ethnicity: 'Batak',
    congenitalAbnormalities: 'Tidak',
    operationDate: '2024-07-01',
    surgicalTechnique: 'Teknik Operasi B',
    organizer: 'X Foundation',
    operationLocation: 'Jl. Gatot Subroto No. 789 Medan',
    childNumber: '3',
    gender: 'Laki-laki',
    cleftType: 'Labioschisis',
    therapyType: 'palatoplasty',
    diagnosis: 'labioschisis',
    pregnancyHistory:
      'Riwayat kehamilan ibu dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Kehamilan normal dengan nutrisi yang baik.',
    familyHistory:
      'Riwayat keluarga dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Riwayat kelainan serupa pada kakek dari pihak ayah.',
    relativeMarriageHistory:
      'Riwayat kawin kerabat dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Tidak ada riwayat perkawinan sedarah.',
    previousIllnessHistory:
      'Riwayat penyakit terdahulu dari pasien dapat ditulis di bagian sini agar terlihat jelas oleh para pembaca. Riwayat pneumonia pada usia 1 tahun.',
    followUp:
      'Deskripsi follow up harus ditulis di bagian ini oleh pengguna agar jelas apa yang telah dilakukan pada pasien. Fisioterapi oral dan kontrol perkembangan setiap 2 bulan.',
    uploadedBy: 'X Foundation',
    creationDate: '2024-07-11 21:30:28',
    lastUpdate: '2024-07-11 21:30:28',
    preOpImage: '/placeholder.svg?height=200&width=200',
    postOpImage: '/placeholder.svg?height=200&width=200',
  },
};

// Helper function untuk mendapatkan patient berdasarkan ID
export const getPatientById = (id: number): DetailedPatientData | null => {
  return detailedPatientData[id] || null;
};

// Helper function untuk mendapatkan semua patients
export const getAllPatients = (): PatientData[] => {
  return patientData;
};

// Helper function untuk search patients
export const searchPatients = (query: string): PatientData[] => {
  if (!query) return patientData;

  const lowercaseQuery = query.toLowerCase();
  return patientData.filter(
    (patient) =>
      patient.name.toLowerCase().includes(lowercaseQuery) ||
      patient.organizer.toLowerCase().includes(lowercaseQuery) ||
      patient.operationalTechniques.toLowerCase().includes(lowercaseQuery)
  );
};
