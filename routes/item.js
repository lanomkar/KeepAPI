const express = require("express");
const router = express.Router();

const {
  getItemById,
  createItem,
  getItem,
  getAllItem,
  updateItem,
  removeItem,
} = require("../controllers/item");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

//actual routers goes here
router.post("/item/create/:userId", isSignedIn, isAuthenticated, createItem);

router.get("/item/:itemId/:userId", isSignedIn, isAuthenticated, getItem);
router.get("/items/:userId", isSignedIn, isAuthenticated, getAllItem);

router.put("/item/:itemId/:userId", isSignedIn, isAuthenticated, updateItem);

router.delete("/item/:itemId/:userId", isSignedIn, isAuthenticated, removeItem);

module.exports = router;
