/*
	Matthew Reynolds
	891635
	07-10-2024
	CS 81 - 1242
	Final Project
	Webpage Builder App

*/

import {
	ClassicEditor,
	GeneralHtmlSupport,
	Essentials,
	Alignment,
	AutoLink,
	Bold,
	Heading,
	Indent,
	IndentBlock,
	Italic,
	Link,
	Paragraph,
	SourceEditing,
	SpecialCharacters,
	Underline,
	Undo
} from 'ckeditor5';

//setup globals
window.currentView = null;
//let currentView = window.currentView;

//setup utils
const generateUUID = () => {
	// Generate a random UUID
	const random_uuid = uuidv4();
	// Print the UUID
	console.log(random_uuid);
	function uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
		.replace(/[xy]/g, function (c) {
			const r = Math.random() * 16 | 0, 
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
	return random_uuid
};


//setup SPA router
console.debug('location', location);
const hashToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
//console.debug('hashToRegex(route.path)', hashToRegex(location.hash));
const getParams = match => {
	const values = match.result.slice(1);
	const keys = Array.from(match.route.hash.matchAll(/:(\w+)/g)).map(result => result[1]);
	//console.debug('values, keys', {values,keys});
	return Object.fromEntries(keys.map((key, i) => {
			return [key, values[i]];
	}));
};
const navigateTo = url => {
	history.pushState(null, null, url);
	router();
};
const router = async () => {
	const routes = [
		{ hash: '', view: HomeView },
		{ hash: '#editor', view: EditorView },
		//{ hash: "#settings", view: SettingsView }
	];
	// Test each route for potential match
	const potentialMatches = routes.map(route => {
		return {
			route: route,
			result: location.hash.match(hashToRegex(route.hash))
		};
	});
	//console.debug('potentialMatches', potentialMatches);
	let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
	//console.debug('router match', match);
	if (!match) {
		match = {
			route: routes[0],
			result: [location.hash]
		};
	}
	const view = new match.route.view(getParams(match));
	window.currentView = view;
	console.debug('view', view);
	//handle nav menu UI updates
	const navMenuActiveClassName = 'active';
	const navMenuItems = document.getElementsByClassName('app-sidebar-menu')[0].children;
	//console.debug('navMenuItems', navMenuItems);
	for (const navMenuItem of navMenuItems) {
		//console.debug('navMenuItem', navMenuItem);
		//console.debug('match.result[0]', match.result[0]);
		if (navMenuItem.hash === match.result[0]) {
			//console.debug('navMenuItem - found');
			navMenuItem.classList.add(navMenuActiveClassName)
		} else if (navMenuItem.classList.contains(navMenuActiveClassName)) {
			navMenuItem.classList.remove(navMenuActiveClassName)
		}
	}
	document.querySelector('#app').innerHTML = await view.getHtml();
};
window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', () => {
	document.body.addEventListener('click', e => {
		if (e.target.matches('[router-link]')) {
			e.preventDefault();
			navigateTo(e.target.href);
		}
	});
	router();
});
//end router


//setup views
class BaseView {
	constructor(params, title) {
		this.params = params;
		this.title = title;
	}

	setTitle(title) {
		this.title = title;
		document.title = title;
	}
	

	async getHtml() {
		return '';
	}
}
//home view
class HomeView extends BaseView {
	constructor(params) {
		super(params);
		this.setTitle('Home');
	}

