// Redirect request to Particular method on Controller
import express from "express";
import { body } from "express-validator";

import { validateRequest } from "../helpers/validateRequest";
import { isPasswordValid } from "../utils/passwordValid";

import {
  registerUser,
  loginUser,
  isUserExist,
  refreshToken,
} from "../controllers/auth";

import { isAuthenticated } from "../middlewares/isAuth";

const router = express.Router();

// POST /auth/
router.post(
  "/registeruser",
  [
    body("userName")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 4 })
      .withMessage("Please enter a valid name, minimum 4 character long"),

    body("email")
      .trim()
      .isEmail()
      .custom((emailId: String) => {
        return isUserExist(emailId)
          .then((status: Boolean) => {
            if (status) {
              return Promise.reject("User already exist!");
            }
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }),
    body("contact")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 10 })
      .withMessage("Please enter a valid contact number, minimum 10 digit long"),

    body("address")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 4 })
      .withMessage("Please enter a valid address, minimum 4 character long"),

    body("password")
      .trim()
      .isLength({ min: 8 }).withMessage("Password must be 8 character long")
      .custom((password: String) => {
        return isPasswordValid(password)
          .then((status: Boolean) => {
            if (!status)
              return Promise.reject(
                "Enter a valid password, having at least 8 characters including 1 small alphabet, 1 capital alphabet, 1 digit and 1 special character($,@,!,#,*)."
              );
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }).withMessage("Invalid Password!"),

    body("confirm_password")
      .trim()
      .custom((value: String, { req }) => {
        if (value != req.body.password) {
          return Promise.reject("Password mismatched!");
        }
        return true;
      }),
  ],
  validateRequest,
  registerUser
);

// POST /auth/login
router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid Email!"),

    body("password")
      .trim()
      .isLength({ min: 8 })
      .custom((password: String) => {
        return isPasswordValid(password)
          .then((status: Boolean) => {
            if (!status) return Promise.reject();
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      })
      .withMessage("Invalid Password!"),
  ],
  validateRequest,
  loginUser
);

// POST /auth/refresh
router.post("/refresh", isAuthenticated, refreshToken);

export default router;
