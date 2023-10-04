import { RPS } from './RPS.js';
import { TTT } from './TTT.js';

// header element
const header = document.querySelector("#header");

let currentHeader = 0;

const headerLocations = [
  { title: "South-east of Indus Vallis" },
  { title: "Grandma's Backyard" },
  { title: "Grandma's Kitchen" },
  { title: "Departure" },
  { title: "The road" },
  { title: "The shortcut" },
  { title: "The main road" },
  { title: "The Storm" },
  { title: "The cave" },
  { title: "Cave's Entrance hallway" },
  { title: "Incubation shaft" },
  { title: "Main Chamber" },
  { title: "The Egg" },
  { title: "Antigravity AI Assistant" }
];



// player

let xp;
let health;
let maxHealth;
let cDust;
let rDust;
let lDust;
let healCardrige;
let ammoCardrige;

// combat

let combat = false;
let afterFight = false;
let fightHealth;
let totalDmg = 0;

// event

let sEggs = 0;
let dexInstal = false;

// weapons
let currentWeapon = 0;

const weapons = [
  {
    name: '"Hardwood Staff"',
    powerMin: 5,
    powerMax: 7,
    crit: 11,
    text: "With a simple motion you deliver accurate attack on the enemy.",
    critText: " You spin the staff around your body giving it extra speed. It wooshes through the air and lands on the head of the opponent. You deal Critical damage. "
  },
  {
    name: '"Spear" ',
    powerMin: 17,
    powerMax: 21,
    crit: 28,
    text: "You spin the spear at your side, culminating in a swift slice towards the enemy, the razor-sharp edge cutting through everything that is on it's path.",
    crittext: " Arching your entire body backward and balancing on one foot, you focus the weight like a taut string, primed for release. With an explosive, fluid motion, you unleash the accumulated tension, driving your arms forward. The spear's tip, cutting through the air at incredible speed, pierces the enemy's body dealing Critical damage."
  },
];

// monsters 

let fighting = 0;
let monsterHealth;

const monsters = [
  {
    name: "Practice Dummy",
    level: 3,
    damage: 5,
    health: 45,
    text: "You tripped over a little stone and bumped your head into the bucket. Ouch!",
    deathText: "Bucket falls from dummy and rolls down to your feet. You place your foot on top of it and scream in victory 'UUUAAAAA!!'"
  },
  {
    name: "Young Bandit",
    level: 8,
    damageMin: 7,
    damageMax: 10,
    crit: 14,
    health: 88,
    text: " young bandit reach you and land a punch",
    critText: " young bandit hard kicks knocks you of balance for a moment",
    deathText: "Dazzled enemy retreats running away from you, he's confused and scared."
  },
  {
    name: "Baby Spiderling",
    level: 10,
    damageMin: 7,
    damageMax: 10,
    crit: 14,
    health: 60,
    text: " Baby spiderling bites your leg",
    critText: "Baby spiderling jumps and reach your shoulder biting it on the side causing bleedin",
    deathText: "After last hit baby spiderling stiffens its legs and rolls on its back. Starts twitching. It seems to be dead."
  },
  {
    name: "Spiderling",
    level: 14,
    damageMin: 7,
    damageMax: 10,
    crit: 14,
    health: 120,
    text: " Spiderling extend it's front legs and delivers a pounding hit on your chest",
    critText: " Spiderling reach you with its fangs and bite you causing bleeding.",
    deathText: "Spiderling stiffens up and rolls on it's back. Starts twitching. It seems to be dead."
  },
  {
    name: "Arakh Queen",
    level: 33,
    damageMin: 7,
    damageMax: 10,
    crit: 14,
    health: 350,
    text: " Queen spits hardened ball of web that hits you.",
    critText: " Queen swoops its long legs and gets you of your feet.",
    deathText: "Queen squicks in pain and fall on the ground. It's over, she's dead."
  },
  {
    name: "Backyard Monster",
    level: 3,
    damage: 5,
    health: 45,
    text: "Monster dashes your way and reaches you with its sharp claw. You take some damage.",
    deathText: "With your last strike enemy falls down and stop moving. You place your foot on top of its body and scream in victory 'UUUAAAAA!!'"
  },
];

// game locations

let currentLocation = 0;

