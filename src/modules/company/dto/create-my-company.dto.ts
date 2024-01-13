export interface CreateMyCompanyDto {
  description: string;
  userId: string;
  initialBalanceDate: Date;
  name: string;
  planId?: number;
}
