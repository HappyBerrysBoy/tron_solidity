const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/f4c65e7a8dac44a581100fe538f995cc'));
const privateKey = Buffer.from('privatekey', 'hex');

const sendAccount = '0xc5a28a8B208B5093193b431CBFddC82f5a85a88a';
const receiveAccount = '0x7B6Db723F329e201ed9e497918DEFF895a88dB16';

// web3.eth.getTransactionCount(sendAccount, (err, txCount) => {
//   const txObject = {
//     nonce:web3.utils.toHex(txCount),
//     gasLimit:web3.utils.toHex(100000),
//     gasPrice:web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
//     to:receiveAccount,
//     value:'0x2386f26fc10000'
//   }

//   // const tx = new Tx(txObject);
//   const tx = new Tx(txObject, {chain:'kovan', hardfork: 'petersburg'})
//   tx.sign(privateKey);

//   const serializedTx = tx.serialize();
//   const raw = '0x' + serializedTx.toString('hex');

//   web3.eth.sendSignedTransaction(raw)
//     .once('transactionHash', (hash) => {
//       console.log('transactionHash', 'https://kovan.etherscan.io/tx/');
//     })
//     .once('receipt', (receipt) => {
//       console.log('receipt', receipt);
//     })
//     .on('error', (err) => {
//       console.log(err);
//     });
// })

web3.eth.getAccounts().then(console.log);

web3.eth.getBalance(sendAccount)
.then(console.log);

web3.eth.getChainId().then(console.log);