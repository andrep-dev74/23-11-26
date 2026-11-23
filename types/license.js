class License {
  constructor(data) {
    this.id = data.id;
    this.software = data.software;
    this.version = data.version;
    this.price = data.price;
    this.key = data.key;
    this.featured = data.featured;
    this.discount = data.discount;
  }

  Render(parent) {
    const card = document.createElement("article");
    card.className = "product";

    const finalPrice = this.price * (1 - this.discount / 100);

    card.innerHTML = `
      <h3>${this.software}</h3>
      <p>Versión: ${this.version}</p>
      <p>Precio: €${finalPrice.toFixed(2)}</p>
      <p>Descuento: ${this.discount}%</p>
    `;

    const button = document.createElement("button");
    button.textContent = "Comprar";
    button.addEventListener("click", () => this.Buy());
    card.appendChild(button);
    parent.appendChild(card);
  }

  Buy() {
    alert(`Clave de ejemplo para ${this.software} ${this.version}:\n${this.key}`);
  }
}
