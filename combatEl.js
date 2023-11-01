// Hero status bar
const healthHero = document.querySelector("#healthHero");
const armorHero = document.querySelector("#armorHero");
const ffHero = document.querySelector("#ffHero");

var heroHealth = 100;
var heroArmor = 25;
var heroFf = 10;

function heroStatusBar(heroHealth, heroArmor, heroFf) {
    var total = heroHealth + heroArmor + heroFf;
    var healthPercent = (heroHealth / total) * 100;
    var armorPercent = (heroArmor / total) * 100;
    var ffPercent = (heroFf / total) * 100;

    healthHero.style.width = healthPercent + "%";
    armorHero.style.width = armorPercent + "%";
    ffHero.style.width = ffPercent + "%";
}

heroStatusBar(heroHealth, heroArmor, heroFf);

// Enemy status bar

const healthEnemy = document.querySelector("#healthEnemy");
const armorEnemy = document.querySelector("#armorEnemy");
const ffEnemy = document.querySelector("#ffEnemy");

var enemyHealth = 100;
var enemyArmor = 25;
var enemyFf = 10;

function enemyStatusBar(enemyHealth, enemyArmor, enemyFf) {
    var total = enemyHealth + enemyArmor + enemyFf;
    var healthPercent = (enemyHealth / total) * 100;
    var armorPercent = (enemyArmor / total) * 100;
    var ffPercent = (enemyFf / total) * 100;

    healthEnemy.style.width = healthPercent + "%";
    armorEnemy.style.width = armorPercent + "%";
    ffEnemy.style.width = ffPercent + "%";
}

enemyStatusBar(enemyHealth, enemyArmor, enemyFf);

