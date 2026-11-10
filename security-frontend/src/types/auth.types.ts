export interface LoginBody {
    username: string;
    password: string;
}

export interface RegisterBody {
    username: string;
    password: string;
    role: 'admin' | 'user';
}

export interface LoginResponse {
    token: string;
    message: string;
}

export interface RegisterResponse {
    message: string;
    user : UserType;
}

export interface UserType {
    username: string;
    role: 'admin' | 'user';
}