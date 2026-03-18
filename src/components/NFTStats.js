// src/components/NFTStats.js
import { useState, useEffect } from 'react';
import { getNftStats } from "../api/Api"; // Adjust path if needed: '../api/Api' etc.

export default function NFTStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // You would normally get this from your wallet context (wagmi, rainbowkit, web3modal, etc.)
  // For demo purposes we're simulating it here
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchNFTStats() {
      try {
        setLoading(true);
        setError(null);

        // You can pass params if your backend expects them
        const data = await getNftStats({
          // chain: 'ethereum',
          // period: '30d',
          // Example only — remove/adjust according to your API
        });

        if (mounted) {
          setStats(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Failed to load NFT statistics');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchNFTStats();

    // Optional: simulate wallet connection status after mount
    // In real app → use useAccount() from wagmi or similar
    const timer = setTimeout(() => {
      setIsWalletConnected(true); // ← change to real logic
    }, 1200);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        NFT Statistics
      </h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-[180px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-gray-600 dark:text-gray-300">
            Loading NFT stats...
          </span>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <p className="text-red-700 dark:text-red-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1: Total NFTs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Total NFTs
            </h3>
            <div className="text-4xl font-bold text-gray-900 dark:text-white">
              {stats?.totalNfts != null
                ? stats.totalNfts.toLocaleString()
                : '—'}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              across all supported chains
            </p>
          </div>

          {/* Card 2: Wallet Connection Status */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Wallet Status
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span
                className={`inline-block w-4 h-4 rounded-full ${
                  isWalletConnected
                    ? 'bg-green-500 ring-4 ring-green-100 dark:ring-green-900/40'
                    : 'bg-red-500 ring-4 ring-red-100 dark:ring-red-900/40'
                }`}
              ></span>
              <span
                className={`text-xl font-medium ${
                  isWalletConnected
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                }`}
              >
                {isWalletConnected ? 'Connected' : 'Not Connected'}
              </span>
            </div>
            {isWalletConnected && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                Ready to view your NFTs
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
