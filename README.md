# Final Project
## CS 81 - 1242
## Matthew Reynolds
### 891635

## Please use a web server to load the files. VS Code Live Preview is recommended.
I used script type="module" to be able to use CKEditor import statements which will cause a CORS error if a web server is not used to load the app files. <a href="https://stackoverflow.com/questions/67230845/how-to-use-javascript-type-module-locally-in-browser" target="_blank">Link to issue on StackOverflow</a>

### How To Load Site with VS Code Live Preview:
1. In VS Code, go to the Extensions menu and search for "Live Preview" or use the following link - <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server" target="_blank">https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server</a>
2. Install the Live Preview Extension
3. Download and unzip and/or open the project files from the GitHub repository and open the index.html file in VS Code
4. Open the command menu or press F1 and select the "Live Preview: Start Server" option
5. A browser window should automatically open at http://127.0.0.1:3000/ with the site loaded
6. If you see the text "Please use a web server to load the files. VS Code Live Preview is recommended.", the web server has not successfully started. If you don't see the above text, the web server has started successfully.


For my Final Project I built a JavaScript Single Page Application that provides users with a Dashboard interface to dynamically create a simple webpage that is able to be previewed and exported as static HTML to host with a simple web server.

My goal is to use as much vanilla JavaScript (ES6) as possible, while some third-party requirements need jQuery to function correctly, my custom application code will include as little usage of non-vanilla JS as possible.

I've also used SASS, specifically SCSS, to more quickly build out my CSS stylesheets for a better developer experience. The SASS build process uses a VS Code extension rather than a build system like webpack.

I wanted to focus on the JS application functionality rather than the underlying base-line code that would require creating a lot of elements and styles from scratch, so I utilized the Semantic UI framework to quickly access and add basic functionality to the application. Core application functionality for webpage editing is written without the help of any frameworks.</p>

My goal is to give users an interface to reconstruct the <a href="https://semantic-ui.com/examples/homepage.html" target="_blank">Starter page template "Homepage"</a> from <a href="https://semantic-ui.com/usage/layout.html" target="_blank">Semantic UI Layouts</a> and edit it with their content and allow users to preview and export the generated HTML.

I created a demo screen capture of using the Webpage Builder App to recreate and edit the page to demonstrate the app features.
<a href="https://drive.google.com/file/d/1qVKrT7s0SQi0lkbJqPubazLbcQC-B5j9/view?usp=drive_link" target="_blank">Demo Video</a>

## Third-Party Frameworks, Tools, and Generators
- Semantic UI CSS Framework
-- jQuery
- Favicon.io favicon generator
- CKEditor 5
- Sass

## VS Code Extensions
- Live Preview
- Live Sass Compiler