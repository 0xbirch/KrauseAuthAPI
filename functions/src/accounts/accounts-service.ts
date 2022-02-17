import ErrorResult from "../types/error";
import decrypt from "../util/decrypt";
import AccountsRepository from "./accounts-repository";

export default class AccountsService {
  accountsRepository: AccountsRepository;

  constructor(_accountsRepository: AccountsRepository) {
    this.accountsRepository = _accountsRepository;
  }

  async verifyAccount(
    address: string,
    signedMessage: string
  ): Promise<boolean> {
    const account = await this.accountsRepository.getAccount(address);
    if (!account) {
      throw new ErrorResult(404, "Account not found");
    }

    let result: boolean;
    if (decrypt(signedMessage, account.nonce.toString()) == address) {
      result = true;
    } else {
      result = false;
    }

    this.accountsRepository.updateNonce(address);
    return result;
  }

  async getNonce(address: string): Promise<number> {
    const account =
      (await this.accountsRepository.getAccount(address)) ??
      (await this.accountsRepository.createAccount({
        ethAddress: address,
      } as NewEthAccount));
    return account.nonce;
  }
}
