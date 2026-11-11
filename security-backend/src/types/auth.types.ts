export interface User {
    username : string;
    password : string;
    role : 'user' | 'admin';
}

export interface LoginBody {
    username : string;
    password : string;
}

export interface RegisterBody extends LoginBody {
    role? : 'admin' | 'user';
}

export interface JwtPayload {
    username : string;
    role : 'user' | 'admin';
}
