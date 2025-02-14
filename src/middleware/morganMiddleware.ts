"use strict";
import morgan from "morgan";
import Logger from "../helpers/logger";

//Override the stream method bt telling
// Morgan to use our custom logger instead of the console.log
const stream = {
  write: (message: string) => Logger.http(message),
};

const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);

export default morganMiddleware;
