export class LvlCounter extends HTMLElement {
	onLevelIncrease;
	onLevelDecrease;
	onItemIncrease;
	onItemDecrease;
	onChange;
	onRemove;

	constructor() {
		super();

		this.levelcount = this.getAttribute("levelcount");
		this.itemcount = this.getAttribute("itemcount");
		this.totalcount = this.getAttribute("totalcount");
		this.showremovebutton = this.getAttribute("showremovebutton");
	}

	static get observedAttributes() {
		return ["levelcount", "itemcount", "totalcount", "showremovebutton"];
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this[name] = newValue;
		this.render();
	}

	render() {
		this.innerHTML = `
			<style>
				button {
					
				}
			</style>
			<div>
				<h3>Level</h3>
				<button id="level-decrease">-</button>
				<input id="level-count" type="number" value=${this.levelcount} />
				<button id="level-increase">+</button>
			</div>
			<div>
				<h3>Items</h3>
				<button id="item-decrease">-</button>
				<input id="item-count" type="number" value=${this.itemcount} />
				<button id="item-increase">+</button>
			</div>
			${this.showremovebutton ? '<button id="remove">Remove</button>' : ""}
		`;

		this.querySelector("#level-increase").addEventListener(
			"click",
			this.onLevelIncrease
		);
		this.querySelector("#level-decrease").addEventListener(
			"click",
			this.onLevelDecrease
		);
		this.querySelector("#level-count").addEventListener(
			"change",
			this.onLevelCountChange
		);
		this.querySelector("#item-increase").addEventListener(
			"click",
			this.onItemIncrease
		);
		this.querySelector("#item-decrease").addEventListener(
			"click",
			this.onItemDecrease
		);
		this.querySelector("#item-count").addEventListener(
			"change",
			this.onItemCountChange
		);
		this.querySelector("#remove")?.addEventListener("click", this.onRemove);
	}
}
