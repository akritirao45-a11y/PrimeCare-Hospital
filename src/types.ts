export interface Department {
  id: string;
  name: string;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  servicesOffered: string[];
  headDoctor: string;
  location: string;
  phoneExtension: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  departmentId: string;
  departmentName: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  photo: string;
  bio: string;
  qualifications: string[];
  areasOfExpertise: string[];
  availableDays: string[];
  consultationFee: string;
  consultationType: ('In-Person' | 'Teleconsultation' | 'Both')[];
  roomNumber: string;
}

export interface MedicalService {
  id: string;
  title: string;
  category: 'Emergency' | 'Outpatient' | 'Inpatient' | 'Diagnostics' | 'Surgical' | 'Specialized';
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  departmentId: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  age: number;
  treatment: string;
  department: string;
  quote: string;
  rating: number;
  date: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  snippet: string;
  content: string[];
  tags: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Appointments' | 'Emergency' | 'Services' | 'General';
}

export interface Appointment {
  id: string;
  referenceNumber: string;
  patientName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  preferredDate: string;
  preferredTime: string;
  reasonForVisit: string;
  additionalMessage?: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface FilterDoctorOptions {
  searchQuery: string;
  departmentId: string;
  specialty: string;
  availableDay: string;
  sortBy: 'experience' | 'rating' | 'name';
}