	async getHtml() {
		return /* HTML */`
			<main class="ui segment basic">
				<div class="ui container text">
					<header>
						<h1 class="ui header">Welcome to Matthew Reynolds Final Project - Webpage Builder App</h1>
					</header>
					<div class="ui segment basic" style="padding: 0;">
						<section style="margin-top: 2rem;">
							<p>For my Final Project I built a JavaScript Single Page Application that provides users with a Dashboard interface to dynamically create a simple webpage that is able to be previewed and exported as static HTML to host with a simple web server.</p>

							<p>My goal is to use as much vanilla JavaScript (ES6) as possible, while some third-party requirements need jQuery to function correctly, my custom application code will include as little usage of non-vanilla JS as possible.</p>

							<p>I've also used SASS, specifically SCSS, to more quickly build out my CSS stylesheets for a better developer experience. The SASS build process uses a VS Code extension rather than a build system like webpack.</p>
							
							<p>I wanted to focus on the JS application functionality rather than the underlying base-line code that would require creating a lot of elements and styles from scratch, so I utilized the Semantic UI framework to quickly access and add basic functionality to the application. Core application functionality for webpage editing is written without the help of any frameworks.</p>

							<p>My goal is to give users an interface to reconstruct the <a href="https://semantic-ui.com/examples/homepage.html" target="_blank">Starter page template "Homepage"</a> from <a href="https://semantic-ui.com/usage/layout.html" target="_blank">Semantic UI Layouts</a> and edit it with their content and allow users to preview and export the generated HTML.</p>

							<p>I created a demo screen capture of using the Webpage Builder App to recreate and edit the page to demonstrate the app features.</p>
							<a class="ui green labeled icon button" href="https://drive.google.com/file/d/1qVKrT7s0SQi0lkbJqPubazLbcQC-B5j9/view?usp=drive_link" target="_blank">
								<i class="video icon"></i>
								Watch the Demo
							</a>
							<br/>
							<a class="ui primary labeled icon button" style="margin-top: 2rem;" href="/index.html#editor" router-link>
								<i class="rocket icon"></i>
								Build Your Webpage Now!
							</a>
						</section>
						<section class="ui segment" style="margin-top: 4rem;">
							<div class="ui medium header">Technologies Used:</div>
							<div class="ui horizontal list selection">
								<a href="https://code.visualstudio.com/" target="_blank" class="item">
									<img class="ui image mini" src="./images/brand-icons/vscode.png">
									<div class="content">
										<div class="header">VS Code</div>
									</div>
								</a>
								<a href="https://plainjs.com/" target="_blank" class="item">
									<img class="ui avatar image" src="./images/brand-icons/icons8-javascript-480.png">
									<div class="content">
										<div class="header">JavaScript</div>
									</div>
								</a>
								<a href="https://sass-lang.com/" target="_blank" class="item">
									<img class="ui avatar image" src="./images/brand-icons/icons8-sass-480.png">
									<div class="content">
										<div class="header">Sass/Scss</div>
									</div>
								</a>
								<a href="https://semantic-ui.com/" target="_blank" class="item">
									<img class="ui avatar image" src="./images/brand-icons/sui-logo.png">
									<div class="content">
										<div class="header">Semantic UI</div>
									</div>
								</a>
								<a href="https://ckeditor.com/" target="_blank" class="item">
									<img class="ui image tiny" src="./images/brand-icons/ckeditor-seeklogo.svg">
									<div class="content">
										<div class="header">CK Editor 5</div>
									</div>
								</a>
							</div>
						</section>
					</div>
				</div>
			</main>
		`;
	}
}
//editor view
class EditorView extends BaseView {
	constructor(params) {
		super(params);
		this.setTitle('Webpage Editor');
		this.pageSections = {}; //use a hash table to keep track of all page sections created
		this.selectedPageSection = null; //keep track of the currently selected page section for editing
		this.editorDomLocation = null
	}

