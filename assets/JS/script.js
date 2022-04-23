/*
**Consegna**
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
****L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
**BONUS:**
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
****2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
 */

const playBtn = document.getElementById("play");
const field = document.querySelector("main");
const BOMBS_QUANTITY = 16;
let bombList, counter;

playBtn.addEventListener("click", init);

/**
 * Istruzioni eseguite al click del pulsante "Gioca".
 */
function init(){
  const cellsQuantity = getCellsQuantity();
  if(!cellsQuantity){
    alert("Devi selezionare una difficoltà!")
  }
  else{
    reset();
    bombList = createBombsList(cellsQuantity);
    console.log("Vieni a cercare le soluzioni qui? Sei un furbone!");
    console.log("Ecco a te la lista delle bombe. ;)"bombList);
    createField(cellsQuantity, field);
  }
}

/**
 * Reset della griglia e dell'array di getUniqueRandomNumber.
 */
function reset(){
  field.innerHTML = "";
  playBtn.innerHTML = "Nuova partita";
  counter = 0;
  console.clear();
}

/**
 * Creazione lista delle bombe.
 * @param {Number} cellsQuantity 
 * @returns 
 */
function createBombsList(cellsQuantity){
  const bombList = [];
  while(bombList.length<BOMBS_QUANTITY){
    const bomb = getRandomNumber(1, cellsQuantity)
    if(!bombList.includes(bomb)){
      bombList.push(bomb);
    }
  }
  return bombList;
}

/**
 * Crea il campo di gioco.
 * @param {Number} cellsQuantity 
 * @param {HTMLDivElement} field 
 */
function createField(cellsQuantity, field){
  const grid = document.createElement("div");
  grid.className = "field";
  grid.classList.add("d-flex", "justify-content-between", "align-content-between", "flex-wrap", "mb-4")
  for(let i=1; i<=cellsQuantity; i++){
    const cell = createCell(grid, i);
    cell.addEventListener("click", cellClickHandler);
  }
  field.append(grid);
}

/**
 * Crea una cella.
 * @param {HTMLDivElement} target
 * @param {Number} number 
 * @returns 
 */
function createCell(target, number){
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.classList.add("unclicked");
  cell.innerHTML = `<span>${number}</span>`
  cell.classList.add(getCellSize());
  if(bombList.includes(number)) cell.classList.add("bomb");
  target.append(cell);
  return cell;
}

/**
 * Gestione click delle celle.
 */
function cellClickHandler(){
  this.classList.add("clicked");
  this.classList.remove("unclicked");
  if(this.classList.contains("bomb")){
    stopGame(false, `Hai perso! [${counter}/${getCellsQuantity()-BOMBS_QUANTITY}]`);
  }
  else{
    counter++;
    if(counter === (getCellsQuantity()-BOMBS_QUANTITY)){
      stopGame(true, "Vittoria! :D");
    }
  }
}

/**
 * Gestione pagina dopo la conclusione della partita.
 * @param {Boolean} victory
 * @param {String} outputMsg 
 */
function stopGame(victory, outputMsg){
  const grid = document.querySelectorAll(".cell");
  const output = document.createElement("h2");
  output.innerHTML = outputMsg;
  for(let i=0; i<grid.length; i++){
    grid[i].removeEventListener("click", cellClickHandler);
    grid[i].classList.add("disabled");
    grid[i].classList.remove("unclicked");
    if(grid[i].classList.contains("bomb") && !victory){
      grid[i].classList.add("clicked");
    }
  }
  field.append(output);
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
 * Ottiene un numero intero random compreso tra min e max.
 * @param {Number} min 
 * @param {Number} max 
 * @returns 
 */
function getRandomNumber(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}