export default function NFTStatsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">NFT Statistics</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of total NFTs and wallet connection status
        </p>
      </header>
      <NFTStats />
    </div>
  );
}