	//handle adding new page sections to the page
	addPageSection = async (pageSectionTitle) => {
		console.log('addPageSection - pageSectionTitle', pageSectionTitle);
		//get the editor location in the DOM to work with
		this.editorDomLocation = document.getElementById('browser-window-content');
		const editorDomLocation = document.getElementById('browser-window-content');
		console.log('addPageSection - editorDomLocation', editorDomLocation);
		//test for tutorial text to remove
		const tutorialDomLocation = editorDomLocation.querySelector('#tutorial-1');
		console.log('addPageSection - tutorialDomLocation', tutorialDomLocation);
		//setup a variable to hold the result of switch case
		let newSection
		//based on the Page Section Title selected, add that section to the editor if it exists
		switch (pageSectionTitle) {
			case 'masthead':
				newSection = new SectionMasthead;
				break;
			case 'two-column-grid':
				newSection = new SectionTwoColumnGrid;
				break;
			case 'quote-block':
				newSection = new SectionQuoteBlock;
				break;
			case 'divided-content':
				newSection = new SectionDividedContent;
				break;
			case 'footer':
				newSection = new SectionFooter;
				break;
			default:
				alert(`Sorry, ${pageSectionTitle} doesn't exist.`);
		}
		//test if a newSection is found and loaded
		if (typeof newSection !== 'undefined') {
			console.log('newSection', newSection);
			//test for tutorial text to remove
			if (tutorialDomLocation !== null) {
				console.log('addPageSection - remove tutorialDomLocation - #tutorial-1');
				//remove the tutorial element from the DOM
				tutorialDomLocation.remove();
			}
			//add the new section to the editor DOM
			editorDomLocation.innerHTML += await newSection.getHtml();
			//update pageSections hash table
			this.pageSections[newSection.uuid] = newSection;
			console.log('this.pageSections', this.pageSections);
			//iterate all page sections to update their DOM location
			for (let section in this.pageSections) {
				console.log('update all sections dom', this.pageSections[section]);
				this.pageSections[section].setDOM();
			}
		}
	};

	dataToHtml = (pageData) => {
		let html = `
			<html>
				<head>
					<meta charset="UTF-8">
					<title>${pageData.title}</title>
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.5.0/dist/semantic.min.css">
				</head>
				<body>
					${pageData.htmlContent.map((sectionHtml) => sectionHtml.outerHTML).join("")}
				</body>
			</html>
		`;
		const blob = new Blob([html], { type: "text/html" });
		const blobUrl = URL.createObjectURL(blob);
		return blobUrl
		//window.open(blobUrl, "_blank");
	};

	launchPreviewPage = () => {
		console.log('launchPreviewPage', this);
		if (this.editorDomLocation && this.editorDomLocation.children) {
			let pageData = {
				title: this.title,
				htmlContent: Array.from(this.editorDomLocation.children)
			}
			console.log('launchPreviewPage - pageData', pageData);
			let previewData = this.dataToHtml(pageData);
			console.log('launchPreviewPage - previewData', previewData);
			window.open(previewData, "_blank");
		} else {
			alert('Add some page sections first!');
		}
	}

	exportPage = () => {
		//get the button element where the function call came from
		console.log('exportPage');
		if (this.editorDomLocation && this.editorDomLocation.children) {
			//create a pseduo element
			const a = document.createElement('a');
			let pageData = {
				title: this.title,
				htmlContent: Array.from(this.editorDomLocation.children)
			}
			console.log('exportPage - pageData', pageData);
			let htmlDataBlobUrl = this.dataToHtml(pageData);
			console.log('exportPage - htmlDataBlobUrl', htmlDataBlobUrl);
			//update element attributes
			a.href = htmlDataBlobUrl;
			a.download = `index.html`;
			//setup a click handler that can be destroyed
			const clickHandler = () => {
				setTimeout(() => {
					URL.revokeObjectURL(htmlDataBlobUrl);
					removeEventListener('click', clickHandler);
				}, 150);
			};
			a.addEventListener('click', clickHandler, false);
			//call the click handler programmatically
			a.click();
			//remove the pseduo element
			a.remove();
		} else {
			alert('Add some page sections first!');
		}
	}

