/* ============================================
   JAFFNA TRAVEL GUIDE — places.js
   All place data with coordinates
   ============================================ */

const PLACES = [
  {
    id: 1,
    name: "Nallur Kandaswamy Kovil",
    category: "temple",
    icon: "🛕",
    location: "Nallur, Jaffna town",
    lat: 9.6749,
    lng: 80.0292,
    hours: "4:15 AM – 6:15 PM",
    tags: ["Free entry", "Hindu Temple"],
    desc: "The spiritual heart of Jaffna — a magnificent Dravidian temple dedicated to Lord Murugan with a golden gopuram visible for miles.",
    mapsUrl: "https://maps.google.com/?cid=8725085747263639830",
    distance: "Town"
  },
  {
    id: 2,
    name: "Jaffna Public Library",
    category: "culture",
    icon: "📚",
    location: "Clock Tower Road, Jaffna",
    lat: 9.6620,
    lng: 80.0120,
    hours: "Tue–Sun 8:30 AM – 6 PM",
    tags: ["Cultural Heritage", "Closed Mondays"],
    desc: "One of Asia's finest libraries and a proud symbol of Tamil heritage. Rebuilt after 1981, with stunning colonial architecture.",
    mapsUrl: "https://maps.google.com/?cid=5971132047731162572",
    distance: "Town"
  },
  {
    id: 3,
    name: "Mantri Manai",
    category: "historic",
    icon: "🏛",
    location: "Near Nallur, Jaffna",
    lat: 9.6775,
    lng: 80.0359,
    hours: "Daylight hours",
    tags: ["16th Century", "Royal History"],
    desc: "Ancient residence of King Sangiliyan's chief minister — a rare relic of Jaffna's royal past with atmospheric stone architecture.",
    mapsUrl: "https://maps.google.com/?cid=16102787576340116079",
    distance: "Town"
  },
  {
    id: 4,
    name: "Rio Ice Cream",
    category: "food",
    icon: "🍦",
    location: "AB20, Near Nallur Kovil",
    lat: 9.6737,
    lng: 80.0271,
    hours: "Daily 9 AM – 10 PM",
    tags: ["Budget-friendly", "Must Try"],
    desc: "A Jaffna institution. Famous for the Rio Special, 5-flavour Jumbo, and handmade coconut fudge.",
    mapsUrl: "https://maps.google.com/?cid=14106688823294126549",
    distance: "Town"
  },
  {
    id: 5,
    name: "Jaffna Fort",
    category: "historic",
    icon: "🏰",
    location: "Lagoon waterfront, Jaffna",
    lat: 9.6620,
    lng: 80.0084,
    hours: "Open daily",
    tags: ["17th Century", "Dutch Colonial"],
    desc: "A vast Dutch colonial fortification overlooking the Jaffna lagoon. Historic ramparts, old church, and sweeping water views.",
    mapsUrl: "https://maps.google.com/?cid=5769874437375921123",
    distance: "Town"
  },
  {
    id: 6,
    name: "Keerimalai Sacred Spring",
    category: "beach",
    icon: "🌊",
    location: "Kankesanthurai, ~15 km north",
    lat: 9.8149,
    lng: 80.0112,
    hours: "8 AM – 7 PM daily",
    tags: ["Sunset Spot", "Sacred Spring"],
    desc: "Freshwater spring flowing metres from the sea. Sacred to Hindus, perfect for sunset watching. Separate pools for men and women.",
    mapsUrl: "https://maps.google.com/?cid=13788852716297512244",
    distance: "~15 km"
  },
  {
    id: 7,
    name: "Nagadeepa Temple",
    category: "temple",
    icon: "☸️",
    location: "Nainativu Island",
    lat: 9.6127,
    lng: 79.7741,
    hours: "9 AM – 4:30 PM",
    tags: ["Boat Required", "Buddhist Shrine"],
    desc: "One of Sri Lanka's most revered Buddhist shrines, marking Lord Buddha's second recorded visit to the island.",
    mapsUrl: "https://maps.google.com/?cid=10540681799070112099",
    distance: "~40 km + boat"
  },
  {
    id: 8,
    name: "Nainativu Nagapooshani Amman Kovil",
    category: "temple",
    icon: "🛕",
    location: "Nainativu Island",
    lat: 9.6190,
    lng: 79.7749,
    hours: "6 AM – 6 PM",
    tags: ["Boat Required", "Free Lunch 1 PM"],
    desc: "Ornate Hindu temple dedicated to Goddess Nagapooshani. Free vegetarian meals offered around 1 PM daily.",
    mapsUrl: "https://maps.google.com/?cid=7374345576813771355",
    distance: "~40 km + boat"
  },
  {
    id: 9,
    name: "Casuarina Beach",
    category: "beach",
    icon: "🏖",
    location: "Karainagar, ~25 km",
    lat: 9.7622,
    lng: 79.8851,
    hours: "Open daily",
    tags: ["Family-friendly", "Crystal Clear Water"],
    desc: "Jaffna's most popular beach — shallow crystal-clear water shaded by casuarina trees. Calm and safe year-round.",
    mapsUrl: "https://maps.google.com/?cid=6016469970571072990",
    distance: "~25 km"
  },
  {
    id: 10,
    name: "Point Pedro",
    category: "historic",
    icon: "🧭",
    location: "Northernmost tip of Sri Lanka",
    lat: 9.7938,
    lng: 80.2210,
    hours: "Open daily",
    tags: ["Northernmost Point", "Lighthouse"],
    desc: "Stand at the very top of Sri Lanka. A lighthouse, fishing village, and the open sea stretching toward India.",
    mapsUrl: "https://maps.google.com/?cid=10362310834299793786",
    distance: "~40 km"
  },
  {
    id: 11,
    name: "Dambakola Patuna Viharaya",
    category: "temple",
    icon: "☸️",
    location: "Northwest coast",
    lat: 9.7865,
    lng: 79.9436,
    hours: "9 AM – 6 PM",
    tags: ["3rd Century BCE", "Sacred Coast"],
    desc: "Sacred landing site where Sanghamitta Thero arrived from India with the Bo tree sapling. Serene coral beach behind the temple.",
    mapsUrl: "https://maps.google.com/?cid=2120704512531891564",
    distance: "~35 km"
  }
];

/* Category colour map (reused in map markers & sidebar dots) */
const CAT_COLORS = {
  temple:  "#8B5CF6",
  historic:"#DC6B2F",
  beach:   "#0891B2",
  food:    "#D97706",
  culture: "#1D4ED8"
};
