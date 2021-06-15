import connection from '../config/db.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//@desc   Auth user & get token
//@route  POST /api/users/login
//@acces Public
const authUser = asyncHandler(async (req, res) => {
  
    const { user_email, user_password} = req.body;
    
    if(!user_email || !user_password) {
      throw new Error("Please provide an email and password");
    }


    connection.query("SELECT * FROM users WHERE user_email = ?", [user_email], async(error, results) => {
      if (!results.length || !(await bcrypt.compare(user_password, results[0].user_password))) {
        res.json({
          error: true,
          errorMesage: "Email or Password is incorrect"
        })
        throw new Error("Email or Password is incorrect");
      } else {
        const id_user = results[0].id_user;
        const user_full_name = results[0].user_full_name
        const user_phone_number = results[0].user_phone_number

        const token = jwt.sign({ id_user }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        })

        await connection.promise().query("UPDATE users SET token=? WHERE id_user=? LIMIT 1", [token, id_user]);
        
        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        }
        
        res.cookie('jwt', token, cookieOptions);
      

        res.json({
          id_user,
          user_full_name,
          user_phone_number,
          user_email,
          token
        })
      }
    })

})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = (req, res) => {
  const {user_full_name, user_phone_number, user_email, user_password} = req.body;
  if (user_email, user_password) {
    connection.query('SELECT user_email FROM users WHERE user_email=?', [user_email], async (error, result) => {
      if (error) {
        console.log(error);
      }
  
      if(result.length > 0) {
        res.json({
          error: true,
          errorMesage: "This email is already in use"
        })
        throw new Error("This email is already in use");
      }
  
      let hashedPassword = await bcrypt.hash(user_password, 8)
  
      connection.query('INSERT INTO users SET ?', {user_full_name, user_phone_number, user_email, user_password: hashedPassword, token: ''}, (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).res.end();
        } else {
          return res.json({
            id_user: result.insertId,
            user_full_name,
            user_phone_number,
            user_email,
          })
        }
      });
    })
  } else {
    throw new Error ('Please fill all forms');
  }
}

// @desc    Get user profile
// @route   POST /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async(req, res) => {
  let user;
  await connection.promise().query("SELECT * FROM users WHERE id_user = ?", [req.user.id_user]).then(([rows]) => {
    user = rows[0];
  });
  

  if (user) {
    res.json({
      id_user: user.id_user,
      user_full_name,
      user_phone_number,
      user_email: user.user_email
    })
  } else {
    res.status(404)
    throw new Error('User not found');
  }
})

export {
  authUser,
  registerUser,
  getUserProfile
}