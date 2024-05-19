document.addEventListener("DOMContentLoaded", function() {
    const API_URL = "https://api.unsplash.com/search/photos";
    const ACCESS_KEY = "o0_z4c347UGWtvQeL0NNPQ-4C4kORm20A-JSaeEaIYA";

    const searchInput = document.getElementById("search-input");
    const clearBtn = document.getElementById("clear-btn");
    const gallery = document.getElementById("gallery");

    async function fetchImages(query) {
        const response = await fetch(`${API_URL}?query=${query}&client_id=${ACCESS_KEY}`);
        const data = await response.json();
        displayImages(data.results);
    }

    function displayImages(images) {
        gallery.innerHTML = "";
        images.forEach(image => {
            const imgContainer = document.createElement("div");
            imgContainer.className = "img-container";

            const imgElement = document.createElement("img");
            imgElement.src = image.urls.small;
            imgElement.alt = image.alt_description;

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = image.alt_description || "No description available";
            descriptionElement.className = "img-description";

            imgContainer.appendChild(imgElement);
            imgContainer.appendChild(descriptionElement);
            gallery.appendChild(imgContainer);
        });
    }

    searchInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            fetchImages(searchInput.value);
        }
    });

    clearBtn.addEventListener("click", function() {
        searchInput.value = "";
        gallery.innerHTML = "";
        searchInput.placeholder = "Search for images...";
    });

    fetchImages("nature");
});
