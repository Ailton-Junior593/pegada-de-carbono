let chart;
let menuAberto = false;
let isMobile = window.matchMedia("(max-width: 768px)").matches;

let menuLateral;
let overlay;
let hamburger;

document.addEventListener("DOMContentLoaded", () => {

  menuLateral = document.getElementById("menu-lateral");
  overlay = document.getElementById("overlay");
  hamburger = document.querySelector(".hamburger");

  const energia = document.getElementById("energia");
  const km = document.getElementById("km");
  const carne = document.getElementById("carne");
  const lixo = document.getElementById("lixo");
  const recicla = document.getElementById("recicla");
  const resultado = document.getElementById("resultado");
  const anual = document.getElementById("anual");
  const grafico = document.getElementById("grafico");
  const btn = document.getElementById("btnCalcular");

  window.toggleDark = () => {
    document.body.classList.toggle("dark");
    if (chart) chart.destroy();
  };

  btn.addEventListener("click", () => {
    const mensal =
      energia.value * 0.084 +
      km.value * 0.192 +
      carne.value * 7 * 4 +
      (recicla.checked ? lixo.value * 1.2 * 4 * 0.7 : lixo.value * 1.2 * 4);

    resultado.textContent = `Pegada mensal: ${mensal.toFixed(2)} kg CO₂`;
    anual.textContent = `Impacto anual: ${(mensal * 12).toFixed(2)} kg CO₂`;

    resultado.classList.add("show");
    anual.classList.add("show");

    if (chart) chart.destroy();

    chart = new Chart(grafico, {
      type: "bar",
      data: {
        labels: ["Mensal", "Anual"],
        datasets: [{
          data: [mensal, mensal * 12],
          backgroundColor: ["#2ecc71", "#3498db"]
        }]
      },
      options: { plugins: { legend: { display: false } } }
    });
  });

  hamburger.addEventListener("click", toggleMenu);
  hamburger.addEventListener("mouseenter", openMenu);
  hamburger.addEventListener("mouseleave", closeMenu);

  menuLateral.addEventListener("mouseenter", openMenu);
  menuLateral.addEventListener("mouseleave", closeMenu);

  overlay.addEventListener("click", closeMenu);
});

/* MENU */
function openMenu() {
  if (isMobile) return;
  menuLateral.classList.add("open");
  overlay.classList.add("show");
  hamburger.classList.add("active");
  menuAberto = true;
}

function closeMenu() {
  if (isMobile) return;
  menuLateral.classList.remove("open");
  overlay.classList.remove("show");
  hamburger.classList.remove("active");
  menuAberto = false;
}

function toggleMenu() {
  menuAberto ? closeMenu() : openMenu();
}

window.addEventListener("resize", () => {
  isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (isMobile) closeMenu();
});

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".animate");

  animatedElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("show");
    }, index * 150);
  });
});