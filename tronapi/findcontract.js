const TronGrid = require("trongrid");
const TronWeb = require("tronweb");
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey =
  "ff55065cd34756d69546.............550ff18df5fd035e8b4094b2dd84f1";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
