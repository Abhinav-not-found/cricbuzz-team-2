import MatchCommentarySection from "../MatchCommentarySection";

const MatchCenterPage = () => {

  const matchInfo = {
    type: "ODI · Match 14",
    venue: "Wankhede Stadium, Mumbai",
    time: "2:30 PM IST",
    status: "LIVE"
  };

  const team1 = {
    name: "India",
    short: "IND",
    captain: "Rohit Sharma",
    keeper: "KL Rahul",
    playersCount: 11,
    toss: "Won · Bat",
    score: "187/4",
    overs: "34.2 ov",
    crr: "5.44"
  };

  const team2 = {
    name: "Australia",
    short: "AUS",
    captain: "Pat Cummins",
    keeper: "Alex Carey",
    playersCount: 11,
    toss: "Lost toss",
    action: "Bowl",
    statusText: "yet to bat"
  };

  

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans antialiased text-gray-800">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-gray-100 text-sm text-gray-500 gap-4">
          <div className="flex items-center gap-6 flex-wrap">
            <span>{matchInfo.type}</span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              {matchInfo.venue}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {matchInfo.time}
            </span>
          </div>
          <span className="bg-emerald-50 text-emerald-500 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100 tracking-wider">
            {matchInfo.status}
          </span>
        </div>

        {/* Dashboard Grid (Teams and Live Circle Score) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 items-center border-b border-gray-100">
          
          {/* Team 1 Card */}
          <div className="border border-gray-100 rounded-2xl p-5 space-y-4 bg-white shadow-sm h-full flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold text-sm">
                {team1.short}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{team1.name}</h3>
                <span className="text-xs text-gray-400">Team 1</span>
              </div>
            </div>
            
            <div className="text-sm space-y-2 pt-2">
              <div className="flex justify-between"><span className="text-gray-400">Captain</span><span className="font-medium text-gray-700">{team1.captain}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Keeper</span><span className="font-medium text-gray-700">{team1.keeper}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Players</span><span className="font-medium text-gray-700">{team1.playersCount}</span></div>
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-gray-50 text-sm">
              <span className="text-gray-400">Toss</span>
              <span className="font-semibold text-emerald-600">{team1.toss}</span>
            </div>
          </div>

          {/* Central Live Score Circle */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-56 h-56 rounded-full border border-gray-100 shadow-sm flex flex-col items-center justify-center p-6 text-center bg-white relative">
              <span className="text-4xl font-extrabold text-gray-900 tracking-tight">{team1.score}</span>
              <span className="text-xs font-medium text-gray-400 mt-1">{team1.short} · {team1.overs}</span>
              
              <div className="my-3 text-xs font-bold text-gray-300 tracking-widest uppercase">vs</div>
              
              <div className="w-8 h-0.5 bg-gray-800 mb-2"></div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{team2.short} · {team2.statusText}</span>
              
              <div className="absolute bottom-4 text-xs font-medium text-gray-400">
                CRR {team1.crr}
              </div>
            </div>
          </div>

          {/* Team 2 Card */}
          <div className="border border-gray-100 rounded-2xl p-5 space-y-4 bg-white shadow-sm h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{team2.name}</h3>
                <span className="text-xs text-gray-400">Team 2</span>
              </div>
              <div className="w-12 h-12 rounded-full border border-gray-100 bg-gray-50"></div>
            </div>
            
            <div className="text-sm space-y-2 pt-2">
              <div className="flex justify-between"><span className="font-medium text-gray-700">{team2.captain}</span><span className="text-gray-400">Captain</span></div>
              <div className="flex justify-between"><span className="font-medium text-gray-700">{team2.keeper}</span><span className="text-gray-400">Keeper</span></div>
              <div className="flex justify-between"><span className="font-medium text-gray-700">{team2.playersCount}</span><span className="text-gray-400">Players</span></div>
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-gray-50 text-sm">
              <span className="text-gray-400">{team2.toss}</span>
              <span className="font-semibold text-gray-500">{team2.action}</span>
            </div>
          </div>

        </div>

        {/* Commentary Section */}
        <MatchCommentarySection />

      </div>
    </div>
  );
};

export default MatchCenterPage;