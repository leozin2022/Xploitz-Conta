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

// --- ÁREA DE EDIÇÃO: LISTA DE 30 PESSOAS FICTÍCIAS ---
const fixedProfiles: FakeProfile[] = [
  { id: 1000, name: "Ana Lima", dob: "03/01/2001", mother: "Vitor Carvalho", cpf: "334.***.***-07", rg: "40.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1001, name: "Carlos Gomes", dob: "07/11/1977", mother: "Pedro Martins", cpf: "991.***.***-87", rg: "05.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1002, name: "João da Silva", dob: "15/05/1995", mother: "Maria da Silva", cpf: "123.***.***-45", rg: "12.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1003, name: "Mariana Souza", dob: "22/08/1988", mother: "Fernanda Souza", cpf: "456.***.***-12", rg: "33.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1004, name: "Pedro Rocha", dob: "10/02/1990", mother: "Ana Rocha", cpf: "789.***.***-33", rg: "44.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1005, name: "Lucas Ferreira", dob: "05/12/2002", mother: "Clara Ferreira", cpf: "321.***.***-99", rg: "55.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1006, name: "Fernanda Alves", dob: "14/07/1985", mother: "Sônia Alves", cpf: "654.***.***-77", rg: "66.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1007, name: "Gabriel Costa", dob: "30/09/1998", mother: "Patrícia Costa", cpf: "987.***.***-11", rg: "77.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1008, name: "Beatriz Santos", dob: "25/03/2000", mother: "Lúcia Santos", cpf: "147.***.***-22", rg: "88.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1009, name: "Rafael Oliveira", dob: "18/11/1992", mother: "Sandra Oliveira", cpf: "258.***.***-55", rg: "99.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1010, name: "Juliana Pereira", dob: "09/06/1989", mother: "Márcia Pereira", cpf: "369.***.***-88", rg: "10.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1011, name: "Thiago Rodrigues", dob: "12/04/1996", mother: "Paula Rodrigues", cpf: "741.***.***-00", rg: "21.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1012, name: "Larissa Martins", dob: "28/01/1993", mother: "Eliane Martins", cpf: "852.***.***-33", rg: "32.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1013, name: "Gustavo Almeida", dob: "16/08/2003", mother: "Renata Almeida", cpf: "963.***.***-66", rg: "43.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1014, name: "Camila Ribeiro", dob: "02/10/1987", mother: "Vânia Ribeiro", cpf: "159.***.***-99", rg: "54.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1015, name: "Felipe Barbosa", dob: "20/05/1991", mother: "Cristina Barbosa", cpf: "753.***.***-11", rg: "65.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1016, name: "Amanda Cardoso", dob: "11/09/1999", mother: "Sílvia Cardoso", cpf: "951.***.***-44", rg: "76.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1017, name: "Bruno Dias", dob: "04/12/1986", mother: "Marta Dias", cpf: "357.***.***-77", rg: "87.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1018, name: "Letícia Nunes", dob: "27/02/1997", mother: "Ângela Nunes", cpf: "246.***.***-00", rg: "98.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1019, name: "Rodrigo Teixeira", dob: "19/06/1984", mother: "Fátima Teixeira", cpf: "135.***.***-33", rg: "09.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1020, name: "Natália Mendes", dob: "08/08/2001", mother: "Alice Mendes", cpf: "468.***.***-66", rg: "19.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1021, name: "Vinícius Castro", dob: "30/01/1994", mother: "Helena Castro", cpf: "579.***.***-99", rg: "28.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1022, name: "Isabela Araujo", dob: "17/04/1990", mother: "Beatriz Araujo", cpf: "680.***.***-22", rg: "37.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1023, name: "Diego Ramos", dob: "23/11/1988", mother: "Gisele Ramos", cpf: "791.***.***-55", rg: "46.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1024, name: "Carolina Neves", dob: "06/07/2002", mother: "Denise Neves", cpf: "802.***.***-88", rg: "55.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1025, name: "Eduardo Pinto", dob: "14/09/1985", mother: "Júlia Pinto", cpf: "913.***.***-11", rg: "64.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1026, name: "Bianca Moraes", dob: "29/03/1998", mother: "Lorena Moraes", cpf: "024.***.***-44", rg: "73.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1027, name: "Guilherme Correia", dob: "13/05/1995", mother: "Monique Correia", cpf: "135.***.***-77", rg: "82.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1028, name: "Vitória Azevedo", dob: "21/10/2000", mother: "Sabrina Azevedo", cpf: "246.***.***-00", rg: "91.***.***-*", bank: "CARTAO", account: "********" },
  { id: 1029, name: "Marcelo Freitas", dob: "01/12/1983", mother: "Tânia Freitas", cpf: "357.***.***-33", rg: "15.***.***-*", bank: "CARTAO", account: "********" },
];

const PayloadModal: React.FC<PayloadModalProps> = ({ isOpen, onClose }) => {
  const [data, setData] = useState<FakeProfile[]>([]);

  useEffect(() => {
    if (isOpen) {
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
