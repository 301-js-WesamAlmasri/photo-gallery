'use strict';

let allHorns = [];

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
    renderAllData(data);
  });
}

function renderAllData(data) {
  data.forEach(item => {
    let newHorn = new Horn(item.image_url, item.title, item.description, item.horns);
    newHorn.render();
  });
}

function init() {
  getRenderData('./data/page-1.json');
}

init();
