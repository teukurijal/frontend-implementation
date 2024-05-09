"use client";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Fetch tasks from an open-source API
  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
      );
      const data = await response.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = () => {
    const newTaskData = { id: Date.now(), title: newTask, completed: false };
    setTasks([newTaskData, ...tasks]);
    setNewTask("");
  };

  // Delete a task by filtering it out
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Start editing mode for a task
  const startEditTask = (id, title) => {
    setEditId(id);
    setEditTitle(title);
  };

  // Save the edited task
  const saveEditTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editId ? { ...task, title: editTitle } : task,
      ),
    );
    cancelEdit();
  };

  // Cancel editing mode
  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        className="border p-2 w-full mb-4"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={addTask}
      >
        Add Task
      </button>
      <ul className="mt-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="border-b py-2 flex justify-between items-center"
          >
            {editId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border p-1 mr-2"
                />
                <button
                  className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                  onClick={saveEditTask}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </>
            ) : (
              <div>
                <p>{task.title}</p>
                <div>
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                    onClick={() => startEditTask(task.id, task.title)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
}
