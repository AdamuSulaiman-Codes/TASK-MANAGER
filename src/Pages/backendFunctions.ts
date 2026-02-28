export type Priority = "LOW" | "MEDIUM" | "HIGH";

export type Status = "PENDING" | "COMPLETED" | "NOT_STARTED";

export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string; // ISO date string from backend
  priority: Priority;
  status: Status;
  userId: number;
};

export type NewTask = {
  title: string;
  description: string;
  dueDate: string; // ISO date string from backend
  priority: Priority;
  status: Status;
  userId: number;
};

export async function getUserTask(userID: any, token: string | null) {
    const response = await fetch(`http://localhost:8080/api/task/get-user-task/${userID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        throw new Error("Unauthorized");
    }

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data: Task[] = await response.json();
    return data;
}

export async function addUserTask(userID: any, token: string | null, task: NewTask) {
    const response = await fetch(`http://localhost:8080/api/task/add-task/${userID}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(task)
    });

    if (response.status === 401) {
        throw new Error("Unauthorized");
    }

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);    
}