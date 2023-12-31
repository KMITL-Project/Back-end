export class CustomError extends Error {
  public code: string;
  public data?: any;

  constructor(message: string, code: string, data?: any) {
    super(message);
    this.code = code;
    this.data = data;
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
