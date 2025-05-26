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

export function parseAxiosError(error: unknown): string {
  if (error && typeof error === "object" && "isAxiosError" in error) {
    const axiosError = error as AxiosError;

    const responseData = axiosError.response?.data as
      | { message?: string }
      | undefined;

    if (responseData?.message) {
      return responseData.message;
    }

    const statusText = axiosError.response?.statusText;
    if (statusText) {
      return statusText;
    }

    return axiosError.message || "An unknown error occurred.";
  }

  return "An unknown error occurred.";
}

export function isApplicationHttpError<T = unknown, D = unknown>(
  error: unknown,
): error is ApplicationHttpError<T, D> {
  return error != null && typeof error === "object" && "axiosError" in error;
}
