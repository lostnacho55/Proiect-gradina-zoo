document.addEventListener("DOMContentLoaded", () => {
  fetch("animals.xml")
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      displayAnimals(xml);
      setupFilters();
    })
    .catch((error) => console.error("Error loading XML:", error));
});

function displayAnimals(xml) {
  const animals = xml.getElementsByTagName("animal");
  const container = document.getElementById("animal-cards");
  container.innerHTML = "";

  for (let i = 0; i < animals.length; i++) {
    const name = animals[i].getElementsByTagName("name")[0].textContent;
    const species = animals[i].getElementsByTagName("species")[0].textContent;
    const type = animals[i].getElementsByTagName("type")[0].textContent;
    const image = animals[i].getElementsByTagName("image")[0].textContent;
    const description = animals[i].getElementsByTagName("description")[0].textContent;

    const card = document.createElement("div");
    card.classList.add("animal-card");
    card.setAttribute("data-type", type);

    card.innerHTML = `
      <img src="${image}" alt="${name}">
      <h2>${name}</h2>
      <p class="species">${species}</p>
      <p class="description">${description}</p>
    `;

    container.appendChild(card);
  }
}

function setupFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {

      filterButtons.forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      const type = btn.getAttribute("data-type");
      const animals = document.querySelectorAll(".animal-card");

      animals.forEach((card) => {
        const cardType = card.getAttribute("data-type");
        if (type === "All" || cardType === type) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}