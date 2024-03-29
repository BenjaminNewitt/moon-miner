// NOTE upgrades

let clickUpgrades = {
  pickaxes: {
    price: 50,
    quantity: 0,
    multiplier: 1
  },

  drills: {
    price: 100,
    quantity: 0,
    multiplier: 4
  }
};

let automaticUpgrades = {
  carts: {
    price: 500,
    quantity: 0,
    multiplier: 50
  },

  rovers: {
    price: 1000,
    quantity: 0,
    multiplier: 150
  }
};

// NOTE variables
let cheese = 0;

let onCooldown = false;

let manualMultiplier = 1;

let automaticMultiplier = 0;

// draw variables
let cheeseElem = document.querySelector("#cheese-count");
let pickaxeElem = document.querySelector("#pickaxe-count");
let drillElem = document.querySelector("#drill-count");
let cartElem = document.querySelector("#cart-count");
let roverElem = document.querySelector("#rover-count");
let manualElem = document.querySelector("#manual-multi-count");
let automaticElem = document.querySelector("#automatic-multi-count");

// prices
let pickaxePriceElem = document.querySelector("#pickaxe-price");
let drillPriceElem = document.querySelector("#drill-price");
let cartPriceElem = document.querySelector("#cart-price");
let roverPriceElem = document.querySelector("#rover-price");

// buttons
let cheeseBtn = document.querySelector("#moon");
let pickaxeBtn = document.querySelector("#pickaxe-button");
let drillBtn = document.querySelector("#drill-button");
let cartBtn = document.querySelector("#cart-button");
let roverBtn = document.querySelector("#rover-button");

// NOTE functions

// music
var sound = new Howl({
  src: ["assets/music.ogg"],
  preload: true,
  autoplay: true,
  loop: true
});

// mute

// update user screen
function draw() {
  // meta data
  cheeseElem.innerText = cheese;
  manualElem.innerText = manualMultiplier;
  automaticElem.innerText = automaticMultiplier;

  // upgrade count
  pickaxeElem.innerText = clickUpgrades.pickaxes.quantity;
  drillElem.innerText = clickUpgrades.drills.quantity;
  cartElem.innerText = automaticUpgrades.carts.quantity;
  roverElem.innerText = automaticUpgrades.rovers.quantity;

  // upgrade price
  pickaxePriceElem.innerText = clickUpgrades.pickaxes.price;
  drillPriceElem.innerText = clickUpgrades.drills.price;
  cartPriceElem.innerText = automaticUpgrades.carts.price;
  roverPriceElem.innerText = automaticUpgrades.rovers.price;

  // // mute button
  // if (sound.mute == true) {
  //   muteBtn.innerHTML = <i class="fas fa-volume-mute" id="mute-button"></i>;
  // }
  // muteBtn.innerHTML = <i class="fas fa-volume-up" id="mute-button"></i>;

  // upgrade buttons
  if (cheese < clickUpgrades.pickaxes.price) {
    pickaxeBtn.setAttribute("disabled", "true");
  } else {
    pickaxeBtn.removeAttribute("disabled");
  }
  if (cheese < clickUpgrades.drills.price) {
    drillBtn.setAttribute("disabled", "true");
  } else {
    drillBtn.removeAttribute("disabled");
  }
  if (cheese < automaticUpgrades.carts.price) {
    cartBtn.setAttribute("disabled", "true");
  } else {
    cartBtn.removeAttribute("disabled");
  }
  if (cheese < automaticUpgrades.rovers.price) {
    roverBtn.setAttribute("disabled", "true");
  } else {
    roverBtn.removeAttribute("disabled");
  }
}

// cooldown

function coolOff() {
  cheeseBtn.setAttribute("disabled", "true");
  setTimeout(() => {
    cooldown();
  }, 250);
  cheeseBtn.removeAttribute("disabled");
}

function cooldown() {
  onCooldown = false;
  draw();
}

// click event
function mine() {
  if (onCooldown == false) {
    cheese += manualMultiplier;
    onCooldown = true;
    coolOff();
  }
  draw();
}

// automatic collection

function collectAutoUpgrades() {
  if (automaticMultiplier > 0) {
    cheese += automaticMultiplier;
    draw();
  }
  return;
}

function startInterval() {
  let collectionInterval = setInterval(collectAutoUpgrades, 3000);
  draw();
}

// NOTE purchase methods

// manual upgrades
function buyManualUpgrade(upgradeName) {
  // checks what onclick upgrade to purchase
  let clickUpgrade = clickUpgrades[upgradeName];
  if (cheese >= clickUpgrade.price) {
    clickUpgrade.quantity++;
    cheese -= clickUpgrade.price;
    manualMultiplier += clickUpgrade.multiplier;
    // increase price
    clickUpgrade.price = Math.floor((clickUpgrade.price *= 1.25));
    draw();
  }
}

// automatic upgrades
function buyAutomaticUpgrade(upgradeName) {
  // checks what automatic upgrade to purchase
  let autoUpgrade = automaticUpgrades[upgradeName];
  if (cheese >= autoUpgrade.price) {
    autoUpgrade.quantity++;
    cheese -= autoUpgrade.price;
    automaticMultiplier += autoUpgrade.multiplier;
    // increase price
    autoUpgrade.price = Math.floor((autoUpgrade.price *= 1.1));
    draw();
  }
}

// NOTE start interval
startInterval();
sound.play();
draw();

// NOTE cheat codes

// more cheese
function cheeseIt() {
  cheese += 9999;
  console.log("that's a really cheesy move!");
  draw();
}
