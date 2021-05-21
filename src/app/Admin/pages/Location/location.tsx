import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../../../features/Form';
import FieldModel from '../../../../features/Form/Field/model';
import { RootState } from '../../../../store';
import { getLocation, setLocation } from '../../../../store/actions/locationAction';
import { Location } from '../../../../store/models/locationTypes';

interface LocationAdminProps {
    onPopUp?: (msg: string, isSuccess: boolean) => void;
}

const LocationAdmin: FC<LocationAdminProps> = (props: LocationAdminProps) => {
    const dispatch = useDispatch();
    const { location } = useSelector((state: RootState) => state.location);

    const locationForm = [
        {
            label: 'Titre',
            type: 'text',
            placeholder: 'Titre',
            value: location?.title,
            required: true,
        },
        {
            label: 'Texte',
            type: 'texteditor',
            placeholder: 'Je suis...',
            value: location?.text,
            required: true,
        },
    ] as Array<FieldModel>;

    useEffect(() => {
        dispatch(getLocation(() => console.log('error on load location')));
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
        const location = {
            title: form[0].value,
            text: form[1].value,
        } as Location;
        dispatch(setLocation(location, handleIsSuccess));
    }

    return (
        <section className="about-admin">
            <h1 className="title">Localisation</h1>
            {location ? <Form fields={locationForm} getSubmitForm={handleSubmit} buttonForm='Simple'/> : <div>loading...</div>}
        </section>
    );
}

export default LocationAdmin;