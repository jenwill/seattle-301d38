'use strict';

function Dog(dogObject) {
  this.name = dogObject.name;
  this.image_url = dogObject.image_url;
  this.hobbies = dogObject.hobbies;
}

Dog.allDogs = [];

Dog.prototype.render = function() {
  // 1. Get the HTML from the template
  const $source = $('#dog-template').html();

  // 2. Compile the source with Handlebars
  const compiledSource = Handlebars.compile( $source );

  // 3. Return the HTML from the compile method
  return compiledSource(this);
}

Dog.readJson = () => {
  $.get('data.json', 'json')
    .then(data => {
      data.forEach(dog => {
        Dog.allDogs.push( new Dog(dog) );
      })
    })
    .then( Dog.loadDogs )
}

Dog.loadDogs = () => {
  Dog.allDogs.forEach(dog => $('#dogs').append( dog.render() ));
}

$(() => Dog.readJson());