	//editor view render
	async getHtml() {
		return /* HTML */`
			<main id="editor" class="ui segment basic">
				<div id="editor-sidebar" class="ui sidebar inverted overlay bottom">
					<div id="editor-sidebar-list" class="ui horizontal list" style="width: 100%;"></div>
				</div>
				<div class="pusher">
					<section id="browser-window-container">
						<div class="container">
							<div class="row">
								<div class="column left">
									<span class="dot" style="background:#ED594A;"></span>
									<span class="dot" style="background:#FDD800;"></span>
									<span class="dot" style="background:#5AC05A;"></span>
								</div>
								<div class="column middle">
									<input type="text" value="${this.title}">
								</div>
								<div class="column right">
									<div style="float:right">
										<span class="bar"></span>
										<span class="bar"></span>
										<span class="bar"></span>
									</div>
								</div>
							</div>
							<div id="browser-window-content" class="content">
								<div id="tutorial-1" class="ui container text" style="padding: 15px;">
									<div class="ui message info icon">
										<i class="rocket icon"></i>
										<div class="content">
											<div class="header">
												Get started by adding a section from the menu on the right.
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<aside id="editor-menu">
						<div class="ui vertical inverted menu right fixed">
							<div class="header item">
								<button class="ui labeled icon button primary" onclick="window.currentView.launchPreviewPage()" data-tooltip="Launch a preview of your page content in a new window" data-position="left center">
									<i class="external square alternate icon"></i>
									Preview Page
								</button>
								<button class="ui labeled icon button green" onclick="window.currentView.exportPage()" style="margin-top: 1rem;" data-tooltip="Export the complete HTML for your page" data-position="left center">
									<i class="download icon"></i>
									Export HTML
								</button>
							</div>
							<div class="header item">
								Add Page Sections
							</div>
							<a class="item" onclick="window.currentView.addPageSection('masthead')">
								Masthead
							</a>
							<a class="item" onclick="window.currentView.addPageSection('two-column-grid')">
								Two Column Grid
							</a>
							<a class="item" onclick="window.currentView.addPageSection('quote-block')">
								Quote Block
							</a>
							<a class="item" onclick="window.currentView.addPageSection('divided-content')">
								Divided Content
							</a>
							<a class="item" onclick="window.currentView.addPageSection('footer')">
								Footer
							</a>
						</div>
					</aside>
				</div>
			</main>
		`;
	};
}
//page sections and components
class BasePageSection {
	constructor(params, title) {
		this.params = params;
		this.title = title;
		this.uuid = generateUUID();
		this.domLocation = null;
		this.editableContent = {};
	}

	setTitle(title) {
		this.title = title;
	}

	setDOM() {
		this.domLocation = document.querySelector(`[data-uuid="${this.uuid}"]`);
		this.domLocation.addEventListener('click', this.selectPageSection, false);
	}

	setEditableContent(sectionContent) {
		this.editableContent = sectionContent;
	}

	setUserInput(field) {
		console.debug('setUserInput - field', field);
		console.debug('setUserInput - selected field', this.editableContent[field]);
		switch (this.editableContent[field].inputType) {
			case 'ckEditor':
				let ckEditorState = this.editableContent[field].ckEditorState;
				this.editableContent[field].input = ckEditorState.getData();
				break;
			default:
				//get user input from form field
				let userInput = document.getElementById(this.uuid+'_'+field).value;
				this.editableContent[field].input = userInput;
		}
		console.debug('setUserInput - this', this);
		this.updatePageSection();
	}

		//handle updating existing page sections content from user input
		updatePageSection = async () => {
			console.log('updatePageSection - this', this);
			console.log('updatePageSection - window.currentView.selectedPageSection', window.currentView.selectedPageSection);
			//this.selectedPageSection = this.pageSections[uuid] ? this.pageSections[uuid] : null;
			if (window.currentView.selectedPageSection) {
				window.currentView.selectedPageSection.domLocation.outerHTML = await this.getHtml();
				
				this.setDOM();
				window.currentView.selectedPageSection.domLocation.classList.add('page-section-selected');
			}
		};
	
