import React from 'react';
import './login.scss';
import { ILoginViewProps } from './LoginContainer';

const LoginView = (props: ILoginViewProps) => {
    const {
        error,
        login,
        processing,
    } = props

    return (
        <div className='login'>
            <div className='content'>
                <div className='text'>Fazer login no Mercafácil</div>

                {!!error && <div className='error'>{error}</div>}

                <form onSubmit={login}>
                    <div className='input-container'>
                        <label>Usuário: </label>

                        <input
                            name='username'
                            placeholder='Digite seu usuário'
                            defaultValue="VareJão"
                        />
                    </div>

                    <div className="info">Escolha "VareJão" ou "Macapá"</div>

                    <div className='input-container'>
                        <label>Senha: </label>

                        <input
                            name='password'
                            placeholder='Digite sua senha'
                            defaultValue="admin"
                        />
                    </div>

                    <div className="info">única senha válida: "admin"</div>

                    <button type='submit'>
                        {processing
                            ? 'Processando'
                            : 'Fazer login'
                        }
                    </button>

                    <div className='row'>
                        <div>
                            <input
                                type='checkbox'
                                id="keepLoggedIn"
                                name="keepLoggedIn"
                            />

                            <label className='link' htmlFor="keepLoggedIn"> Lembre-me</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginView;
