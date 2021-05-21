import React, { CSSProperties } from 'react';

import Input from '../Input';
import Checkbox from '../Checkbox';
import ImageField from '../ImageField/imageField';
import List from '../List/list';
import TextEditor from '../TextEditor/textEditor';
import FieldModel from '../Field/model';

interface FieldsProps {
    fields: Array<FieldModel>;
    onDetectChanges?: (fields: Array<FieldModel>, parentID: number) => void;
    onChange?: (fields: Array<FieldModel>, parentID: number) => void;
    onBlur?: (obj: FieldModel | Array<FieldModel>, parentID?: number) => void;
    onImagesChanged?: () => void;
    addErrorMessage: (field: FieldModel) => string | undefined;
    keyID: number;
}

interface PropsField {
    field: FieldModel;
    keyId: number;
    fieldChanged: (field: FieldModel) => void;
    onBlur: (field: FieldModel) => void;
    onImagesChanged?: () => void;
}

export default class Fields extends React.Component<FieldsProps, {fields: Array<FieldModel>}> {
    constructor(props: FieldsProps) {
        super(props);
        this.state = {
            fields: this.props.fields
        };
    }

    onDetectChanges = (fields: Array<FieldModel>, parentID: number) => {
        const p_fields = this.props.fields.slice().map(p_field => {
            return p_field;
        });
        if (this.props.onDetectChanges) this.props.onDetectChanges(p_fields, this.props.keyID);
    }

    onChange = (obj: FieldModel | Array<FieldModel>, parentID?: number) => {
        if (obj.hasOwnProperty('type') && (obj as FieldModel).type !== 'group') {
            const fields = this.props.fields.slice().map(p_field => {
                return p_field;
            });
            if (this.props.onChange) this.props.onChange(fields, this.props.keyID);
            else this.onDetectChanges(fields, this.props.keyID);
        } else if (obj.hasOwnProperty('type')) {
            console.log('changed group ?');
        } else {
            this.onDetectChanges((obj as Array<FieldModel>), this.props.keyID);
        }
    }

    onBlur = (obj: FieldModel | Array<FieldModel>, parentID?: number) => {
        if (obj.hasOwnProperty('type') && (obj as FieldModel).type !== 'group') {
            const fields = this.props.fields.slice().map(p_field => {
                if (p_field.fieldID === (obj as FieldModel).fieldID) {
                    p_field.error = this.props.addErrorMessage(p_field);
                }
                return p_field;
            });
            if (this.props.onBlur) this.props.onBlur(fields, this.props.keyID);
        } else if (obj.hasOwnProperty('type')) {
            console.log('blur group ?');
        } else {
            this.onDetectChanges((obj as Array<FieldModel>), this.props.keyID);
        }
    }

    renderFields() {
        const toRender = this.props.fields.slice().map((field, index) => {
            const fieldProps = {
                keyId: index,
                field: field,
                fieldChanged: this.onChange,
                onBlur: this.onBlur,
                onImagesChanged: field.type === 'image' || field.type === 'list' ? this.props.onImagesChanged : undefined
            } as PropsField;

            switch (field.type) {
                case 'checkbox':
                    return (
                        <Checkbox key={`field-${index}`} {...fieldProps} />
                    );
                case 'image':
                    return (
                        <ImageField key={`field-${index}`} {...fieldProps} />
                    );
                case 'texteditor':
                    return (
                        <TextEditor key={`field-${index}`} {...fieldProps} />
                    );
                case 'list':
                    return (
                        <List key={`field-${index}`} {...fieldProps} />
                    )
                case 'group':
                    const fieldStyle = {
                        width: `calc(${field.size ? `${field.size}%` : '100%'} - 20px)`,
                    } as CSSProperties;
                    return (
                        <div
                            className="form-group"
                            key={`group-${index}`}
                            style={fieldStyle}
                        >
                            {field.label.length > 0 ? <h3 className="title">{field.label}</h3> : <></>}
                            <Fields
                                fields={field.value}
                                addErrorMessage={this.props.addErrorMessage}
                                keyID={index}
                                onChange={this.onChange}
                                onBlur={this.onBlur}
                                onImagesChanged={this.props.onImagesChanged}
                            />
                        </div>
                    );
                default:
                    return (
                        <Input key={`field-${index}`} {...fieldProps} />
                    );
            }
        });
        return toRender;
    }

    render() {
        return <>{this.renderFields()}</>;
    }
}