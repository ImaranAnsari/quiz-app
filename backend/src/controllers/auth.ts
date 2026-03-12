// import { Request, Response, NextFunction} from 'express';
import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


import User from "../models/user";
import ProjectError from "../helpers/error";
import { ReturnResponse } from "../interfaces/interfaces";

const registerUser: RequestHandler = async (req, res, next) => {
  let resp: ReturnResponse;
  try {

    const userName = req.body.userName;
    const email = req.body.email;
    const contact = req.body.contact;
    const address = req.body.address;
    let password = await bcrypt.hash(req.body.password, 12);
    console.log('email, userName, password, contact, address', email, userName, password, contact, address);
    const user = new User({ email, userName, password, contact, address });
    const result = await user.save();
    if (!result) {
      resp = { status: "error", message: "No result found", data: {} };
      res.send(resp);
    } else {
      resp = {
        status: "success",
        message: "Registration done!",
        data: { userId: result._id },
      };
      res.send(resp);
    }
  } catch (error) {
    next(error);
  }
};

const loginUser: RequestHandler = async (req, res, next) => {
  let resp: ReturnResponse;
  try {
    const email = req.body.email;
    const password = req.body.password;

    //find user with email
    const user = await User.findOne({ email });
    if (!user) {
      const err = new ProjectError("No user exist");
      err.statusCode = 401;
      throw err;
    }

    //verify if user is Active ot not
    if (!user.isActive) {
      const err = new ProjectError("Account is not Active!");
      err.statusCode = 401;
      throw err;
    }

    //verify password using bcrypt
    const status = await bcrypt.compare(password, user.password);
    //then decide
    if (status) {
      const token = jwt.sign({ userId: user._id }, `${process.env.SECRET_KEY}`, {
        expiresIn: "1h",
      });
      resp = { status: "success", message: "Logged in", data: { token } };
      res.status(200).send(resp);
    } else {
      const err = new ProjectError("Credential mismatch");
      err.statusCode = 401;
      throw err;
    }
  } catch (error) {
    //erro handle .....
    next(error);
  }
};


const isUserExist = async (email: String) => {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }
  return true;
};


export { registerUser, loginUser, isUserExist };
