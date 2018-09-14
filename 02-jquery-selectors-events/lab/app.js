'use strict';

function Horn(HornObject) {
  this.title = HornObject.title;
  this.image_url = HornObject.image_url;
  this.horns = HornObject.horns;
  this.description = HornObject.description;
  this.keyword = HornObject.keyword;
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
  $HornClone.find('p').text(this.horns);
  $HornClone.removeClass('clone');
  $HornClone.addClass(this.title);
  $HornClone.html($('#photo-template').html())
  $HornClone.find('h2').text(this.title);
  $HornClone.find('img').attr('src', this.image_url);
  $HornClone.find('p').text(this.description);
  $HornClone.attr('class', this.keyword);
}

Horn.readJson = () => {
  $.get('page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        Horn.allHorns.push(new Horn(item));
      })
      Horn.sortBy(Horn.allHorns, 'title');
    })
    .then(Horn.loadHorns)
    .then(Horn.populateFilter)
    .then(Horn.handleFilter)
    .then(Horn.handleSort)
}

// Image.readJson = () => {
//   $.get('../data/page-1.json')
//     .then(data => {

//       data.forEach(item => {
//         Image.all.push(new Image(item));
//       })

//       Image.sortBy(Image.all, 'title');

//       Horn.allHorns.forEach(image => {
//         $('main').append(image.render());
//       })

//     }, 'json')
//     .then(Image.populateFilter)
//     .then(Image.handleFilter)
//     .then(Image.handleSort);
// }

Horn.loadHorns = () => {
  Horn.allHorns.forEach(Horn => Horn.render());
}

Horn.sortBy = (array, property) => {
  array.sort((a, b) => {
    let firstComparison = a[property];
    let secondComparison = b[property];
    return (firstComparison > secondComparison) ? 1 : (firstComparison < secondComparison) ? -1 : 0;
  });
}

Horn.handleSort = () => {
  $('input').on('change', function () {
    $('select').val('default');
    $('div').remove()
    Horn.sortBy(Horn.allHorns, $(this).attr('id'))
    Horn.allHorns.forEach(Horn => {
      $('main').append(Horn.render());
    })
  })
}

Horn.populateFilter = () => {
  let filterKeywords = [];
  $('option').not(':first').remove();

  Horn.allHorns.forEach(Horn => {
    if (!filterKeywords.includes(Horn.keyword)) filterKeywords.push(Horn.keyword);
  })

  filterKeywords.sort();

  filterKeywords.forEach(keyword => {
    let optionTag = `<option value="${keyword}">${keyword}</option>`;
    $('select').append(optionTag);
  })
}

Horn.handleFilter = () => {
  $('select').on('change', function () {
    let selected = $(this).val();
    if (selected !== 'Filter By Keyword') {
      $('div').hide();

      Horn.allHorns.forEach(image => {
        if (selected === image.keyword) {

          $(`div[class="${selected}"`).addClass('filtered').fadeIn();
        }
      })

      $(`option[value=${selected}]`).fadeIn();
    }
  })
}

$(() => Horn.readJson());
