async function startApp() {
  const response = await fetch("data/licenses.json");
  const data = await response.json();
  const licenses = data.map(item => new License(item));
  const controller = new LicenseController(licenses);

  controller.RenderFeatured(3, document.querySelector("#featured"));
  controller.RenderOffers(3, document.querySelector("#offers"));
  controller.RenderLatest(3, document.querySelector("#latest"));

  const filter = document.querySelector("#softwareFilter");
  const softwareNames = [...new Set(licenses.map(item => item.software))];

  softwareNames.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    filter.appendChild(option);
  });

  function renderAll() {
    controller.RenderAll(
      licenses.length,
      document.querySelector("#all"),
      filter.value
    );
  }

  filter.addEventListener("change", renderAll);
  renderAll();
}

startApp().catch(error => {
  console.error("No se pudieron cargar las licencias:", error);
});
