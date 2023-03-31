<script>
import { ethers } from 'ethers'

import erc2612Addr from '../../deployments/dev/ERC2612.json'
import erc2612Abi from '../../deployments/abi/ERC2612.json'

import bankAddr from '../../deployments/dev/Bank.json'
import bankAbi from '../../deployments/abi/Bank.json'

import erc721Addr from '../../deployments/dev/JNFT.json'
import erc721Abi from '../../deployments/abi/JNFT.json'

export default {

  name: 'erc20',

  data() {
    return {
      account: null,
      recipient: null,
      amount: null,
      balance: null,
      ethbalance: null,
      BankBalance: null,
      restApproveBalance: null,
      erc721Balance: null,

      name: null,
      decimal: null,
      symbol: null,
      supply: null,

      stakeAmount: null,
    }
  },

  async created() {
  },

  methods: {
    async connect() {
      await this.initProvider()
      await this.initAccount()

      // 如果获取到了账号,进行合约初始化，并读取合约数据
      if (this.account) {
        this.initContract()
        this.readContract();
      }

    },

    async initProvider(){
      if(window.ethereum) {
          this.provider = new ethers.providers.Web3Provider(window.ethereum);
          let network = await this.provider.getNetwork()
          this.chainId = network.chainId;
          console.log("chainId:", this.chainId);

      } else{
        console.log("Need install MetaMask")
      }
    },

    async initAccount(){
        try {
          this.accounts = await this.provider.send("eth_requestAccounts", []);
          console.log("accounts:" + this.accounts);
          this.account = this.accounts[0];

          this.signer = this.provider.getSigner()
        } catch(error){
            console.log("User denied account access", error)
        }
    },

    async initContract() {
      this.erc20Token = new ethers.Contract(erc2612Addr.address, 
        erc2612Abi, this.signer);

      this.bank = new ethers.Contract(bankAddr.address, 
        bankAbi, this.signer);

      this.erc721Token = new ethers.Contract(erc721Addr.address,
        erc721Abi, this.signer);
    }, 

    readContract() {
      this.provider.getBalance(this.account).then((r) => {
        this.ethbalance = ethers.utils.formatUnits(r, 18);
      });

      this.erc20Token.name().then((r) => {
        this.name = r;
      })
      this.erc20Token.decimals().then((r) => {
        this.decimal = r;
      })
      this.erc20Token.symbol().then((r) => {
        this.symbol = r;
      })
      this.erc20Token.totalSupply().then((r) => {
        this.supply = ethers.utils.formatUnits(r, 18);
      })

      this.erc20Token.balanceOf(this.account).then((r) => {
        this.balance = ethers.utils.formatUnits(r, 18);
      })
      this.erc20Token.balanceOf(this.bank.address).then((r)=>{
        this.BankBalance = ethers.utils.formatUnits(r,18);
      })
      this.erc721Token.balanceOf(this.account).then((r)=>{
        this.erc721Balance = r;
      })
    },


    // async transferEth() {
    //   let tx = await this.signer.sendTransaction({
    //     to: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    //     value: ethers.parseEther("1.0")
    //   });

    //   console.log(tx)

    //   let receipt = await tx.wait();
    //   console.log(receipt)
    // },


    async transfer() {
      let amount = ethers.utils.parseUnits(this.amount, 18);
      let tx = await this.erc20Token.transfer(this.recipient, amount);
      let receipt = await tx.wait();
      this.readContract();
    },

    async permitDeposit() {
      let nonce = await this.erc20Token.nonces(this.account);
      this.deadline = Math.ceil(Date.now() / 1000) + parseInt(20 * 60);
      
      let amount =  ethers.utils.parseUnits(this.stakeAmount).toString();
      
      const domain = {
          name: 'ERC2612',
          version: '1',
          chainId: this.chainId,
          verifyingContract: erc2612Addr.address
      }

      const types = {
          Permit: [
            {name: "owner", type: "address"},
            {name: "spender", type: "address"},
            {name: "value", type: "uint256"},
            {name: "nonce", type: "uint256"},
            {name: "deadline", type: "uint256"}
          ]
      }

      const message = {
          owner: this.account,
          spender: bankAddr.address,
          value: amount,
          nonce: nonce,
          deadline: this.deadline
      }

      const signature = await this.signer._signTypedData(domain, types, message);
      console.log(signature);

      const {v, r, s} = ethers.utils.splitSignature(signature);
      
      
      try {
        let tx = await this.bank.permitDeposit(this.account, amount, this.deadline, v, r, s);
      
        let receipt = await tx.wait();
        this.readContract();
      } catch (e) {
        alert("Error , please check the console log:", e)
      }
      


    },

    async withdraw() {
      let tx = await this.bank.withdraw();
      let receipt = await tx.wait();
      this.readContract();
    },

    async approve() {
      let tx = await this.erc20Token.approve(this.spender,this.approveAmount);
      let receipt = await tx.wait();
      this.readContract();
    },

    async allowance() {
      this.erc20Token.allowance(this.account,this.restApproveSpender).then((r)=>{
        this.restApproveBalance = r;
      })
      // this.readContract();
    },

    async mint() {
      let tx = await this.erc721Token.mint(this.mint_to,"");
      let reciept = await tx.wait();
      this.readContract();
    }
  }
}


</script>

<template>
  <div >

    <button @click="connect"> 链接钱包 </button>
    <div>
    我的地址 : {{  account }} <br />
    <!-- ERC2612地址 : {{ this.erc20Token.address }} <br /> -->
    <!-- Bank地址 : {{this.bank.address}} <br /> -->
  </div>
      <div>
        
        <br /> 我的 ERC721 持有量 : {{ erc721Balance }}
        
        <br /> <div>
          <h3>铸造</h3>
          <input type="text" v-model="mint_to" />
          <button @click="mint"> 授权 </button>
        </div>
    <div>

    </div>
</div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

div {
  font-size: 1.2rem;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
