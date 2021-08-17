import api from '@services/api';
import { logout } from '@services/auth';
import React from 'react';
import AdminView from './AdminView';
import { useHistory } from "react-router-dom"

export interface IAdminViewProps {
    processing: boolean;
    addUser: (e: any) => void;
    error: string;
    logout: () => void;
}

const AdminContainer = () => {
    const history = useHistory()
    const [processing, setProcessing] = React.useState(false)
    const [error, setError] = React.useState('')

    async function addUser(e) {
        try {
            e.preventDefault()
            setError('')

            const username = e.target.username.value
            const cellphone = e.target.cellphone.value

            if (!username) return setError('Inserir nome usuário!')
            else if (!cellphone) return setError('Inserir o celular!')

            setProcessing(true)
            const res = await api.post('contact/save', { username, cellphone })
            setProcessing(false)

            if (res.data.error) return setError(res.data.error)

            const form = document.getElementById("form") as any
            form?.reset();
            alert('Usuário adicionado com sucesso!')

        } catch (error) {
            setError(error.message)
        }
    }

    const passProps: IAdminViewProps = {
        processing,
        addUser,
        error,
        logout: () => {
            logout()
            history.push('/entrar')
        }
    }

    return <AdminView {...passProps} />
}

export default AdminContainer;