const locations = [
  {
    name: "arena0",
    "button text": ["Fight!", "Snap out of it!"],
    "button functions": [goFight0, snapOut],
    text: "As you stare into the cold, motionless eyes of a monster, it's red pupils seems to be fixated on you, looking for weakness. A sense of dread fills your whole body. It's head, like an armor, shines in the light of a rising sun. Time seems to stop, your palms start to sweat. You need to make a decision, to take on this battle or leave to fight another day?"
  },
  {
    name: "training1",
    "button text": ["Attack!", "Parry"],
    "button functions": [attackDummy, parryDummy],
    text: "You decided to fight. What's next?!"
  },
  {
    name: "broken dummy2",
    "button text": ["Scratch head", "Shout in victory!"],
    "button functions": [empty, empty],
    text: "Metal bucked fall down on the ground and rolled towards You, you placed your foot on the head of the enemy claiming victory over imaginanated monster."
  },
  {
    name: "road3",
    "button text": ["shortcut", "main road"],
    "button functions": [shortcut, main],
    text: "After a day and a half traveling, you see the little path going out east from the main road to the valley. 3P-A is howering next to you making a low humming noise, it displays that you will reach the city in less than 3 days following the roadcut in the mountain, a common path for travelers."
  },
  {
    name: "shortcut4",
    "button text": ["fight", "runaway"],
    "button functions": [goFight2, runaway],
    text: "The shortcut winds down to a valley filled with big, loose rocks. The mostly flat surface suggests that long ago, it was once an old river bed. All goes smoothly until suddenly, a person jumps out from behind a massive rock. He threatens you holding a rock in his hand, demanding that you give him all your possessions."
  },
  {
    name: "main road5",
    "button text": ["whistle", "chant"],
    "button functions": [calm, calm],
    text: "Misha continue this expedition with no hiccups, cart works fine, sight of tripple a being like a little puppy, curious and excited about everything makes you smile. Its a good day."
  },
  {
    name: "bandits6",
    "button text": ["Attack!", "Parry"],
    "button functions": [attack, parry],
    text: "The young bandit stands before you, dressed in rugged clothing. His face is rough and weathered and he smirks in confidence. You can tell it's not his first time and you don't know what he's capable of, but neither does he."
  },
  //cutscene
  {
    name: "exploration7",
    "button text": ["Left", "right"],
    "button functions": [mainHall, corridor],
    text: "The wind was defening, you woudlnt dare to go outside. It was time to explore the cave. The storm might take a while, might as well see the other options. There is a crossroad. You can go lef or right."
  },
  // right
  {
    name: "corridor8",
    "button text": ["Touch", "go further"],
    "button functions": [goFight3, further],
    text: "The corridor is getting smaller but still big enough to follow. Spiderwebs and slime is everywhere. You see wet eggs the size of a big wattermelon bunched together. You getting a closer look."
  },
  {
    name: "eggs9",
    "button text": ["Attack!", "Parry"],
    "button functions": [attack, parry],
    text: "You curiousity took over and you touched the wet egg. 'You never touch the wet egg' as you remember your father always told you when exploring caves when you where little. It started to wobble and bursted. Small spiderling jump out and directly lock onto you. It got fangs and posture with front legs up. Dont let it get you."
  },
  {
    name: "further10",
    "button text": ["search", "leave it"],
    "button functions": [cocoon, goFight4],
    text: "You see a cacoon in shape of a human body, it doesnt move. Whoever is inside is long gone. You wonder if you should look inside."
  },
  {
    name: "search11",
    "button text": ["Look inside the jacket", "Search pants pockets"],
    "button functions": [takeDex, takeDust],
    text: "You command 3P-A to cut opening with its laser. Inside you see a soldier in Gurdian faction uniform. You hasitate to search the body."
  },
  {
    name: "young spider12",
    "button text": ["Attack!", "Parry"],
    "button functions": [attack, parry],
    text: "Suddenly, a dog size spider jumps out from the shadows and tries to attack you without any warning."
  },
  {
    name: "Main chamber13",
    "button text": ["Go in", "Go back"],
    "button functions": [finalBoss, explore],
    text: "You checked all the other corners of the cave. Storm doesnt seems to be stopping. Its sounds are deffenign when you approach the entrence. You decide to face whatever lukrs inside the main chamber."
  },
  {
    name: "final boss14",
    "button text": ["Fight", "Fight"],
    "button functions": [goFight5, goFight5],
    text: "You see a gian spider Queen clikcing its jaws in terrifing way, you can feel it in your bones, sends a wave of terror through out your body, but you cant back up now. You need to face it"
  },
  {
    name: "Queen fight15",
    "button text": ["Attack!", "Parry"],
    "button functions": [attack, parry],
    text: "Giant spider noticed your presence and skreeeks in high pitch sending a wave of piercing sound through out the cave. It throwing it's leg in the air towards you but seems to be protecting soemthing shining under her body and dont want to leave it's side."
  },
  {
    name: "shortcut4 -> Runaway16",
    "button text": ["fight", "fight"],
    "button functions": [goFight2, goFight2],
    text: "You turned you back to the bandit and put yourself in disadvantage position. Young bandit doesnt hasitate to use it against you and throws a rock in your head. Now, you have no choice. You need to fight."
  },
  {
    name: "took pda first17",
    "button text": ["empty", "Take dust"],
    "button functions": [empty, takeDust2],
    text: "You lift the side of the jacket and find a device that appears to be military grade PDA. You take it in your hand and stare at it as it reminds you of the one that your father had."
  },
  {
    name: "took dust first18",
    "button text": ["Take pda", "empty"],
    "button functions": [takeDex2, empty],
    text: "You reach the bulky object in the pocket. You take it out and to your surprise, you see a rare dust vial, quite a find in these times. Its worth some credits."
  },
  {
    name: "empty cocoon19",
    "button text": ["empty", "empty"],
    "button functions": [empty, empty],
    text: "There is nothing left, but the dried out corps of a soldier. You take the dogtag. Behind every death there is a family that moarns. Maybe they would want to know."
  },
  {
    name: "take dex2 20",
    "button text": ["look for more", "look for more"],
    "button functions": [emptyCocoon, emptyCocoon],
    text: "You lift the side of the jacket and find a device that appears to be military grade PDA. You take it in your hand and stare at it as it reminds you of the one that your father had."
  },
  {
    name: "take dust2 21",
    "button text": ["look for more", "look for more"],
    "button functions": [emptyCocoon, emptyCocoon],
    text: "You reach the bulky object in the pocket. You take it out and to your surprise, you see a rare dust vial, quite a find in these times. Its worth some credits."
  },
  {
    name: "looping tunnel 22",
    "button text": ["left", "right"],
    "button functions": [mainHall, corridor],
    text: "You again standing before the big hole leading to a cave main chamber and tunnel leading to the right side. Where do you want to go?"
  },
  {
    name: "no more looping tunnel 23",
    "button text": ["left", "left"],
    "button functions": [mainHall, mainHall],
    text: "You explered this section of a cave enough, there is nothing left there to see. You feel stronger and ready to face the deep darkness of a main chamber. Whatever lurkes there, you are ready!"
  },
  {
    name: "to weak to enter 24",
    "button text": ["go back!", "DANGER!"],
    "button functions": [loopingCave, loopingCave],
    text: "Endless darkness penetrate your senses. 3P's ligh is not reaching far on emergency mode, but it displays 'DANGER'. Clicking noises and sounds you are not familiar with paralize you. You shouldn't go there."
  },
  {
    name: "trigger event Cocoon 25",
    "button text": ["empty", "empty"],
    "button functions": [empty, empty],
    text: "There is nothing left to see. "
  },
  {
    name: "snap out of it 26",
    "button text": ["Fight!", "run to Grandma"],
    "button functions": [goFight, seeGrandma],
    text: "The vail has dropped and reality came back to normal. A sticks bounded with a rope dressed in a dirty burlup sack standing on a pole. A iron backet hangs loose on top with painted red angry eyes. Its for practice, i guess."
  },
  {
    name: "training0 27",
    "button text": ["Attack!", "Parry"],
    "button functions": [attackDummy, parryDummy],
    text: "You took a deep breath. You feel adrenaline pumping through your veins. You know its now or never. There is only one goal. Defeat the monster. "
  },
  {
    name: "minigames 28",
    "button text": ["Meteor, force field, saber", "WhackArach - A"],
    "button functions": [rps, ttt],
    text: "You thinking to pass some time and open the 3P-A game menu."
  }
];

