# Bug report (Bankly app)

## Bug #1

While running `npm test` command. The test suite failed to run and produced the following error:

```bash
ReferenceError: TextEncoder is not defined 
```

### Bug fix

**pg** package was downgraded from version `8.11.1` to version `8.3.0`, using the following commands in terminal

```bash
npm uninstall pg

npm install pg@8.3.0
```

The package configuration files [package.json](package.json) and [package.json](package.json) were updated with the `8.3.0` version.

## BUG #2

This bug happens in line 41 inside [`POST "/auth/login"`](/routes/auth.js) route handler.

```js
let user = User.authenticate(username, password);
```

When an invalid username or password is passed to `User.authenticate()` function. The function throws an `Error` as a consequence of not being to able to match any username from the query or a valid username/password combination. This behaviour is normal in the function. But since `User.authenticate()` function doesn't have any _`await`_ keyword before it creates a promise that cannot be caught by the try/catch block. Thus making the app crash and causing errors to the user, as a wrong Status Code of **200** when it should be **401**, and later on rendering the server unable to connect with the user.

### Bug fix

Modify line 41 of [`POST "/auth/login"`](/routes/auth.js) route handler to include the _`await`_ keyword:

```js
let user = await User.authenticate(username, password);
```

## Bug #3

In line 52 of [auth.js](/middleware/auth.js), the middleware function `authUser()` decodes, but does not validate the JWT that is being passed under the _`_token`_ query parameter or JSON body. Resulting in a major security concern since any third app could create a token that can be passed as valid by the current setting. The line of code:

```js
let payload = jwt.decode(token);
```

Extracts the payload from the token, but it does...####complete!
The function `jwt.decode()` will retrieve the payload from the JWT and will throw an error if the JWT signature is not valid. 

### Bug fix 

In the line 52 of the middleware function `authUser()` located in [auth.js](/middleware/auth.js), the `jwt.decode()` function should be replaced by `jwt.verify()` the following way:

```js
let payload = jwt.verify(token, SECRET_KEY);
```

## Bug #4

In line 116 of [user.js](/models/user.js) shown in here:

```js
new ExpressError('No such user', 404);
```

the class method `User.get()` does not correctly throw an error that can be catched and handled correctly. By consequence when an invalid username is requested to [`GET "/users/:username"`](/routes/users.js), the status code of the response is __`200: OK`__ with and an empty dictionaty in the body __`{}`__, when it should be __`404: Not Found`__. The response body should also return the message _"No such user"_ instead it returns an empty object.


### Bug fix

In line 116 of [user.js](/models/user.js) should include the keyhword _`throw`_, like the following example:

```js
throw new ExpressError('No such user', 404);
```

## Bug #5

Jest jasmine was crashing the app constantly and thus making imposible to run tests when they threw errors. Apparently this was making the testing app environment to crash and thus failing to test correctly.

### Bug fix 

The following command was used to update the jest version 

```bash
npm install --save-dev jest@latest;
```

This changed jest version from `23.6.0`, to version `29.5.0` which does not include any jasmine dependency.


## Bug #6

The route handler [`PATCH "/users/:username"`](/routes/users.js), calls the middleware function `requireAdmin()` this function is checks if the user that is making the requests is currently an admin. This throws an __`401: Unauthorized`__ message for those who are not administrators. This behaviour does not comply with the clause in which the users themselves are also able to `PATCH` his own data, whether they are administrators or not, in this case the design of `requireAdmin()` does not allow that.

### Bug fix 

The `requireAdmin()` function is used correctly in other circumstances so the best approach is to write another function that can call `next()` without any error if the `req.params.username` matches the `req.curr_username` or if the `req.curr_username` also has `req.curr_admin` property as `true`.

```js
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
```

Also the route handler should be updated

```js
router.patch('/:username', authUser, requireLogin, checkIfAdminOrSameUser, async function(
  req,
  res,
  next
) {
  try {
    // get fields to change; remove token so we don't try to change it
    let fields = { ...req.body };
    delete fields._token;

    let user = await User.update(req.params.username, fields);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});
```

### Bug #7

In line 97, the route handler [`DELETE "/users/:username"`](/routes/users.js) is missing the _`await`_ keyword, which does not return a __`404: Not Found`__ if the username is not found in the database.

```js
User.delete(req.params.username);
```

#### Bug fix

Insert the _`await`_ keyword in line 103 of [`DELETE "/users/:username"`](/routes/users.js), like the following.

```js
await User.delete(req.params.username);
```

### Additional reccomendations

`BCRYPT_WORK_FACTOR` in [config](/config.js) could be incremented to 12.

`module.exports = app;` is duplicated in line 40 of [app.js](/app.js).