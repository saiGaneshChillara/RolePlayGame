let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let mosterHealth;
let inventory = ["stick"];

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");
const monsterStats = document.getElementById("monsterStats");
const monsterName = document.getElementById("monsterName");
const monsterHealthText = document.getElementById("monsterHealth");
const weapons = [
    {
        name: 'stick', power: 5
    }, {
        name: 'dagger', power: 30
    }, {
        name: 'claw hammer', power: 50
    }, {
        name: 'sword', power: 100
    }
];
const monsters = [
    {
        name: 'Slime',
        level: 2,
        health: 15
    }, {
        name: 'Fanged Beast',
        level: 8,
        health: 60
    }, {
        name: 'Dragon',
        level: 20,
        health: 300
    }
];
const locations = [
    {
        name: "Town Square",
        "button text": ['Go to Store', 'Go to cave', 'Fight the Dragon'],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the Town Square. Go to store to upgrade your self."
    }, {
        name: 'Store',
        "button text": ['Buy 10 health for 10 Gold', 'Buy a weapon for 30 Gold', 'Go back to Town Square'],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You are in the Store buy what you want!"
    }, {
        name: 'Cave',
        "button text": ['Fight Slime', 'Fight Fanged Beast', 'Go to Town Square'],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You are in the cave. You see some monsters. Fight them or return to the Town Square."
    }, {
        name: 'Fight',
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster"
    }, {
        name: "Kill Monster",
        "button text": ['Go to Town Square', "Go to Town Square", "Go to town Square"],
        "button functions": [goTown, goTown, goTown],
        text: "The monster screams 'Ahh!' and dies. You gain some xp and some gold. Congratulations..."
    }, {
        name: "Lose",
        "button text": ['REPLAY', 'REPLAY', 'REPLAY'],
        "button functions": [restart, restart, restart],
        text: "You lost. Don't worry you can replay.."
    }, {
        name: "Win",
        "button text": ['REPLAY', 'REPLAY', 'REPLAY'],
        "button functions": [restart, restart, restart],
        text: "Hurraay! You won. Congratulations !!..."
    }, {
        name: 'Easter Egg',
        "button text": ['2', '8', 'Go to Town Sqaure'],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You entered a secret place. Pick a number from above. Ten numbers will be genereated randomly and if your number is there in those numbers you will recieve a huge reward.."
    }

];
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location['button text'][0];
    button2.innerText = location['button text'][1];
    button3.innerText = location['button text'][2];
    button1.onclick = location['button functions'][0];
    button2.onclick = location['button functions'][1];
    button3.onclick = location['button functions'][2];
    text.innerText = location['text'];
}

function goStore() {
    update(locations[1]);
}
function goCave() {
    update(locations[2]);
}
function fightDragon() {
    fighting = 2;
    goFight();
}
function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        goldText.innerText = gold;
        health += 10;
        healthText.innerText = health;
    } else {
        text.innerText = "You don't have enough money to buy health...";
    }
}
function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >=30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = `Now you have ${newWeapon}`;
            inventory.push(newWeapon);
            text.innerText += ` This is your inventory ${inventory}`;
        } else {
            text.innerText = "You don't have enough gold to buy the new weapon come after earning some...";
        }
    } else {
        text.innerText = "You already have the most powerful Weapon";
        button2.innerText = "Sell Weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}
function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = `You sold your ${currentWeapon}`;
        text.innerText += ` Now you have ${inventory}`;
    } else {
        text.innerText = "You can't sell your only weapon";
    }
}
function goTown() {
    update(locations[0]);
}
function fightSlime() {
    fighting = 0;
    goFight();
}
function fightBeast() {
    fighting = 1;
    goFight();
}
function goFight() {
    update(locations[3]);
    mosterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = mosterHealth;
}
function attack() {
    text.innerText = `The ${monsters[fighting].name} attacks. You attack with your ${weapons[currentWeapon].name}.`;
    health -= getMonsterAttackValue(monsters[fighting].level);
    if (isMonsterHit()) {
        mosterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    } else {
        text.innerText = "You missed your shot..";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = mosterHealth;
    if (health <= 0) {
        lose();
    } else  if (mosterHealth <= 0) {
        fighting == 2 ? winGame() : defeatMonster();
    }
    if (Math.random() <= .1 && inventory.length !==1 ){
        text.innerText += `Your ${inventory.pop()} breaks.`;
        currentWeapon--;
    }
}
function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit > 0 ? hit : 0;
}
function isMonsterHit() {
    return Math.random() > 0.2 || health < 20;
}
function dodge() {
    text.innerText = `You dodged the attack from the ${monsters[fighting].name}`;
}
function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
function lose() {
    update(locations[5]);
}
function winGame() {
    update(locations[6]);
}
function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory =['stick'];
    goldText.innerText = gold;
    xpText.innerText = xp;
    healthText.innerText = health;
    goTown();
}
function eastEgg() {
    update(locations[7]);
}
function pickEight() {
    pick(8);
}
function pickTwo() {
    pick(2)
}
function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = `You picked ${guess}. Here are the random numbers generated`;
    for (let i = 0; i < numbers.length; i++) {
        text.innerText += '\n' + numbers[i];
    }
    if (numbers.indexOf(guess) !== -1) {
        text.innerText += '\n Right! you win 20 gold';
        gold+=20;
        goldText.innerText = gold;
    } else {
        text.innerText += "\n Wrong You lose 10 health";
        health -= 10;
        healthText.innerText = health;
        if(health <= 0) {
            lose();
        }
    }
}