// cutscenes

const cutscene = [
  {
    text: "<p>High-pitched tones from a robot and loud knocks echoed from the garden through the kitchen window. The enthusiastic taunts of young men ceased when an old lady shout.</p> <p> - MISHA! ... MIIIISHAAAA! ... - she yelled.</p><p> - Yes, grandma!? - Misha responded.</p><p> - Come here, I need to talk to you! </p> <p> - I'm coming, Grandma! Just few more ... strikes! - he replied, delivering another loud knock.</p> <p> - When will he finally stop playing around? ... - the old lady muttered as she wrapped up the last meteor dust vial.</p>"
  },
  {
    text: "<p> - I'm here, Grandma, - said Misha, entering the kitchen with vigor.</p> <p> - Come here honey ... You know, you remind me of your father ... - said Grandma.</p> <p> - You mean brave and adventurous? - Misha asked.</p> <p> - No! Living in a fantasy world and reckless! - Grandma replied arroused, she then soften her voice and continue - You need to start helping around the house. It's hard for me alone and we need to think about how we'll survive if things get worse. The Arach attack and wars between factions are bad enough for all of us. We need to be serious about preparing for the worst.</p> <p>Grandma handed Misha a vial of dust packed in paper. </p> <p> - Put it in the crate and load everything into the cart.</p> <p>Misha took the vial without saying anything and put it in the crate. Lifting up the crate, he looked at Grandma. She pointed to the cart, and he left the house through the kitchen doors.</p>"
  },
  {
    text: "After a moment has passed, Misha and Grandma finished wrapping the cart with the tarp and made sure everything was attached tightly.<p> - Misha, I want you to take this cart to your uncle in the city, - said Grandma. - I packed your father's armor, your mother's jewelry, and other things that we need to get rid of to be able to survive. There is a chest that I don't want you to mess around with. Your uncle knows about it. It's locked, and it should stay that way. The crates of dust vials are at the back, so it will be easier to unload when you get there. I made you food for the road. It's all in the front. Try to be smart with it. The gyro of the cart is fixed. Giovanni, our neighbor, helped me out with it. He is a very kind man and skillful mechanic, but try to be careful. You know how often those carts break. Please Misha, take the safe path and pay attention on the road. If anything seems to be out of the ordinary, send the 'triple A' to your uncle for help. I have PDA for your robot with preinstalled medical functions. If you get injured, just use it. I will load cartridges for three uses, just in case, but I'd rather you didn't use any of them. </p>"
  },
  {
    text: "<p>Grandma noticed he was losing focus.</p><p> - Misha! Are you listening? This is very important. You need to stay focused. It can be dangerous out there. I don't want anything to happen to you, do you understand?</p><p> - I know grandma, I'm sorry. I just...I really miss them, you know?</p><p>She took him close to herself and calmed his head, trying to soothe his pain.</p><p> - I know sweetheart, I missed them too. A lot of people do. They were great figures in our land, but it's time to move on. They would want that for us. We need to live and try to always keep them in our hearts. - she kissed his forehead and said, - It's time for you to go. The weather feels calm now, but it might change anytime. Just remember to stick to the main road.</p><p> - I will grandma, don't worry. I will be back sooner than you think.</p><p> He gave Grandma last hug and mounted the cart, meanwhile, grandma installed PDA in the robot. Misha was ready, and giving her a smile, he departed. She watched him leaving until she lost him of her sight.</p>"
  },
  {
    text: " There was strange calmness for a moment, that felt out of ordinery. Like the world stop for a second, then all of a sudden the wind has picked up, the sky darkened. Behind the rocks of the valley big red wall of fine marsian sand was appearing from nowhere. Misha needs to find a shelter otherwise he wont't survive. "
  },
  {
    text: " At the last moment he saw a cave in the distans and run straight towrds it. A wall of red dust close the entrence behind Misha. He is trapped, but safe. Darkness was overhelming, it was a shock that made other senses sharpened. Misha wasn't sure the noices coming from the cave were real or he was just imagining? Quickly he manage to pull himself together and order 3P-A to light up the place. Due to lack of sun energy the machine set up is the low consumption mode and turned on the yellow light. It wasnt reaching far, but was enough to make sense of the area. Misha decided to set a camp. Who knows how long this will last."
  },
  {
    text: "here a player won with the Arakh Queen"
  },
  {
    text: "here you noticed the egg."
  },
  {
    text: "you take the egg, the adventure is finished, but its just the beggining."
  },
  {
    text: "instalation of pda, misha fascinated about the military pda he hacks 3P A to override the printing mode disabled by low consumption mode. It shows a lot of data is encrypted and the las log was when the arakh attack took place, where your mom and dad has been last seen, but misha still can install the advance module."
  }
];

