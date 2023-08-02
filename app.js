const getEl = (id) => document.getElementById(id);
const darkModeBtn = getEl("darkModeBtn");
const darkModeIcon = getEl("darkModeIcon");
const indicatorMode = getEl("indicatorMode");
const searchInput = getEl("search-input");
const searchBtn = getEl("search-submit");
const searchEmpty = getEl("searchEmpty");
const loader = getEl("loader");
const profileContainer = getEl("profile-container");
const eraseIcon = getEl("erase");

const profileImage = getEl("profile-img");
const userFullName = getEl("user-fullname");
const userName = getEl("user-username");
const joinedDate = getEl("user-joined");
const userBio = getEl("user-bio");
const userRepo = getEl("user-repo");
const userFollower = getEl("user-follower");
const userFollowing = getEl("user-following");
const userLocation = getEl("user-location");
const userPage = getEl("user-page");
const userTwitter = getEl("user-twitter");
const userCompany = getEl("user-company");

const API_URL = "https://api.github.com/users/";
// ignore prettier
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Making functional the search bar
 */
let searchQuery;
const sendRequestedSearch = (api) => {
  searchQuery = searchInput.value;
  if (!searchQuery) {
    searchEmpty.textContent = "No search, please write your search!";
    clearSearchError();
    return;
  }
  // Showing the loading screen before getting the github User searched
  loader.classList.remove("hidden");
  profileContainer.classList.add("hidden");
  getUserData(api, searchQuery);
  console.log(searchQuery);
};
const clearSearchError = () => {
  searchInput.addEventListener("keydown", () => (searchEmpty.textContent = ""));
};
const getSearchValue = (e) => {
  e.preventDefault();
  sendRequestedSearch(API_URL);
};
searchBtn.addEventListener("click", getSearchValue);
searchInput.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key === "Enter") {
    sendRequestedSearch(API_URL);
  }
});

const toggleErase = () =>
  searchInput.value
    ? eraseIcon.classList.remove("hidden")
    : eraseIcon.classList.add("hidden");
searchInput.addEventListener("keyup", () => {
  eraseIcon.classList.remove("hidden");
  toggleErase();
});

eraseIcon.addEventListener("click", () => {
  searchInput.value = "";
  toggleErase();
});

/**
 * Fetching data from GitHub User API
 * @returns
 */
async function getUserData(api, query) {
  try {
    const userRes = await fetch(api + query);
    const userCollection = await userRes.json();
    if (!userCollection) return;

    renderDataToUI(userCollection);
    // Hidding the loading screen after rendering all data on the page
    loader.classList.add("hidden");
    profileContainer.classList.remove("hidden");
  } catch (err) {
    searchEmpty.textContent = "No Result!";
    loader.textContent = "No Result, Try Again!";
  }
}
/**
 * According to the result we got in search user
 * @returns
 */
function renderDataToUI(data) {
  function checkingNull(a, b) {
    if (a === "" || a === null) {
      b.parentElement.classList.add("opacity-50");
      return "Not available";
    } else {
      return `${a}`;
    }
  }

  profileImage.src = `${data.avatar_url}`;
  userFullName.textContent = checkingNull(data.name, userFullName);
  userName.textContent = `@${data.login}`;
  userName.setAttribute("href", `${data.html_url}`);
  userBio.textContent = `${data.bio || "This profile has no bio"}`;
  userRepo.textContent = `${data.public_repos}`;
  userFollower.textContent = `${data.followers}`;
  userFollowing.textContent = `${data.following}`;
  userLocation.textContent = checkingNull(data.location, userLocation);
  userTwitter.textContent = checkingNull(data.twitter_username, userTwitter);
  userPage.textContent = checkingNull(data.blog, userPage);
  userCompany.textContent = checkingNull(data.company, userCompany);

  const createdDate = data.created_at.split("T")[0].split("-");
  const month = createdDate[1];
  joinedDate.textContent = `${createdDate[2]} ${months[month - 1]} ${
    createdDate[0]
  }`;
}

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
const toggleTheme = () => {
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

// on Load
const onLoad = () => searchInput.value || searchInput.focus();
onLoad();
