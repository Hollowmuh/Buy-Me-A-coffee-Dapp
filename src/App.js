import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";
import abi from "./contracts/Calculator.json"

function App() {
  const [result, setResult] = useState(0);
  const [isWalletConnected, setWalletConnection] = useState(false);
  const [userAddress, setUserAddress] = useState("No address");
  const Contract_Address = "0x91D3d9823aE9474143BB0A40ec1A4966BaeC7E60"
  const Contract_Abi = abi.abi;
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const checkWalletConnection = async () => {
      try {
        if(window.ethereum) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const account = accounts[0];
          setWalletConnection(true);
          setUserAddress(account)
        }
        else{
          alert("Ethereum Wallet not detected, Please set up a wallet");
        }
      }
      catch (e) {
        alert("Please Connect to your Wallet");
      }
  }

  const add = async () => {
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Calculator = new ethers.Contract(
      Contract_Address,
      Contract_Abi,
      signer
    );

    const output = await Calculator.addition(a, b);
    setResult(output.toString());
  }
    catch(e) {
      alert("Error, Ensure you're connected and Your values are correct")
    }
  };
  const subtract = async () => {
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Calculator = new ethers.Contract(
      Contract_Address,
      Contract_Abi,
      signer
    );

    const output = await Calculator.subtraction(a, b);
    setResult(output.toString());
  }
    catch(e) {
      alert("Error, Ensure you're connected and Your values are correct")
    }
  };
  const multiply = async () => {
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Calculator = new ethers.Contract(
      Contract_Address,
      Contract_Abi,
      signer
    );

    const output = await Calculator.multiplication(a, b);
    setResult(output.toString());
  }
    catch(e) {
      alert("Error, Ensure you're connected and Your values are correct")
    }
  };
  const divide = async () => {
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Calculator = new ethers.Contract(
      Contract_Address,
      Contract_Abi,
      signer
    );

    const output = await Calculator.division(a, b);
    setResult(output.toString());
  }
    catch(e) {
      alert("Error, Ensure you're connected and Your values are correct")
    }
  };
  useEffect (() => {
    checkWalletConnection();
  }, [isWalletConnected]);

  //Web2.0 Functions
  const handleAddition = (e) => {e.preventDefault(); add();};
  const handleSubtraction = (e) => {e.preventDefault(); subtract();};
  const handleMultiplication = (e) => {e.preventDefault(); multiply();};
  const handleDivision = (e) => {e.preventDefault(); divide();};

  // Input Field handler
  const handleUserInput = (e) => {
    setA(e.target.value);
  };
  const handleUserSecondInput = (v) => {
    setB(v.target.value);
  };

  // Reset Input Field handler
  const resetInputField = () => {
    setA("");
    setB("");
  };
  

  return (
  <>
    <div>
      <button id="connect" onClick={() => checkWalletConnection()}> Connect </button>
    </div>
    <div className="App">
      <h1 id="App-header">Calculator App</h1>
      <div>
        <input text="Number" type="number"placeholder="First Number" value={a} onChange={handleUserInput}></input>
        <input text="Number" type="number" placeholder="Second Number" value={b} onChange={handleUserSecondInput}></input>
        <span id="result"> = {result}</span>
      </div>  
      <div>
        <button id="clear" onClick={resetInputField}> Clear </button>
      </div>  
    </div>

    <div>
      <span>
        <button id="addition" onClick={(e) => {handleAddition(e);}}> Add </button>
      </span>

      <span>
        <button id="subtraction" onClick={(e) => {handleSubtraction(e);}}> Subtract 
        </button>
      </span>
    </div>

    <div>
      <span>
        <button id="multiplication" onClick={(e) => {handleMultiplication(e);}}> Multiply </button>
      </span>
      <span>
        <button id="division" onClick={(e) => {handleDivision(e);}}> Divide </button>
      </span>
    </div>
    <div id="address">{`Connected address: ${userAddress}`}</div>
  </>
  );
}

export default App;
