import type { User, LoginRequest }  from "./authData"

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

    return response.json();
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

    return response.json();
}