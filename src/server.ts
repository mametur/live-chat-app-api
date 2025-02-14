"use strict";
import app from "./app";
import environment from "./config/environment";
import Logger from "./helpers/logger";

app.listen(environment.PORT, () => {
  Logger.debug(`Server running on http://localhost:${environment.PORT}`);
});
