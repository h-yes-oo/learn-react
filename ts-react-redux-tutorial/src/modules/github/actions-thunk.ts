import { createAsyncAction } from 'typesafe-actions';
import { GithubProfile } from '../../api/github';
import { AxiosError } from 'axios';

export const GET_USER_PROFILE = 'github/GET_USER_PROFILE';
export const GET_USER_PROFILE_SUCCESS = 'github/GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_ERROR = 'github/GET_USER_PROFILE_ERROR';

// export const getUserProfile = createAction(GET_USER_PROFILE)();
// export const getUserProfileSuccess = createAction(GET_USER_PROFILE_SUCCESS)<GithubProfile>();
// export const getUserProfileError = createAction(GET_USER_PROFILE_ERROR)<AxiosError>();

export const getUserProfileAsync = createAsyncAction(
    GET_USER_PROFILE,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_ERROR
)<string, GithubProfile, AxiosError>();
