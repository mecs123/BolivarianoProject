export interface AuthResponse {
  id?: number; // Asegúrate de que esté presente solo si es necesario
  username?: string;
  fullName?: string;
  email?: string;
  dateOfBirth?: Date;
  phone?: number;
  isEnabled?: boolean;
  accountNoExpired?: boolean;
  credentialsNoExpired?: boolean;
  accountNoLocked?: boolean;
  roles: string[]; // Este es el array de roles que está vinculado al formulario
  roleRequest?: { roleListName?: string[] }; // Este campo es opcional y depende del formulario
}
