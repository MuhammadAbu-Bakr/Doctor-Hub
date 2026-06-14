import { PrismaClient, Role, TreatmentType, AppointmentStatus, PaymentStatus } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding database...");

  // Clean the database
  await prisma.notification.deleteMany();
  await prisma.review.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.medicalHistory.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.clinic.deleteMany();
  await prisma.doctorDisease.deleteMany();
  await prisma.assistant.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = bcrypt.hashSync("password123", 10);

  // 1. Super Admin
  const superAdminUser = await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "superadmin@doctorhub.com",
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
      phone: "+15550000001",
    },
  });

  // 2. Admin
  const adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@doctorhub.com",
      password: hashedPassword,
      role: Role.ADMIN,
      phone: "+15550000002",
    },
  });

  // 3. Doctor 1 (Allopathic - Cardiology)
  const doc1User = await prisma.user.create({
    data: {
      name: "Dr. John Doe",
      email: "doctor.allopathic@doctorhub.com",
      password: hashedPassword,
      role: Role.DOCTOR,
      phone: "+15551111111",
    },
  });

  const doctor1 = await prisma.doctor.create({
    data: {
      userId: doc1User.id,
      specialization: "Cardiology",
      qualifications: ["MBBS", "MD - Cardiology"],
      licenseNumber: "LIC-ALLO-001",
      experience: 12,
      bio: "Experienced cardiologist specializing in interventional cardiology and cardiovascular health.",
      consultationFee: 150.00,
      treatmentType: TreatmentType.ALLOPATHIC,
      rating: 4.8,
      totalReviews: 1,
      isVerified: true,
    },
  });

  await prisma.doctorDisease.createMany({
    data: [
      { doctorId: doctor1.id, diseaseName: "Hypertension" },
      { doctorId: doctor1.id, diseaseName: "Coronary Artery Disease" },
      { doctorId: doctor1.id, diseaseName: "Arrhythmia" },
    ],
  });

  const clinic1 = await prisma.clinic.create({
    data: {
      doctorId: doctor1.id,
      name: "Heart Care Center",
      address: "123 Cardiac Ave, Suite 400",
      city: "New York",
      phone: "+15551234567",
      mapLink: "https://maps.google.com/?q=Heart+Care",
    },
  });

  const schedule1 = await prisma.schedule.create({
    data: {
      clinicId: clinic1.id,
      dayOfWeek: "Monday",
      startTime: "09:00",
      endTime: "13:00",
      slotDuration: 20,
      maxPatients: 12,
      isActive: true,
    },
  });

  await prisma.schedule.create({
    data: {
      clinicId: clinic1.id,
      dayOfWeek: "Wednesday",
      startTime: "14:00",
      endTime: "18:00",
      slotDuration: 20,
      maxPatients: 12,
      isActive: true,
    },
  });

  // 4. Doctor 2 (Homeopathic - Holistic)
  const doc2User = await prisma.user.create({
    data: {
      name: "Dr. Jane Smith",
      email: "doctor.homeopathic@doctorhub.com",
      password: hashedPassword,
      role: Role.DOCTOR,
      phone: "+15552222222",
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      userId: doc2User.id,
      specialization: "Homeopathic Medicine",
      qualifications: ["BHMS", "MD - Homeopathy"],
      licenseNumber: "LIC-HOME-002",
      experience: 8,
      bio: "Dedicated homeopathy practitioner focusing on holistic healing and long-term wellness.",
      consultationFee: 80.00,
      treatmentType: TreatmentType.HOMEOPATHIC,
      rating: 0.0,
      totalReviews: 0,
      isVerified: true,
    },
  });

  await prisma.doctorDisease.createMany({
    data: [
      { doctorId: doctor2.id, diseaseName: "Migraine" },
      { doctorId: doctor2.id, diseaseName: "Chronic Fatigue" },
      { doctorId: doctor2.id, diseaseName: "Eczema" },
    ],
  });

  const clinic2 = await prisma.clinic.create({
    data: {
      doctorId: doctor2.id,
      name: "Natural Healing Clinic",
      address: "456 Holistic Rd",
      city: "Boston",
      phone: "+15559876543",
      mapLink: "https://maps.google.com/?q=Natural+Healing",
    },
  });

  const schedule2 = await prisma.schedule.create({
    data: {
      clinicId: clinic2.id,
      dayOfWeek: "Tuesday",
      startTime: "10:00",
      endTime: "15:00",
      slotDuration: 30,
      maxPatients: 10,
      isActive: true,
    },
  });

  // 5. Assistant linked to Doctor 1
  const assistantUser = await prisma.user.create({
    data: {
      name: "Mark Assistant",
      email: "assistant.one@doctorhub.com",
      password: hashedPassword,
      role: Role.ASSISTANT,
      phone: "+15553333333",
    },
  });

  await prisma.assistant.create({
    data: {
      userId: assistantUser.id,
      doctorId: doctor1.id,
    },
  });

  // 6. Patients
  const patient1User = await prisma.user.create({
    data: {
      name: "Alice Johnson",
      email: "patient.one@doctorhub.com",
      password: hashedPassword,
      role: Role.PATIENT,
      phone: "+15554444444",
    },
  });

  const patient1 = await prisma.patient.create({
    data: {
      userId: patient1User.id,
      dateOfBirth: new Date("1990-05-15"),
      bloodGroup: "O+",
      address: "789 Patient St, New York, NY",
      emergencyContact: "+15554440000",
    },
  });

  const patient2User = await prisma.user.create({
    data: {
      name: "Bob Williams",
      email: "patient.two@doctorhub.com",
      password: hashedPassword,
      role: Role.PATIENT,
      phone: "+15555555555",
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      userId: patient2User.id,
      dateOfBirth: new Date("1985-08-20"),
      bloodGroup: "A-",
      address: "456 Patient Blvd, Boston, MA",
      emergencyContact: "+15555550000",
    },
  });

  const patient3User = await prisma.user.create({
    data: {
      name: "Charlie Brown",
      email: "patient.three@doctorhub.com",
      password: hashedPassword,
      role: Role.PATIENT,
      phone: "+15556666666",
    },
  });

  const patient3 = await prisma.patient.create({
    data: {
      userId: patient3User.id,
      dateOfBirth: new Date("1995-12-10"),
      bloodGroup: "B+",
      address: "123 Patient Ln, Brooklyn, NY",
      emergencyContact: "+15556660000",
    },
  });

  // 7. Sample Appointments & Transactions
  
  // Appointment 1: Completed, with Medical History, Prescription, Review & Verified Payment
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 1);

  const appointment1 = await prisma.appointment.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      clinicId: clinic1.id,
      scheduleId: schedule1.id,
      appointmentDate: pastDate,
      timeSlot: "09:20",
      status: AppointmentStatus.COMPLETED,
      notes: "Regular cardiac checkup for blood pressure tracking.",
    },
  });

  await prisma.payment.create({
    data: {
      appointmentId: appointment1.id,
      amount: 150.00,
      screenshotUrl: "https://uploadthing.com/f/screenshot-pay1.png",
      status: PaymentStatus.VERIFIED,
      verifiedBy: adminUser.id,
      verifiedAt: pastDate,
    },
  });

  const medHistory = await prisma.medicalHistory.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      appointmentId: appointment1.id,
      diagnosis: "Mild Hypertension",
      symptoms: ["headache", "occasional dizziness"],
      notes: "Patient advised to reduce daily salt intake, perform 30 minutes of aerobic walking, and check blood pressure daily.",
    },
  });

  await prisma.prescription.create({
    data: {
      medicalHistoryId: medHistory.id,
      doctorId: doctor1.id,
      patientId: patient1.id,
      medicines: [
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      ],
      instructions: "Take Lisinopril orally in the morning after breakfast.",
    },
  });

  await prisma.review.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      appointmentId: appointment1.id,
      rating: 5,
      comment: "Dr. John Doe was very patient and explained the causes of my high blood pressure clearly.",
    },
  });

  // Appointment 2: Pending appointment (with pending payment)
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1);

  const appointment2 = await prisma.appointment.create({
    data: {
      patientId: patient2.id,
      doctorId: doctor2.id,
      clinicId: clinic2.id,
      scheduleId: schedule2.id,
      appointmentDate: futureDate,
      timeSlot: "10:30",
      status: AppointmentStatus.PENDING,
      notes: "First time seeking homeopathic consult for chronic migraines.",
    },
  });

  await prisma.payment.create({
    data: {
      appointmentId: appointment2.id,
      amount: 80.00,
      screenshotUrl: "https://uploadthing.com/f/screenshot-pay2.png",
      status: PaymentStatus.PENDING,
    },
  });

  // Appointment 3: Confirmed appointment
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 3);

  const appointment3 = await prisma.appointment.create({
    data: {
      patientId: patient3.id,
      doctorId: doctor1.id,
      clinicId: clinic1.id,
      scheduleId: schedule1.id,
      appointmentDate: nextWeek,
      timeSlot: "11:40",
      status: AppointmentStatus.CONFIRMED,
      notes: "Follow-up consultation to discuss ECG results.",
    },
  });

  await prisma.payment.create({
    data: {
      appointmentId: appointment3.id,
      amount: 150.00,
      screenshotUrl: "https://uploadthing.com/f/screenshot-pay3.png",
      status: PaymentStatus.VERIFIED,
      verifiedBy: adminUser.id,
      verifiedAt: new Date(),
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
