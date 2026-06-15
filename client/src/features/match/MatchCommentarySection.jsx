import React from 'react'

const MatchCommentarySection = () => {

    const commentary = [
        { over: "34.2", type: "FOUR", text: "Hazlewood to Kohli, pitched up outside off, driven beautifully through covers. Four!", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
        { over: "34.1", type: "SIX", text: "Cummins to Rohit, short and wide, pulled over square leg. Massive six!", color: "bg-blue-50 text-blue-600 border-blue-200" },
        { over: "33.6", type: "WICKET", text: "Hazlewood to Gill, nipped back in, hits the top of off stump. Gill out for 42!", color: "bg-rose-50 text-rose-600 border-rose-200" },
        { over: "33.5", type: "1 RUN", text: "Good length on middle, worked away to midwicket for a single.", color: "bg-gray-100 text-gray-600 border-gray-200" },
        { over: "33.4", type: "DOT", text: "Good length delivery, defended solidly back to the bowler.", color: "bg-gray-100 text-gray-600 border-gray-200" }
    ];

    return (
        <div>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        Commentary
                    </h2>
                    <button className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">Ball by ball</button>
                </div>

                <div className="divide-y divide-gray-100">
                    {commentary.map((ball, index) => (
                        <div key={index} className="py-4 flex gap-6 items-start first:pt-0 last:pb-0">
                            <span className="text-sm font-bold text-gray-400 pt-1 w-10 shrink-0">{ball.over}</span>
                            <div className="space-y-2">
                                <span className={`inline-block text-[11px] font-extrabold px-2 py-0.5 rounded border ${ball.color} tracking-wider`}>
                                    {ball.type}
                                </span>
                                <p className="text-sm text-gray-600 leading-relaxed">{ball.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Floating/Bottom Scroll Button indicator from screenshot */}
                <div className="flex justify-center mt-6">
                    <button className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center shadow-md hover:bg-gray-800 transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MatchCommentarySection