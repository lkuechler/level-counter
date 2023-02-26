import { Button } from "./modules/button.js";
import { LvlCounter } from "./modules/lvl-counter.js";

// install service worker
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/serviceworker.js");
}

customElements.define("duck-button", Button);
customElements.define("duck-lvlcounter", LvlCounter);

const heroWrapper = document.querySelector(".heroWrapper");
const monstersWrapper = document.querySelector(".monsterWrapper");
const addHeroButton = document.querySelector(".addHero");
const addMonsterButton = document.querySelector(".addMonster");
const heroCombatPowerElement = document.querySelector(".heroCombatPower");
const monsterCombatPowerElement = document.querySelector(".monsterCombatPower");

const heroes = JSON.parse(window.localStorage.getItem("heroes")) || [
	{ levelcount: 0, itemcount: 0 },
];
const monsters = JSON.parse(window.localStorage.getItem("monsters")) || [
	{ levelcount: 0, itemcount: 0 },
];

addHeroButton.addEventListener("click", () => {
	heroes.push({ levelcount: 0, itemcount: 0 });
	update();
	generateLvlCounters(heroes, heroWrapper);
});
addMonsterButton.addEventListener("click", () => {
	monsters.push({ levelcount: 0, itemcount: 0 });
	update();
	generateLvlCounters(monsters, monstersWrapper);
});

const update = () => {
	updateLocalStorage();

	let heroCombatPower = 0;
	heroes.forEach((hero) => {
		heroCombatPower += hero.levelcount + hero.itemcount;
	});
	heroCombatPowerElement.innerHTML = heroCombatPower;

	let monsterCombatPower = 0;
	monsters.forEach((monster) => {
		monsterCombatPower += monster.levelcount + monster.itemcount;
	});
	monsterCombatPowerElement.innerHTML = monsterCombatPower;
};

const updateLocalStorage = () => {
	window.localStorage.setItem("heroes", JSON.stringify(heroes));
	window.localStorage.setItem("monsters", JSON.stringify(monsters));
};

const generateLvlCounters = (counters, target) => {
	target.innerHTML = "";

	counters.forEach((counter, index) => {
		const lvlcounter = document.createElement("duck-lvlcounter");

		lvlcounter.onLevelIncrease = () => {
			counter.levelcount++;
			lvlcounter.setAttribute("levelcount", counter.levelcount);
			update();
		};
		lvlcounter.onLevelDecrease = () => {
			counter.levelcount--;
			lvlcounter.setAttribute("levelcount", counter.levelcount);
			update();
		};
		lvlcounter.onLevelCountChange = (event) => {
			counter.levelcount = Number.parseInt(event.target.value);
			update();
		};
		lvlcounter.onItemIncrease = () => {
			counter.itemcount++;
			lvlcounter.setAttribute("itemcount", counter.itemcount);
			update();
		};
		lvlcounter.onItemDecrease = () => {
			counter.itemcount--;
			lvlcounter.setAttribute("itemcount", counter.itemcount);
			update();
		};
		lvlcounter.onItemCountChange = (event) => {
			counter.itemcount = Number.parseInt(event.target.value);
			update();
		};
		lvlcounter.onRemove = () => {
			counters.splice(index, 1);
			update();
			generateLvlCounters(monsters, monstersWrapper);
			generateLvlCounters(heroes, heroWrapper);
		};

		lvlcounter.setAttribute("levelcount", counter.levelcount);
		lvlcounter.setAttribute("itemcount", counter.itemcount);

		if (counters.length > 1) {
			lvlcounter.setAttribute("showremovebutton", true);
		}

		target.append(lvlcounter);
	});
};

update();
generateLvlCounters(monsters, monstersWrapper);
generateLvlCounters(heroes, heroWrapper);
