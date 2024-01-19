let tokensByEmail = {};

function login(user) {

    if (user) {
        tokensByEmail[user.id] = generateAuthToken();

        return { responseData: { token: tokensByEmail[user.id] }, status: 200 };
    } else {
        return { responseData: { error: `Credenciais inválidas.` }, status: 401 };
    }
}

function logout(token) {

    const { isValid, user_id } = getTokenData(token);
    if (isValid) {
        delete tokensByEmail[user_id];

        return { responseData: { message: 'Logout bem-sucedido' }, status: 200 };
    } else {
        return { responseData: { error: `Token inválido.` }, status: 401 };
    }
}

function checkToken(token) {

    const tokenData = getTokenData(token);
    
    if( tokenData.isValid ) {
        return { responseData: tokenData, status: 200 };
    } else {
        return { responseData: { isValid: false }, status: 401 };
    }
}

function generateAuthToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function getTokenData(token) {
    return {
        isValid: Object.values(tokensByEmail).includes(token),
        user_id: Object.keys(tokensByEmail).find(key => tokensByEmail[key] === token)
    }
}

module.exports = {
    login,
    logout,
    checkToken,
    getTokenData,
};
