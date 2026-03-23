let chart;
let menuAberto = false;
let isMobile = window.matchMedia("(max-width: 768px)").matches;

let menuLateral;
let overlay;
let hamburger;

/* ✅ cores dinâmicas */
function getChartColors() {
  const isDark = document.body.classList.contains("dark");

  return {
    textColor: isDark ? "#f1f1f1" : "#222",
    gridColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    barColors: isDark
      ? ["#27ae60", "#2980b9"]
      : ["#2ecc71", "#3498db"]
  };
}

document.addEventListener("DOMContentLoaded", () => {

  /* ✅ REGISTRA O PLUGIN */
  Chart.register(ChartDataLabels);

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

  /* ✅ NOVO BOTÃO */
  const btnReset = document.getElementById("btnReset");

  /* 🌙 toggle dark */
  window.toggleDark = () => {
    document.body.classList.toggle("dark");

    if (chart) {
      btn.click();
    }
  };

  /* 📊 CALCULAR */
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

    /* 🔥 MOSTRA BOTÃO RESET */
    btnReset.classList.add("show");

    if (chart) chart.destroy();

    const colors = getChartColors();

    chart = new Chart(grafico, {
      type: "bar",
      data: {
        labels: ["Mensal", "Anual"],
        datasets: [{
          data: [mensal, mensal * 12],
          backgroundColor: colors.barColors
        }]
      },
      options: {
        layout: {
          padding: {
            top: 30
          }
        },
        plugins: {
          legend: { display: false },

          datalabels: {
            anchor: "end",
            align: "end",
            offset: -5,
            color: colors.textColor,
            font: {
              weight: "bold",
              size: 14
            },
            formatter: (value) => `${value.toFixed(0)} kg`
          }
        },
        scales: {
          x: {
            ticks: {
              color: colors.textColor
            },
            grid: {
              color: colors.gridColor
            }
          },
          y: {
            ticks: {
              color: colors.textColor
            },
            grid: {
              color: colors.gridColor
            }
          }
        }
      }
    });
  });

  /* 🔄 RESET (NOVO) */
  btnReset.addEventListener("click", () => {

    // limpar inputs
    energia.value = "";
    km.value = "";
    carne.value = "";
    lixo.value = "";
    recicla.checked = false;

    // limpar textos
    resultado.textContent = "";
    anual.textContent = "";

    resultado.classList.remove("show");
    anual.classList.remove("show");

    // esconder botão
    btnReset.classList.remove("show");

    // destruir gráfico
    if (chart) {
      chart.destroy();
      chart = null;
    }
  });

  /* MENU */
  hamburger.addEventListener("click", toggleMenu);
  hamburger.addEventListener("mouseenter", openMenu);
  hamburger.addEventListener("mouseleave", closeMenu);

  menuLateral.addEventListener("mouseenter", openMenu);
  menuLateral.addEventListener("mouseleave", closeMenu);

  overlay.addEventListener("click", closeMenu);
});

/* MENU FUNÇÕES */
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

/* ANIMAÇÕES */
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".animate");
  
  document.querySelectorAll(".side-menu a").forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  animatedElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("show");
    }, index * 150);
  });
});