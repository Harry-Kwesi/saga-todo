import { put, takeEvery } from "redux-saga/effects";
import { loadTasksSuccess } from "./actions";

function* loadTasksSaga() {
  try {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    yield put(loadTasksSuccess(storedTasks));
  } catch (error) {
    console.log(error);
  }
}

function* tasksSaga() {
  yield takeEvery("LOAD_TASKS_REQUEST", loadTasksSaga);
}

export default tasksSaga;
