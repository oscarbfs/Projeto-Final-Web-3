let users = [];
let userIdCounter = 1;

function createUser(user) {
    if (searchUsers(null, user.email).responseData.length > 0) {
        return { responseData: { error: 'Email já em uso' }, status: 400 };
    } else {
        user.id = userIdCounter++;
        users.push(user);
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;
        return { responseData: userWithoutPassword, status: 201 };
    }
}

function getUser(id) {
    const foundUser = users.find(
        user => user.id === id
    );

    if (foundUser) {
        const userWithoutPassword = { ...foundUser };
        delete userWithoutPassword.password;
        return { responseData: userWithoutPassword, status: 200 };
    } else {
        return { responseData: { error: 'Usuário não encontrado' } , status: 404 };
    }
}

function searchUsers(name, email) {
    try {
        const foundUsers = users.filter(user =>
            (!name || user.name === name) &&
            (!email || user.email === email)
        );
        const usersWithoutPassword = foundUsers.map(user => {
            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;
            return userWithoutPassword;
        });
        return { responseData: usersWithoutPassword, status: 200 };
    } catch (error) {
        return { responseData: { error: 'Erro ao buscar usuários' }, status: 400 };
    }
}

function updateUser(user) {
    const userId = user.id;
    const index = users.findIndex(c => c.id === userId);

    if (index !== -1) {
        users[index] = { ...users[index], ...user };
        const updatedUserWithoutPassword = { ...users[index] };
        delete updatedUserWithoutPassword.password;
        return { responseData: updatedUserWithoutPassword, status: 200 };
    } else {
        return { responseData: { error: 'Usuário não encontrado' } , status: 404 };
    }
}

function deleteUser(user) {
    if (user.id) {
        const userId = user.id;
        const index = users.findIndex(c => c.id === userId);

        if (index !== -1) {
            users.splice(index, 1);
            return { responseData: { message: 'Usuário deletado com sucesso' } , status: 200 };
        } else {
            return { responseData: { error: 'Usuário não encontrado' } , status: 404 };
        }
    } else {
        return { responseData: { error: 'Parâmetro de ID ausente ou inválido no corpo da solicitação' } , status: 400 };
    }
}

function verifyCredentials(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    return !(!user);
}

module.exports = {
    createUser,
    searchUsers,
    getUser,
    updateUser,
    deleteUser,
    verifyCredentials,
};