		selectPageSection = (event) => {
			console.debug('selectPageSection', event);
			console.debug('window.currentView.pageSections', window.currentView.pageSections);
			console.debug('this.uuid', this.uuid);
			console.debug('window.currentView.selectedPageSection', window.currentView.selectedPageSection);

			const sidebarOnShow = () => {
				console.debug('sidebarOnShow');
				//add extra padding for scroll space
				const editorDomLocation = document.getElementById('browser-window-content');
				editorDomLocation.style = 'padding-bottom: 500px;';
				//initialize ckeditor
				for (const field in this.editableContent) {
					let fieldIdentifier = this.uuid +'_'+ field;
					if (this.editableContent[field].inputType === 'ckEditor') {
						let ckEditorState = this.editableContent[field].ckEditorState;
						console.debug('sidebarOnShow - ckEditorState', ckEditorState);
						//setTimeout(() => {
							let editorElement = document.getElementById(fieldIdentifier);
							console.debug('sidebarOnShow - editorElement', editorElement);
							ClassicEditor.create(editorElement, {
								plugins: [ 
									GeneralHtmlSupport, 
									Essentials,
									Alignment,
									AutoLink,
									Bold,
									Heading,
									Indent,
									IndentBlock,
									Italic,
									Link,
									Paragraph,
									SourceEditing,
									SpecialCharacters,
									Underline,
									Undo
								],
								htmlSupport: {
									allow: [
										{
											name: /.*/,
											attributes: true,
											classes: true,
											styles: true
										}
									]
								},							
								toolbar: [ 'undo',
									'redo',
									'|',
									'sourceEditing',
									'|',
									'heading',
									'|',
									'bold',
									'italic',
									'|',
									'blockQuote',
									'|',
									'indent',
									'outdent', 
								],
								initialData: `${ckEditorState ? ckEditorState.getData() : this.editableContent[field].placeholder}`
							})
							.then(newEditor => {
								this.editableContent[field].ckEditorState = newEditor;
							})
							.catch(error => {
								console.debug('ckEditor - ClassicEditor - error', error);
							});
						//}, "100");
						console.debug('sidebarOnShow - this', this);
					}
				}
			}

			//handle select a different page section from the currently selected page section
			const newPageSectionSelected = () => {
				console.debug('newPageSectionSelected');
				window.currentView.selectedPageSection = window.currentView.pageSections[this.uuid] ? window.currentView.pageSections[this.uuid] : null;
				console.debug('updated window.currentView.selectedPageSection', window.currentView.selectedPageSection);
				if (window.currentView.selectedPageSection) {
					window.currentView.selectedPageSection.domLocation.classList.add('page-section-selected');
					//update form fields
					if (window.currentView.selectedPageSection.editableContent.length !== 0) {
						loadFormFields();
					}
					$('#editor-sidebar').sidebar({context: $('#editor'), dimPage: false, onShow: sidebarOnShow, onHidden: samePageSectionSelected, }, 'overlay').sidebar('toggle');
				}
			};
	
			//load editable content form fields from the Page Section Class definition
			const loadFormFields = () => {
				console.debug('loadFormFields');
				for (const field in this.editableContent) {
					console.debug('loadFormFields - field', this.editableContent[field]);
					let fieldIdentifier = this.uuid +'_'+ field;
					let inputType = {
						type: this.editableContent[field].inputType ? this.editableContent[field].inputType : 'Text',
						content: null
					}
					switch (inputType.type) {
						case 'ckEditor':
							inputType.content = `<textarea id="${fieldIdentifier}"></textarea>`;
							break;
						default:
							inputType.content = `<input id="${fieldIdentifier}" type="text" placeholder="${this.editableContent[field].inputPlaceholder}">`;
					}
					let editableContentItemTemplate = `
						<div class="item" style="max-width: 30%; vertical-align: top;">
							<div class="top aligned content">
								<div class="header">${this.editableContent[field].title}</div>
								<div class="ui form">
									<div class="field">
										<label>${inputType.type}</label>
										${inputType.content}
									</div>
									<button class="ui button" onclick="window.currentView.selectedPageSection.setUserInput('${field}')">Save</button>
								</div>
							</div>
						</div>
					`;
					document.getElementById('editor-sidebar-list').innerHTML += editableContentItemTemplate;
				}
			};
	
			//clear form fields previously loaded
			const clearFormFields = () => {
				console.debug('clearFormFields');
				document.getElementById('editor-sidebar-list').innerHTML = '';
			};
	
			// handle selecting the same Page Section as the one currently selected
			const samePageSectionSelected = () => {
				console.debug('samePageSectionSelected');
				//remove the currently selected style
				this.domLocation.classList.remove('page-section-selected');
				const editorDomLocation = document.getElementById('browser-window-content');
				editorDomLocation.style = '';
				//clear loaded form fields
				clearFormFields();
				//reset the currently selected form field to null to deselect the selected Page Section
				window.currentView.selectedPageSection = null;
			};
	
			//test if the selectedPageSection is the same as already selected
			if (window.currentView.selectedPageSection) {
				window.currentView.selectedPageSection.domLocation.classList.remove('page-section-selected');
				if (window.currentView.selectedPageSection.uuid !== this.uuid) {
					newPageSectionSelected();
				} else {
					console.debug('samePageSectionSelected in DOM but handled with sidebar onHidden');
					//samePageSectionSelected();
				}
			} else {
				newPageSectionSelected();
			};
		};
	
