import React, { FormEvent } from 'react';
import './style.scss';

import FieldModel from './Field/model';
import Fields from './Fields/fields';

import store from '../../store';
import { Image } from '../../store/models/imagesTypes';

interface FormProps {
    fields: Array<FieldModel>;
    getSubmitForm: (form: Array<FieldModel>) => void;
    buttonForm?: string;
    onDelete?: () => void;
}

interface FormState {
    fields: Array<FieldModel>;
    isValid: boolean;
    formId : string;
    images?: Array<Image>;
}

class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps | Readonly<FormProps>) {
        super(props);
        this.state = {
            fields: props.fields.slice(),
            isValid: false,
            formId: this.generateFormId(),
        };
    }

    componentDidMount() {
        this.updateFromStore();
    }

    updateFromStore() {
        store.subscribe(() => {
            const images = store.getState().images.images;
            this.setState({
                images: images ? images : undefined
            });
        });
    }

    addErrorMessage = (field: FieldModel) => {
        let error = undefined;
        const condition = (field.required ? true : false) && (field.value === '' || field.value === null || field.value === undefined);
        switch (field.type) {
            case 'email':
                // eslint-disable-next-line no-control-regex
                const regexMail = new RegExp('([-!#-\'*+/-9=?A-Z^-~]+(\\.[-!#-\'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+');
                const regMailValue = !regexMail.test(field.value);
                if (condition || field.value ? regMailValue : false) {
                    error = 'Veuillez ajouter une adresse mail valide';
                }
                break;
            case 'password':
                if (condition) {
                    error = 'Le mot de passe doit être rempli';
                }
                break;
            case 'tel':
                const regexPhone = new RegExp('^0[1-6]{1}(([0-9]{2}){4})|((s[0-9]{2}){4})|((-[0-9]{2}){4})$');
                const regPhoneValue = !regexPhone.test(field.value);
                if (condition || field.value ? regPhoneValue : false) {
                    error = 'Veuillez ajouter un numéro de téléphone valide';
                }
                break;
            default:
                if (condition) {
                    error = `Le champ ${field.label} doit être rempli`;
                }
                break;
        }
        return error;
    }

    handleOnChange = (fields: Array<FieldModel>, parentID: number) => {
        const form = document.getElementById(this.state.formId) as HTMLFormElement;
        this.setState({fields: fields, isValid: form.checkValidity()});
    }
    
    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const fields = this.state.fields.slice();
        let isError = false;
        for (let key in fields) {
            if (fields[key].error) {
                isError = true;
            }
        }
        if (!isError) {
            this.props.getSubmitForm(this.state.fields.slice());
        }
    }

    changeImagesOnGroup = (fields: Array<FieldModel>) => {
        return fields;
    }

    handleImagesChanged = () => {
    }

    generateFormId() {
        let id = '';
        while (id.length < 10) {
            id += Math.random().toString(16).substring(2);
        }
        return id.substring(0, 10);
    }

    handleOnDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        if (this.props.onDelete) this.props.onDelete();
    }

    renderButtons(formId: string) {
        return (
            <div className="form-buttons">
                <button className="simple-button cancel" onClick={this.handleOnDelete}>Supprimer</button>
                {this.renderButton(formId)}
            </div>
        );
    }

    renderButton(formId: string) {
        let button = <button className="simple-button" type='submit' form={formId} value='Submit' disabled={!this.state.isValid}>Envoyer</button>;
        if (this.props.buttonForm) {
            switch (this.props.buttonForm) {
                case 'Simple': 
                    break;
                case 'CircleArrow':
                    button = (
                        <div className="circle-arrow-container">
                            <button className="circle-arrow-button" type='submit' form={formId} value='Submit' disabled={!this.state.isValid}>
                                <span className="circle-arrow-circle" aria-hidden='true'>
                                    <span className="circle-arrow-icon"></span>
                                </span>
                                <span className="circle-arrow-text">Envoyer</span>
                            </button>
                        </div>
                    );
                    break;
                default:
                    break;
            }
        }
        return button;
    }

    renderFieldsData(fields: Array<FieldModel>) {
        const r_fields = fields.slice().map((field, index) => {
            field.fieldID = index;
            if (field.type === 'group') {
                field.value = this.renderFieldsData(field.value);
            }
            return field;
        });
        return r_fields;
    }

    render() {
        const fields = this.state.fields.slice();
        return (
            <form onSubmit={this.handleSubmit} id={this.state.formId} className='form'>
                <Fields
                    fields={this.renderFieldsData(fields)}
                    addErrorMessage={this.addErrorMessage}
                    keyID={0}
                    onDetectChanges={this.handleOnChange}
                    onImagesChanged={this.handleImagesChanged}
                />
                {this.props.onDelete ? this.renderButtons(this.state.formId) : this.renderButton(this.state.formId)}
            </form>
        );
    }
}

export default Form;