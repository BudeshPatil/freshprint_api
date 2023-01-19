/** source/controllers/userss.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
var randomstring = require("randomstring");
import fs from 'fs';
const path = '../user.json';

interface User {
  userId: Number;
  id: Number;
  name: String;
  email: String;
  role: String;
}

// adding a users
const addUser = async (req: Request, res: Response, next: NextFunction) => {
  // get the data from req.body
  let postdata = req.body;
  console.log(postdata);
  // generate userid using random string
  var userId = randomstring.generate({ length: 7, charset: 'numeric' });
  const userfiledata = fs.readFileSync('./json/user.json', 'utf8');
  let userArray: any = [];
  if (userfiledata) {
    console.log("read the user file");
    let existedUsers = JSON.parse(userfiledata);
    console.log(existedUsers);
    existedUsers.users.forEach((element: any) => {
      userArray.push(element);
    });
  }
  let newuser = {
    name: postdata.name,
    email: postdata.email,
    role: postdata.role,
    user_id: userId
  };
  userArray.push(newuser)
  // json data
  var jsonData = { users: userArray };
  // console.log(jsonData);

  var jsonContent = JSON.stringify(jsonData);
  // console.log(jsonContent);

  try {
    const data = fs.writeFileSync('./json/user.json', jsonContent);
    return res.status(200).json({
      message: 'user saved sucessfully'
    });
  } catch (error) {
    console.error(error);
  }
};

// getting all userss
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const userfiledata = fs.readFileSync('./json/user.json', 'utf8');
  let userArray: any = [];
  if (userfiledata) {
    console.log("read the user file");
    let existedUsers = JSON.parse(userfiledata);
    console.log(existedUsers);
    existedUsers.users.forEach((element: any) => {
      userArray.push(element);
    });
    try {
      return res.status(200).json({
        message: 'Get Users sucessfully',
        result: existedUsers.users
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.status(200).json({
      message: 'Users list is Empty'
    });
  }
};

// getting a single users
const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  // get the users id from the req
  let id: string = req.params.id;
  const userfiledata = fs.readFileSync('./json/user.json', 'utf8');
  let user: any = [];
  if (userfiledata) {
    console.log("Read the user file");
    let existedUsers = JSON.parse(userfiledata);
    console.log(existedUsers);
    if(existedUsers.users){
      user = existedUsers.users.filter((item:any)=> item.user_id == id);
    }
    try {
      return res.status(200).json({
        message: 'Get User sucessfully',
        result: user
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.status(200).json({
      message: 'Users list Empty'
    });
  }
};

// updating a users
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  // get the users id from the req.params
  let id: string = req.params.id;
  // get the data from req.body
  let postdata = req.body;
  console.log(postdata);
  // generate userid using random string
  const userfiledata = fs.readFileSync('./json/user.json', 'utf8');
  let userArray: any = [];
  if (userfiledata) {
    console.log("read the user file");
    let existedUsers = JSON.parse(userfiledata);
    console.log(existedUsers);
    existedUsers.users.forEach((element: any) => {
      if(element && element.user_id == id){
        element.name = postdata.name,
        element.email = postdata.email,
        element.role = postdata.role
      }
      userArray.push(element);
    });
  }
  // json data
  var jsonData = { users: userArray };
  // console.log(jsonData);

  var jsonContent = JSON.stringify(jsonData);
  // console.log(jsonContent);

  try {
    const data = fs.writeFileSync('./json/user.json', jsonContent);
    return res.status(200).json({
      message: 'user Update sucessfully'
    });
  } catch (error) {
    console.error(error);
  }
};

// deleting a users
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  // get the users id from the req.params
  let id: string = req.params.id;
  // get the data from req.body
  let postdata = req.body;
  console.log(postdata);
  // generate userid using random string
  const userfiledata = fs.readFileSync('./json/user.json', 'utf8');
  let userArray: any = [];
  if (userfiledata) {
    console.log("read the user file");
    let existedUsers = JSON.parse(userfiledata);
    console.log(existedUsers);
    existedUsers.users.forEach((element: any) => {
      if(element && element.user_id != id){
        userArray.push(element);
      }
    });
  }
  // json data
  var jsonData = { users: userArray };
  // console.log(jsonData);

  var jsonContent = JSON.stringify(jsonData);
  // console.log(jsonContent);

  try {
    const data = fs.writeFileSync('./json/user.json', jsonContent);
    return res.status(200).json({
      message: 'user Update sucessfully'
    });
  } catch (error) {
    console.error(error);
  }
};



export default { getUsers, getSingleUser, updateUser, deleteUser, addUser };