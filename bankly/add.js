//Fixes Bug #2

const { SECRET_KEY } = require("./config");

router.post('/login', async function(req, res, next) {
    try {
      const { username, password } = req.body;
      //Fixes BUG #2
      let user = await User.authenticate(username, password);
      const token = createTokenForUser(username, user.admin);
      return res.json({ token });
    } catch (err) {
      return next(err);
    }
});

//Fixes Bug #3

function authUser(req, res, next) {
  try {
    const token = req.body._token || req.query._token;
    if (token) {
      let payload = jwt.verify(token, SECRET_KEY);
      req.curr_username = payload.username;
      req.curr_admin = payload.admin;
    }
    return next();
  } catch (err) {
    err.status = 401;
    return next(err);
  }
} 


// Fixes Bug #4

class User { //This User class is just here to avoid the creation of error by invalid syntax


  static async get(username) {
  const result = await db.query(
    `SELECT username,
              first_name,
              last_name,
              email,
              phone
       FROM users
       WHERE username = $1`,
    [username]
  );

  const user = result.rows[0];
  if (!user) {
    throw new ExpressError('No such user', 404);
  }
  return user;
};


};

// Fixes Bug #6

function checkIfAdminOrSameUser(req, res, next) {
  try {
    if (req.curr_username === req.params.username || req.curr_admin) {
      return next();
    } else {
      throw new ExpressError('Only  that user or admin can edit a user.', 401);
    }
  } catch (err) {
    return next(err);
  }
};





// Fixes bug # 7

router.delete('/:username', authUser, requireAdmin, async function(
  req,
  res,
  next
) {
  try {
    await User.delete(req.params.username);
    return res.json({ message: 'deleted' });
  } catch (err) {
    return next(err);
  }
});
