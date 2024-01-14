let classes = [];

function createClass(classData) {
    if(classData.creator) {
        delete classData.token;
        classes.push(classData);
        return { responseData: classData, status: 201 };
    } else {
        return { responseData: { error: 'Token invalido' }, status: 400 };
    }
}

function getClass(id) {
    const foundClass = classes.find(cls => cls.id === id);
    return foundClass ? { responseData: foundClass, status: 200 } : { responseData: { error: 'Turma não encontrada' }, status: 404 };
}

function searchClasses(name, discipline) {
    try {
        const foundClasses = classes.filter(user =>
            (!name || user.name === name) &&
            (!discipline || user.discipline === discipline)
        );

        return { responseData: foundClasses, status: 200 };
    } catch (error) {
        return { responseData: { error: 'Erro ao buscar turmas' }, status: 400 };
    }
}

function getUserClasses(email) {
    const { email } = classData;
    
    if(email) {
        const userClasses = classes.filter(cls => cls.creator === email || cls.members.includes(email));
        return { responseData: userClasses, status: 200 };
    } else {
        return { responseData: { error: 'Token invalido' }, status: 400 };
    }

}

function updateClass(classData) {
    const { id, name, tokenIsValid } = classData;
    const index = classes.findIndex(cls => cls.id === id);

    if (index !== -1 && tokenIsValid) {
        classes[index].name = name;
        return { responseData: classes[index], status: 200 };
    } else {
        return { responseData: { error: 'Turma não encontrada ou token inválido' }, status: 404 };
    }
}

function deleteClass(classData) {
    const { id, tokenIsValid } = classData;
    const index = classes.findIndex(cls => cls.id === id);

    if (index !== -1 && tokenIsValid) {
        delete classData.token;
        classes.splice(index, 1);
        return { responseData: { message: 'Turma deletada com sucesso' }, status: 200 };
    } else {
        return { responseData: { error: 'Turma não encontrada ou token inválido' }, status: 404 };
    }
}

function joinClass(joinData) {
    const { id, member } = joinData;
    const index = classes.findIndex(cls => cls.id === id);

    if (index !== -1) {
        if (!classes[index].members) {
            classes[index].members = [];
        }

        if (!classes[index].members.includes(member)) {
            classes[index].members.push(member);
            return { responseData: classes[index], status: 200 };
        } else {
            return { responseData: { error: 'Usuário já está na turma' }, status: 400 };
        }
    } else {
        return { responseData: { error: 'Turma não encontrada' }, status: 404 };
    }
}

module.exports = {
    createClass,
    getClass,
    searchClasses,
    getUserClasses,
    updateClass,
    deleteClass,
    joinClass,
};
