import React from 'react';
import { Link } from 'react-router-dom';
import ButtonIcon from '../../../../../core/assets/styles/components/ButtonIcon';
import AuthCard from '../Card';
import './styles.scss';
import { useForm } from 'react-hook-form';

type FormData = {

    email: string;
    password: string;
}

const Login = () => {

    const { register, handleSubmit } = useForm<FormData>(); // initialize the hook

    const onSubmit = (data: FormData) => {

        console.log(data);

        //Chamar API de autentificaçaõ

    }

    return (

        <AuthCard title="login">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    className="form-control input-base margin-bottom-30"
                    placeholder="Email"
                    name="email"
                    ref={register}
                 />
                <input
                    type="password"
                    className="form-control input-base"
                    placeholder="Senha"
                    name="password"
                    ref={register}
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