import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './style.scss';

import {
    Route,
    Switch
} from 'react-router-dom';

import * as ROUTES from '../constants/routes';

import {
    AboutAdmin,
    BannerAdmin,
    CompaniesAdmin,
    ContactAdmin,
    HomeAdmin,
    LocationAdmin,
    MediaAdmin,
    ServicesAdmin
} from './pages';

import HeaderAdmin from './components/Header/header';
import { getImages } from '../../store/actions/imagesAction';

import PopUpMessage from '../../features/PopUpMessage/popUpMessage';

const popupDataInitializer = {
    msg: '',
    isSuccess: false,
};

const Admin: FC = () => {
    const dispatch = useDispatch();
    const [isClose, setIsClose] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupDatas, setPopupDatas] = useState(popupDataInitializer);

    useEffect(() => {
        dispatch(getImages(() => console.log('error on load images')));
    }, [dispatch]);

    const handlePopUp = (msg: string, isSuccess: boolean) => {
        setPopupDatas({
            msg: msg,
            isSuccess: isSuccess,
        });
        setPopupVisible(true);
    }

    return (
        <div className={`admin${isClose ? ' close' : ''}`}>
            <header className='admin-header'>
                <HeaderAdmin isClose={isClose} onClick={() => setIsClose(!isClose)}/>
            </header>
            <div className="admin-container">
                <Switch>
                    <Route exact path={ROUTES.ADMIN_MEDIA} component={MediaAdmin} />
                    <Route exact path={ROUTES.ADMIN_ABOUT} render={() => <AboutAdmin onPopUp={handlePopUp} />} />
                    <Route exact path={ROUTES.ADMIN_BANNER} render={() => <BannerAdmin onPopUp={handlePopUp} />} />
                    <Route exact path={ROUTES.ADMIN_COMPANIES} render={() => <CompaniesAdmin onPopUp={handlePopUp} />} />
                    <Route exact path={ROUTES.ADMIN_CONTACT} component={ContactAdmin} />
                    <Route exact path={ROUTES.ADMIN_LOCATION} render={() => <LocationAdmin onPopUp={handlePopUp} />} />
                    <Route exact path={ROUTES.ADMIN_SERVICES} render={() => <ServicesAdmin onPopUp={handlePopUp} />} />
                    <Route exact path={ROUTES.ADMIN} component={HomeAdmin} />
                </Switch>
            </div>
            <PopUpMessage
                msg={popupDatas.msg}
                isSuccess={popupDatas.isSuccess}
                visible={popupVisible}
                duration={3000}
                endAnimation={() => setPopupVisible(false)}
            />
        </div>
    );
}

export default Admin;