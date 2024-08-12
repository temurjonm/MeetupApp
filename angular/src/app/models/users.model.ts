export interface IUsers {
    id: Number;
    userName: String;
    email: String;
    phone: String;
    gender: string;
}

export interface User {
    username: string;
    token: string;
    photoUrl?: string;
    knownAs?: string;
    gender?: string;
}