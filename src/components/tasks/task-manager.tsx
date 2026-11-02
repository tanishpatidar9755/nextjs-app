"use client";

import { useEffect, useState } from "react";
import { TaskForm } from "@/components/tasks/task-form";
import { TaskList } from "@/components/tasks/task-list";
import { loadTasks, saveTasks } from "@/lib/task-storage";
import type { Task, TaskInput } from "@/types/task";

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [storageMessage, setStorageMessage] = useState("");
  const taskToEdit = tasks.find((task) => task.id === editingTaskId) ?? null;

  useEffect(() => {
    let active = true;

    try {
      const savedTasks = loadTasks();
      queueMicrotask(() => {
        if (active) {
          setTasks(savedTasks);
          setCanSave(true);
          setIsReady(true);
        }
      });
    } catch {
      queueMicrotask(() => {
        if (active) {
          setStorageMessage(
            "Saved tasks could not be loaded. Check your browser storage before refreshing.",
          );
          setIsReady(true);
        }
      });
    }

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady || !canSave) {
      return;
    }

    try {
      saveTasks(tasks);
    } catch {
      queueMicrotask(() => {
        setCanSave(false);
        setStorageMessage(
          "Changes are available for this session, but could not be saved in browser storage.",
        );
      });
    }
  }, [tasks, isReady, canSave]);

  function saveTask(input: TaskInput) {
    if (editingTaskId) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTaskId ? { ...task, ...input } : task,
        ),
      );
      setEditingTaskId(null);
      return;
    }

    const newTask: Task = {
      ...input,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  function toggleTask(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );

    if (editingTaskId === taskId) {
      setEditingTaskId(null);
    }
  }

  return (
    <main className="app-shell">
      <header className="page-heading">
        <p className="eyebrow">Simple task manager</p>
        <h1>Stay on top of your work</h1>
        <p>Create, update, and track your tasks in one place.</p>
      </header>

      <div className="task-panel">
        <TaskForm
          key={taskToEdit?.id ?? "new-task"}
          taskToEdit={taskToEdit}
          disabled={!isReady}
          onSave={saveTask}
          onCancelEdit={() => setEditingTaskId(null)}
        />
        {storageMessage && (
          <p className="storage-message" role="status">
            {storageMessage}
          </p>
        )}
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onEdit={setEditingTaskId}
          onDelete={deleteTask}
        />
      </div>
    </main>
  );
}
