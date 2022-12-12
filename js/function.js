// Fonction Menu Version Mobile
function openMenu() {
  document.getElementById("menu_mobile").style.transform = "translate(0,0)";
}
function closeMenu() {
  document.getElementById("menu_mobile").style.transform = "translate(-100%,0)";
}

// Fonction Scroll To Top
function scroolTo(dist) {
  window.scrollTo({
    top: dist,
    left: 0,
    behavior: "smooth",
  });
}

function updateDataScroll() {
  let scroll = window.scrollY;
  if (
    scroll >= (12 * window.innerWidth) / 100 &&
    scroll <
      document.documentElement.scrollHeight -
        document.body.offsetHeight -
        document.getElementsByTagName("footer")[
          document.getElementsByTagName("footer").length - 1
        ].offsetHeight &&
    document.getElementById("scroll_top").style.display != "flex"
  ) {
    document.getElementById("scroll_top").style.display = "flex";
  } else if (
    (scroll < (12 * window.innerWidth) / 100 ||
      scroll >
        document.documentElement.scrollHeight -
          document.body.offsetHeight -
          document.getElementsByTagName("footer")[
            document.getElementsByTagName("footer").length - 1
          ].offsetHeight) &&
    document.getElementById("scroll_top").style.display === "flex"
  ) {
    document.getElementById("scroll_top").style.display = "none";
  }
}

// Fonction Onglet
function switchOnglet(id, cmd) {
  if (cmd === 0) {
    if (id === "onglet1") {
      if (document.getElementById(id)) {
        document.getElementById(id).style.backgroundColor =
          "rgba(57, 58, 59, 1)";
        document.getElementById("onglet2").style.backgroundColor =
          "transparent";
        createItemExpo("tempo");
      }
    } else if (id === "onglet2") {
      if (document.getElementById(id)) {
        document.getElementById(id).style.backgroundColor =
          "rgba(57, 58, 59, 1)";
        document.getElementById("onglet1").style.backgroundColor =
          "transparent";
        createItemExpo("perm");
      }
    }
  } else if (cmd === 1) {
    if (id === "onglet1") {
      localStorage.setItem(
        "ongletId",
        JSON.stringify(["onglet1", "onglet2", "tempo"])
      );
      window.location.href = "routes/decouvrir.html";
    } else if (id === "onglet2") {
      console.log(id);
      localStorage.setItem(
        "ongletId",
        JSON.stringify(["onglet2", "onglet1", "perm"])
      );
      window.location.href = "routes/decouvrir.html";
    }
  } else if (cmd === 2) {
    if (localStorage.getItem("ongletId")) {
      let data = JSON.parse(localStorage.getItem("ongletId"));
      document.getElementById(data[0]).style.backgroundColor =
        "rgba(57, 58, 59, 1)";
      document.getElementById(data[1]).style.backgroundColor = "transparent";
      createItemExpo(data[2]);
    }
  }
}

// Fonction Exposition Items
function createItemExpo(expo) {
  let html = "";
  scroolTo(0);
  document.getElementById("containExpo").innerHTML = "";

  if (expo === "tempo") {
    _.orderBy(
      expoTempo,
      [
        (item) => item.year,
        (item) => item.month,
        (item) =>
          item.date
            .replace(/[áàãâä]/gi, "a")
            .replace(/[éè¨ê]/gi, "e")
            .replace(/[íìïî]/gi, "i")
            .replace(/[óòöôõ]/gi, "o")
            .replace(/[úùüû]/gi, "u")
            .replace(/[ç]/gi, "c")
            .replace(/[ñ]/gi, "n")
            .replace(/[^a-zA-Z0-9]/g, " "),
      ],
      ["asc"]
    ).map((item) => {
      html += `
    <div class="shadow">
        <article class="item">
          <img
            src="../img/${item.img}"
            alt="${item.name}"
          />
          <section class="info">
            <h1>${item.date} ${item.time}</h1>
            <h2>${item.name}</h2>
            <h3>${item.author}</h3>
          </section>
        </article>
      </div>`;
    });
  } else if (expo === "perm") {
    _.orderBy(
      expoPerm,
      [
        (item) =>
          item.name
            .replace(/[áàãâä]/gi, "a")
            .replace(/[éè¨ê]/gi, "e")
            .replace(/[íìïî]/gi, "i")
            .replace(/[óòöôõ]/gi, "o")
            .replace(/[úùüû]/gi, "u")
            .replace(/[ç]/gi, "c")
            .replace(/[ñ]/gi, "n")
            .replace(/[^a-zA-Z0-9]/g, " "),
      ],
      ["asc"]
    ).map((item) => {
      html += `
      <div class="shadow">
        <div class="item">
          <img
            src="../img/${item.img}"
            alt="Illustration de l'exposition ${item.name}"
          />
          <div class="info">
            <h1>${item.date} ${item.time}</h1>
            <h2>${item.name}</h2>
            <h3>${item.author}</h3>
          </div>
        </div>
      </div>`;
    });
  }
  document.getElementById("containExpo").innerHTML = html;
}

