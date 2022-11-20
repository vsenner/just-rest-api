import express from "express";
import User from "../../db/models/User.js";
import Wallet from "../../db/models/Wallet.js";
const router = express.Router();

router.get('/:user_id', async function (req, res, next) {
  const {user_id} = req.params;

  if(!user_id){
    res.status(400);
    return res.json({
      error: "'user_id' param not found"
    })
  }

  const user = await User.findOne({
    where: {
      id: user_id
    }
  });

  if (!user) {
    res.status(400);
    return res.json({
      error: "user not found"
    });
  }


  return res.json({
    data: await Wallet.findOne({
      where: {
        user_id
      }
    })
  })
});

export default router;