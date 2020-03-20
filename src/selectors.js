import { createHash } from "./utils";

const defaultState = { isFetching: false, data: null };
const defaultHeaders = { "Content-Type": "application/json" };

export const select = query => state =>
  state?.graphql?.[createHash(query)] ?? defaultState;

export const getUrl = state => state?.graphql?.url ?? "";

export const getUrlAliases = state => state?.graphql?.urlAliases ?? {};

export const getTokenPath = state => state?.graphql?.tokenPath ?? "";

export const getHeaders = state => {
  const tokenPath = getTokenPath(state);
  const token = state[tokenPath];
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  return {
    ...defaultHeaders,
    ...(state?.graphql?.headers ?? {}),
    ...authHeaders
  };
};
