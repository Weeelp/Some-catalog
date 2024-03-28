const { Router } = require("express");
const Curse = require("../models/curse");
const router = Router();

router.get("/", async (req, res) => {
  const curses = await Curse.getAll();
  res.render("curses", {
    title: "Курс",
    isCurses: true,
    curses,
  });
});

router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }

  const curse = await Curse.getById(req.params.id);

  res.render("curse-edit", {
    title: `Редактировать ${curse.title}`,
    curse,
  });
});

router.post("/edit", async (req, res) => {
  await Curse.update(req.body);

  res.redirect("/curses");
});

router.get("/:id", async (req, res) => {
  const curse = await Curse.getById(req.params.id);
  res.render("curse", {
    layout: "empty",
    title: `Курс ${curse.title}`,
    curse,
  });
});

module.exports = router;
