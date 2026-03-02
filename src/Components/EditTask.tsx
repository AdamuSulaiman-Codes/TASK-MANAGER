import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserTask, type Task } from "../Pages/backendFunctions";
import { modalActions } from "../Store/ModalSlice";
import { QueryClient } from "@tanstack/react-query";



type EditTaskProps = {
  task: Task; // the task to edit
  taskId: number; // the ID of the task to edit
  onSave: () => void; // callback to refresh task list after saving
};

function EditTask({ task, taskId, onSave }: EditTaskProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM" as "LOW" | "MEDIUM" | "HIGH",
    status: "PENDING" as "PENDING" | "NOT_STARTED" | "COMPLETED",
  });

  const queryClient = new QueryClient();
 
  const dispatch = useDispatch();

  // Pre-fill form when task prop changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status,
      });
    }
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskId) return;

    const updatedTask = {
      ...task,
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,       // ok if "yyyy-MM-dd"
      priority: formData.priority,
      status: formData.status,
      userId: task.userId,             // ⚠️ MUST be the real userId
    };

    await updateUserTask(taskId, localStorage.getItem("token"), updatedTask);
    await queryClient.refetchQueries({ queryKey: ["tasks"] });
    dispatch(modalActions.closeModal());
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
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
            value={formData.description || ""}
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
            value={formData.dueDate || ""}
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
            value={formData.priority || "MEDIUM"}
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
            value={formData.status || "PENDING"}
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
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          onClick={onSave}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditTask;