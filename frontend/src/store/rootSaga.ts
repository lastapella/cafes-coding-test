import { all, fork } from 'redux-saga/effects';
import { root as employeesRootSaga } from './employees/saga';
import { root as cafesRootSaga } from './cafes/saga';

export default function* rootSaga() {
  yield all([fork(employeesRootSaga), fork(cafesRootSaga)]);
}

