export type AppResponse<T = unknown> = {
  success: boolean;
  message: string;
  statusCode?: number;
  data?: T;
};
