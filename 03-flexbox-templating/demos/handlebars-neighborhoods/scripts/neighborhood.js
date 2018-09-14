'use strict';

let neighborhoods = [];

// REVIEW: This is another way to use a constructor to duplicate an array of raw data objects
function Neighborhood (rawDataObject) {
  this.name = rawDataObject.name;
  this.city = rawDataObject.city;
  this.population = rawDataObject.population;
  this.founded = rawDataObject.founded;
  this.body = rawDataObject.body;
}

Neighborhood.prototype.toHtml = function() {
  // 1. Get the template from the HTML document
  const $template = $('#neighborhood-template').html();
  // console.log('template: ', $template);
  // 2. Use Handlebars to "compile" the HTML
  const $source = Handlebars.compile( $template );
  console.log('$source', $source);
  // 3. Do not forget to return the HTML from this method
  return $source(this);
};

neighborhoodDataSet.forEach(function(neighborhoodObject) {
  neighborhoods.push(new Neighborhood(neighborhoodObject));
});

neighborhoods.forEach( (city) => {
  $('#neighborhoods').append( city.toHtml() );
});
