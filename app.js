const addAreaBtn = document.querySelector('.add-area');
const measurementsBody = document.querySelector('.measurements');
const widths = document.querySelectorAll('.width-measurement');
const calcBtn = document.querySelector('.calc-btn');

// Add new area
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

calcBtn.onclick = () => {
  const lengths = document.querySelectorAll('input.length-measurement');
  let lengthArr = [];
  lengths.forEach(length => {
    const lengthStr = length.value;
    const lengthInt = parseInt(lengthStr, 10);
    lengthArr.push(lengthInt);
  });

  let widths = document.querySelectorAll('input.width-measurement');
  let widthArr = [];
  widths.forEach(width => {
    const widthStr = width.value;
    const widthInt = parseInt(widthStr, 10);
    widthArr.push(widthInt);
  });

  let lengthSum = 0;
  for (let i = 0; i < lengthArr.length; i++) {
    lengthSum += lengthArr[i];
  }

  let widthSum = 0;
  for (let i = 0; i < widthArr.length; i++) {
    widthSum += widthArr[i];
  }

  const totalSum = lengthSum * widthSum;
  console.log(totalSum);
};
