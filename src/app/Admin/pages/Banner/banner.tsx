import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../../../features/Form';
import FieldModel from '../../../../features/Form/Field/model';
import { RootState } from '../../../../store';
import { getBanner, setBanner } from '../../../../store/actions/bannerAction';
import { Banner } from '../../../../store/models/bannerTypes';

interface BannerAdminProps {
    onPopUp?: (msg: string, isSuccess: boolean) => void;
}

const BannerAdmin: FC<BannerAdminProps> = (props: BannerAdminProps) => {
    const dispatch = useDispatch();
    const { banner } = useSelector((state: RootState) => state.banner);
    const { images } = useSelector((state: RootState) => state.images);

    const bannerForm = [
        {
            label: '',
            type: 'group',
            size: 65,
            value: [
                {
                    label: 'Titre',
                    type: 'text',
                    placeholder: 'Titre',
                    value: banner?.title,
                    required: true,
                },
                {
                    label: 'Sous titre n°1',
                    type: 'text',
                    placeholder: 'Sous Titre',
                    value: banner?.subTitle,
                    required: true,
                },
                {
                    label: 'Sous titre n°2',
                    type: 'text',
                    placeholder: 'Sous Titre',
                    value: banner?.subSubTitle,
                    required: true,
                },
            ]
        },
        {
            label: '',
            type: 'group',
            size: 35,
            value: [
                {
                    label: 'Photo de fond',
                    type: 'image',
                    value: banner?.image,
                    required: true,
                    images: images,
                },
            ]
        }
    ] as Array<FieldModel>;

    useEffect(() => {
        dispatch(getBanner(() => console.log('error to load banner')));
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
        const banner = {
            title: form[0].value[0].value,
            subTitle: form[0].value[1].value,
            subSubTitle: form[0].value[2].value,
            image: form[1].value[0].value,
        } as Banner;
        dispatch(setBanner(banner, handleIsSuccess));
    }

    return (
        <section className="about-admin">
            <h1 className="title">Bannière</h1>
            {banner ? <Form fields={bannerForm} getSubmitForm={handleSubmit} buttonForm='Simple'/> : <div>loading...</div>}
        </section>
    );
}

export default BannerAdmin;