// 3P-A "TripleA" as Antigravity AI Asssitant

let dexType = 0;

const asistant = [
  [{
    mode: "standard unit",
    name: "home screen",
    "button text": ["empty", "empty", "esc"],
    "button functions": [emptySlot, emptySlot, esc]
  },
  {
    name: "after match",
    "button text": ["empty", "empty", "Info"],
    "button functions": [emptySlot, emptySlot, afterMatch],
    text: "You feel sour from the fight, you want to regroup and take care of your inventory."
  }
  ],
  [{
    mode: "medical unit",
    name: "home screen",
    "button text": ["empty", "Health", "esc"],
    "button functions": [empty, healing, esc]
  },
  {
    name: "after match",
    "button text": ["empty", "Health", "Info"],
    "button functions": [empty, healing, afterMatch],
    text: "You feel sour from the fight, you want to regroup and take care of your inventory."
  },
  {
    name: "health",
    "button text": ["empty", "Heal", "esc"],
    "button functions": [empty, heal, esc],
    text: "You feel sour from the fight, you want to regroup and take care of your inventory."
  }
  ],
  [{
    mode: "military unit",
    name: "home screen",
    "button text": ["Craft", "Health", "esc"],
    "button functions": [crafting, healing, esc]
  },
  {
    name: "after match",
    "button text": ["Craft", "Health", "Info"],
    "button functions": [crafting, healing, afterMatch],
    text: "You feel sour from the fight, you want to regroup and take care of your inventory."
  },
  {
    name: "health",
    "button text": ["Health Cardrige", "Heal", "esc"],
    "button functions": [makeHealth, heal, esc],
    text: "You feel sour from the fight, you want to regroup and take care of your inventory."
  },
  {
    name: "craft",
    "button text": ["Upgrade Weapon", "empty", "esc"],
    "button functions": [upgradeWeapon, emptySlot, esc],
    text: "You feel sour from the fight, you want to regroup and take care of your inventory."
  }]
];

// initialize story

header.innerText = headerLocations[0].title;
index.addEventListener("click", start);
document.getElementById("hcText").textContent = healCardrige;

// html elements

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const hcText = document.querySelector("#hcText");
const cDustText = document.querySelector("#cDustText");
const rDustText = document.querySelector("#rDustText");
const lDustText = document.querySelector("#lDustText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const rpsMini = document.querySelector("#rps");
const headerText = document.querySelector("#header");
const arrowRight = document.querySelector("#arrowRight");
button3.innerText = "3P-A assist.";
button3.onclick = assist;

// location update functions

// asistant

function assist() {
  dexUpdate(dexType, 0);
  header.innerText = headerLocations[13].title;
  getHomeScreenText();
}

function esc() {
  updateLocation(locations[currentLocation]);
  button3.innerText = "3P-A assist.";
  button3.onclick = assist;
  header.innerText = headerLocations[currentHeader].title;
}

function dexUpdate(dexType, index) {
  button1.innerText = asistant[dexType][index]["button text"][0];
  button2.innerText = asistant[dexType][index]["button text"][1];
  button3.innerText = asistant[dexType][index]["button text"][2];
  button1.onclick = asistant[dexType][index]["button functions"][0];
  button2.onclick = asistant[dexType][index]["button functions"][1];
  button3.onclick = asistant[dexType][index]["button functions"][2];
  text.innerHTML = asistant[dexType][index].text;
}

// location

function updateLocation(locations) {
  button1.innerText = locations["button text"][0];
  button2.innerText = locations["button text"][1];
  button1.onclick = locations["button functions"][0];
  button2.onclick = locations["button functions"][1];
  text.innerText = locations.text;
  locations = currentLocation;
}

// health

function updateHealth(change) {

  if (change === 0) {
    return;
  }
  healthText.innerHTML = health;
  if (health < 30) {
    healthText.style.color = "red";
  } else if (health == maxHealth) {
    healthText.style.color = "green";
  } else {
    healthText.style.color = "black";
  }

  const animationSpan = document.createElement("span");
  animationSpan.innerText = change > 0 ? "+" + change : change;
  animationSpan.classList.add("health-animation");
  animationSpan.style.color = change > 0 ? "green" : "red";
  animationSpan.style.top = `${Math.floor(Math.random() * 21) - 10}px`;
  animationSpan.style.left = `${Math.floor(Math.random() * 21) - 10}px`;
  document.querySelector("#healthText").appendChild(animationSpan);
  animationSpan.classList.add("animate");

  animationSpan.addEventListener("animationend", () => {
    animationSpan.remove();
  });
}

function updateMonsterHealth(change) {
  if (change === 0) {
    return;
  }

  monsterHealth += change;
  monsterHealthText.innerText = monsterHealth;

  const animationSpan = document.createElement("span");
  animationSpan.innerText = change > 0 ? "+" + change : change;
  animationSpan.classList.add("monsterHealth-animation");
  animationSpan.style.color = "white";

  const monsterHealthRect = monsterHealthText.getBoundingClientRect();

  animationSpan.style.top = `${monsterHealthRect.top + Math.floor(Math.random() * 21) - 10}px`;
  animationSpan.style.left = `${monsterHealthRect.left + Math.floor(Math.random() * 21) - 10}px`;

  document.body.appendChild(animationSpan);

  animationSpan.classList.add("animate");

  animationSpan.addEventListener("animationend", () => {
    animationSpan.remove();
  });
}


// gaming functions

function attackDummy() {
  let playerDamageTaken = 0;
  let monsterDamageTaken = 0;

  const weaponDamage = getRandomDamage(
    weapons[currentWeapon].powerMin,
    weapons[currentWeapon].powerMax,
    weapons[currentWeapon].crit
  );

  monsterDamageTaken = weaponDamage + Math.round(Math.random() * xp) + 1;

  if (currentLocation == 1) {
    if (monsterHealth <= 0 || health <= 0) {
      empty();
    } else {
      if (Math.random() < 0.28) {
        playerDamageTaken = monsters[fighting].damage;
        text.innerText = monsters[fighting].text;
      } else {
        if (weaponDamage >= weapons[currentWeapon].crit) {
          text.innerText = weapons[currentWeapon].critText;
        } else {
          text.innerText = weapons[currentWeapon].text;
        }
      }
    }
  } else if (currentLocation == 27) {
    if (monsterHealth <= 0 || health <= 0) {
      empty();
    } else {
      if (Math.random() < 0.28) {
        playerDamageTaken = monsters[fighting].damage;
        text.innerText = monsters[fighting].text;
      } else {
        if (weaponDamage >= weapons[currentWeapon].crit) {
          text.innerText = weapons[currentWeapon].critText;
        } else {
          text.innerText = weapons[currentWeapon].text;
        }
      }
    }
  }

  monsterHealth -= monsterDamageTaken;
  monsterHealthText.innerText = monsterHealth;
  health -= playerDamageTaken;
  healthText.innerText = health;

  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    monsterHealthText.innerText = 0;
    button1.onclick = empty;
    winFight();
    monsterDefeat();
    victory();
  }
  updateHealth(-playerDamageTaken);
  updateMonsterHealth(-monsterDamageTaken);
  totalDmg += playerDamageTaken;
  return { playerDamageTaken, monsterDamageTaken };
}



