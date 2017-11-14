import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    autobind,
    PrimaryButton,
    CommandButton,
    Label,
    DialogFooter,
    DialogContent,
    DialogType,
    SwatchColorPicker,
    Icon
} from 'office-ui-fabric-react';

//import styles from './CognitiveServicesImageDialogContent.module.scss';


export interface IConvertOrDownloadDialogContentProps {
    close: () => void;
}

export default class ConvertOrDownloadDialogContent extends React.Component<IConvertOrDownloadDialogContentProps, {}> {

    constructor(props) {
        super(props);
    }

    public render(): React.ReactElement<IConvertOrDownloadDialogContentProps> {

        return (<div>
            <DialogContent
                title={"Convert or Download file as PDF"}
                subText={"Convert a file in place or download as PDF"}
                onDismiss={this.props.close}
                showCloseButton={true}
                type={DialogType.close} >

                <h1>Foo</h1>                
                
                <DialogFooter>
                    <CommandButton text='Close' title='Close' onClick={this.props.close} />
                </DialogFooter>

            </DialogContent>
        </div>);
    }
}