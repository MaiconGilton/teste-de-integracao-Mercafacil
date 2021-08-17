import React from 'react'
import { Link } from 'react-router-dom';
import { initRoute } from '@pages/Router';

const NotFound = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column'
        }}>
            <h1 style={{ textAlign: 'center' }}>404 - Pagina não encontrada!</h1>

            <Link to={initRoute}>
                Voltar
            </Link>
        </div>
    )
}
export default NotFound