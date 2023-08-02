document.querySelector("#darkMode").addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  if (document.documentElement.classList.contains("dark")) {
    document.getElementById("indicatorMode").textContent = "Light";
    document.getElementById("darkModeIMG").src = "./assets/icon-sun.svg";
  } else {
    document.getElementById("indicatorMode").textContent = "Dark";
    document.getElementById("darkModeIMG").src = "./assets/icon-moon.svg";
  }
});

const getEl = (id) => document.getElementById(id);
