export const loadTasksRequest = () => ({
  type: "LOAD_TASKS_REQUEST",
});

export const loadTasksSuccess = (tasks) => ({
  type: "LOAD_TASKS_SUCCESS",
  payload: tasks,
});

export const addTask = (task) => ({
  type: "ADD_TASK",
  payload: task,
});

export const deleteTask = (taskId) => ({
  type: "DELETE_TASK",
  payload: taskId,
});

export const toggleCompletion = (taskId) => ({
  type: "TOGGLE_COMPLETION",
  payload: taskId,
});

export const editTask = (taskId, newText) => ({
  type: "EDIT_TASK",
  payload: { id: taskId, text: newText },
});
