const ethUtil = require("ethjs-util");

const decrypt = (msg: string, signature: string) => {
  const msgBuffer = ethUtil.toBuffer(msg);
  const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
  const signatureBuffer = ethUtil.toBuffer(signature);
  const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
  const publicKey = ethUtil.ecrecover(
    msgHash,
    signatureParams.v,
    signatureParams.r,
    signatureParams.s
  );
  return publicKey;
};

export default decrypt;
