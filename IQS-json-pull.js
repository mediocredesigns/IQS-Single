window.Webflow ||= [];
window.Webflow.push(() => {
 
  let cmsData = document.querySelectorAll('[data-schools="info"]');
  

  let jsonData = [];

  let getData = function () {
    let cmsData = document.querySelectorAll('[data-schools="info"]');
    cmsData.forEach((card) => {
      const json = JSON.parse(card.innerHTML);
      jsonData.push(json);
    });
  };

  getData();

  

  // Initialize the map
  const map = L.map("map").setView([46.5, -94], 6); // Set default center and zoom level

  // Add a tile layer to the map (you can choose other tile providers)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Iterate over the JSON data and create markers on the map
    jsonData.forEach(function (school) {
      console.log(school.lat);
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
