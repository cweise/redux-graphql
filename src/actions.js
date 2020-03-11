import { REQUEST_START, REQUEST_SUCCESS, REQUEST_ERROR } from "./action-types";
import { print } from "graphql/language/printer";

import { createHash } from "./utils";
import { getUrl } from "./selectors";

const HTTP_METHOD = "POST";
const CONTENT_TYPE = "application/json";

const requestStart = payload => ({
  type: REQUEST_START,
  payload
});

const requestSuccess = payload => ({
  type: REQUEST_SUCCESS,
  payload
});

const requestError = payload => ({
  type: REQUEST_ERROR,
  payload
});

export const request = query => async (dispatch, getState) => {
  const queryHash = createHash(query);
  const url = getUrl(getState());

  dispatch(requestStart({ hash: queryHash }));

  fetch(url, {
    method: HTTP_METHOD,
    headers: {
      "Content-Type": CONTENT_TYPE
    },
    body: JSON.stringify({ query: print(query) })
  })
    .then(result => result.json())
    .then(result => {
      dispatch(requestSuccess({ hash: queryHash, data: result.data }));
    })
    .catch(err => {
      dispatch(requestError({ hash: queryHash, error: err }));
    });
};
