class SlidingImage {
    constructor(duration, imageCount) {
        this.imageCount = imageCount;
        this.duration = duration;
        this.side = this.pickSide();
        this.options = this.shuffle(this.generateImages(imageCount));
        this.imgSrc = this.options[this.getRandomInteger(0, imageCount - 1)];
        this.position = 0;
        this.maxPosition = window.innerWidth;
        this.interval = null;
        this.postionCounterUp = 4.5;
        this.levelCounter = 1;
    }
  
    createImageElement(imgSrc, useStyles = true) {
        const img = document.createElement('img');
        img.src = imgSrc;

        if (useStyles === true) {
            img.style.position = 'fixed';
            img.style.top = '50%';
            img.style.transform = 'translate(-50%, -50%)';

            if (this.side === "left") {
                img.style.left = '-150%';
                img.style.marginLeft = '150px';
            } else {
                img.style.right = '150%';
                img.style.marginRight = '-150px';
            }
        } else {
            img.setAttribute("class", "card");
        }

        document.body.appendChild(img);
      
        return img;
    }
  
    slide() {
      this.interval = setInterval(() => {
        if (this.position >= this.maxPosition) {
          clearInterval(this.interval);
          this.position = 0;
      
          setTimeout(() => {
            this.showOptions();
            this.changeLabel("Vyber správný obrázek", "label");
          }, 1000);
        } else {
          this.position = this.position += this.postionCounterUp;
          this.imgElement.style[this.side] = this.position + "px";
        }
      }, this.duration);
    }
  
    showOptions() {
        const optionsContainer = document.createElement('div');
        optionsContainer.setAttribute("class", "options-container");

        this.options.forEach((optionSrc) => {
        const option = this.createImageElement(optionSrc, false);
        optionsContainer.appendChild(option);
  
        option.addEventListener('click', () => {
          if (optionSrc === this.imgSrc) {
            if (this.levelCounter === 15) {
                Swal.fire({
                    title: 'Gratulujeme',
                    text: 'Vyhrál jsi! Díky za hru',
                    imageUrl: "images/components/Mouse.png",
                    imageHeight: 150,
                    imageWidth: 150,
                    confirmButtonText: 'Zpět do menu',
                  }).then(() => {
                    window.location = "index.html";
                });
            } else {
                this.nextLevel();
            }
          } else {
            Swal.fire({
                title: 'Chyba',
                text: 'Máš to špatně, uhádl jsi ' + (this.levelCounter - 1) + " obrázků",
                icon: 'error',
                closeButton: 'Zpět do menu',
              }).then(() => {
                window.location = "index.html";
            });
          }
        });
      });
  
      //let exitWidget = document.getElementById("exitWidget");
      //exitWidget.style.display = "block";
      //optionsContainer.insertBefore(exitWidget, null);

      document.body.appendChild(optionsContainer);
    }
  
    start() {
        document.getElementById("level").innerHTML = "Úroveň " + this.levelCounter;
        this.imgElement = this.createImageElement(this.imgSrc);
        this.slide();
    }
  
    stop() {
      clearInterval(this.interval);
    }

    changeLabel(message, labelId) {
        document.getElementById(labelId).innerHTML = message;
    }

    generateImages(imageCount) {
        let data = [];
        let usedNumbers = [];

        for (let i = 1; i <= imageCount; i++) {
            let randomNumber = this.getRandomInteger(1, 14);

            if (usedNumbers.includes(randomNumber)) {
              i--;
            } else {
              usedNumbers.push(randomNumber);
              data.push("images/data/" + randomNumber + ".png");
            }
        }

        return data;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    nextLevel() {
        document.querySelector(".options-container").remove();
        this.options = this.generateImages(this.imageCount);
        this.shuffle(this.options);
        this.side = this.pickSide();
        console.log(this.side);
        this.imgSrc = this.options[this.getRandomInteger(0, this.imageCount - 1)];
        this.postionCounterUp += 0.2;
        this.levelCounter++;

        setTimeout(() => {
          this.start();
        }, 1000);
    }

    pickSide() {
        let items = ["left", "right"];

        return items[Math.round(Math.random())];
    }

    isNumberUnused(array, number) {
        if (number.includes(number)) {

        }
    }
  }