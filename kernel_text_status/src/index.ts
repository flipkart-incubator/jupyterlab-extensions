import {
	IDisposable, DisposableDelegate
} from '@phosphor/disposable';

import {
	JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
	ToolbarButton,
	IClientSession
} from '@jupyterlab/apputils';

import {
	DocumentRegistry
} from '@jupyterlab/docregistry';

import {
	NotebookPanel, INotebookModel
} from '@jupyterlab/notebook';


const TOOLBAR_KERNEL_NAME_CLASS = 'jp-Toolbar-kernelName';

/**
 * The plugin registration information.
 */
 const plugin: JupyterLabPlugin<void> = {
 	activate,
 	id: 'my-extension-name:buttonPlugin',
 	autoStart: true
 };

 export class KernelStatusTextBox extends ToolbarButton {

 	constructor(session: IClientSession) {
 		super({
 			className: TOOLBAR_KERNEL_NAME_CLASS,
 		});
 		this._onStatusChanged(session);
 		session.statusChanged.connect(this._onStatusChanged,this);
 	}

 	private _onStatusChanged(session: IClientSession) {
 		if (this.isDisposed){
 			return;
 		}

 		let status = session.status;
 		let title  = 'Kernel ' + status[0].toUpperCase() + status.slice(1);
 		this.node.textContent = title;
 	}

 }

/**
 * A notebook widget extension that adds a button to the toolbar.
 */
 export
 class KernelTextStatusButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
  /**
   * Create a new extension object.
   */
   createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {

   		let button = new KernelStatusTextBox(panel.session);

   		panel.toolbar.insertItem(12, 'runAll', button);
   		return new DisposableDelegate(() => {
   			button.dispose();
   		});


   	}

   }

/**
 * Activate the extension.
 */
 function activate(app: JupyterLab) {
 	app.docRegistry.addWidgetExtension('Notebook', new KernelTextStatusButtonExtension());
 };


/**
 * Export the plugin as default.
 */
 export default plugin;
