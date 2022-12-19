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
				.wrapper {
					display: flex;
					flex-direction: column;
					justify-content: center;
				}
				.level-groups {
					display: flex;
				}
				.level-group {
					display: flex;
					flex-direction: column;
				}
				.level-input {
					appearance: textfield;
					width: 100%;
					margin: 0;
					border: 0;
					text-align: center;
				}
			</style>
			<div class="wrapper">
				<div class="level-groups">
					<div class="level-group">
						<h3>Level</h3>
						<button id="level-increase">+</button>
						<input class="level-input" id="level-count" type="number" value=${
							this.levelcount
						} />
						<button id="level-decrease">-</button>
					</div>
					<div class="level-group">
						<h3>Items</h3>
						<button id="item-increase">+</button>
						<input class="level-input" id="item-count" type="number" value=${
							this.itemcount
						} />
						<button id="item-decrease">-</button>
					</div>
				</div>
				${this.showremovebutton ? '<button id="remove">Remove</button>' : ""}
			</div>
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
