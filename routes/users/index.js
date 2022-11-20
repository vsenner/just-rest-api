import express from "express";
import User from "../../db/models/User.js";
import Wallet from "../../db/models/Wallet.js";
const router = express.Router();

router.post('/', async function (req, res, next) {
  const {name} = req.body;

  if (!name) {
    res.status(400);
    return res.json({
      error: "'name' param not found"
    });
  }
  const new_user = await User.create({name});

  await Wallet.create({user_id: new_user.id});

  return res.json({
    data: new_user
  })
});

export default router;