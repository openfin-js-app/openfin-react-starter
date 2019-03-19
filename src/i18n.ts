import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import backend from 'i18next-xhr-backend';

i18n
    .use(detector)
    .use(backend)
    .use(initReactI18next)
    .init({
        ns: ['landing','config', "menu", ],
        backend:{
            loadPath:`${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`,
        },
        defaultNS: 'landing',
        lng:'en-US',
        fallbackLng:'en-US',

        interpolation:{
            escapeValue:false,
        }

    });

export default i18n;
