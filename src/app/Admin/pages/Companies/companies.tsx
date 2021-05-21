import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

import Form from '../../../../features/Form';
import FieldModel, { INPUT, IMAGE } from '../../../../features/Form/Field/model';
import { RootState } from '../../../../store';
import { getCompanies, setCompanies } from '../../../../store/actions/companiesAction';
import { Companies, Company } from '../../../../store/models/companiesTypes';

// import FabButton from '../../../../features/FabButton/fabButton';

interface CompaniesAdminProps {
    onPopUp?: (msg: string, isSuccess: boolean) => void;
}

const CompaniesAdmin: FC<CompaniesAdminProps> = (props: CompaniesAdminProps) => {
    const dispatch = useDispatch();
    const { companies } = useSelector((state: RootState) => state.companies);
    const { images } = useSelector((state: RootState) => state.images);

    const companiesForm = [
        {
            label: 'Titre',
            type: 'text',
            placeholder: 'Titre',
            value: companies?.title,
            required: true,
        },
        {
            label: '',
            type: 'list',
            value: undefined,
            required: true,
            images: images,
            model: [
                {
                    type: INPUT,
                    label: 'Nom',
                    size: 30,
                },
                {
                    type: INPUT,
                    label: 'Lien',
                    size: 30,
                },
                {
                    type: IMAGE,
                    label: 'Image',
                    size: 30,
                },
            ]
        },
    ] as Array<FieldModel>;

    useEffect(() => {
        dispatch(getCompanies(() => console.log('error on load location')));
    }, [dispatch]);

    function initList(items: Array<Company>) {
        return items.slice().map(item => {
            return [item.name, item.link, item.image];
        });
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

    const handleSubmit = (form: Array<FieldModel>) => {
        const companies = {
            title: form[0].value,
        } as Companies;
        const items = (form[1].value as Array<any[]>).slice().map(item => {
            return {
                name: item[0],
                link: item[1],
                image: item[2]
            };
        });
        companies.items = items;
        dispatch(setCompanies(companies, handleIsSuccess));
    }

    const renderForm = () => {
        if (companies && companies.items) {
            companiesForm[1].value = initList(companies.items);
        }
        return <>{companies ? <Form fields={companiesForm} getSubmitForm={handleSubmit} buttonForm='Simple'/> : <div>loading...</div>}</>
    }

    return (
        <section className="companies-admin">
            <h1 className="title">Entreprises</h1>
            {renderForm()}
        </section>
    );
}

export default CompaniesAdmin;