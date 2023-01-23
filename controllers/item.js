const User = require("../models/user");
const Item = require("../models/item");

exports.createItem = async (req, res, next) => {
  try {
    const userId = req.auth._id;
    let newItem = new Item(req.body);
    const user = await User.findById(userId);
    newItem.user = user._id;
    const isItem = await newItem.save();
    user.items.push(newItem);
    await user.save();
    return res.status(200).json({ success: "true" });
  } catch (err) {
    next(err);
  }
};

exports.getItem = async (req, res, next) => {
  try {
    const userId = req.auth._id;
    const { itemId } = req.params;
    const item = await Item.findOne({ user: userId, _id: itemId });
    res.status(200).json({ success: "true", item });
  } catch (err) {
    next(err);
  }
};

exports.getAllItem = async (req, res, next) => {
  try {
    const userId = req.auth._id;
    const user = await User.findById(userId).populate("items");
    res.status(200).json({ success: "true", items: user.items });
  } catch (err) {
    next(err);
  }
};

exports.updateItem = async (req, res, next) => {
  const userId = req.auth._id;
  console.log("helllo", req.body);
  const { itemId } = req.params;

  const result = await Item.findOneAndUpdate(
    { user: userId, _id: itemId },
    req.body
  );
  res.status(200).json({ success: true });
};

exports.removeItem = async (req, res, next) => {
  const { itemId } = req.params;

  const userId = req.auth._id;
  await Item.findByIdAndDelete(itemId);
  const user = await User.findById(userId);

  var index = user.items.indexOf(itemId);
  user.items.splice(index, 1);
  await user.save();
  res.status(200).json({ success: true });
};
