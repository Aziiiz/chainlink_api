module.exports = function (app, db) {

  app.get('/storeNum' , async(req, res) => {



    //rest api
    // request public private key from user


    console.log(req.body.public);
    console.log(JSON.stringify(public));
    console.log(req.body);




    let ts = Date.now();
    console.log(ts);


    let store = await createLoomObj();

    let adr = store.currentUserAddress;
    console.log("["+adr+"]");


    try {
      const time = await Date.now();
      const tx  = await store.instance.methods.set(ts)
      .send({from: store.currentUserAddress});
      const after = await Date.now();
      const then = (after-time)/1000;
      console.log(then + " result time");

      res.send(
        JSON.stringify({
          message: tx,
        }
      )
    )
    } catch (e) {
      res.status(500);
      console.log(error);

      res.send({error: error})

    }
  })
};

const {CryptoUtils, Client, LoomProvider, LocalAddress} = require("loom-js");
const SimpleStore = require('./SimpleStore.json');
const Web3 = require('web3');

const loom_dapp_chain = {
  networkAlias: 'default',
  writeUrl: 'ws://127.0.01:46658/web',
  readUrl: 'ws://127.0.0.1:46658/queryws',
  networkId: 'default'
};

const LOOM_CONTRACT = SimpleStore;


const Loom =
{
  contract: null,
  client: null,
  privateKey: null,
  publicKey: null,
  currentUserAddress: null,
  web3: null,
  instance:  null,
  currentNetwork: "",
  connectionInfo:
  {
    networkAlias: "default",
    writeUrl:  'ws://127.0.0.1:46658/websocket',
    readUrl:   'ws://127.0.0.1:46658/queryws' ,
    networkId: 'default'
  }
};


async function createLoomObj() {
  const timer = await Date.now();
  Loom.contract = LOOM_CONTRACT;
  await createClient();

  Loom.currentUserAddress = LocalAddress.fromPublicKey(
    Loom.publicKey
  ).toString();

  Loom.web3 = new Web3(new LoomProvider(Loom.client, Loom.privateKey));
  await createContractInstance();
  const then  = await Date.now();
  const final = (then - timer)/1000;
  console.log(final +"generated key");
  return Loom;
}

async function createClient() {
Loom.privateKey = CryptoUtils.generatePrivateKey();
Loom.publicKey = CryptoUtils.publicKeyFromPrivateKey(Loom.privateKey);
Loom.client = new Client(
  Loom.connectionInfo.networkId,
  Loom.connectionInfo.writeUrl,
  Loom.connectionInfo.readUrl
);

Loom.client.on("error", msg => {
  console.error("Error on connect to client", msg);
  console.warn("Please verify if loom command is running");
});
}

async function createContractInstance() {
const networkId = await getCurrentNetwork();
Loom.currentNetwork = Loom.contract.networks[networkId];
//console.log("network:", Loom.currentNetwork);

if (!Loom.currentNetwork) {
  console.error(
    "not a valid network: , network id was:",
    Loom.currentNetwork,
    networkId
  );
  throw Error("Contract not deployed on DAppChain (network id error)");
}

Loom.instance = new Loom.web3.eth.Contract(
  Loom.contract.abi,
  Loom.currentNetwork.address,
  {
    from: Loom.currentUserAddress
  }
);
}

async function getCurrentNetwork() {
return await Loom.web3.eth.net.getId();
}
