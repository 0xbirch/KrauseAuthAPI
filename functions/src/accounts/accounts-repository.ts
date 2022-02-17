import { Database } from "../db";

export default class AccountsRepository {
  database: Database;
  converter = {
    toFirestore: (newAccount: NewEthAccount) => {
      return {
        ethAddress: newAccount.ethAddress,
        nonce: Math.round(Math.random() * 100000),
      };
    },
    fromFirestore: (snapshot: any, options: any): EthAccount => {
      const data = snapshot.data(options);
      return {
        id: snapshot.id,
        ethAddress: data.ethAddress,
        nonce: data.nonce,
      } as EthAccount;
    },
  };

  constructor(_database: Database) {
    this.database = _database;
  }

  async getAccount(id: string): Promise<EthAccount> {
    const author = await this.database.find("accounts", id, this.converter);
    return author;
  }

  async createAccount(newAccount: NewEthAccount): Promise<EthAccount> {
    const account = await this.database.create(
      "accounts",
      newAccount,
      this.converter
    );
    return account;
  }

  async updateNonce(id: string): Promise<void> {
    await this.database.update("accounts", id, {
      nonce: Math.random() * 100000,
    });
  }
}
