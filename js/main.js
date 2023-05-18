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
    })

}

document.addEventListener("DOMContentLoaded", initApp);