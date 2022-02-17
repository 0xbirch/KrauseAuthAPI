import * as express from "express";
import { Database } from "../db";
import AccountsRepository from "./accounts-repository";
import AccountsService from "./accounts-service";

export default class AccountsController {
  router: express.Router;

  constructor(database: Database) {
    /* eslint-disable new-cap */
    this.router = express.Router();
    const accountsRepository = new AccountsRepository(database);
    const accountsService = new AccountsService(accountsRepository);

    this.router.get("/nonce/:address", async (req, res) => {
      accountsService
        .getNonce(req.params.address)
        .then((nonce) => {
          res.status(200).send(nonce.toString());
        })
        .catch((err) => {
          res.status(err.code).send(err.message);
        });
    });

    this.router.post("/verify/:address", async (req, res) => {
      accountsService
        .verifyAccount(req.params.address, req.body.signedMessage)
        .then((isSuccessful) => {
          isSuccessful
            ? res.status(200).send("Success")
            : res.status(400).send("Failed");
        })
        .catch((err) => {
          res.status(err.code).send(err.message);
        });
    });
  }
}
