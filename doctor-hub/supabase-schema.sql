-- Doctor Hub Supabase/Postgres schema
-- Paste this full file into Supabase SQL Editor and run it once.
-- The application uses Prisma cuid() IDs, so IDs are stored as text.

create extension if not exists "pgcrypto";

do $$
begin
  create type "Role" as enum ('PATIENT', 'DOCTOR', 'ASSISTANT', 'ADMIN', 'SUPER_ADMIN');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type "TreatmentType" as enum ('ALLOPATHIC', 'HOMEOPATHIC', 'HERBAL');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type "AppointmentStatus" as enum ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type "PaymentStatus" as enum ('PENDING', 'VERIFIED', 'REJECTED');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.users (
  id text primary key,
  name text,
  email text unique,
  password text,
  role "Role" not null default 'PATIENT',
  phone text,
  avatar text,
  otp_hash text,
  otp_expires timestamp(3),
  created_at timestamp(3) not null default current_timestamp,
  updated_at timestamp(3) not null default current_timestamp,
  is_active boolean not null default true
);

create table if not exists public.patients (
  id text primary key,
  user_id text not null unique references public.users(id) on delete cascade on update cascade,
  date_of_birth timestamp(3),
  blood_group text,
  address text,
  emergency_contact text
);

create table if not exists public.doctors (
  id text primary key,
  user_id text not null unique references public.users(id) on delete cascade on update cascade,
  specialization text not null,
  qualifications text[] not null,
  license_number text not null unique,
  experience integer not null,
  bio text,
  consultation_fee numeric(10, 2) not null,
  treatment_type "TreatmentType" not null,
  rating double precision not null default 0.0,
  total_reviews integer not null default 0,
  is_verified boolean not null default false
);

create table if not exists public.doctor_diseases (
  id text primary key,
  doctor_id text not null references public.doctors(id) on delete cascade on update cascade,
  disease_name text not null
);

create table if not exists public.clinics (
  id text primary key,
  doctor_id text not null references public.doctors(id) on delete cascade on update cascade,
  name text not null,
  address text not null,
  city text not null,
  phone text,
  map_link text
);

create table if not exists public.schedules (
  id text primary key,
  clinic_id text not null references public.clinics(id) on delete cascade on update cascade,
  day_of_week text not null,
  start_time text not null,
  end_time text not null,
  slot_duration integer not null,
  max_patients integer not null,
  is_active boolean not null default true
);

create table if not exists public.appointments (
  id text primary key,
  patient_id text not null references public.patients(id) on delete cascade on update cascade,
  doctor_id text not null references public.doctors(id) on delete cascade on update cascade,
  clinic_id text not null references public.clinics(id) on delete cascade on update cascade,
  schedule_id text not null references public.schedules(id) on delete cascade on update cascade,
  appointment_date timestamp(3) not null,
  time_slot text not null,
  status "AppointmentStatus" not null default 'PENDING',
  notes text,
  created_at timestamp(3) not null default current_timestamp
);

create table if not exists public.payments (
  id text primary key,
  appointment_id text not null unique references public.appointments(id) on delete cascade on update cascade,
  amount numeric(10, 2) not null,
  screenshot_url text,
  status "PaymentStatus" not null default 'PENDING',
  verified_by text,
  verified_at timestamp(3),
  rejection_reason text
);

create table if not exists public.medical_histories (
  id text primary key,
  patient_id text not null references public.patients(id) on delete cascade on update cascade,
  doctor_id text not null references public.doctors(id) on delete cascade on update cascade,
  appointment_id text not null unique references public.appointments(id) on delete cascade on update cascade,
  diagnosis text not null,
  symptoms text[] not null,
  notes text,
  created_at timestamp(3) not null default current_timestamp
);

create table if not exists public.prescriptions (
  id text primary key,
  medical_history_id text not null unique references public.medical_histories(id) on delete cascade on update cascade,
  doctor_id text not null references public.doctors(id) on delete cascade on update cascade,
  patient_id text not null references public.patients(id) on delete cascade on update cascade,
  medicines jsonb not null,
  instructions text,
  issued_at timestamp(3) not null default current_timestamp
);

create table if not exists public.assistants (
  id text primary key,
  user_id text not null unique references public.users(id) on delete cascade on update cascade,
  doctor_id text references public.doctors(id) on delete set null on update cascade
);

create table if not exists public.reviews (
  id text primary key,
  patient_id text not null references public.patients(id) on delete cascade on update cascade,
  doctor_id text not null references public.doctors(id) on delete cascade on update cascade,
  appointment_id text not null unique references public.appointments(id) on delete cascade on update cascade,
  rating integer not null,
  comment text,
  created_at timestamp(3) not null default current_timestamp
);

create table if not exists public.notifications (
  id text primary key,
  user_id text not null references public.users(id) on delete cascade on update cascade,
  title text not null,
  message text not null,
  type text not null,
  is_read boolean not null default false,
  created_at timestamp(3) not null default current_timestamp
);

create index if not exists users_email_idx on public.users(email);
create index if not exists doctor_diseases_doctor_id_idx on public.doctor_diseases(doctor_id);
create index if not exists clinics_doctor_id_idx on public.clinics(doctor_id);
create index if not exists schedules_clinic_id_idx on public.schedules(clinic_id);
create index if not exists appointments_patient_id_idx on public.appointments(patient_id);
create index if not exists appointments_doctor_id_idx on public.appointments(doctor_id);
create index if not exists appointments_clinic_id_idx on public.appointments(clinic_id);
create index if not exists appointments_schedule_id_idx on public.appointments(schedule_id);
create index if not exists appointments_appointment_date_idx on public.appointments(appointment_date);
create index if not exists appointments_status_idx on public.appointments(status);
create index if not exists payments_status_idx on public.payments(status);
create index if not exists medical_histories_patient_id_idx on public.medical_histories(patient_id);
create index if not exists medical_histories_doctor_id_idx on public.medical_histories(doctor_id);
create index if not exists prescriptions_doctor_id_idx on public.prescriptions(doctor_id);
create index if not exists prescriptions_patient_id_idx on public.prescriptions(patient_id);
create index if not exists assistants_doctor_id_idx on public.assistants(doctor_id);
create index if not exists reviews_patient_id_idx on public.reviews(patient_id);
create index if not exists reviews_doctor_id_idx on public.reviews(doctor_id);
create index if not exists notifications_user_id_idx on public.notifications(user_id);
create index if not exists notifications_is_read_idx on public.notifications(is_read);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = current_timestamp;
  return new;
end;
$$ language plpgsql;

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at
before update on public.users
for each row
execute function public.set_updated_at();
