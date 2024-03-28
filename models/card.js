const path = require("path");
const fs = require("fs");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "card.json"
);

class Card {
  static async add(curse) {
    const card = await Card.fetch();

    const idx = card.curses.findIndex((c) => c.id === curse.id);
    const candidate = card.curses[idx];

    if (candidate) {
      // курс уже есть
      candidate.count++;
      card.curses[idx] = candidate;
    } else {
      // нужно добавить курс
      curse.count = 1;
      card.curses.push(curse);
    }

    card.price += +curse.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async remove(id) {
    const card = await Card.fetch();

    const idx = card.curses.findIndex((c) => c.id === id);
    const curse = card.curses[idx];

    if (curse.count === 1) {
      // удалить
      card.curses = card.curses.filter((c) => c.id !== id);
    } else {
      // изменить количество
      card.curses[idx].count--;
    }

    card.price -= curse.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(card);
        }
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, "utf-8", (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }
}

module.exports = Card;
