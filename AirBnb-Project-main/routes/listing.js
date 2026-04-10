import express from "express";
const routes = express.Router();
import wrapAsync from "../utils/wrapAsync.js";
import Listing from "../models/Listing.js";
import {isLoggedin , isowner , validateListing} from "../middleware.js";
import {index , newForm , showRoute , editForm , createListing , update , deleteee} from "../controllers/listing.js";
import multer from "multer";
import {storage , cloudinary} from "../cloudconfig.js"
const upload = multer({ storage });
/* INDEX */

routes.route("/").get(wrapAsync(index))
.post( isLoggedin  , upload.single("imgaes") , validateListing , wrapAsync(createListing));
   


/* NEW FORM */
routes.get("/new", isLoggedin , newForm );


/* SHOW */
// routes.get("/:id", wrapAsync(showRoute));

routes.route("/:id").get(wrapAsync(showRoute)).put(isLoggedin , isowner , validateListing , wrapAsync(update)).delete(isLoggedin ,isowner, wrapAsync(deleteee));;

/* CREATE */


// routes.post(
//     "/", isLoggedin,
//     validateListing,
//     wrapAsync(createListing));

/* EDIT FORM */
routes.get("/:id/edit", isLoggedin , isowner ,wrapAsync(editForm));

/* UPDATE */

// routes.put(
//   "/:id",
//   isLoggedin, isowner ,
//   validateListing,
//   wrapAsync(update)
// );

/* DELETE */

// routes.delete("/:id", isLoggedin ,isowner, wrapAsync(deleteee));


export default routes;