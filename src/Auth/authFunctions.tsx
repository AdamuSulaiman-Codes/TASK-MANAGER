import type { User, LoginRequest }  from "./authData"

export type AuthResponse = {
  accessToken: string;
  user: User;
};

export async function loginUser(loginUser : LoginRequest) {
    const response = await fetch("http://localhost:8080/api/auth/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data : AuthResponse = await response.json();
    return data;
}
export async function signUp(user : User) {
     const response = await fetch("http://localhost:8080/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data : AuthResponse = await response.json();
    return data;
}