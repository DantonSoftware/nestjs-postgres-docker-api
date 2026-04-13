import { Role } from "../enums/role.enum";

export interface CurrentUserData {
  userId: number;
  email: string;
  role: Role;
}