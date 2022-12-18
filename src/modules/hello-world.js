export class HelloWorld extends HTMLElement {
	constructor() {
		super();
		this.count = 0;
	}

	connectedCallback() {
		this.innerHTML = `
			<style>
				button {
					background: #1E88E5;
					color: white;
					padding: 2rem 4rem;
					border: 0;
					font-size: 1.5rem;
				}
			</style>
			<button>Hello world: ${this.count}</button>
		`;

		this.querySelector("button").addEventListener("click", () => {
			this.count++;
			console.log(this.count);
			this.updateCount();
		});
	}

	updateCount() {
		this.querySelector("button").innerHTML = `Hello world: ${this.count}`;
	}
}
