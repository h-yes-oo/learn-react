import { call, put } from 'redux-saga/effects';

export const createPromiseSaga = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    try{
      const payload = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload });
    } catch(e) {
      yield put({ type: ERROR, error: true, payload: e });
    }
  }
}

export const createPromiseSagaById = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    const id = action.meta;
    try {
      const payload = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload, meta: id });
    } catch (e) {
      yield put({ type: ERROR, error: e, meta: id });
    }
  };
};

export const createPromiseThunk = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return param => async dispatch => {
        dispatch({ type, param });
        try {
            const payload = await promiseCreator(param);
            dispatch({ type: SUCCESS, payload });
        } catch (e) {
            dispatch({ type: ERROR, payload: e, error: true });
        }
    };
};

export const reducerUtils = {
    initial: (initialData = null) => ({
        loading: false,
        data: initialData,
        error: null
    }),
    loading: (prevState = null) => ({
        loading: true,
        data: prevState,
        error: null
    }),
    success: payload => ({
        loading: false,
        data: payload,
        error: null
    }),
    error: error => ({
        loading: false,
        data: null,
        error: error
    })
};

export const handleAsyncActions = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
      switch (action.type) {
        case type:
          return {
            ...state,
            [key]: reducerUtils.loading(keepData ? state[key].data : null)
          };
        case SUCCESS:
          return {
            ...state,
            [key]: reducerUtils.success(action.payload)
          };
        case ERROR:
          return {
            ...state,
            [key]: reducerUtils.error(action.payload)
          };
        default:
          return state;
      }
    };
}

const defaultIdSelector = param => param;
export const createPromiseThunkById = (
    type,
    promiseCreator,
    idSelector = defaultIdSelector
) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return param => async dispatch => {
        const id = idSelector(param);
        dispatch({ type, meta: id });
        try {
          const payload = await promiseCreator(param);
          dispatch({ type: SUCCESS, payload, meta: id });
        } catch (e) {
          dispatch({ type: ERROR, error: true, payload: e, meta: id });
        }
    };
};

export const handleAsyncActionsById = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
      const id = action.meta;
      switch (action.type) {
        case type:
          return {
            ...state,
            [key]: {
              ...state[key],
              [id]: reducerUtils.loading(
                // state[key][id]가 만들어져있지 않을 수도 있으니까 유효성을 먼저 검사 후 data 조회
                keepData ? state[key][id] && state[key][id].data : null
              )
            }
          };
        case SUCCESS:
          return {
            ...state,
            [key]: {
              ...state[key],
              [id]: reducerUtils.success(action.payload)
            }
          };
        case ERROR:
          return {
            ...state,
            [key]: {
              ...state[key],
              [id]: reducerUtils.error(action.payload)
            }
          };
        default:
          return state;
      }
    };
  };
