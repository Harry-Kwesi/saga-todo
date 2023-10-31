const initialState = {
  tasks: [],
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_TASKS_SUCCESS":
      return {
        ...state,
        tasks: action.payload,
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "TOGGLE_COMPLETION":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            return { ...task, completed: !task.completed };
          }
          return task;
        }),
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return { ...task, text: action.payload.text };
          }
          return task;
        }),
      };
    default:
      return state;
  }
};

export default tasksReducer;
