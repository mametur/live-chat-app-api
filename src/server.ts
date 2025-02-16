"use strict";
import server from "./app";
import environment from "./config/environment";
import Logger from "./helpers/logger";

server.listen(environment.PORT, () => {
  Logger.debug(`Server running on http://localhost:${environment.PORT}`);
});
