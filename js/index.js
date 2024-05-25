class Game {
  constructor() {
    this.table = document.querySelector(".table");
    this.firstCard = null;
    this.secondCard = null;
    this.time = 500;
    this.timeEnd = 300;
    this.hits = [];
  }

  sortCards() {
    const cards = [
      "c_sharp",
      "c_sharp",
      "c",
      "c",
      "c++",
      "c++",
      "css",
      "css",
      "html",
      "html",
      "java",
      "java",
      "js",
      "js",
      "python",
      "python",
    ];

    const random = cards.sort(() => Math.random() - 0.5);
    random.forEach(card => this.CreateCards(card));
  }

  clickCards() {
    const cards = document.querySelectorAll(".cards");

    const handleClick = card => {
      if (this.firstCard !== null && this.secondCard !== null) return;
      card.classList.add("active");

      this.firstCard === null ? this.firstCard = card.dataset.caracter : this.secondCard = card.dataset.caracter;

      if (this.secondCard !== null && this.firstCard === this.secondCard) {
        cards.forEach(e => {
          if (e.dataset.caracter === this.firstCard || e.dataset.caracter === this.secondCard) {
            e.classList.add("card-certain");
          }
        });

        this.hits.push([this.firstCard, this.secondCard]);
        this.firstCard = null;
        this.secondCard = null;
      } else {
        if (this.firstCard === null || this.secondCard === null) return;

        setTimeout(() => {
          cards.forEach(e => {
            if (e.dataset.caracter === this.firstCard || e.dataset.caracter === this.secondCard) {
              e.classList.remove("active");
            }
          });

          this.firstCard = null;
          this.secondCard = null;
        }, this.time);
      }

      this.checkWin();
    }

    cards.forEach(card => card.addEventListener("click", () => handleClick(card)));
  }

  checkWin() {
    const screenWin = document.querySelector('.screen-win');

    if (this.hits.length >= 8) {
      setTimeout(() => {
        this.table.classList.add("hidden");
        screenWin.classList.add("active");
      }, this.timeEnd);
    }
  }

  CreateCards(card) {
    const cards = document.createElement("div");
    cards.setAttribute("class", "cards");
    cards.setAttribute("data-caracter", card);
    const frontFace = document.createElement("div");
    frontFace.setAttribute("class", "front-face");
    const backFace = document.createElement("div");
    backFace.setAttribute("class", "back-face");
    const img = document.createElement("img");
    img.setAttribute("class", "images");
    img.src = `../img/${card}.png`;

    this.table.appendChild(cards);
    cards.appendChild(frontFace);
    cards.appendChild(backFace);
    frontFace.appendChild(img);
  }

  init() {
    this.sortCards();
    this.clickCards();
  }
}

const game = new Game();
game.init();
