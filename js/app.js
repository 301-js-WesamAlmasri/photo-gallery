'use strict';

let allHorns = [];
let keywords = ['default'];

const Horn = function (image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  allHorns.push(this);
};

Horn.prototype.render = function () {
  $('main').append(`
    <article class="photo-template">
        <h2>${this.title}</h2>
        <img src="${this.image_url}" alt="${this.title}" />
        <p>${this.description}</p>
    </article>
  `);
}


function getRenderData(url) {
  $.ajax(url).then(data => {
    data.forEach(item => {
      new Horn(item.image_url, item.title, item.description, item.keyword, item.horns);
      appendToKeywordList(item.keyword);
    });
    renderAllData('default');
  });
}

function renderAllData(keyword) {
  allHorns.forEach(item => {
    if(item.keyword === keyword || keyword === 'default') item.render();
  });
  renderKeywordList();
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

function handleChange(event) {
  let selectedKeyword = event.target.value;
  $('main').empty();
  renderAllData(selectedKeyword);
}

function init() {
  getRenderData('./data/page-1.json');
  $('#keyword-filter').on('change', handleChange);
}

init();
