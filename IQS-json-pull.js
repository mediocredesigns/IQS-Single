window.Webflow ||= [];
window.Webflow.push(() => {
 
  let cmsData = document.querySelectorAll('[data-schools="info"]');
  

  let jsonData = [];
  let newZoom = 7;

  let getData = function () {
    let cmsData = document.querySelectorAll('[data-schools="info"]');
    cmsData.forEach((card) => {
      const json = JSON.parse(card.innerHTML);
      jsonData.push(json);
    });
  };

  getData();
  
  

  // Initialize the map
 
  const map = L.map('map', {
    scrollWheelZoom: false
}).setView([46.5, -94], 6);

map.on('click', function (e) {
  // Get the clicked coordinates
  var clickedLat = e.latlng.lat;
  var clickedLng = e.latlng.lng;
  
  // Set the new zoom level and center the map
  map.setView([clickedLat, clickedLng], newZoom)
  newZoom++;
});
  // Add a tile layer to the map (you can choose other tile providers)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
}).addTo(map);

    // Iterate over the JSON data and create markers on the map
jsonData.forEach(function (school) {
      if (school.lat && school.lng) {
        const marker = L.marker([school.lat, school.lng]).addTo(map);

        // Create a popup for each marker with school information
        const popupContent = `
        <h6>${school.name}</h6>

        ${
          school.website
            ? `<a href="${school.website}" target="_blank">${school.website}</a>`
            : "N/A"
        }<br>
        <br>
        <b>Phone: </b>${school.phone}<br>
        <b>Year Started:</b> ${school.year}<br>
        <b>Grades: </b>${school.levels} School<br>
        <b>Focus:</b> ${school.model}<br>

        <p></p>
        <div style="display: flex; justify-content: end;">
        <button class = "button"  onclick="window.location.href='/schools/${
          school.slug
        }'">Learn More</button>
        </div>

      `;
        marker.bindPopup(popupContent);
      }
    });
  
});
