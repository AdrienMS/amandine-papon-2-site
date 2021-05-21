import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

import { signin, setError, setLoading } from '../../store/actions/authAction';
import { RootState } from '../../store';

import Form from '../../features/Form';
import FieldModel from '../../features/Form/Field/model';

const Login: FC = () => {
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.auth);

    const loginForm = [
        {
            label: 'Email',
            type: 'email',
            placeholder: 'exemple@exemple.fr',
            value: '',
            required: true,
        },
        {
            label: 'Mot de passe',
            type: 'password',
            value: '',
            required: true,
        },
    ] as Array<FieldModel>;

    useEffect(() => {
        return () => {
            if(error) {
                dispatch(setError('error on log in'));
            }
        }
    }, [error, dispatch]);

    const hanleSubmit = (form: Array<FieldModel>) => {
        setLoading(true);
        dispatch(signin({ email: form[0].value, password: form[1].value}, () => { setLoading(false); console.log('error')}));
    }

    return (
        <div className="login">
            <h1 className="title">Se connecter</h1>
            <Form fields={loginForm} getSubmitForm={hanleSubmit} buttonForm='CircleArrow'/>
        </div>
    );
}

export default Login;