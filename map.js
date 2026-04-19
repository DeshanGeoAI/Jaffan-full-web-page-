/* ============================================
   JAFFNA TRAVEL GUIDE — map.js
   WebGIS interactive map using Leaflet.js
   ============================================ */

(function () {
  "use strict";

  /* ---- Tile layer definitions ---- */
  const TILE_LAYERS = {
    osm: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    topo: {
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
    },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
    },
    dark: {
      url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
  };

  /* ---- State ---- */
  let map = null;
  let markers = {};
  let clusterGroup = null;
  let currentTileLayer = null;
  let activeMarkerId = null;
  let sidebarFilter = "all";

  /* ---- Init map ---- */
  function initMap() {
    const container = document.getElementById("map-container");
    if (!container) return;

    map = L.map("map-container", {
      center: [9.68, 79.95],
      zoom: 10,
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true
    });

    // Place zoom control bottom-right
    map.zoomControl.setPosition("bottomright");

    // Set initial tile layer
    setTileLayer("osm");

    // Create marker cluster group
    clusterGroup = L.markerClusterGroup({
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true
    });

    // Add all markers
    PLACES.forEach(place => addMarker(place));

    map.addLayer(clusterGroup);

    // Fit map to all markers
    fitMapToMarkers();

    // Build sidebar
    buildSidebar();

    // Layer switcher
    setupLayerControl();

    // Card pin buttons
    setupCardPins();
  }

  /* ---- Tile layer switcher ---- */
  function setTileLayer(key) {
    if (currentTileLayer) {
      map.removeLayer(currentTileLayer);
    }
    const def = TILE_LAYERS[key] || TILE_LAYERS.osm;
    currentTileLayer = L.tileLayer(def.url, {
      attribution: def.attribution,
      maxZoom: 19
    });
    currentTileLayer.addTo(map);
  }

  /* ---- Create a custom marker icon ---- */
  function createIcon(place) {
    const color = CAT_COLORS[place.category] || "#C9A84C";
    const html = `
      <div style="
        width:32px;height:32px;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        background:${color};
        border:2.5px solid rgba(255,253,248,0.9);
        box-shadow:0 3px 12px rgba(0,0,0,0.45);
        display:flex;align-items:center;justify-content:center;
      ">
        <span style="transform:rotate(45deg);font-size:13px;">${place.icon}</span>
      </div>`;

    return L.divIcon({
      className: "",
      html: html,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -36]
    });
  }

  /* ---- Add a marker for a place ---- */
  function addMarker(place) {
    const icon = createIcon(place);
    const marker = L.marker([place.lat, place.lng], { icon });

    marker.bindPopup(buildPopupHtml(place), {
      maxWidth: 260,
      minWidth: 220,
      className: "jaffna-popup"
    });

    marker.on("click", () => {
      activateSidebarItem(place.id);
    });

    marker.on("popupopen", () => {
      activateSidebarItem(place.id);
    });

    markers[place.id] = marker;
    clusterGroup.addLayer(marker);
  }

  /* ---- Build popup HTML ---- */
  function buildPopupHtml(place) {
    const color = CAT_COLORS[place.category] || "#C9A84C";
    const tagsHtml = place.tags
      .map(t => `<span class="map-popup-tag">${t}</span>`)
      .join("");

    return `
      <div>
        <div class="map-popup-title">${place.name}</div>
        <div class="map-popup-cat" style="color:${color};">${place.location}</div>
        <div class="map-popup-desc">${place.desc}</div>
        <div class="map-popup-tags">${tagsHtml}</div>
        <a class="map-popup-link" href="${place.mapsUrl}" target="_blank" rel="noopener">↗ Open in Google Maps</a>
      </div>`;
  }

  /* ---- Fit map to visible markers ---- */
  function fitMapToMarkers(filter) {
    const toFit = PLACES.filter(p => !filter || filter === "all" || p.category === filter);
    if (toFit.length === 0) return;

    const bounds = L.latLngBounds(toFit.map(p => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }

  /* ---- Build sidebar list ---- */
  function buildSidebar(filter) {
    const list = document.getElementById("sidebar-list");
    const count = document.getElementById("sidebar-count");
    if (!list) return;

    const filtered = PLACES.filter(p => !filter || filter === "all" || p.category === filter);

    count.textContent = filtered.length;
    list.innerHTML = "";

    filtered.forEach(place => {
      const color = CAT_COLORS[place.category] || "#C9A84C";
      const item = document.createElement("div");
      item.className = "sidebar-item";
      item.dataset.id = place.id;
      item.innerHTML = `
        <div class="si-dot" style="background:${color};"></div>
        <span class="si-name">${place.name}</span>
        <span class="si-dist">${place.distance}</span>`;

      item.addEventListener("click", () => {
        flyToMarker(place.id);
      });

      list.appendChild(item);
    });
  }

  /* ---- Fly to a marker and open popup ---- */
  function flyToMarker(id) {
    const place = PLACES.find(p => p.id === id);
    const marker = markers[id];
    if (!place || !marker) return;

    // Unspiderfy / expand clusters first
    clusterGroup.zoomToShowLayer(marker, () => {
      map.flyTo([place.lat, place.lng], 14, { animate: true, duration: 1.2 });
      setTimeout(() => marker.openPopup(), 900);
    });

    activateSidebarItem(id);

    // Scroll map section into view
    const mapSection = document.getElementById("map");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ---- Activate sidebar item ---- */
  function activateSidebarItem(id) {
    activeMarkerId = id;
    document.querySelectorAll(".sidebar-item").forEach(el => {
      el.classList.toggle("active", parseInt(el.dataset.id) === id);
    });

    // Scroll into view in sidebar
    const activeEl = document.querySelector(`.sidebar-item[data-id="${id}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  /* ---- Sidebar filter buttons ---- */
  function setupSidebarFilters() {
    document.querySelectorAll(".sf-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".sf-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        sidebarFilter = btn.dataset.filter;
        buildSidebar(sidebarFilter);
        filterMapMarkers(sidebarFilter);
        fitMapToMarkers(sidebarFilter);
      });
    });
  }

  /* ---- Filter map markers by category ---- */
  function filterMapMarkers(filter) {
    clusterGroup.clearLayers();
    PLACES.forEach(place => {
      if (filter === "all" || place.category === filter) {
        clusterGroup.addLayer(markers[place.id]);
      }
    });
  }

  /* ---- Layer control radio buttons ---- */
  function setupLayerControl() {
    document.querySelectorAll('.layer-control input[name="layer"]').forEach(radio => {
      radio.addEventListener("change", () => {
        if (radio.checked) setTileLayer(radio.value);
      });
    });
  }

  /* ---- Card "pin" buttons (show on map) ---- */
  function setupCardPins() {
    document.querySelectorAll(".card-map-pin").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id);
        flyToMarker(id);
      });
    });
  }

  /* ---- Public API ---- */
  window.jaffnaMap = {
    flyTo: flyToMarker,
    filter: (cat) => {
      filterMapMarkers(cat);
      buildSidebar(cat);
      fitMapToMarkers(cat);
    }
  };

  /* ---- Boot when DOM ready ---- */
  document.addEventListener("DOMContentLoaded", () => {
    initMap();
    setupSidebarFilters();
  });

})();
