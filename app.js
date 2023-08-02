const getEl = (id) => document.getElementById(id);
const darkModeBtn = getEl("darkModeBtn");
const darkModeIcon = getEl("darkModeIcon");
const indicatorMode = getEl("indicatorMode");

/**
 * Dark Mode Based on the existing settings such on localStorage or Default them of the system
 */
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme:dark)").matches)
) {
  document.documentElement.classList.add("dark");
  darkModeIcon.src = "./assets/icon-sun.svg";
  indicatorMode.textContent = "Light";
} else {
  document.documentElement.classList.remove("dark");
  darkModeIcon.src = "./assets/icon-moon.svg";
  indicatorMode.textContent = "Dark";
}

/**
 * Functionnality of the button to toggle theme whether Dark or Light Mode
 */
const toggleTheme = function () {
  // Working on the previous, like the saved color-theme storage
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  }
  // Changing the darkMode Icon and Indicator textcontent depending on the classname of <html> then setting the local storage of the color theme
  if (document.documentElement.classList.contains("dark")) {
    darkModeIcon.src = "./assets/icon-sun.svg";
    indicatorMode.textContent = "Light";
    localStorage.setItem("color-theme", "dark");
  } else {
    darkModeIcon.src = "./assets/icon-moon.svg";
    indicatorMode.textContent = "Dark";
    localStorage.setItem("color-theme", "light");
  }
};
// Making functional the DarkModeBtn
darkModeBtn.addEventListener("click", toggleTheme);
