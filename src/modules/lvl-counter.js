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
					flex-grow: 1;
					position: relative;
				}
				.level-group:first-child {
					border-right: 1px solid black;
				}
				.level-input {
					appearance: textfield;
					-webkit-appearance: textfield;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translateY(-50%) translateX(-50%);
					width: 3rem;
					height: 3rem;
					margin: 0;
					border: 0;
					border-radius: 50%;
					text-align: center;
					background: rgba(0,0,0,0.5);
					color: white;
					z-index: 1;
				}
				.level-input::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
				.increase, .decrease {
					height: 25vh;
					position: relative;
					border: 0;
				}
				.increase {
					background: #BEEF9E;
				}
				.decrease {
					background: #DB5A42;
				}
				h3 {
					position: absolute;
					left: 0;
					top: 0;
				}
				.remove {
					border: none;
					height: 2.5rem;
					margin-bottom: 10px;
				}
				.triangle {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					max-width: 55%;
					max-height: 55%;
					opacity: 0.3;
				}
			</style>
			<div class="wrapper">
				<div class="level-groups">
					<div class="level-group">
						<h3>Level</h3>
						<button id="level-increase" class="increase">
							<svg class="triangle" viewBox="0 0 300 150">
								<polygon points="150 0, 300 150, 0 150"></polygon>
							</svg>
						</button>
						<input class="level-input" id="level-count" type="number" value=${
							this.levelcount
						} />
						<button id="level-decrease" class="decrease">
							<svg class="triangle" viewBox="0 0 300 150">
								<polygon points="150 150, 300 0, 0 0"></polygon>
							</svg>
						</button>
					</div>
					<div class="level-group">
						<h3>Items</h3>
						<button id="item-increase" class="increase">
							<svg class="triangle" viewBox="0 0 300 150">
								<polygon points="150 0, 300 150, 0 150"></polygon>
							</svg>
						</button>
						<input class="level-input" id="item-count" type="number" value=${
							this.itemcount
						} />
						<button id="item-decrease" class="decrease">
							<svg class="triangle" viewBox="0 0 300 150">
								<polygon points="150 150, 300 0, 0 0"></polygon>
							</svg>
						</button>
					</div>
				</div>
				${
					this.showremovebutton
						? '<button id="remove" class="remove">Remove</button>'
						: ""
				}
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
