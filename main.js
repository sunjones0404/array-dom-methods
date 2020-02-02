// DOM Elements
const main = getID('main');
const addUserBtn = getID('add-user');
const doubleBtn = getID('double');
const showMillionairesBtn = getID('show-millionaires');
const sortBtnDesc = getID('sort-desc');
const sortBtnAsc = getID('sort-asc');
const calculateWealthBtn = getID('calculate-wealth');

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtnDesc.addEventListener('click', sortByRichestDesc);
sortBtnAsc.addEventListener('click', sortByRichestAsc);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

let data = [];

// Start with 3 random users
getRandomUser();
getRandomUser();
getRandomUser();

// Fetch Random User & Add Money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

// Double everyones money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sort users by richest desc
function sortByRichestDesc() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Sort users by richest asc
function sortByRichestAsc() {
  data.sort((a, b) => a.money - b.money);
  updateDOM();
}

// Show millionaires only
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);
  updateDOM();
}

// Calculate total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthElem = document.createElement('div');
  wealthElem.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthElem);
}

// Add new object to data array
function addData(obj) {
  data.push(obj);
  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach(item => {
    const elem = document.createElement('div');
    elem.classList.add('person');
    elem.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(elem);
  });
}

// Format number as money
function formatMoney(num) {
  return '£ ' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Helper function
function getID(elem) {
  return document.getElementById(elem);
}
