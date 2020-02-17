// Global Variables
const addAreaBtn = document.querySelector('.add-area');
const measurementsBody = document.querySelector('.measurements');
const widths = document.querySelectorAll('.width-measurement');
const calcBtn = document.querySelector('.calc-btn');
const areaDisplay = document.querySelector('.display-area');
const dropdown = document.querySelector('.material-dropdown');
const materialType = document.querySelector('.material-type-value');
const materialAmount = document.querySelector('.material-amount-value');
const boxSize = document.querySelector('.box-sizing-active');
const roomsWrapper = document.querySelector('.rooms-wrapper');
let materialSelected;
let comesBoxed;
let boxSizeNum;
areaDisplay.innerHTML = '0';

const materialDropdown = () => {
  return dropdown.options[dropdown.selectedIndex].value;
};

dropdown.onchange = () => {
  materialSelected = materialDropdown();

  if (materialSelected === 'carpet') {
    comesBoxed = false;
    boxSize.style.visibility = 'hidden';
  } else if (materialSelected === 'linoleum') {
    comesBoxed = false;
    boxSize.style.visibility = 'hidden';
  } else {
    comesBoxed = true;
    boxSize.style.visibility = 'initial';
  }
};

if (document.querySelector('#size-value-16').checked) {
  boxSizeNum = 16;
} else if (document.querySelector('#size-value-20').checked) {
  boxSizeNum = 20;
} else if (document.querySelector('#size-value-24').checked) {
  boxSizeNum = 24;
}

const materials = {
  carpet: {
    type: 'Carpet',
    calc: (sqft, rollWidth = 12) => {
      return sqft / rollWidth;
    }
  },
  hardwood: {
    type: 'Engineered Hardwood',
    calc: (sqft, boxft = boxSizeNum) => {
      return sqft / boxft;
    }
  },
  lvp: {
    type: 'Luxury Vinyl Plank',
    calc: (sqft, boxft = boxSizeNum) => {
      return sqft / boxft;
    }
  },
  laminate: {
    type: 'Laminate',
    calc: (sqft, boxft = boxSizeNum) => {
      return sqft / boxft;
    }
  },
  linoleum: {
    type: 'Sheet Vinyl',
    calc: (sqft, rollWidth = 12) => {
      return sqft / rollWidth;
    }
  }
};

// Add New Area button
addAreaBtn.onclick = () => {
  let delButton = document.createElement('button');
  delButton.classList.add('delButton');
  delButton.innerText = 'X';

  let newRoom = document.createElement('li');
  newRoom.classList.add('new-area');
  let roomLength = document.createElement('input');
  roomLength.type = 'text';
  roomLength.classList.add('length-input');
  let lengthLabel = document.createElement('span');
  lengthLabel.innerHTML = 'Length';
  let lengthWrapper = document.createElement('div');
  lengthWrapper.classList.add('length-measurement');
  lengthWrapper.appendChild(roomLength);
  lengthWrapper.appendChild(lengthLabel);

  let roomWidth = document.createElement('input');
  roomWidth.type = 'text';
  roomWidth.classList.add('width-input');
  let widthLabel = document.createElement('span');
  widthLabel.innerHTML = 'Width';
  let widthWrapper = document.createElement('div');
  widthWrapper.classList.add('width-measurement');
  widthWrapper.appendChild(roomWidth);
  widthWrapper.appendChild(widthLabel);

  newRoom.appendChild(delButton);
  newRoom.appendChild(lengthWrapper);
  newRoom.appendChild(widthWrapper);
  roomsWrapper.appendChild(newRoom);

  delButton.addEventListener('click', function() {
    delButton.parentElement.remove();
  });
};

// Calculate button
calcBtn.onclick = () => {
  const lengths = document.querySelectorAll('input.length-input');
  let lengthArr = [];
  let lengthEmpty;
  lengths.forEach(length => {
    let lengthStr = length.value;
    if (!lengthStr) {
      lengthEmpty = true;
    } else {
      const lengthInt = parseInt(lengthStr, 10);
      lengthArr.push(lengthInt);
    }
  });

  let widths = document.querySelectorAll('input.width-input');
  let widthArr = [];
  let widthEmpty;
  widths.forEach(width => {
    const widthStr = width.value;
    if (!widthStr) {
      widthEmpty = true;
    }
    const widthInt = parseInt(widthStr, 10);
    widthArr.push(widthInt);
  });

  let totalSum = 0;
  let areaSum;
  for (let i = 0; i < lengthArr.length; i++) {
    if (lengthArr.length === widthArr.length) {
      areaSum = lengthArr[i] * widthArr[i];
      totalSum += areaSum;
    }
  }

  // Display total area in card
  if (lengthEmpty || widthEmpty === true) {
    areaDisplay.innerHTML = `
    <p class="error">Missing Value!</p>
    <p class="error">Please enter a value.</p>
    `;
  } else {
    areaDisplay.innerHTML = totalSum;
  }

  const radioBtn = [...document.querySelectorAll('input[type="radio"]')];

  for (let i = 0; i < radioBtn.length; i++) {
    if (radioBtn[i].checked) {
      boxSizeNum = radioBtn[i].value;
    }
  }

  for (const property in materials) {
    if (property === materialSelected) {
      materialType.innerHTML = materials[property].type;
      materialAmount.innerHTML = materials[property].calc(totalSum).toFixed(1);
    }
  }

  if (materialSelected !== 'carpet' && materialSelected !== 'linoleum') {
    if (boxSizeNum === undefined || boxSizeNum === '') {
      materialAmount.innerHTML = 'Please Select a Box Size';
    }
  }
};
