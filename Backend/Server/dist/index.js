"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const server_1 = require("./server");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
// app.use( express.static( 'public' ) )
const server = new server_1.Server();
server.listen();
