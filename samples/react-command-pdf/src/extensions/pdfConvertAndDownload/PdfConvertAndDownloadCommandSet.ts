import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
    BaseListViewCommandSet,
    Command,
    IListViewCommandSetListViewUpdatedParameters,
    IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';

import ConvertDialog from './components/ConvertDialog';
import DownloadDialog from './components/DownloadDialog';
import { IPayload } from './components/IPayload';

export interface IPdfConvertAndDownloadCommandSetProperties {
    // This is an example; replace with your own properties
    sampleTextOne: string;
    sampleTextTwo: string;
}

const LOG_SOURCE: string = 'PdfConvertAndDownloadCommandSet';

export default class PdfConvertAndDownloadCommandSet extends BaseListViewCommandSet<IPdfConvertAndDownloadCommandSetProperties> {

    @override
    public onInit(): Promise<void> {
        Log.info(LOG_SOURCE, 'Initialized PdfConvertAndDownloadCommandSet');
        return Promise.resolve();
    }

    @override
    public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
        let showCommand = false;
        if (event.selectedRows.length === 1) {
            let item = event.selectedRows[0];
            //let itemId = item.getValueByName("ID");

            let ext = item.getValueByName("File_x0020_Type");
            if (this.endsWithAny(["csv", "doc", "docx", "odp", "ods", "odt", "pot", "potm", "potx", "pps", "ppsx", "ppsxm", "ppt", "pptm", "pptx", "rtf", "xls", "xlsx"], ext)) {
                showCommand = true;
            }
        } 
        const downloadCommand: Command = this.tryGetCommand('DOWNLOAD');
        if (downloadCommand) {
            // This command should be hidden unless exactly one row is selected.
            downloadCommand.visible = showCommand;
        }

        const compareOneCommand: Command = this.tryGetCommand('CONVERT');
        if (compareOneCommand) {
            // This command should be hidden unless exactly one row is selected.
            compareOneCommand.visible = showCommand;
        }
    }

    @override
    public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
        let item = event.selectedRows[0];

        let absoluteSiteUrl = this.context.pageContext.web.absoluteUrl;
        let relativeFolderUrl = this.context.pageContext.list.serverRelativeUrl.replace(this.context.pageContext.web.serverRelativeUrl, "");
        let ext = item.getValueByName("File_x0020_Type");
        let filenameNoExt = item.getValueByName("FileLeafRef").replace("." + ext, "");

        let payload: IPayload = {
            AbsoluteSiteUrl: absoluteSiteUrl,
            RelativeFolderUrl: relativeFolderUrl,
            FilenameNoExt: filenameNoExt,
            Ext: ext
        };

        switch (event.itemId) {
            case 'CONVERT':
                payload.Download = false;
                const convertDialog: ConvertDialog = new ConvertDialog(this.context, payload);
                convertDialog.show();
                break;
            case 'DOWNLOAD':
                payload.Download = true;
                const downloadDialog: DownloadDialog = new DownloadDialog(this.context, payload);
                downloadDialog.show();
                break;
            default:
                throw new Error('Unknown command');
        }
    }

    private endsWithAny(suffixes, string) {
        return suffixes.some(function (suffix) {
            return string.endsWith(suffix);
        });
    }
}
