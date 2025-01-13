export interface AuthEditarUserRequest {
  id?: number;
  username: string;
  fullName?: string;
  email?: string;
  dateOfBirth?: Date;
  phone?: number;
  isEnabled?: boolean;
  accountNoExpired?: boolean;
  credentialsNoExpired?: boolean;
  accountNoLocked?: boolean;
  roleRequest?: {
    roleListName?: string[];  // Esto coincide con el JSON
  };

}