	async getHtml() {
		return '';
	}
}
class SectionMasthead extends BasePageSection {
	constructor(params) {
		super(params);
		this.setTitle('masthead');
		this.sectionContent = {
			headline: {
				title: 'Headline',
				placeholder: 'Imagine-a-Company',
				input: null,
				inputPlaceholder: 'Your headline text...'
			},
			subHeadline: {
				title: 'Subheadline',
				placeholder: 'Do whatever you want when you want to.',
				input: null,
				inputPlaceholder: 'Your subheadline text...'
			},
			button: {
				title: 'CTA Button',
				placeholder: 'Get Started',
				input: null,
				inputPlaceholder: 'Your button text...'
			},
			background: {
				title: 'Background',
				placeholder: '#1b1c1d',
				input: null,
				inputPlaceholder: 'Your background content...'
			}
		};
		this.setEditableContent(this.sectionContent);
	}

	async getHtml() {
		return /* HTML */`
			<div class="ui inverted vertical masthead center aligned segment" data-uuid="${this.uuid}" style="min-height: 700px; padding: 1em 0em; background: ${this.editableContent.background.input ? this.editableContent.background.input : this.sectionContent.background.placeholder}; background-size: cover; background-position: center center;">
				<div class="ui text container">
					<h1 class="ui inverted header" style="margin-top: 3em; margin-bottom: 0em; font-size: 4em; font-weight: normal;">
						${this.editableContent.headline.input ? this.editableContent.headline.input : this.sectionContent.headline.placeholder}
					</h1>
					<h2 style="font-size: 1.7em; font-weight: normal;">${this.editableContent.subHeadline.input ? this.editableContent.subHeadline.input : this.sectionContent.subHeadline.placeholder}</h2>
					<div class="ui huge primary button">${this.editableContent.button.input ? this.editableContent.button.input : this.sectionContent.button.placeholder} <i class="right arrow icon"></i></div>
				</div>
			</div>
		`;
	}
}

class SectionTwoColumnGrid extends BasePageSection {
	constructor(params) {
		super(params);
		this.setTitle('two-column-grid');
		this.sectionContent = {
			columnOneContent: {
				inputType: 'ckEditor',
				title: 'Column One',
				placeholder: `<h3 class="ui header">We Help Companies and Companions</h3>
				<p>We can give your company superpowers to do things that they never thought possible. Let us delight your customers and empower your needs...through pure data analytics.</p>
				<h3 class="ui header">We Make Bananas That Can Dance</h3>
				<p>Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.</p>`,
				input: null,
				inputPlaceholder: 'Your Column One content...',
				ckEditorState: null
			},
			imageUrl: {
				title: 'Image URL',
				placeholder: 'https://semantic-ui.com/examples/assets/images/wireframe/white-image.png',
				input: null,
				inputPlaceholder: 'Your image url...'
			},
			button: {
				title: 'CTA Button',
				placeholder: 'Check Them Out',
				input: null,
				inputPlaceholder: 'Your button text...'
			}
		};
		this.setEditableContent(this.sectionContent);
	}

