export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  profileImageUrl?: string
  createdAt: Date
  updatedAt: Date
}

export enum UserRole {
  ADMIN = 'admin'
}
