/*
L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.
 */

const playBtn = document.getElementById("play");
const field = document.querySelector(".field");
const numberList = [];

playBtn.addEventListener("click", init);

function init(){
  const cellsQuantity = getCellsQuantity();
  if(!cellsQuantity){
    alert("Devi selezionare una difficoltà!")
  }
  else{
    for(let i=0; i<cellsQuantity; i++){
      const cell = createCell(field);
      cell.addEventListener("click", function(){
        this.classList.add("clicked");
      })
    }
  }
}

/**
 * Crea una cella.
 * @param {HTMLDivElement} target 
 */
function createCell(target){
  const cell = document.createElement("div");
  cell.className = "cell";
  const number = getUniqueRandomNumber(1,getCellsQuantity());
  cell.innerHTML = `<span>${number}</span>`
  cell.classList.add(getCellSize());
  target.append(cell);
  return cell;
}

/**
 * Ottiene le dimensioni delle celle in base alla loro quantità.
 * @returns 
 */
function getCellSize(){
  let size;
  switch(getCellsQuantity()){
    case 100:
      size = "small";
      break;
    case 81:
      size = "medium";
      break;
    case 49:
      size = "big";
      break;
    default:
      size = "";
      break;
  }
  return size;
}

/**
 * Ottiene la quantità di celle da stampare.
 * @returns 
 */
function getCellsQuantity(){
  const diffSel = document.getElementById("difficulty").value;
  let quantity;
  switch(diffSel){
    case "1":
      quantity = 100;
      break;
    case "2":
      quantity = 81;
      break;
    case "3":
      quantity = 49;
      break;
    default:
      quantity = 0;
      break;
  }
  return quantity;
}

/**
 * Estrae un numero random diverso da quelli estratti in precedenza.
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
function getUniqueRandomNumber(min, max){
  let number = null;
  let valid = false;
  while(!valid){
    number = getRandomNumber(min, max);
    if(!numberList.includes(number)){
      valid = true;
      numberList.push(number);
    }
  }
  return number;
}

function getRandomNumber(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}