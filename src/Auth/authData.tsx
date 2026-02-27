export type User = {
    id?: Number,
    userName: string,
    email: string,
    password: string,
} | null ;

export type LoginRequest = {
    userName: string,
    password: string,
}
