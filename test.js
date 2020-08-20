const TronGrid = require("trongrid");
const TronWeb = require("tronweb");
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey =
  "ff55065cd34756d69546.............550ff18df5fd035e8b4094b2dd84f1";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

// https://api.trongrid.io 은 TRON 메인넷 주소입니다.
// const tronWeb = new TronWeb({
//   fullHost: "https://api.trongrid.io",
// });

const tronGrid = new TronGrid(tronWeb);
tronGrid.setExperimental("your experimental key");

async function getAccount(pAccount) {
  const address = pAccount;

  const options = {
    Show_assets: true,
    only_confirmed: true,
  };

  // awaiting
  const account = await tronGrid.account.get(address, options);
  console.log({ account });

  // promise
  tronGrid.account
    .get(address, options)
    .then((account) => {
      console.log({ account });
    })
    .catch((err) => console.error(err));

  // callback
  tronGrid.account.get(address, options, (err, account) => {
    if (err) return console.error(err);

    console.log({ account });
  });
}

async function getTransactions(pAccount) {
  const address = pAccount;

  const options = {
    only_to: true,
    only_confirmed: true,
    limit: 100,
    order_by: "timestamp,asc",
    min_timestamp: Date.now() - 2 * 30 * 24 * 60 * 60 * 1000, // from a minute ago to go on
  };

  // awaiting
  const transactions = await tronGrid.account.getTransactions(address, options);
  console.log({ transactions });

  // promise
  tronGrid.account
    .getTransactions(address, options)
    .then((transactions) => {
      console.log({ transactions });
    })
    .catch((err) => console.error(err));

  // callback
  tronGrid.account.getTransactions(address, options, (err, transactions) => {
    if (err) return console.error(err);

    console.log({ transactions });
  });
}

async function getAssets(pAccount) {
  const address = "TU5zKDbqWHzvMHBRRhPceBZMkE2XdYXVvG";
  const options = {};

  // awaiting
  const assets = await tronGrid.asset.get(address);
  console.log({ assets });

  // promise
  tronGrid.asset
    .get(address, options)
    .then((assets) => {
      console.log({ assets });
    })
    .catch((err) => console.error(err));

  // callback
  tronGrid.asset.get(address, options, (err, assets) => {
    if (err) return console.error(err);

    console.log({ assets });
  });
}

const fromAccount = "TQj2LC7dfbfQxBHMGFw6YnC59QaGSCbPyo";
const toAccount = "TLyof5GQ3Z2uAz7X2wf67wLpEQejGR9djR";
const trc20ContractAddress = "TWfZkEYjdPx2sr8MurMG5CtdXHvEsf5uSB";

test();

async function sendToken() {
  const { abi } = await tronWeb.trx.getContract(trc20ContractAddress);
  let contract = await tronWeb.contract().at(trc20ContractAddress);

  const frombalance = await contract.methods.balanceOf(fromAccount).call();
  console.log("fromAccount balance:", frombalance.toString());

  const balance = await contract.methods.balanceOf(toAccount).call();
  console.log("toAccount balance:", balance.toString());

  // TRC20 용 transfer token
  const resp = await contract.methods.transfer(toAccount, 10 * 1000).send();
  console.log("transfer:", resp);

  //Use send to execute a non-pure or modify smart contract method on a given smart contract that modify or change values on the blockchain. These methods consume resources(bandwidth and energy) to perform as the changes need to be broadcasted out to the network.
  // await contract
  //   .transfer(
  //     "TQj2LC7dfbfQxBHMGFw6YnC59QaGSCbPyo",
  //     "TLyof5GQ3Z2uAz7X2wf67wLpEQejGR9djR", //address _to
  //     99 //amount,
  //   )
  //   .send({
  //     feeLimit: 1000000,
  //   })
  //   .then((output) => {
  //     console.log("- Output:", output, "\n");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // return tronWeb.transactionBuilder
  //   .sendToken(
  //     "TXZVQgc63ZGtHQQMvwD3MfoRNjKYpSS4hB",
  //     10,
  //     "UPVU Test1",
  //     privateKey
  //   )
  //   .then((r) => {
  //     resolve();
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //     throw "ERRORORORORROR";
  //   });
}

async function test() {
  // await getAccount(inputAccount);
  // await getTransactions(inputAccount);
  // await getAssets(inputAccount);
  await sendToken()
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {
      console.log(e);
    });
  console.log("finish");
}
