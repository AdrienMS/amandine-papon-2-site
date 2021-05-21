import React, { CSSProperties } from 'react';
import './style.scss';

import {
    FaTrash
} from 'react-icons/fa';

import Field from '../Field';
import Input from '../Input';
import ImageField from '../ImageField/imageField';
import Checkbox from '../Checkbox';
import FieldModel, { INPUT, IMAGE, CHECKBOX, ListModel } from '../Field/model';
import FabButton from '../../FabButton/fabButton';

interface PropsField {
    field: FieldModel;
    keyId: number;
    fieldChanged: (field: FieldModel) => void;
    onBlur: (field: FieldModel) => void;
    onImagesChanged?: () => void;
}

class List extends Field {
    componentDidMount() {
        this.setState({
            listValues: this.props.field.value,
            images: this.props.field.images
        });
        this.renderValues(this.props.field.value);
    }

    handleAddFields = () => {
        if (this.props.field.model && this.state.listValues) {
            const list = this.state.listValues.slice();
            const n_value = this.props.field.model.slice().map(item => {
                return undefined;
            });
            list.push(n_value);
            this.renderValues(list);
            this.setState({listValues: list});
        }
    }

    handleChange = (field: FieldModel, parentID?: number) => {
        if (this.state.listValues && field.parentID !== undefined && field.fieldID !== undefined) {
            const values = this.state.listValues.slice();
            values[field.parentID][field.fieldID] = field.value;
            const m_field = this.props.field;
            m_field.value = values;
            this.props.fieldChanged(m_field);
        } else {
            console.error('field not set correctly');
        }
    }

    handleBlur = (obj: any, parentID?: number) => {
        console.log(obj, parentID);
    }

    handleDelete = (index: number, e: React.MouseEvent) => {
        e.preventDefault();
        console.log(`delete : ${index}`);
        if (this.state.listValues) {
            const values = this.state.listValues.slice();
            values.splice(index, 1);
            const m_field = this.props.field;
            m_field.value = values;
            this.props.fieldChanged(m_field);
            this.renderValues(values);
            this.setState({listValues: values});
        } else {
            console.error('field not set correctly');
        }
    }

    renderTableHead = () => {
        let toRender: JSX.Element[] = [];
        if (this.props.field.model) {
            toRender = this.props.field.model.slice().map((item, index) => {
                const fieldStyle = {
                    width: `${item.size ? `${item.size}%` : 'unset'}`,
                } as CSSProperties;

                return <th key={index} style={fieldStyle}>{item.label}</th>;
            });
        }
        toRender.push(<th key='delete'></th>);
        return toRender;
    }

    renderType = (model: ListModel, value: any, key: number, parentKey: number) => {
        const field = {
            label: '',
            type: '',
            value: value,
            fieldID: key,
            parentID: parentKey
        } as FieldModel;

        const fieldProps = {
            field: field,
            keyId: key,
            fieldChanged: this.handleChange,
            onBlur: this.handleBlur
        } as PropsField;

        switch(model.type) {
            case INPUT:
                fieldProps.field.type = 'text';
                return <Input {...fieldProps} />
            case IMAGE:
                fieldProps.field.type = 'image';
                fieldProps.field.height = '40px';
                fieldProps.field.images = this.state.images ? this.state.images : this.props.field.images;
                fieldProps.onImagesChanged = () => {
                    if (this.props.onImagesChanged) {
                        this.props.onImagesChanged();
                        this.setState({images: this.props.field.images});
                        fieldProps.field.images = this.props.field.images;
                    }
                };
                return <ImageField {...fieldProps} />
            case CHECKBOX:
                fieldProps.field.type = 'checkbox';
                return <Checkbox {...fieldProps} />
            default:
                return <></>;
        }
    }

    renderValues = (listValues: Array<any[]>) => {
        if (listValues) {
            let toRender = undefined;
            if (this.props.field.model) {
                toRender = listValues.slice().map((items: Array<any>, indexValue: number) => {
                    const itemsRender = items.map((item, indexItem) => {
                        const model = this.props.field.model;

                        return (
                        <td key={`list-item-${indexValue}-${indexItem}`}>
                            {model ? this.renderType(model[indexItem], item, indexItem, indexValue) : <></>}
                        </td>);
                    });
                    itemsRender.push(
                        <td key={`delete-${indexValue}`} className='form-list-delete'>
                            <FaTrash onClick={e => this.handleDelete(indexValue, e)} className='form-list-delete-icon' />
                        </td>
                    );
                    return <tr key={indexValue}>{itemsRender}</tr>;
                });
            }
            this.setState({displayedValue: toRender});
        }
    }

    renderFieldType() {
        return (
            <>
                <table className="form-list">
                    <thead>
                        <tr>
                            {this.renderTableHead()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.displayedValue}
                    </tbody>
                </table>
                <FabButton onClick={this.handleAddFields} />
            </>
        );
    }
};

export default List;