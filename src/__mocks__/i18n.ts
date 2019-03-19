import i18n from 'i18next';

i18n
    .init({
        ns: ['landing','config', "menu", ],

        defaultNS: 'landing',
        lng:'en-US',
        fallbackLng:'en-US',

        debug: true,

        interpolation:{
            escapeValue:false,
        }

    });

export default i18n;
