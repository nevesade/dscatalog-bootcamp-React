import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ButtonIcon from '../../../../../core/assets/styles/components/ButtonIcon';
import AuthCard from '../Card';
import './styles.scss';
import { useForm } from 'react-hook-form';
import { makeLogin } from '../../../../../core/utilis/request';
import { saveSessionData } from '../../../../../core/utilis/auth';

type FormData = {

    username: string;
    password: string;
}

const Login = () => {

    const { register, handleSubmit } = useForm<FormData>(); // initialize the hook
    const [hasError, setHasError] = useState(false);
    const history = useHistory();


    const onSubmit = (data: FormData) => {

        console.log(data);

        //Chamar API de autentificaçaõ

        makeLogin(data)
        .then(response => {
            setHasError(false);
            saveSessionData(response.data);
            history.push('/admin/products');
        })
        .catch(() => {
            setHasError(true);
        })



    }

    return (

        <AuthCard title="login">
            {hasError && (
                <div className="alert alert-danger">
                    Usuário ou senha inválidos!
                </div>
            )}
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    className="form-control input-base margin-bottom-30"
                    placeholder="Email"
                    name="username"
                    ref={register ({required:true})}
                />
                <input
                    type="password"
                    className="form-control input-base"
                    placeholder="Senha"
                    name="password"
                    ref={register ({required:true})}
                />
                <Link to="/admin/auth/recover" className="login-link-recover">
                    Esqueci a senha?
                </Link>
                <div className="login-submit">
                    <ButtonIcon text="LOGAR" />
                </div>

                <div className="text-center">
                    <span className="not-registered">
                        Não tem cadastro?
                    </span>
                    <Link to="/admin/auth/register" className="login-link-register">
                        CADASTRAR
                    </Link>
                </div>
            </form>
        </AuthCard>
    )
}


export default Login;