"use client";
import { R, DARK, GRAY } from "@/lib/data";
import { StatusBadgeProps, ChipProps, AvatarProps, StarsProps } from "@/lib/types";

const STATUS_MAP: Record<string, { bg: string; c: string; l: string }> = {
  pending:           { bg:"#FEF3C7", c:"#92400E", l:"Pending" },
  accepted:          { bg:"#DBEAFE", c:"#1D4ED8", l:"Accepted" },
  payment_confirmed: { bg:"#D1FAE5", c:"#065F46", l:"Confirmed ✓" },
  rejected:          { bg:"#FEE2E2", c:"#B91C1C", l:"Rejected" },
  completed:         { bg:"#F3F4F6", c:"#374151", l:"Completed" },
  cancelled:         { bg:"#F9FAFB", c:"#9CA3AF", l:"Cancelled" },
  settled:           { bg:"#D1FAE5", c:"#065F46", l:"Settled" },
  processing:        { bg:"#DBEAFE", c:"#1D4ED8", l:"Processing" },
  failed:            { bg:"#FEE2E2", c:"#B91C1C", l:"Failed" },
  on_hold:           { bg:"#F3F4F6", c:"#374151", l:"On Hold" },
  active:            { bg:"#D1FAE5", c:"#065F46", l:"Active" },
  suspended:         { bg:"#FEE2E2", c:"#B91C1C", l:"Suspended" },
  banned:            { bg:"#FEE2E2", c:"#7F1D1D", l:"Banned" },
  captured:          { bg:"#D1FAE5", c:"#065F46", l:"Captured" },
  refunded:          { bg:"#FEE2E2", c:"#B91C1C", l:"Refunded" },
  approved:          { bg:"#D1FAE5", c:"#065F46", l:"Approved" },
  under_review:      { bg:"#FEF3C7", c:"#92400E", l:"Under Review" },
  submitted:         { bg:"#DBEAFE", c:"#1D4ED8", l:"Submitted" },
};

export function StatusBadge({ s }: StatusBadgeProps) {
  const m = STATUS_MAP[s] || { bg:"#F3F4F6", c:GRAY, l:s };
  return (
    <span style={{ background:m.bg, color:m.c, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, whiteSpace:"nowrap" }}>{m.l}</span>
  );
}

export function Chip({ label, bg="#F7F7F7", color=GRAY, border="none" }: ChipProps) {
  return (
    <span style={{ background:bg, color, fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20, border, whiteSpace:"nowrap" }}>{label}</span>
  );
}

export function Avatar({ name, size=36 }: AvatarProps) {
  const i = name.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
  const cols = ["#FF385C","#3B82F6","#8B5CF6","#10B981","#F59E0B","#EC4899"];
  const c = cols[name.charCodeAt(0) % cols.length];
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:`${c}22`, border:`1.5px solid ${c}55`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.35, fontWeight:700, color:c, flexShrink:0 }}>{i}</div>
  );
}

export function Stars({ v, size=12 }: StarsProps) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3 }}>
      <svg width={size} height={size} viewBox="0 0 12 12" fill={DARK}><path d="M6 .5l1.5 3.1 3.4.5-2.45 2.4.58 3.4L6 8.25l-3.03 1.65.58-3.4L1.1 4.1l3.4-.5z"/></svg>
      <span style={{ fontSize:size+1, fontWeight:600, color:DARK }}>{v}</span>
    </span>
  );
}