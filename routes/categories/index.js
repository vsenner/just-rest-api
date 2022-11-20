import express from "express";
import Category from "../../db/models/Category.js";
import User from "../../db/models/User.js";
import Expense from "../../db/models/Expense.js";
import {Op} from "sequelize";

const router = express.Router();

router.post('/', async (req, res) => {

  const {name} = req.body;

  if (!name) {
    res.status(400);
    return res.json({
      error: "'category_name' param not found"
    });
  }

  const category = await Category.create({name})

  return res.json({
    id: category.id,
    name: category.name,
  })
});


router.get('/', async (req, res) => {
  const user_categories = await Category.findAll();

  return res.json(user_categories);
})

router.get('/:user_id', async (req, res) => {

  const {user_id} = req.params;

  if (!user_id) {
    return res.json({
      error: "'user_id' param not found"
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

  const categories_ids = await Expense.findAll({
    where: {
      user_id
    },
    attributes: [
      'category_id',
    ]
  });

  if (!categories_ids) {
    return res.json([]);
  }

  const user_categories = await Category.findAll({
    where: {
      id: Op.in(categories_ids)
    }
  })

  return res.json(user_categories);
});

export default router;