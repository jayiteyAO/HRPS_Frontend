export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Terminated';
  joinDate: string;
  employeeId: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  maritalStatus: string;
  address: string;
  city: string;
  employmentType: string;
  bankAccount: string;
  bankName: string;
  manager: string;
  location: string;
}

export const employeeDatabase: Employee[] = [
  { 
    id: 1, 
    name: 'Kwame Mensah', 
    email: 'kwame.mensah@company.com', 
    phone: '+233 24 123 4567',
    position: 'Senior Developer', 
    department: 'Engineering', 
    location: 'Accra, Ghana',
    salary: 15000, 
    status: 'Active', 
    joinDate: '2022-01-15',
    employeeId: 'EMP-001',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    nationality: 'Ghanaian',
    maritalStatus: 'Married',
    address: '123 Independence Avenue',
    city: 'Accra',
    employmentType: 'Full-time',
    bankAccount: '1234567890',
    bankName: 'GCB Bank',
    manager: 'John Smith'
  },
  { 
    id: 2, 
    name: 'Ama Adjei', 
    email: 'ama.adjei@company.com', 
    phone: '+233 24 234 5678',
    position: 'HR Manager', 
    department: 'Human Resources', 
    location: 'Accra, Ghana',
    salary: 12000, 
    status: 'Active', 
    joinDate: '2021-05-20',
    employeeId: 'EMP-002',
    dateOfBirth: '1988-08-22',
    gender: 'Female',
    nationality: 'Ghanaian',
    maritalStatus: 'Single',
    address: '456 Liberation Road',
    city: 'Accra',
    employmentType: 'Full-time',
    bankAccount: '0987654321',
    bankName: 'Ecobank Ghana',
    manager: 'Sarah Johnson'
  },
  { 
    id: 3, 
    name: 'Kofi Asante', 
    email: 'kofi.asante@company.com', 
    phone: '+233 24 345 6789',
    position: 'Sales Executive', 
    department: 'Sales', 
    location: 'Kumasi, Ghana',
    salary: 10000, 
    status: 'Active', 
    joinDate: '2023-03-10',
    employeeId: 'EMP-003',
    dateOfBirth: '1992-11-30',
    gender: 'Male',
    nationality: 'Ghanaian',
    maritalStatus: 'Single',
    address: '789 Prempeh II Street',
    city: 'Kumasi',
    employmentType: 'Full-time',
    bankAccount: '1122334455',
    bankName: 'Stanbic Bank',
    manager: 'Michael Brown'
  },
  { 
    id: 4, 
    name: 'Abena Owusu', 
    email: 'abena.owusu@company.com', 
    phone: '+233 24 456 7890',
    position: 'Marketing Specialist', 
    department: 'Marketing', 
    location: 'Accra, Ghana',
    salary: 11000, 
    status: 'On Leave', 
    joinDate: '2022-07-01',
    employeeId: 'EMP-004',
    dateOfBirth: '1991-03-18',
    gender: 'Female',
    nationality: 'Ghanaian',
    maritalStatus: 'Married',
    address: '321 Ring Road',
    city: 'Accra',
    employmentType: 'Full-time',
    bankAccount: '5566778899',
    bankName: 'Zenith Bank',
    manager: 'David Lee'
  },
  { 
    id: 5, 
    name: 'Yaw Boateng', 
    email: 'yaw.boateng@company.com', 
    phone: '+233 24 567 8901',
    position: 'Accountant', 
    department: 'Finance', 
    location: 'Accra, Ghana',
    salary: 13000, 
    status: 'Active', 
    joinDate: '2020-11-12',
    employeeId: 'EMP-005',
    dateOfBirth: '1987-07-25',
    gender: 'Male',
    nationality: 'Ghanaian',
    maritalStatus: 'Married',
    address: '654 Cantonments Road',
    city: 'Accra',
    employmentType: 'Full-time',
    bankAccount: '9988776655',
    bankName: 'Access Bank',
    manager: 'Emily Wilson'
  },
  { 
    id: 6, 
    name: 'Akua Sarpong', 
    email: 'akua.sarpong@company.com', 
    phone: '+233 24 678 9012',
    position: 'Frontend Developer', 
    department: 'Engineering', 
    location: 'Accra, Ghana',
    salary: 14000, 
    status: 'Active', 
    joinDate: '2023-01-08',
    employeeId: 'EMP-006',
    dateOfBirth: '1993-09-10',
    gender: 'Female',
    nationality: 'Ghanaian',
    maritalStatus: 'Single',
    address: '987 Airport Road',
    city: 'Accra',
    employmentType: 'Full-time',
    bankAccount: '4433221100',
    bankName: 'CalBank',
    manager: 'John Smith'
  },
  { 
    id: 7, 
    name: 'Kwabena Ofori', 
    email: 'kwabena.ofori@company.com', 
    phone: '+233 24 789 0123',
    position: 'Operations Manager', 
    department: 'Operations', 
    location: 'Tema, Ghana',
    salary: 16000, 
    status: 'Active', 
    joinDate: '2019-04-15',
    employeeId: 'EMP-007',
    dateOfBirth: '1985-12-05',
    gender: 'Male',
    nationality: 'Ghanaian',
    maritalStatus: 'Married',
    address: '147 Harbor Road',
    city: 'Tema',
    employmentType: 'Full-time',
    bankAccount: '1357924680',
    bankName: 'Fidelity Bank',
    manager: 'Sarah Johnson'
  },
  { 
    id: 8, 
    name: 'Efua Nkrumah', 
    email: 'efua.nkrumah@company.com', 
    phone: '+233 24 890 1234',
    position: 'Service Lead', 
    department: 'Customer Service', 
    location: 'Accra, Ghana',
    salary: 9500, 
    status: 'Active', 
    joinDate: '2022-09-20',
    employeeId: 'EMP-008',
    dateOfBirth: '1994-02-14',
    gender: 'Female',
    nationality: 'Ghanaian',
    maritalStatus: 'Single',
    address: '258 Spintex Road',
    city: 'Accra',
    employmentType: 'Full-time',
    bankAccount: '2468013579',
    bankName: 'GCB Bank',
    manager: 'Michael Brown'
  }
];
