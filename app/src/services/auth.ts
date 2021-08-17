export const USER = "@MERCAFACIL-USER";

export const getUser = () => {
    const user = sessionStorage.getItem(USER) || localStorage.getItem(USER);
    if (user) return JSON.parse(user)
    else return null
}

export const getToken = () => {
    return getUser()?.token
}

export const isAuthenticated = () => {
    return !!getToken()
}

export const authenticate = (user, keepLogged) => {
    user = JSON.stringify(user)
    if (keepLogged) localStorage.setItem(USER, user);
    else sessionStorage.setItem(USER, user);
};

export const logout = () => {
    localStorage.removeItem(USER);
    sessionStorage.removeItem(USER);
};