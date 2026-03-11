import React from 'react';

const RankingBadge = ({ index }) => {
  const rank = index + 1;
  let colorClass = "bg-gray-100 text-gray-800";
  if (rank === 1) colorClass = "bg-yellow-100 text-yellow-800 border border-yellow-300";
  else if (rank === 2) colorClass = "bg-gray-200 text-gray-800 border border-gray-400";
  else if (rank === 3) colorClass = "bg-orange-100 text-orange-800 border border-orange-300";

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${colorClass}`}>
      #{rank}
    </span>
  );
};
export default RankingBadge;
