var sharedMomentsArea = document.querySelector('#shared-moments');

let cold = document.querySelector('#cold');
let salads = document.querySelector('#salads');
let hot = document.querySelector('#hot');
let first = document.querySelector('#first');
let garnishes = document.querySelector('#garnishes');
let pots = document.querySelector('#pots');
let skillets = document.querySelector('#skillets');
let bread = document.querySelector('#bread');
let additions = document.querySelector('#additions');
let desserts = document.querySelector('#desserts');
let pizza = document.querySelector('#pizza');

function appendType (type) {
  switch(type) {
    case "cold":
      return cold;
    case "salads":
      return salads;
    case "hot":
      return hot;
    case "first":
      return first;
    case "garnishes":
      return garnishes;
    case "pots":
      return pots;
    case "skillets":
      return skillets;
    case "bread":
      return bread;
    case "additions":
      return additions;
    case "desserts":
      return desserts;
    case "pizza":
      return pizza;
    default:
      return;
  }
}

let sausage = {
  "id": "404",
  "name": "Ковбаски козацькі",
  "weight": "1 шт.",
  "price": "50₴",
  "type": "hot"
}

let breadBasket = {
  "id": "690",
  "name": "Хлібна тарілка",
  "price": "3₴",
  "type": "bread"
}


function addUniques (data) {
  let lastLineContainer = document.createElement('div');
  lastLineContainer.className = 'container';
  let cardWrapper = document.createElement('div');
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
  let cardTitleTextElement = document.createElement('h3');
  cardTitleTextElement.style.color = 'black';
  //cardTitleTextElement.className = 'mdl-card__title-text';
  cardTitleTextElement.textContent = data.name;
  cardTitleTextElement.style.textAlign = 'center';
  cardWrapper.appendChild(cardTitleTextElement);

  if(data.weight) {
    cardWrapper.appendChild(lastLineContainer);
    var cardWeight = document.createElement('div');
    cardWeight.className = 'mdl-card__supporting-text';
    cardWeight.textContent = data.weight;
    cardWeight.style.textAlign = 'left';
    cardWeight.style.color = 'black';
    cardWeight.classList.add('box');
    lastLineContainer.appendChild(cardWeight);

    let cardPrice = document.createElement('div');
    cardPrice.className = 'mdl-card__supporting-text';
    cardPrice.textContent = data.price;
    cardPrice.style.textAlign = 'right';
    cardPrice.style.color = 'black';
    cardPrice.classList.add('box');
    cardPrice.style.fontWeight = 'bold';
    lastLineContainer.appendChild(cardPrice);
  } else {
    var cardPrice = document.createElement('div');
    cardPrice.className = 'mdl-card__supporting-text';
    cardPrice.textContent = data.price;
    cardPrice.style.textAlign = 'right';
    cardPrice.style.color = 'black';
    cardPrice.style.fontWeight = 'bold';
    cardWrapper.appendChild(cardPrice);
  }

  componentHandler.upgradeElement(cardWrapper);
  let type = appendType(data.type);
  type.appendChild(cardWrapper);
}

function updateUI(data) {
  const elements = document.querySelectorAll('.main-header'); //.classList.add('shared-moment-card mdl-card mdl-shadow--2dp');
  elements.forEach(element => {
    // Add new classes using classList.add() method
    element.classList.add('shared-moment-card', 'mdl-card', 'mdl-shadow--2dp');
  });
  addUniques(breadBasket);
  for (let i = 0; i < data.length; i++){
    createCard(data[i]);
  }
  addUniques(sausage);
}

function clearDivExceptH2(divId) {
  const parentDiv = divId;
  if (!parentDiv) return; // Return if the parent div doesn't exist

  const childNodes = parentDiv.childNodes;
  const h2Node = parentDiv.querySelector('h2');

  if (h2Node) {
    // Loop through child nodes and remove all nodes that are not an h2
    for (let i = childNodes.length - 1; i >= 0; i--) {
      const node = childNodes[i];
      if (node !== h2Node && node.nodeType === Node.ELEMENT_NODE) {
        parentDiv.removeChild(node);
      }
    }
  } else {
    // If no h2 node found, clear all child nodes
    while (parentDiv.firstChild) {
      parentDiv.removeChild(parentDiv.firstChild);
    }
  }
}

function clearCards() {
  clearDivExceptH2(cold);
  clearDivExceptH2(salads);
  clearDivExceptH2(hot);
  clearDivExceptH2(first);
  clearDivExceptH2(garnishes);
  clearDivExceptH2(skillets);
  clearDivExceptH2(bread);
  clearDivExceptH2(additions);
  clearDivExceptH2(desserts);
  clearDivExceptH2(pizza);
}

// sections: cold, salads, hot, first, garnishes, pots, skillets, bread, additions, desserts, pizza
// name, description, weight, price, type

function createCard(data) {
  let lastLineContainer = document.createElement('div');
  lastLineContainer.className = 'container';
  var cardWrapper = document.createElement('div');
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
  var cardTitleTextElement = document.createElement('h3');
  cardTitleTextElement.style.color = 'black';
  //cardTitleTextElement.className = 'mdl-card__title-text';
  cardTitleTextElement.textContent = data.name;
  cardTitleTextElement.style.textAlign = 'center';
  cardWrapper.appendChild(cardTitleTextElement);

  if(data.description) {
    var cardSupportingText = document.createElement('div');
    cardSupportingText.className = 'mdl-card__supporting-text';
    cardSupportingText.textContent = data.description;
    cardSupportingText.style.color = 'black';
    //cardSupportingText.style.textAlign = 'center';
    cardWrapper.appendChild(cardSupportingText);
  }

  if(data.weight) {
    cardWrapper.appendChild(lastLineContainer);
    var cardWeight = document.createElement('div');
    cardWeight.className = 'mdl-card__supporting-text';
    cardWeight.textContent = data.weight + ' г.';
    cardWeight.classList.add('box');
    cardWeight.style.textAlign = 'left';
    cardWeight.style.color = 'black';
    lastLineContainer.appendChild(cardWeight);

    let cardPrice = document.createElement('div');
    cardPrice.className = 'mdl-card__supporting-text';
    cardPrice.classList.add('box');
    cardPrice.textContent = data.price + '₴';
    cardPrice.style.textAlign = 'right';
    cardPrice.style.color = 'black';
    cardPrice.style.fontWeight = 'bold';
    lastLineContainer.appendChild(cardPrice);
  } else {
    var cardPrice = document.createElement('div');
    cardPrice.className = 'mdl-card__supporting-text';
    cardPrice.textContent = data.price + '₴';
    cardPrice.style.textAlign = 'right';
    cardPrice.style.color = 'black';
    cardPrice.style.fontWeight = 'bold';
    cardWrapper.appendChild(cardPrice);
  }

  componentHandler.upgradeElement(cardWrapper);
  let type = appendType(data.type);
  type.appendChild(cardWrapper);
}

var networkDataReceived = false;

fetch('https://hostinnijdvirmenu-default-rtdb.europe-west1.firebasedatabase.app/menu.json')
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      networkDataReceived = true;
      console.log('From web', data);
      let dataArray = [];
      for (let key in data){
        dataArray.push(data[key]);
      }
      clearCards();
      updateUI(dataArray);
    });

if('indexedDB' in window) {
  readAllData('menu')
      .then((data) => {
        if(!networkDataReceived) {
          console.log('From cache', data);
          updateUI(data);
        }
      })
}
