
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div  className="task-item" >
      <span
       className={task.completed ? "task-title completed" : "task-title"}
      >
        {task.title}
      </span>

        <div className="task-actions">
    <button
      className="complete-btn"
      onClick={() => onToggle(task.id)}
    >
      {task.completed ? "Undo" : "Complete"}
    </button>
  <button
      className="delete-btn"
      onClick={() => onDelete(task.id)}
    >
      Delete
    </button>
  </div>
  </div>
  );
}

export default TaskItem;
