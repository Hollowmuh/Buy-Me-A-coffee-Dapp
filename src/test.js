import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";
import abi from "./contracts/BuyMeACoffee.json";


function App () {
    const [connect, setIsConnected] = useState("Connect");
    const [walletConnection, setWalletConnection] = useState(false);
    const [address, setConnectedAddress] = useState("No Address");
    const [contractBalance, setContractBalance] = useState("0");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");
    const [memos, setMemo] = useState([]);
    const contractAddress = "0x5B2AB4BDB2f32288A035060528b53e77f78BE638";
    const contractAbi = abi.abi;
    const handleAmountInput = (e) => {setAmount(e.target.value);};
    const hanldeNameInput = (e) => {setName(e.target.value);};
    const hanldeMessageInput = (e) => {setMessage(e.target.value);};

    async function checkWalletConnection() {
        try {
            if(window.ethereum) {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const account = accounts[0];
                setWalletConnection(true);
                setConnectedAddress(account);
                setIsConnected("Connected");
            }
            else {
                alert("Ethereum client not detected");
            }
        }
        catch(error) {
            console.log(error);
        }
    }
    const buyCoffe = async () => {
        const {ethereum} = window;
        try {
            const provider = new ethers.providers.Web3Provider(ethereum, "any");
            const signer = provider.getSigner();
            const BuyMeACoffee = new ethers.Contract(
                contractAddress,
                contractAbi,
                signer
            );
            console.log("Buying coffee");
            const _amount = amount.toString();
            const coffeeTxn = await BuyMeACoffee.buyCoffee(
                name? name: "anonymous",
                message? message: "Enjoy your Coffee",
                {value: ethers.utils.parseEther(_amount)}
            );
            await coffeeTxn.wait();
            console.log("Tx mined", coffeeTxn.hash);
            console.log("Coffee Purchased, thanks");
            setName("");
            setMessage("");
            setAmount(0);
            balanceCheck();
        }
        catch(error) {
            console.log(error)
        }
    }
    const balanceCheck = async () => {
        const {ethereum} = window;
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const BuyMeACoffee = new ethers.Contract(
                contractAddress,
                contractAbi,
                signer
            );
            console.log("checking contract balance");
            const output = await BuyMeACoffee.balance();
            let _output = output.toString();
            _output = ethers.utils.formatEther(_output);
            setContractBalance(_output);
        }
        catch(error) {
            console.log(error)
        }
    }
    const balanceWithdraw = async () => {
        const {ethereum} = window;
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const BuyMeACoffee = new ethers.Contract(
                contractAddress,
                contractAbi,
                signer
            );
            console.log("Withdrawing balances");
            await BuyMeACoffee.withdrawTips();
            balanceCheck();
        }
        catch(error) {
            console.log(error);
        }
    }
    const getMemos = async () => {
        try {
            const {ethereum } = window;
            if (ethereum) {
               const provider = new ethers.providers.Web3Provider(ethereum, "any");
               const signer = provider.getSigner();
               const BuyMeACoffee = new ethers.Contract(
                contractAddress,
                contractAbi,
                signer
               )
               console.log("fetching memos from the blockchain..");
                const memos = await buyMeACoffee.getMemos();
                console.log("fetched!");
               setMemo(memos);
      } else {
        console.log("Metamask is not connected");
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  console.log(memos);
    useEffect(() => {
        let BuyMeACoffee;
        checkWalletConnection();
        getMemos();

        const onNewMemo = (sentFrom, timeSent, name, message) => {
            console.log("Memo recieved: ", sentFrom, timeSent, name, message);
            setMemo((prevState) => [
                ...prevState,
                {
                    address: sentFrom,
                    timeSent: new Date(timeSent * 1000),
                    message,
                    name
                }
            ]        
            );
        };
        const {ethereum} = window;

        if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum, "any");
            const signer = provider.getSigner();
            const BuyMeACoffee = new ethers.Contract(
                contractAddress,
                contractAbi,
                signer
            );
        BuyMeACoffee.on("NewMemo", onNewMemo);
    }
        return() => {
            if(BuyMeACoffee) {
                BuyMeACoffee.off("NewMemo", onNewMemo);
            }
        }
    }, []);
    return (
        <>
        <div>
            <button 
                id="connect"
                onClick={checkWalletConnection}
                style = {
                {backgroundColor: "green", color: "black"}
                }>{walletConnection? connect : "connect"}
            </button>
        </div>
        <section>
            <div id="Head">
                Buy Mueez A Coffee!!
            </div>
        </section>
        <section className="App">
            <form className="Form">           
                <label>Enter Amount:
                    <input 
                    type="Number"
                    value={amount}
                    step="any" 
                    onChange={handleAmountInput}
                    placeholder="Enter Amount"/>
                </label>
                <br />
                <label>Enter your _name:
                    <input type="text" 
                    placeholder="Enter your _name"
                    onChange={hanldeNameInput}/>
                </label>
                <br />
                <label 
                    style={
                        {fontSize: "1.5em"}}>Enter Message: 
                        <br/>
                <textarea 
                rows={8} 
                onChange={hanldeMessageInput}
                placeholder="Enter your Message">
            </textarea>
            </label>
          </form>
        </section>
        <br />
        <section>
            <button 
            type="button"
            onClick={buyCoffe}> Buy Me Coffee!
            </button>    
        </section>
        <section> 
        <br />
            <button
            onClick={balanceCheck}> Balance
            </button>
            <br /> 
            <button
            onClick={balanceWithdraw}> Withdraw
            </button>  
            <br />
            <button
            onClick={getMemos}> Read messages
            </button>  
        </section>
        <section>
            <div id="balanceDisplay">Current Balance: {contractBalance} eth</div>  
        </section>

        <section>
         <div>Connected Address: {address}</div>
        </section>
        </>
    )
    {address && (memos.map((memo, idx) => {
        return (
            <div 
            key={idx} 
            style={{border:"2px solid", "borderRadius":"5px", padding: "5px", margin: "5px"}}>
                <p style={{"fontWeight":"bold"}}>"{memo.message}"</p>
                <p>From: {memo.name} at {memo.timestamp.toString()}</p>
            </div>
        )
    }))}
}
export default App;