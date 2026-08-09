import { Department, Doctor, MedicalService, Testimonial, BlogPost, FAQ } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    iconName: 'HeartPulse',
    shortDescription: 'Advanced cardiac care, non-invasive diagnostics, and interventional cardiology treatments.',
    fullDescription: 'The Department of Cardiology at PrimeCare Hospital provides world-class cardiac care equipped with advanced Cath Labs, 3D Echocardiography, and 24/7 Coronary Care Units (CCU). Our expert cardiologists specialize in preventive cardiology, angioplasty, heart failure management, and electrophysiology.',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80',
    servicesOffered: ['ECG & Echocardiography', 'Coronary Angiography & Angioplasty', 'Pacemaker Implantation', 'Heart Failure Clinic', 'Lipid & Hypertension Management'],
    headDoctor: 'Dr. Ananya Sharma',
    location: 'Block A, 3rd Floor',
    phoneExtension: 'Ext. 301'
  },
  {
    id: 'neurology',
    name: 'Neurology & Neurosurgery',
    iconName: 'Brain',
    shortDescription: 'Comprehensive diagnosis and treatment for stroke, epilepsy, movement disorders, and brain spine surgeries.',
    fullDescription: 'Our Neurology department offers cutting-edge neurological assessments and surgical procedures. Equipped with high-resolution 3T MRI, neuro-navigation systems, and a dedicated Stroke Care Unit, we treat complex brain, spine, and nerve disorders with high precision.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
    servicesOffered: ['Acute Stroke Intervention', 'Epilepsy Monitoring', 'Parkinson’s & Movement Disorder Clinic', 'Spine & Brain Tumor Surgery', 'Nerve Conduction & EMG'],
    headDoctor: 'Dr. Rohan Mehta',
    location: 'Block B, 2nd Floor',
    phoneExtension: 'Ext. 204'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Joint Replacement',
    iconName: 'Bone',
    shortDescription: 'Robotic joint replacements, arthroscopic sports medicine, trauma care, and spine rehabilitation.',
    fullDescription: 'The Orthopedic Center at PrimeCare specializes in computer-assisted total knee and hip replacements, minimally invasive arthroscopic surgeries, pediatric orthopedics, and complex fracture trauma care.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    servicesOffered: ['Robotic Knee & Hip Replacement', 'Arthroscopy & Sports Injuries', 'Complex Trauma & Fracture Care', 'Spine Surgery & Decompression', 'Physical Rehabilitation'],
    headDoctor: 'Dr. Arjun Verma',
    location: 'Block C, Ground Floor',
    phoneExtension: 'Ext. 108'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Neonatology',
    iconName: 'Baby',
    shortDescription: 'Compassionate pediatric healthcare, Level-III NICU, growth monitoring, and adolescent medicine.',
    fullDescription: 'We offer specialized child-centric care from newborns to adolescents. Supported by a state-of-the-art Neonatal Intensive Care Unit (NICU) and Pediatric ICU (PICU), our pediatricians deliver gentle, family-oriented medical treatments.',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80',
    servicesOffered: ['Level III NICU & PICU Care', 'Childhood Vaccination & Immunization', 'Pediatric Pulmonology', 'Growth & Developmental Tracking', 'Pediatric Emergency Services'],
    headDoctor: 'Dr. Priya Kapoor',
    location: 'Block A, 1st Floor',
    phoneExtension: 'Ext. 112'
  },
  {
    id: 'dermatology',
    name: 'Dermatology & Cosmetology',
    iconName: 'Sparkles',
    shortDescription: 'Advanced skin care treatments, laser therapies, dermatopathology, and aesthetic dermatology.',
    fullDescription: 'Providing comprehensive medical and cosmetic skin care. From stubborn acne and eczema to advanced laser treatments and skin cancer screening, our dermatologists utilize modern technology for optimal clinical results.',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80',
    servicesOffered: ['Medical Dermatology (Acne, Psoriasis)', 'Laser Hair & Scar Therapy', 'Dermatopathology & Mole Screening', 'Cosmetic Skin Rejuvenation', 'Allergy Skin Testing'],
    headDoctor: 'Dr. Neha Iyer',
    location: 'Block D, 2nd Floor',
    phoneExtension: 'Ext. 402'
  },
  {
    id: 'gynecology',
    name: 'Obstetrics & Gynecology',
    iconName: 'Users',
    shortDescription: 'Complete women’s healthcare, high-risk pregnancy care, laparoscopic gynecology, and fertility guidance.',
    fullDescription: 'Dedicated to empowering women’s health at all life stages. We provide maternity suites, prenatal diagnostic ultrasound, minimally invasive gynaecological surgeries, and menopause wellness guidance.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    servicesOffered: ['Antenatal & High-Risk Pregnancy', 'Laparoscopic Hysterectomy', 'PCOS & Fertility Counseling', 'Well-Woman Health Screening', 'Mammography & Cervical Pap Care'],
    headDoctor: 'Dr. Meera Nair',
    location: 'Block A, 2nd Floor',
    phoneExtension: 'Ext. 210'
  },
  {
    id: 'general-medicine',
    name: 'General & Internal Medicine',
    iconName: 'Stethoscope',
    shortDescription: 'Primary healthcare, management of chronic conditions, lifestyle disorders, and preventive wellness.',
    fullDescription: 'The backbone of hospital healthcare. Our internal medicine specialists handle complex multi-system ailments, diabetes management, hypertension control, infectious diseases, and routine health checks.',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
    servicesOffered: ['Diabetes & Metabolic Syndrome Clinic', 'Hypertension & Lipid Control', 'Infectious Disease Care', 'Comprehensive Executive Health Screening', 'Adult Immunizations'],
    headDoctor: 'Dr. Rahul Malhotra',
    location: 'Block B, 1st Floor',
    phoneExtension: 'Ext. 101'
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology & Hepatology',
    iconName: 'Activity',
    shortDescription: 'Advanced endoscopy, colonoscopy, liver disease management, and digestive tract care.',
    fullDescription: 'Specialized diagnostic and therapeutic gastroenterology equipped with video endoscopy units, capsule endoscopy, and dedicated liver clinics for fatty liver, cirrhosis, and gastrointestinal cancers.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    servicesOffered: ['Upper GI Endoscopy & Colonoscopy', 'ERCP & Biliary Interventions', 'Liver & Hepatitis Specialty Clinic', 'IBD & Celiac Disease Care', 'Gastrointestinal Cancer Screening'],
    headDoctor: 'Dr. Vikram Singh',
    location: 'Block C, 2nd Floor',
    phoneExtension: 'Ext. 208'
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology & Respiratory Care',
    iconName: 'Wind',
    shortDescription: 'Asthma, COPD, sleep apnea diagnosis, bronchoscopy, and post-COVID pulmonary rehabilitation.',
    fullDescription: 'Our pulmonary specialists treat obstructive lung diseases, respiratory infections, interstitial lung disease, and sleep disorders using digital PFT labs and sleep monitoring units.',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=80',
    servicesOffered: ['Pulmonary Function Testing (PFT)', 'Flexible Bronchoscopy', 'Sleep Apnea Diagnostic Study', 'Asthma & Allergy Clinic', 'Respiratory Intensive Care'],
    headDoctor: 'Dr. Sameer Joshi',
    location: 'Block D, 3rd Floor',
    phoneExtension: 'Ext. 305'
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology & Eye Care',
    iconName: 'Eye',
    shortDescription: 'Laser vision correction, cataract surgeries, glaucoma management, and pediatric eye care.',
    fullDescription: 'Equipped with phacoemulsification technology, corneal topography, and OCT imaging for comprehensive eye care, vision correction, and retinal treatments.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    servicesOffered: ['No-Stitch Cataract Surgery', 'Diabetic Retinopathy Screening', 'Glaucoma Laser Treatment', 'Refractive Vision Correction', 'Pediatric Eye Evaluation'],
    headDoctor: 'Dr. Sunita Rao',
    location: 'Block C, 1st Floor',
    phoneExtension: 'Ext. 115'
  },
  {
    id: 'ent',
    name: 'ENT & Head and Neck Surgery',
    iconName: 'Ear',
    shortDescription: 'Sinusitis care, micro-ear surgery, voice therapy, and endoscopic skull base procedures.',
    fullDescription: 'Our ENT department treats diseases of the ear, nose, throat, and thyroid. Features video laryngoscopy, audiometry booths, and micro-otology instruments.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    servicesOffered: ['Endoscopic Sinus Surgery (FESS)', 'Micro-Ear Tympanoplasty', 'Hearing Loss Assessment & Hearing Aids', 'Voice & Swallowing Therapy', 'Thyroid & Salivary Gland Surgery'],
    headDoctor: 'Dr. Alok Verma',
    location: 'Block D, 1st Floor',
    phoneExtension: 'Ext. 118'
  },
  {
    id: 'urology',
    name: 'Urology & Kidney Care',
    iconName: 'ShieldAlert',
    shortDescription: 'Laser kidney stone retrieval, prostate surgery, reconstructive urology, and male health.',
    fullDescription: 'Offering minimally invasive laser lithotripsy for kidney stones, prostate care, uro-oncology, and hemodialysis support in collaboration with Nephrology.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    servicesOffered: ['Laser Lithotripsy for Kidney Stones', 'Prostate Enucleation (HoLEP)', 'Urodynamics & Incontinence Care', 'Hemodialysis Unit Care', 'Male Infertility Treatment'],
    headDoctor: 'Dr. Manish Gupta',
    location: 'Block B, 3rd Floor',
    phoneExtension: 'Ext. 309'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Ananya Sharma',
    title: 'Senior Consultant Cardiologist',
    specialty: 'Interventional Cardiology & Electrophysiology',
    departmentId: 'cardiology',
    departmentName: 'Cardiology',
    experienceYears: 18,
    rating: 4.9,
    reviewCount: 340,
    photo: 'https://images.unsplash.com/photo-1594824813571-27a3f060ee92?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Ananya Sharma is a renowned cardiologist with over 18 years of clinical expertise in complex coronary interventions, structural heart disease, and non-invasive cardiac imaging. She earned her MD and DM in Cardiology from prestigious AIIMS Delhi and completed advanced fellowship in Cardiac Electrophysiology in London.',
    qualifications: ['MBBS', 'MD (Internal Medicine)', 'DM (Cardiology)', 'Fellowship in Interventional Cardiology (UK)'],
    areasOfExpertise: ['Angioplasty & Stenting', 'Pacemaker Implantation', 'Heart Failure Management', 'Preventive Cardiology'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    consultationFee: '₹1,000 / $50',
    consultationType: ['In-Person', 'Teleconsultation'],
    roomNumber: 'A-301'
  },
  {
    id: 'doc-2',
    name: 'Dr. Rohan Mehta',
    title: 'Director & Chief Neurologist',
    specialty: 'Stroke Care & Neuro-Interventions',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    experienceYears: 22,
    rating: 4.95,
    reviewCount: 410,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Rohan Mehta is a pioneer in acute stroke management and neuro-critical care. He has successfully treated over 10,000 neurological cases and is a prominent speaker at global neurology conferences.',
    qualifications: ['MBBS', 'MD (Medicine)', 'DM (Neurology)', 'FACS (USA)'],
    areasOfExpertise: ['Thrombolysis & Acute Stroke', 'Epilepsy & Seizures', 'Parkinson’s Disease', 'Multiple Sclerosis Care'],
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    consultationFee: '₹1,200 / $60',
    consultationType: ['In-Person', 'Teleconsultation'],
    roomNumber: 'B-204'
  },
  {
    id: 'doc-3',
    name: 'Dr. Priya Kapoor',
    title: 'Senior Pediatrician & Neonatologist',
    specialty: 'Child Healthcare & Neonatal Intensive Care',
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics & Neonatology',
    experienceYears: 14,
    rating: 4.88,
    reviewCount: 290,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Priya Kapoor is loved by young patients and parents alike. Known for her empathetic approach, she specializes in premature infant resuscitation, childhood nutrition, and pediatric asthma.',
    qualifications: ['MBBS', 'DCH', 'MD (Pediatrics)', 'Fellowship in Neonatology'],
    areasOfExpertise: ['NICU Critical Care', 'Vaccination Schedule', 'Growth & Developmental Assessment', 'Childhood Allergies'],
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
    consultationFee: '₹800 / $40',
    consultationType: ['In-Person', 'Teleconsultation'],
    roomNumber: 'A-112'
  },
  {
    id: 'doc-4',
    name: 'Dr. Arjun Verma',
    title: 'Chief Orthopedic & Joint Surgeon',
    specialty: 'Robotic Joint Replacement & Sports Injuries',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics & Joint Replacement',
    experienceYears: 19,
    rating: 4.92,
    reviewCount: 380,
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Arjun Verma has performed over 3,500 joint replacement procedures using state-of-the-art robotic assistance. He serves as orthopedics advisor to regional sports academies.',
    qualifications: ['MBBS', 'MS (Orthopedics)', 'M.Ch (Orthopedics - UK)', 'Fellowship in Robotic Surgery'],
    areasOfExpertise: ['Total Knee Replacement', 'Total Hip Replacement', 'ACL & Ligament Reconstruction', 'Complex Trauma Surgery'],
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    consultationFee: '₹1,100 / $55',
    consultationType: ['In-Person'],
    roomNumber: 'C-008'
  },
  {
    id: 'doc-5',
    name: 'Dr. Neha Iyer',
    title: 'Consultant Dermatologist & Cosmetologist',
    specialty: 'Clinical Dermatology & Laser Therapeutics',
    departmentId: 'dermatology',
    departmentName: 'Dermatology & Cosmetology',
    experienceYears: 11,
    rating: 4.85,
    reviewCount: 220,
    photo: 'https://images.unsplash.com/photo-1594824813571-27a3f060ee92?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Neha Iyer integrates clinical dermatology with aesthetic expertise to deliver customized skin treatments for patients of all ages.',
    qualifications: ['MBBS', 'MD (Dermatology, Venereology & Leprosy)', 'Diploma in Aesthetic Medicine'],
    areasOfExpertise: ['Psoriasis & Eczema', 'Acne Scar Laser Therapy', 'Anti-Aging Treatments', 'Hair Loss & PRP Therapy'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    consultationFee: '₹900 / $45',
    consultationType: ['In-Person', 'Teleconsultation'],
    roomNumber: 'D-402'
  },
  {
    id: 'doc-6',
    name: 'Dr. Vikram Singh',
    title: 'Senior Gastroenterologist & Hepatologist',
    specialty: 'Advanced Endoscopy & Liver Care',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    experienceYears: 16,
    rating: 4.89,
    reviewCount: 275,
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Vikram Singh is a expert in diagnostic and therapeutic GI procedures, specializing in acid reflux, inflammatory bowel disease (IBD), and liver health.',
    qualifications: ['MBBS', 'MD (Medicine)', 'DM (Gastroenterology)'],
    areasOfExpertise: ['Upper GI Endoscopy & Colonoscopy', 'Fatty Liver & Cirrhosis Care', 'Acid Reflux & GERD', 'GI Malignancy Screening'],
    availableDays: ['Monday', 'Thursday', 'Friday', 'Saturday'],
    consultationFee: '₹1,000 / $50',
    consultationType: ['In-Person', 'Teleconsultation'],
    roomNumber: 'C-208'
  },
  {
    id: 'doc-7',
    name: 'Dr. Meera Nair',
    title: 'Senior Consultant Obstetrician & Gynecologist',
    specialty: 'High-Risk Pregnancy & Laparoscopic Surgery',
    departmentId: 'gynecology',
    departmentName: 'Obstetrics & Gynecology',
    experienceYears: 17,
    rating: 4.94,
    reviewCount: 430,
    photo: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Meera Nair brings decades of maternal care experience, guiding mothers safely through high-risk births, minimally invasive surgeries, and holistic wellness.',
    qualifications: ['MBBS', 'MS (Obstetrics & Gynaecology)', 'DNB', 'FICOG'],
    areasOfExpertise: ['High-Risk Maternity Care', 'Laparoscopic Fibroid Removal', 'PCOS & Infertility Guidance', 'Menopause Counseling'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    consultationFee: '₹1,000 / $50',
    consultationType: ['In-Person', 'Teleconsultation'],
    roomNumber: 'A-210'
  },
  {
    id: 'doc-8',
    name: 'Dr. Rahul Malhotra',
    title: 'Head of Internal Medicine',
    specialty: 'Preventive Healthcare & Chronic Disease Management',
    departmentId: 'general-medicine',
    departmentName: 'General & Internal Medicine',
    experienceYears: 20,
    rating: 4.91,
    reviewCount: 510,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Rahul Malhotra specializes in managing complex, multi-organ lifestyle diseases like type-2 diabetes, hypertension, and metabolic syndrome.',
    qualifications: ['MBBS', 'MD (Internal Medicine)', 'FICP', 'Postgraduate Diploma in Diabetology'],
    areasOfExpertise: ['Diabetes Management', 'Hypertension & Lipid Control', 'Infectious Diseases', 'Executive Wellness Checkups'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    consultationFee: '₹800 / $40',
    consultationType: ['In-Person', 'Teleconsultation'],
    roomNumber: 'B-101'
  },
  {
    id: 'doc-9',
    name: 'Dr. Sameer Joshi',
    title: 'Senior Pulmonologist & Sleep Specialist',
    specialty: 'Respiratory Care & Sleep Medicine',
    departmentId: 'pulmonology',
    departmentName: 'Pulmonology & Respiratory Care',
    experienceYears: 15,
    rating: 4.87,
    reviewCount: 210,
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Sameer Joshi treats chronic obstructive pulmonary disease (COPD), severe asthma, interstitial lung disease, and obstructive sleep apnea.',
    qualifications: ['MBBS', 'MD (Pulmonary Medicine)', 'DTCD', 'FCCP (USA)'],
    areasOfExpertise: ['Asthma & Allergy Care', 'Bronchoscopy', 'Sleep Apnea Diagnosis', 'Pulmonary Rehabilitation'],
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    consultationFee: '₹950 / $48',
    consultationType: ['In-Person', 'Teleconsultation'],
    roomNumber: 'D-305'
  },
  {
    id: 'doc-10',
    name: 'Dr. Sunita Rao',
    title: 'Chief Ophthalmic Surgeon',
    specialty: 'Cataract, Refractive & Retina Specialist',
    departmentId: 'ophthalmology',
    departmentName: 'Ophthalmology & Eye Care',
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 310,
    photo: 'https://images.unsplash.com/photo-1594824813571-27a3f060ee92?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Sunita Rao is known for precise micro-incision cataract surgeries and computerized retinal diagnostics, giving thousands of patients restored vision.',
    qualifications: ['MBBS', 'MS (Ophthalmology)', 'FRCS (Glasgow)', 'Fellowship in Retina'],
    areasOfExpertise: ['Phacoemulsification Cataract Surgery', 'Laser Vision Correction', 'Glaucoma Care', 'Diabetic Retinopathy'],
    availableDays: ['Tuesday', 'Thursday', 'Friday', 'Saturday'],
    consultationFee: '₹900 / $45',
    consultationType: ['In-Person'],
    roomNumber: 'C-115'
  }
];

export const SERVICES: MedicalService[] = [
  {
    id: 'srv-emergency',
    title: '24/7 Emergency & Trauma Care',
    category: 'Emergency',
    iconName: 'Ambulance',
    shortDescription: 'Round-the-clock level-1 emergency response with dedicated trauma bays, critical care transport, and cardiac resuscitation.',
    fullDescription: 'Our 24/7 Emergency Department is staffed by board-certified emergency physicians, triage nurses, and trauma surgeons. Equipped with point-of-care ultrasound, instant blood analyzer, and dedicated minor procedure rooms to handle critical medical crises instantly.',
    benefits: ['Immediate triage with zero wait for critical cases', '24/7 ACLS-equipped Advanced Life Support Ambulance', 'Direct access to emergency Cath Lab and Operation Theaters', 'On-site trauma team with neuro, cardiac, and orthopedic specialists'],
    departmentId: 'general-medicine'
  },
  {
    id: 'srv-opd',
    title: 'Outpatient Consultations (OPD)',
    category: 'Outpatient',
    iconName: 'UserCheck',
    shortDescription: 'Comprehensive outpatient specialist consultations across 30+ medical disciplines with digital appointment booking.',
    fullDescription: 'Designed for efficient, seamless consultations with top specialists. Features streamlined registration, electronic health records (EHR), integrated pharmacy, and diagnostic lab collection in the same wing.',
    benefits: ['Easy online & mobile booking', 'Zero registration hassle with digital queue tracking', 'Multi-specialty second opinions available', 'Comfortable air-conditioned waiting lounges'],
    departmentId: 'general-medicine'
  },
  {
    id: 'srv-ipd',
    title: 'Inpatient Suites & Care (IPD)',
    category: 'Inpatient',
    iconName: 'Bed',
    shortDescription: 'Comfortable private rooms, deluxe suites, and general wards designed for optimal patient recovery and monitoring.',
    fullDescription: 'PrimeCare Hospital provides state-of-the-art inpatient accommodation equipped with ergonomic electric beds, central oxygen supply, nurse call systems, high-speed Wi-Fi, and personalized dietary management overseen by clinical nutritionists.',
    benefits: ['Single, Deluxe, and VIP Private Suites', '24/7 dedicated nursing care and room service', 'Central telemetry monitoring for cardiac/vulnerable patients', 'Balanced custom diets prepared by clinical dietitians'],
    departmentId: 'general-medicine'
  },
  {
    id: 'srv-imaging',
    title: 'Diagnostic Imaging & Radiology',
    category: 'Diagnostics',
    iconName: 'Scan',
    shortDescription: '3T MRI, 128-slice CT Scanner, 3D/4D Ultrasound, Digital Mammography, and High-Frequency X-Rays.',
    fullDescription: 'Our Radiology suite utilizes low-radiation digital imaging technology backed by PACS cloud archiving for instant physician report sharing.',
    benefits: ['Sub-millimeter resolution 3T MRI scanning', 'Low-dose 128-Slice Cardiac CT Angiography', 'Instant digital reports available online', '24/7 emergency radiology support'],
    departmentId: 'general-medicine'
  },
  {
    id: 'srv-lab',
    title: '24/7 Pathology & Laboratory Services',
    category: 'Diagnostics',
    iconName: 'TestTube',
    shortDescription: 'NABL accredited automated pathology lab offering routine, specialized, and emergency blood diagnostics.',
    fullDescription: 'High-throughput robotic analyzers handle hematology, biochemistry, microbiology, immunology, and histopathology tests with extreme accuracy and rapid turnaround times.',
    benefits: ['Home blood sample collection available', 'Automated barcoded tracking for zero sample mix-up', 'Emergency STAT test results in under 60 minutes', 'NABL accredited standards of quality control'],
    departmentId: 'general-medicine'
  },
  {
    id: 'srv-pharmacy',
    title: '24/7 Hospital Pharmacy',
    category: 'Outpatient',
    iconName: 'Pill',
    shortDescription: 'Fully stocked in-house pharmacy dispensing authentic prescription medicines, surgical supplies, and health supplements.',
    fullDescription: 'Temperature-controlled storage ensuring medicine potency, staffed by licensed pharmacists offering drug interaction guidance and dosage instructions.',
    benefits: ['24-hour availability every day of the year', 'Temperature-monitored cold chain storage for vaccines and insulin', 'Bedside delivery for discharged inpatient care', '100% genuine certified pharmaceuticals'],
    departmentId: 'general-medicine'
  },
  {
    id: 'srv-health-checkup',
    title: 'Executive Health Checkup Packages',
    category: 'Specialized',
    iconName: 'ClipboardCheck',
    shortDescription: 'Customized preventive health screening packages designed for individuals, seniors, women, and corporate teams.',
    fullDescription: 'Preventive health packages combining comprehensive blood work, cardiac stress tests, imaging, cancer markers, and multi-specialty physician consults in a single half-day visit.',
    benefits: ['Early detection of silent diseases (Diabetes, Hypertension, Fatty Liver)', 'Dedicated health checkup lounge with complimentary breakfast', 'Comprehensive physician report summary and counseling', 'Customized corporate health packages'],
    departmentId: 'general-medicine'
  },
  {
    id: 'srv-surgery',
    title: 'Minimally Invasive & Robotic Surgery',
    category: 'Surgical',
    iconName: 'Scissors',
    shortDescription: 'Ultra-modern modular Operation Theaters (OT) equipped with HEPA laminar air flow and laparoscopic units.',
    fullDescription: 'Our surgical suites host laparoscopic, endoscopic, and robotic surgical systems for gastrointestinal, urological, gynecological, and orthopedic interventions.',
    benefits: ['Smaller incisions with minimal scarring', 'Significantly faster recovery and shorter hospital stay', 'Ultraclean laminar air flow OTs minimizing infection risk', 'Experienced surgical anesthesiology team'],
    departmentId: 'orthopedics'
  },
  {
    id: 'srv-physio',
    title: 'Physiotherapy & Rehabilitation',
    category: 'Specialized',
    iconName: 'Activity',
    shortDescription: 'Comprehensive physical therapy, post-stroke rehabilitation, sports injury recovery, and pain management.',
    fullDescription: 'Advanced rehabilitation center offering electrotherapy, ultrasound therapy, hydrotherapy, gait training, and personalized exercise protocols by certified physical therapists.',
    benefits: ['Tailored post-surgical recovery plans', 'Non-surgical chronic joint pain management', 'Sports injury rehabilitation', 'Ergonomic & posture correction guidance'],
    departmentId: 'orthopedics'
  },
  {
    id: 'srv-maternity',
    title: 'Maternity & Childbirth Services',
    category: 'Specialized',
    iconName: 'Heart',
    shortDescription: 'Private LDR (Labor, Delivery, Recovery) suites, painless delivery options, and newborn care.',
    fullDescription: 'Creating a joyous, safe birthing experience with 24/7 obstetricians, epidural anesthesia support, fetal monitoring, and immediate pediatric newborn evaluation.',
    benefits: ['Spacious private LDR birthing suites', 'Water birth & painless epidural delivery options', '24/7 NICU standby for high-risk deliveries', 'Lactation consulting & postnatal newborn classes'],
    departmentId: 'gynecology'
  },
  {
    id: 'srv-pediatric-care',
    title: 'Pediatric Specialty Care',
    category: 'Outpatient',
    iconName: 'Baby',
    shortDescription: 'Dedicated child-friendly pediatric clinics, routine immunizations, and child development therapy.',
    fullDescription: 'A welcoming environment built specifically for children to minimize medical anxiety during checkups and vaccinations.',
    benefits: ['Child-friendly waiting room with play area', 'Painless vaccination techniques', 'Comprehensive growth & milestone tracking', '24/7 pediatric emergency availability'],
    departmentId: 'pediatrics'
  },
  {
    id: 'srv-preventive',
    title: 'Preventive Healthcare & Vaccination',
    category: 'Specialized',
    iconName: 'ShieldCheck',
    shortDescription: 'Adult and pediatric vaccinations, lifestyle counseling, and wellness screening programs.',
    fullDescription: 'Focusing on illness prevention through adult flu/pneumococcal vaccines, travel vaccines, nutrition counseling, and smoking cessation clinics.',
    benefits: ['Adult immunization schedules (Flu, HPV, Pneumonia, Hepatitis)', 'Lifestyle & weight management guidance', 'Cardiovascular risk stratification', 'Community health awareness drives'],
    departmentId: 'general-medicine'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Sunil Verma',
    age: 54,
    treatment: 'Coronary Angioplasty',
    department: 'Cardiology',
    quote: 'Everyone at PrimeCare Hospital made the process feel simple, clear, and reassuring. From emergency admission to post-angioplasty care, Dr. Ananya Sharma and her team were phenomenal.',
    rating: 5,
    date: 'July 14, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'test-2',
    patientName: 'Kavita Deshmukh',
    age: 38,
    treatment: 'Maternity & Childbirth',
    department: 'Obstetrics & Gynecology',
    quote: 'Delivering our baby girl at PrimeCare Hospital was the best experience we could have wished for. The LDR suite was pristine and the nursing staff was immensely supportive.',
    rating: 5,
    date: 'June 28, 2026',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'test-3',
    patientName: 'Rajesh Singhania',
    age: 62,
    treatment: 'Robotic Knee Replacement',
    department: 'Orthopedics',
    quote: 'I was back on my feet walking comfortably within days after my knee surgery. Dr. Arjun Verma is truly a master in orthopedic surgery. Highly recommend PrimeCare!',
    rating: 5,
    date: 'May 19, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'test-4',
    patientName: 'Pooja Hegde',
    age: 29,
    treatment: 'Pediatric Care for Son',
    department: 'Pediatrics',
    quote: 'When my 3-year-old son developed a high fever at night, the emergency team and Dr. Priya Kapoor provided immediate, comforting care. We feel so safe with PrimeCare nearby.',
    rating: 5,
    date: 'August 02, 2026',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Understanding Preventive Health Checkups: Why Early Detection Matters',
    category: 'Preventive Health',
    author: 'Dr. Rahul Malhotra',
    authorRole: 'Head of Internal Medicine',
    date: 'August 01, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    snippet: 'Learn how routine health screenings can identify silent risk factors like high blood pressure, elevated cholesterol, and early diabetes long before symptoms appear.',
    content: [
      'Preventive health checkups are designed to catch health conditions before they manifest as severe medical issues. Many common chronic illnesses, including hypertension, high cholesterol, and type-2 diabetes, develop silently without noticeable early warning signs.',
      'A comprehensive annual health checkup typically includes blood chemistry analysis, lipid profiles, liver and kidney function tests, ECG, and ultrasound screenings.',
      'By identifying metabolic shifts early, physicians can recommend targeted lifestyle modifications or early medical therapy that prevents long-term organ damage and keeps you living vibrantly.'
    ],
    tags: ['Health Checkup', 'Preventive Care', 'Wellness', 'Heart Health']
  },
  {
    id: 'blog-2',
    title: 'When Should You Consult a Specialist? Key Warning Signs You Shouldn’t Ignore',
    category: 'Medical Advice',
    author: 'Dr. Ananya Sharma',
    authorRole: 'Senior Consultant Cardiologist',
    date: 'July 20, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80',
    snippet: 'Chest discomfort, persistent shortness of breath, unexplained joint swelling, or recurring headaches shouldn’t be brushed off. Here is when to see a specialist physician.',
    content: [
      'While general practitioners treat everyday ailments, certain symptoms require specialized diagnostic tools and expert intervention.',
      'Cardiology evaluation is crucial if you experience exertional chest tightness, unexplained dizziness, or heart palpitations.',
      'Similarly, sudden persistent weakness on one side of the face or body, slurred speech, or unusual severe headaches warrant immediate neurological assessment.',
      'Listening to your body and seeking timely specialist consultation is the single most effective step toward preserving your health.'
    ],
    tags: ['Specialist Care', 'Symptoms', 'Cardiology', 'Neurology']
  },
  {
    id: 'blog-3',
    title: 'Everyday Habits for a Healthier Lifestyle & Stronger Immunity',
    category: 'Lifestyle & Wellness',
    author: 'Dr. Priya Kapoor',
    authorRole: 'Senior Pediatrician',
    date: 'July 10, 2026',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    snippet: 'Discover simple, evidence-based daily routines to boost immune resilience, improve sleep quality, and maintain high physical energy levels.',
    content: [
      'Immune health is built daily through consistent, manageable lifestyle choices rather than quick fixes or magical supplements.',
      '1. Prioritize 7-8 hours of quality sleep to enable cellular repair and cytokine production.',
      '2. Hydrate adequately with 2.5-3 liters of clean water daily.',
      '3. Incorporate color-rich whole foods containing natural antioxidants, Vitamin C, Zinc, and dietary fiber.',
      '4. Engage in 30 minutes of moderate physical exercise like brisk walking, cycling, or yoga 5 days a week.'
    ],
    tags: ['Immunity', 'Nutrition', 'Healthy Living', 'Exercise']
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    category: 'Appointments',
    question: 'How do I book an appointment at PrimeCare Hospital?',
    answer: 'Booking an appointment is quick and seamless. You can book directly through our online "Book Appointment" tab, select your preferred department, doctor, date, and time slot, and submit the patient details. You will receive an instant confirmation reference number. Alternatively, you can call our helpline at +91 11 2345 6789.'
  },
  {
    id: 'faq-2',
    category: 'Appointments',
    question: 'Can I choose a specific doctor for my consultation?',
    answer: 'Yes, absolutely. Our doctor directory allows you to browse doctor profiles, view their qualifications, specialties, and available days, and choose your preferred doctor during booking.'
  },
  {
    id: 'faq-3',
    category: 'Appointments',
    question: 'What should I bring to my medical appointment?',
    answer: 'Please bring a valid photo ID card, any prior medical records/test reports, list of current prescription medications, and health insurance details if applicable. Arriving 15 minutes prior to your scheduled time is recommended.'
  },
  {
    id: 'faq-4',
    category: 'Services',
    question: 'How can I find a specific department or service room in the hospital?',
    answer: 'PrimeCare Hospital features clear floor signage and helpful information desks at every main entrance (Block A, B, C, D). You can also view department floor locations on our website under the "Departments" page or ask any hospital coordinator.'
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'How can I contact PrimeCare Hospital for general inquiries?',
    answer: 'You can reach us by phone at +91 11 2345 6789, email us at contact@primecarehospital.demo, or send a message via our Contact page form. Our team will assist you promptly.'
  },
  {
    id: 'faq-6',
    category: 'Emergency',
    question: 'How do I access 24/7 emergency medical services?',
    answer: 'For medical emergencies, call our dedicated emergency line +91 11 2345 9999 or hotline 102 immediately. Our Emergency & Trauma wing is open 24 hours a day, 365 days a year with on-site ambulances and trauma teams.'
  }
];

export const TIME_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:30 PM',
  '05:00 PM'
];
