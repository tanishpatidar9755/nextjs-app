"use client";

import { useState, type FormEvent } from "react";
import type { Task, TaskInput } from "@/types/task";

type TaskFormProps = {
  taskToEdit: Task | null;
  disabled: boolean;
  onSave: (task: TaskInput) => void;
  onCancelEdit: () => void;
};

export function TaskForm({
  taskToEdit,
  disabled,
  onSave,
  onCancelEdit,
}: TaskFormProps) {
  const [title, setTitle] = useState(taskToEdit?.title ?? "");
  const [description, setDescription] = useState(
    taskToEdit?.description ?? "",
  );
  const isEditing = taskToEdit !== null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({ title: title.trim(), description: description.trim() });

    if (!isEditing) {
      setTitle("");
      setDescription("");
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? "Edit task" : "Add a task"}</h2>
      <div className="field">
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="For example, prepare project notes"
          maxLength={100}
          required
          disabled={disabled}
        />
      </div>
      <div className="field">
        <label htmlFor="task-description">Description (optional)</label>
        <textarea
          id="task-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add a few details..."
          maxLength={500}
          disabled={disabled}
        />
      </div>
      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={disabled}>
          {isEditing ? "Save changes" : "Add task"}
        </button>
        {isEditing && (
          <button
            className="button button-secondary"
            type="button"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
