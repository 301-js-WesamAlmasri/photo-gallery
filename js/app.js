'use strict';

let allHorns = [];
let keywords = [];

const Horn = function (image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  allHorns.push(this);
};

Horn.prototype.render = function () {
  $('body > .photo-template').show();
  const template = $('body > .photo-template').clone();
  $('body > .photo-template').hide();
  template.find('h2').text(this.title);
  template.find('img').attr('src', this.image_url);
  template.find('img').attr('alt', this.title);
  template.find('p').text(this.description);
  $('main').append(template);
}


function getRenderData(url) {
  $.ajax(url).then(data => {
    data.forEach(item => {
      new Horn(item.image_url, item.title, item.description, item.keyword, item.horns);
      appendToKeywordList(item.keyword);
    });
    renderAllData('default', 'title');
    renderKeywordList();
  });
}

function renderAllData(keyword, sortBy) {
  allHorns.sort((a,b) => sortFunc(a, b, sortBy)).forEach(item => {
    if(item.keyword === keyword || keyword === 'default') item.render();
  });
}

function sortFunc(a, b, sortBy) {
  if(a[sortBy] < b[sortBy]) return -1;
  if(a[sortBy] > b[sortBy]) return 1;
  return 0;
}

function appendToKeywordList(keyword) {
  if(!keywords.includes(keyword)){
    keywords.push(keyword);
  }
}

function renderKeywordList() {
  keywords.forEach(item => {
    $('#keyword-filter').append(`<option value="${item}">${item}</option>`);
  });
}

function handleChange() {
  $('main').empty();
  renderAllData($('#keyword-filter').val(), $('#sortby').val());
}

function init() {
  getRenderData('./data/page-1.json');
  $('#keyword-filter').on('change', handleChange);
  $('#sortby').on('change', handleChange);
}

init();
