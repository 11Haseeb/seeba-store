// Api Failed
class ApiFailed extends Error {
  statusCode: number;
  message: string;
  errors: unknown;
  success: boolean;

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: unknown = {},
    success: boolean = false
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = success;
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors,
      success: this.success,
    };
  }

  static createError(
    statusCode: number,
    message: string = "Something went wrong",
    errors: unknown = {}
  ) {
    const error = new ApiFailed(statusCode, message, errors);

    return new Response(JSON.stringify(error), {
      status: error.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Api Failed
class ApiSuccess {
  statusCode: number;
  message: string;
  data: unknown;
  success: boolean;

  constructor(
    statusCode: number,
    message: string = "Success",
    data: unknown = {},
    success: boolean = statusCode < 400
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = success;
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
      success: this.success,
    };
  }

  static createResponse(
    statusCode: number,
    message: string = "Success",
    data: unknown = {}
  ) {
    const response = new ApiSuccess(statusCode, message, data);

    return new Response(JSON.stringify(response), {
      status: response.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Api Error
const ApiError = ApiFailed.createError;

// Api Response
const ApiResponse = ApiSuccess.createResponse;

export { ApiError, ApiResponse };
