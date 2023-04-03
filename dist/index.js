"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// configuration the .env file
dotenv_1.default.config();
// create express app
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
//define the first route app
app.get('/', (req, res) => {
    res.status(200).json({ "data": { "message": " Goodbye, world" } });
});
app.get('/hello/:name', (req, res) => {
    res.status(200).json({ "data": { "message": `Hola, ${req.params.name ? req.params.name : 'anonimo'}` } });
});
//excute app and listen request to port
app.listen(port, () => {
    console.log(`express server: runnig at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map