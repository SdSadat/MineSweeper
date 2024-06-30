let width = 10;
let size = width * width;

let bombNumber = 20;


document.addEventListener('DOMContentLoaded', () => {
    function createBoard() {
        let isGameOver = false;
        let flags = 0;
        const bombsArray = Array(bombNumber).fill('bomb');
        const emptyArray = Array(size - bombNumber).fill('valid');

        const gameArray = emptyArray.concat(bombsArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

        let gridElement = document.querySelector('.grid');

        for (let i = 0; i < size; i++) {
            let cell = document.createElement('div');
            cell.classList.add(shuffledArray[i]);
            cell.setAttribute('id', i);
            gridElement.appendChild(cell);
            cell.addEventListener('click', function (e) {
                click(cell);
            });

            cell.oncontextmenu = function (e) {
                e.preventDefault();
                addFlag(cell);
            }
        }

        let gridArray = Array.from(document.querySelectorAll('.grid div'));


        for (let i = 0; i < size; i++) {
            const atleftEdge = (i % width === 0);
            const atRightEdge = (i % width === width - 1);
            const atTop = i < width;
            const atBottom = i >= size - width;

            if (shuffledArray[i] === 'valid') {
                let total = 0;

                if (!atleftEdge && shuffledArray[i - 1] === 'bomb') total++;
                if (!atRightEdge && shuffledArray[i + 1] === 'bomb') total++;
                if (!atTop && shuffledArray[i - width] === 'bomb') total++;
                if (!atBottom && shuffledArray[i + width] === 'bomb') total++;
                if (!atBottom && !atRightEdge && shuffledArray[i + 1 + width] === 'bomb') total++;
                if (!atBottom && !atleftEdge && shuffledArray[i - 1 + width] === 'bomb') total++;
                if (!atTop && !atRightEdge && shuffledArray[i + 1 - width] === 'bomb') total++;
                if (!atTop && !atleftEdge && shuffledArray[i - 1 - width] === 'bomb') total++;

                gridArray[i].setAttribute('data', total);

            }

        }

        function addFlag(cell) {
            if (isGameOver) return;
            if (!cell.classList.contains('checked') && (flags < bombNumber)) {
                if (!cell.classList.contains('flag')) {
                    cell.classList.add('flag');
                    cell.innerHTML = 'F';
                    flags++;
                    console.log(flags);
                    checkForWin();
                }
                else {
                    cell.classList.remove('flag');
                    cell.innerHTML = ''
                    flags--;
                }
            }
        }

        function click(cell) {
            if (isGameOver) return;
            if (cell.classList.contains('bomb')) {
                gameOver();
                return;
            }
            if (cell.classList.contains('checked') || cell.classList.contains('flaged')) return;
            else {
                let total = cell.getAttribute('data');
                if (total != 0) {
                    cell.classList.add('checked');
                    cell.innerHTML = total;
                    return;
                }
                cell.classList.add('checked');
                checkCell(cell, cell.id);
            }
        }

        function checkCell(cell, cellId) {
            if (isGameOver) return;

            const atleftEdge = (cellId % width === 0);
            const atRightEdge = (cellId % width === width - 1);
            const atTop = cellId < width;
            const atBottom = cellId >= size - width;

            setTimeout(() => {
                if (!atleftEdge) {
                    const newId = gridArray[parseInt(cellId) - 1].id;
                    const newCell = document.getElementById(newId);
                    click(newCell);
                }
                if (!atRightEdge) {
                    const newId = gridArray[parseInt(cellId) + 1].id;
                    const newCell = document.getElementById(newId);
                    click(newCell);
                }
                if (!atTop) {
                    const newId = gridArray[parseInt(cellId) - width].id;
                    const newCell = document.getElementById(newId);
                    click(newCell);
                }
                if (!atBottom) {
                    const newId = gridArray[parseInt(cellId) + width].id;
                    const newCell = document.getElementById(newId);
                    click(newCell);
                }
                if (!atBottom && !atRightEdge) {
                    const newId = gridArray[parseInt(cellId) + 1 + width].id;
                    const newCell = document.getElementById(newId);
                    click(newCell);
                }
                if (!atBottom && !atleftEdge) {
                    const newId = gridArray[parseInt(cellId) - 1 + width].id;
                    const newCell = document.getElementById(newId);
                    click(newCell);
                }
                if (!atTop && !atRightEdge) {
                    const newId = gridArray[parseInt(cellId) + 1 - width].id;
                    const newCell = document.getElementById(newId);
                    click(newCell);
                }
                if (!atTop && !atleftEdge) {
                    const newId = gridArray[parseInt(cellId) - 1 - width].id;
                    const newCell = document.getElementById(newId);
                    click(newCell);
                }
            }, 10);

        }


        function gameOver() {
            console.log('GameOver');

            isGameOver = true;
            gridArray.forEach(cell => {
                if (cell.classList.contains('bomb')) {
                    cell.innerHTML = 'B';
                }
            })
        }

        function checkForWin() {
            let matches = 0;
            for (let i = 0; i < size; i++) {
                if (gridArray[i].classList.contains('flag') && gridArray[i].classList.contains('bomb')) {
                    matches++;
                }

            }
            if (matches === bombNumber) {
                console.log("you won");
                isGameOver = true;
            }
            console.log(matches);
        }


    }

    createBoard();




})


