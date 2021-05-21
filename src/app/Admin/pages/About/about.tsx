import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../../../features/Form';
import FieldModel from '../../../../features/Form/Field/model';
import { RootState } from '../../../../store';
import { getAbout, setAbout } from '../../../../store/actions/aboutAction';
import { About } from '../../../../store/models/aboutTypes';

interface AboutAdminProps {
    onPopUp?: (msg: string, isSuccess: boolean) => void;
}

const AboutAdmin: FC<AboutAdminProps> = (props: AboutAdminProps) => {
    const dispatch = useDispatch();
    const { about } = useSelector((state: RootState) => state.about);
    const { images } = useSelector((state: RootState) => state.images);

    const aboutForm = [
        {
            label: '',
            type: 'group',
            size: '65',
            value: [
                {
                    label: 'Titre',
                    type: 'text',
                    placeholder: 'Titre',
                    value: about?.title,
                    required: true,
                },
                {
                    label: 'Sous titre',
                    type: 'text',
                    placeholder: 'Sous Titre',
                    value: about?.subTitle,
                    required: true,
                },
                {
                    label: 'Texte',
                    type: 'texteditor',
                    placeholder: 'Je suis...',
                    value: about?.text,
                    required: true,
                }
            ]
        },
        {
            label: 'Photos',
            type: 'group',
            size: '35',
            value: [
                {
                    label: 'Photo de profil',
                    type: 'image',
                    value: about?.profil,
                    required: true,
                    images: images,
                },
                {
                    label: 'Photo de fond',
                    type: 'image',
                    value: about?.background,
                    required: true,
                    images: images,
                },
            ]
        },
    ] as Array<FieldModel>;

    useEffect(() => {
        dispatch(getAbout());
    }, [dispatch]);

    const handleIsSuccess = (isSuccess: boolean) => {
        if (props.onPopUp) {
            if (isSuccess) {
                props.onPopUp('Les nouvelles informations ont été enregistrées avec succès', true);
            } else {
                props.onPopUp('Une erreur est survenue, merci de contacter l\'administrateur', false);
            }
        }
    }

    const handleSubmit = (form: Array<FieldModel>) => {
        const about = {
            title: form[0].value[0].value,
            subTitle: form[0].value[1].value,
            text: form[0].value[2].value,
            profil: form[1].value[0].value,
            background: form[1].value[1].value,
        } as About;
        dispatch(setAbout(about, handleIsSuccess));
    }

    return (
        <section className="about-admin">
            <h1 className="title">À propos</h1>
            {about ? <Form fields={aboutForm} getSubmitForm={handleSubmit} buttonForm='Simple'/> : <div>loading...</div>}
        </section>
    );
}

export default AboutAdmin;