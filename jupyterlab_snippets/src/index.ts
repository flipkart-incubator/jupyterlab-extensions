import { JupyterLab, JupyterLabPlugin } from '@jupyterlab/application';
import { CodeCell } from '@jupyterlab/cells';
import { URLExt } from "@jupyterlab/coreutils";
import { IEditorTracker } from '@jupyterlab/fileeditor';
import { IMainMenu } from '@jupyterlab/mainmenu';
import { INotebookTracker } from '@jupyterlab/notebook';
import { ServerConnection } from '@jupyterlab/services';
import { CommandRegistry } from '@phosphor/commands';
import { Menu } from '@phosphor/widgets';
import { showErrorMessage } from '@jupyterlab/apputils';
import '../style/index.css';



const category = 'Snippets';

function createMenu(commands: CommandRegistry, snippets: any[]): Menu {
  let menu = new Menu({ commands });
  menu.title.label = category;

  snippets.sort((a: any, b: any) => {
    const submenuComapre = a.submenu.localeCompare(b.submenu);

    if (submenuComapre === 0) {
      return a.name.localeCompare(b.name);
    } else {
      return submenuComapre;
    }
  });

  let currentSubmenuName = snippets[0].submenu;
  let currentSubmenu: Menu = new Menu({ commands });
  currentSubmenu.title.label = currentSubmenuName;
  snippets.forEach(item => {
    if (item.submenu !== currentSubmenuName) {
      menu.addItem({ type: 'submenu', submenu: currentSubmenu });
      currentSubmenuName = item.submenu;
      currentSubmenu = new Menu({ commands });
      currentSubmenu.title.label = currentSubmenuName;
      currentSubmenu.addItem({ command: snippetCommandName(item) });
    } else {
      currentSubmenu.addItem({ command: snippetCommandName(item) });
    }
  });

  menu.addItem({ type: 'submenu', submenu: currentSubmenu });
  return menu;
}

function snippetCommandName(snippet: any): string {
  return `${category}-${snippet.submenu}-${snippet.name}`;
}

/**
 * Initialization data for the snippets extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'snippets',
  requires: [IMainMenu, INotebookTracker, IEditorTracker],
  autoStart: true,
  activate: activate
};

function activate(
  app: JupyterLab,
  mainMenu: IMainMenu,
  notebookTracker: INotebookTracker,
  editorTracker: IEditorTracker
): void {
  const { commands } = app;

  function appendNewCommand(item: any) {
    let command = snippetCommandName(item);
    commands.addCommand(command, {
      label: item.label,
      execute: () => {
        const editorWidget = editorTracker.currentWidget;
        if (
          editorWidget &&
          editorWidget.content !== null &&
          editorWidget.content.isVisible
        ) {
          if (editorWidget.content.editor.model.value.text === '') {
            editorWidget.content.editor.model.value.text = item.text.join('\n');
          } else {
            editorWidget.content.editor.model.value.text = editorWidget.content.editor.model.value.text.concat(
              '\n',
              item.text.join('\n')
            );
          }
        } else if (notebookTracker.activeCell instanceof CodeCell) {
          if (notebookTracker.activeCell.model.value.text === '') {
            notebookTracker.activeCell.model.value.text = item.text.join('\n');
          } else {
            notebookTracker.activeCell.model.value.text = notebookTracker.activeCell.model.value.text.concat(
              '\n',
              item.text.join('\n')
            );
          }
        }
      }
    });
  }

  httpRequest('/snippets/get', 'get', {}, {}).then((response : Response) => {
    if (response.ok)
        return response.json();

    throw new Error("Failed to get snippets");
  }).then((snippets: any[]) => {
    snippets.forEach(item => {
      appendNewCommand(item);
    });
  
    // Create the Snippet menu
    let menu = createMenu(commands, snippets);
    mainMenu.addMenu(menu, { rank: 80 });
  }).catch((error : any) => {
    showErrorMessage("Failed to get snippets", error);
  });
}



function httpRequest(
  url: string,
  method: string,
  headers: Object,
  body: Object
): Promise<Response> {
  let fullRequest = {
    method: method,
    body: JSON.stringify(body)
  };

  let setting = ServerConnection.makeSettings();
  let fullUrl = URLExt.join(setting.baseUrl, url);
  return ServerConnection.makeRequest(fullUrl, fullRequest, setting);
}

export default extension;
