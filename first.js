async function searchTemples() {
    const input = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsDiv = document.getElementById('results');
    
    // Clear previous results
    resultsDiv.innerHTML = "Searching...";

    try {
        // 1. Fetch the JSON file
        const response = await fetch('temple.json');
        const geoData = await response.json();

        // 2. Algorithm: Linear Search through the FeatureCollection
        const matches = geoData.features.filter(feature => {
            const name = feature.properties.name || "";
            return name.toLowerCase().includes(input);
        });

        // 3. Print the Answer to the browser
        if (matches.length > 0) {
            let htmlContent = `<h3>Found ${matches.length} Result(s):</h3><ul>`;
            
            matches.forEach(match => {
                const name = match.properties.name;
                const lat = match.geometry.coordinates[1];
                const lon = match.geometry.coordinates[0];
                
                htmlContent += `<li>
                    <strong>${name}</strong><br>
                    Coordinates: ${lat}, ${lon}
                </li><br>`;
            });
            
            htmlContent += "</ul>";
            resultsDiv.innerHTML = htmlContent;
        } else {
            resultsDiv.innerHTML = "<p>No temples found with that name.</p>";
        }

    } catch (error) {
        resultsDiv.innerHTML = "<p>Error loading temple.json. Make sure you are using a local server.</p>";
        console.error("Error:", error);
    }
}