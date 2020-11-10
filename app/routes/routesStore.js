module.exports = function(app, db) {
  app.get('/storeValue', async(req, res) =>{


    const public = req.body.public;
    const  private = req.body.private;
      console.log(req.body.public);
      console.log(JSON.stringify(public));
      console.log(req.body);


        console.log(req.body.public);
        console.log(JSON.stringify(private));







    let ts = Date.now();
    console.log(ts);
  let value = 22 ;

   let store =  await createLoomObj(public, private);



  let adr =  store.currentUserAddress;
  console.log(adr + "+++++++++");


   try {
     const time = await Date.now();
      const tx = await store.instance.methods.set(ts)
      .send({from: store.currentUserAddress});
      const after =  await Date.now();
      const then = (after-time)/1000;
      console.log(then + " result time");


     res.send(
       JSON.stringify({
         message: tx,
       }
     )
    )
  } catch (error) {

    res.status(500)
    console.error(error)

    res.send({error:error});

   }

  })
};




const { CryptoUtils, Client, LoomProvider, LocalAddress } = require("loom-js");
const SimpleStore = require('./SimpleStore.json');
const Web3 = require('web3');

const loom_dapp_chain = {
  networkAlias: "default",
  writeUrl: 'ws://127.0.0.1:46658/websocket',
  readUrl: 'ws://127.0.0.1:46658/queryws',
  networkId: 'default'
};

const LOOM_CONTRACT = SimpleStore;


const Loom = {
  contract: null,
  client: null,
  privateKey: null,
  publicKey: null,
  currentUserAddress: "",
  web3: null,
  instance: null,
  currentNetwork: "",
  connectionInfo: {
    networkAlias: "default",
    writeUrl:  'ws://127.0.0.1:46658/websocket',
    readUrl:   'ws://127.0.0.1:46658/queryws' ,
    networkId: 'default'
  }
};





async function createAddress()
{
  await createClient();
  Loom.currentUserAddress = LocalAddress.fromPublicKey(Loom.publicKey).toString();
}


async function createLoomObj(public,private) {
  const myTime = await Date.now();
  Loom.contract = LOOM_CONTRACT;
  Loom.privateKey = Uint8Array.from(Buffer.from(private, 'hex'));
  Loom.publicKey = public;
  await createClient();


  Loom.currentUserAddress = public;

  Loom.web3 = new Web3(new LoomProvider(Loom.client, Loom.privateKey));
//  console.log(Loom.web3);
  await createContractInstance();
  const theTime = await Date.now();
  const thenTimer = (theTime - myTime)/1000;
  console.log(thenTimer+" runnig loom func");

  return Loom;

}




async function createClient() {

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
const loominstance = await Date.now();
const networkId = await getCurrentNetwork();
Loom.currentNetwork = Loom.contract.networks[networkId];
console.log("network: ", Loom.currentNetwork);

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
const thenT = await Date.now();
const fin =  (thenT-loominstance)/1000;
console.log(fin +" contracInstance");
}

async function getCurrentNetwork() {
return await Loom.web3.eth.net.getId();
}
