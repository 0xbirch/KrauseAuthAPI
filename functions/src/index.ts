import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import database from "./db";
import AccountsController from "./accounts/accounts-controller";

const app = express();

app.use(cors({ origin: true }));

const authController = new AccountsController(database);
app.use("/", authController.router);

functions.logger.info("Starting server");

exports.authApi = functions.https.onRequest(app);
