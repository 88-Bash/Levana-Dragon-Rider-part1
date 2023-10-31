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
