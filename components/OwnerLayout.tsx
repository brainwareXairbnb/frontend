"use client";
import { R, DARK, GRAY, BG, LT } from "@/lib/data";
import { Avatar } from "@/components/ui";
import Link from "next/link";

interface OwnerLayoutProps {
  children: React.ReactNode;
  screen: string;
  setScreen: (screen: string) => void;
}

const NAV = [
  { id:"o-dashboard", label:"Dashboard", icon:"📊", href:"/owner" },
  { id:"o-listings", label:"My Listings", icon:"🏠", href:"/owner/listings" },
  { id:"o-bookings", label:"Booking Inbox", icon:"📥", href:"/owner/bookings" },
  { id:"o-payouts", label:"Payouts", icon:"💰", href:"/owner/payouts" },
];

export function OwnerLayout({ children, screen, setScreen }: OwnerLayoutProps) {
  return (
    <div style={{ display:"flex", minHeight:"calc(100vh - 56px)", background:BG }}>
      <div style={{ width:200, background:"#fff", borderRight:`1px solid ${LT}`, display:"flex", flexDirection:"column", padding:"20px 0", flexShrink:0 }}>
        <div style={{ padding:"0 16px 20px", display:"flex", alignItems:"center", gap:8 }}>
          <svg width="22" height="22" viewBox="0 0 32 32" fill={R}><path d="M16 1C10.5 1 6 6.6 6 13.4c0 4.5 2.2 8.6 5.7 11.4L16 31l4.3-6.2C23.8 22 26 17.9 26 13.4 26 6.6 21.5 1 16 1zm0 17a5 5 0 110-10 5 5 0 010 10z"/></svg>
          <span style={{ fontSize:13, fontWeight:800, color:R }}>Owner Portal</span>
        </div>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setScreen(n.id)} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 18px", background:screen===n.id?"#FFF0F2":"transparent", borderLeft:screen===n.id?`3px solid ${R}`:"3px solid transparent", border:"none", cursor:"pointer", textAlign:"left", color:screen===n.id?R:DARK, fontWeight:screen===n.id?700:400, fontSize:13, transition:"all 0.15s" }}>
            <span style={{ fontSize:18 }}>{n.icon}</span>{n.label}
          </button>
        ))}
        <div style={{ marginTop:"auto", padding:"16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px", background:"#F9FAFB", borderRadius:12 }}>
            <Avatar name="Anita Ghosh" size={34} />
            <div style={{ minWidth:0 }}>
              <p style={{ fontSize:12, fontWeight:700, color:DARK, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>Anita Ghosh</p>
              <p style={{ fontSize:11, color:GRAY, margin:0 }}>Verified owner</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"28px 32px 60px" }}>{children}</div>
    </div>
  );
}