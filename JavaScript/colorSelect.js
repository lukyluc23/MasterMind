const body = document.body;
const dark = document.getElementById('switch');
const userName = document.getElementById("userName");
const playGameButton = document.getElementById('playGameBoardButton');
const colorOptionsContainer = document.getElementById("color-options-container");

const selectedLevel = localStorage.getItem("selectedLevel");

const levelColorOptions = {
    easy: 4,
    medium: 5,
    advanced: 6
};

const numberOfColorOptions = levelColorOptions[selectedLevel];

for (let i = 0; i < numberOfColorOptions; i++) {
    const colorPickerContainer = document.createElement("div");
    colorPickerContainer.className = "col colors-selection";

    const colorCircle = document.createElement("div");
    colorCircle.className = "color-circle";
    colorCircle.id = `color-circle-${i}`;

    const colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.id = `color-picker-${i}`;
    colorPicker.className = "color-picker";

    colorPickerContainer.appendChild(colorCircle);
    colorPickerContainer.appendChild(colorPicker);

    colorOptionsContainer.appendChild(colorPickerContainer);

    colorPicker.addEventListener('input', function () {
        userColorOptions[i] = colorPicker.value;
        checkColors();
        colorCircle.style.backgroundColor = colorPicker.value;
    });
}

const storedName = localStorage.getItem("userName");

if (storedName) {
    userName.textContent = `${storedName}`;
} else {
    userName.textContent = "Selecciona tus colores!";
}



const userColorOptions = [];

function checkColors() {
    const selectedCount = userColorOptions.filter(color => color !== "").length;

    if (selectedCount === numberOfColorOptions && !hasDuplicates(userColorOptions)) {
        playGameButton.removeAttribute('disabled');
    } else {
        playGameButton.setAttribute('disabled', 'true');
    }
}

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

playGameButton.addEventListener('click', function (event) {
    if (userColorOptions.length === numberOfColorOptions && !hasDuplicates(userColorOptions)) {
        localStorage.setItem('userColorOptions', JSON.stringify(userColorOptions));

        // Obtener el nivel de dificultad guardado en el localStorage
        const selectedLevel = localStorage.getItem("selectedLevel");

        // Redirigir al usuario a la página HTML correspondiente según el nivel
        if (selectedLevel === "easy") {
            window.location.href = "easy.html";
        } else if (selectedLevel === "medium") {
            window.location.href = "medium.html";
        } else if (selectedLevel === "advanced") {
            window.location.href = "advanced.html";
        }
    } else {
        event.preventDefault();
        if (hasDuplicates(userColorOptions)) {
            alert("Please make sure you have selected unique colors.");
        } else {
            alert(`Please select all ${numberOfColorOptions} colors before starting the game.`);
        }
    }
});

// const button = document.querySelector("#button-box")
// const colorBox = document.querySelector(".color-box")


// const generateRandomColor = () =>{
//     const r = Math.floor(Math.random() * 256)
//     const g = Math.floor(Math.random() * 256)
//     const b = Math.floor(Math.random() * 256)


//     const rbgColor =`rgb(${r},${g},${b})` 
//     return rbgColor
// }

// const setColor = () =>{
//     const newColor = generateRandomColor()
//     colorBox.style.backgroundColor = newColor
// }

// button.addEventListener("click", setColor)



checkColors();