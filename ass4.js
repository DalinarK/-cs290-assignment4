

var localGists = null;
var localFavorites = null;
var localFilters = null;

//where all the GISTS are stored
var gistPulls = null;
//Array that holds the index of favorited GISTS in gistPulls
var favoriteGists = new Array();
//Array that holds the index of filtered GISTS
var filteredGists = new Array();

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
    var alreadyFavorited = 0;

    gistPulls.forEach(function(s) 
    {
      alreadyFavorited = 0;

      for (var counter = 0; counter < favoriteGists.length; counter++)
      {
        if (favoriteGists[counter] == index)
        {
          alreadyFavorited = 1
        }
      }

      if (!alreadyFavorited)
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
      }
      index++;

    });


  }

function displayGists()
{

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





//favorite Gist functions area

function saveToFavorites(what)
{


  favoriteGists.push(what.value);
  localStorage.setItem('favoriteGists', JSON.stringify(favoriteGists));
  printFavorites();
}

function deleteFavorite(what)
{
  console.log(favoriteGists[0]);
  favoriteGists.splice(what.value,1);
  localStorage.setItem('favoriteGists', JSON.stringify(favoriteGists));
  console.log('great succes');
  printFavorites();
}

function printFavorites()
{

  document.getElementById('insertFavorites').innerHTML = "";
  
  for (var i = 0; i < favoriteGists.length; i++)
  {

    console.log(favoriteGists[i]);
  }


  if (gistPulls == null)
  {
    gistPulls = {'gists':[]};
    console.log('success!');
  }

  favoritesCreateGistsList(document.getElementById('insertFavorites'));
  
}

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
      var favorite = document.createElement("button");
      favorite.setAttribute('name', i); 
      favorite.setAttribute("value", i)
      favorite.setAttribute("onclick", 'deleteFavorite(this)');
      var li = document.createElement('li');
      li.appendChild(favoritesLiGists(favoriteGists[i]));
      li.appendChild(favorite);
      favorite.innerHTML = favorite.innerHTML + 'Delete Favorite';
      ul.appendChild(li);

      index++;
    };
  }



  // Search Area
//Got this code from the instructor https://piazza.com/class/i7nxjgezs1b2wt?cid=180
function searchPython()
{
  filteredGists.length = 0;

  for(var i = 0 ; i < gistPulls.length; i++) 
  {
  //Rest of your code
    for (var property in gistPulls[i].files) 
    {
      if (gistPulls[i].files.hasOwnProperty(property)) 
      {
        if(gistPulls[i].files[property].language == 'Python')
        {
          filteredGists.push(i);
          console.log(filteredGists.length);
          console.log('Great Success!');

        }
      }
    }   
  }
   filteredCreateGistsList(document.getElementById('gistsList'));
}


function searchJSON()
{

  filteredGists.length = 0;

  for(var i = 0 ; i < gistPulls.length; i++) 
  {
  //Rest of your code
    for (var property in gistPulls[i].files) 
    {
      if (gistPulls[i].files.hasOwnProperty(property)) 
      {
        if(gistPulls[i].files[property].language == 'JSON')
        {        
          filteredGists.push(i);
          console.log(filteredGists.length);
          console.log('Great Success!');
        }
      }
    }   

  }
  filteredCreateGistsList(document.getElementById('gistsList'));
}



function searchJavaScript()
{

  filteredGists.length = 0;

  for(var i = 0 ; i < gistPulls.length; i++) 
  {
  //Rest of your code
    for (var property in gistPulls[i].files) 
    {
      if (gistPulls[i].files.hasOwnProperty(property)) 
      {
        if(gistPulls[i].files[property].language == 'JavaScript')
        {        
          filteredGists.push(i);
          console.log(filteredGists.length);
          console.log('Great Success!');
        }
      }
    }   

  }
  filteredCreateGistsList(document.getElementById('gistsList'));
}

function searchSQL()
{

  filteredGists.length = 0;

  for(var i = 0 ; i < gistPulls.length; i++) 
  {
  //Rest of your code
    for (var property in gistPulls[i].files) 
    {
      if (gistPulls[i].files.hasOwnProperty(property)) 
      {
        if(gistPulls[i].files[property].language == 'SQL')
        {        
          filteredGists.push(i);
          console.log(filteredGists.length);
          console.log('Great Success!');
        }
      }
    }   

  }
  filteredCreateGistsList(document.getElementById('gistsList'));
}




function filteredLiGists(gists)
{
  var dl = document.createElement('dl');
  var entry = dlEntry('URL', gistPulls[filteredGists[index]].url);
  dl.appendChild(entry.dt);
  dl.appendChild(entry.dd);
  var entry = dlEntry('Description', gistPulls[filteredGists[index]].description);
  dl.appendChild(entry.dt);
  dl.appendChild(entry.dd);
  
  return dl;
}


function filteredCreateGistsList(ul)
{

  index = 0;
  var alreadyFavorited = 0;

  console.log(filteredGists.length);
  for (var i = 0; i < filteredGists.length; i++)
   {
    alreadyFavorited = 0;
    for (var k = 0; k < favoriteGists.length; k++)
    {
      if (favoriteGists[k] == filteredGists[i])
      {
        alreadyFavorited = 1;
      }
    }
      if (alreadyFavorited != 1)
      {
        var favorite = document.createElement("button");
        favorite.setAttribute('name', index); 
        favorite.setAttribute('value', filteredGists[i]);
        favorite.setAttribute('onclick', 'saveToFavorites(this)');
        var li = document.createElement('li');
        li.appendChild(filteredLiGists(filteredGists[i]));
        li.appendChild(favorite);
        favorite.innerHTML = favorite.innerHTML + 'Add to favorites';
        ul.appendChild(li);
      }   
    index++;
   } 

  for (var i = 0; i < filteredGists.length; i++)
  {


    
  };


}

//This section is for the interface

function uncheckDefault()
{
  document.getElementById('displayUnfiltered').checked = false;
}

function displayChoice()
{

  document.getElementById('gistsList').innerHTML = "";

  if (document.getElementById('displayUnfiltered').checked)
  {
    console.log('Displaying all results');
    displayGists();
  }

  if (document.getElementById('filterByPython').checked)
  {
    console.log('Displaying JSON');
    searchPython();

  }

  if (document.getElementById('filterByJSON').checked)
  {
    console.log('Displaying JSON');
    searchJSON();

  }

  if (document.getElementById('filterByJavaScript').checked)
  {
    console.log('Displaying JavaScript');
    searchJavaScript();

  }

  if (document.getElementById('filterBySQL').checked)
  {
    console.log('Displaying SQL');
    searchSQL();

  }



  
}

window.onload = function(){
  localGists = localStorage.getItem('savedGists');
  if (gistPulls == null)
    {
      console.log('gistPulls is null, pulling from local');
      gistPulls = JSON.parse(localGists);
    }

  localFavorites = localStorage.getItem('favoriteGists');
  if (localFavorites)
  {
    console.log('favorites gists is null pulling from local');
    favoriteGists = JSON.parse(localFavorites);
  }
  else 
  {
    favoriteGists.length = 0;
  }

  printFavorites();

  // localFilters = localStorage.getItem('filteredGists');
  // if (filteredGists == null)
  // {
  //   console.log('filtered gists is null pulling from local');
  //   filteredGists = JSON.parse(localFavorites);
  // }
  
}