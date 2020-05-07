import { LOCALES } from '../i18n/locales';

const initialState = {
    language: LOCALES.ENGLISH
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'nb':
            return {
                language: LOCALES.NORWEGIAN
            }
        case 'en':
            return {
                language: LOCALES.ENGLISH
            }
    }

    return state;
}

export default reducer;