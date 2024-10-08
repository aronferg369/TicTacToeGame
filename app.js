let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#resetBtn");
    let msgContainer = document.querySelector(".msgContainer");
    let msg = document.querySelector("#msg");
    let newGameBtn = document.querySelector(".newGame");

    let turnO = true;
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const resetGame = () => {
      turnO = true;
      enableBoxes();
      msgContainer.classList.add("hide");
    };

    const newGame = () => {
      turnO = true;
      enableBoxes();
      msgContainer.classList.add("hide");
    };

    boxes.forEach((box) => {
      box.addEventListener("click", () => {
        if (turnO) {
          box.innerText = "0";
          turnO = false;
        } else {
          box.innerText = "X";
          turnO = true;
        }
        box.disabled = true;
        checkWinner();
        if (!turnO) {
          // Computer's turn (random move)
          setTimeout(makeRandomMove, 500); // Add a delay for fun
        }
      });
    });

    const disableBoxes = () => {
      for (const box of boxes) {
        box.disabled = true;
      }
    };

    const enableBoxes = () => {
      for (const box of boxes) {
        box.disabled = false;
        box.innerText = "";
      }
    };

    const showWinner = (winner) => {
      msg.innerText = `Congratulations, The Winner is ${winner}`;
      msgContainer.classList.remove("hide");
      disableBoxes();
    };

    const checkWinner = () => {
      for (const pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
          showWinner(pos1Val);
        }
      }
    };

    const makeRandomMove = () => {
      const emptyCells = Array.from(boxes).filter((box) => !box.innerText);
      if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].innerText = "X"; // Computer's marker
        emptyCells[randomIndex].disabled = true;
        turnO = true;
        checkWinner();
      }
    };

    resetBtn.addEventListener("click", resetGame);
    newGameBtn.addEventListener("click", newGame);
