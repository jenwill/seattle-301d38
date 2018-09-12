'use strict';

function Horn(HornObject) {
  this.title = HornObject.title;
  this.image_url = HornObject.image_url;
  this.horns = HornObject.horns;
}

Horn.allHorns = [];

Horn.prototype.render = function () {
  // accessing our template from the HTML
  // making a copy of the template
  // make a new section
  $('main').append('<section class="clone"></section>');
  const $HornClone = $('section[class="clone"]');

  // get the html of the template
  const $HornHtml = $('#photo-template').html();

  // set the section's html === template html
  $HornClone.html($HornHtml);

  // fill in the properties from each instance
  $HornClone.find('h2').text(this.title);
  $HornClone.find('img').attr('src', this.image_url);
  $HornClone.find('p').text(this.horns);
  $HornClone.removeClass('clone');
  $HornClone.addClass(this.title);
}

Horn.readJson = () => {
  $.get('page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        Horn.allHorns.push( new Horn(item) );
      })
    })
    .then(Horn.loadHorns)
}

Horn.loadHorns = () => {
  Horn.allHorns.forEach(Horn => Horn.render());
}

$(() => Horn.readJson());