// Injection Header
function injectionHeader(onglet) {
  return (document.getElementsByTagName("header")[0].innerHTML = ` 
       <!-- Barre de Navigation -->
        <nav class="box-nav">
          <!-- Bouton Menu Mobile -->
          <button class="menu" onclick="openMenu()">
            <svg
              width="2.8rem"
              height="2.5rem"
              viewBox="0 0 28 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M28 10.7299H0V13.737H28V10.7299Z" />
              <path d="M28 0.2052H0V3.21226H28V0.2052Z" />
              <path d="M28 21.2546H0V24.2617H28V21.2546Z" />
            </svg>
          </button>
          <!-- /Bouton Menu Mobile -->
          <!-- Logo -->
          <a href="${onglet != "index" ? "../" : ""}index.html"
            ><img
              class="desktops"
              src="${onglet != "index" ? "../" : "./"}img/logo.png"
              alt="logo du musée IRL"
            />
            <img class="mobile" src="${
              onglet != "index" ? "../" : "./"
            }img/logo2.png" alt="logo du musée IRL" />
          </a>
          <!-- /Logo -->
          <!-- Box Onglet Page -->
          <div class="box-link">
            <a
            style="color: ${onglet === "decouvrir" ? "#393a3b" : ""}"
              href="${onglet != "index" ? "./" : "./routes/"}decouvrir.html"
              onclick="switchOnglet('onglet1', 1)"
              >Découvrir</a
            >
            <a style="color: ${onglet === "info" ? "#393a3b" : ""}" href="${
    onglet != "index" ? "./" : "./routes/"
  }info.html">Infos pratiques</a>
            <a style="color: ${onglet === "propos" ? "#393a3b" : ""}" href="${
    onglet != "index" ? "./" : "./routes/"
  }propos.html">A propos du musée IRL</a>
          </div>
          <!-- /Box Onglet Page -->
        </nav>
        <!-- /Barre de Navigation  -->
        <!-- Menu Mobile -->
        <div id="menu_mobile" class="contain-menu">
          <nav class="box-nav">
            <!-- Bouton Close Menu -->
            <button class="menu" onclick="closeMenu()">
              <svg
                width="2.4rem"
                height="2.4rem"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 2.52989L21.4701 0L12 9.47011L2.52989 0L0 2.52989L9.47011 12L0 21.4701L2.52989 24L12 14.5299L21.4701 24L24 21.4701L14.5299 12L24 2.52989Z"
                  fill="#0A0A0A"
                />
              </svg>
            </button>
            <!-- /Bouton Close Menu -->
            <!-- Logo  -->
            <a href="${onglet != "index" ? "../" : ""}index.html">
              <img
                class="mobile"
                src="${onglet != "index" ? "../" : "./"}img/logo2.png"
                alt="logo du musée IRL"
              />
            </a>
            <!-- /Logo -->
            <!-- Box Onglet Page -->
            <div class="box-link-mobile">
              <a
              style="color: ${onglet === "decouvrir" ? "#393a3b" : ""}" 
                href="${onglet != "index" ? "./" : "./routes/"}decouvrir.html"
                onclick="switchOnglet('onglet1', 1)"
                >Découvrir</a
              >
              <a
              style="color: ${onglet === "info" ? "#393a3b" : ""}" 
               href="${
                 onglet != "index" ? "./" : "./routes/"
               }info.html">Infos pratiques</a>
              <a
              style="color: ${onglet === "propos" ? "#393a3b" : ""}" 
               href="${
                 onglet != "index" ? "./" : "./routes/"
               }propos.html">À propos du musée IRL</a>
            </div>
            <!-- /Box Onglet Page -->
          </nav>
          <!-- Partie Réseaux Sociaux -->
          <section class="reseau-mobile">
            <h1>Suivez-nous !</h1>
            <div class="box-reseau">
              <a class="item twitter" title="Twitter"></a>
              <a class="item facebook" title="Facebook"></a>
              <a class="item instagram" title="Instagram"></a>
            </div>
          </section>
          <!-- /Partie Réseaux Sociaux  -->
        </div>
        <!-- /Menu Mobile  -->`);
}

// Injection Footer
function injectionFooter(url) {
  return (document.getElementsByTagName("footer")[
    document.getElementsByTagName("footer").length - 1
  ].innerHTML = ` 
  <section class="box-footer">
    <img src="${url}img/logo3.png" />
    <p class="adress">3 Boulevard Léon Bruteau <br />42000 Nantes</p>
    <section class="reseau">
      <h1>Suivez-nous !</h1>
      <div class="box-reseau">
        <a class="item twitter" title="Twitter"></a>
        <a class="item facebook" title="Facebook"></a>
        <a class="item instagram" title="Instagram"></a>
      </div>
    </section>
    <a class="mention" href="${
      url === "./" ? "./routes/" : "./"
    }mention.html">Mentions légales</a>
  </section>`);
}

// Footer Position
function footerPosition() {
  let diff = window.innerHeight - document.getElementById("root").offsetHeight;
  if (diff > 0) {
    document.getElementsByTagName("footer")[
      document.getElementsByTagName("footer").length - 1
    ].style.marginTop =
      window.innerHeight - document.getElementById("root").offsetHeight + "px";
  }
}
