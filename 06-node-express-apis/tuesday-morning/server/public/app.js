'use strict';

$('#name-form').on('submit', requestName);

$('#color-form').on('submit', requestColor);

function requestName(event) {
  event.preventDefault();

  let userName = $('#name-input').val();
  console.log(`The user's name is ${userName}`);

  $.ajax({
    url: '/name',
    method: 'GET',
    data: {name: userName}
  })
    .then(responseFromServer => {
      console.log(responseFromServer);
      alert(`The server says ${responseFromServer}!`)
    })
    .catch(errorMessage => console.error(errorMessage));
}

function requestColor(event) {
  event.preventDefault();

  let userColor = $('#color-input').val();
  console.log(`The user's favorite color is is ${userColor}`);

  $.ajax({
    url: '/color',
    method: 'GET',
    data: {color: userColor}
  })
    .then(responseFromServer => {
      console.log(responseFromServer);
      alert(`The server says ${responseFromServer}!`)
    })
    .catch(errorMessage => console.error(errorMessage));
}
