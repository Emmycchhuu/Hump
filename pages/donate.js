import { useRouter } from 'next/router';

export default function Donate() {
  const router = useRouter();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Address copied!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Donate to Humper Flasher</h1>
      <p className="mb-6">Support our projects by donating!</p>
      <div className="space-y-4">
        <div className="flex items-center">
          <img src="/icons/usdt.png" alt="USDT" className="w-8 h-8 mr-2" />
          <span className="mr-2">USDT (TRC20): TX88i2zU4KYaU7h444Y669ECfyyKbpa3Bs</span>
          <button
            onClick={() => copyToClipboard('TX88i2zU4KYaU7h444Y669ECfyyKbpa3Bs')}
            className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-2 rounded"
          >
            Copy
          </button>
        </div>
        <div className="flex items-center">
          <img src="/icons/usdt.png" alt="USDT" className="w-8 h-8 mr-2" />
          <span className="mr-2">USDT (BEP20): 0x117C84FeF09d9e8e5F9edE29F2499774C6ae116F</span>
          <button
            onClick={() => copyToClipboard('0x117C84FeF09d9e8e5F9edE29F2499774C6ae116F')}
            className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-2 rounded"
          >
            Copy
          </button>
        </div>
      </div>
      <button onClick={() => router.push('/')} className="mt-6 text-blue-400">Back to Info</button>
      <button onClick={() => router.push('/flash')} className="mt-6 ml-4 text-blue-400">Flash</button>
    </div>
  );
}
