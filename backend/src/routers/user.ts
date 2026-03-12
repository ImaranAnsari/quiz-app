// Redirect request to Particular method on Controller
import express from "express";
import { body } from "express-validator";
import { isPasswordValid } from "../utils/passwordValid";
import { validateRequest } from "../helpers/validateRequest";

import {
  getUser,
  updateUser,
  changePassword,
} from "../controllers/user";
import { isAuthenticated } from "../middlewares/isAuth";

const router = express.Router();

router.get("/", isAuthenticated, getUser);

router.put("/", isAuthenticated, updateUser);

router.put("/changepassword",
  [
    body("newPassword")
      .trim()
      .isLength({ min: 8 })
      .custom((password: String) => {
        return isPasswordValid(password)
          .then((status: Boolean) => {
            if (!status)
              return Promise.reject(
                "Enter a valid password, having atleast 8 characters including 1 small alphabet, 1 capital albhabet, 1 digit and 1 special character($,@,!,#,*)."
              );
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }),
    body("confirm_password")
      .trim()
      .custom((value: String, { req }) => {
        if (value != req.body.newPassword) {
          return Promise.reject("Password mismatched!");
        }
        return true;
      }),
  ],
  validateRequest,
  isAuthenticated,
  changePassword
);


export default router;
