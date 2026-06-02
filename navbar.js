class NavBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="navbar">
        <div class="navbar-container">
          <a href="index.html" class="logo">
            <img src="https://fablablannion.github.io/images/logo.png" alt="Logo FabLab" class="logo-img">
            FabLab Lannion
          </a>
          <nav class="nav-links">
            <a href="index.html">Accueil</a>
            <a href="Project.html">Projets</a>
            <a href="actualités.html">Actualités</a>
            <a href="Tarifs.html">Tarifs</a>
            <a href="https://bookstack.ouedraoknopp.bzh/" target="_blank" rel="noopener noreferrer">Wiki</a>
          </nav>
          <button id="theme-toggle" class="theme-toggle">🌙</button>
        </div>
      </header>
    `;

    const toggleBtn = this.querySelector("#theme-toggle");
    const themeLink = document.getElementById("theme-style");

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "style.css" || savedTheme === "style-light.css") {
    themeLink.href = savedTheme;
    }
    toggleBtn.textContent = themeLink.href.includes("style-light") ? "☀️" : "🌙";

    toggleBtn.addEventListener("click", () => {
      const isLight = themeLink.href.includes("style-light");
      if (isLight) {
        themeLink.href = "style.css";
        localStorage.setItem("theme", "style.css");
        toggleBtn.textContent = "🌙";
      } else {
        themeLink.href = "style-light.css";
        localStorage.setItem("theme", "style-light.css");
        toggleBtn.textContent = "☀️";
      }
    });
  }
}

customElements.define("nav-bar", NavBar);