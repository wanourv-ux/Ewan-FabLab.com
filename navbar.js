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

    /* ── THEME ── */
    const desktopToggle = this.querySelector("#desktop-theme-toggle");
    const mobileToggle  = this.querySelector("#mobile-theme-toggle");
    const mobileLabel   = this.querySelector("#mobile-theme-label");
    const themeLink     = document.getElementById("theme-style");

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    // "theme-manual" indique que l'utilisateur a choisi explicitement
    const manualTheme = localStorage.getItem("theme-manual");
    const initialTheme = manualTheme
      ? manualTheme
      : (prefersDark.matches ? "style.css" : "style-light.css");

    function applyTheme(theme, isManual = false) {
      themeLink.href = theme;
      if (isManual) {
        localStorage.setItem("theme-manual", theme);
      }
      const isLight = theme.includes("style-light");
      desktopToggle.classList.toggle("is-light", isLight);
      mobileToggle.classList.toggle("is-light", isLight);
      mobileLabel.textContent = isLight ? "Mode clair" : "Mode sombre";
    }

    applyTheme(initialTheme);

    // Réagir aux changements de thème système en temps réel
    // (uniquement si l'utilisateur n'a pas choisi manuellement)
    prefersDark.addEventListener("change", (e) => {
      if (!localStorage.getItem("theme-manual")) {
        applyTheme(e.matches ? "style.css" : "style-light.css");
      }
    });

    [desktopToggle, mobileToggle].forEach(btn => {
      btn.addEventListener("click", () => {
        const isLight = themeLink.href.includes("style-light");
        applyTheme(isLight ? "style.css" : "style-light.css", true);
      });
    });

    /* ── HAMBURGER ── */
    const hamburger = this.querySelector("#hamburger");
    const navLinks  = this.querySelector("#nav-links");

    hamburger.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen);
    });

    // Fermer le menu si on clique sur un lien
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }
}

customElements.define("nav-bar", NavBar);