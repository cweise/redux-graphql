# Installation

```bash
npm i @cweise/redux-graphql
```

## API

| Name                           | Type     | Description                                       |
| ------------------------------ | -------- | ------------------------------------------------- |
| createReducer({ url: String }) | function | Create graphql reducer with at least url property |
| request(gql: Object)           | function | Redux action to receive remote data               |
| select(gql: Object)            | function | Redux selector to select data from state.         |

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
