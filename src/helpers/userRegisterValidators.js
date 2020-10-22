
const validateName = (fieldName, value) => {
    if (value.trim() === '') {
        return `Le ${fieldName} est requis.`;
    }

    if (/[^a-zA-Z -]/.test(value)) {
        return `Le ${fieldName} est incorrect.`;
    }

    if (value.trim().length < 3) {
        return `Le ${fieldName} est trop court.`;
    }

    return null;
};

const validateDateField = (fieldName, value) => {
    if (value === '') {
        return `${fieldName} est requis`;
    }
    return null;
};

const validateDate = (fieldName, value) => {
    if (!(value instanceof Date)) {
        return `La ${fieldName} est incorrect.`;
    }

    return null;
};

const validateUsername = (value) => {
    if (value.trim() === '') {
        return 'Le nom d\'utilisateur est requis';
    }

    if (!/^(?=[a-zA-Z0-9._]{4,10}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(value)){
        return 'Le nom d\'utilisateur est incorect.';
    }

    return null;
};

const validateTel = (value) => {
    if (value.trim === '') {
        return 'Le numero de telephone est requies.';
    }

    if (value.trim().length < 10) {
        return 'Le numero de telephone est compose\' de 10 chiffres.';
    }

    if (/[^0-9]/.test(value)) {
        return 'Le numero de telephone est incorect.';
    }
    
    return null;
};

const validatePassword = (value) => {
    if (value === '') {
        return 'Le mot de passe est requis.';
    }

    if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_]?)[A-Za-z\d@$!%*#_?&]{8,}$/.test(value)) {
        return null;
    }

    return 'Plus ou moins un chiffre et une lettre. Longueur minimale: 8 caracteres.';

};

export const validators = {
    name: name => validateName('prenom', name),
    f_name: name => validateName('nom', name),
    l_name: name => validateName('postnom', name),
    username: name => validateUsername(name),
    day: value => validateDateField('jour', value),
    month: value => validateDateField('mois', value),
    year: value => validateDateField('annee', value),
    tel: value => validateTel(value),
    password: value => validatePassword(value),
    confirmPassword: value => validatePassword(value),
    date: value => validateDate(value)
};