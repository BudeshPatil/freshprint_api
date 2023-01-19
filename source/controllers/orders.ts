/** source/controllers/orderss.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
var randomstring = require("randomstring");
import fs from 'fs';
const path = '../order.json';

interface User {
  userId: Number;
  order_id: Number;
  apparel_id:Number;
  apparel_name:String;
  order_qty:Number;
  cost:Number
}

// adding a orders
const addOrder = async (req: Request, res: Response, next: NextFunction) => {
  // get the data from req.body
  let postdata = req.body;
  console.log(postdata);
  // generate orderid using random string
  const userfiledata = fs.readFileSync('./json/user.json', 'utf8');
  let user:any = {};
  if(userfiledata){
    console.log("read the User file");
    let existedUsers = JSON.parse(userfiledata);
    console.log(existedUsers);
    let temp = existedUsers.users.filter((item:any)=> item.user_id == postdata.user_id);
    user = temp[0];
    console.log("user is"+temp)
  }
  let apparel:any = {};
  const apparelfiledata = fs.readFileSync('./json/apparel.json', 'utf8');
  if(apparelfiledata){
    console.log("read the apparel file");
    let existedApparel = JSON.parse(apparelfiledata);
    console.log(existedApparel);
    let temp = existedApparel.apparels.filter((item:any)=> item.apparel_id == postdata.apparel_id);
    apparel = temp[0];
    console.log("apparel is"+temp)
  }
  if(user && apparel){
    var orderId = randomstring.generate({ length: 7, charset: 'numeric' });
    const orderfiledata = fs.readFileSync('./json/order.json', 'utf8');
    let orderArray: any = [];
    if (orderfiledata) {
      console.log("read the order file");
      let existedOrders = JSON.parse(orderfiledata);
      console.log(existedOrders);
      existedOrders.orders.forEach((element: any) => {
        orderArray.push(element);
      });
    }
    let neworder = {
      apparel_name: apparel.name,
      apparel_id: postdata.apparel_id,
      order_id: orderId,
      user_id: postdata.user_id,
      order_qty:postdata.order_qty,
      cost: postdata.order_qty * apparel.price
    };
    orderArray.push(neworder)
    // json data
    var jsonData = { orders: orderArray };
    // console.log(jsonData);

    var jsonContent = JSON.stringify(jsonData);
    // console.log(jsonContent);

    try {
      const data = fs.writeFileSync('./json/order.json', jsonContent);
      return res.status(200).json({
        message: 'order saved sucessfully'
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.status(200).json({
      message: 'User or Apparel is missing'
    });
  }
};

// getting all orderss
const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  const orderfiledata = fs.readFileSync('./json/order.json', 'utf8');
  let orderArray: any = [];
  if (orderfiledata) {
    console.log("read the order file");
    let existedOrders = JSON.parse(orderfiledata);
    console.log(existedOrders);
    existedOrders.orders.forEach((element: any) => {
      orderArray.push(element);
    });
    try {
      return res.status(200).json({
        message: 'Get Orders sucessfully',
        result: existedOrders.orders
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.status(200).json({
      message: 'Orders list is Empty'
    });
  }
};

// getting a single orders
const getSingleOrder = async (req: Request, res: Response, next: NextFunction) => {
  // get the orders id from the req
  let id: string = req.params.id;
  const orderfiledata = fs.readFileSync('./json/order.json', 'utf8');
  let order: any = [];
  if (orderfiledata) {
    console.log("Read the order file");
    let existedOrders = JSON.parse(orderfiledata);
    console.log(existedOrders);
    if(existedOrders.orders){
      order = existedOrders.orders.filter((item:any)=> item.order_id == id);
    }
    try {
      return res.status(200).json({
        message: 'Get Order sucessfully',
        result: order
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.status(200).json({
      message: 'Orders list Empty'
    });
  }
};

// updating a orders
const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  // get the orders id from the req.params
  let id: string = req.params.id;
  // get the data from req.body
  let postdata = req.body;
  console.log(postdata);
  // generate orderid using random string
  const orderfiledata = fs.readFileSync('./json/order.json', 'utf8');
  let orderArray: any = [];
  if (orderfiledata) {
    console.log("read the order file");
    let existedOrders = JSON.parse(orderfiledata);
    console.log(existedOrders);
    existedOrders.orders.forEach((element: any) => {
      if(element && element.order_id == id){
        element.name = postdata.name,
        element.email = postdata.email,
        element.role = postdata.role
      }
      orderArray.push(element);
    });
  }
  // json data
  var jsonData = { orders: orderArray };
  // console.log(jsonData);

  var jsonContent = JSON.stringify(jsonData);
  // console.log(jsonContent);

  try {
    const data = fs.writeFileSync('./json/order.json', jsonContent);
    return res.status(200).json({
      message: 'order Update sucessfully'
    });
  } catch (error) {
    console.error(error);
  }
};

// deleting a orders
const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  // get the orders id from the req.params
  let id: string = req.params.id;
  // get the data from req.body
  let postdata = req.body;
  console.log(postdata);
  // generate orderid using random string
  const orderfiledata = fs.readFileSync('./json/order.json', 'utf8');
  let orderArray: any = [];
  if (orderfiledata) {
    console.log("read the order file");
    let existedOrders = JSON.parse(orderfiledata);
    console.log(existedOrders);
    existedOrders.orders.forEach((element: any) => {
      if(element && element.order_id != id){
        orderArray.push(element);
      }
    });
  }
  // json data
  var jsonData = { orders: orderArray };
  // console.log(jsonData);

  var jsonContent = JSON.stringify(jsonData);
  // console.log(jsonContent);

  try {
    const data = fs.writeFileSync('./json/order.json', jsonContent);
    return res.status(200).json({
      message: 'order Update sucessfully'
    });
  } catch (error) {
    console.error(error);
  }
};



export default { getOrders, getSingleOrder, updateOrder, deleteOrder, addOrder };