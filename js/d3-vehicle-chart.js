function Vehicle (name, image, horsepower, torque, toSixty, quarterMile, weight) {
    this.Vehicle = name;
    this.Image = image;
    this.Horsepower = horsepower;
    this.Torque = torque;
    this['0-60'] = toSixty;
    this['1/4 Mile'] = quarterMile;
    this.Weight = weight;
}

Vehicle.prototype = {
	constructor: Vehicle,
	addToChart: function() {
		console.log(this);
		dataset.vehicles.push(this);
		console.log(dataset.vehicles);
	}
}

function addNewVehicle() {
	console.log('triggered addNewVehicle()');
	NewCar = new Vehicle (
		document.querySelector('#vehicleName').value,
		'undefined.jpg',
		document.querySelector('#vehicleHorsepower').value,
		document.querySelector('#vehicleTorque').value,
		document.querySelector('#vehicleToSixty').value,
		document.querySelector('#vehicleQuarterMile').value,
		document.querySelector('#vehicleWeight').value
	)
	NewCar.addToChart();
	initialize();
}

function deleteElement(datum) {
	for (i=0; i<dataset.vehicles.length; i++) {
		if (datum.Vehicle == dataset.vehicles[i].Vehicle) {
			dataset.vehicles.splice(i, 1);
			optionalCars.vehicles.push(datum);
			loadGarage();
			cleanUp();
			initialize();
			return
		}
	}
}

function addToChart() {
	var stagedVehicle = document.querySelector('#newMakeSelect').value;
	for (i=0; i<dataset.vehicles.length; i++) {
		if (stagedVehicle == dataset.vehicles[i].Vehicle) {
			console.log('vehicle is already charted');
			return
		}
	}
	for (i=0; i<optionalCars.vehicles.length; i++) {
		if (stagedVehicle == optionalCars.vehicles[i].Vehicle) {
			dataset.vehicles.push(optionalCars.vehicles[i]);
			optionalCars.vehicles.splice(i, 1);
			loadGarage();
			initialize();
			return
		}
	}
}

function loadDoc() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			// create global dataset variable
			dataset = JSON.parse(xhttp.responseText);
			initialize();
		}
	};
	xhttp.open("GET", "js/d3-data/sports-cars.json", true);
	xhttp.send();
}

function loadOptions() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			// create global variable
			optionalCars = JSON.parse(xhttp.responseText);
			loadGarage();
		}
	}
	xhttp.open("GET", "js/d3-data/optional-cars.json", true);
	xhttp.send();
}

function loadGarage() {
	clearOptions(vehicleMake.options);

	// then reload all from the optionalCars object
	for (i=0; i<optionalCars.vehicles.length; i++) {
		var optionElement = document.createElement('option');
		optionElement.text = optionalCars.vehicles[i].Vehicle;
		vehicleMake.options.add(optionElement, [i]);
	}
}

function clearOptions(element) {
	for (i=element.length-1; i>=0; i--) {
		element.remove(i);
	}
}

var datum = 'Horsepower';
	h = 400;
	vehicleMake = document.querySelector('#newMakeSelect');

d3.select('.d3-chart-title')
	.append('h3')
	.text('Sports Car Performance Comparison');

d3.select('.d3-x-labels')
	.append('h4')

var svg = d3.select(".d3-bar-chart")
	.append("svg")
	.attr("width", '100%')
	.attr("height", h);

function cleanUp() {
	svg.selectAll("rect")
		.data(dataset.vehicles)
		.exit().remove()

	svg.selectAll("text")
		.data(dataset.vehicles)
		.exit().remove()

	d3.select('.d3-y-labels').selectAll('h5')
		.data(dataset.vehicles)
		.exit().remove()

	d3.select('.d3-y-labels').selectAll('span')
		.data(dataset.vehicles)
		.exit().remove()
}

