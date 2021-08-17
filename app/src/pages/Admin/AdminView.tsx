import React from 'react';
import { getUser } from '@services/auth';
import './admin.scss';
import InputMask from "react-input-mask";

import { IAdminViewProps } from './AdminContainer';

const AdminView = (props: IAdminViewProps) => {
    const {
        processing,
        addUser,
        error,
        logout
    } = props

    return (
        <div className='admin'>
            <h1>Mercafácil</h1>
            Bem vindo de volta {getUser()?.username}!

            <p>Adicionar contatos de clientes</p>

            {!!error && <div className='error'>{error}</div>}

            <form onSubmit={addUser} id='form'>
                <div className='input-container'>
                    <label>Cliente:</label>

                    <input
                        name='username'
                        placeholder='Nome do cliente'
                    />
                </div>

                <div className='input-container'>
                    <label>Celular: </label>

                    <InputMask
                        placeholder='+00 (00) 00000-0000'
                        mask="+99 (99) 99999-9999"
                        name='cellphone'
                    />
                </div>

                <button type='submit'>
                    {processing
                        ? 'Processando'
                        : 'Adicionar contato'
                    }
                </button>
            </form>

            <span onClick={logout}>Sair</span>
        </div>
    )
}

export default AdminView;
