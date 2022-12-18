import express from "express";
import User from "../../db/models/User.js";
import Wallet from "../../db/models/Wallet.js";
import {generateToken} from "../../services/token/index.js";
const router = express.Router();

router.post('/register', async function (req, res, next) {
  const {username, password} = req.body;

  if (!username || !password) {
    res.status(400);
    return res.json({
      error: "'name' or 'password' param not found"
    });
  }

  const candidate = await User.findOne({
    where: {
      username
    }
  });


  if(candidate){
    res.status(400);
    return res.json({
      error: "username already exist"
    });
  }

  const new_user = await User.create({username, password});

  const userData = {
    id: new_user.id,
    username: new_user.user
  }

  const newToken = generateToken(userData)

  await Wallet.create({user_id: new_user.id});

  return res.json({
    data: {
      user: userData,
      token: newToken
    }
  })
});
router.post('/login', async function (req, res, next) {
  const {username, password} = req.body;

  if (!username || !password) {
    res.status(400);
    return res.json({
      error: "'username' or 'password' param not found"
    });
  }
  const new_user = await User.findOne({
    where: {username, password}
  });

  if(!new_user){
    res.json({
      error: "'username' or 'password' param incorrect"
    });
  }

  const userData = {
    id: new_user.id,
    username: new_user.user
  }

  const newToken = generateToken(userData)

  await Wallet.create({user_id: new_user.id});

  return res.json({
    data: {
      user: userData,
      token: newToken
    }
  })
});

export default router;