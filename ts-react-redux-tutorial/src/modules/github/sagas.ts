import { getUserProfileAsync, GET_USER_PROFILE } from './actions';
import { getUserProfile, GithubProfile } from '../../api/github';
import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_USER_PROFILE_ERROR } from './actions-thunk';

function* getUserProfileSaga(action: ReturnType<typeof getUserProfileAsync.request>) {
    try{
        const userProfile: GithubProfile = yield call(getUserProfile, action.payload);
        yield put(getUserProfileAsync.success(userProfile));
    } catch (e) {
        yield put(getUserProfileAsync.failure(e));
    }
}

export function* githubSaga() {
    yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
}