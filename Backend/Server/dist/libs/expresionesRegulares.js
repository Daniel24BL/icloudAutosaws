"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpresionesRegulares = void 0;
exports.ExpresionesRegulares = {
    text: /([a-zA-Z])/,
    number: /([0-9])/,
    character: /[^a-zA-Z\d\s]/,
    email: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
    spaces: /\s/g,
};
