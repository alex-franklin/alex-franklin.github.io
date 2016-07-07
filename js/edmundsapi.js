// edmunds api key
var api_key = "wmawhp2cm7m83tff2vtn7bh9",
	api_url = "https://api.edmunds.com/api/",
	vehicleMake = document.querySelector('#newMakeSelect'),
	vehicleModel = document.querySelector('#newModelSelect'),
	vehicleYear = document.querySelector('#newYearSelect');

function getJSON(url) {

  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.responseType = "json";
    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      }
      else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(Error("Network Error"));
    };
    req.send();
  });
}

function getArticle() {
	getJSON(api_url + "editorial/v2/" + vehicleMake.value + "/" + vehicleModel.value + "/" + vehicleYear.value + "?api_key=" + api_key + "&fmt=json")
		.then(function(response) {
		  articleData = response;
		  populateArticle(response);
		}, function(error) {
		  console.error("Failed!", error);
		});
}

function getVehicleData() {
	getJSON(api_url + "vehicle/v2/" + vehicleMake.value + "/" + vehicleModel.value + "/" + vehicleYear.value + "/styles?fmt=json&api_key=" + api_key + "&view=full")
		.then(function(response) {
		  vehicleData = response;
		  populateData(vehicleData);
		  loadCompSearch(vehicleData);
		}, function(error) {
		  console.error("Failed!", error);
		});
}

function testData() {
	getJSON(api_url + "vehicle/v2/makes?fmt=json&api_key=" + api_key)
		.then(function(response) {
			vehicleList = response;
			loadGarage(response);
		});
}

function loadCompSearch(data) {
	var selElem = document.querySelector("#compareSelect");

	clearOptions(selElem.options);

	model_line = [];
	var make = vehicleList.makes.filter(function(value) {
		return value.name == data.styles[0].make.name
	});
	for (i=0; i<make[0].models.length; i++) {
		for (j=0; j<make[0].models[i].years.length; j++) {
			if (make[0].models[i].years[j].year == data.styles[0].year.year) {
			   model_line.push({'vehicleMake': data.styles[0].make.niceName,
								 'vehicleModel': make[0].models[i].niceName,
								 'vehicleYear': data.styles[0].year.year
								});
			}
		}
	}

	if (model_line.length > 1) {
		var optEl = document.createElement('option');
		optEl.text = 'Compare ' + data.styles[0].year.year + ' ' + data.styles[0].make.name + ' lineup';
		optEl.value = 'model_line';
		selElem.options.add(optEl);
	}

	if (data.stylesCount > 1) {
		var optEl = document.createElement('option');
		optEl.text = 'Compare ' + data.styles[0].year.year + ' ' + data.styles[0].model.name + ' styles';
		optEl.value = 'styles';
		selElem.options.add(optEl);
	}
}

function compareSearch() {
	model_line_detail=[];
	console.log(model_line);
	var i=0;

	function recurCall(i) {
		if (i<model_line.length) {
			getJSON(api_url + "vehicle/v2/" +	model_line[i].vehicleMake + "/" + model_line[i].vehicleModel + "/" + model_line[i].vehicleYear + "/styles?fmt=json&api_key=" + api_key + "&view=full")
			.then(function(response) {
				console.log(response, i);
				model_line_detail.push(response);
				i++;
				// throttle API calls to 2/sec
				setTimeout(function() {
					recurCall(i)
				}, 500);
			})
		}
	};

	recurCall(i);
}

function loadGarage(data) {
	clearOptions(vehicleMake.options);
	for (i=0; i<data.makes.length; i++) {
		var optionElement = document.createElement('option');
		optionElement.text = data.makes[i].name;
		optionElement.value = data.makes[i].niceName;
		vehicleMake.options.add(optionElement, [i]);
	}
}

function loadModels() {
	clearOptions(vehicleModel.options);
	for (i=0; i<vehicleList.makes.length; i++) {
		if (vehicleMake.value == vehicleList.makes[i].niceName) {
			for (j=0; j<vehicleList.makes[i].models.length; j++) {
				var optionElement = document.createElement('option');
				optionElement.text = vehicleList.makes[i].models[j].name;
				optionElement.value = vehicleList.makes[i].models[j].niceName;
				vehicleModel.options.add(optionElement, [j]);
			}
		}
	}
}

function loadYears() {
	clearOptions(vehicleYear.options);
	for (i=0; i<vehicleList.makes.length; i++) {
		if (vehicleMake.value == vehicleList.makes[i].niceName) {
			for (j=0; j<vehicleList.makes[i].models.length; j++) {
				if (vehicleModel.value == vehicleList.makes[i].models[j].niceName) {
					for (k=0; k<vehicleList.makes[i].models[j].years.length; k++) {
						var optionElement = document.createElement('option');
						optionElement.text = vehicleList.makes[i].models[j].years[k].year;
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
	console.log(data);
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
