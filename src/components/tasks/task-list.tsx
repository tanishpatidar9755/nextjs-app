"use client";

import type { Task } from "@/types/task";

type TaskListProps = {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
};

export function TaskList({ tasks, onToggle, onEdit, onDelete }: TaskListProps) {
  const remainingCount = tasks.filter((task) => !task.completed).length;

  return (
    <section className="task-list-section" aria-labelledby="task-list-heading">
      <div className="list-heading">
        <h2 id="task-list-heading">Your tasks</h2>
        <span className="task-count">
          {remainingCount} remaining · {tasks.length} total
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Add one above to get started.</p>
        </div>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              className={`task-item${task.completed ? " is-complete" : ""}`}
              key={task.id}
            >
              <input
                className="task-checkbox"
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                aria-label={`Mark "${task.title}" as ${
                  task.completed ? "incomplete" : "complete"
                }`}
              />
              <div className="task-content">
                <p className="task-title">{task.title}</p>
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
                <span className="task-date task-meta">
                  Added {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="task-actions">
                <button
                  className="text-button"
                  type="button"
                  onClick={() => onEdit(task.id)}
                  aria-label={`Edit "${task.title}"`}
                >
                  Edit
                </button>
                <button
                  className="text-button text-button-danger"
                  type="button"
                  onClick={() => onDelete(task.id)}
                  aria-label={`Delete "${task.title}"`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
