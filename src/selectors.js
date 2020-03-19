import { createHash } from "./utils";

const defaultState = { isFetching: false, data: null };
const defaultHeaders = { "Content-Type": "application/json" };

export const select = query => state =>
  state?.graphql?.[createHash(query)] ?? defaultState;

export const getUrl = state => state?.graphql?.url ?? "";

export const getUrlAliases = state => state?.graphql?.urlAliases ?? {};

export const getHeaders = state => {
  return {
    ...defaultHeaders,
    ...(state?.graphql?.headers ?? {})
  };
};
