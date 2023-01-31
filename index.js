/**
 * Super Class
 */
class ServerLeaseComponent extends HTMLElement {
	baseUrl = 'http://13.209.218.50:8000';

	connectedCallback() {
		this.setTemplate();
		this.initialize();
	}

	attributeChangedCallback() {
		this.initialize();
	}

	async initialize() {
		this.setMeta();
		this.setData(await this.fetchData());
	}

	render() {
		this.innerHTML = this.applyTemplate(this.data);
	}

	setMeta() {
		Object.keys(this.dataset).forEach((key) => {
			this[key] = this.dataset[key];
		});
	}

	setData(data) {
		this.data = data;
		this.render();
	}

	setTemplate() {
		this.template = this.innerHTML;
	}

	fetchData() {}

	applyTemplate() {}
}

/**
 * Board
 */
class ServerLeaseBoard extends ServerLeaseComponent {
	static get observedAttributes() {
		return ['data-board-id', 'data-board-page'];
	}

	applyTemplate(data) {
		return data.items.reduce(
			(acc, item) =>
				acc +
				Object.keys(item).reduce(
					(acc, key) => acc.replaceAll(`{{ %% BOARD_POST_${key.toUpperCase()} %% }}`, item[key]),
					this.template,
				),
			'',
		);
	}

	fetchData() {
		return fetch(`${this.baseUrl}/${this.boardId}?page=${this.boardPage}`) //
			.then((res) => res.json());
	}
}

/**
 * View
 */
class ServerLeaseView extends ServerLeaseComponent {
	static get observedAttributes() {
		return ['data-board-id', 'data-view-id'];
	}

	applyTemplate(data) {
		return Object.keys(data).reduce(
			(acc, key) => acc.replaceAll(`{{ %% VIEW_POST_${key.toUpperCase()} %% }}`, data[key]),
			this.template,
		);
	}

	fetchData() {
		return fetch(`${this.baseUrl}/${this.boardId}/${this.viewId}`) //
			.then((res) => res.json());
	}
}

const getUrlParam = (param) => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	return urlParams.get(param);
};

const viewElem = document.getElementsByTagName('server-lease-view')[0];
if (viewElem) viewElem.dataset.viewId = getUrlParam('id');

const boardElem = document.getElementsByTagName('server-lease-board')[0];
if (boardElem) {
	const page = getUrlParam('page');
	if (page) boardElem.dataset.boardPage = page;
	else boardElem.dataset.boardPage = 1;
}

customElements.define('server-lease-view', ServerLeaseView);
customElements.define('server-lease-board', ServerLeaseBoard);
