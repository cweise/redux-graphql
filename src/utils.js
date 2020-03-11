import jsum from "jsum";
import { Kind } from "graphql";

export const createHash = astNode => {
  if (astNode.kind !== Kind.DOCUMENT) {
    throw new Error("Invalid gql syntax.");
  }

  return jsum.digest(astNode, "SHA256", "hex");
};
