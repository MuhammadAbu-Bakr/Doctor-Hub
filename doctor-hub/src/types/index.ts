export type UserRole = "PATIENT" | "DOCTOR" | "ASSISTANT" | "ADMIN" | "SUPER_ADMIN";

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  phone: string | null;
  avatar: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
