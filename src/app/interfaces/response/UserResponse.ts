export interface UserResponse {
  id: number;
  username: string;
  fullName: string | null;
  email: string;
  dateOfBirth: string | null;
  phone: string;
  isEnabled: boolean;
  accountNoExpired: boolean;
  accountNoLocked: boolean;
  roles: string[];
}
