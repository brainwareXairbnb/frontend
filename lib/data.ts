export const R = "#FF385C";
export const DARK = "#222222";
export const GRAY = "#717171";
export const LT = "#DDDDDD";
export const BG = "#F7F7F7";

export const ROOMS = [
  { id: 1, title: "Cozy PG near North Gate", type: "PG", area: "Barasat", rent: 6500, rating: 4.87, reviews: 34, gender: "Boys", distance: "0.8 km", amenities: ["WiFi", "AC", "Meals", "Laundry", "CCTV"], grad: "linear-gradient(145deg,#f093fb,#f5576c)", saved: true, deposit: 13000, availFrom: "1 May 2026", beds: 4, desc: "Spacious PG accommodation just 800m from Brainware University's north gate. Meals included (breakfast + dinner). All rooms air-conditioned." },
  { id: 2, title: "Spacious Double Room", type: "Double", area: "Madhyamgram", rent: 5200, rating: 4.72, reviews: 18, gender: "Girls", distance: "1.2 km", amenities: ["WiFi", "Kitchen", "Parking"], grad: "linear-gradient(145deg,#4facfe,#00c6fb)", saved: false, deposit: 10400, availFrom: "15 Apr 2026", beds: 2, desc: "Bright and airy double room with attached kitchen access. Female-only floor for safety." },
  { id: 3, title: "Modern Flat — Fully Furnished", type: "Flat", area: "Barasat", rent: 12000, rating: 4.95, reviews: 52, gender: "Co-ed", distance: "0.5 km", amenities: ["WiFi", "AC", "Kitchen", "Parking", "Laundry", "CCTV"], grad: "linear-gradient(145deg,#43e97b,#38f9d7)", saved: true, deposit: 24000, availFrom: "1 Apr 2026", beds: 3, desc: "Premium 2BHK flat 500m from campus. Fully furnished with modular kitchen, split AC in all rooms and covered parking." },
  { id: 4, title: "Budget Single, Bills Included", type: "Single", area: "Simultala", rent: 4000, rating: 4.61, reviews: 9, gender: "Boys", distance: "1.8 km", amenities: ["WiFi", "Fan"], grad: "linear-gradient(145deg,#fa709a,#fee140)", saved: false, deposit: 8000, availFrom: "20 Apr 2026", beds: 1, desc: "Affordable single room with all utilities included. Ideal for students on a tight budget." },
  { id: 5, title: "Premium PG — Meals & AC", type: "PG", area: "Barasat", rent: 8500, rating: 4.88, reviews: 41, gender: "Girls", distance: "0.3 km", amenities: ["WiFi", "AC", "Meals", "Laundry", "CCTV", "Kitchen"], grad: "linear-gradient(145deg,#a18cd1,#fbc2eb)", saved: false, deposit: 17000, availFrom: "1 May 2026", beds: 6, desc: "Premium girls-only PG with home-cooked meals, AC rooms and 24/7 security. Walkable to campus." },
  { id: 6, title: "Dormitory — Ultra Affordable", type: "Dormitory", area: "Madhyamgram", rent: 3200, rating: 4.45, reviews: 7, gender: "Boys", distance: "2.1 km", amenities: ["WiFi", "Fan", "Kitchen"], grad: "linear-gradient(145deg,#ffecd2,#fcb69f)", saved: false, deposit: 6400, availFrom: "1 Apr 2026", beds: 8, desc: "6-bed dormitory perfect for freshers. Common kitchen and study area available." },
];

export const BOOKINGS_DATA = [
  { id: "BK-1001", room: ROOMS[0], moveIn: "1 May 2026", duration: 6, rent: 6500, status: "payment_confirmed", paid: true, txnId: "TXN-8801", payMethod: "UPI", paidOn: "2 Apr 2026" },
  { id: "BK-1002", room: ROOMS[3], moveIn: "15 Apr 2026", duration: 3, rent: 4000, status: "pending", paid: false },
  { id: "BK-1003", room: ROOMS[2], moveIn: "1 Mar 2026", duration: 12, rent: 12000, status: "completed", paid: true, txnId: "TXN-8803", payMethod: "Card", paidOn: "25 Feb 2026" },
];

export const OWNER_BOOKINGS = [
  { id: "BK-2001", student: "Rohit Saha", roll: "BU/22/CSE/041", moveIn: "1 May 2026", duration: 6, listing: "Cozy PG near North Gate", message: "Hi, I'm a 3rd year CS student. Looking for a quiet place to study.", status: "pending", date: "3 Apr 2026" },
  { id: "BK-2002", student: "Priya Nandi", roll: "BU/23/IT/018", moveIn: "15 Apr 2026", duration: 3, listing: "Cozy PG near North Gate", message: "Need a room close to campus.", status: "accepted", date: "1 Apr 2026" },
  { id: "BK-2003", student: "Arif Islam", roll: "BU/21/CSE/092", moveIn: "1 Apr 2026", duration: 12, listing: "Modern Flat — Fully Furnished", message: "I'll be paying via UPI.", status: "payment_confirmed", date: "28 Mar 2026" },
  { id: "BK-2004", student: "Tanmoy Roy", roll: "BU/24/ECE/007", moveIn: "1 Jun 2026", duration: 2, listing: "Cozy PG near North Gate", message: "Looking for short stay.", status: "rejected", date: "20 Mar 2026" },
];

