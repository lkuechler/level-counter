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

		this.attachShadow({ mode: "open" });
	}

	static get observedAttributes() {
		return ["levelcount", "itemcount", "totalcount", "showremovebutton"];
	}

	connectedCallback() {
		this.render();
		this.updateFontsizeOfLevelInputs();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this[name] = newValue;
		const levelCount = this.shadowRoot.getElementById("level-count");
		const itemCount = this.shadowRoot.getElementById("item-count");

		if (name === "levelcount" && levelCount) {
			levelCount.value = newValue;
			return;
		}
		if (name === "itemcount" && itemCount) {
			itemCount.value = newValue;
			return;
		}

		this.render();
	}

	updateFontsizeOfLevelInput(levelInput) {
		const height = levelInput.getBoundingClientRect().height;
		const width = levelInput.getBoundingClientRect().width;
		levelInput.style.fontSize =
			width > height ? `${height * 0.8}px` : `${width * 0.4}px`;
	}

	updateFontsizeOfLevelInputs() {
		const levelInputs = this.shadowRoot.querySelectorAll(".level-input");
		levelInputs?.forEach((levelInput) =>
			this.updateFontsizeOfLevelInput(levelInput)
		);
	}

	render() {
		this.shadowRoot.innerHTML = `
			<style>
				.wrapper {
					overflow: hidden;
					display: flex;
					flex-direction: column;
					justify-content: center;
					box-shadow: 0px 4px 10px rgba(0,0,0,.3);
					margin-bottom: 15px;
					border-radius: 15px;
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
					border-right: 1px solid whitesmoke;
				}
				.level-input {
					appearance: textfield;
					-webkit-appearance: textfield;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translateY(-50%) translateX(-50%);
					margin: 0;
					border: 0;
					text-align: center;
					background: whitesmoke;
					width: 50%;
					height: 20%;
					border-radius: 15px;
					font-size: 2.5em;
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
					margin: 0;
					touch-action: manipulation;
				}
				.increase {
					background: #BEEF9E;
				}
				.increase svg, .decrease svg {
					display: block;
					width: 90%;
					height: 90%;
					margin: 0 auto;
					fill: whitesmoke;
				}
				.decrease {
					background: #DB5A42;
				}
				.increase:active:after, .decrease:active:after {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: rgba(0,0,0,.05);
				}
				h3 {
					position: absolute;
					left: 0;
					top: 0;
					opacity: 0;
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
							<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M8.12 14.71L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.39-.39-1.02-.39-1.41 0L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.38 1.03.39 1.42 0z"/></svg>
						</button>
						<input class="level-input" id="level-count" type="number" value=${
							this.levelcount
						} />
						<button id="level-decrease" class="decrease">
							<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"/></svg>
						</button>
					</div>
					<div class="level-group">
						<h3>Items</h3>
						<button id="item-increase" class="increase">
							<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M8.12 14.71L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.39-.39-1.02-.39-1.41 0L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.38 1.03.39 1.42 0z"/></svg>
						</button>
						<input class="level-input" id="item-count" type="number" value=${
							this.itemcount
						} />
						<button id="item-decrease" class="decrease">
							<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"/></svg>
						</button>
					</div>
				</div>
				${
					this.showremovebutton
						? '<duck-button id="remove" class="remove">Remove</duck-button>'
						: ""
				}
			</div>
		`;

		this.shadowRoot
			.querySelector("#level-increase")
			.addEventListener("click", this.onLevelIncrease);
		this.shadowRoot
			.querySelector("#level-decrease")
			.addEventListener("click", this.onLevelDecrease);
		this.shadowRoot
			.querySelector("#level-count")
			.addEventListener("change", this.onLevelCountChange);
		this.shadowRoot
			.querySelector("#item-increase")
			.addEventListener("click", this.onItemIncrease);
		this.shadowRoot
			.querySelector("#item-decrease")
			.addEventListener("click", this.onItemDecrease);
		this.shadowRoot
			.querySelector("#item-count")
			.addEventListener("change", this.onItemCountChange);
		this.shadowRoot
			.querySelector("#remove")
			?.addEventListener("click", this.onRemove);
		window.addEventListener("resize", () => {
			this.updateFontsizeOfLevelInputs();
		});
	}
}
