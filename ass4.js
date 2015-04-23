
var gistPulls = null;
var localGists = null;
var localFavorites = null;

var favoriteGists = null;

window.onload = function()
{
  console.log('window onload successful');
}

function pullGithub()
{
  console.log("Human,  start of program");
  var httpRequest;

    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
      httpRequest = new XMLHttpRequest();
    }
    else
    {
      console.log('could not creat ajax for modern browser');
    }

    if (!httpRequest) 
    {
      console.log('Error assigning httpRequest to Ajax object');
    }

    var testURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Salem%2COr&mode=json&units=imperial&cnt=7';
    var staticGitURL = 'https://api.github.com/users/koraktor/gists';
    
    //Sloppy way of requesting multiple pages
    var gitURL = 'https://api.github.com/gists'
    var gitURL2 = 'https://api.github.com/gists?page=2'
    var gitURL3 = 'https://api.github.com/gists?page=3'
    var gitURL4 = 'https://api.github.com/gists?page=4'
    var gitURL5 = 'https://api.github.com/gists?page=5'

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', gitURL);
    httpRequest.send();
    saveGists();
    // httpRequest.onreadystatechange = alertContents;
    // httpRequest.open('GET', gitURL);
    // saveGists()
    // httpRequest.send();

//   }

  function alertContents() 
  {
    if (httpRequest.readyState === 4) 
    {
      if (httpRequest.status === 200) 
      {
        console.log('Connected to github!');
        gistPulls = JSON.parse(this.responseText);
        console.log('Successfully pulled in data');
      } else 
      {
        alert('There was a problem with the request.');
      }
    }
  }

}

 function saveGists()
  {
    localStorage.setItem('savedGists', JSON.stringify(gistPulls));
    console.log('Saved to gists to local!');
  }


  function printLanguage()
  {


 
    console.log(gistPulls.length);
    for (var i = 0; i < gistPulls.length; i++)
    {
 
      console.log(gistPulls[i].url);
    
    }
  }

function dlEntry(term, definition) 
{
  var dt = document.createElement('dt');
  var dd = document.createElement('dd');

  dt.innerText = term;
  dd.innerText = definition;
  return {'dt':dt, 'dd':dd};
}
//index for the gistPulls because I'm not sure how to keep track of items in array
var index = 0;

function liGists(gists)
  {
    var dl = document.createElement('dl');
    var entry = dlEntry('URL', gistPulls[index].url);
    dl.appendChild(entry.dt);
    dl.appendChild(entry.dd);
    var entry = dlEntry('Description', gistPulls[index].description);
    dl.appendChild(entry.dt);
    dl.appendChild(entry.dd);
    
    return dl;
  }

function createGistsList(ul)
  {
    index = 0;

    gistPulls.forEach(function(s) 
    {
      var favorite = document.createElement("button");
      favorite.setAttribute('id', index); 
      favorite.setAttribute("value", index)
      favorite.setAttribute("onclick", 'saveToFavorites(this)');
      var li = document.createElement('li');
      li.appendChild(liGists(s));
      li.appendChild(favorite);
      favorite.innerHTML = favorite.innerHTML + 'Add to favorites';
      ul.appendChild(li);

      index++;

    });


  }

function displayGists()
{
  document.getElementById('gistsList').innerHTML = "";
  if (gistPulls == null)
  {
    gistPulls = {'gists':[]};
    console.log('success!');
  }

  createGistsList(document.getElementById('gistsList'));
}

function test()
{
  console.log('great success!');
  console.log(document.getElementById('displayPages').value)
}

function saveToFavorites(what)
{
  favoriteGists.push(what.value);
  localStorage.setItem('favoriteGists', JSON.stringify(favoriteGists));
}

function printFavorites()
{

  document.getElementById('gistsList').innerHTML = "";
  
  for (var i = 0; i < favoriteGists.length; i++)
  {

    console.log(favoriteGists[i]);
  }


  if (gistPulls == null)
  {
    gistPulls = {'gists':[]};
    console.log('success!');
  }

  favoritesCreateGistsList(document.getElementById('gistsList'));
  
}

window.onload = function(){
  localGists = localStorage.getItem('savedGists');
  if (gistPulls == null)
    {
      console.log('gistPulls is null, pulling from local');
      gistPulls = JSON.parse(localGists);
    }

  localFavorites = localStorage.getItem('favoriteGists');
  if (favoriteGists == null)
  {
    console.log('favorites gists is null pulling from local');
    favoriteGists = JSON.parse(localFavorites);
  }


}

function favoritesDlEntry(term, definition) 
{
  var dt = document.createElement('dt');
  var dd = document.createElement('dd');

  dt.innerText = term;
  dd.innerText = definition;
  return {'dt':dt, 'dd':dd};
}
//index for the gistPulls because I'm not sure how to keep track of items in array
var index = 0;

function favoritesLiGists(gists)
  {
    var dl = document.createElement('dl');
    var entry = dlEntry('URL', gistPulls[favoriteGists[index]].url);
    dl.appendChild(entry.dt);
    dl.appendChild(entry.dd);
    var entry = dlEntry('Description', gistPulls[favoriteGists[index]].description);
    dl.appendChild(entry.dt);
    dl.appendChild(entry.dd);
    
    return dl;
  }

function favoritesCreateGistsList(ul)
  {
    index = 0;

    for (var i = 0; i < favoriteGists.length; i++)
    {
      var li = document.createElement('li');
      li.appendChild(favoritesLiGists(favoriteGists[i]));
      ul.appendChild(li);

      index++;
    };


  }