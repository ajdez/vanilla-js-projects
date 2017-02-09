// Flicker api KEY
  // ec0da2e22f4d2877819ce7df536961e3

//flicker api url
  //   https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=YOUR_API_KEY&text=THE_SEARCH_TEXT
  // https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=ec0da2e22f4d2877819ce7df536961e3&text=dogs


var FLICKR_API = `ec0da2e22f4d2877819ce7df536961e3`;
var FLICKR_URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=`;




function getPhotosForSearch(search){
  var url = `${FLICKR_URL}${FLICKR_API}&text=${search}`;

  return(
    fetch(url)
    .then(response=>response.json())
    .then(data=> data.photos.photo)
  )
}


function createFlickrThumb(photos) {
    var link = document.createElement('a');
    link.setAttribute('href', photos.large);
    link.setAttribute('target', '_blank');

    var image = document.createElement('img');
    image.setAttribute('src', photos.thumb);
    image.setAttribute('alt', photos.title);

    link.appendChild(image);

    return link;
}



var app = document.querySelector('#app');
var form = document.querySelector(".search-form");
var input = document.querySelector(".search-input");
var button = document.querySelector(".search-button");
var gallery = document.querySelector(".photo-gallery")


form.addEventListener("submit", function(e){
  var searchResult = input.value;
  e.preventDefault();


  getPhotosForSearch(searchResult)
  .then(function(photo){
    photo.forEach(function(p){
      var url = `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg`;
      var thumbnail = `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}_q.jpg`;

      var item = createFlickrThumb({
        thumb: thumbnail,
        large: url,
        title: p.title
      })
      gallery.appendChild(item);
    })
  })

})
