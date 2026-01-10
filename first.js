// first.js - Saved with UTF-8 encoding
function searchTemples() {
    const userInput = document.getElementById('searchInput').value.trim();
    const resultsDiv = document.getElementById('results');

    if (!userInput) {
        resultsDiv.innerHTML = "Please enter a name.";
        return;
    }

    // Convert input to lowercase for a better match
    const query = userInput.toLowerCase();

    // Algorithm: Filter through templeData
    const matches = templeData.features.filter(f => {
        const name = (f.properties.name || "").toLowerCase();
        return name.includes(query);
    });

    // Display the Results
    if (matches.length > 0) {
        let htmlContent = `<h3>Found ${matches.length} result(s):</h3>`;
        matches.forEach(m => {
            htmlContent += `
                <div style="border-bottom: 1px solid #ccc; padding: 10px 0;">
                    <strong>${m.properties.name}</strong><br>
                    Coordinates: ${m.geometry.coordinates[1]}, ${m.geometry.coordinates[0]}
                </div>`;
        });
        resultsDiv.innerHTML = htmlContent;
    } else {
        resultsDiv.innerHTML = "No temples found matching that name.";
    }
}