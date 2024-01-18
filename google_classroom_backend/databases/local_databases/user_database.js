let users = [];
let userIdCounter = 1;

function createUser(user) {
    try {
        if (searchUsers(null, user.email).responseData.length > 0) {
            return { responseData: { error: 'Email já em uso' }, status: 400 };
        } else {
            user.id = (userIdCounter++).toString();
            users.push(user);
            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;
            return { responseData: userWithoutPassword, status: 201 };
        }
    } catch (error) {
        return { responseData: { error: "Falha ao criar usuário"}, status: 400 };
    }
}

function getUser(id) {
    try {
        const foundUser = users.find(user => user.id === id);
        
        if (foundUser) {
            const userWithoutPassword = { ...foundUser };
            delete userWithoutPassword.password;
            return { responseData: userWithoutPassword, status: 200 };
        } else {
            return { responseData: { error: 'Usuário não encontrado' } , status: 404 };
        }
    } catch (error) {
        return { responseData: { error: "Falha ao buscar usuário"}, status: 400 };
    }
}

function getClassUsers(creator_id, members_ids) {
    try {
        const classUsers = users.filter(user => user.id === creator_id || members_ids.includes(user.id));
        const usersWithoutPassword = classUsers.map(user => {
            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;
            return userWithoutPassword;
        });
        return { responseData: usersWithoutPassword, status: 200 };
    } catch (error) {
        return { responseData: { error: 'Erro ao buscar usuários da turma' }, status: 400 };
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
    try {
        const index = users.findIndex(c => c.id === user.id);
        
        if (index !== -1) {
            users[index] = { ...users[index], ...user };
            const updatedUserWithoutPassword = { ...users[index] };
            delete updatedUserWithoutPassword.password;
            return { responseData: updatedUserWithoutPassword, status: 200 };
        } else {
            return { responseData: { error: 'Usuário não encontrado' } , status: 404 };
        }
    } catch (error) {
        return { responseData: { error: 'Erro ao atualizar usuário' }, status: 400 };
    }
}

function deleteUser(user) {
    try {
        const index = users.findIndex(c => c.id === user.id);
        
        if (index !== -1) {
            users.splice(index, 1);
            return { responseData: { message: 'Usuário deletado com sucesso' } , status: 200 };
        } else {
            return { responseData: { error: 'Usuário não encontrado' } , status: 404 };
        }
    } catch (error) {
        return { responseData: { error: 'Erro ao deletar usuário' }, status: 400 };
    }
}

function verifyCredentials(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
}

module.exports = {
    createUser,
    searchUsers,
    getUser,
    getClassUsers,
    updateUser,
    deleteUser,
    verifyCredentials,
};
