let tokensByEmail = {};

function login(credentials) {
    const { email, isValid } = credentials;

    if (isValid) {
        tokensByEmail[email] = generateAuthToken();

        return { responseData: { token: tokensByEmail[email] }, status: 200 };
    } else {
        return { responseData: { error: 'Credenciais inválidas' }, status: 401 };
    }
}

function logout(credentialToken) {
    const token = credentialToken.token;

    const email = getEmailByToken(token);
    if (email) {
        delete tokensByEmail[email];

        return { responseData: { message: 'Logout bem-sucedido' }, status: 200 };
    } else {
        return { responseData: { error: 'Token inválido' }, status: 401 };
    }
}

function checkAuthToken(credentialToken) {
    const token = credentialToken.token;
    
    if( checkToken(token) ) {
        return { responseData: { isValid: true }, status: 200 };
    } else {
        return { responseData: { isValid: false }, status: 401 };
    }
}

function generateAuthToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function getEmailByToken(token) {
    return Object.keys(tokensByEmail).find(key => tokensByEmail[key] === token);
}

function checkToken(token) {
    return Object.values(tokensByEmail).includes(token);
}

module.exports = {
    login,
    logout,
    checkAuthToken,
    checkToken,
    getEmailByToken,
};