function parryDummy() {
  if (currentLocation == 1) {
    if (monsterHealth <= 0 || health <= 0) {
      empty();
    } else {

      let randomChance = Math.random();

      if (randomChance < 0.21) {
        monsterHealth -= Math.ceil(weapons[currentWeapon].power * 0.9);
        text.innerText = "You rollled on the ground and manage to get behind the enemy, you hit the bucket with your staff. Impresive" + weapons[currentWeapon].power + " damage.";
      } else if (randomChance < 0.43) {
        monsterHealth -= Math.ceil(weapons[currentWeapon].power * 0.3);
        text.innerText = "That wasn't good. You looked at Grandmas kitchen window in hope she didnt saw that.";
      } else {
        health -= Math.floor(monsterAttack(monsters[fighting].level) * 0.45);
        monsterHealth -= Math.ceil(weapons[currentWeapon].power * 0.6);
        text.innerText = "That was terrible, be careful, dont hurt yourself!";
      }

      updateHealth();
      healthText.innerText = Math.round(health);
      monsterHealthText.innerText = Math.round(monsterHealth);

      if (health <= 0) {
        healthText.innerText = 0;
        lose();
      } else if (monsterHealth <= 0) {
        monsterHealthText.innerText = 0;
        winFight();
        monsterDefeat();
        victory();
      }
    }
  } else if (currentLocation == 27) {
    if (monsterHealth <= 0 || health <= 0) {
      empty();
    } else {

      let randomChance = Math.random();

      if (randomChance < 0.21) {
        monsterHealth -= Math.ceil(weapons[currentWeapon].power * 0.9);
        text.innerText = "You rollled on the ground and manage to get behind the enemy, you hit its head with your staff. Impresive" + weapons[currentWeapon].power + " damage.";
      } else if (randomChance < 0.43) {
        monsterHealth -= Math.ceil(weapons[currentWeapon].power * 0.3);
        text.innerText = "Expecting the attack you jumped away and aim at the monster. You miss the head and hit the arm of  monster.";
      } else {
        health -= Math.floor(monsterAttack(monsters[fighting].level) * 0.45);
        monsterHealth -= Math.ceil(weapons[currentWeapon].power * 0.6);
        text.innerText = "You backed away and tripped over the stone. You fall while monster jumped on you getting hit by your staff. You get hit by its claw.";
      }

      updateHealth();
      healthText.innerText = Math.round(health);
      monsterHealthText.innerText = Math.round(monsterHealth);

      if (health <= 0) {
        healthText.innerText = 0;
        lose();
      } else if (monsterHealth <= 0) {
        monsterHealthText.innerText = 0;
        winFight();
        monsterDefeat();
        victory();
      }
    }
  }
}

function getRandomDamage(min, max, crit) {
  const baseDamage = Math.floor(Math.random() * (max - min + 1)) + min;
  const criticalChance = Math.random();

  if (criticalChance < 0.29) {
    return crit;
  } else {
    return baseDamage;
  }
}

function getMonsterDamage(min, max, crit) {
  const baseDamage = Math.floor(Math.random() * (max - min + 1)) + min;
  const criticalChance = Math.random();

  if (criticalChance < 0.2) {
    return crit;
  } else {
    return baseDamage;
  }
}

function attack() {
  let playerDamageTaken = 0;
  let monsterDamageTaken = 0;

  const weaponDamage = getRandomDamage(
    weapons[currentWeapon].powerMin,
    weapons[currentWeapon].powerMax,
    weapons[currentWeapon].crit
  );

  const monsterDamage = getMonsterDamage(
    monsters[fighting].damageMin,
    monsters[fighting].damageMax,
    monsters[fighting].crit
  );

  monsterDamageTaken = weaponDamage + xp;
  playerDamageTaken = monsterDamage - (Math.floor(0.2 * xp));

  if (monsterHealth <= 0) {
    empty();
  } else {
    if (weaponDamage >= weapons[currentWeapon].crit) {
      text.innerText = weapons[currentWeapon].critText + " Then ";
    } else {
      text.innerText = weapons[currentWeapon].text + " Then ";
    }

    if (monsterDamage >= monsters[fighting].crit) {
      text.innerText += monsters[fighting].critText;
    } else {
      text.innerText += monsters[fighting].text;
    }
    monsterHealth -= monsterDamageTaken;
    monsterHealthText.innerText = monsterHealth;
    health -= playerDamageTaken;
    healthText.innerText = health;
  }

  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    monsterHealthText.innerText = 0;
    button1.onclick = empty;
    winFight();
    monsterDefeat();
    victory();
  }
  updateHealth(-playerDamageTaken);
  updateMonsterHealth(-monsterDamageTaken);
  totalDmg += playerDamageTaken;
  return { playerDamageTaken, monsterDamageTaken };
}

