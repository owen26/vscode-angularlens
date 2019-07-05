import { AngularLensProvider } from './angular-lens.provider';
import { AngularSelectorReferenceProvider } from './angular-selector-reference.provider';
import { ExtensionContext, commands, languages } from 'vscode';
import { findComponentUsageInTemplates } from './find-component-usage-in-templates.command';
import { CMD } from './models';

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand(CMD.findComponentUsageInTemplates, findComponentUsageInTemplates),
    languages.registerReferenceProvider(
      { language: 'typescript', scheme: 'file' },
      new AngularSelectorReferenceProvider()
    ),
    languages.registerCodeLensProvider(
      {
        language: 'typescript',
        scheme: 'file'
      },
      new AngularLensProvider()
    )
  );
}

export function deactivate() {}
