const board1 = document.getElementById('board')
const board2 = document.getElementById('board2')
const matrix = [];
const ship1 = [];
const ship2 = [];
const ship3 = [];
const ship4 = [];
const ship5 = [];
const ship6 = [];
const ship7 = [];
const userPositions = document.getElementById('positionsUser')
const cpuPositions = document.getElementById('positionsCpu')
let counter1 = 0;
let counter2 = 0;
let currentPlayer = 1;
const winUser = document.getElementById("winUser");
const winCpu = document.getElementById("winCpu");
const shoot = document.getElementById("shoot");
let numberComputer = 90


const computerTurn = () => {
    if (currentPlayer === 2) {
        let randomNumber = Math.floor(Math.random() * numberComputer)
        let intento = matrix[randomNumber]
        matrix.splice(randomNumber, 1)
        const target = document.getElementById("board2")
        const targeted = target.getElementsByClassName(intento)[0]

        if (ship5.includes(intento) || ship6.includes(intento) || ship7.includes(intento)) {

            targeted.classList.add('found');

            counter2++
            if (counter2 === 9) {
                winCpu.classList.remove('hide')
            }
        } else {
            targeted.classList.add('missed')
        }
        numberComputer--
        currentPlayer = 1        
    }
}

const findShip = (e, firstShip, secondShip, thirdShip, counter, num) => {
    if (currentPlayer === num) {

        const targetId = parseInt(e.target.id)
        let realcounter;
        let message;
        if (num === 1) {
            message = winUser

        } else if (num === 2) {
            message = winCpu
        }
        if (firstShip.includes(targetId) || secondShip.includes(targetId) || thirdShip.includes(targetId)) {
            e.target.classList.add('found');
            if (num === 1) {
                realcounter = counter1++

            } else if (num === 2) {
                realcounter = counter2++
            }
            realcounter++
            if (realcounter === 9) {
                message.classList.remove('hide')
            }
        } else {
            e.target.classList.add('missed')
        }
        if (num === 1) {
            currentPlayer = 2

        } else if (num === 2) {
            currentPlayer = 1
        }
    }
    computerTurn(num)
}


const createBoard = (board, firstShip, secondShip, thirdShip, num, counter) => {
    for (let i = 0; i <= 89; i++) {
        let box = document.createElement('div')
        box.id = i
        box.classList.add('boxes' + num)
        box.classList.add(i)
        board.appendChild(box)
        if (num === 1) {
            matrix.push(i)
        }

        box.addEventListener("click", (e) => {
            findShip(e, firstShip, secondShip, thirdShip, counter, num)
        })
        let randomNumber1 = Math.floor(Math.random() * 89)
        let randomNumber2 = Math.floor(Math.random() * 89)
        do {
            randomNumber2 = Math.floor(Math.random() * 89)
        } while (randomNumber1 === randomNumber2)

        let randomNumber
        if (num === 1) {
            randomNumber = randomNumber2
        } else {
            randomNumber = randomNumber1
        }
        if (firstShip.length < 1) {

            if (!firstShip.includes(randomNumber)) {
                if ((randomNumber + 1).toString().split('')[1] == 0) {
                    firstShip.push(randomNumber, randomNumber - 1)
                } else {
                    firstShip.push(randomNumber, randomNumber + 1)
                }
            }
        }

        if (secondShip.length < 1) {
            if (!firstShip.includes(randomNumber) && !firstShip.includes(randomNumber - 1) && !firstShip.includes(randomNumber - 2) && !firstShip.includes(randomNumber + 1) && !firstShip.includes(randomNumber + 2) && !secondShip.includes(randomNumber)) {
                if ((randomNumber + 1).toString().split('')[1] == 0 || (randomNumber + 2).toString().split('')[1] == 0) {
                    secondShip.push(randomNumber, randomNumber - 1, randomNumber - 2)
                } else {
                    secondShip.push(randomNumber, randomNumber + 1, randomNumber + 2)
                }
            }
        }

        if (thirdShip.length < 1) {
            if (!firstShip.includes(randomNumber) && !firstShip.includes(randomNumber + 10) && !firstShip.includes(randomNumber + 20) && !firstShip.includes(randomNumber + 30) && !firstShip.includes(randomNumber - 10) && !firstShip.includes(randomNumber - 20) && !firstShip.includes(randomNumber - 30) && !secondShip.includes(randomNumber) && !secondShip.includes(randomNumber + 10) && !secondShip.includes(randomNumber + 20) && !secondShip.includes(randomNumber + 30) && !secondShip.includes(randomNumber - 10) && !secondShip.includes(randomNumber - 20) && !secondShip.includes(randomNumber - 30) && !ship3.includes(randomNumber) && !ship3.includes(randomNumber + 10) && !ship3.includes(randomNumber + 20) && !ship3.includes(randomNumber + 30) && !ship3.includes(randomNumber - 10) && !ship3.includes(randomNumber - 20) && !ship3.includes(randomNumber - 30) && !thirdShip.includes(randomNumber)) {
                if (randomNumber > 59) {
                    thirdShip.push(randomNumber, randomNumber - 10, randomNumber - 20, randomNumber - 30)
                } else {
                    thirdShip.push(randomNumber, randomNumber + 10, randomNumber + 20, randomNumber + 30)
                }
            }
        }



    }
}

window.addEventListener("load", () => {
    createBoard(board1, ship1, ship2, ship4, 1, counter1)
    createBoard(board2, ship5, ship6, ship7, 2, counter2)
})
shoot.addEventListener("click", () => {
    const valor = parseInt(prompt("Choose the square you want to shoot, e.g. 34 or 56"))
    let realCounter;
    const chooseBox = document.getElementById(valor)
    if (ship1.includes(valor) || ship2.includes(valor) || ship4.includes(valor)) {
        if (currentPlayer === 1) {
            realcounter = counter1++

        } else if (currentPlayer === 2) {
            realcounter = counter2++
        }


        chooseBox.classList.add('found')
        realcounter++;
        currentPlayer = 2
        computerTurn()
        if (realcounter === 9) {
            winUser.classList.remove('hide')
        }
    } else {
        chooseBox.classList.add('missed')
        currentPlayer = 2
        computerTurn()
    }

})




const boxes1 = document.getElementsByClassName("boxes1")
const boxes2 = document.getElementsByClassName("boxes2")

userPositions.addEventListener("click", () => {

    Array.from(boxes1).map(box => {
        if (ship1.includes(parseInt(box.id)) || ship2.includes(parseInt(box.id)) || ship4.includes(parseInt(box.id))) {
            if (box.classList.contains("border")) {
                box.classList.remove('border')
            } else {
                box.classList.add('border')
            }

        }
    })
})

cpuPositions.addEventListener("click", () => {

    Array.from(boxes2).map(box => {
        if (ship5.includes(parseInt(box.id)) || ship6.includes(parseInt(box.id)) || ship7.includes(parseInt(box.id))) {
            if (box.classList.contains("border")) {
                box.classList.remove('border')
            } else {
                box.classList.add('border')
            }

        }
    })
})