function parry() {
  if (monsterHealth <= 0 || health <= 0) {
    empty();
  } else {
    let damageTaken = 0;
    let randomChance = Math.random();

    if (randomChance < 0.21) {
      monsterHealth -= Math.ceil(weapons[currentWeapon].power * 0.9);
      text.innerText = "Your timing was perfect. You manage to parry the attack and counter with a strike. Enemy takes " + weapons[currentWeapon].power + " damage.";
    } else if (randomChance < 0.43) {
      damageTaken = Math.floor(monsterAttack(monsters[fighting].level) * 0.4);
      health -= damageTaken;
      monsterHealth -= Math.ceil(weapons[currentWeapon].power * 0.3);
      text.innerText = "You didn't time it well, you take damage.";
    } else {
      damageTaken = Math.floor(monsterAttack(monsters[fighting].level) * 0.45);
      health -= damageTaken;
      monsterHealth -= Math.ceil(weapons[currentWeapon].power * 0.6);
      text.innerText = "Despite your readiness, you couldn't avoid the whole blow of the attack. You take damage, but you also did some to the enemy";
    }

    totalDmg += damageTaken;
    healthText.innerText = Math.round(health);
    monsterHealthText.innerText = Math.round(monsterHealth);
    updateHealth();

    if (health <= 0) {
      healthText.innerText = 0;
      lose();
    } else if (monsterHealth <= 0) {
      monsterHealthText.innerText = 0;
      winFight();
      monsterDefeat();
      victory();
    }
  }
}


function monsterAttack(level) {
  let hit = (level * 5) - (Math.round(Math.random() * xp));
  console.log(hit);
  return hit;
}

function winFight() {
  combat = false;
  xp += monsters[fighting].level;
  xpText.innerText = xp;
  if (xp % 2 === 0) {
    maxHealth += Math.floor((xp / 2) * 5);
  } else {
    maxHealth += Math.floor(((xp / 2) * 5) - 2);
  }
  monsterOff();
}

function lose() {
  monsterOff();
  gameOff();
  text.innerText = "You are defetead. You can't continue the advanture, you wont know what layes beyond."
}

function monsterDefeat() {
  text.innerText = monsters[fighting].deathText;
}


// afterMatch shoudl be a short text description of aftermatch of a fight and text that currently is displayed should be only avalible with Info function accessible from 3P-A

function afterMatchDummy() {
  text.innerText = "You have defeated the " + monsters[fighting].name + "!";
  text.innerText += " You have gained " + monsters[fighting].level + " experience points.";
  text.innerText += " You lost " + totalDmg + " points of your health.";
  text.innerText += "You gain experience in combat. You have stronger attacks and can take more dmg. Your Max Health is " + maxHealth + "."
}

function afterMatch() {
  text.innerText = "You have defeated the " + monsters[fighting].name + "!";
  text.innerText += " You have gained " + monsters[fighting].level + " experience points.";
  text.innerText += " You lost " + totalDmg + " points of your health.";
  text.innerText += "You gain experience in combat. You have stronger attacks and can take more dmg. Your Max Health is " + maxHealth + "."
}

function victory() {
  fighting == 0 ? seeGrandma() : empty();
  fighting == 1 ? beforeTheStorm() : empty();
  fighting == 2 ? goFurther() : empty();
  fighting == 3 ? goCamp() : empty();
  fighting == 4 ? winGame() : empty();
  fighting == 5 ? seeGrandma() : empty();
  button3.onclick = afterCombat;
  afterFight = true;
}

function afterCombat() {
  dexUpdate(dexType, 1);
}

function emptySlot() {
  text.innerText = "This slot is empty. Need a system upgrade.";
}

function crafting() {
  dexUpdate(dexType, 3);
}

function upgradeWeapon() {
  if (combat == true) {
    text.innerText = "You are in combat. There is big risk of damage while printing the item you selected. This option is locked."
  } else if (rDust == 0) {
    text.innerText = "You dont have resources to make this upgrade"
  } else {
    currentWeapon++;
    text.innerText = " A beam lines of light blue laser going out of uder the triple a's bottom, started to make a shape of some sort. It appears to be a " + weapons[currentWeapon].name;
    rDust--;
    rDustText.innerText = rDust;
  }
  updateDust();
}

function healing() {
  dexUpdate(dexType, 2);
}

function makeHealth() {
  if (combat == true) {
    text.innerText = "You are in combat. There is big risk of damage while printing the item you selected. This option is locked."
  } else if (cDust == 0) {
    text.innerText = "You dont have resources to make this cardridge. Its an emergency situation, so you grab few from the cart."
    cDust += 3;
  } else if (healCardrige == 5) {
    text.innerText = "You shouldnt spend all what you and Grandma have to survive. You have enough to midigate great amount of damage."
  } else {
    healCardrige++;
    hcText.innerText = healCardrige;
    cDust--;
    cDustText.innerText = cDust;
  }
  updateDust();
}

function heal() {
  if (health == maxHealth) {
    text.innerText = "Your health is full.";
  } else if (healCardrige == 0) {
    text.innerText = "Your cardrige slot is empty.";
  } else {
    // Calculate the actual amount of health restored
    const healthRestored = Math.min(80, maxHealth - health);

    health += healthRestored;

    healCardrige--;
    healthText.innerText = health;
    hcText.innerText = healCardrige;

    // Pass the actual amount of health restored to the updateHealth function
    updateHealth(healthRestored);
  }
}


