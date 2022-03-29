import { useReducer, useCallback } from 'react';

enum HttpReducerActionKind {
  SEND = "SEND",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR"
}

export enum HttpReducerStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED"
}

// An interface for our actions
interface HttpReducerAction {
  type: HttpReducerActionKind;
  responseData?: string;
  errorMessage?: string;
}

interface HttpReducerState {
  data: any;
  error: any;
  status: HttpReducerStatus | null
}

function httpReducer(state: HttpReducerState, action: HttpReducerAction) {
  if (action.type === HttpReducerActionKind.SEND) {
    return {
      data: null,
      error: null,
      status: HttpReducerStatus.PENDING,
    };
  }

  if (action.type === HttpReducerActionKind.SUCCESS) {
    return {
      data: action.responseData,
      error: null,
      status: HttpReducerStatus.COMPLETED,
    };
  }

  if (action.type === HttpReducerActionKind.ERROR) {
    return {
      data: null,
      error: action.errorMessage,
      status: HttpReducerStatus.COMPLETED,
    };
  }

  return state;
}

function useHttp(requestFunction: (data: any) => any, startWithPending: boolean = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? HttpReducerStatus.PENDING : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData?) {
      dispatch({ type: HttpReducerActionKind.SEND });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: HttpReducerActionKind.SUCCESS, responseData });
      } catch (error: any) {
        dispatch({
          type: HttpReducerActionKind.ERROR,
          errorMessage: error.message || 'Something went wrong!',
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
