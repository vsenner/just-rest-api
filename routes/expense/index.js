import express from 'express';
import User from "../../db/models/User.js";
import Category from "../../db/models/Category.js";
import Expense from "../../db/models/Expense.js";
import Wallet from "../../db/models/Wallet.js";

const router = express.Router();

router.post('/', async (req, res) => {

  const {name, description, user_id, category_id, value} = req.body;

  if (!name || !description || !user_id || !category_id || !value) {
    res.status(400);
    return res.json({
      error: "one of this params 'name, description, category_id, user_id, value' is not found"
    });
  }

  const user = await User.findOne({
    id: user_id
  });

  if (!user) {
    res.status(400);
    return res.json({
      error: "user not found"
    });
  }

  const category = await Category.findOne({
    id: category_id
  })

  if (!category) {
    res.status(400);
    return res.json({
      error: "category not found"
    });
  }

  const new_expense = await Expense.create({
    category_id,
    user_id,
    description,
    value,
    name,
    date: Date.now()
  });

  await Wallet.findOne(
    {
      where: {
        user_id
      }
    }).then(async (wallet) => {
    return await wallet.update({
      value: wallet?.get().value - value
    });
  });

  return res.json({
    data: new_expense
  });
});
router.get('/:user_id', async (req, res) => {

  const {category_id} = req.query;

  const {user_id} = req.params;

  if (!user_id) {
    res.status(400);
    return res.json({
      error: "user_id not found"
    });
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

  let category = null;

  if (category_id) {
    category = await Category.findOne({
      where: {
        id: category_id
      }
    })
    if (!category) {
      res.status(400);
      return res.json({
        error: "category not found"
      });
    }

  }

  if (!user_id && !category_id) {
    return res.json({
      message: 'Expenses of all users',
      data: await Expense.findAll()
    })
  }


  if (user_id && !category_id) {
    return res.json({
      data: await Expense.findAll({
        where: {
          user_id
        }
      })
    })
  }


  if (category_id && !user_id) {
    return res.json({
      data: await Expense.findAll({
        where: {
          category_id
        }
      })
    })
  }


  return res.json({
    data: await Expense.findAll({
      where: {
        user_id,
        category_id
      }
    })
  });
});

export default router;