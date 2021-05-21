import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { getCompanies } from '../../../../store/actions/companiesAction';
import { RootState } from '../../../../store';

import LoadingElement from '../../../../features/LoadingElement/LoadingElement';
import { getImageFromKey } from '../../../../store/actions/imagesAction';

import { Company } from '../../../../store/models/companiesTypes';

const Companies: FC = () => {
    const dispatch = useDispatch();
    const { companies } = useSelector((state: RootState) => state.companies);
    const { images } = useSelector((state: RootState) => state.images);

    useEffect(() => {
        dispatch(getCompanies(() => console.error('error on get companies')));
    }, [dispatch]);

    const renderImage = (company: Company) => {
        if (images) {
            const image = getImageFromKey(company.image as string, images);
            return (
                <LazyLoadImage
                    alt={`Amandine Papon - ${company.name}`}
                    placeholderSrc={image.pixelized}
                    src={image.full}
                    effect='blur'
                    className='companies-item-logo'
                />
            );
        } else {
            return (
                <div className="companies-item-logo">
                    <LoadingElement width='100%' height='100%' rounded={true} />
                </div>
            );
        }
    }

    const renderCompanies = () => {
        if (companies && companies.items) {
            return companies.items.map((company, index) => {
                return (
                    <div className="companies-item" key={`company-${index}`}>
                        <a href={company.link} className="companies-item-link" target='_blank' rel="noreferrer">
                            {renderImage(company)}
                        </a>
                    </div>
                );
            });
        } else {
            const toReturn = new Array(5);
            for (let index = 0; index < 5; index += 1) {
                toReturn[index] = (
                    <div className="companies-item" key={`company-${index}`}>
                        <div className="companies-item-link">
                            <LoadingElement width='100%' height='200px' rounded={true} />
                        </div>
                    </div>
                );
            }
            return toReturn;
        }
    }

    if (companies) {
        return (
            <section className="companies">
                <div className="companies-container">
                    <h2 className="title">{companies.title}</h2>
                    <div className="companies-list">{renderCompanies()}</div>
                </div>
            </section>
        );
    } else {
        return (
            <section className="companies">
                <div className="companies-container">
                    <h2 className="title"><LoadingElement width='50%' height='49px' rounded={true} /></h2>
                    <div className="companies-list">{renderCompanies()}</div>
                </div>
            </section>
        );
    }
}

export default Companies;