'use strict';

// const $firstParagraph = $('main').text('jQuery is great!');
// console.log($firstParagraph);

// with JavaScript:
// 1. access the element
// 2. give it content
// 3. append it to the DOM

$('#list').append('<li>301 is awesome!</li>');
$('#list').append('<li>301 is awesome!</li>');
$('#list').append('<li>301 is awesome!</li>');
$('#list').append('<li>301 is awesome!</li>');
$('#list').append('<li>301 is awesome!</li>');

$(document).ready(function() {
  alert('The DOM is ready!');
})

$(function() {
  alert('The DOM is ready!');
})

$(() => alert('The DOM is ready!'));
