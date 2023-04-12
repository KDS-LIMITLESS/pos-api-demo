
export enum UserRoles {
    Admin,
    Manager,
    Standard,
}
//** Types */

export interface IUser {
    full_name: string,
    email: string,
    pwdHash: string,
    role: UserRoles,
    phone_number: string
}

export interface ISessionUser {
    full_name: string,
    email: string,
    role: IUser['role']
}

