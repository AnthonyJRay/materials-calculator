const addAreaBtn = document.querySelector('.add-area');
const measurementsBody = document.querySelector('.measurements');

addAreaBtn.onclick = () => {
  let newArea = document.createElement('div');
  newArea.classList.add('newArea');

  let lengthLabel = document.createElement('p');
  lengthLabel.classList.add('innerLabel');
  lengthLabel.innerHTML = 'Length';
  let areaLength = document.createElement('input');
  areaLength.type = 'text';
  areaLength.classList.add('measurement');

  let widthLabel = document.createElement('p');
  widthLabel.classList.add('innerLabel');
  widthLabel.innerHTML = 'Width';
  let areaWidth = document.createElement('input');
  areaWidth.type = 'text';
  areaWidth.classList.add('measurement');

  newArea.appendChild(lengthLabel);
  newArea.appendChild(areaLength);
  newArea.appendChild(widthLabel);
  newArea.appendChild(areaWidth);
  measurementsBody.appendChild(newArea);
};
