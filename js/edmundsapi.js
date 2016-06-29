// edmunds api key
var api_key = "wmawhp2cm7m83tff2vtn7bh9",
	vehicleMake = document.querySelector('#newMakeSelect'),
	vehicleModel = document.querySelector('#newModelSelect'),
	vehicleYear = document.querySelector('#newYearSelect');

function getArticle() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			article = JSON.parse(xhttp.responseText);
			console.log(article);
			populateArticle(article);
		}
	};
	xhttp.open("GET", "https://api.edmunds.com/api/editorial/v2/" +
		vehicleMake.value + "/" + vehicleModel.value + "/" + vehicleYear.value + "?api_key=" + api_key + "&fmt=json", true);
	xhttp.send();
}

function getVehicleData() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			data = JSON.parse(xhttp.responseText);
			console.log(data);
			populateData(data);
		}
	};
	xhttp.open("GET", "http://api.edmunds.com/api/vehicle/v2/" +
		vehicleMake.value + "/" + vehicleModel.value + "/" + vehicleYear.value + "/styles?fmt=json&api_key=" + api_key + "&view=full", true);
	xhttp.send();
}

function testData() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			// create global dataset variable
			edmunds = JSON.parse(xhttp.responseText);
			console.log(edmunds);
			loadGarage();
		}
	};
	xhttp.open("GET", "https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=" + api_key, true);
	xhttp.send();
}

function loadGarage() {
	clearOptions(vehicleMake.options);
	for (i=0; i<edmunds.makes.length; i++) {
		var optionElement = document.createElement('option');
		optionElement.text = edmunds.makes[i].name;
		optionElement.value = edmunds.makes[i].niceName;
		vehicleMake.options.add(optionElement, [i]);
	}
}

function loadModels() {
	clearOptions(vehicleModel.options);
	for (i=0; i<edmunds.makes.length; i++) {
		if (vehicleMake.value == edmunds.makes[i].niceName) {
			for (j=0; j<edmunds.makes[i].models.length; j++) {
				var optionElement = document.createElement('option');
				optionElement.text = edmunds.makes[i].models[j].name;
				optionElement.value = edmunds.makes[i].models[j].niceName;
				vehicleModel.options.add(optionElement, [j]);
			}
		}
	}
}

function loadYears() {
	clearOptions(vehicleYear.options);
	for (i=0; i<edmunds.makes.length; i++) {
		if (vehicleMake.value == edmunds.makes[i].niceName) {
			for (j=0; j<edmunds.makes[i].models.length; j++) {
				if (vehicleModel.value == edmunds.makes[i].models[j].niceName) {
					for (k=0; k<edmunds.makes[i].models[j].years.length; k++) {
						var optionElement = document.createElement('option');
						optionElement.text = edmunds.makes[i].models[j].years[k].year;
						vehicleYear.options.add(optionElement, [k]);
					}
				}
			}
		}
	}
}

function clearOptions(element) {
	for (i=element.length-1; i>=0; i--) {
		element.remove(i);
	}
}

function removeEntities(string) {
	var substr = string.replace("&lt;p&gt;", "");
	return substr.replace("&lt;/p&gt;", "")
}

function populateData(data) {
	var data = data.styles[0],
		section = document.querySelector('.edmunds-vData'),
		title = document.querySelector('.vData-title'),
		mpg = document.querySelector('.vData-mpg'),
		horsepower = document.querySelector('.vData-horsepower'),
		torque = document.querySelector('.vData-torque');

	$(section).fadeIn();
	title.innerHTML = vehicleYear.value + ' ' + vehicleMake.value.capFirst() + ' ' + vehicleModel.value.capFirst() + ' Specs';

	if (data.MPG) {
		mpg.innerHTML = data.MPG.city + '/' + data.MPG.highway
	};

	if (data.engine.horsepower) {
		horsepower.innerHTML = data.engine.horsepower + 'bhp@' + data.engine.rpm.horsepower + 'RPM'
	}

	if (data.engine.torque) {
		torque.innerHTML = data.engine.torque + 'lb/ft@' + data.engine.rpm.torque + 'RPM'
	}

}

function populateArticle(data) {
	var article = document.querySelector('.edmunds-article'),
		link = document.querySelector('.article-link'),
		title = document.querySelector('.article-title'),
		whatsNew = document.querySelector('.whats-new'),
		edmundsSays = document.querySelector('.edmunds-says'),
		pros = document.querySelector('.pros'),
		cons = document.querySelector('.cons');


	$(article).fadeIn();
	title.innerHTML = data.title.replace("Review", "Quick Review");
	link.setAttribute("href", data.link.href);

	if (data.whatsNew)		{
		$('.whats-new-row').fadeIn();
		whatsNew.innerHTML = removeEntities(data.whatsNew)
	};
	if (data.edmundsSays)	{
		$('.edmunds-says-row').fadeIn();
		edmundsSays.innerHTML = removeEntities(data.edmundsSays)	};

	for (i=0; i<data.pros.length; i++) {
		var liPro = document.createElement('li');
		liPro.innerHTML = data.pros[i];
		pros.appendChild(liPro);
	}

	for (i=0; i<data.cons.length; i++) {
		var liCon = document.createElement('li');
		liCon.innerHTML = data.cons[i];
		cons.appendChild(liCon);
	}
}

testData();
