import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, AlertTriangle, ShieldAlert } from 'lucide-react';

const data = [
  { name: '00:00', load: 400 },
  { name: '04:00', load: 300 },
  { name: '08:00', load: 550 },
  { name: '12:00', load: 800 },
  { name: '16:00', load: 600 },
  { name: '20:00', load: 950 },
  { name: '24:00', load: 700 },
];

interface DashboardProps {
    texts: {
        title: string;
        chartTitle: string;
        mapTitle: string;
        mapFooter: string;
        tableTitle: string;
        searchPlaceholder: string;
        tableHeaderId: string;
        tableHeaderHost: string;
        tableHeaderService: string;
        tableHeaderStatus: string;
        tableHeaderRisk: string;
        [key: string]: any;
    }
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black border border-green-500 p-2 text-xs">
          <p className="text-green-400">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
};

const Dashboard: React.FC<DashboardProps> = ({ texts }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* Chart Widget */}
      <div className="bg-black/50 border border-green-500/30 p-4 rounded relative overflow-hidden group hover:border-green-500/60 transition-colors">
        <h3 className="text-green-400 mb-4 flex items-center gap-2">
            <ShieldAlert size={16} /> {texts.chartTitle}
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#14532d" />
              <XAxis dataKey="name" stroke="#22c55e" fontSize={12} tickLine={false} />
              <YAxis stroke="#22c55e" fontSize={12} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="load" stroke="#22c55e" strokeWidth={2} dot={{r: 2, fill: '#22c55e'}} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="absolute top-4 right-4 text-green-500 text-xs animate-pulse">ENCRYPTED FEED</div>
      </div>

      {/* Map Widget */}
      <div className="bg-black/50 border border-green-500/30 p-4 rounded relative min-h-[300px] overflow-hidden group hover:border-green-500/60 transition-colors">
        <h3 className="text-green-400 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            {texts.mapTitle}
        </h3>
        <div className="relative w-full h-full opacity-60">
            {/* Abstract World Map Representation */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(20,83,45,0.2)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            
            {/* Fake Pings */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 border border-green-500 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            </div>
            <div className="absolute top-1/3 left-1/2 w-3 h-3 border border-green-500 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            </div>
            <div className="absolute bottom-1/3 right-1/3 w-3 h-3 border border-red-500 rounded-full flex items-center justify-center animate-ping">
                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
            </div>
             <div className="absolute top-1/2 right-1/4 w-3 h-3 border border-cyan-500 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>
            </div>
            
            <p className="absolute bottom-4 left-4 text-xs text-gray-500 bg-black/80 px-2 py-1 border border-gray-800">
                {texts.mapFooter}
            </p>
        </div>
      </div>

      {/* Table Widget */}
      <div className="col-span-1 lg:col-span-2 bg-black/50 border border-green-500/30 p-6 rounded relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
            <h3 className="text-green-400">{texts.tableTitle}</h3>
            <div className="relative">
                <input 
                    type="text" 
                    placeholder={texts.searchPlaceholder}
                    className="bg-black border border-green-800 text-green-500 text-xs px-3 py-1 pl-8 focus:outline-none focus:border-green-500 w-64"
                />
                <Search size={12} className="absolute left-2 top-1.5 text-green-700" />
            </div>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
                <thead>
                    <tr className="border-b border-green-900 text-gray-500 uppercase tracking-wider">
                        <th className="px-4 py-2">{texts.tableHeaderId}</th>
                        <th className="px-4 py-2">{texts.tableHeaderHost}</th>
                        <th className="px-4 py-2">{texts.tableHeaderService}</th>
                        <th className="px-4 py-2">{texts.tableHeaderStatus}</th>
                        <th className="px-4 py-2">{texts.tableHeaderRisk}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-green-900/30 text-gray-300">
                    <tr className="hover:bg-green-900/10 transition-colors">
                        <td className="px-4 py-2 text-green-600">#9921</td>
                        <td className="px-4 py-2">192.168.0.XXX</td>
                        <td className="px-4 py-2">SSH-2.0</td>
                        <td className="px-4 py-2"><span className="text-yellow-500">EXPLOITABLE</span></td>
                        <td className="px-4 py-2 text-red-500">HIGH</td>
                    </tr>
                    <tr className="hover:bg-green-900/10 transition-colors">
                        <td className="px-4 py-2 text-green-600">#8210</td>
                        <td className="px-4 py-2">10.0.0.XXX</td>
                        <td className="px-4 py-2">HTTP/1.1</td>
                        <td className="px-4 py-2"><span className="text-green-500">INJECTED</span></td>
                        <td className="px-4 py-2 text-gray-500">ROOT</td>
                    </tr>
                    <tr className="hover:bg-green-900/10 transition-colors">
                        <td className="px-4 py-2 text-green-600">#4402</td>
                        <td className="px-4 py-2">172.16.2.XXX</td>
                        <td className="px-4 py-2">FTP</td>
                        <td className="px-4 py-2"><span className="text-yellow-500">BRUTEFORCE</span></td>
                        <td className="px-4 py-2 text-orange-500">USER</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;