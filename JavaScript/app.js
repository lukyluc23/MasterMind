

const guardarNombre = () => {
    let name = document.getElementById("nombre").value;
    sessionStorage.setItem("name", name);
    if (name == "") {
      sessionStorage.setItem("name", "Jugador 1");
    } else {
      sessionStorage.setItem("name", name);
    }
  }
  let name = sessionStorage.getItem("nombre")




  let combinationColors = ["","","",""]

document.querySelectorAll('.colorpicker').forEach(colorPicker => {
    colorPicker.addEventListener('input', () => {
        let squareId = colorPicker.id.replace('B', 'squareB');
        document.getElementById(squareId).style.backgroundColor = colorPicker.value;
        console.log("hola");
        if (colorPicker.id==="B1") {
            combinationColors[0] = colorPicker.value;
        }
        if (colorPicker.id==="B2") {
            combinationColors[1] = colorPicker.value;
        }
        if (colorPicker.id==="B3") {
            combinationColors[2] = colorPicker.value;
        }
        if (colorPicker.id==="B4") {
            combinationColors[3] = colorPicker.value;
        }
       

        sessionStorage.setItem('currentColor', JSON.stringify(combinationColors));
    });
});




// const button = document.querySelector("#button-box")
// const colorNumber = document.querySelector(".color-number")
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

