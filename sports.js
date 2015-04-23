var settings = null;

function Sport(sName, minTemp, maxTemp, rainMax)
{
	this.sName = sName;
	this.minTemp = minTemp;
	this.maxTemp = maxTemp;
	this.rainMax = rainMax;
}

function addSport (settings, sport)
{
	if(sport instanceof Sport)
	{
		settings.sports.push(sport);
		localStorage.setItem('userSettings', JSON.stringify(settings));
		console.log('so far so good');
		return true;
	}
	console.error('Attempted to add non-sport.');
	return false;
}

function liSport(sport) 
{
	
	var dl = document.createElement('dl');
	var entry = dlEntry('Name', sport.sName);
	dl.appendChild(entry.dt);
	dl.appendChild(entry.dd);
	entry = dlEntry('Minimum Temperature', sport.minTemp);
	dl.appendChild(entry.dt);
	dl.appendChild(entry.dd);
	entry = dlEntry('Maximum Temperature', sport.maxTemp);
	dl.appendChild(entry.dt);
	dl.appendChild(entry.dd);
	entry = dlEntry('Maximum Chance of Rain', sport.rainMax);
	dl.appendChild(entry.dt);
	dl.appendChild(entry.dd);
	return dl;
}

function dlEntry(term, definition) {
	var dt = document.createElement('dt');
	var dd = document.createElement('dd');

	dt.innerText = term;
	dd.innerText = definition;
	return {'dt':dt, 'dd':dd};
}

function saveDemoInput() {
  alert("hoho");
	localStorage.setItem('demoText', document.getElementsByName('demo-input')[0].value);
}

function saveSport() {
	var sName = document.getElementsByName('sport-name')[0].value;
	var minT = document.getElementsByName('sport-min-temp')[0].value;
	var maxT = document.getElementsByName('sport-max-temp')[0].value;
	var maxR = document.getElementsByName('sport-max-rain')[0].value;


	var s = new Sport(sName, minT, maxT, maxR);
	

	addSport(settings, s);
	console.log('Finished saving text entry');
}

function createSportList(ul)
{
	
	settings.sports.forEach(function(s) 
	{
		var li = document.createElement('li');
		li.appendChild(liSport(s));
		ul.appendChild(li);
	});
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
    httpRequest.open('GET', testURL);
    httpRequest.send();
//   }

  function alertContents() 
  {
    if (httpRequest.readyState === 4) 
    {
      if (httpRequest.status === 200) 
      {
        console.log('success!');
        var weather = JSON.parse(this.responseText)
        var maxt = 'before calling data'
        maxt = weather.list[0].temp.max;
        console.log(maxt);

        for (var i = 0; i < 2; i++)
        {
        	console.log(settings.sports[0].sName);
        }

      } else 
      {
        alert('There was a problem with the request.');
      }
    }
  }
}

window.onload = function(){
	var settingsStr = localStorage.getItem('userSettings');
	if (settingsStr == null) {
		settings = {'sports':[]};
		localStorage.setItem('userSettings', JSON.stringify(settings));
	}
	else{
		settings = JSON.parse(settingsStr);
	}

	createSportList(document.getElementById('sport-list'));

}



