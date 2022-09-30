export enum AccountRole {
  None = 0,
  Driver = 1,
  Operator = 2,
  Manager = 4,
  Admin = 8,
}

export enum AccountStatus {
  Inactive,
  Active,
}

export interface IIdentity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: AccountRole;
  status: AccountStatus;
}
