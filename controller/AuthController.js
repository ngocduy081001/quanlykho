const User = require("../model/UserModel");

const bcrypt = require("bcrypt");

var express = require("express");

var app = express();

var session = require("express-session");

app.set("trust proxy", 1);

const jwt = require("jsonwebtoken");

class AuthController {
  getFormLogin(req, res) {
    res.render("page/form/login");
  }

  async postFormLogin(req, res, next) {
    const username = req.body.username;

    const password = req.body.password;

    User.findOne({ username: username })
      .then((data) => {
        if (data) {
          bcrypt
            .compare(password, data.password)
            .then(function (data2) {
              if (data2) {
                const accessToken = jwt.sign(
                  req.body,
                  process.env.ACCESS_TOKEN_SECRET,
                  {
                    expiresIn: "10m",
                  }
                );
                req.session.token = accessToken;
                req.session.username = req.body.username;
                return res.redirect("/");
              } else {
                return res.render("page/form/login", {
                  error: "Tên đăng nhập hoặc mật khẩu không đúng",
                });
              }
            })
            .catch();
        } else {
          return res.render("page/form/login", {
            error: "Tên đăng nhập hoặc mật khẩu không đúng",
          });
        }
      })
      .catch((err) => {});
  }

  getFormRegister(req, res) {
    res.render("page/form/register");
  }

  postFormRegister(req, res, next) {
    var username = req.body.username;

    var password = bcrypt.hashSync(req.body.password, 13);

    User.create({ username: username, password: password })
      .then((data) => {
        if (data) {
          return res.redirect("/dang-nhap");
        } else {
          return res.render("page/form/login", {
            error: "Tên đăng nhập hoặc mật khẩu không đúng",
          });
        }
      })
      .catch((err) => {});
  }
}

module.exports = new AuthController();
