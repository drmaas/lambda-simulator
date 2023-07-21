module.exports = {
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 120,
    tabWidth: 4,
    "editor.formatOnSave": true,
    overrides: [
        {
            files: '*.json',
            options: {
                singleQuote: false,
                tabWidth: 2,
            },
        },
    ],
};
