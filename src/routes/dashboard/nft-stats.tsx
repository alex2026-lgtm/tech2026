import NFTStats from '@/components/NFTStats';

export default function NFTStatsRoute() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">NFT Statistics Dashboard</h1>
      <NFTStats />
    </div>
  );
}

// Optional: metadata / loader (depending on your router)
export const meta = {
  title: 'NFT Stats',
};
