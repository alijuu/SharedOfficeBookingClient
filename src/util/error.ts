import { AxiosError } from "axios";

export interface ApplicationHttpError<T, D> extends HttpError {
  axiosError: AxiosError<T, D>;
  apiError?: ApiErrorResponse;
}

export interface ApiErrorResponse {
  message: string;
  code: string;
  traceId: string;
}

export interface HttpError {
  message: string;
  statusCode: number;
  errors?: ValidationErrors;
}
export interface ValidationErrors {
  [field: string]:
    | string
    | string[]
    | boolean
    | { key: string; message: string };
}
