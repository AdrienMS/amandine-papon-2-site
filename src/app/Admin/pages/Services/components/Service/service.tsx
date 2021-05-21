import React, { FC, useState } from 'react';
import './style.scss';

import { Service } from '../../../../../../store/models/servicesTypes';
import { Image } from '../../../../../../store/models/imagesTypes';
import FieldModel from '../../../../../../features/Form/Field/model';
import Form from '../../../../../../features/Form';

interface ServiceAdminProps {
    service: Service;
    images: Array<Image> | null;
    keyID: number;
    isShow: boolean;
    onSubmitForm: (form: Array<FieldModel>, index: number) => void;
    onDelete: (index: number) => void;
}

const ServiceAdmin: FC<ServiceAdminProps> = (props: ServiceAdminProps) => {
    const [formService] = useState([
        {
            label: '',
            type: 'group',
            size: 70,
            value: [
                {
                    label: 'Nom',
                    type: 'text',
                    placeholder: 'Nom',
                    value: props.service.name,
                    required: true,
                },
                {
                    label: 'Description',
                    type: 'texteditor',
                    placeholder: 'Ce service...',
                    value: props.service.desc,
                    required: true,
                }
            ]
        },
        {
            label: 'Image du service',
            type: 'image',
            required: true,
            value: props.service.image,
            images: props.images,
            size: 30,
        },
        {
            label: '',
            type: 'texteditor',
            required: true,
            placeholder: 'Ce service...',
            value: props.service.content
        }
    ] as Array<FieldModel>);

    const handleSubmitForm = (form: Array<FieldModel>) => {
        props.onSubmitForm(form, props.keyID);
    }

    const handleDelete = () => {
        props.onDelete(props.keyID);
    }
    
    return (
        <>
            {props.isShow ? <div className='service-admin'>
                <Form fields={formService} getSubmitForm={handleSubmitForm} key={props.keyID} onDelete={handleDelete}/>
            </div> : <></>}
        </>
    );
}

export default ServiceAdmin;