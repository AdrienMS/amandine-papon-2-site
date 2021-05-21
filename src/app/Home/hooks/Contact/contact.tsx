import React from 'react';
import './style.scss';

import Form from '../../../../features/Form';
import FieldModel from '../../../../features/Form/Field/model';

class Contact extends React.Component<{}, { form: Array<FieldModel> }> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            form: [
                {
                    label: 'Adresse Mail',
                    type: 'email',
                    placeholder: 'exemple@exemple.fr',
                    value: '',
                    size: 50,
                    required: true,
                },{
                    label: 'Nom, Prénom',
                    type: 'text',
                    placeholder: 'John Doe',
                    value: '',
                    size: 50,
                    required: true,
                },{
                    label: 'Entreprise',
                    type: 'text',
                    value: '',
                    size: 50,
                },{
                    label: 'Téléphone',
                    type: 'tel',
                    placeholder: '06********',
                    value: '',
                    size: 50,
                },{
                    label: 'Message',
                    type: 'textarea',
                    placeholder: 'Votre message...',
                    value: '',
                    required: true,
                },{
                    label: '',
                    type: 'checkbox',
                    htmlText: 'J\'ai lu et j\'accepte la <a href="https://localhost:3000/policy" className="link">politique de confidentialité</a>',
                    value: false,
                    size: 'center',
                    required: true,
                },
            ],
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleSizes);
        this.handleSizes();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleSizes);
    }

    handleSizes = () => {
        const form = this.state.form.slice().map(field => {
            if (field.size && field.size !== 'center') {
                if (window.innerWidth <= 768) {
                    field.size = 100;
                } else {
                    field.size = 50;
                }
            }
            return field;
        });
        this.setState({form: form});
    }

    handleSubmit = (form: Array<FieldModel>) => {
        this.setState({ form: form });
        console.log(this.state.form);
    }

    render() {
        return (
            <section className='contact'>
                <h2 className="title">Vous souhaitez me contacter ?</h2>
                <Form fields={this.state.form} getSubmitForm={this.handleSubmit} buttonForm='CircleArrow'/>
            </section>
        );
    }
}

export default Contact;