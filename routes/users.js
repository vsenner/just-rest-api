const router = require('express').Router();

const users = {};

const categories = {};

const expenses = {};

const generateId = () => {
  return new Date().getTime();
}

router.post('/', function (req, res, next) {
  const {name} = req.body;

  if (!name) {
    res.status(400);
    return res.json({
      error: "'name' param not found"
    });
  }
  const id = generateId()
  const new_user = {
    id,
    name,
  };


  users[id] = new_user;
  return res.json({
    data: new_user
  })
});


router.post('/add_expense', (req, res) => {

  const {name, description, user_id, category_id, value} = req.body;

  if (!name || !description || !user_id || !category_id || !value) {
    res.status(400);
    return res.json({
      error: "one of this params 'name, description, category_id, user_id, value' is not found"
    });
  }

  const user = users[user_id];

  if (!user) {
    res.status(400);
    return res.json({
      error: "user not found"
    });
  }

  if (category_id) {
    if (!categories[category_id]) {
      res.status(400);
      return res.json({
        error: "category not found"
      });
    }
  }

  const id = generateId()

  const new_expense = {
    id,
    category_id,
    user_id,
    description,
    value,
    name
  };

  expenses[id] = new_expense;

  return res.json({
    data: new_expense
  });
});

router.get('/all_expenses', (req, res) => {

  const {user_id, category_id} = req.query;

  const user = users[user_id];

  const category = categories[category_id];


  if (!user && user_id) {
    res.status(400);
    return res.json({
      error: "user not found"
    });
  }


  if (!category && category_id) {
    res.status(400);
    return res.json({
      error: "category not found"
    });
  }

  if (!user_id && !category_id) {
    return res.json({
      message: 'Expenses of all users',
      data: expenses
    })
  }


  if (user_id && !category_id) {
    return res.json({
      data: Object.keys(expenses).reduce((prev, exp_id) => {
        if (expenses[exp_id].user_id == user_id) {
          prev[exp_id] = {...expenses[exp_id]}
          return prev;
        }
      }, {})
    })
  }


  if (category_id && !user_id) {
    return res.json({
      data: Object.keys(expenses).reduce((prev, exp_id) => {
        if (expenses[exp_id].category_id == category_id) {
          prev[exp_id] = {...expenses[exp_id]}
          return prev;
        }
      }, {})
    })
  }


  return res.json({
    data: Object.keys(expenses).reduce((prev, exp_id) => {
      if (expenses[exp_id].category_id == category_id && expenses[exp_id].user_id == user_id) {
        prev[exp_id] = {...expenses[exp_id]}
        return prev;
      }
    }, {})
  });
});


router.post('/category', (req, res) => {

  const {category_name} = req.body;

  if (!category_name) {
    res.status(400);
    return res.json({
      error: "'category_name' param not found"
    });
  }

  const category_id = generateId();
  categories[category_id] = category_name

  return res.json({
    category_id,
    name: category_name,
  })
});

router.get('/category', (req, res) => {

  const {user_id} = req.query;

  if (user_id) {
    const user = users[user_id]
    if (!user) {
      res.status(400);
      return res.json({
        error: "'user_id' param not found"
      });
    }

    const user_categories = Object.keys(expenses).reduce((prev, exp_id) => {
      if (expenses[exp_id].user_id == user_id) {
        if (!prev[expenses[exp_id].category_id]) {
          prev[expenses[exp_id].category_id] = categories[expenses[exp_id].category_id];
        }
      }
      return prev;
    }, {})

    return res.json(user_categories);

  }


  return res.json(categories);
})

router.get('/category/:user_id', (req, res) => {

  const {user_id} = req.query;

  if (!user_id) {
    res.status(400);
    return res.json({
      error: "'user_id' param not found"
    });
  }

  const user = users[user_id];

  if (!user) {
    res.status(400);
    return res.json({
      error: "user not found"
    });
  }

  const user_categories = expenses.map(e => e.category_id && e.user_id === user_id).map(category => {
    return categories[category]
  });


  return res.json({
    user_id,
    categories: user_categories
  })
});


module.exports = router;
