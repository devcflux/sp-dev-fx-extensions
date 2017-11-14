import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
//import { ICognitiveServicesImage } from '../ICognitiveServicesImage';
import ConvertOrDownloadDialogContent from './ConvertOrDownloadDialogContent';

export default class ConvertOrDownloadDialog extends BaseDialog {
    public render(): void {
        ReactDOM.render(<ConvertOrDownloadDialogContent
            close={this.close}
        />, this.domElement);
    }

    public getConfig(): IDialogConfiguration {
        return {
            isBlocking: false
        };
    }
}