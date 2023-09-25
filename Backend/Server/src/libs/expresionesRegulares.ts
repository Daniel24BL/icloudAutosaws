export const ExpresionesRegulares = {
    text     : /([a-zA-Z])/,
    number   : /([0-9])/,
    character: /[^a-zA-Z\d\s]/,
    email    : /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
    spaces   : /\s/g,
}