	async getHtml() {
		return /* HTML */`
			<div class="ui vertical stripe segment" style="padding: 8em 0em;" data-uuid="${this.uuid}">
				<div class="ui middle aligned stackable grid container">
					<div class="row">
						<div class="eight wide column">
							${this.editableContent.columnOneContent.input ? this.editableContent.columnOneContent.input : this.sectionContent.columnOneContent.placeholder}
						</div>
						<div class="six wide right floated column">
							<img src="${this.editableContent.imageUrl.input ? this.editableContent.imageUrl.input : this.sectionContent.imageUrl.placeholder}" class="ui large bordered rounded image">
						</div>
					</div>
					<div class="row">
						<div class="center aligned column">
							<a class="ui huge button">${this.editableContent.button.input ? this.editableContent.button.input : this.sectionContent.button.placeholder}</a>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}

class SectionQuoteBlock extends BasePageSection {
	constructor(params) {
		super(params);
		this.setTitle('quote-block');
		this.sectionContent = {
			columnOneContent: {
				inputType: 'ckEditor',
				title: 'Column One',
				placeholder: `<h3>"What a Company"</h3>
					<p>That is what they all say about us</p>`,
				input: null,
				inputPlaceholder: 'Your Column One content...',
				ckEditorState: null
			},
			columnTwoQuoteText: {
				title: 'Column 2 Quote Text',
				placeholder: `"I shouldn't have gone with their competitor."`,
				input: null,
				inputPlaceholder: 'Your Quote Text...'
			},
			columnTwoQuoteAvatarImageUrl: {
				title: 'Avatar Image URL',
				placeholder: 'https://semantic-ui.com/examples/assets/images/avatar/nan.jpg',
				input: null,
				inputPlaceholder: 'Your Avatar Image URL...'
			},
			columnTwoQuoteAvatarText: {
				title: 'Avatar Text',
				placeholder: '<b>Nan</b> Chief Fun Officer Acme Toys',
				input: null,
				inputPlaceholder: 'Your Avatar Text...'
			},
		};
		this.setEditableContent(this.sectionContent);
	}

	async getHtml() {
		return /* HTML */`
			<div class="ui vertical stripe quote segment" data-uuid="${this.uuid}">
				<div class="ui equal width stackable internally celled grid">
					<div class="center aligned row">
						<div class="column">
							${this.editableContent.columnOneContent.input ? this.editableContent.columnOneContent.input : this.sectionContent.columnOneContent.placeholder}
						</div>
						<div class="column">
							<h3>${this.editableContent.columnTwoQuoteText.input ? this.editableContent.columnTwoQuoteText.input : this.sectionContent.columnTwoQuoteText.placeholder}</h3>
							<p>
								<img src="${this.editableContent.columnTwoQuoteAvatarImageUrl.input ? this.editableContent.columnTwoQuoteAvatarImageUrl.input : this.sectionContent.columnTwoQuoteAvatarImageUrl.placeholder}" class="ui avatar image"> ${this.editableContent.columnTwoQuoteAvatarText.input ? this.editableContent.columnTwoQuoteAvatarText.input : this.sectionContent.columnTwoQuoteAvatarText.placeholder}
							</p>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}

class SectionDividedContent extends BasePageSection {
	constructor(params) {
		super(params);
		this.setTitle('divided-content');
		this.sectionContent = {
			introContent: {
				inputType: 'ckEditor',
				title: 'Intro Content',
				placeholder: `<h3 class="ui header">Breaking The Grid, Grabs Your Attention</h3>
					<p>Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.</p>
					<a class="ui large button">Read More</a>`,
				input: null,
				inputPlaceholder: 'Your Intro Content...',
				ckEditorState: null
			},
			contentDividerText: {
				title: 'Divider Text',
				placeholder: `CASE STUDIES`,
				input: null,
				inputPlaceholder: 'Your Divider Text...'
			},
			dividedContent: {
				inputType: 'ckEditor',
				title: 'Below Divider Content',
				placeholder: `<h3 class="ui header">Did We Tell You About Our Bananas?</h3>
					<p>Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but its really true. It took years of gene splicing and combinatory DNA research, but our bananas can really dance.</p>
					<a class="ui large button">I'm Still Quite Interested</a>`,
				input: null,
				inputPlaceholder: 'Below Divider Content...',
				ckEditorState: null
			},
		};
		this.setEditableContent(this.sectionContent);
	}

