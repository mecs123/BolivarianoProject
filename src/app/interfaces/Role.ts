import { Permission } from "./Permission";

export interface Role {
  roleEnum: string;
  permissionList: Permission[];
}
