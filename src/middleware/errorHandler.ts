import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { CustomError } from "../helpers";

const errorHandler: ErrorRequestHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  let customError = err as CustomError;

  if (!(customError instanceof CustomError)) {
    customError = new CustomError("Internal Server Error", 500);
  }

  console.error("Error:", customError.message);
  if (customError.stack) {
    console.error("Stack:", customError.stack);
  }

  res.status(customError.status).json({
    message: customError.message,
    ...(customError.data && { data: customError.data }),
  });
};

export default errorHandler;
