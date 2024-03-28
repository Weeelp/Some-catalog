const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");

class Curse {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuid();
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id,
    };
  }

  async save() {
    const curses = await Curse.getAll();
    curses.push(this.toJSON());

    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "curses.json"),
        JSON.stringify(curses),
        (err) => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((res, rej) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "curses.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            rej(err);
          } else {
            res(JSON.parse(content));
          }
        }
      );
    });
  }

  static async getById(id) {
    const curses = await Curse.getAll();
    return curses.find((c) => c.id === id);
  }

  static async update(curse) {
    const curses = await Curse.getAll();

    const idx = curses.findIndex((c) => c.id === curse.id);
    curses[idx] = curse;

    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "curses.json"),
        JSON.stringify(curses),
        (err) => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        }
      );
    });
  }
}

module.exports = Curse;
