import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import { ListViewCommandSetContext } from '@microsoft/sp-listview-extensibility';

import ConvertDialogContent from './ConvertDialogContent';
import { IPayload } from './IPayload';

let _payload: IPayload;
let _context: ListViewCommandSetContext;
export default class ConvertDialog extends BaseDialog {
    constructor(context: ListViewCommandSetContext, payload: IPayload) {
        super();
        _context = context;
        _payload = payload;
    }

    public render(): void {
        ReactDOM.render(<ConvertDialogContent
            close={this.close}
            payload={_payload}
            context={_context}
        />, this.domElement);
    }

    public getConfig(): IDialogConfiguration {
        return {
            isBlocking: false
        };
    }
}