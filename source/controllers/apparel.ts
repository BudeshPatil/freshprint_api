/** source/controllers/apparelss.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
var randomstring = require("randomstring");
import fs from 'fs';

interface Apparel {
  apparelId: Number;
  name: String;
  size: [];
  price: String;
  user_id:Number;
}

// adding a apparels
const addApparel = async (req: Request, res: Response, next: NextFunction) => {
  // get the data from req.body
  let postdata = req.body;
  console.log(postdata);
  const userfiledata = fs.readFileSync('./json/user.json', 'utf8');
  let user:any = {};
  if(userfiledata){
    console.log("read the apparel file");
    let existedUsers = JSON.parse(userfiledata);
    console.log(existedUsers);
    let temp = existedUsers.users.filter((item:any)=> item.user_id == postdata.user_id);
    user = temp[0];
    console.log("user is"+temp)
  }
  
  if(user && user.role == 'admin' || user.role == 'user'){
    // generate apparelid using random string
    var apparelId = randomstring.generate({ length: 7, charset: 'numeric' });
    const apparelfiledata = fs.readFileSync('./json/apparel.json', 'utf8');
    let apparelArray: any = [];
    if (apparelfiledata) {
      console.log("read the apparel file");
      let existedApparels = JSON.parse(apparelfiledata);
      console.log(existedApparels);
      existedApparels.apparels.forEach((apparel: any) => {
        apparelArray.push(apparel);
      });
    }
    let newapparel = {
      name: postdata.name,
      price: postdata.price,
      size: postdata.size,
      apparel_id: apparelId,
      user_id: postdata.user_id,
      stock_quality: postdata.stock_quality
    };
    apparelArray.push(newapparel)
    // json data
    var jsonData = { apparels: apparelArray };
    // console.log(jsonData);

    var jsonContent = JSON.stringify(jsonData);
    // console.log(jsonContent);

    try {
      const data = fs.writeFileSync('./json/apparel.json', jsonContent);
      return res.status(200).json({
        message: 'Apparel saved sucessfully'
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.status(400).json({
      message: 'User does not have access to upload Apparel'
    });
  }
};

// getting all apparelss
const getApparels = async (req: Request, res: Response, next: NextFunction) => {
  const apparelfiledata = fs.readFileSync('./json/apparel.json', 'utf8');
  let apparelArray: any = [];
  if (apparelfiledata) {
    console.log("read the apparel file");
    let existedApparels = JSON.parse(apparelfiledata);
    console.log(existedApparels);
    existedApparels.apparels.forEach((apparel: any) => {
      apparelArray.push(apparel);
    });
    try {
      return res.status(200).json({
        message: 'Get Apparels sucessfully',
        result: existedApparels.apparels
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.status(400).json({
      message: 'Apparels list is Empty'
    });
  }
};

// getting a single apparels
const getSingleApparel = async (req: Request, res: Response, next: NextFunction) => {
  // get the apparels id from the req
  let id: string = req.params.id;
  const apparelfiledata = fs.readFileSync('./json/apparel.json', 'utf8');
  let apparel: any = [];
  if (apparelfiledata) {
    console.log("Read the apparel file");
    let existedApparels = JSON.parse(apparelfiledata);
    console.log(existedApparels);
    if(existedApparels.apparels){
      apparel = existedApparels.apparels.filter((item:any)=> item.apparel_id == id);
    }
    try {
      return res.status(200).json({
        message: 'Get Apparel sucessfully',
        result: apparel
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.status(200).json({
      message: 'Apparels list Empty'
    });
  }
};

// updating a apparels
const updateApparel = async (req: Request, res: Response, next: NextFunction) => {
  // get the apparels id from the req.params
  let id: string = req.params.id;
  // get the data from req.body
  let postdata = req.body;
  console.log(postdata);
  // generate apparelid using random string
  const apparelfiledata = fs.readFileSync('./json/apparel.json', 'utf8');
  let apparelArray: any = [];
  if (apparelfiledata) {
    console.log("read the apparel file");
    let existedApparels = JSON.parse(apparelfiledata);
    console.log(existedApparels);
    existedApparels.apparels.forEach((apparel: any) => {
      if(apparel && apparel.apparel_id == id){
        if(postdata.name){
          apparel.name = postdata.name;
        }          
        if(postdata.price){
          apparel.price = postdata.price;
        }
        if(postdata.size) {
          apparel.size = postdata.size;
        }
        if(postdata.stock_quality) {
          apparel.stock_quality = postdata.stock_quality;
        }
        apparel['updated_by'] = postdata.user_id;
      }
      apparelArray.push(apparel);
    });
  }
  // json data
  var jsonData = { apparels: apparelArray };
  // console.log(jsonData);

  var jsonContent = JSON.stringify(jsonData);
  // console.log(jsonContent);

  try {
    const data = fs.writeFileSync('./json/apparel.json', jsonContent);
    return res.status(200).json({
      message: 'apparel Update sucessfully'
    });
  } catch (error) {
    console.error(error);
  }
};

// deleting a apparels
const deleteApparel = async (req: Request, res: Response, next: NextFunction) => {
  // get the apparels id from the req.params
  let id: string = req.params.id;
  // get the data from req.body
  let postdata = req.body;
  console.log(postdata);
  // generate apparelid using random string
  const apparelfiledata = fs.readFileSync('./json/apparel.json', 'utf8');
  let apparelArray: any = [];
  if (apparelfiledata) {
    console.log("read the apparel file");
    let existedApparels = JSON.parse(apparelfiledata);
    console.log(existedApparels);
    existedApparels.apparels.forEach((apparel: any) => {
      if(apparel && apparel.apparel_id != id){
        apparelArray.push(apparel);
      }
    });
  }
  // json data
  var jsonData = { apparels: apparelArray };
  // console.log(jsonData);

  var jsonContent = JSON.stringify(jsonData);
  // console.log(jsonContent);

  try {
    const data = fs.writeFileSync('./json/apparel.json', jsonContent);
    return res.status(200).json({
      message: 'apparel Update sucessfully'
    });
  } catch (error) {
    console.error(error);
  }
};




// updating a apparels
const updateApparelSymultiniouly = async (req: Request, res: Response, next: NextFunction) => {
  // get the apparels id from the req.params
  let id: string = req.params.id;
  // get the data from req.body
  let postdata = req.body;
  let apparelIds = req.body.apparel_ids;
  console.log(postdata);
  // generate apparelid using random string
  const apparelfiledata = fs.readFileSync('./json/apparel.json', 'utf8');
  let apparelArray: any = [];
  if (apparelfiledata) {
    console.log("read the apparel file");
    let existedApparels = JSON.parse(apparelfiledata);
    console.log(existedApparels);
    existedApparels.apparels.forEach((apparel: any) => {
      let tempid = apparelIds.filter((item:any)=>item ==apparel.apparel_id);
      console.log("tempId is"+tempid);
      if(apparel && apparel.apparel_id == tempid[0]){
        if(postdata.name){
          apparel.name = postdata.name;
        }          
        if(postdata.price){
          apparel.price = postdata.price;
        }
        if(postdata.size) {
          apparel.size = postdata.size;
        }
        if(postdata.stock_quality) {
          apparel.stock_quality = postdata.stock_quality;
        }
        apparel['updated_by'] = postdata.user_id;
      }
      apparelArray.push(apparel);
    });
  }
  // json data
  var jsonData = { apparels: apparelArray };
  // console.log(jsonData);

  var jsonContent = JSON.stringify(jsonData);
  // console.log(jsonContent);

  try {
    const data = fs.writeFileSync('./json/apparel.json', jsonContent);
    return res.status(200).json({
      message: 'apparel Update sucessfully'
    });
  } catch (error) {
    console.error(error);
  }
};

export default { getApparels, getSingleApparel, updateApparel, deleteApparel, addApparel, updateApparelSymultiniouly };