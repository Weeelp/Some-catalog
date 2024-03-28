const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const cursesRoutes = require("./routes/curses");
const cardRoutes = require("./routes/card");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/curses", cursesRoutes);
app.use("/card", cardRoutes);

app.get("/about", (req, res) => {
  res.render("about");
});

const PORT = process.env.PORT || 4200;

// async function start() {
//   try {
//     const url = `mongodb+srv://enesterovich007:N5YIboIdvAHIeHAK@cluster0.xyc2jtn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
//     await mongoose.connect(url, { useNewUrlParser: true });
//     app.listen(PORT, () => {
//       console.log(`Server port--> ${PORT}`);
//     });
//   } catch (e) {
//     console.log(e);
//   }
// }
// start();

app.listen(PORT, () => {
  console.log(`Server port--> ${PORT}`);
});
