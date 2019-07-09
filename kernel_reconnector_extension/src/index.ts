
import {
	IDisposable, DisposableDelegate
} from '@phosphor/disposable';

import {
	JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
	ToolbarButton,
	IClientSession,
} from '@jupyterlab/apputils';

import {
	DocumentRegistry
} from '@jupyterlab/docregistry';

import {
	NotebookPanel, INotebookModel
} from '@jupyterlab/notebook';

const TOOLBAR_KERNEL_NAME_CLASS = 'jp-Toolbar-kernelName';

/**
 * Initialization data for the kernel_reconnector_extension extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'fk_extension:kernel_reconnector_extension',
  autoStart: true,
  activate: (app: JupyterLab) => {
   app.docRegistry.addWidgetExtension('Notebook',new KernelReconnectorExtension())
  }
};

export class KernelReconnector extends ToolbarButton  {

  
    previousIOPubTime = new Date().getTime()
    constructor(session: IClientSession){
      super({
        className: TOOLBAR_KERNEL_NAME_CLASS,
        onClick: () => {
          console.log("Reconnecting on user request");
          session.kernel.reconnect();
        }
      });
      
      this.node.textContent = 'Reconnect Kernel';
      session.iopubMessage.connect(this._updateTimeStamp,this);
      // Set up polling.
		  let reconnectTimer = (setInterval as any)(() => {
			// if (typeof document !== 'undefined' && document.hidden) {
			//   // Don't poll when nobody's looking.
			//   return;
			// }
			this._refreshRunning(session);
		  }, 5000);
      reconnectTimer;
      



    }

    private _delay(ms: number){
      return new Promise(resolve => setTimeout(resolve,ms))
    } 
    private async _updateTimeStamp(){
      this.previousIOPubTime = new Date().getTime();
    }

    private async _refreshRunning(session: IClientSession){
		
      let timeNow = new Date().getTime();
  
      if(((Math.abs(timeNow -  this.previousIOPubTime) / (1000*60)) > 30)){
        await this._delay(5*1000);
        console.log("Reconnecting after 30 minutes of inactivity");
        session.kernel.reconnect();
      }
      
      
    } 


}

export class KernelReconnectorExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
  /**
   * Create a new extension object.
   */
   createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {

    let button = new KernelReconnector(panel.session);
		   
    panel.toolbar.insertItem(9, 'reconnectKernel', button);
    return new DisposableDelegate(() => {
      button.dispose();
    });

       

   }
}




export default extension;
