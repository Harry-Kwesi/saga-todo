import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadTasksRequest,
  addTask,
  deleteTask,
  toggleCompletion,
  editTask,
} from "./actions";

function TaskList() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [taskText, setTaskText] = useState("");
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    dispatch(loadTasksRequest());
  }, [dispatch]);


  const updateLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAddTask = () => {
    const trimmedText = taskText.trim();
    if (trimmedText === "") return;

    const newTask = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    dispatch(addTask(newTask)); 
    updateLocalStorage(updatedTasks); 
    setTaskText("");
  };


  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    dispatch(deleteTask(id)); 
    updateLocalStorage(updatedTasks); 
  };


  const handleToggleCompletion = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    dispatch(toggleCompletion(id)); 
    updateLocalStorage(updatedTasks); 
  };


  const enterEditMode = (id) => {
    setEditMode(id);
  };

 
  const exitEditMode = (id, newText) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, text: newText };
      }
      return task;
    });
    dispatch(editTask(id, newText)); 
    updateLocalStorage(updatedTasks); /
    setEditMode(null);
  };

  return (
    <div>
      <h1>Task List</h1>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.length === 0 ? (
          <li>No tasks yet</li>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onToggleCompletion={handleToggleCompletion}
              onEnterEditMode={enterEditMode}
              onExitEditMode={exitEditMode}
              editMode={editMode}
            />
          ))
        )}
      </ul>
    </div>
  );
}

function TaskItem({
  task,
  onDelete,
  onToggleCompletion,
  onEnterEditMode,
  onExitEditMode,
  editMode,
}) {
  const [editedText, setEditedText] = useState(task.text);

  return (
    <li>
      {editMode === task.id ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={() => onExitEditMode(task.id, editedText)}>
            Save
          </button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleCompletion(task.id)}
          />
          <span>{task.text}</span>
          <button onClick={() => onDelete(task.id)}>Delete</button>
          <button onClick={() => onEnterEditMode(task.id)}>Edit</button>
        </>
      )}
    </li>
  );
}

export default TaskList;
