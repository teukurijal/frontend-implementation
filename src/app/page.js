"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./components/Layout";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch tasks from the API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Add task
  const handleAddTask = () => {
    const newTask = { title: taskInput, completed: false };
    axios
      .post("https://jsonplaceholder.typicode.com/todos", newTask)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setTaskInput("");
      });
  };

  // Delete task
  const handleDeleteTask = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      });
  };

  // Edit task
  const handleEditTask = (id, title) => {
    axios
      .patch(`https://jsonplaceholder.typicode.com/todos/${id}`, { title })
      .then((response) => {
        const updatedTasks = tasks.map((task) =>
          task.id === id ? response.data : task,
        );
        setTasks(updatedTasks);
      });
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Layout>
      <div className="p-8">
        <input
          type="text"
          className="border p-2"
          placeholder="Add new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={handleAddTask} className="bg-blue-500 text-white p-2">
          Add Task
        </button>
        <input
          type="text"
          className="border p-2 mt-4"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center p-2">
              <div>
                <span>{task.title}</span>
                <div>
                  <button
                    onClick={() => handleEditTask(task.id, "New Title")}
                    className="bg-yellow-500 text-white p-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-red-500 text-white p-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
