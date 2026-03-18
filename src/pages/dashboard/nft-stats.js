import NFTStats from "../../components/NFTStats";

export default function NFTStatsRoute() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">NFT Statistics Dashboard</h1>
      <NFTStats />
    </div>
  );
}

// 可選：如果你使用的路由系統支援 meta 物件（例如 vite-plugin-ssr、remix、某些自訂 router）
// 如果只是普通的 react-router-dom v6，通常不需要這個 meta
export const meta = {
  title: 'NFT Stats',
};