var initialize = function() {

	svg.selectAll("rect")
		.data(dataset.vehicles)
		.enter()
		.append("rect");

	svg.selectAll("text")
		.data(dataset.vehicles)
		.enter()
		.append("text");

	d3.select('.d3-y-labels').selectAll('h5')
		.data(dataset.vehicles)
		.enter()
		.append('h5');

	d3.select('.d3-y-labels').selectAll('span')
		.data(dataset.vehicles)
		.enter()
		.append('span')
		.classed('glyphicon glyphicon-remove', true)

	updateData();
}

var sortBars = function() {

	svg.selectAll("rect")
		.sort(function(a, b) {
			return d3.ascending(a[datum], b[datum]); // datum
		}).on('mouseover', function(d, i) {
		//console.log(i);
		d3.select("#tooltip")
			.style("top", 200 + (i * (400/dataset.vehicles.length)) + 'px')
			.select(".tooltip-heading")
			.text(d.Vehicle);

		d3.select(".tooltip-image")
			.attr({'src': 'dist/images/d3-vehicles/' + d.Image});

		d3.select("#tooltip").classed("hidden", false);
	}).on('mouseout', function() {
		d3.select("#tooltip").classed("hidden", true);
	})
		.transition()
		.duration(1000)
		.attr({
			y:		function(d, i)	{	return i * (100/dataset.vehicles.length) + '%';		},
		});

	d3.selectAll('h5')
		.sort(function(a, b) {
			return d3.ascending(a[datum], b[datum]); // datum
		})
		.transition()
		.duration(1000);

	d3.selectAll('.d3-y-labels span')
		.sort(function(a, b) {
			return d3.ascending(a[datum], b[datum]);
		})
		.on('click', function(d) {
			deleteElement(d);
		})
		.transition()
		.duration(1000)
		.style({ 'top':  function(d, i) {	return i * (400/dataset.vehicles.length) + (150/dataset.vehicles.length) + 'px';	}});


	svg.selectAll('text')
		.sort(function(a, b) {
			return d3.ascending(a[datum], b[datum]); // datum
		})
		.transition()
		.duration(1000)
		.attr({
			y:		function(d, i)	{	return i * (400/dataset.vehicles.length) + (300/dataset.vehicles.length) + 'px'; }
		});
};

var updateData =  function(option) {
	option ? datum = option.value : null;

	var xScale = d3.scale.linear()
		.domain([0, d3.max(dataset.vehicles, function(d) {
			return d[datum];
		}) ])
		.range([5 + '%', 100 + '%'])
		.nice();

	d3.selectAll('h5')
		.text(datum)
		.style({
			height:			function()	{	return (400/dataset.vehicles.length) + 'px';	},
			'line-height':	function()	{	return (400/dataset.vehicles.length) + 'px';	}
		});

	d3.select('h4').text(datum);

	d3.selectAll("rect").data(dataset.vehicles).attr({
		x:		0,
		y:		function(d, i)	{	return i * (400/dataset.vehicles.length) + 'px';	},
		height:	function()		{	return (400/dataset.vehicles.length - 5) + 'px';	},
		width:  function(d)		{	return xScale(d[datum]);							},
		fill:	function(d)		{	return "#365899"; 									}
	});

	d3.selectAll("text").data(dataset.vehicles)
	.text(function(d) {
		switch(datum) {
			case 'Horsepower':
				m = 'hp';
				break;
			case 'Torque':
				m = 'lb/ft';
				break;
			case '0-60':
			case '1/4 Mile':
				m = 's';
				break;
			case 'Weight':
				m = 'kg';
				break;
		}
		return d[datum] + m;
	})
	.attr({
		y:		function(d, i)	{	return i * (400/dataset.vehicles.length) + (300/dataset.vehicles.length) + 'px';	},
		x:		function(d) 	{	return xScale(d[datum]);															},
		dx: 	-10,
		'font-family':	'Impact',
		'font-size'  :	function() { return (400/dataset.vehicles.length)-12 + 'px'},
		'text-anchor':	'end',
		fill:			'white',
	});

	d3.selectAll("h5").data(dataset.vehicles)
	.text(function(d) {
		return d.Vehicle;
	});
	sortBars();
};

loadDoc();
loadOptions();
