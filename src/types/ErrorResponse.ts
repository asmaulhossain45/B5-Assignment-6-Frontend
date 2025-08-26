/* eslint-disable @typescript-eslint/no-explicit-any */
export type TErrorResponse = {
  success: boolean;
  message: string;
  errorSources?: any;
  err?: any | null;
  stack?: any | null;
};
