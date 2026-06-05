/* =========================================================
   NAVBAR — thème persistant entre les pages via localStorage
   Priorité : localStorage > prefers-color-scheme
========================================================= */

(function () {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));
})();

class NavBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="navbar">
        <div class="navbar-container">
          <a href="index.html" class="logo">
            <img src="https://fablablannion.github.io/images/logo.png" alt="Logo FabLab" class="logo-img">
            FabLab Lannion
          </a>

          <nav class="nav-links" id="nav-links">
            <a href="index.html">Accueil</a>
            <a href="Project.html">Projets</a>
            <a href="actualités.html">Actualités</a>
            <a href="Tarifs.html">Tarifs</a>
            <a href="Bénévoles.html">Bénévoles</a>
            <a href="https://bookstack.ouedraoknopp.bzh/" target="_blank" rel="noopener noreferrer">Wiki</a>
            <div class="nav-theme-row" id="mobile-theme-row">
              <span class="nav-theme-label" id="mobile-theme-label">Mode sombre</span>
              <button id="mobile-theme-toggle" class="pill-switch" aria-label="Changer de thème">
                <span class="pill-track">
                  <span class="pill-thumb">
                    <span class="pill-icon"></span>
                  </span>
                </span>
              </button>
            </div>
          </nav>

          <div class="navbar-right">
            <button id="desktop-theme-toggle" class="pill-switch" aria-label="Changer de thème">
              <span class="pill-track">
                <span class="pill-thumb">
                  <span class="pill-icon"></span>
                </span>
              </span>
            </button>

            <button class="hamburger" id="hamburger" aria-expanded="false" aria-label="Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
    `;

    const html    = document.documentElement;
    const label   = this.querySelector("#mobile-theme-label");
    const toggles = [
      this.querySelector("#desktop-theme-toggle"),
      this.querySelector("#mobile-theme-toggle"),
    ];

    const isDark = () => html.getAttribute("data-theme") === "dark";

    const syncUI = () => {
      const dark = isDark();
      toggles.forEach(btn => btn.classList.toggle("is-light", !dark));
      if (label) label.textContent = dark ? "Mode sombre" : "Mode clair";
    };

    syncUI();

    toggles.forEach(btn => {
      btn.addEventListener("click", () => {
        const next = isDark() ? "light" : "dark";
        html.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        syncUI();
      });
    });

    /* HAMBURGER */
    const hamburger = this.querySelector("#hamburger");
    const navLinks  = this.querySelector("#nav-links");

    hamburger.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }
}

customElements.define("nav-bar", NavBar);