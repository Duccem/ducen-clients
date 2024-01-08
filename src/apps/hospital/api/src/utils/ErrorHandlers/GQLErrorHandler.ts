import { Error, InternalError } from 'core';
export function GraphQLErrorHandling(gqlError: any, e: any) {
  console.log(gqlError);
  let error: Error;
  if (e.originalError.thrownValue instanceof Error) {
    error = e.originalError.thrownValue;
  } else {
    error = new InternalError(gqlError.message);
  }
  return {
    message: error.getMessage(),
    code: error.getCode(),
    timestamp: error.getTimestamp(),
  };
}
