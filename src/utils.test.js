import gql from "graphql-tag";
import { createHash } from "./utils";

describe("utils", () => {
  test("same hash", () => {
    const query1 = gql`
      query {
        continents {
          name
          first
        }
      }
    `;

    const query2 = gql`
      query {
        continents {
          name
          first
        }
      }
    `;

    const hash1 = createHash(query1);
    const hash2 = createHash(query2);

    expect(hash1).toEqual(hash2);
  });

  test("hash confusion", () => {
    const query1 = gql`
      query {
        continents {
          name
          first
        }
      }
    `;

    const query2 = gql`
      query {
        continents {
          namefirst
        }
      }
    `;

    const hash1 = createHash(query1);
    const hash2 = createHash(query2);

    expect(hash1).not.toEqual(hash2);
  });
});
