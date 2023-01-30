// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { Configuration, OpenAIApi } = require("openai");

const API_KEY = "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";
const configuration = new Configuration({
apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposableReviewCode = vscode.commands.registerCommand('jci-code.review', () => {
		if (vscode.window.activeTextEditor) {
			const text = `Code Review:  ${vscode.window.activeTextEditor.document.getText().toString()}`;
			if (text) {
				vscode.window.showInformationMessage("Running code review.");
				openai.createCompletion({
					model: "text-davinci-002",
					prompt:text,
					max_tokens: 256,
					top_p: 1,
					frequency_penalty: 0,
					presence_penalty: 0,
				}).then((response) => {
					console.log(response);
					const sString=new vscode.SnippetString(`/* ${response.data.choices[0].text} */`);
					vscode.window.activeTextEditor.insertSnippet(sString);
					vscode.window.showInformationMessage("Code review completed.");

				})
			}
		}
	});

	let generateCode = vscode.commands.registerCommand('jci-code.generate', () => {
		if (vscode.window.activeTextEditor) {
			const text = `Generate Rust Code: ${vscode.window.activeTextEditor.document.getText().toString()}`;
			if (text) {
				vscode.window.showInformationMessage("Running Code Generate");
				openai.createCompletion({
					model: "text-davinci-002",
					prompt:text,
					max_tokens: 256,
					top_p: 1,
					frequency_penalty: 0,
					presence_penalty: 0,
				}).then((response) => {
					console.log(response);
					const sString=new vscode.SnippetString(`/* ${response.data.choices[0].text} */`);
					vscode.window.activeTextEditor.insertSnippet(sString);
					vscode.window.showInformationMessage("Code Generation completed.");

				})
			}
		}
	});
	context.subscriptions.push(disposableReviewCode);
	context.subscriptions.push(generateCode);

}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
