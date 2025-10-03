export class Button extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
	}

	static get observedAttributes() {
		return [];
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = `
			<style>
				button {
					border: none;
					height: 2.5rem;
					width: 100%;
					background: transparent;
					color: var(--highlight-color);
					cursor: pointer;
				}
			</style>
			<button><slot></slot></button>
		`;
	}
}