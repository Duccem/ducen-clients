# MAIN API

## Authentication

This API use an bearer token as authentication method using the JWT standard, you need to append a header "Authorization" to the request
that are protected by user policies, the format of this header is `"Authorization":"bearer ${token}" ` by example.

## Requests

Requests to the server must be made through the URLs: `${BASE_URL}/graphql/`.

### The base urls:

```
  development = https://ducen-backend-production.up.railway.app/
  local = http://127.0.0.1:3000
```

## Query

The queries are selections of data over an entity in the system, can search por single objects, collections and nested objects trees

### Parameters on queries:

- **offset**: This parameter indicates the index where the data path begins.`
- **limit**: This parameter indicates the length of the array of data.
- **order**: This parameter indicates the order of the array ascendent/descendent.
- **orderBy**: This parameter indicates the key or field by which the array will be ordered.
- **filters**: This parameter is an array of objects that contain sub params
  - **value**: The value with the filter is created.
  - **operator**: type of filter.
  - **field** the model key by the filter is created.

### Example

```graphql
query {
  users(offset: 5, limit: 10, order: "asc", orderBy: "username", filters: [
    { field: "username", operator: "<", value: "ducen" }
  ]) {
    _id
    username
    firstName
    email
    address {
      city
    }
  }
}
```

### Types

```js

enum OrderTypes {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}


enum Operator {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GT = '>',
  LT = '<',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS',
}

```

## Codes

### Responses

| Response | Description                                                 | Message         | Code |
| -------- | ----------------------------------------------------------- | --------------- | ---- |
| Success  | Everything was good and the response is expected as desired | Ok              | 200  |
| Created  | The data its saved and the record created successfully      | Record created  | 201  |
| Updated  | The record was successfully updated                         | Record updated  | 201  |
| Deleted  | The record was deleted from the api                         | Record deleted  | 200  |
| Founded  | The entity was founded                                      | Element founded | 200  |

### Errors

| Response         | Description                                   | Message                                    | Code |
| ---------------- | --------------------------------------------- | ------------------------------------------ | ---- |
| Internal         | Internal server error                         | Internal server error                      | 500  |
| Bad Request      | The request have parameters or format invalid | Bad Request                                | 400  |
| Forbidden        | The user is not allowed to use this resource  | Your not allowed to use this resource      | 403  |
| Unauthorized     | The credentials or token are invalids         | Invalid credentials                        | 401  |
| Not found        | The resource or the services was not founded  | Not found                                  | 404  |
| Invalid Argument | The argument passed is invalid                | Argument with bad format or doesn't exists | 400  |
