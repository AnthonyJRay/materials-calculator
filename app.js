// Global Variables
const addAreaBtn = document.querySelector('.add-area');
const measurementsBody = document.querySelector('.measurements');
const widths = document.querySelectorAll('.width-measurement');
const calcBtn = document.querySelector('.calc-btn');
const areaDisplay = document.querySelector('.display-area');
const dropdown = document.querySelector('.material-dropdown');
const materialType = document.querySelector('.material-type-value');
const materialAmount = document.querySelector('.material-amount-value');
areaDisplay.innerHTML = '0';

let materialSelected;

// let selectedMaterial = (dropdown.onchange = () => {
//   return dropdown.options[dropdown.selectedIndex].value;
//   // console.log(selectedMaterial);
// });

const materialDropdown = () => {
  return dropdown.options[dropdown.selectedIndex].value;
};

// const materialSelected = (dropdown.onchange = () => {
//   materialDropdown();
//   console.log(materialDropdown());
// });

dropdown.onchange = () => {
  materialSelected = materialDropdown();
  // console.log(materialSelected);
};

// console.log(materialSelected);

const materials = {
  carpet: {
    type: 'Carpet',
    calc: (sqft, rollWidth = 12) => {
      return sqft / rollWidth;
    }
  },
  hardwood: {
    type: 'Engineered Hardwood',
    calc: (sqft, boxft) => {
      return sqft / boxft;
    }
  },
  lvp: {
    type: 'Luxury Vinyl Plank',
    calc: (sqft, boxft) => {
      return sqft / boxft;
    }
  },
  laminate: {
    type: 'Laminate',
    calc: (sqft, boxft) => {
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
  let newArea = document.createElement('div');
  newArea.classList.add('newArea');

  let lengthWrapper = document.createElement('div');
  lengthWrapper.classList.add('lengthWrapper');
  let lengthLabel = document.createElement('p');
  lengthLabel.classList.add('innerLabel');
  lengthLabel.innerHTML = 'Length';
  let areaLength = document.createElement('input');
  areaLength.type = 'text';
  areaLength.classList.add('length-measurement');

  let widthWrapper = document.createElement('div');
  widthWrapper.classList.add('widthWrapper');
  let widthLabel = document.createElement('p');
  widthLabel.classList.add('innerLabel');
  widthLabel.innerHTML = 'Width';
  let areaWidth = document.createElement('input');
  areaWidth.type = 'text';
  areaWidth.classList.add('width-measurement');

  lengthWrapper.appendChild(lengthLabel);
  lengthWrapper.appendChild(areaLength);
  widthWrapper.appendChild(widthLabel);
  widthWrapper.appendChild(areaWidth);

  newArea.appendChild(lengthWrapper);
  newArea.appendChild(widthWrapper);
  measurementsBody.appendChild(newArea);
};

// Calculate button
calcBtn.onclick = () => {
  const lengths = document.querySelectorAll('input.length-measurement');
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

  let widths = document.querySelectorAll('input.width-measurement');
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

  for (const property in materials) {
    if (property === materialSelected) {
      console.log(materials[property].type);
      materialType.innerHTML = materials[property].type;
      materialAmount.innerHTML = materials[property].calc(totalSum);
    }
  }
};
