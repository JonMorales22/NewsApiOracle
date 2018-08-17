"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper");

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('d7fa88108aa4443e9008f7de7e64bce4');

const INFURA_WS = "wss://kovan.infura.io/ws/xeb916AFjrcttuQlezyq";
const HDWalletProviderMem = require("truffle-hdwallet-provider");

const mnemonic = "hobby middle device shiver like square genuine girl dice tomorrow cave captain";

//0x81e1361f6FaDdC5E0C6361601C7e598B7592A45f

//==============================================================================================================
// Provider Constants
//==============================================================================================================
exports.ProviderData = {
    title: "NewsApi",
    public_key: "0x5Df6ACc490a34f30E20c740D1a3Adf23Dc4D48A2",
    endpoint: "TopHeadlines",
    endpoint_params: ["country", "category", "sources", "keywords"]
};

exports.Responders = {
    "NewsApi": {
        responder: topHeadlinesResponder,
        curve: [1, 1 * 1e18, 1000]
    }
};

//==============================================================================================================
// Web3 instance creator
//==============================================================================================================
async function getWeb3Provider() {
    return new HDWalletProviderMem(mnemonic, INFURA_WS);
}
exports.getWeb3Provider = getWeb3Provider;

// country, category, sources, keywords

/*
    handles the query to top headlines endpoint
    @param web3: utility instance of web3
    @param event: the Incoming event emitted by disptach parsed from hex to string
*/
async function topHeadlinesResponder(web3, event) {
    const { queryId, query, endpoint, subscriber, endpointParams, onchainSub } = event;
    console.log(endpointParams);
    
    try{

        var keys = getKeys(endpointParams);
        console.log("keys: " + JSON.stringify(keys));

        // makes GET request to newsapi using node wrapper
        var data = await newsapi.v2.topHeadlines(keys)
        console.log(data.articles[0]);
    
        if(!data.articles.length>0)
            throw("Data not retreived from api!");

        data = data.articles[0];

        var response = handleData(web3, data);
        return response;
    } 
    catch(error) { 
        console.error(error)
    }
}

/*
    takes the data and preps it so we can send it to dispatch
    @param web3: - utility instance of web3
    @param data: - JSON returned by news api 
*/
function handleData(web3, data) {

    data = JSON.stringify(data)
    data = data.match(/.{1,32}/g);

    var response = []
    
    for (let i = 0; i < data.length; i++) {
        
        var hexString = web3.utils.utf8ToHex(data[i]);

        //sometimes the utf8ToHex call for web3 returned a line longer than 66 charactes, 
        //if this happens we break the line in half
        if(hexString.length > 66 ) {
            var divider = hexString.length/2;
            var hexString2 = '0x' + hexString.slice(divider);
            hexString = hexString.slice(0, divider);

            hexString2 = web3.utils.padLeft(hexString2, 64);
            hexString =  web3.utils.padLeft(hexString, 64);

            response.push(hexString);
            response.push(hexString2);
            continue;
        }

        hexString = web3.utils.padLeft(hexString, 64);
        response.push(hexString)  
    }

    return response;
}

// parses endpointParams and grabs the required data
// if endpoint param starts with a space, we skip it
function getKeys(endpointParams) {
    
    var keys = {}

    if(!endpointParams.length>0)
        throw("At least 1 param must be submitted!");

    if(endpointParams[0]) {
        if(!endpointParams[0].startsWith(' ')) 
            keys['country'] = endpointParams[0];
    }
    if(endpointParams[1]) {
        if(!endpointParams[1].startsWith(' '))
            keys['category'] = endpointParams[1];
    }
    if(endpointParams[2]) {
        if(!endpointParams[2].startsWith(' '))
            keys['source'] = endpointParams[2];
    }
    if(endpointParams[3]) {
        if(!endpointParams[3].startsWith(' '))
            keys['q'] = endpointParams[3];
    }
    return keys;
}


/* Starts the oracle. Creates it (if it does not exist), and starts listening for queries */
helper_1.initialize().catch(err => console.error('zap-oracle-template error:', err));
