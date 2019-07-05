import {
  CodeLensProvider,
  CodeLens,
  TextDocument,
  Command,
  DocumentSymbol,
  commands,
  window,
  SymbolKind
} from 'vscode';
import { CMD } from './models';

export class AngularLensProvider implements CodeLensProvider {
  async provideCodeLenses(document: TextDocument): Promise<CodeLens[]> {
    const symbols = await this.getSymbols();

    if (!symbols || !symbols[0]) {
      return [];
    }

    const lenses = symbols.map(s => {
      let cmd: Command = {
        command: CMD.findComponentUsageInTemplates,
        title: 'Find usage in templates',
        arguments: [s.range]
      };

      return new CodeLens(s.range, cmd);
    });

    // for now, it only works for the first Angular component class defined in the active editor
    return lenses.slice(0, 1);
  }

  private async getSymbols(): Promise<DocumentSymbol[] | undefined> {
    const document = window.activeTextEditor && window.activeTextEditor.document;

    if (!document) {
      return;
    }

    const rawSymbols = await commands.executeCommand<DocumentSymbol[]>(
      'vscode.executeDocumentSymbolProvider',
      document.uri
    );

    if (!rawSymbols) {
      return;
    }

    return rawSymbols.filter(s => s.kind === SymbolKind.Class);
  }
}
