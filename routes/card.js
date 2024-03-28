const { Router } = require("express");
const Card = require("../models/card");
const Curse = require("../models/curse");
const router = Router();

router.post("/add", async (req, res) => {
  const curse = await Curse.getById(req.body.id);
  console.log(Curse.getById(req.body.id));
  await Card.add(curse);
  res.redirect("/card");
});

router.delete("/remove/:id", async (req, res) => {
  const card = await Card.remove(req.params.id);
  res.status(200).json(card);
});

router.get("/", async (req, res) => {
  const card = await Card.fetch();
  res.render("card", {
    title: "Корзина",
    isCard: true,
    curses: card.curses,
    price: card.price,
  });
});

module.exports = router;
