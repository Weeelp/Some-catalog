const { Router } = require("express");
const Curse = require("../models/curse");
const router = Router();

router.get("/", (req, res) => {
  res.render("add", {
    title: "Добавить курс",
    isAdd: true,
  });
});

router.post("/", async (req, res) => {
  const curse = new Curse(req.body.title, req.body.price, req.body.img);

  await curse.save();

  res.redirect("/curses");
});

module.exports = router;
