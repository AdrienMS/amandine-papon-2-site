import React, { CSSProperties, FocusEvent } from 'react';
import './style.scss';

import FieldModel from './model';
import { Image } from '../../../store/models/imagesTypes';
import { RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor';

export interface FieldProps {
    field: FieldModel;
    keyId: number;
    fieldChanged: (field: FieldModel) => void;
    onBlur: (field: FieldModel) => void;
    onImagesChanged?: (indexGroup?: number) => void;
    indexGroup?: number;
}

export interface FieldState {
    isFocus: boolean;
    openImage?: boolean;
    editorValue?: any;
    listValues?: Array<any[]>;
    displayedValue?: Array<JSX.Element>;
    images?: Array<Image>;
    rteObj?: RichTextEditorComponent | null;
}

class Field extends React.Component<FieldProps, FieldState> {
    constructor(props: FieldProps | Readonly<FieldProps>) {
        super(props);
        this.state = {
            isFocus: this.props.field.value ? true : false,
            openImage: false
        };
    }

    handleFocus = (e: FocusEvent | any) => {
        if (e) { e.preventDefault(); }
        this.setState({isFocus: true});
    }

    handleBlur = (e: FocusEvent) => {
        e.preventDefault();
        this.props.onBlur(this.props.field);
    }

    handleChanged = (value: any) => {
        const field = this.props.field;
        field.value = value;
        this.props.fieldChanged(field);
    }

    renderRequired() {
        if (this.props.field.required && this.props.field.label !== '') {
            return <span className="required">*</span>;
        } else {
            return null;
        }
    }

    renderError() {
        if (this.props.field.error) {
            return <span className="field-error">{this.props.field.error}</span>
        } else {
            return null;
        }
    }

    renderFieldType() {}

    render() {
        const fieldStyle = {
            width: `calc(${this.props.field.size ? `${this.props.field.size}%` : '100%'} - 20px)`,
        } as CSSProperties
        return (
            <div
                key={`input-${this.props.keyId}`}
                onBlur={this.handleBlur}
                className={`field-container${this.state.isFocus ? ' focus' : ''}${this.props.field.error ? ' error' : ''}`}
                style={fieldStyle}
            >
                <label htmlFor={this.props.keyId.toString()} className='field-label'>
                    {this.props.field.label}
                    {this.renderRequired()}
                </label>
                {this.renderFieldType()}
                {this.renderError()}
            </div>
        );
    }
};

export default Field;