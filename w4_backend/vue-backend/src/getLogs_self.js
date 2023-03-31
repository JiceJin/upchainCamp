const {ethers} = require("ethers");

const ERC721ABI = require(`../deployments/abi/JNFT.json`);
const ERC721Addr = require(`../deployments/dev/JNFT.json`);

async function parseTransferEvent(event) {
    const TransferEvent = new ethers.utils.Interface(["event Transfer(address indexed from,address indexed to,uint256 indexed tokenId)"]);
    let decodedData = TransferEvent.parseLog(event);
    console.log("from:" + decodedData.args.from);
    console.log("to:" + decodedData.args.to);
    console.log("tokenId:" + decodedData.args.tokenId.toString());

    // insert to db
}

async function main() {
    let provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
    
    let myerc721 = new ethers.Contract(ERC721Addr.address,ERC721ABI,provider);
    
    let filter = myerc721.filters.Transfer()
    filter.fromBlock = 1;
    filter.toBlock = 5;

    let events = await provider.getLogs(filter);
    for(let i=0;i<events.length;i++){
        console.log(events[i]);
        parseTransferEvent(events[i]);
    }
}
main()