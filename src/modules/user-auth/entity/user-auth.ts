export interface UserAuthType {
  id: string;
  companyId?: string;
  firstName: string;
  lastName: string;
  nickName: string;
  iat?: number;
  exp?: number;
}
