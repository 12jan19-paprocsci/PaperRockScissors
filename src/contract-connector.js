// Initiate Web3
if (typeof web3 !== 'undefined' ) {
    web3 = new Web3(web3.currentProvider);
    document.getElementById("web3-box").innerHTML = "Web3 connected via current provider";
} else {
    web3 = new Web3(new Web3.providers.HttpProviders("http://localhost:8545"));
    document.getElementById("web3-box").innerHTML = "Web3 connected via HttpProvider";
}

// Check the connection
if(!web3.isConnected()) {
    console.error("Not connected");

}

/* General -------------------- */
document.getElementById("web3Version").innerHTML = web3.version.api;

web3.version.getNode(function(error, result){ 
    if (error) {
        console.log(error);
    } 
    if (result) {
        if (result.includes("MetaMask")) {
            var version = result.substr(10);
            var node = result.split(version).join('');
                node = node.split("/").join(' ');
            document.getElementById("nodeName").innerHTML = node;
            document.getElementById("nodeVersion").innerHTML = version;
        } else {
            document.getElementById("nodeName").innerHTML = result;
        }
        
    }
});


web3.version.getNetwork((err, netId) => {
    var networkName;
    switch (netId) {
      case "1":
        networkName = "Mainnet";
        break
      case "2":
        networkName = "Morden (deprecated)";
        break
      case "3":
        networkName = "Ropsten";
        break
        case "4":
        networkName = "Rinkeby";
        break;
      case "42":
        networkName = "Kovan";
        break;
      default:
        networkName = "Unknown";
    }
    document.getElementById("network-name").innerHTML = " " + networkName;
  });


web3.version.getEthereum(function(error, result){ 
    if (error) {
        console.log(error);
    }
    if (result) {
        document.getElementById("eth-protocol-version").innerHTML = web3.toDecimal(result) + " (" + result + ")";
    }
});


web3.eth.getBlockNumber(function(error, result) {
    if (error) console.log(error);
    if (result) {
        var blocknb = result;
        document.getElementById("block-number").innerHTML = blocknb;
        web3.eth.getBlockTransactionCount(blocknb, function(error, response) {
            if (error) console.log(error);
            if (response) {
                document.getElementById("tx-count").innerHTML = response;
            }
        });
    }
});


web3.eth.getGasPrice(function(error, result) {
    if (error) console.log(error);
    if (result) document.getElementById("gas-price").innerHTML = result;
});



if (web3.eth.accounts[0] !== account) {
    var account = web3.eth.accounts[0];
    document.getElementById("eth-address").value = account;
}


function copyToClipboard() {
    var copyAddress = document.getElementById("eth-address");
    copyAddress.select();
    document.execCommand("copy");

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + copyText.value;
}



/* Interactions with the Smart Contract ------------------------- */

const jsonInterface = [
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "p1move",
                "type": "int8"
            },
            {
                "name": "p2move",
                "type": "int8"
            }
        ],
        "name": "playGame2",
        "outputs": [
            {
                "name": "",
                "type": "int8"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    }
 ]

const contract_address = "0x36bf79470a15483dbe832f3df1276c07b2808678"; 

// Create contract object
const theContract = web3.eth.contract(jsonInterface);
console.log(theContract);

// Initiate contract for a specific address
const contractInstance = theContract.at(contract_address);
console.log(contractInstance.options);




function playGame() {
    var player1move = document.getElementById("player1").value;
    var player2move = document.getElementById("player2").value;
    

    console.log(player1move);
    console.log(player2move);

    contractInstance.playGame2.call(player1move, player2move, function(error, result) {
        console.log(result);
    });  
}

