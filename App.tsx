import React, { useState } from 'react';
import { Rat, Terminal, AlertTriangle, Lock, Shield, Skull, Eye, Activity, Cpu, ShieldAlert } from 'lucide-react';
import MatrixRain from './components/MatrixRain';
import HeroTerminal from './components/HeroTerminal';
import Dashboard from './components/Dashboard';
import PayloadModal from './components/PayloadModal';
import { ContentProvider, useContent } from './contexts/ContentContext';

const AppContent: React.FC = () => {
  const { content } = useContent();
  const [isPayloadModalOpen, setIsPayloadModalOpen] = useState(false);

  // Parse JSON data for exploits
  let exploits = [];
  try {
      exploits = JSON.parse(content.exploits.cardsJson);
  } catch (e) {
      console.error("Failed to parse exploits JSON", e);
      exploits = [];
  }

  // Parse JSON data for legal items
  let legalItems = [];
  try {
      legalItems = JSON.parse(content.legal.itemsJson);
  } catch(e) {
      console.error("Failed to parse legal items JSON", e);
      legalItems = [];
  }

  // Helper to split text by newline for display
  const renderMultiline = (text: string) => {
      return text.split('\n').map((str, i) => <div key={i}>{str}</div>);
  };

  const navLinks = [
    { label: content.header.navHome, href: "#home" },
    { label: content.header.navExploits, href: "#exploits" },
    { label: content.header.navPanel, href: "#panel" },
    { label: content.header.navContact, href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80; // Height of header + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden selection:bg-green-900 selection:text-green-100">
      
      {/* Background Effects */}
      <MatrixRain />
      <div className="scanlines"></div>
      <div className="crt-flicker"></div>

      <PayloadModal isOpen={isPayloadModalOpen} onClose={() => setIsPayloadModalOpen(false)} />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-green-900/50 h-16 flex items-center justify-between px-4 md:px-8 relative group/header">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-green-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative p-1 border border-green-500/50 rounded-full bg-black">
              <Rat className="text-green-500 w-6 h-6" />
            </div>
          </div>
          <h1 className="text-lg md:text-xl tracking-wider font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700 font-mono hidden sm:block">
            {content.header.brand}
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs tracking-widest text-gray-400">
          {navLinks.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={(e) => handleNavClick(e, item.href)}
              className="hover:text-green-400 transition-colors relative group cursor-pointer"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-green-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 border border-red-900/50 bg-red-950/20 px-3 py-1 rounded">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] md:text-xs text-red-400 font-bold tracking-widest uppercase">{content.header.badge}</span>
        </div>
      </header>

      {/* Main Content Scroll */}
      <main className="relative z-10 pt-16">
        
        {/* Hero Section */}
        <section id="home" className="min-h-[90vh] flex flex-col items-center justify-center relative px-4 md:px-12 py-20 scroll-mt-20">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black z-0"></div>
            
            <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6">
                <div 
                  className="inline-block px-2 py-1 bg-green-900/20 border border-green-500/30 text-green-400 text-xs tracking-widest mb-2 animate-pulse"
                >
                  {content.hero.status}
                </div>
                
                <h2 className="text-4xl md:text-6xl font-bold font-mono leading-tight glitch-hover relative">
                  <span className="hover:text-green-300 transition-colors block">{content.hero.titleLine1}</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-200 to-transparent hover:text-green-100 transition-colors block">
                    {content.hero.titleLine2}
                  </span>
                </h2>

                <div className="relative">
                    <p className="text-gray-400 max-w-lg text-sm md:text-base border-l-2 border-green-800 pl-4 hover:border-green-500 hover:text-gray-300 transition-colors">
                    {content.hero.description}
                    </p>
                </div>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('panel')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-green-600/10 border border-green-500 text-green-400 font-mono text-sm hover:bg-green-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] flex items-center gap-2"
                  >
                    <Terminal size={16} /> {content.hero.btnPrimary}
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('exploits')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 border border-gray-700 text-gray-400 font-mono text-sm hover:border-gray-500 hover:text-white transition-all bg-black/50 backdrop-blur-sm"
                  >
                    {content.hero.btnSecondary}
                  </button>
                </div>
              </div>

              <div className="flex justify-end relative">
                <HeroTerminal messages={content.terminal.lines} />
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
              <span className="text-[10px] tracking-widest text-green-500">{content.hero.scrollHint}</span>
              <div className="w-px h-12 bg-gradient-to-b from-green-500 to-transparent"></div>
            </div>
        </section>

        {/* Fake Exploit Packs */}
        <section id="exploits" className="py-20 px-4 relative bg-[#050505] scroll-mt-20">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16 space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white font-mono hover:text-green-400 transition-colors">{content.exploits.title}</h3>
              <p className="text-gray-500 text-xs md:text-sm uppercase tracking-widest hover:text-gray-300 transition-colors">{content.exploits.subtitle}</p>
            </div>

            <div className="flex justify-center items-center">
              {exploits.map((exploit: any) => (
                <div 
                    key={exploit.id} 
                    className={`group bg-black border-2 ${exploit.color} p-8 relative overflow-hidden transition-all duration-500 w-full max-w-md animate-pulse shadow-[0_0_50px_rgba(168,85,247,0.3)]`}
                >
                  <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <Lock size={20} />
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Package Type</div>
                    <div className="text-lg font-bold tracking-widest">{exploit.type}</div>
                  </div>

                  <h4 className={`text-3xl font-mono mb-4 ${exploit.color.split(' ')[1]}`}>{exploit.name}</h4>
                  
                  <div className="flex items-center justify-between mt-8 text-xs border-t border-purple-900/50 pt-6">
                    <span className="text-purple-400 bg-purple-900/20 px-3 py-1 rounded font-bold tracking-wider">STATUS: UNDETECTED</span>
                    <span className="font-mono text-purple-400 text-base">SR: {exploit.rate}</span>
                  </div>

                  <div className="mt-6">
                    <button 
                      onClick={() => setIsPayloadModalOpen(true)}
                      className="w-full py-3 text-sm border border-purple-700 text-purple-400 hover:border-purple-400 hover:bg-purple-950/30 uppercase tracking-widest transition-colors font-bold shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                    >
                      EXECUTE PAYLOAD
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section id="panel" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900/20 border-t border-gray-900 relative scroll-mt-20">
           <div className="container mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <Activity className="text-green-500" />
                <h2 className="text-xl md:text-2xl font-mono text-white hover:text-green-400 transition-colors">{content.dashboard.title}</h2>
              </div>
              <Dashboard texts={content.dashboard} />
           </div>
        </section>

        {/* Console / Command Section */}
        <section className="py-16 px-4 bg-black relative relative">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-[#0a0a0a] border border-green-900 rounded-lg overflow-hidden shadow-2xl hover:border-green-500 transition-colors">
              <div className="bg-[#111] px-4 py-2 border-b border-green-900 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-xs text-gray-500 font-mono">{content.console.user}</div>
              </div>
              <div className="p-6 font-mono text-sm md:text-base space-y-2 h-64 overflow-y-auto">
                <div className="text-green-500">
                  <span className="text-purple-400">{content.console.user}$</span> {content.console.command1}
                </div>
                <div className="text-gray-400 pl-4">
                  {renderMultiline(content.console.output1)}
                </div>
                <div className="text-green-500 pt-2">
                   <span className="text-purple-400">{content.console.user}$</span> {content.console.command2}
                </div>
                <div className="text-gray-400 pl-4">
                  {renderMultiline(content.console.output2)}
                </div>
                 <div className="text-green-500 pt-2">
                   <span className="text-purple-400">{content.console.user}$</span> <span className="animate-pulse">_</span>
                </div>
              </div>
              <div className="bg-red-900/20 border-t border-red-900/50 p-2 text-center text-red-400 text-xs flex items-center justify-center gap-2">
                <AlertTriangle size={12} />
                {content.console.warning}
              </div>
            </div>
          </div>
        </section>

        {/* Legal Notice */}
        <section className="py-12 px-4 bg-black border-t border-red-900/30 relative">
          <div className="container mx-auto max-w-3xl bg-red-950/10 border border-red-900/50 p-8 rounded relative overflow-hidden hover:bg-red-900/20 transition-colors">
            <div className="absolute -right-10 -top-10 text-red-900/20 transform rotate-12">
               <Shield size={200} />
            </div>
            
            <div className="flex items-start gap-4 relative z-10">
              <ShieldAlert className="text-red-500 shrink-0 mt-1" size={32} />
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-4 font-mono">{content.legal.title}</h3>
                <ul className="text-gray-400 text-sm space-y-2 list-disc pl-4">
                  {legalItems.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="contact" className="bg-black py-8 border-t border-gray-900 text-center relative z-10 relative scroll-mt-20">
        <div className="container mx-auto px-4">
           <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
             <Cpu size={16} />
             <Eye size={16} />
             <Skull size={16} />
           </div>
           <p className="text-gray-600 text-xs font-mono">
             {content.footer.copyright}
           </p>
           <div className="flex justify-center gap-6 mt-4 text-[10px] text-gray-700 uppercase tracking-widest">
             <span className="cursor-pointer hover:text-gray-500">{content.footer.linkPrivacy}</span>
             <span className="cursor-pointer hover:text-gray-500">{content.footer.linkTerms}</span>
             <span className="cursor-pointer hover:text-gray-500">{content.footer.linkEthical}</span>
           </div>
           <div className="h-0.5 w-24 bg-green-500 mx-auto mt-8 shadow-[0_0_10px_#22c55e]"></div>
        </div>
      </footer>

    </div>
  );
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}

export default App;