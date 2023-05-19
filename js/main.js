const initApp = () => {

    const currentValueElement = document.querySelector(`.currentValue`);
    const previousValueElement = document.querySelector(`.previousValue`);
    let itemArray = [];
    const equationArray = [];
    let newNumberFlag = false;

    const inputButtons = document.querySelectorAll(`.number`);
    inputButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            
            const newInput = event.target.textContent;
            if (newNumberFlag) {
                currentValueElement.value = newInput;
                newNumberFlag = false;
            } else {
                currentValueElement.value = 
                    currentValueElement.value == 0
                    ? newInput
                    : `${currentValueElement.value}${newInput}`;
            }
        });
    });

    const opButtons = document.querySelectorAll(`.operator`);
    opButtons.forEach(button => {
        button.addEventListener(`click`, (event) => {
            
            if (newNumberFlag) {
                previousValueElement.textContent = "";
                itemArray = [];
            }

            const newOperator = event.target.textContent;
            const currentVal = currentValueElement.value;

            // Needs number input to get action
            if (!itemArray.length && currentVal == 0) return;

            if (!itemArray.length) {
                itemArray.push(currentVal, newOperator);
                previousValueElement.textContent = 
                    `${currentVal} 
                     ${newOperator}`;
                return newNumberFlag = true;
            }

            if (itemArray.length) {
                
                itemArray.push(currentVal); // 3rd element

                const equationObject = {
                    num1: parseFloat(itemArray[0]),
                    num2: parseFloat(currentVal),
                    op: itemArray[1]
                }

                equationArray.push(equationObject);
                const equationString = 
                    `${equationObject[`num1`]}
                     ${equationObject[`op`]}
                      ${equationObject[`num2`]}`;

                      const newValue = calculate(equationString, currentValueElement);

                      previousValueElement.textContent = `${newValue} ${newOperator}`;


                      //start new equation
                      itemArray = [newValue, newOperator];
                      newNumberFlag = true;
                      console.log(equationArray);
            }
        });
    });

    const clearButtons = document.querySelectorAll(`.clear, .clearEntry`);
    clearButtons.forEach(button => {
        button.addEventListener(`click`, (event) => {
            currentValueElement.value = 0;
            if (event.target.classList.contains(`clear`)) {
                previousValueElement.textContent = ``;
                itemArray = [];
            }
        });
    });

    const deleteButton = document.querySelector(`.delete`);
    deleteButton.addEventListener(`click`, () => {
        currentValueElement.value = currentValueElement.value.slice(0, -1);
    });

    const signChangeButton = document.querySelector(`.signChange`);
    signChangeButton.addEventListener(`click`, () => {
        currentValueElement.value = parseFloat(currentValueElement.value) * -1;
    });

}

document.addEventListener("DOMContentLoaded", initApp);

const calculate = (equation, currentValueElement) => {
    const regex = /(^[*/=])|(\s)/g;
    equation.replace(regex, ``);
    const divByZero = /(\/0)/.test(equation);
    if (divByZero) return currentValueElement.value = "Retard";
    return currentValueElement.value = eval(equation);
}