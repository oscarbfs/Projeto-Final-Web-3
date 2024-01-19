let warnings = [];
let warningIdCounter = 1;

function createWarning(warningData, user_id) {
    try {
        const warning = {
            id: (warningIdCounter++).toString(),
            user_id: user_id,
            class_id: warningData.class_id,
            message: warningData.message,
        };

        warnings.push(warning);
        return { responseData: warning, status: 201 };
    } catch (error) {
        return { responseData: { error: `Falha ao criar aviso. ${error}` }, status: 400 };
    }
}

function getClassWarnings(class_id) {
    try {
        const classWarnings = warnings.filter((warning) => warning.class_id === class_id);
        return { responseData: classWarnings, status: 200 };
    } catch (error) {
        return { responseData: { error: `Erro ao buscar avisos. ${error}` }, status: 400 };
    }
}

function updateWarning(updatedWarning, user_id) {
    try {
        const index = warnings.findIndex(
            (warning) => warning.id === updatedWarning.id && warning.user_id === user_id
        );

        if (index !== -1) {
            warnings[index] = { ...warnings[index], ...updatedWarning };
            return { responseData: warnings[index], status: 200 };
        } else {
            return { responseData: { error: `Aviso não encontrado ou você não tem permissão.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao atualizar aviso. ${error}` }, status: 400 };
    }
}

function deleteWarning(warningData, user_id) {
    try {
        const index = warnings.findIndex(
            (warning) => warning.id === warningData.id && warning.user_id === user_id
        );

        if (index !== -1) {
            warnings.splice(index, 1);
            return { responseData: { message: 'Aviso removido com sucesso' }, status: 200 };
        } else {
            return { responseData: { error: `Aviso não encontrado ou você não tem permissão.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao remover aviso. ${error}` }, status: 400 };
    }
}

module.exports = {
    createWarning,
    getClassWarnings,
    updateWarning,
    deleteWarning,
};
