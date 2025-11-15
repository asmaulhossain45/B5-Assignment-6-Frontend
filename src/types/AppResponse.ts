import type { IMetaResponse } from "./IMeta";

export type AppResponse<T = unknown> = {
  success: boolean;
  message: string;
  statusCode?: number;
  data?: T;
  meta?: IMetaResponse;
};
