export interface UsuariosInterface {
  username: string;
  password: string;
  email: string;
  fullName: string;
  dateOfBirth: string;
  phone: string;
  isEnabled: boolean;
  accountNoExpired: boolean;
  accountNoLocked: boolean;
  credentialNoExpired: boolean;
  roleRequest: RoleRequest;
}
export interface RoleRequest {
  roleListName: string[];
}
