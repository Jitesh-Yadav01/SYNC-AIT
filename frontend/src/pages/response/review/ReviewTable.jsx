import React from 'react';

const ReviewTable = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <div className="text-sm text-gray-500 py-2">No reviews yet</div>;
  }

  return (
    <div className="overflow-x-auto rounded border-t border-slate-200 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Reviewer</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Communication</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Technical</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Interest</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Behaviour</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Other</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Comment</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100">
          {reviews.map((r, i) => (
            <tr key={i} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2 whitespace-nowrap text-slate-900 font-medium">{r.reviewerName || 'Unknown'}</td>
              <td className="px-4 py-2 whitespace-nowrap text-slate-600">{r.reviewerRole || '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap text-slate-600">{r.scores?.communication ?? '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap text-slate-600">{r.scores?.technical ?? '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap text-slate-600">{r.scores?.interest ?? '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap text-slate-600">{r.scores?.behaviour ?? '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap text-slate-600">{r.scores?.other ?? '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap text-slate-900 font-bold">{r.totalScore ?? '-'}</td>
              <td className="px-4 py-2 text-slate-600 max-w-xs truncate" title={r.comment}>{r.comment || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ReviewTable;
