// task:
// Заполнить двумерный массив змейкой. На вход, в виде prompt приходят высота и ширина матрицы. Начало с 1.

// Solution:
const spiralHeight = +prompt("Введите высоту спирали");
const spiralWidth = +prompt("Введите ширину спирали");
const startNum = prompt("Введите начальное число");
const tbody = document.querySelector("tbody");

function generateTable(tableBody, width, height) {
    for (let i = 0; i < height + 1; i++) {
        const line = document.createElement("tr");
        line.setAttribute("line", i);
        tableBody.append(line);
        for (let j = 0; j < width + 1; j++) {
            if (i === 0) {
                const headerBox = document.createElement("th");
                if (j === 0) {
                    tableBody.querySelector("tr").append(headerBox);
                    headerBox.setAttribute("column", j);
                } else {
                    headerBox.textContent = j - 1;
                    headerBox.setAttribute("column", j);
                    tableBody.querySelector("tr").append(headerBox);
                }
            } else {
                if (j === 0) {
                    const headerBox = document.createElement("th");
                    headerBox.textContent = i - 1;
                    headerBox.setAttribute("column", j);
                    tableBody.querySelector(`[line="${i}"]`).append(headerBox);
                } else {
                    const box = document.createElement("td");
                    box.setAttribute("column", j);
                    tableBody.querySelector(`[line="${i}"]`).append(box);
                }
            }
        }
    }
}

function fillWithSpiral(startNum) {
    const boxes = document.querySelectorAll("td");
    // const lines = document.querySelectorAll("[line]");
    // const column = document.querySelectorAll("td[column]");
    // const numOfSteps = boxes.length;
    let point;

    boxes.forEach((box, i) => {
        box.id = i + 1;
    });

    let num = startNum;
    let opacity = 0;

    for (let i = 0; i < boxes.length + 1; i++) {
        if (!boxes[0].textContent) {
            boxes[i].textContent = num;
            point = boxes[i];
            point.append(document.createElement("hr"));
            num++;
            point.style.cssText = `background-color: rgba(0, 0, 255, ${opacity})`;
            opacity += 1 / boxes.length;
        } else if (
            point.nextSibling &&
            !point.nextSibling.textContent &&
            point.parentNode.previousSibling.querySelector(
                `[column="${point.getAttribute("column")}"]`
            ) &&
            point.parentNode.previousSibling.querySelector(
                `[column="${point.getAttribute("column")}"]`
            ).textContent !== ""
        ) {
            let nextPoint = point.nextSibling;
            nextPoint.textContent = num;
            point = nextPoint;
            num++;
            point.style.cssText = `background-color: rgba(0, 0, 255, ${opacity})`;
            opacity += 1 / boxes.length;
        } else if (
            point.parentNode.nextSibling &&
            point.parentNode.nextSibling.querySelector(
                `[column="${point.getAttribute("column")}"]`
            ) &&
            !point.parentNode.nextSibling.querySelector(
                `[column="${point.getAttribute("column")}"]`
            ).textContent
        ) {
            let box = point.parentNode.nextSibling.querySelector(
                `[column="${point.getAttribute("column")}"]`
            );
            box.textContent = num;
            point = box;
            num++;
            point.style.cssText = `background-color: rgba(0, 0, 255, ${opacity})`;
            opacity += 1 / boxes.length;
        } else if (
            point.previousSibling &&
            !point.previousSibling.textContent
        ) {
            let box = point.previousSibling;
            box.textContent = num;
            point = box;
            num++;
            point.style.cssText = `background-color: rgba(0, 0, 255, ${opacity})`;
            opacity += 1 / boxes.length;
        } else if (
            !point.parentNode.previousSibling.querySelector(
                `[column="${point.getAttribute("column")}"]`
            ).textContent
        ) {
            let box = point.parentNode.previousSibling.querySelector(
                `[column="${point.getAttribute("column")}"]`
            );
            box.textContent = num;
            point = box;
            console.log(point);
            num++;
            point.style.cssText = `background-color: rgba(0, 0, 255, ${opacity})`;
            opacity += 1 / boxes.length;
        } else {
            point.style.cssText = `background-color: rgba(0, 0, 255, 1)`;
        }
    }
}

if (
    typeof spiralHeight === "number" &&
    typeof spiralWidth === "number" &&
    spiralHeight &&
    spiralWidth &&
    spiralHeight !== "" &&
    spiralWidth !== "" &&
    spiralHeight > 0 &&
    spiralWidth > 0 &&
    spiralHeight <= 15 &&
    spiralWidth <= 40
) {
    generateTable(tbody, spiralWidth, spiralHeight);
    fillWithSpiral(startNum);
} else {
    document.body.append(
        (document.createElement("div").innerHTML =
            "Неправильные исходные данные ;(")
    );
}
console.log(`Высота спирали: ${spiralHeight}\nШирина спирали: ${spiralWidth}`);
