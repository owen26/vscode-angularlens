import { commands, window, Selection, Range } from 'vscode';

export async function findComponentUsageInTemplates(range: Range): Promise<unknown> {
  const editor = window.activeTextEditor;

  if (!editor) {
    return;
  }

  const document = editor.document;
  const rangeText = document.getText(); // not working for range yet
  const selectorRegex = /(?<=selector\s*:\s*['"`])(.+)['"`]/;
  const resultArr = selectorRegex.exec(rangeText);

  if (!resultArr) {
    return;
  }

  const pos = document.positionAt(resultArr.index);

  editor.selection = new Selection(pos, pos);

  return commands.executeCommand('editor.action.referenceSearch.trigger');
}
