# Jaffna Travel Guide 🌴

A full WebGIS travel guide for Jaffna, Northern Sri Lanka.  
Built with plain HTML, CSS, and JavaScript — no build tools required.

## Project Structure

```
jaffna-travel-guide/
├── index.html          ← Main HTML page
├── css/
│   ├── style.css       ← Main stylesheet (layout, cards, hero, tips)
│   └── map.css         ← WebGIS map styles (Leaflet overrides, sidebar)
├── js/
│   ├── places.js       ← All 11 place data with coordinates
│   ├── map.js          ← Leaflet WebGIS map logic
│   └── main.js         ← UI interactions (filter, scroll, nav)
└── README.md
```

## Features

- **11 places** with descriptions, hours, and Google Maps links
- **Category filters** — Temples, Historic, Beaches, Food, Culture
- **Interactive WebGIS map** using Leaflet.js + OpenStreetMap
- **4 map tile layers** — OpenStreetMap, Topographic, Satellite, Dark
- **Marker clustering** for overlapping locations
- **Custom popups** with place info and Google Maps link
- **Map sidebar** with filter and place list
- **Card → Map sync**: click 📍 on any card to fly to that marker
- **Planning tips** section
- Fully **responsive** (mobile-friendly)
- **No build tools** — just open index.html in a browser

## Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Set **Output Directory** to `.` (dot)
5. Click **Deploy**

## Technologies

| Library | Version | Purpose |
|---------|---------|---------|
| Leaflet.js | 1.9.4 | WebGIS interactive map |
| Leaflet.MarkerCluster | 1.5.3 | Marker clustering |
| OpenStreetMap | — | Default map tiles |
| Stadia Maps | — | Dark mode tiles |
| Esri World Imagery | — | Satellite tiles |
| OpenTopoMap | — | Topographic tiles |
| Playfair Display | Google Fonts | Display typography |
| DM Sans | Google Fonts | Body typography |

## Map Data

All coordinates are from Google Maps / OpenStreetMap for verified locations in Jaffna District, Northern Province, Sri Lanka.

---

*Jaffna Travel Guide — Northern Sri Lanka*
