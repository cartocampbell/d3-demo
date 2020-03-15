window.onload = function(){
	var w = 900, h = 500;

	var container = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h)
		.attr("class", "container")//always assign a class 
		                           //(as the block name) for styling anf future selection
		.style("background-color", "rgba(0,0,0,0.2)");//only put a semicolor at the end of the block
	
	var innerRect = container.append("rect")
		.datum(400)
		.attr("width", function(d){
			return d*2;
		})
		.attr("height", function(d){
			return d;
		})
		.attr("class", "innerRect")
		.attr("x", 50)
		.attr("y", 50)
		.style("fill", "#FFFFFF");

	var cityPop = [
    { 
        city: 'Madison',
        population: 233209
    },
    {
        city: 'Milwaukee',
        population: 594833
    },
    {
        city: 'Green Bay',
        population: 104057
    },
    {
        city: 'Superior',
        population: 27244
    }
];

	var x = d3.scaleLinear()
		.range([90,810])
		.domain([0,3]);

	//find the minimum value of the array
	var minPop = d3.min(cityPop, function(d){
		return d.population;
	});

	//find the max value of the array
	var maxPop = d3.max(cityPop, function(d){
		return d.population;
	});

	//scale for circles center y cordinate
	var y = d3.scaleLinear()
		.range([450, 50])
		.domain([0, 700000]);

	//color scale generator
	var color = d3.scaleLinear()
	.range([
		"#FD8E85",
		"#D94701"
		])
	.domain([
		minPop,
		maxPop
	]);

	//create axis generaor
	var yAxis = d3.axisLeft(y)
		.scale(y);

	//create axis g elemtn and add axis
	var axis = container.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(50,0)")//move axis 50 pixels to the right
		.call(yAxis);

	var title = container.append("text")
		.attr("class", "title")
		.attr("text-anchor", "middle")
		.attr("x", 450)
		.attr("y", 30)
		.text("City Populations");

	var labels = container.selectAll(".labels")
		.data(cityPop)
		.enter()
		.append("text")
		.attr("class", "text")
		.attr("text-anchor", "left")
		.attr("x", function(d, i){
			//horizontal position to the right of each circle
			return x(i) + Math.sqrt(d.population * 0.01 / Math.PI +5);
		})
		.attr("y", function(d){
			//vertical position centeres on each circle
			return y(d.population) + 5;
		})
		.text(function(d){
			return d.city;
		})

		var format = d3.format(",");

		var popLine = labels.append("tspan")
			.attr("class", "popLine")
			.attr("x", function(d,i){
				return x(i) + Math.sqrt(d.population * 0.01 / Math.PI + 5);
			})
			.attr("dy", "15")//vertical offset
			.text(function(d){
				return "Pop. " + format(d.population);
			});



	var circles = container.selectAll(".circles")
		.data(cityPop)
		.enter()
		.append("circle")
		.attr("class", "circles")
		.attr("id", function (d) {
			return d.city;
		})
        .attr("r", function(d){ //x coordinate
            var area = d.population * 0.01;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){
        	return x(i);
        })
        .attr("cy", function(d){ //y coordinate
            return y(d.population);
        })
        .style("fill", function(d, i){//add a fill based on color generator
        	return color(d.population);
        })
        .style("stroke", "#000");//black stroke

	console.log(container);
};
