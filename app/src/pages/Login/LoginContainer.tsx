import React from 'react';
import LoginView from './LoginView';
import { useHistory } from "react-router-dom"
import { authenticate, isAuthenticated } from '@services/auth';
import api from '@services/api';

export interface ILoginViewProps {
    error: string;
    login: (event: any) => void;
    processing: boolean;
}

const LoginContainer = () => {
    const history = useHistory()
    const isUserAuthenticated = isAuthenticated()
    const [error, setError] = React.useState('')
    const [processing, setProcessing] = React.useState(false)

    async function login(e: any) {
        try {
            e.preventDefault()
            const username = e.target.username.value
            const password = e.target.password.value
            const keepLoggedIn = e.target.keepLoggedIn.checked

            if (!username) return setError('Inserir usuário!')
            else if (!password) return setError('Inserir a senha!')
            else setError('')

            setProcessing(true)
            const res = await api.post('auth/authenticate', { username, password })
            setProcessing(false)

            if (res.data.error) return setError(res.data.error)

            authenticate(res.data.user, keepLoggedIn)
            history.push('/admin')

        } catch (error) {
            setError(error.message)
        }
    }

    React.useEffect(() => {
        if (isUserAuthenticated) history.push('/admin')
    }, [history, isUserAuthenticated])

    const passProps: ILoginViewProps = {
        error,
        login,
        processing,
    }

    return <LoginView {...passProps} />
}
export default LoginContainer;