	async getHtml() {
		return /* HTML */`
			<div class="ui vertical stripe segment" style="padding: 8em 0em;" data-uuid="${this.uuid}">
				<div class="ui text container">
					${this.editableContent.introContent.input ? this.editableContent.introContent.input : this.sectionContent.introContent.placeholder}
					<h4 class="ui horizontal header divider">
						<a href="#">${this.editableContent.contentDividerText.input ? this.editableContent.contentDividerText.input : this.sectionContent.contentDividerText.placeholder}</a>
					</h4>
					${this.editableContent.dividedContent.input ? this.editableContent.dividedContent.input : this.sectionContent.dividedContent.placeholder}
				</div>
			</div>
		`;
	}
}

class SectionFooter extends BasePageSection {
	constructor(params) {
		super(params);
		this.setTitle('footer');
		this.sectionContent = {
			columnOneContent: {
				inputType: 'ckEditor',
				title: 'Column One',
				placeholder: `<h4 class="ui inverted header">About</h4>
					<div class="ui inverted link list">
						<a href="#" class="item">Sitemap</a>
						<a href="#" class="item">Contact Us</a>
						<a href="#" class="item">Religious Ceremonies</a>
						<a href="#" class="item">Gazebo Plans</a>
					</div>`,
				input: null,
				inputPlaceholder: 'Your Column One content...',
				ckEditorState: null
			},
			columnTwoContent: {
				inputType: 'ckEditor',
				title: 'Column Two',
				placeholder: `<h4 class="ui inverted header">Services</h4>
					<div class="ui inverted link list">
						<a href="#" class="item">Banana Pre-Order</a>
						<a href="#" class="item">DNA FAQ</a>
						<a href="#" class="item">How To Access</a>
						<a href="#" class="item">Favorite X-Men</a>
					</div>`,
				input: null,
				inputPlaceholder: 'Your Column Two content...',
				ckEditorState: null
			},
			columnThreeContent: {
				inputType: 'ckEditor',
				title: 'Column Three',
				placeholder: `<h4 class="ui inverted header">Footer Header</h4>
					<p>Extra space for a call to action inside the footer that could help re-engage users.</p>`,
				input: null,
				inputPlaceholder: 'Your Column Three content...',
				ckEditorState: null
			},
		};
		this.setEditableContent(this.sectionContent);
	}

	async getHtml() {
		return /* HTML */`
			<div class="ui inverted vertical footer segment" style="padding: 5em 0em;" data-uuid="${this.uuid}">
				<div class="ui container">
					<div class="ui stackable inverted divided equal height stackable grid">
						<div class="three wide column">
							${this.editableContent.columnOneContent.input ? this.editableContent.columnOneContent.input : this.sectionContent.columnOneContent.placeholder}
						</div>
						<div class="three wide column">
							${this.editableContent.columnTwoContent.input ? this.editableContent.columnTwoContent.input : this.sectionContent.columnTwoContent.placeholder}
						</div>
						<div class="seven wide column">
							${this.editableContent.columnThreeContent.input ? this.editableContent.columnThreeContent.input : this.sectionContent.columnThreeContent.placeholder}
						</div>
					</div>
				</div>
			</div>
		`;
	}
}