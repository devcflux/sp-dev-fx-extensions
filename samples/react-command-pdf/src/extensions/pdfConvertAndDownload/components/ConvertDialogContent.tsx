import * as React from 'react';

import { CommandButton } from 'office-ui-fabric-react/lib/Button';
import { DialogFooter, DialogContent, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { ListViewCommandSetContext } from '@microsoft/sp-listview-extensibility';
import { HttpClient } from '@microsoft/sp-http';
import { IPayload } from './IPayload';

export interface IConvertDialogContentProps {
    close: () => void;
    payload: IPayload;
    context: ListViewCommandSetContext;
}

export default class ConvertDialogContent extends React.Component<IConvertDialogContentProps, {}> {

    constructor(props) {
        super(props);
        this.convertFile = this.convertFile.bind(this);
    }

    public componentDidMount() {
        this.convertFile();
    }

    public render(): React.ReactElement<IConvertDialogContentProps> {

        return (<div>
            <DialogContent
                title={"Convert file to PDF"}
                subText={"Your file is being converted and will soon be ready in your library."}
                onDismiss={this.props.close}
                showCloseButton={true}
                type={DialogType.close} >

                <Spinner size={SpinnerSize.medium} />

                <DialogFooter>
                    <CommandButton text='Close' title='Close' onClick={this.props.close} />
                </DialogFooter>
            </DialogContent>
        </div>);
    }

    private async convertFile() {
        let url = "https://prod-58.westeurope.logic.azure.com:443/workflows/d84e440a752c4dd9988344c1f66ff04c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mSAt6RdRlQIc_f0syltIE0vshYA19lQyOfVOS-imDiA";
        try {
            const requestHeaders: Headers = new Headers();
            requestHeaders.append("Content-Type", "application/json");
            this.setState({
                disabled: true
            });

            let response = await this.props.context.httpClient.post(url, HttpClient.configurations.v1, {
                body: JSON.stringify(this.props.payload),
                headers: requestHeaders
            });

            if (response.ok) {
                window.location.href = window.location.href;
            }
        } catch (error) {
            console.log(error);
        }
    }
}