import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Default content structure
export const defaultContent = {
  header: {
    brand: "BLACKRAT XploitZ",
    badge: "RESTRICTED ACCESS // LEVEL 5",
    navHome: "TERMINAL",
    navExploits: "0-DAY MARKET",
    navPanel: "C2 PANEL",
    navContact: "SECURE COMM"
  },
  hero: {
    status: "SYSTEM ONLINE // ROOT ACCESS",
    titleLine1: "ACCESS",
    titleLine2: "GRANTED",
    description: "Advanced C2 Command & Control infrastructure. Stealth persistence active. Global botnet management enabled. Connection is encrypted via Triple-VPN nodes.",
    btnPrimary: "ENTER MAIN PANEL",
    btnSecondary: "VIEW SYSTEM LOGS",
    scrollHint: "INITIALIZE PROTOCOL"
  },
  terminal: {
    lines: [
      "connecting to secure node...",
      "establishing encrypted tunnel...",
      "bypassing firewall... [SUCCESS]",
      "loading exploit database...",
      "access granted level: ROOT",
      "status: ANONYMITY ACTIVE"
    ]
  },
  exploits: {
    title: "PREMIUM EXPLOIT PACKS",
    subtitle: "0-day vulnerabilities and payload delivery systems. Deployment ready.",
    // We will treat the cards as a JSON string for editing simplicity in this context
    cardsJson: JSON.stringify([
      { id: 2, name: "PHANTOM-FRAME", type: "RCE Kit", rate: "94.2%", color: "border-purple-500 text-purple-400" },
    ], null, 2)
  },
  dashboard: {
    title: "COMMAND & CONTROL CENTER",
    chartTitle: "LIVE TRAFFIC INJECTION",
    mapTitle: "ACTIVE GLOBAL INFECTIONS",
    mapFooter: "Real-time geo-location tracking active. Node latency: 4ms.",
    tableTitle: "ACTIVE BEACONS",
    searchPlaceholder: "search_zombie_hosts()",
    tableHeaderId: "ID",
    tableHeaderHost: "Target IP",
    tableHeaderService: "Vuln Service",
    tableHeaderStatus: "Payload",
    tableHeaderRisk: "Privilege"
  },
  console: {
    user: "root@blackrat-c2:~",
    command1: "connect --secure --mode=stealth",
    output1: "> Initializing attack protocols...\n> Loading graphics engine...\n> Connection established via TOR exit node [192.168.X.X].",
    command2: "list_payloads --available",
    output2: "> fetching database... done.\n> 3 premium entries found ready for injection.",
    warning: "WARNING: OpSec protocols active. All traffic is routed through encrypted chains. Unauthorized access is impossible."
  },
  legal: {
    title: "OPERATIONAL SECURITY WARNING",
    // Treated as JSON array string for editing
    itemsJson: JSON.stringify([
      "WARNING: You are accessing a restricted Command & Control server.",
      "All activity is logged to encrypted offshore servers.",
      "Ensure your VPN kill-switch is ACTIVE before executing payloads.",
      "Payments for premium tools accepted in XMR (Monero) only for anonymity.",
      "Do not deploy exploits on unauthorized infrastructure. Stay within the scope."
    ], null, 2)
  },
  footer: {
    copyright: "© 2018 BLACKRAT XploitZ – C2 ARCHITECTURE V4.",
    linkPrivacy: "Data Policy",
    linkTerms: "TOS",
    linkEthical: "DarkNet Status"
  }
};

type ContentType = typeof defaultContent;

interface ContentContextType {
  content: ContentType;
  updateSection: (section: keyof ContentType, newSectionData: any) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [content, setContent] = useState<ContentType>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('blackrat_content_real_v1');
        if (saved) {
          // Shallow merge to ensure structure consistency if defaults update
          const parsed = JSON.parse(saved);
          return { ...defaultContent, ...parsed };
        }
      } catch (e) {
        console.error("Failed to load content from local storage", e);
      }
    }
    return defaultContent;
  });

  const updateSection = (section: keyof ContentType, newSectionData: any) => {
    setContent(prev => {
      const newState = {
        ...prev,
        [section]: {
          ...prev[section],
          ...newSectionData
        }
      };
      // Save to localStorage whenever state updates
      localStorage.setItem('blackrat_content_real_v1', JSON.stringify(newState));
      return newState;
    });
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem('blackrat_content_real_v1');
  };

  return (
    <ContentContext.Provider value={{ content, updateSection, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};