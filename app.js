require("dotenv").config();

var createError = require("http-errors");

var express = require("express");

var flash = require("connect-flash");

var redis = require("redis");

var session = require("express-session");

var redisStore = require("connect-redis").default;

var client = redis.createClient();

client.connect().catch(console.error);



var path = require("path");

var cookieParser = require("cookie-parser");

var bodyParser = require("body-parser");

var logger = require("morgan");

var indexRouter = require("./routes/index");

var usersRouter = require("./routes/users");

var unitRouter = require("./routes/units");

var supplierRouter = require("./routes/suppliers");

var productRouter = require("./routes/products");

var warehouseRouter = require("./routes/warehouses");

var categoryRouter = require("./routes/categoreis");

var importRouter = require("./routes/imports");

var app = express();

// view engine setup

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(
  session({
    secret: "ssshhhhh",
    cookie: {
      secure: false,
    },
    // create new redis store.
    store: new redisStore({
      host: "localhost",
      port: 6379,
      client: client,
      ttl: 260,
    }),
    saveUninitialized: false,
    resave: false,
  })
);
app.use(flash());



//Khai báo sử dụng middleware
app.use((req, res, next) => {

  if (req.url == "/dang-nhap" && typeof req.session.token === "undefined") {
    next();
  }
  if (req.url != "/dang-nhap" && typeof req.session.token === "undefined") {

    res.redirect("/dang-nhap");
  }
  if (typeof  req.session.token !== "undefined" && req.url != "/dang-nhap") {
    next();
  }
  if (typeof req.session.token !== "undefined" && req.url == "/dang-nhap") {
    res.redirect("/");
  }
});

// route
app.use("/", indexRouter);

app.use("/users", usersRouter);

app.use("/don-vi", unitRouter);

app.use("/nha-cung-cap", supplierRouter);

app.use("/san-pham", productRouter);

app.use("/danh-muc-san-pham", categoryRouter);

app.use("/kho-bai", warehouseRouter);

app.use("/nhap-hang", importRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(res.render("404"));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
