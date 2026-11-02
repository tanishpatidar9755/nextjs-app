import type { Task } from "@/types/task";

const STORAGE_KEY = "task-manager.tasks";

function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const task = value as Record<string, unknown>;

  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    typeof task.description === "string" &&
    typeof task.completed === "boolean" &&
    typeof task.createdAt === "string"
  );
}

export function loadTasks(): Task[] {
  const storedTasks = window.localStorage.getItem(STORAGE_KEY);

  if (storedTasks === null) {
    return [];
  }

  const parsedTasks: unknown = JSON.parse(storedTasks);

  if (!Array.isArray(parsedTasks) || !parsedTasks.every(isTask)) {
    throw new Error("Saved task data has an invalid format.");
  }

  return parsedTasks;
}

export function saveTasks(tasks: Task[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
