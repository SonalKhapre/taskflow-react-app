
import { useState, useEffect } from "react";
import "./App.css"
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  }

  function deleteTask(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  function toggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="app-container">
      <Header />

      <main className="dashboard">
        <section className="welcome-section">
          <div>
            <p className="eyebrow">YOUR PRODUCTIVITY SPACE</p>
            <h1>My Tasks</h1>
            <p className="welcome-text">
              Stay organized and get things done, one task at a time.
            </p>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card total-card">
            <span className="stat-label">Total Tasks</span>
            <h2>{totalTasks}</h2>
            <span className="stat-description">All your tasks</span>
          </div>

          <div className="stat-card completed-card">
            <span className="stat-label">Completed</span>
            <h2>{completedTasks}</h2>
            <span className="stat-description">Tasks finished</span>
          </div>

          <div className="stat-card pending-card">
            <span className="stat-label">Pending</span>
            <h2>{pendingTasks}</h2>
            <span className="stat-description">Still to do</span>
          </div>
        </section>

        <section className="task-section">
          <div className="section-heading">
            <div>
              <h2>Add a new task</h2>
              <p>What would you like to accomplish?</p>
            </div>
          </div>

          <TaskForm onAddTask={addTask} />
        </section>

        <section className="task-section task-list-section">
          <div className="section-heading">
            <div>
              <h2>Your task list</h2>
              <p>{filteredTasks.length} tasks displayed</p>
            </div>
          </div>

          <div className="filter-buttons">
            {["all", "pending", "completed"].map((item) => (
              <button
                key={item}
                className={`filter-button ${
                  filter === item ? "active" : ""
                }`}
                onClick={() => setFilter(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          <div className="tasks-list">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">✓</div>
                <h3>No tasks here yet</h3>
                <p>Add a task or select another filter.</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
