const { ethers } = require("ethers");

const ERC721ABI = require(`../deployments/abi/JNFT.json`)
const ERC721Addr = require(`../deployments/dev/JNFT.json`)

function getFunctionID() {
    let transfer721Topic = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("Transfer(address,address,uint256)"));
    console.log("transferTopic:" + transfer721Topic);
    let id = ethers.utils.id("Transfer(address,address,uint256)");
    console.log("Transfer:" + id);
}

async function parseTransfer721Event(event){
    const Transfer721Event = new ethers.utils.Interface(["event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"]);
    let decodedData = Transfer721Event.parseLog(event);
    console.log("from: " + decodedData.args.from);
    console.log("to: " + decodedData.args.to);
    console.log("tokenId: " + decodedData.args.tokenId.toString());
}

async function main() {
    let provider = new ethers.providers.WebSocketProvider("ws://127.0.0.1:8545/");
    let myerc721 = new ethers.Contract(ERC721Addr.address,ERC721ABI,provider);

    let filter = myerc721.filters.Transfer();

    // filter = {
    //     address: ERC721Addr.address,
    //     topics: [
    //         ethers.utils.id("Transfer(address,address,uint256)")
    //     ]
    // }

    provider.on(filter,(event)=>{
        console.log(event);
        parseTransfer721Event(event)
    })
}

main()