import { getHeaders } from "./selectors";

describe("selectors", () => {
  test("get headers", () => {
    const state = {
      graphql: {
        tokenPath: "auth.access_token"
      },
      auth: {
        access_token: "MY_SECRET_TOKEN"
      }
    };

    const expected = {
      "Content-Type": "application/json",
      Authorization: `Bearer MY_SECRET_TOKEN`
    };

    const headers = getHeaders(state);

    expect(headers).toEqual(expected);
  });
});
