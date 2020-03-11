import { createHash } from "./utils";

const defaultState = { isFetching: false, data: null };

export const select = query => state =>
  state?.graphql?.[createHash(query)] ?? defaultState;

export const getUrl = state => state?.graphql?.url ?? "";
