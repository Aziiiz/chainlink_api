module.exports = function(app, db) {
  app.get('/regist', async(req, res) =>{

    const public = req.body.public;
    const private = req.body.private;
    const sender = req.body.sender;
    const ccid = req.body.ccid;
    const version = req.body.version;
    const refCcid = req.body.refCcid;
    const contentType = req.body.contentType;
    const fileLink = req.body.fileLink;
    const ccidState = req.body.ccidState;
    const ccidPrice = req.body.ccidPrice;
    const versionState = req.body.versionState;
    const versionPrice = req.body.versionPrice;

    let time = Date.now();



    let regist = await createLoomObj(public, private)


    try {
      const time = await Date.now();
      const tx = await regist.instance.methods.UploadContent(sender,ccid, version, contentType, fileLink, ccidState,
        ccidPrice, time, refCcid, versionState, versionPrice).send({from: regist.currentUserAddress});
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
      res.status(500);
      console.log(error);
      res.send({error:error});
    }
  });

  app.get('/contentView', async(req,res)=> {

    const public = req.body.public;
    const private = req.body.private;


    const ccid = req.body.ccid;

    let contentView = await createLoomObj(public, private);
    let tx = await contentView.instance.methods.getComplexContent(ccid).call()
    .then(function(result){
       console.log(result[0][0] + " version length");
       console.log(result[0][1] + " second version");
       console.log(result[0][2] + " third version");
       console.log(result[0][3] + " forth version");
       console.log(result[0][4] + " fifth version");
       console.log(result[1] + " user address");
       console.log(result[2] + " content type");
       console.log(result[3] + " state");
       console.log(result[4] + " price");
      // console.log(result[5] + " time");
      // console.log(result[6]);
      console.log(result);

    });

    res.send(
     JSON.stringify(
       {
         message: tx,
       }
     )
    )




  });

  app.get('/viewVersion', async(req, res) => {

    const public = req.body.public;
    const private = req.body.private;

    const version = req.body.version;

    let viewVersion = await createLoomObj(public, private);
    let tx = await viewVersion.instance.methods.getComplexContentVersion(version).call().then(function(result){
      console.log(result[0] + " it is reference id");
      console.log(result[1] + " it is uploader address");
      console.log(result[2] + " state");
      console.log(result[3] + " price");
      console.log(result[4] + " number of likes");
      console.log(result[5] + " upload time ");
      res.send(
        JSON.stringify(
          {
            message: result,
          }
        )
      )
    });


  })

  app.get('/versionView', async(req, res) => {

    const public = req.body.public;
    const private = req.body.private;

    const version = req.body.version;

    let viewVersion = await createLoomObj(public, private);

    const tx = await viewVersion.instance.methods.viewVersion(version).call().then(function(result){
    //  console.log(result[0] + " it is reference id");
    console.log(result);
      // console.log(result[1] + " it is uploader address");
      // console.log(result[2] + " state");
      // console.log(result[3] + " price");
      // console.log(result[4] + " number of likes");
      // console.log(result[5] + " upload time ");
      //
      // JSON.stringify(result[0] + ' it is reference id');
      // JSON.stringify(result[1] + ' it is uploader adr');
      // JSON.stringify(result[2] + " state");
      // JSON.stringify(result[3] + " price");
      // JSON.stringify(result[4] + " number of likes");
      // JSON.stringify(result[5] + " upload time ");
    });


    res.send(
      JSON.stringify({
        message: tx,
      })
    )
  })

  app.get('/seeVersion', async(req, res) => {

    const public = req.body.public;
    const private = req.body.private;

    const index = req.body.index;
    const ccid = req.body.ccid;

    let seeVersion = await createLoomObj(public, private);
    try {
      const tx = await seeVersion.instance.methods.versionSee(ccid, index).call();


      res.send(
        JSON.stringify({
          message: tx,
        })
      )

    } catch (error) {

      console.log(error);

    }


  })





  app.get('/purchase', async(req, res) => {

    const public = req.body.public;
    const private = req.body.private;

    const id = req.body.id;

    const price = req.body.price;


    let time = Date.now();

    let purchase = await createLoomObj(public, private);

    try {
      const tx = await purchase.instance.methods.purchaseContent(id, price, time).send({from: purchase.currentUserAddress});

      res.send(
        JSON.stringify({
          message: tx,
        })
      )

    } catch (error) {
      res.status(500)
      console.error(error);

      res.send({error:error});
    }
  });

 app.get('/update', async(req, res) => {


  const public = req.body.public;
  const private = req.body.private;
  const sender = req.body.sender;


  const ccid = req.body.ccid;
  const version = req.body.version;
  const state = req.body.state;
  const price = req.body.price;

  const refc = req.body.refc;

  let time = Date.now();

  let update = await createLoomObj(public, private)

  try {
    const tx = await update.instance.methods.contentUpdate(sender,ccid, version, refc, state, price, time).
    send({from: update.currentUserAddress});


    res.send(
     JSON.stringify(
       {
         message: tx,
       }
     )
    )
  } catch (error) {
    res.status(500);

    console.log(error);
    res.send({error:error});
  }
});


app.get('/modifyContent', async(req, res) =>{

  const public = req.body.public;
  const private = req.body.private;

  const sender = req.body.sender;

  const ccid = req.body.ccid;
  const state = req.body.state;
  const price = req.body.price;

  let time = Date.now();

  let modifyContent = await createLoomObj(public, private);

  try {
    const tx = await modifyContent.instance.methods.modifyContent(sender, ccid, state, price, time).
    send({from: modifyContent.currentUserAddress});

    res.send(
      JSON.stringify(
        {
          message: tx,
        }
      )
    )
  } catch (error) {
    res.status(500);
    console.log(error);
    res.send({error:error});
  }
});

app.get('/modifyVersion', async(req, res) => {

  const public = req.body.public;
  const private = req.body.private;

  const sender = req.body.sender;

  const version = req.body.version;
  const state = req.body.state;
  const price = req.body.price;

  let time = Date.now();

  let modifyVersion = await createLoomObj(public, private);

  try {
    const tx = await modifyVersion.instance.methods.modifyVersionContent(sender, version, state, price, time)
    .send({from: modifyVersion.currentUserAddress});

    res.send(
        JSON.stringify(
          {
            message: tx,
          }
        )

    )
  } catch (error) {
    res.status(500);
    console.log(error);
    res.send({error:error});
  }
});

app.get('/addlike', async(req, res) =>{

  const public = req.body.public;
  const private = req.body.private;

  const sender = req.body.sender;

  const version = req.body.version;
  const ccid = req.body.ccid;

  let time = Date.now();

  let addLike = await createLoomObj(public, private);
  try {
    const tx = await addLike.instance.methods.AddLike(sender, version, ccid, time)
    .send({from: addLike.currentUserAddress});

    res.send(
      JSON.stringify(
        {
          message: tx,
        }
      )
    )
  } catch (error) {
     res.status(500);
     console.log(error);
     res.send({error:error});
  }
});


app.get('/getLikes', async(req, res) => {

  const public = req.body.public;
  const private = req.body.private;

  const version = req.body.version;

  let getLikes = await createLoomObj(public, private);

  let tx = await getLikes.instance.methods.getLikes(version).call();

  res.send(
    JSON.stringify(
      {
        message: tx,
      }
    )
  )
});

app.get('/getTotalLikes', async(req, res) => {

  const public = req.body.public;
  const private = req.body.private;

  const ccid = req.body.ccid;

  let getTotalLikes = await createLoomObj(public, private);

  let tx = await getTotalLikes.instance.methods.getTotalLikes(ccid).call();

  res.send(
    JSON.stringify(
      {
        message: tx,
      }
    )
  )
});

app.get('/removeContent', async(req, res) => {

  const public = req.body.public;
  const private = req.body.private;

  const ccid = req.body.ccid;

  let removeContent = await createLoomObj(public, private);

  try {
    const tx = await removeContent.instance.methods.removeContent(ccid)
    .send({from: removeContent.currentUserAddress});

    res.send(
      JSON.stringify(
        {
          message: tx,
        }
      )
    )
  } catch (error) {

    res.status(500);
    console.log(error);
    res.send({error:error});
  }
});

app.get('/removeVersion', async(req, res) => {

  const public = req.body.public;
  const private = req.body.private;

  const sender = req.body.sender;
  const version = req.body.version;

  let time = Date.now();

  let removeVersion = await createLoomObj(public, private);

  try {
    const tx = await removeVersion.instance.methods.removeVersion(sender, version, time)
    .send({from: removeVersion.currentUserAddress});

      res.send(
        JSON.stringify({
          message: tx,
        })
      )
  } catch (error) {

    res.status(500);
    console.log(error);
    res.send({error:error});
  }
});


app.get('/getIncome', async(req, res) => {

  const public = req.body.public;
  const private = req.body.private;

  const sender = req.body.sender;

  const version = req.body.version;


  let income = await createLoomObj(public, private);
  let tx = await income.instance.methods.getVersionIncome(sender, ccid).call();

  res.send(
    JSON.stringify(
    {
      message: tx,
    }
   )
  )
});


app.get('/contentIncome', async(req, res) => {

   const public = req.body.public;
   const private = req.body.private;
   const sender = req.body.sender;
   const ccid = req.body.ccid;

   let contentIncome = await createLoomObj(public, private);
   const tx = await contentIncome.instance.methods.getContentIncome(sender, ccid).call();

   res.send(
     JSON.stringify({
       message: tx,
     })
   )

});

app.get('/getTotalIncome', async(req, res) => {

  const public = req.body.public;
  const private = req.body.private;

  const sender = req.body.sender;
  const ccid = req.body.ccid;

  let totalIncome = await createLoomObj(public, private);
  const tx = await totalIncome.instance.methods.getTotalIncome(sender, ccid).call();

  res.send(
    JSON.stringify({
      message: tx,
     })
   )
 });


app.get('/deleteVersion', async(req, res) => {

  const public = req.body.public;
  const private = req.body.private;


  const sender = req.body.sender;

  const ccid = req.body.ccid;
  const version = req.body.version;

  let deleteV = await createLoomObj(public, private);
  try {
    const tx = await deleteV.instance.methods.deleteVersion(sender, ccid, version).send({from: deleteV.currentUserAddress});

    res.send(
      JSON.stringify({
        message: tx,
      }
    )
  )

} catch (error) {

       res.status(500);
       console.log(error);
       res.send({error:error});
  }
});

};


const { CryptoUtils, Client, LoomProvider, LocalAddress } = require("loom-js");
const contr = require('./UserContract.json');
const Web3 = require('web3');

const loom_dapp_chain = {
  networkAlias: "default",
  writeUrl: 'ws://127.0.0.1:46658/websocket',
  readUrl: 'ws://127.0.0.1:46658/queryws',
  networkId: 'default'
};

const LOOM_CONTRACT = contr;


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
