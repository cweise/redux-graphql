# Installation

```bash
npm i @cweise/redux-graphql graphql-tag redux-thunk
```

## Usage

```javascript
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import gql from "graphql-tag";
import { request, select } from "@cweise/redux-graphql";

export const query = gql`
  query {
    continents {
      name
      code
    }
  }
`;

const MyComponent = () => {
  const dispatch = useDispatch();
  const { data, isFetching } = useSelector(select(query));

  useEffect(() => {
    dispatch(request(query));
  }, []);

  if (isFetching) {
    return "is fetching";
  }

  if (!data) {
    return null;
  }

  return (
    <ul>
      {data.continents.map(continent => (
        <li>{continent.name}</li>
      ))}
    </ul>
  );
};
```

## API

| Name                   | Type     | Description                                       |
| ---------------------- | -------- | ------------------------------------------------- |
| createReducer(options) | function | Create graphql reducer with at least url property |
| request(gql)           | function | Redux action to receive remote data               |
| select(gql)            | function | Redux selector to select data from state.         |

### `createReducer()` Options

| Option     | Type   | Description                                                                           |
| ---------- | ------ | ------------------------------------------------------------------------------------- |
| url \*     | string | A url that point to your graphql backend                                              |
| urlAliases | Object | If you have multiple graphql endpoints, you can add each of them here                 |
| tokenPath  | string | If you have an auth header already stored in your redux store you can connect it here |

\* required

---

## Setup

### Redux store

```javascript
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createReducer } from "@cweise/redux-graphql";

const reducer = combineReducers({
  graphql: createReducer({ url: "https://countries.trevorblades.com" })
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
```

### Dispatching and selecting

```javascript
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import gql from "graphql-tag";
import { request, select } from "@cweise/redux-graphql";

export const query = gql`
  query {
    continents {
      name
      code
    }
  }
`;

const MyComponent = () => {
  const dispatch = useDispatch();
  const { data, isFetching } = useSelector(select(query));

  useEffect(() => {
    dispatch(request(query));
  }, []);

  if (isFetching) {
    return "is fetching";
  }

  if (!data) {
    return null;
  }

  return (
    <ul>
      {data.continents.map(continent => (
        <li>{continent.name}</li>
      ))}
    </ul>
  );
};
```
