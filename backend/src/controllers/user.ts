import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import ProjectError from "../helpers/error";
import { ReturnResponse } from "../interfaces/interfaces";

const getUser: RequestHandler = async (req, res, next) => {
  let resp: ReturnResponse;

  try {
    const userId = req.userId;
    if (!userId) {
      const err = new ProjectError("You are not authorized!");
      err.statusCode = 401;
      err.data = {};
      throw err;
    }
    const user = await User.findById(userId, { userName: 1, email: 1, contact: 1, address: 1 });
    if (!user) {
      const err = new ProjectError("No user exist");
      err.statusCode = 401;
      throw err;
    } else {
      resp = { status: "success", message: "User found", data: user };
      res.status(200).send(resp);
    }
  } catch (error: any) {
    next(error);
  }
};

const changePassword: RequestHandler = async (req, res, next) => {
  let resp: ReturnResponse;
  const { oldPassword, newPassword } = req.body;

  try {
    if (!req.userId) {
      const err = new ProjectError("You are not authorized!");
      err.statusCode = 401;
      throw err;
    }

    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      const err = new ProjectError("No user exist");
      err.statusCode = 401;
      throw err;
    }

    // Validate old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      const err = new ProjectError("Invalid old password");
      err.statusCode = 401;
      throw err;
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    resp = { status: "success", message: "Password Updated", data: {} };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};

const updateUser: RequestHandler = async (req, res, next) => {
  let resp: ReturnResponse;

  try {
    if (!req.userId) {
      const err = new ProjectError("You are not authorized!");
      err.statusCode = 401;
      throw err;
    }

    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      const err = new ProjectError("No user exist");
      err.statusCode = 401;
      throw err;
    }

    user.userName = req.body.userName;
    user.contact = req.body.contact;
    user.address = req.body.address;
    await user.save();

    resp = { status: "success", message: "User Updated", data: {} };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};


export {
  getUser,
  updateUser,
  changePassword
};
