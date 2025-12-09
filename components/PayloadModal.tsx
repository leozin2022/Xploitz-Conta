import React, { useState, useEffect } from 'react';
import { X, Lock, AlertTriangle, Database, DollarSign } from 'lucide-react';

interface PayloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FakeProfile {
  id: number;
  name: string;
  dob: string;
  mother: string;
  cpf: string;
  rg: string;
  bank: string;
  account: string;
}

// --- ÁREA DE EDIÇÃO: MUDE OS DADOS AQUI ---
const fixedProfiles: FakeProfile[] = [
  {
    id: 1000,
    name: "Ana Lima",
    dob: "03/01/2001",
    mother: "Vitor Carvalho",
    cpf: "334.***.***-07",
    rg: "40.***.***-*",
    bank: "NUBANK",
    account: "********"
  },
  {
    id: 1001,
    name: "Carlos Gomes",
    dob: "07/11/1977",
    mother: "Pedro Martins",
    cpf: "991.***.***-87",
    rg: "05.***.***-*",
    bank: "BRADESCO",
    account: "********"
  },
  {
    id: 1002,
    name: "João da Silva",
    dob: "15/05/1995",
    mother: "Maria da Silva",
    cpf: "123.***.***-45",
    rg: "12.***.***-*",
    bank: "INTER",
    account: "********"
  },
  // Para adicionar mais pessoas, copie o bloco acima (do { até o },) e cole aqui
];

const PayloadModal: React.FC<PayloadModalProps> = ({ isOpen, onClose }) => {
  const [data, setData] = useState<FakeProfile[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Aqui ele carrega a sua lista fixa em vez de gerar aleatório
      setData(fixedProfiles);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-[#050505] border border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.15)] w-full max-w-6xl h-[90vh] flex flex-col rounded overflow-hidden relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-green-900 bg-green-950/20">
          <div className="flex items-center gap-3 text-green-400 font-mono">
            <div className="p-1.5 bg-green-500/10 rounded border border-green-500/30 animate-pulse">
                <Database size={18} />
            </div>
            <div>
                <h3 className="uppercase tracking-widest text-sm font-bold flex items-center gap-2">
                    DATA_DUMP_V4.2 <span className="text-[10px] bg-red-500 text-black px-1 rounded font-bold">PARTIAL ACCESS</span>
                </h3>
                <p className="text-[10px] text-green-600/70">SOURCE: GOV_DB_LEAK // ENCRYPTED</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-green-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Monetization Banner */}
        <div className="bg-red-900/20 border-b border-red-500/50 p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
                <AlertTriangle className="text-red-500 animate-bounce" size={24} />
                <div>
                    <h4 className="text-red-400 font-bold font-mono text-sm md:text-base uppercase tracking-wider">
                        RESTRICTED PREVIEW MODE
                    </h4>
                    <p className="text-xs text-red-300/70 max-w-xl">
                        Sensitive data (CPF, RG, Credit Card) is encrypted with AES-256. Purchase the decryption key to reveal full database.
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4 bg-black/40 p-2 rounded border border-red-900/30">
                <div className="text-right">
                    <div className="text-[10px] text-gray-500 uppercase">Full Database Price</div>
                    <div className="text-xl font-bold text-green-400 font-mono">$90.00 USD</div>
                </div>
                <a 
                    href="https://www.paypal.com/br/home" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-green-600 hover:bg-green-500 text-black font-bold font-mono text-sm uppercase tracking-wider transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] flex items-center gap-2 cursor-pointer no-underline"
                >
                    <DollarSign size={16} /> BUY NOW (XMR)
                </a>
            </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black p-4">
            <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-black z-10 shadow-lg">
                    <tr className="text-[10px] md:text-xs text-green-600 font-mono uppercase tracking-wider border-b border-green-800">
                        <th className="p-3">ID</th>
                        <th className="p-3">Full Name</th>
                        <th className="p-3">Date of Birth</th>
                        <th className="p-3">Mother's Name</th>
                        <th className="p-3 text-red-400"><Lock size={10} className="inline mr-1"/> CPF (Gov ID)</th>
                        <th className="p-3 text-red-400"><Lock size={10} className="inline mr-1"/> RG (State ID)</th>
                        <th className="p-3">Bank</th>
                        <th className="p-3 text-red-400"><Lock size={10} className="inline mr-1"/> CC / Account</th>
                    </tr>
                </thead>
                <tbody className="font-mono text-xs md:text-sm text-gray-300">
                    {data.map((profile) => (
                        <tr key={profile.id} className="border-b border-green-900/20 hover:bg-green-900/10 transition-colors group">
                            <td className="p-3 text-gray-600 group-hover:text-green-500">{profile.id}</td>
                            <td className="p-3 font-bold">{profile.name}</td>
                            <td className="p-3 text-gray-400">{profile.dob}</td>
                            <td className="p-3 text-gray-400">{profile.mother}</td>
                            <td className="p-3 text-gray-500 tracking-widest">{profile.cpf}</td>
                            <td className="p-3 text-gray-500 tracking-widest">{profile.rg}</td>
                            <td className="p-3 text-blue-300">{profile.bank}</td>
                            <td className="p-3 text-gray-500 tracking-widest font-bold">{profile.account}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Footer Status */}
        <div className="bg-black border-t border-green-900/50 p-2 px-4 flex justify-between items-center text-[10px] text-green-700 font-mono">
            <div>RECORDS_LOADED: {data.length}/{data.length}</div>
            <div className="animate-pulse">WAITING_FOR_PAYMENT...</div>
        </div>

      </div>
    </div>
  );
};

export default PayloadModal;
