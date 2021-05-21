import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

import Form from '../../../../features/Form';
import FieldModel from '../../../../features/Form/Field/model';
import { RootState } from '../../../../store';
import { deleteService, getServices, setServicesInformations, setSingleService } from '../../../../store/actions/servicesAction';
import { Service, Services } from '../../../../store/models/servicesTypes';
import FabButton from '../../../../features/FabButton/fabButton';
import ServiceAdmin from './components/Service/service';

interface ServicesAdminProps {
    onPopUp?: (msg: string, isSuccess: boolean) => void;
}

const ServicesAdmin: FC<ServicesAdminProps> = (props: ServicesAdminProps) => {
    const dispatch = useDispatch();
    const { services } = useSelector((state: RootState) => state.services);
    const { images } = useSelector((state: RootState) => state.images);
    const [servicesState, setServicesState] = useState(null as Services | null);
    const [indexToShow, setIndexToShow] = useState(0);

    useEffect(() => {
        dispatch(getServices());
    }, [dispatch]);

    useEffect(() => {
        if (services) { setServicesState(JSON.parse(JSON.stringify(services))); }
    }, [services]);

    const servicesInformationsForm = [
        {
            label: 'Informations',
            type: 'group',
            value: [
                {
                    label: 'Titre',
                    placeholder: 'Titre',
                    type: 'text',
                    value: services?.title
                },
                {
                    label: 'Texte',
                    placeholder: 'Mes services...',
                    type: 'texteditor',
                    value: services?.subTitle
                }
            ],
        },
    ] as Array<FieldModel>;

    const renderButtons = () => {
        if (servicesState) {
            return servicesState.items.slice().map((service, index) => {
                return <button className={`services-admin-panels-button${indexToShow === index ? ' selected' : ''}`} onClick={e => handleChangeView(e, index)} key={index}>
                    {service.name ? service.name : 'Nouveau service'}
                </button>;
            });
        }
        return <></>
    }

    const renderForms = (s: Services | null) => {
        if (s) {
            return s.items.slice().map((service, index) =>
                <ServiceAdmin
                    service={service}
                    key={index}
                    keyID={index}
                    images={images}
                    isShow={indexToShow === index}
                    onSubmitForm={handleSubmitForm}
                    onDelete={handleDelete}
                />);
        }
        return <></>;
    }

    const handleAddService = () => {
        if (servicesState) {
            const n_services = {...servicesState};
            n_services.items.push({
                name: '',
                desc: '',
                image: '',
                content: '',
            } as Service);
            setServicesState(n_services);
            setIndexToShow(n_services.items.length - 1);
        }
    }

    const handleChangeView = (e: React.MouseEvent, index: number) => {
        e.preventDefault();
        setIndexToShow(index);
    }

    const handleIsSuccess = (isSuccess: boolean) => {
        if (props.onPopUp) {
            if (isSuccess) {
                props.onPopUp('Les nouvelles informations ont été enregistrées avec succès', true);
            } else {
                props.onPopUp('Une erreur est survenue, merci de contacter l\'administrateur', false);
            }
        }
    }

    const handleSubmitForm = (form: Array<FieldModel>, index: number) => {
        if (servicesState) {
            const m_services = {...servicesState};
            let isNew = false;

            if (m_services.items.length === index) {
                m_services.items.push({} as Service);
                isNew = true;
            } else if (m_services.items.length < index) {
                if (props.onPopUp) props.onPopUp('Veuillez sauvegarder les services avant celui-ci pour pouvoir continuer', false);
                return ;
            }

            m_services.items[index].name = (form[0].value as Array<FieldModel>)[0].value;
            m_services.items[index].desc = (form[0].value as Array<FieldModel>)[1].value;
            m_services.items[index].image = form[1].value;
            m_services.items[index].content = form[2].value;

            setServicesState(m_services);
            dispatch(setSingleService(m_services.items[index], index, isNew, handleIsSuccess));
        }
    }

    const handleDelete = (index: number) => {
        if (services && servicesState) {
            const m_services = {...services};

            if (m_services.items.length <= index) {
                servicesState.items.splice(index, 1);
            } else {
                setServicesState(m_services);
                dispatch(deleteService(index, handleIsSuccess));

            }
            setIndexToShow(0);
        }
    }

    const handleSubmitData = (form: Array<FieldModel>) => {
        const n_services = {
            title: form[0].value[0].value,
            subTitle: form[0].value[1].value,
            items: services?.items,
        } as Services;
        dispatch(setServicesInformations(n_services, handleIsSuccess));
    }

    return (
        <section className="services-admin">
            <h1 className="title">Services</h1>
            <div className="services-admin-informations">
                <Form fields={servicesInformationsForm} getSubmitForm={handleSubmitData} />
            </div>
            <div className="services-admin-panels">
                <div className="services-admin-panels-buttons">
                    {renderButtons()}
                </div>
                <div className="services-admin-panels-panel">
                    {servicesState ? renderForms(servicesState) : renderForms(services)}
                </div>
            </div>
            <FabButton onClick={handleAddService} />
        </section>
    );
}

export default ServicesAdmin;