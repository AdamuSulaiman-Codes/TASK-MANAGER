import React, { useState } from "react";
import type { User } from "../Auth/authData";
import { useDispatch, useSelector } from "react-redux";
import { addUserTask, type NewTask, type Task } from "../Pages/backendFunctions";
import { modalActions } from "../Store/ModalSlice";

type TaskPayload = {
  title: string;
  description: string;
  dueDate: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "PENDING" | "NOT_STARTED" | "COMPLETED";
  userId: number;
};
type RootState = {
  user: {
    user: User | null
  }
};

function AddTask() {
  const [formData, setFormData] = useState<TaskPayload>({
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM",
    status: "PENDING",
    userId: 0,
  });

  const user = useSelector((state : RootState) => state.user.user);
  const userId = user?.id;
  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === "userId" ? userId : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const task : NewTask = {    
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      status: formData.status,
      priority: formData.priority,
      userId: formData.userId,
    };

    await addUserTask(userId, localStorage.getItem("token"), task);
    dispatch(modalActions.closeModal());


  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="PENDING">PENDING</option>
            <option value="NOT_STARTED">NOT_STARTED</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;