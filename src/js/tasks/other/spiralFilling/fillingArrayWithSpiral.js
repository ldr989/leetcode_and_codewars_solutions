// task:
// Заполнить двумерный массив змейкой. На вход, в виде prompt приходят высота и ширина матрицы. Начало с 1.

const spiralWidth = +prompt("Введите ширину спирали");
const spiralHeight = +prompt("Введите высоту спирали");

function createMatrix(h, w) {
    let result = new Array(h).fill().map(() => new Array(w).fill(""));
    let counter = 10;
    let startCol = 0;
    let endCol = w - 1;
    let startRow = 0;
    let endRow = h - 1;

    while (startCol <= endCol && startRow <= endRow) {
        for (let i = startCol; i <= endCol; i++) {
            result[startRow][i] = counter;
            counter++;
        }
        startRow++;

        for (let j = startRow; j <= endRow; j++) {
            result[j][endCol] = counter;
            counter++;
        }
        endCol--;

        for (let k = endCol; k >= startCol; k--) {
            result[endRow][k] = counter;
            counter++;
        }
        endRow--;

        for (let l = endRow; l >= startRow; l--) {
            result[l][startCol] = counter;
            counter++;
        }
        startCol++;
    }

    return result;
}

console.log(createMatrix(spiralHeight, spiralWidth));
