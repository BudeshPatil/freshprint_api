"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/** source/routes/posts.ts */
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../controllers/users"));
const router = express_1.default.Router();
router.get('/posts', users_1.default.getUser);
router.get('/posts/:id', users_1.default.getUser);
router.put('/posts/:id', users_1.default.updateUser);
router.delete('/posts/:id', users_1.default.deleteUser);
router.post('/adduser', users_1.default.addUser);
module.exports = router;
