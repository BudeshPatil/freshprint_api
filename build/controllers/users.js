"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
var randomstring = require("randomstring");
const fs_1 = __importDefault(require("fs"));
const path = '../user.json';
// adding a users
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get the data from req.body
    let postdata = req.body;
    console.log(postdata);
    // generate userid using random string
    var userId = randomstring.generate({ length: 7, charset: 'numeric' });
    const userfiledata = fs_1.default.readFileSync('./json/user.json', 'utf8');
    let userArray = [];
    if (userfiledata) {
        console.log("read the user file");
        let existedUsers = JSON.parse(userfiledata);
        console.log(existedUsers);
        userArray.push(existedUsers.users);
    }
    let newuser = {
        name: postdata.name,
        email: postdata.email,
        role: postdata.role,
        user_id: userId
    };
    userArray.push(newuser);
    // json data
    var jsonData = { users: userArray };
    // console.log(jsonData);
    var jsonContent = JSON.stringify(jsonData);
    // console.log(jsonContent);
    try {
        const data = fs_1.default.writeFileSync('./json/user.json', jsonContent);
        return res.status(200).json({
            message: 'user saved sucessfully'
        });
    }
    catch (error) {
        console.error(error);
    }
});
// getting all userss
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get some userss
    let result = yield axios_1.default.get(`https://jsonplaceholder.typicode.com/userss`);
    let userss = result.data;
    return res.status(200).json({
        message: userss
    });
});
// getting a single users
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get the users id from the req
    let id = req.params.id;
    // get the users
    let result = yield axios_1.default.get(`https://jsonplaceholder.typicode.com/userss/${id}`);
    let users = result.data;
    return res.status(200).json({
        message: users
    });
});
// updating a users
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // get the users id from the req.params
    let id = req.params.id;
    // get the data from req.body
    let title = (_a = req.body.title) !== null && _a !== void 0 ? _a : null;
    let body = (_b = req.body.body) !== null && _b !== void 0 ? _b : null;
    // update the users
    let response = yield axios_1.default.put(`https://jsonplaceholder.typicode.com/userss/${id}`, Object.assign(Object.assign({}, (title && { title })), (body && { body })));
    // return response
    return res.status(200).json({
        message: response.data
    });
});
// deleting a users
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get the users id from req.params
    let id = req.params.id;
    // delete the users
    let response = yield axios_1.default.delete(`https://jsonplaceholder.typicode.com/userss/${id}`);
    // return response
    return res.status(200).json({
        message: 'users deleted successfully'
    });
});
exports.default = { getUsers, getUser, updateUser, deleteUser, addUser };
