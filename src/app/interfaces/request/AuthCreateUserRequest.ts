export interface AuthCreateUserRequest {
  id?: number;
  username?: string;
  password?: string;
  fullName?: string;
  email?: string;
  dateOfBirth?:Date;
  phone?: number;
  isEnabled?: boolean;
  accountNoExpired?: boolean;
  accountNoLocked?: boolean;
  roleRequest?: {
    roleListName?: string[];  // Esto coincide con el JSON
  };
}
