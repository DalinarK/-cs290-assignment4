
var gistPulls = null;

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
    var gitURL = 'https://api.github.com/users/koraktor/gists';

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', gitURL);
    httpRequest.send();
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
    var localGists = localStorage.getItem('savedGists');
    if (gistPulls == null)
    {
      console.log('gistPulls is null, pulling from local');
      gistPulls = JSON.parse(localGists);
    }

    var arr = new Array(500);

    var rubyArray = 0;
    var rubyFilter = /directory/;
    console.log(gistPulls.length);
    for (var i = 0; i < gistPulls.length; i++)
    {
      rubyArray = 0;
      rubyArray = rubyFilter.test(gistPulls[i].files);


      if (rubyArray != 0)
      {
        console.log('found ruby!');
      }
    }
  }
