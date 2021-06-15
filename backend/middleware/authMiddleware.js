import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import connection from '../config/db.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('decoded', decoded);
      await connection
        .promise()
        .query('SELECT id_user, user_email, token  FROM users WHERE id_user = ?', [
          decoded.id_user,
        ])
        .then(([rows]) => {
          req.user = rows[0];
        });
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
