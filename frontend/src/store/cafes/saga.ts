import { call, put, takeEvery, all } from 'redux-saga/effects';
import { Cafe, addMultiple } from './reducer';


export function* fetchAllCafes(): Generator<any, any, any> {
  try {
    const response = yield call(fetch, `${import.meta.env.VITE_API_ENDPOINT}/cafes`);
    const data = yield response.json();
    yield put({ type: addMultiple.type, payload: data.data });
  } catch (error) {
    console.log(error);
  }
}
export function* fetchCafesPerLocation(action: { payload: string }): Generator<any, any, any> {
  try {
    const response = yield call(fetch, `${import.meta.env.VITE_API_ENDPOINT}/cafes?location=${action.payload}`);
    const data = yield response.json();
    yield put({ type: addMultiple.type, payload: data.data });
  } catch (error) {
    console.log(error);
  }
}

export function* updateCafe(action: { payload: Cafe }): Generator<any, any, any> {
  try {
    const response = yield call(fetch, `${import.meta.env.VITE_API_ENDPOINT}/cafe`, {
      method: 'PUT',
      body: JSON.stringify(action.payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = yield response.json();
    yield put({ type: addMultiple.type, payload: data.data });
  } catch (error) {
    console.log(error);
  }
}

export function* deleteCafe(action: { payload: string }): Generator<any, any, any> {
  try {
    const response = yield call(fetch, `${import.meta.env.VITE_API_ENDPOINT}/cafe?id=${action.payload}`, {
      method: 'DELETE',
    });
    const data = yield response.json();
    yield put({ type: addMultiple.type, payload: data.data });
  } catch (error) {
    console.log(error);
  }
}

export function* createCafe(action: { payload: Omit<Cafe, 'id'> }): Generator<any, any, any> {
  try {
    const response = yield call(fetch, `${import.meta.env.VITE_API_ENDPOINT}/cafe`, {
      method: 'POST',
      body: JSON.stringify(action.payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = yield response.json();
    yield put({ type: addMultiple.type, payload: data.data });
  } catch (error) {
    console.log(error);
  }
}

export function* root(): Generator<any, any, any> {
  yield all([
    takeEvery('fetchAllCafe', fetchAllCafes as any),
    takeEvery('fetchCafeByLocation', fetchCafesPerLocation as any),
    takeEvery('updateCafe', updateCafe as any),
    takeEvery('deleteCafe', deleteCafe as any),
    takeEvery('createCafe', createCafe as any),
  ]);
}
