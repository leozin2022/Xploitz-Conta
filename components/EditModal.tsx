import React, { useState, useEffect } from 'react';
import { X, Save, Edit3, Trash2, Plus } from 'lucide-react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionTitle: string;
  data: any;
  onSave: (newData: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, sectionTitle, data, onSave }) => {
  const [formData, setFormData] = useState<any>(data);

  useEffect(() => {
    setFormData(data);
  }, [data, isOpen]);

  if (!isOpen) return null;

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleArrayChange = (key: string, index: number, value: string) => {
    setFormData((prev: any) => {
        const newArray = [...prev[key]];
        newArray[index] = value;
        return { ...prev, [key]: newArray };
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const renderField = (key: string, value: any) => {
    // Special handler for Exploit Cards JSON
    if (key === 'cardsJson') {
        let cards: any[] = [];
        try {
            cards = JSON.parse(value);
        } catch (e) {
            return null;
        }

        const handleCardChange = (index: number, field: string, newVal: string) => {
            const newCards = [...cards];
            newCards[index] = { ...newCards[index], [field]: newVal };
            handleChange(key, JSON.stringify(newCards, null, 2));
        };

        return (
            <div key={key} className="mb-6 border border-green-900/50 p-4 rounded bg-green-950/10">
                <label className="block text-green-500 text-sm uppercase mb-4 font-bold font-mono border-b border-green-900 pb-2 flex justify-between items-center">
                    Exploit Cards Configuration
                    <span className="text-[10px] text-gray-500 font-normal">JSON_PARSED</span>
                </label>
                {cards.map((card: any, idx: number) => (
                    <div key={idx} className="mb-4 p-3 border border-green-900/30 bg-black/40 rounded hover:border-green-500/30 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-xs text-green-600 font-bold uppercase">Card #{idx + 1}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                             <div>
                                <label className="block text-[10px] text-gray-500 uppercase mb-1">Package Type</label>
                                <input 
                                    value={card.type} 
                                    onChange={(e) => handleCardChange(idx, 'type', e.target.value)}
                                    className="w-full bg-black border border-green-900 text-white text-xs px-2 py-1.5 focus:border-green-500 focus:outline-none rounded-sm"
                                    placeholder="e.g. Trojan"
                                />
                             </div>
                             <div>
                                <label className="block text-[10px] text-gray-500 uppercase mb-1">Success Rate</label>
                                <input 
                                    value={card.rate} 
                                    onChange={(e) => handleCardChange(idx, 'rate', e.target.value)}
                                    className="w-full bg-black border border-green-900 text-white text-xs px-2 py-1.5 focus:border-green-500 focus:outline-none rounded-sm"
                                    placeholder="e.g. 87%"
                                />
                             </div>
                        </div>
                        <div>
                            <label className="block text-[10px] text-gray-500 uppercase mb-1">Exploit Name</label>
                            <input 
                                value={card.name} 
                                onChange={(e) => handleCardChange(idx, 'name', e.target.value)}
                                className="w-full bg-black border border-green-900 text-green-400 font-mono font-bold text-sm px-2 py-1.5 focus:border-green-500 focus:outline-none rounded-sm"
                                placeholder="e.g. RAT_GHOST"
                            />
                        </div>
                    </div>
                ))}
                <div className="text-[10px] text-gray-600 italic text-center mt-2">
                    * Colors and ID are managed automatically or via advanced JSON edit.
                </div>
            </div>
        );
    }

    // Special handler for Legal Items JSON
    if (key === 'itemsJson') {
        let items: string[] = [];
        try {
            items = JSON.parse(value);
        } catch (e) {
            return null;
        }

        const handleItemChange = (index: number, newVal: string) => {
            const newItems = [...items];
            newItems[index] = newVal;
            handleChange(key, JSON.stringify(newItems, null, 2));
        };

        return (
            <div key={key} className="mb-6 border border-green-900/50 p-4 rounded bg-green-950/10">
                <label className="block text-green-500 text-sm uppercase mb-4 font-bold font-mono border-b border-green-900 pb-2">
                    Legal Notice Bullets
                </label>
                {items.map((item: string, idx: number) => (
                    <div key={idx} className="mb-2">
                        <label className="block text-[10px] text-gray-500 uppercase mb-1">Point {idx + 1}</label>
                        <textarea
                            value={item}
                            onChange={(e) => handleItemChange(idx, e.target.value)}
                            className="w-full h-16 bg-black border border-green-900 text-gray-300 text-xs px-2 py-1.5 focus:border-green-500 focus:outline-none rounded-sm resize-none"
                        />
                    </div>
                ))}
            </div>
        );
    }

    if (Array.isArray(value)) {
        // Simple array of strings (like terminal lines)
        return (
            <div key={key} className="mb-6 border border-green-900/50 p-4 rounded bg-green-950/10">
                <label className="block text-green-500 text-sm uppercase mb-4 font-bold font-mono border-b border-green-900 pb-2">{key} (Lines)</label>
                {value.map((item: string, idx: number) => (
                    <div key={idx} className="mb-2">
                         <label className="block text-[10px] text-gray-500 uppercase mb-1">Line {idx + 1}</label>
                        <input
                            key={idx}
                            type="text"
                            value={formData[key][idx]}
                            onChange={(e) => handleArrayChange(key, idx, e.target.value)}
                            className="w-full bg-black border border-green-800 text-green-400 px-2 py-1.5 font-mono text-sm focus:border-green-500 focus:outline-none rounded-sm"
                        />
                    </div>
                ))}
            </div>
        )
    }

    if (key.startsWith('output') || key === 'description' || key === 'warning') {
        return (
            <div key={key} className="mb-4">
                <label className="block text-green-500 text-xs uppercase mb-1 font-mono">{key}</label>
                <textarea
                    value={formData[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full h-24 bg-black border border-green-800 text-white px-2 py-2 font-mono text-sm focus:border-green-500 focus:outline-none rounded-sm"
                />
            </div>
        );
    }

    return (
      <div key={key} className="mb-4">
        <label className="block text-green-500 text-xs uppercase mb-1 font-mono">{key}</label>
        <input
          type="text"
          value={formData[key]}
          onChange={(e) => handleChange(key, e.target.value)}
          className="w-full bg-black border border-green-800 text-white px-2 py-2 font-mono text-sm focus:border-green-500 focus:outline-none rounded-sm"
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0a0a0a] border border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)] w-full max-w-2xl max-h-[85vh] flex flex-col rounded-lg overflow-hidden ring-1 ring-green-500/50">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-green-900 bg-green-950/30">
          <div className="flex items-center gap-3 text-green-400 font-mono">
            <div className="p-1.5 bg-green-500/10 rounded border border-green-500/30">
                <Edit3 size={18} />
            </div>
            <div>
                <h3 className="uppercase tracking-widest text-sm font-bold">EDIT_PROTOCOL: {sectionTitle}</h3>
                <p className="text-[10px] text-green-600/70">SECURE_CHANNEL_ESTABLISHED</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors p-2 hover:bg-red-950/30 rounded">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black">
          {Object.keys(formData).map(key => renderField(key, formData[key]))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-green-900 bg-black/95 flex justify-between items-center">
            <div className="text-[10px] text-gray-600 font-mono hidden sm:block">
                CHANGES WILL BE PERSISTED LOCALLY
            </div>
            <div className="flex gap-4">
                <button 
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-mono text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
                >
                    Abort
                </button>
                <button 
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 hover:bg-green-500 text-black font-bold font-mono text-sm flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] rounded-sm uppercase tracking-wider"
                >
                    <Save size={16} /> Save Config
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

// Simple Edit Button Component to use across the app
export const EditButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button 
        onClick={onClick}
        className="absolute top-4 right-4 z-50 bg-black/80 border border-green-500/30 text-green-600 p-2 rounded hover:bg-green-900/20 hover:text-green-400 hover:border-green-500 transition-all opacity-40 hover:opacity-100 group backdrop-blur-sm"
        title="Edit Section Text"
    >
        <Edit3 size={14} />
        <span className="hidden group-hover:inline ml-2 text-[10px] font-mono tracking-widest">EDIT_TEXT</span>
    </button>
);