function updateDust() {
  cDustText.innerText = cDust;
  rDustText.innerText = rDust;
  lDustText.innerText = lDust;

  if (cDust || rDust || lDust > 0) {
    dustText.style.display = "none";
  } else {
    dustText.style.display = "inline-block";
  }

  if (cDust == 0) {
    cDustText.style.display = "none";
  } else {
    cDustText.style.display = "inline-block";
    cDustText.style.color = "blue";
  }

  if (rDust == 0) {
    rDustText.style.display = "none";
  } else {
    rDustText.style.display = "inline-block";
    rDustText.style.color = "red";
  }

  if (lDust == 0) {
    lDustText.style.display = "none";
  } else {
    lDustText.style.display = "inline-block";
    lDustText.style.color = "green";
  }
}

function empty() {

}

function dmg() {

}

function snapOut() {
  currentLocation = 26;
  updateLocation(locations[currentLocation]);
}

function goFight0() {
  combat = true;
  fighting = 5;
  fightHealth = health;
  currentLocation = 27;
  updateLocation(locations[currentLocation]);
  monsterOn(fighting);
}

function getHomeScreenText() {
  return text.innerText = "Bipp! Boop! ... You see a " + weapons[currentWeapon].name + " displayed in your inventory. Your max health is " + maxHealth + ".";
}

// UI managing functions

function rightOn() {
  arrowRight.style.display = "flex";
}

function rightOff() {
  arrowRight.style.display = "none";
}

function gameOn() {
  buttons.style.display = "inline-block";
  stats.style.display = "flex";
  healthText.innerText = health;
  xpText.innerText = xp;
  hcText.innerText = healCardrige;
  cDustText.innerText = cDust;
  rDustText.innerText = rDust;
  lDustText.innerText = lDust;
}


function gameOff() {
  buttons.style.display = "none";
  stats.style.display = "none";
}

function monsterOn(fighting) {
  monsterStats.style.display = "flex";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealth = monsters[fighting].health;
  monsterHealthText.innerText = monsterHealth;
}

function monsterOff() {
  monsterStats.style.display = "none";
}

function storyMode() {
  monsterOff();
  gameOff();
  img.style.display = "none";
  text.style.display = "inline-block";
}


function storyOff() {
  text.style.display = "none";
}

function combatOn() {
  combat = true;
  fightHealth = health;
  totalDmg = 0;
}

// Story functions

// Chapter 1.

function start() {
  index.style.display = "none";
  storyMode();
  text.innerHTML = cutscene[0].text;
  rightOn();
  arrowRight.onclick = training;
  xp = 0;
  health = 100;
  maxHealth = 100;
  cDust = 0;
  rDust = 0;
  lDust = 0;
  healCardrige = 0;
  ammoCardrige = 0;
}


function training() {
  currentHeader = 1;
  headerText.innerText = headerLocations[currentHeader].title;
  updateLocation(locations[currentLocation]);
  gameOn();
  rightOff();
  updateDust();
}

function goFight() {
  combat = true;
  fighting = 0;
  fightHealth = health;
  currentLocation = 1;
  updateLocation(locations[currentLocation]);
  monsterOn(fighting);
}

function seeGrandma() {
  rightOn();
  arrowRight.onclick = kitchen;
}

function kitchen() {
  button3.innerText = "3P-A assist.";
  button3.onclick = assist;
  storyMode();
  currentHeader = 2;
  headerText.innerText = headerLocations[currentHeader].title;
  text.innerHTML = cutscene[1].text;
  arrowRight.onclick = preperation;
  dexUpdate();
}

function preperation() {
  currentHeader = 3;
  headerText.innerText = headerLocations[currentHeader].title;
  text.innerHTML = cutscene[2].text;
  arrowRight.onclick = departure;
}

function departure() {
  text.innerHTML = cutscene[3].text;
  arrowRight.onclick = theRoad;
  dexType = 1;
  healCardrige = 3;
  hcText.innerText = healCardrige;
  health = maxHealth;
  updateHealth();
}

// Chapter 2

function theRoad() {

  currentHeader = 4;
  header.innerText = headerLocations[currentHeader].title;
  rightOff();
  storyOff();
  img.style.display = "flex";
  road.style.display = "flex";
  road.onclick = theCrossroad;
}

function theCrossroad() {
  img.style.display = "none";
  road.style.display = "none";
  text.style.display = "inline-block";
  gameOn();
  text.innerHTML = locations[3].text;
  currentLocation = 3;
  updateLocation(locations[currentLocation]);
}

// the shortcut
function shortcut() {
  currentLocation = 4;
  currentHeader = 5;
  headerText.innerText = headerLocations[currentHeader].title;
  updateLocation(locations[currentLocation]);
}

function runaway() {
  health = health - 12;
  healthText.innerText = health;
  currentLocation = 16;
  updateLocation(locations[currentLocation]);
  updateHealth(-12);
}

function goFight2() {
  combatOn();
  fighting = 1;
  currentLocation = 6;
  updateLocation(locations[currentLocation]);
  monsterOn(fighting);
}

function beforeTheStorm() {
  rightOn();
  arrowRight.onclick = stormComing;
}

function stormComing() {
  button3.innerText = "3P-A assist.";
  button3.onclick = assist;
  storyMode();
  rightOn();
  text.innerHTML = cutscene[4].text;
  arrowRight.onclick = theStorm2;
}

function theStorm2() {
  storyMode();
  currentHeader = 7;
  headerText.innerText = headerLocations[currentHeader].title;
  text.innerHTML = cutscene[5].text;
  arrowRight.onclick = theCave;
}

// main road


function main() {
  currentLocation = 5;
  currentHeader = 6;
  headerText.innerText = headerLocations[currentHeader].title;
  updateLocation(locations[currentLocation]);
}

