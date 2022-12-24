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
			let text = vscode.window.activeTextEditor.document.getText().toString();
			if (text) {
				let prompt = text;
				openai.createCompletion({
					model: "text-davinci-002",
					prompt:text,
					max_tokens: 256,
					top_p: 1,
					frequency_penalty: 0,
					presence_penalty: 0,
				}).then((response) => {
					console.log(response);
					const sString=new vscode.SnippetString(response.data.choices[0].text);
					vscode.window.activeTextEditor.insertSnippet(sString);
				})
			}
		}
	});

	context.subscriptions.push(disposableReviewCode);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
