import React, { useState, useEffect } from 'react';

interface HeroTerminalProps {
    messages: string[];
}

const HeroTerminal: React.FC<HeroTerminalProps> = ({ messages }) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    setLines([]); // Reset lines when messages change
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < messages.length) {
        setLines(prev => [...prev, messages[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="bg-black/80 border border-green-500/50 p-4 rounded font-mono text-xs sm:text-sm shadow-[0_0_15px_rgba(34,197,94,0.3)] max-w-md w-full relative overflow-hidden backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-2 border-b border-green-900/50 pb-2">
         <div className="w-2 h-2 rounded-full bg-red-500"></div>
         <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
         <div className="w-2 h-2 rounded-full bg-green-500"></div>
         <span className="ml-auto text-green-700 text-xs">TERM_v2.0</span>
      </div>
      <div className="h-32 overflow-hidden flex flex-col justify-end">
        {lines.map((line, i) => (
          <div key={i} className="text-green-400">
            <span className="text-green-700 mr-2">$</span>
            {line}
          </div>
        ))}
        <div className="animate-pulse text-green-500">_</div>
      </div>
    </div>
  );
};

export default HeroTerminal;