export const PAYOUTS = [
  { id: "TXN-8801", listing: "Cozy PG near North Gate", student: "Rohit Saha", date: "2 Apr 2026", gross: 6500, rate: 0.05, charge: 325, net: 6175, status: "settled", method: "UPI" },
  { id: "TXN-8802", listing: "Cozy PG near North Gate", student: "Priya Nandi", date: "3 Apr 2026", gross: 6500, rate: 0.05, charge: 325, net: 6175, status: "processing", method: "Card" },
  { id: "TXN-8803", listing: "Modern Flat — Fully Furnished", student: "Arif Islam", date: "28 Mar 2026", gross: 12000, rate: 0.05, charge: 600, net: 11400, status: "settled", method: "UPI" },
  { id: "TXN-8804", listing: "Modern Flat — Fully Furnished", student: "Tanmoy Roy", date: "1 Mar 2026", gross: 12000, rate: 0.05, charge: 600, net: 11400, status: "failed", method: "NetBanking" },
];

export const ADMIN_LEDGER = [
  { id: "TXN-8801", type: "payment", student: "Rohit Saha", owner: "Rajesh Kumar", listing: "Cozy PG near North Gate", date: "2 Apr 2026", gross: 6500, charge: 325, net: 6175, pStatus: "captured", oStatus: "settled", method: "UPI" },
  { id: "TXN-8802", type: "payment", student: "Priya Nandi", owner: "Rajesh Kumar", listing: "Cozy PG near North Gate", date: "3 Apr 2026", gross: 6500, charge: 325, net: 6175, pStatus: "captured", oStatus: "processing", method: "Card" },
  { id: "TXN-8803", type: "payment", student: "Arif Islam", owner: "Anita Ghosh", listing: "Modern Flat", date: "28 Mar 2026", gross: 12000, charge: 600, net: 11400, pStatus: "captured", oStatus: "settled", method: "UPI" },
  { id: "TXN-8804", type: "refund", student: "Tanmoy Roy", owner: "Anita Ghosh", listing: "Modern Flat", date: "1 Mar 2026", gross: 12000, charge: 600, net: 11400, pStatus: "refunded", oStatus: "failed", method: "NetBanking" },
  { id: "TXN-8800", type: "payment", student: "Souvik Das", owner: "Sunita Dey", listing: "Spacious Double Room", date: "15 Mar 2026", gross: 5200, charge: 260, net: 4940, pStatus: "captured", oStatus: "settled", method: "UPI" },
];

export const PENDING_OWNERS = [
  { id: "OWN-001", name: "Rajesh Kumar", email: "rajesh.k@gmail.com", phone: "+91 98101 22334", address: "12 Canal Road, Barasat", nid: "xxxx-xxxx-4521", bank: "SBI ••••3301", date: "30 Mar 2026" },
  { id: "OWN-002", name: "Sunita Dey", email: "sunita.d@yahoo.com", phone: "+91 98202 55667", address: "7 Station Para, Madhyamgram", nid: "xxxx-xxxx-7893", bank: "HDFC ••••5512", date: "31 Mar 2026" },
];

export const PENDING_LISTINGS = [
  { id: "LST-001", title: "3BHK Near South Gate", owner: "Sunita Dey", type: "Flat", rent: 14000, area: "Barasat", submitted: "1 Apr 2026", photos: 3, status: "under_review" },
  { id: "LST-002", title: "Boys Hostel — 8 Beds", owner: "Manoj Paul", type: "Dormitory", rent: 3500, area: "Simulta", submitted: "2 Apr 2026", photos: 5, status: "submitted" },
];

export const ALL_USERS = [
  { id: "USR-001", name: "Rohit Saha", role: "student", email: "rohit.s@bwu.edu.in", phone: "+91 98100 11223", status: "active", joined: "10 Jan 2026", bookings: 3 },
  { id: "USR-002", name: "Priya Nandi", role: "student", email: "priya.n@bwu.edu.in", phone: "+91 98200 44556", status: "active", joined: "12 Jan 2026", bookings: 1 },
  { id: "USR-003", name: "Rajesh Kumar", role: "owner", email: "rajesh.k@gmail.com", phone: "+91 98101 22334", status: "active", joined: "15 Jan 2026", listings: 2 },
  { id: "USR-004", name: "Arif Islam", role: "student", email: "arif.i@bwu.edu.in", phone: "+91 80900 99001", status: "suspended", joined: "20 Jan 2026", bookings: 2 },
  { id: "USR-005", name: "Anita Ghosh", role: "owner", email: "anita.g@hotmail.com", phone: "+91 98300 77889", status: "active", joined: "5 Feb 2026", listings: 1 },
];

export const NOTIFICATIONS = [
  { id: 1, title: "Booking Accepted!", message: "Your request for 'The Scholars' Atrium' has been accepted. Please proceed to payment.", type: "booking", date: "2 mins ago", read: false },
  { id: 2, title: "Payment Confirmed", message: "Payment for BK-1001 was successful. Your room is now secured.", type: "payment", date: "1 hour ago", read: true },
  { id: 3, title: "Identity Verified", message: "Great news! Your student status has been successfully verified.", type: "system", date: "5 hours ago", read: true },
];

export const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;