import './App.css';
import CryptoJS from 'crypto-js';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
import { useState } from 'react';

function App() {
  const [text, setText] = useState("");
  const [screen, setScreen] = useState("encrypt");
  const [isCopied, setIsCopied] = useState(false);

  const [encrptedData, setEncrptedData] = useState("");
  const [decrptedData, setDecrptedData] = useState("");
  
  const secretPass = "asdddfglkjhg";

  const encrptData = () => {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      secretPass
    ).toString();

    setEncrptedData(data);
  }

  const decryptData = () => {
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    setDecrptedData(data);
  };

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const switchScreen = (type) => {
    setText("");
    setEncrptedData("");
    setDecrptedData("");
    setScreen(type);
  };

  const handleClick = () => {
    if (!text) return;

    if(screen === "encrypt") encrptData();
    else decryptData();
  };

  return (
    <div className='container'>
      <div>
        <button 
        className='btn btn-left'
        style={{
          backgroundColor: screen === "encrypt" ? "#5e35b1" : "#5e35b130",
        }}
        onClick={()=>{
          switchScreen("encrypt");
        }}
        >
          Encrypt
        </button>
        <button 
        className='btn btn-right'
        style={{
          backgroundColor: screen === "decrypt" ? "#1e88e5" : "#1e88e530"
        }}
        onClick={() => {
          switchScreen("decrypt");
        }}
        >
          Decrypt
        </button>
      </div>

      <div className='card'>
        <input
        value={text}
        onChange={({ target }) => {
          setText(target.value);
        }}
        name='text'
        type='text'
        placeholder={
          screen === "encrypt" ? "Enter Text" : "Enter Encrypted Data"
        }
        />

        <button className='btn submit-btn' onClick={handleClick}>
          {screen === "encrypt" ? "Encrypt" : "Decrypt"}
        </button>
      </div>

      {encrptedData || decrptedData ? (
        <div className='content'>
          <label>{screen === "encrypt" ? "Encrypted" : "Decrypted"} Data</label>
          <p>{screen === "encrypt" ? encrptedData : decrptedData}</p>

          <CopyToClipboard text={screen === "encrypt" ? encrptedData : decrptedData} onCopy={onCopyText}>
            <div>
              <span>{isCopied ? "Copied!" : <MdContentCopy />}</span>
            </div>
          </CopyToClipboard>
        </div>
      ) : null}
    </div>
  );
}
export default App;
