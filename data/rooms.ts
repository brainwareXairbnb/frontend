export interface Room {
  id: number;
  title: string;
  location: string;
  area: string;
  distanceToCampus: string;
  transportMode: 'walk' | 'bus';
  price: number;
  type: string;
  gender: 'male' | 'female' | 'coed';
  verified: boolean;
  rating: number;
  reviewCount: number;
  badge?: string;
  amenities: string[];
  description: string;
  images: string[];
  owner: {
    name: string;
    rating: number;
    responseTime: string;
  };
  deposit: number;
  adminFee: number;
  features: {
    icon: string;
    label: string;
  }[];
  reviews: {
    author: string;
    initials: string;
    institution: string;
    date: string;
    content: string;
  }[];
}

export const rooms: Room[] = [
  {
    id: 1,
    title: "The Scholars' Atrium",
    location: "Barasat Road",
    area: "Barasat, Kolkata",
    distanceToCampus: "4 mins to Campus",
    transportMode: "walk",
    price: 14500,
    type: "Luxury Double Occupancy",
    gender: "female",
    verified: true,
    rating: 4.9,
    reviewCount: 18,
    badge: "Meals Incl.",
    amenities: ["wifi", "ac", "meals", "laundry"],
    description:
      "A meticulously designed room optimized for focus and academic excellence. Featuring ergonomic workspaces and excellent connectivity to Brainware University.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=600&fit=crop",
    ],
    owner: {
      name: "Rajesh Kumar",
      rating: 4.9,
      responseTime: "2 hours",
    },
    deposit: 14500,
    adminFee: 1000,
    features: [
      { icon: "wifi", label: "Ultra-fast WiFi" },
      { icon: "ac_unit", label: "Central AC" },
      { icon: "restaurant", label: "Meals Included" },
      { icon: "local_laundry_service", label: "Laundry Room" },
    ],
    reviews: [
      {
        author: "Meera Agarwal",
        initials: "MA",
        institution: "Brainware University",
        date: "Oct 2023",
        content:
          "The perfect place for my final year. The internet is incredibly stable and the room is very quiet. The owner was very responsive.",
      },
      {
        author: "Rahul Kumar",
        initials: "RK",
        institution: "Brainware University",
        date: "Sept 2023",
        content:
          "Great location near campus. The common area is actually quiet enough to study in. Highly recommend for serious students.",
      },
    ],
  },
  {
    id: 2,
    title: "Emerald Greens Studio",
    location: "Green Park Colony",
    area: "Green Park, Kolkata",
    distanceToCampus: "10 mins shuttle",
    transportMode: "bus",
    price: 22000,
    type: "Private Studio Suite",
    gender: "coed",
    verified: false,
    rating: 4.8,
    reviewCount: 12,
    badge: "Premium Gym",
    amenities: ["wifi", "ac", "gym", "parking"],
    description:
      "A modern studio apartment perfect for students who value privacy and comfort. Includes access to a premium gym and study lounge.",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop",
    ],
    owner: {
      name: "Priya Sharma",
      rating: 4.8,
      responseTime: "1 hour",
    },
    deposit: 22000,
    adminFee: 1500,
    features: [
      { icon: "wifi", label: "High-Speed WiFi" },
      { icon: "ac_unit", label: "Air Conditioning" },
      { icon: "fitness_center", label: "Premium Gym" },
      { icon: "local_parking", label: "Parking Space" },
    ],
    reviews: [
      {
        author: "Amit Patel",
        initials: "AP",
        institution: "Brainware University",
        date: "Nov 2023",
        content:
          "The gym facilities are excellent and the studio is very well maintained. Worth the extra cost for the privacy and amenities.",
      },
      {
        author: "Sneha Das",
        initials: "SD",
        institution: "Brainware University",
        date: "Oct 2023",
        content:
          "Love the modern design and the quiet environment. The shuttle service to campus is very convenient.",
      },
    ],
  },
  {
    id: 3,
    title: "The Heritage House",
    location: "Old Campus Lane",
    area: "Old Campus Area, Kolkata",
    distanceToCampus: "12 mins to Campus",
    transportMode: "walk",
    price: 9800,
    type: "Triple Sharing",
    gender: "male",
    verified: true,
    rating: 4.7,
    reviewCount: 25,
    badge: "Popular",
    amenities: ["wifi", "meals", "study_room", "laundry"],
    description:
      "Affordable triple sharing accommodation with a focus on community living. Includes meal plans and dedicated study areas.",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=600&fit=crop",
    ],
    owner: {
      name: "Subhash Chatterjee",
      rating: 4.7,
      responseTime: "3 hours",
    },
    deposit: 9800,
    adminFee: 800,
    features: [
      { icon: "wifi", label: "WiFi Access" },
      { icon: "restaurant", label: "Meal Plans" },
      { icon: "menu_book", label: "Study Room" },
      { icon: "local_laundry_service", label: "Laundry Service" },
    ],
    reviews: [
      {
        author: "Arjun Singh",
        initials: "AS",
        institution: "Brainware University",
        date: "Dec 2023",
        content:
          "Great value for money. The food is good and my roommates are friendly. Perfect for students on a budget.",
      },
      {
        author: "Karthik Menon",
        initials: "KM",
        institution: "Brainware University",
        date: "Nov 2023",
        content:
          "The study room is a great addition. The owner is very understanding and helpful with any issues.",
      },
    ],
  },
  {
    id: 4,
    title: "North Campus Suites",
    location: "Gate 3 North",
    area: "North Campus, Kolkata",
    distanceToCampus: "2 mins to Campus",
    transportMode: "walk",
    price: 18000,
    type: "Single Executive",
    gender: "female",
    verified: true,
    rating: 4.95,
    reviewCount: 31,
    badge: "Self-contained",
    amenities: ["wifi", "ac", "kitchen", "security"],
    description:
      "Premium single room with en-suite bathroom and kitchenette. Perfect for postgraduate students seeking independence.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&h=600&fit=crop",
    ],
    owner: {
      name: "Anita Roy",
      rating: 4.95,
      responseTime: "30 mins",
    },
    deposit: 18000,
    adminFee: 1200,
    features: [
      { icon: "wifi", label: "High-Speed WiFi" },
      { icon: "ac_unit", label: "Air Conditioning" },
      { icon: "kitchen", label: "Kitchenette" },
      { icon: "security", label: "24/7 Security" },
    ],
    reviews: [
      {
        author: "Divya Krishnan",
        initials: "DK",
        institution: "Brainware University",
        date: "Jan 2024",
        content:
          "Absolutely love this place! The proximity to campus is unbeatable and having my own kitchen is a game changer.",
      },
      {
        author: "Nisha Reddy",
        initials: "NR",
        institution: "Brainware University",
        date: "Dec 2023",
        content:
          "The security arrangements are excellent. Anita is an amazing owner who truly cares about her tenants. Highly recommended!",
      },
    ],
  },
  {
    id: 5,
    title: "Modern PG near Barasat",
    location: "Barasat Station Road",
    area: "Barasat, Kolkata",
    distanceToCampus: "8 mins to Campus",
    transportMode: "walk",
    price: 7500,
    type: "Double Sharing",
    gender: "male",
    verified: true,
    rating: 4.6,
    reviewCount: 15,
    badge: "Budget Friendly",
    amenities: ["wifi", "meals", "tv_room", "laundry"],
    description:
      "Budget-friendly PG with all basic amenities. Clean rooms, good food, and a friendly community atmosphere.",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=600&fit=crop",
    ],
    owner: {
      name: "Kamal Das",
      rating: 4.6,
      responseTime: "4 hours",
    },
    deposit: 7500,
    adminFee: 500,
    features: [
      { icon: "wifi", label: "WiFi Connection" },
      { icon: "restaurant", label: "3 Meals Daily" },
      { icon: "tv", label: "Common TV Room" },
      { icon: "local_laundry_service", label: "Laundry Included" },
    ],
    reviews: [
      {
        author: "Vikram Joshi",
        initials: "VJ",
        institution: "Brainware University",
        date: "Oct 2023",
        content: "Great place for the price. The food is home-cooked and tasty. My roommate and I are very happy here.",
      },
      {
        author: "Ravi Sharma",
        initials: "RS",
        institution: "Brainware University",
        date: "Sept 2023",
        content: "Clean, affordable, and close to campus. Exactly what I needed for my first year.",
      },
    ],
  },
  {
    id: 6,
    title: "The Editorial Suites",
    location: "Salt Lake Sector 5",
    area: "Salt Lake, Kolkata",
    distanceToCampus: "15 mins shuttle",
    transportMode: "bus",
    price: 9200,
    type: "Double Sharing",
    gender: "female",
    verified: true,
    rating: 4.8,
    reviewCount: 20,
    badge: "Study Friendly",
    amenities: ["wifi", "ac", "library", "study_room"],
    description:
      "Designed specifically for serious students with dedicated study areas, library access, and quiet hours policy.",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop",
    ],
    owner: {
      name: "Dr. Malini Sen",
      rating: 4.8,
      responseTime: "1 hour",
    },
    deposit: 9200,
    adminFee: 800,
    features: [
      { icon: "wifi", label: "High-Speed WiFi" },
      { icon: "ac_unit", label: "Air Conditioning" },
      { icon: "local_library", label: "Library Access" },
      { icon: "menu_book", label: "Study Rooms" },
    ],
    reviews: [
      {
        author: "Priyanka Ghosh",
        initials: "PG",
        institution: "Brainware University",
        date: "Nov 2023",
        content:
          "The study environment here is exceptional. Dr. Sen ensures strict quiet hours which helps during exam season.",
      },
      {
        author: "Ayesha Khan",
        initials: "AK",
        institution: "Brainware University",
        date: "Oct 2023",
        content: "The library and study rooms are amazing. Perfect for someone serious about academics like me.",
      },
    ],
  },
];
