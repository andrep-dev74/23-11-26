class LicenseController {
  constructor(licenses) {
    this.licenses = licenses;
  }

  RenderFeatured(count, parent) {
    const items = this.licenses.filter(item => item.featured);
    this.RenderItems(items.slice(0, count), parent);
  }

  RenderOffers(count, parent) {
    const items = this.licenses
      .filter(item => item.discount > 0)
      .sort((a, b) => b.discount - a.discount);
    this.RenderItems(items.slice(0, count), parent);
  }

  RenderLatest(count, parent) {
    const latestBySoftware = new Map();

    this.licenses.forEach(item => {
      const current = latestBySoftware.get(item.software);
      if (!current || Number(item.version) > Number(current.version)) {
        latestBySoftware.set(item.software, item);
      }
    });

    this.RenderItems([...latestBySoftware.values()].slice(0, count), parent);
  }

  RenderAll(count, parent, software = "") {
    let items = [...this.licenses];

    if (software) {
      items = items.filter(item => item.software === software);
    }

    items.sort(() => Math.random() - 0.5);
    this.RenderItems(items.slice(0, count), parent);
  }

  RenderItems(items, parent) {
    parent.replaceChildren();
    items.forEach(item => item.Render(parent));
  }
}