function calm() {
  currentLocation = 28;
  rightOn();
  arrowRight.onclick = theStorm1;
  updateLocation(locations[currentLocation]);
}

function theStorm1() {
  rpsMini.style.display = "none";
  grid.style.display = "none";
  storyMode();
  currentHeader = 7;
  headerText.innerText = headerLocations[currentHeader].title;
  text.innerHTML = cutscene[4].text;
  arrowRight.onclick = theCave;
}

// the cave

function theCave() {
  currentHeader = 8;
  header.innerText = headerLocations[currentHeader].title;
  rightOff();
  storyOff();
  img.style.display = "flex";
  cave.style.display = "flex";
  cave.onclick = caveEntrence;
}

// Chapter 3 Final

function caveEntrence() {
  storyMode();
  text.innerHTML = cutscene[5].text;
  rightOn();
  arrowRight.onclick = explore;
}

function explore() {
  text.style.display = "flex";
  game.style.display = "flex";
  rightOff();
  gameOn();
  currentLocation = 7;
  updateLocation(locations[currentLocation]);
  currentHeader = 9;
  header.innerText = headerLocations[currentHeader].title;
}

function corridor() {
  currentHeader = 10;
  header.innerText = headerLocations[currentHeader].title;
  if (xp > 45) {
    currentLocation = 23;
    updateLocation(locations[currentLocation]);
  } else {
    currentLocation = 8;
    updateLocation(locations[currentLocation]);
  }
}

function goFight3() {
  if (sEggs == 0) {
    combatOn();
    fighting = 2;
    currentLocation = 9;
    updateLocation(locations[currentLocation]);
    monsterOn(fighting);
  } else if (sEggs == 1) {
    combatOn();
    fighting = 2;
    currentLocation = 9;
    updateLocation(locations[currentLocation]);
    monsterOn(fighting);
    text.innerText = "You didnt learn the last time.";
  } else if (sEggs == 2) {
    empty();
    text.innerText = "Lucky you, No more eggs that was ready to hatch. Ouff";
    goFurther();
  }

  sEggs++;
}

function goFurther() {
  rightOn();
  arrowRight.onclick = further;
}

function further() {
  button3.innerText = "3P-A assist.";
  button3.onclick = assist;
  rightOff();
  currentLocation = 10;
  updateLocation(locations[currentLocation]);
}

function cocoon() {
  if (rDust == 1 || currentWeapon == 1) {
    triggerEvent4();
  } else {
    currentLocation = 11;
    updateLocation(locations[currentLocation]);
  }
}

function triggerEvent4() {
  rightOn();
  arrowRight.onclick = goFight4;
  currentLocation = 25;
  updateLocation(locations[currentLocation]);
}

function takeDex() {
  currentLocation = 17;
  updateLocation(locations[currentLocation]);
}

function takeDex2() {
  currentLocation = 20;
  updateLocation(locations[currentLocation]);
}

function takeDust() {
  currentLocation = 18;
  updateLocation(locations[currentLocation]);
  rDust++;
  updateDust();
}
// dust
function takeDust2() {
  currentLocation = 21;
  updateLocation(locations[currentLocation]);
  rDust++;
  updateDust();
}

function emptyCocoon() {
  currentLocation = 19;
  updateLocation(locations[currentLocation]);
  rightOn();
  arrowRight.onclick = instalDex;
}

function instalDex() {
  storyMode();
  text.innerHTML = cutscene[9].text;
  arrowRight.onclick = loopingCave;
  dexType = 2;
  dexInstal = true;
}

function goFight4() {
  combatOn();
  fighting = 3;
  currentLocation = 12;
  updateLocation(locations[currentLocation]);
  monsterOn(fighting);
}

function goCamp() {
  rightOn();
  arrowRight.onclick = loopingCave;
}

function loopingCave() {
  button3.innerText = "3P-A assist.";
  button3.onclick = assist;
  currentHeader = 9;
  headerText.innerText = headerLocations[currentHeader].title;
  rightOff();
  gameOn();
  currentLocation = 22;
  updateLocation(locations[currentLocation]);
}

function mainHall() {
  currentHeader = 11
  headerText.innerText = headerLocations[currentHeader].title;
  if (xp < 44) {
    currentLocation = 24;
    updateLocation(locations[currentLocation]);
  } else {
    currentLocation = 13;
    updateLocation(locations[currentLocation]);
    rightOff();
  }
}

function finalBoss() {
  currentHeader = 10
  headerText.innerText = headerLocations[currentHeader].title;
  currentLocation = 14;
  updateLocation(locations[currentLocation]);
}

function goFight5() {
  rightOff();
  combatOn();
  currentLocation = 15;
  updateLocation(locations[currentLocation]);
  fighting = 4;
  monsterOn(fighting);
}

function winGame() {
  rightOn();
  arrowRight.onclick = deadQueen;
}

function deadQueen() {
  storyMode();
  text.innerHTML = cutscene[6].text;
  arrowRight.onclick = theEgg;
  rightOn();
}

function theEgg() {
  currentHeader = 12;
  headerText.innerText = headerLocations[currentHeader].title;
  text.innerHTML = cutscene[7].text;
  arrowRight.onclick = theEnd;
}

function theEnd() {
  text.innerHTML = cutscene[8].text;
  rightOff();
}

function rps() {
  text.style.display = "none";
  game.style.display = "none";
  monsterStats.style.display = "none";
  stats.style.display = "none";
  rpsMini.style.display = "flex";
  RPS();
}

function ttt() {
  text.style.display = "none";
  game.style.display = "none";
  monsterStats.style.display = "none";
  stats.style.display = "none";
  grid.style.display = "flex";
  TTT();
}

function goBack() {
  currentLocation = 28;
  updateLocation(locations[currentLocation]);
  rpsMini.style.display = "none";
  grid.style.display = "none";
}

