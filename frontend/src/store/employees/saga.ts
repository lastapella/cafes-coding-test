import { call, put, all, takeEvery } from 'redux-saga/effects';
import { Employee, addMultiple, add, update, remove } from './reducer';


export function* fetchAllEmployees(): Generator<any, any, any> {
  try {
    const response = yield call(fetch, `${import.meta.env.VITE_API_ENDPOINT}/employees`);
    const data = yield response.json();
    yield put({ type: addMultiple.type, payload: data.data });
  } catch (error) {
    console.log(error);
  }
}
export function* fetchEmployeesCafes(action: { payload: string }): Generator<any, any, any> {
  try {
    const cafeId = action.payload;
    const response = yield call(fetch, `${import.meta.env.VITE_API_ENDPOINT}/employees?cafe=${cafeId}`);
    const data = yield response.json();
    yield put({ type: addMultiple.type, payload: data.data });
  } catch (error) {
    console.log(error);
  }
}

export function* updateEmployee(action: { payload: Employee }): Generator<any, any, any> {
  try {
    const response = yield call(fetch, `${import.meta.env.VITE_API_EMDPOINT}/employee`, {
      method: 'PUT',
      body: JSON.stringify(action.payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = yield response.json();
    yield put({ type: update.type, payload: data.data });
  } catch (error) {
    console.log(error);
  }
}


export function* createEmployee(action: { payload: Omit<Employee, 'id'> }): Generator<any, any, any> {
  try {
    const response = yield call(fetch, `${import.meta.env.VITE_API_ENDPOINT}/employee`, {
      method: 'POST',
      body: JSON.stringify(action.payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = yield response.json();
    yield put({ type: add.type, payload: data.data });
  } catch (error) {
    console.log(error);
  }
}

export function* deleteEmployee(action: { payload: string }): Generator<any, any, any> {
  try {
    const response = yield call(fetch, `${import.meta.env.VITE_API_ENDPOINT}/employee?id=${action.payload}`, {
      method: 'DELETE',
    });
    yield response.json();
    yield put({ type: remove.type, payload: action.payload });
  } catch (error) {
    console.log(error);
  }
}

export function* root(): Generator<any, any, any> {
  yield all([
    takeEvery('fetchEmployeesCafes', fetchEmployeesCafes as any),
    takeEvery('fetchAllEmployees', fetchAllEmployees),
    takeEvery('updateEmployee', updateEmployee as any),
    takeEvery('createEmployee', createEmployee as any),
    takeEvery('deleteEmployee', deleteEmployee as any),
  ]);
}
