const width = 700, 
    height = 600,
    width2 = 300, 
    height2 = 300,

    colors = ['#fff7ec', '#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'];
    colors_chom = ['#fff7ec', '#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'];
    colors_pollution = ['#168345','#1a9850', '#66bd63', '#a6d96a', '#d9ef8b', '#fee08b','#fdcf4e','#fdc835', '#fdae61', '#fc8003', '#f46d43', '#d73027', '#ac2720', '#561310'];
    colors_pollution2 = ['#168345','#1a9850', '#66bd63', '#a6d96a', '#d9ef8b', '#fee08b','#fdcf4e','#fdc835', '#fdae61', '#fc8003', '#f46d43', '#d73027', '#ac2720', '#561310'];
    colors_education=['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'];colors_education2=['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'];

  
  const path = d3.geoPath();
  
  const projection = d3.geoEquirectangular()
    .center([2.332978, 48.860117])
    .scale(40000)
    .translate([width / 2, height / 2]);
  
  path.projection(projection);


  const path2 = d3.geoPath();
  
  const projection2 = d3.geoEquirectangular()
    .center([2.332978, 48.860117])
    .scale(20300)
    .translate([width2/2, height2/2]);
  
  path2.projection(projection2);
 
  const svg = d3.select('#map_chomage').append("svg")
    .attr("width", width)
    .attr("height", 500)
    .attr('fill', 'none')
    .attr("class", "Blues");

   const svg_chom = d3.select('#map_chomage2').append("svg")
    .attr("id", "svg")
    .attr("width", width2)
    .attr("height", height2)
    .attr('fill', 'none')
    .attr("class", "Blues");

  const svg_pollution = d3.select('#map_pollution').append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height)
    .attr('fill', 'none')
    .attr("class", "Blues");

  const svg_pollution2 = d3.select('#map_pollution2').append("svg")
    .attr("id", "svg")
    .attr("width", width2)
    .attr("height", height2)
    .attr('fill', 'none')
    .attr("class", "Blues");

  const svg_election = d3.select('#map_election').append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height)
    .attr('fill', 'none')
    .attr("class", "Blues");

const svg_election2 = d3.select('#map_election2').append("svg")
    .attr("id", "svg")
    .attr("width", width2)
    .attr("height", height2)
    .attr('fill', 'none')
    .attr("class", "Blues");


   const svg_education = d3.select('#map_education').append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height)
    .attr('fill', 'none')
    .attr("class", "Blues"); 

     const svg_education2 = d3.select('#map_education2')
    .append("svg")
    .attr("id", "svg")
    .attr("width", width2)
    .attr("height", height2)
    .attr('fill', 'none')
    .attr("class", "Blues"); 

  // Append the group that will contain our paths
  const deps = svg.append("g");
  const contours_paris = svg.append("g");
  const ligne = svg.append("g");
  const stations = svg.append("g");

  const deps_chom = svg_chom.append("g");
  const contours_paris_chom = svg_chom.append("g");
  const ligne_chom = svg_chom.append("g");
  const stations_chom = svg_chom.append("g");

  const deps_pollution = svg_pollution.append("g");
  const contours_paris_pollution = svg_pollution.append("g");
  const ligne_pollution = svg_pollution.append("g");
  const stations_pollution = svg_pollution.append("g");

  const deps_pollution2 = svg_pollution2.append("g");
  const contours_paris_pollution2 = svg_pollution2.append("g");
  const ligne_pollution2 = svg_pollution2.append("g");
  const stations_pollution2 = svg_pollution2.append("g");

  const deps_election = svg_election.append("g");
  const contours_paris_election = svg_election.append("g");
  const ligne_election = svg_election.append("g");
  const stations_election = svg_election.append("g");

  const deps_election2 = svg_election2.append("g");
  const contours_paris_election2 = svg_election2.append("g");
  const ligne_election2 = svg_election2.append("g");
  const stations_election2 = svg_election2.append("g");

  const deps_education = svg_education.append("g");
  const contours_paris_education = svg_education.append("g");
  const ligne_education= svg_education.append("g");
  const stations_education = svg_education.append("g");

  const deps_education2 = svg_education2.append("g");
  const contours_paris_education2 = svg_education2.append("g");
  const ligne_education2= svg_education2.append("g");
  const stations_education2 = svg_education2.append("g");
  
  

  var promises = [];
    promises.push(d3.json('https://raw.githubusercontent.com/cerezamo/dataviz/master/Graphique_bokeh/pop_sansnoms2.geojson'));
    promises.push(d3.csv("https://raw.githubusercontent.com/cerezamo/dataviz/master/Graphique_bokeh/variables_noms.csv"));
    //https://github.com/cerezamo/dataviz/blob/master/variables_noms2.csv
    //https://raw.githubusercontent.com/cerezamo/dataviz/master/Graphique_bokeh/variables_noms.csv
    promises.push(d3.json("https://raw.githubusercontent.com/cerezamo/dataviz/master/Graphique_bokeh/stations.geojson"));
    promises.push(d3.json("https://raw.githubusercontent.com/cerezamo/dataviz/master/Graphique_bokeh/rer.geojson"));
    promises.push(d3.json("https://raw.githubusercontent.com/cerezamo/dataviz/master/Graphique_bokeh/pop_communes.geojson"));
    promises.push(d3.json("https://raw.githubusercontent.com/cerezamo/dataviz/master/contours_paris2.geojson"));
    promises.push(d3.csv("https://raw.githubusercontent.com/cerezamo/dataviz/master/variables_noms2.csv"));


  Promise.all(promises).then(function(values){

    const geojson = values[0];
    const csv = values[1];
    const geojson_stations = values[2];
    const geojson_rer = values[3];
    const geojson_commune = values[4];
    const geojson_contours=values[5];
    const csv2=values[6];



 //////////////////////:Map Traffic ////////////////////////////////:

var circles = [];
var initHour = 4;

var properties = [
    { code: 'NB_VALD_HOUR', desc: 'Nombre de validations' ,text:'Nombre de validations' },
    { code: 'pourc_validations', desc: 'Pourcentage de validation',text: 'Pourcentage de validation' }
];


d3.select("#map_trf").append("div")
        .attr("class","tooltip")
        .style("opacity", 0);

//d3.select("body").append('div').text('BONJOUR');
var slider = d3.select("#slider_1")
            .append("input")
            .attr("class", "slider1")
            .attr("type", "range")
            .attr("min", 4)
            .attr("max", 23)
            .attr("step", 1)
            .attr('data-step-labels',[0, 4, 8, 10, 23])
            .style("width", "250px")
            .style("fill","white")
            .style("background-colour", "#e3e3e3")
            .on("input", function() {
                    var hour = this.value;
                    Dataget(hour);
                });

var currProperty = 'pourc_validations';

function renderProperties(){
   var pp = d3.select('#property-list').selectAll('.view').data(properties);
   pp.enter()
      .append('div')
      .classed('view', true)
      .on('click', d => {
         currProperty = d.code;
         renderProperties();
         renderCircles();
      })
      //.attr('title', d => d.desc)
      .text(d => d.text)
      .merge(pp)
      .classed('selected', d => d.code === currProperty);
}

var map = L.map('map_trf',{maxZoom:14});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
//L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',{attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

map.setView([48.833, 2.333], 10);
//map.dragging.disable();
//map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable(); 

var radiusScale_nb = d3.scaleSqrt().domain([0, 1500000]).range([4, 32]).clamp(true);
var colorScale_nb = d3.scaleSequential(d3.interpolateOrRd).domain([0, 1500000]);

var radiusScale_pour = d3.scaleSqrt().domain([0, 33]).range([4, 32]).clamp(true);
var colorScale_pour = d3.scaleSequential(d3.interpolateOrRd).domain([0, 30]);

function renderCircles() {
   circles.forEach(function(c) {c.remove();})
   circles = [];

   theData.features.forEach(function(feature) {
    if (currProperty == 'NB_VALD_HOUR') { 
      var c = L.circleMarker( 
         [feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {              radius: radiusScale_nb(feature.properties[currProperty]),
         //color: colorScale_nb(feature.properties[currProperty]),
              color: 'black',
              fillColor: colorScale_nb(feature.properties[currProperty]),
              fillOpacity: 0.7
             });
     };
    if (currProperty == 'pourc_validations') { 
               var c = L.circleMarker(
          [feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
              radius: radiusScale_pour(feature.properties[currProperty]),
              //color: colorScale_pour(feature.properties[currProperty]),
              color: 'black',
              fillColor: colorScale_pour(feature.properties[currProperty]),
              fillOpacity: 0.5
             });
    }; 
         c.addTo(map); 
         c.bindTooltip('<b>' + feature.properties.LIBELLE_ARRET+ '</b>'+ '<br/'+'<b>' //+ currProperty + ': </b>' + feature.properties[currProperty] + '<br>' 
         + properties.filter(d => d.code === currProperty)[0].desc + ': </b>' + feature.properties[currProperty].toFixed(2));
         circles.push(c);
  });
};

function Dataget(hrStr) {d3.json('https://raw.githubusercontent.com/cerezamo/dataviz/master/stations'+ hrStr +'.geojson').then(function(data) {
      theData = data;
      renderCircles();
      slider.property("value", hrStr);
      var hrStr2 = parseInt(hrStr)+1;
      d3.select(".hour").text(function(){ return hrStr+'h-'+hrStr2+'h'});
   });
}

Dataget(initHour);
renderProperties();


 //////////////////////:Map Chomage ////////////////////////////////:

 var legend = svg.append('g')
    .attr('transform', 'translate(20, 150)')
    .attr('id', 'legend');
    
    legend.selectAll()
      .data(d3.range(colors.length))
      .enter().append('svg:rect')
        .attr('height', '20px')
        .attr('width', '20px')
        .attr('x', 1)
        .attr('y', function(d) { return d *20; })
        .style("fill", function(d) { return colors[d]; })
    
  var features = deps
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr('id', function(d) {return "d" + d.properties.insee;})// ATTENTION au "d"
    .attr("d", path);

  var quantile = d3.scaleQuantile()
    .domain([0, d3.max(csv, function(e) { return + e.TauxChomage; })])
    .range(colors);
        
  var legendScale = d3.scaleLinear()
    .domain([0, d3.max(csv, function(e) { return +e.TauxChomage; })])
    .range([0, colors.length * 20]);
      
  var legendAxis = svg.append("g")
    .attr('transform', 'translate(40, 150)')
    .call(d3.axisRight(legendScale).ticks(5));
  
      
  csv.forEach(function(e,i) {
    d3.select(("#d" +  e.insee))
      .style("fill", function(d) { return quantile(+e.TauxChomage); })
      .attr("class", "department")
      .on("mouseover", function(d) {
        div.transition()        
          .duration(200)      
          .style("opacity", .9);
        div.html("<b>Commune : </b>" + e.nom.toUpperCase() + "</br>"+ "<b>Taux de chômage : </b>" + Math.round(e.TauxChomage) + " %")
          .style("left", (d3.event.pageX + 30) + "px")     
          .style("top", (d3.event.pageY - 30) + "px");
      })
      .on("mouseout", function(d) {
        div.style("opacity", 0);
        div.html("")
          .style("left", "-500px")
          .style("top", "-500px");
      });
  });

  contours_paris.selectAll("path")
                .data(geojson_contours.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("stroke", "#21211f")
                .style("stroke-width", "1.5px")
                .style("opacity", 1);


	ligne.selectAll("path")
	    .data(geojson_rer.features)
	    .enter()
	    .append("path")
	    .attr("d", path)
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "5px");

	stations.selectAll("path")
	    .data(geojson_stations.features)
	    .enter()
	    .append("path")
	    .attr("d", path)
      .attr('id', 'stations')
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "3px")
	    //.style("fill", "white")
	    .on("mouseover", function(d) {
		div2.transition()
		   .duration(200)
		   .style("opacity", 0.9);
		div2.html(d.properties.nom_long)
		    // on rÃ©cupÃ¨re la position de la souris et dÃ©plaÃ§ons la fenÃªtre qui apparait de quelques pixels
		   .style("left", (d3.event.pageX + 30) + "px")
		   .style("top", (d3.event.pageY - 30) + "px");
	    })
	    .on("mouseout", function(d) {   // #0042a1
        div2.style("opacity", 0)
        div2.html("")
            // On le dÃ©place en dehors de la zone visible car mÃªme avec une opacitÃ© de 0 il recouvert les autres communes
        .style("left", "-500px")
        .style("top", "-500px");
	    });

    svg.append("text")
    .attr("x", (width / 1.8))
    .attr("y", 45)
    .attr("text-anchor", "middle")
    .style("fill", "#666f77")
    .style("font-weight", "500")
    .style("font-size", "20px")
    .text("Taux de chômage, en pourcentage de la population active, en 2016");

    

    svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (15) +","+(height/2.5)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Taux de chômage (%)")
            .style("fill", "#666f77")
    .style("font-weight", "500")
    .style("font-size", "14px");



   //////////////////////:Map Chomage2 ////////////////////////////////:

   var legend_chom = svg_chom.append('g')
    .attr('transform', 'translate(190, 250)')
    .attr('id', 'legend_chom');
    
    legend_chom.selectAll()
      .data(d3.range(colors_chom.length))
      .enter().append('svg:rect')
        .attr('height', '10px')
        .attr('width', '10px')
        .attr('y', 0.5)
        .attr('x', function(d) { return d * 10; })
        .style("fill", function(d) { return colors_chom[d]; })
    
  var features_chom = deps_chom
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr('id', function(d) {return "dc" + d.properties.insee;})// ATTENTION au "d"
    .attr("d", path2);

  var quantile_chom = d3.scaleQuantile()
    .domain([0, d3.max(csv, function(e) { return + e.TauxChomage; })])
    .range(colors_chom);
        
  var legendScale_chom = d3.scaleLinear()
    .domain([0, d3.max(csv, function(e) { return +e.TauxChomage; })])
    .range([0, colors_chom.length * 10]);
      
  var legendAxis_chom = svg_chom.append("g")
    .attr('transform', 'translate(190, 250)')
    .call(d3.axisTop(legendScale_chom).ticks(5));
  
      
  csv.forEach(function(e,i) {
    d3.select(("#dc" +  e.insee))
      .style("fill", function(d) { return quantile_chom(+e.TauxChomage); })
      .attr("class", "department")
      .on("mouseover", function(d) {
        div.transition()        
          .duration(200)      
          .style("opacity", .9);
        div.html("<b>Commune : </b>" + e.nom.toUpperCase() + "</br>"+ "<b>Taux de chômage : </b>" + Math.round(e.TauxChomage) + " %")
          .style("left", (d3.event.pageX + 30) + "px")     
          .style("top", (d3.event.pageY - 30) + "px");
      })
      .on("mouseout", function(d) {
        div.style("opacity", 0);
        div.html("")
          .style("left", "-500px")
          .style("top", "-500px");
      });
  });

  contours_paris_chom.selectAll("path")
                .data(geojson_contours.features)
                .enter()
                .append("path")
                .attr("d", path2)
                .style("stroke", "#21211f")
                .style("stroke-width", "1.5px")
                .style("opacity", 1);

	ligne_chom.selectAll("path")
	    .data(geojson_rer.features)
	    .enter()
	    .append("path")
	    .attr("d", path2)
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "1.5px");

	stations_chom.selectAll("path")
	    .data(geojson_stations.features)
	    .enter()
	    .append("path")
	    .attr("d", path2)
      .attr("d", path2.pointRadius(3))
      .attr('id', 'stations')
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "1.5px")
	    .on("mouseover", function(d) {
		div2.transition() 
		   .duration(200)
		   .style("opacity", 0.9);
		div2.html(d.properties.nom_long)
		    // on rÃ©cupÃ¨re la position de la souris et dÃ©plaÃ§ons la fenÃªtre qui apparait de quelques pixels
		   .style("left", (d3.event.pageX + 30) + "px")
		   .style("top", (d3.event.pageY - 30) + "px");
	    })
	    .on("mouseout", function(d) {   // #0042a1
        div2.style("opacity", 0)
        div2.html("")
            // On le dÃ©place en dehors de la zone visible car mÃªme avec une opacitÃ© de 0 il recouvert les autres communes
        .style("left", "-500px")
        .style("top", "-500px");
	    });

    svg_chom.append("text")
    .attr("x", 20)
    .attr("y", 30)
    .attr("text-anchor", "left")
    .style("fill", "#666f77")  
    .style("font-weight", "500")
    .style("font-size", "15px")
    .style("text-decoration", "underline")
    .text("Taux de chômage :");


    svg_chom.append("text")
            .attr("text-anchor", "left")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (185) +","+(275)+")rotate(0)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Taux de chômage (%)")
            .style("fill", "#666f77")
            .style("font-weight", "300")
            .style("font-size", "11px");
   

  
//////////////////////:Map Pollution ////////////////////////////////:

   
  var legend_pollution = svg_pollution.append('g')
    .attr('transform', 'translate(20, 150)')
    .attr('id', 'legend_pollution');
    
    legend_pollution.selectAll()
      .data(d3.range(colors_pollution.length))
      .enter().append('svg:rect')
        .attr('height', '20px')
        .attr('width', '20px')
        .attr('x', 1)
        .attr('y', function(d) { return d *20; })
        .style("fill", function(d) { return colors_pollution[d]; });
    
  var features_pollution = deps_pollution
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr('id', function(d) {return "p" + d.properties.insee;})// ATTENTION au "d"
    .attr("d", path);

  var quantile_pollution = d3.scaleQuantile()
    .domain([d3.min(csv, function(e) {return + e.pm10}), d3.max(csv, function(e) { return + e.pm10; })])
    .range(colors_pollution);
        
  var legendScale_pollution = d3.scaleLinear()
    .domain([d3.min(csv, function(e) {return + e.pm10}), d3.max(csv, function(e) { return +e.pm10; })])
    .range([0, colors_pollution.length * 20]);
      
  var legendAxis_pollution = svg_pollution.append("g")
    .attr('transform', 'translate(40, 150)')
    .call(d3.axisRight(legendScale_pollution).ticks(7));

      
  csv.forEach(function(e,i) {
    d3.select(("#p" +  e.insee))
      .style("fill", function(d) { return quantile_pollution(+e.pm10); })
      .attr("class", "department")
      .on("mouseover", function(d) {
        div.transition()        
          .duration(200)      
          .style("opacity", .9);
        div.html("<b>Commune : </b>" + e.nom.toUpperCase() + "</br>"+ "<b>Taux de PM10 : </b>" + e.pm10 + " µg/m<sup>3</sup>" + "<br>")
          .style("left", (d3.event.pageX + 30) + "px")     
          .style("top", (d3.event.pageY - 30) + "px");
      })
      .on("mouseout", function(d) {
        div.style("opacity", 0);
        div.html("")
          .style("left", "-500px")
          .style("top", "-500px");
      });
  });

  contours_paris_pollution.selectAll("path")
                .data(geojson_contours.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("stroke", "#21211f")/*"#404038")"#807E7E")*/
                .style("stroke-width", "1.5px")
                .style("opacity", 1);


	ligne_pollution.selectAll("path")
	    .data(geojson_rer.features)
	    .enter()
	    .append("path")
	    .attr("d", path)
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "5px");

	stations_pollution.selectAll("path")
	    .data(geojson_stations.features)
	    .enter()
	    .append("path")
	    .attr("d", path)
      .attr('id', 'stations')
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "3px")
	    .on("mouseover", function(d) {
		div2.transition()
		   .duration(200)
		   .style("opacity", 0.9);
		div2.html(d.properties.nom_long)
		    // on rÃ©cupÃ¨re la position de la souris et dÃ©plaÃ§ons la fenÃªtre qui apparait de quelques pixels
		   .style("left", (d3.event.pageX + 30) + "px")
		   .style("top", (d3.event.pageY - 30) + "px");
	    })
	    .on("mouseout", function(d) {
		div2.style("opacity", 0)
		div2.html("")
		    // On le dÃ©place en dehors de la zone visible car mÃªme avec une opacitÃ© de 0 il recouvert les autres communes
		   .style("left", "-500px")
		   .style("top", "-500px");
	    });


svg_pollution.append("text")
    .attr("x", (width / 1.8))
    .attr("y", 45)
    .attr("text-anchor", "middle")
    .style("fill", "#666f77")
    .style("font-weight", "500")
    .style("font-size", "20px")
    .text("Concentration moyenne des particules fines PM10 en 2017");


svg_pollution.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (15) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Concentration en PM10 en µg/m3")
            .style("fill", "#666f77")
    .style("font-weight", "500")
    .style("font-size", "14px");

    //////////////////////:Map Pollution2 ////////////////////////////////:

  var legend_pollution2 = svg_pollution2.append('g')
    .attr('transform', 'translate(150, 250)')
    .attr('id', 'legend_pollution2');
    
    legend_pollution2.selectAll()
      .data(d3.range(colors_pollution2.length))
      .enter().append('svg:rect')
        .attr('height', '10px')
        .attr('width', '10px')
        .attr('y', 0.5)
        .attr('x', function(d) { return d*10; })
        .style("fill", function(d) { 
          return colors_pollution2[d]; });
    
  var features_pollution2 = deps_pollution2
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr('id', function(d) {return "p2" + d.properties.insee;})// ATTENTION au "d"
    .attr("d", path2);

  var quantile_pollution2 = d3.scaleQuantile()
    .domain([d3.min(csv, function(e) {return + e.pm10}), d3.max(csv, function(e) { return + e.pm10; })])
    .range(colors_pollution2);
        
  var legendScale_pollution2 = d3.scaleLinear()
    .domain([d3.min(csv, function(e) {return + e.pm10}), d3.max(csv, function(e) { return +e.pm10; })])
    .range([0, colors_pollution2.length * 10]);
      
  var legendAxis_pollution2 = svg_pollution2.append("g")
    .attr('transform', 'translate(150, 250)')
    .call(d3.axisTop(legendScale_pollution2).ticks(5));

      
  csv.forEach(function(e,i) {
    d3.select(("#p2" +  e.insee))
      .style("fill", function(d) { return quantile_pollution2(+e.pm10); })
      .attr("class", "department")
      .on("mouseover", function(d) {
        div.transition()        
          .duration(200)      
          .style("opacity", .9);
        div.html("<b>Commune : </b>" + e.nom.toUpperCase() + "</br>"
			+ "<b>Taux de PM10 : </b>" + e.pm10 + " µg/m<sup>3</sup>" + "<br>")
          .style("left", (d3.event.pageX + 30) + "px")     
          .style("top", (d3.event.pageY - 30) + "px");
      })
      .on("mouseout", function(d) {
        div.style("opacity", 0);
        div.html("")
          .style("left", "-500px")
          .style("top", "-500px");
      });
  });

  contours_paris_pollution2.selectAll("path")
                .data(geojson_contours.features)
                .enter()
                .append("path")
                .attr("d", path2)
                .style("stroke", "#21211f")/*"#404038")"#807E7E")*/
                .style("stroke-width", "1.5px")
                .style("opacity", 1);


	ligne_pollution2.selectAll("path")
	    .data(geojson_rer.features)
	    .enter()
	    .append("path")
	    .attr("d", path2)
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "1.5px");

	stations_pollution2.selectAll("path")
	    .data(geojson_stations.features)
	    .enter()
	    .append("path")
	    .attr("d", path2)
      .attr('id', 'stations')
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "1.5px")
	    .on("mouseover", function(d) {
		div2.transition()
		   .duration(200)
		   .style("opacity", 0.9);
		div2.html(d.properties.nom_long)
		    // on rÃ©cupÃ¨re la position de la souris et dÃ©plaÃ§ons la fenÃªtre qui apparait de quelques pixels
		   .style("left", (d3.event.pageX + 30) + "px")
		   .style("top", (d3.event.pageY - 30) + "px");
	    })
	    .on("mouseout", function(d) {
		div2.style("opacity", 0)
		div2.html("")
		    // On le dÃ©place en dehors de la zone visible car mÃªme avec une opacitÃ© de 0 il recouvert les autres communes
		   .style("left", "-500px")
		   .style("top", "-500px");
	    });


svg_pollution2.append("svg:text")
    .attr("x", 20)
    .attr("y", 30)
    .attr("text-anchor", "left")
    .style("fill", "#666f77")
    .style("text-decoration","underline")
    .style("font-weight", "500")
    .style("font-size", "15px")
    .text("Concentration moyenne en PM10 :");


svg_pollution2.append("text")
            .attr("text-anchor", "left")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ 145 +","+(275)+")rotate(0)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Concentration en PM10 (µg/m3)")
            .style("fill", "#fff")
    .style("font-weight", "300")
    .style("font-size", "11px")
    .style("fill", "#555f66");





//////////////////////:Map Education ////////////////////////////////:

  var legend_education = svg_education.append('g')
    .attr('transform', 'translate(20, 150)')
    .attr('id', 'legend_education');
    
    legend_education.selectAll()
      .data(d3.range(colors_education.length))
      .enter().append('svg:rect')
        .attr('height', '20px')
        .attr('width', '20px')
        .attr('x', 1)
        .attr('y', function(d) { return d *20; })
        .style("fill", function(d) { return colors_education[d]; });
    
  var features_education = deps_education
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr('id', function(d) {return "p" + d.properties.insee;})// ATTENTION au "d"
    .attr("d", path);

  var quantile_education = d3.scaleQuantile()
    .domain([d3.min(csv, function(e) {return (e.dipl_su_tx * 100);}), d3.max(csv, function(e) { return (e.dipl_su_tx * 100); })])
    .range(colors_education);
        
  var legendScale_education = d3.scaleLinear()
    .domain([d3.min(csv, function(e) {return (e.dipl_su_tx * 100);}), d3.max(csv, function(e) { return (e.dipl_su_tx * 100); })])
    .range([0, colors_education.length * 20]);
      
  var legendAxis_education = svg_education.append("g")
    .attr('transform', 'translate(40, 150)')
    .call(d3.axisRight(legendScale_education).ticks(8));

      
  csv.forEach(function(e,i) {
    d3.select(("#p" +  e.insee))
      .style("fill", function(d) { return quantile_education(e.dipl_su_tx * 100); })
      .attr("class", "department")
      .on("mouseover", function(d) {
        div.transition()        
          .duration(200)      
          .style("opacity", .9);
        div.html("<b>Commune : </b>" + e.nom.toUpperCase() + "</br>"
			+ "<b>Part de diplômés du supérieur : </b>" + Math.round((e.dipl_su_tx * 100)) + " %" + "<br>")
          .style("left", (d3.event.pageX + 30) + "px")     
          .style("top", (d3.event.pageY - 30) + "px");
      })
      .on("mouseout", function(d) {
        div.style("opacity", 0);
        div.html("")
          .style("left", "-500px")
          .style("top", "-500px");
      });
  });

  contours_paris_education.selectAll("path")
                .data(geojson_contours.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("stroke", "#21211f")/*"#404038")"#807E7E")*/
                .style("stroke-width", "1.5px")
                .style("opacity", 1);


	ligne_education.selectAll("path")
	    .data(geojson_rer.features)
	    .enter()
	    .append("path")
	    .attr("d", path)
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "5px");

	stations_education.selectAll("path")
	    .data(geojson_stations.features)
	    .enter()
	    .append("path")
	    .attr("d", path)
      .attr('id', 'stations')
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "3px")
	    .on("mouseover", function(d) {
		div2.transition()
		   .duration(200)
		   .style("opacity", 0.9);
		div2.html(d.properties.nom_long)
		    // on rÃ©cupÃ¨re la position de la souris et dÃ©plaÃ§ons la fenÃªtre qui apparait de quelques pixels
		   .style("left", (d3.event.pageX + 30) + "px")
		   .style("top", (d3.event.pageY - 30) + "px");
	    })
	    .on("mouseout", function(d) {
		div2.style("opacity", 0)
		div2.html("")
		    // On le dÃ©place en dehors de la zone visible car mÃªme avec une opacitÃ© de 0 il recouvert les autres communes
		   .style("left", "-500px")
		   .style("top", "-500px");
	    });


svg_education.append("text")
    .attr("x", (width / 1.8))
    .attr("y", 45)
    .attr("text-anchor", "middle")
    .style("fill", "#666f77")
    .style("font-weight", "500")
    .style("font-size", "20px")
    .text("Part d'individus avec un diplôme");

svg_education.append("text")
    .attr("x", (width / 1.8))
    .attr("y", 68)
    .attr("text-anchor", "middle")
    .style("fill", "#666f77")
    .style("font-weight", "500")
    .style("font-size", "20px")
    .text("de l'enseignement supérieur en 2017");



svg_education.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (15) +","+(height/2.5)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Taux de diplômés (%)")
            .style("fill", "#666f77")
    .style("font-weight", "500")
    .style("font-size", "14px")
    .style("fill", "#555f66");


    //////////////////////:Map Education2 ////////////////////////////////:

  var legend_education2 = svg_education2.append('g')
    .attr('transform', 'translate(190, 250)')
    .attr('id', 'legend_education2');
    
    legend_education2.selectAll()
      .data(d3.range(colors_education2.length))
      .enter().append('svg:rect')
        .attr('height', '10px')
        .attr('width', '10px')
        .attr('y', 0.5)
        .attr('x', function(d) { return d *10; })
        .style("fill", function(d) { return colors_education2[d]; });
    
  var features_education2 = deps_education2
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr('id', function(d) {return "k" + d.properties.insee;})// ATTENTION au "d"
    .attr("d", path2);

  var quantile_education2 = d3.scaleQuantile()
    .domain([d3.min(csv, function(e) {return (e.dipl_su_tx * 100);}), d3.max(csv, function(e) { return (e.dipl_su_tx * 100); })])
    .range(colors_education2);
        
  var legendScale_education2 = d3.scaleLinear()
    .domain([d3.min(csv, function(e) {return (e.dipl_su_tx * 100);}), d3.max(csv, function(e) { return (e.dipl_su_tx * 100); })])
    .range([0, colors_education2.length * 10]);
      
  var legendAxis_education2 = svg_education2.append("g")
    .attr('transform', 'translate(190, 250)')
    .call(d3.axisTop(legendScale_education2).ticks(8));

      
  csv.forEach(function(e,i) {
    d3.select(("#k" +  e.insee))
      .style("fill", function(d) { return quantile_education2((e.dipl_su_tx * 100)); })
      .attr("class", "department")
      .on("mouseover", function(d) {
        div.transition()        
          .duration(200)      
          .style("opacity", .9);
        div.html("<b>Commune : </b>" + e.nom.toUpperCase() + "</br>"+  "<b>Part de diplômés du supérieur : </b>" + Math.round(e.dipl_su_tx * 100) + " %"  + "<br>")
          .style("left", (d3.event.pageX + 30) + "px")     
          .style("top", (d3.event.pageY - 30) + "px");
      })
      .on("mouseout", function(d) {
        div.style("opacity", 0);
        div.html("")
          .style("left", "-500px")
          .style("top", "-500px");
      });
  });

  contours_paris_education2.selectAll("path")
                .data(geojson_contours.features)
                .enter()
                .append("path")
                .attr("d", path2)
                .style("stroke", "#21211f")/*"#404038")"#807E7E")*/
                .style("stroke-width", "1.5px")
                .style("opacity", 1);


	ligne_education2.selectAll("path")
	    .data(geojson_rer.features)
	    .enter()
	    .append("path")
	    .attr("d", path2)
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "1.5px");

	stations_education2.selectAll("path")
	    .data(geojson_stations.features)
	    .enter()
	    .append("path")
	    .attr("d", path2)
      .attr('id', 'stations')
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "1.5px")
	    .on("mouseover", function(d) {
		div2.transition()
		   .duration(200)
		   .style("opacity", 0.9);
		div2.html(d.properties.nom_long)
		    // on rÃ©cupÃ¨re la position de la souris et dÃ©plaÃ§ons la fenÃªtre qui apparait de quelques pixels
		   .style("left", (d3.event.pageX + 30) + "px")
		   .style("top", (d3.event.pageY - 30) + "px");
	    })
	    .on("mouseout", function(d) {
		div2.style("opacity", 0)
		div2.html("")
		    // On le dÃ©place en dehors de la zone visible car mÃªme avec une opacitÃ© de 0 il recouvert les autres communes
		   .style("left", "-500px")
		   .style("top", "-500px");
	    });


svg_education2.append("text")
    .attr("x", 20)
    .attr("y", 30)
    .attr("text-anchor", "left")
    .style("text-decoration", "underline")
    .style("fill", "#666f77")
    .style("font-weight", "500")
    .style("font-size", "15px")
    .text("Part des diplômés du supérieur :");


svg_education2.append("text")
            .attr("text-anchor", "left")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (180) +","+(275)+")rotate(0)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Taux de diplômés (%)")
            .style("fill", "#666f77")
    .style("font-weight", "300")
    .style("font-size", "11px")
    .style("fill", "#555f66");



 
/////////////////////////// //////////////////////////// Map Election ////////////////////////////////////////////////////////////////////
    
  var features_election = deps_election
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr('id', function(d) {return "e" + d.properties.insee;})// ATTENTION au "d"
    .attr("d", path);

      
  csv2.forEach(function(e,i) {
    d3.select(("#e" +  e.insee))
      .style("fill", e.candidat_couleur)
      .attr("class", "department")
      .on("mouseover", function(d) {
        div.transition()        
          .duration(200)      
          .style("opacity", .9);
        div.html("<b>Commune : </b>" + e.nom.toUpperCase() + "</br>" + "<b>Candidat en tête : </b>" + e.Tour1Candidat1)
          .style("left", (d3.event.pageX + 30) + "px")     
          .style("top", (d3.event.pageY - 30) + "px");
      })
      .on("mouseout", function(d) {
        div.style("opacity", 0);
        div.html("")
          .style("left", "-500px")
          .style("top", "-500px");
      });
  });

  contours_paris_election.selectAll("path")
                .data(geojson_contours.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("stroke", "#21211f")/*"#404038")"#807E7E")*/
                .style("stroke-width", "1.5px")
                .style("opacity", 1);


	ligne_election.selectAll("path")
	    .data(geojson_rer.features)
	    .enter()
	    .append("path")
	    .attr("d", path)
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "5px");

	stations_election.selectAll("path")
	    .data(geojson_stations.features)
	    .enter()
	    .append("path")
	    .attr("d", path)
      .attr('id', 'stations')
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "3px")
	    .on("mouseover", function(d) {
		div2.transition()
		   .duration(200)
		   .style("opacity", 0.9);
		div2.html(d.properties.nom_long)
		    // on rÃ©cupÃ¨re la position de la souris et dÃ©plaÃ§ons la fenÃªtre qui apparait de quelques pixels
		   .style("left", (d3.event.pageX + 30) + "px")
		   .style("top", (d3.event.pageY - 30) + "px");
	    })
	    .on("mouseout", function(d) {
		div2.style("opacity", 0)
		div2.html("")
		    // On le dÃ©place en dehors de la zone visible car mÃªme avec une opacitÃ© de 0 il recouvert les autres communes
		   .style("left", "-500px")
		   .style("top", "-500px");
	    });

///////////////////////////////Map Election 2 ////////////////////////////////////////////// 

  var features_election2 = deps_election2
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr('id', function(d) {return "l" + d.properties.insee;})// ATTENTION au "d"
    .attr("d", path2);

      
  csv2.forEach(function(e,i) {
    d3.select(("#l" +  e.insee))
      .style("fill", e.candidat_couleur)
      .attr("class", "department")
      .on("mouseover", function(d) {
        div.transition()        
          .duration(200)      
          .style("opacity", .9);
        div.html("<b>Commune : </b>" + e.nom.toUpperCase() +  "</br>" + "<b>Candidat en tête : </b>" + e.Tour1Candidat1)
          .style("left", (d3.event.pageX + 30) + "px")     
          .style("top", (d3.event.pageY - 30) + "px");
      })
      .on("mouseout", function(d) {
        div.style("opacity", 0);
        div.html("")
          .style("left", "-500px")
          .style("top", "-500px");
      });
  });

  contours_paris_election2.selectAll("path")
                .data(geojson_contours.features)
                .enter()
                .append("path")
                .attr("d", path2)
                .style("stroke", "#21211f")/*"#404038")"#807E7E")*/
                .style("stroke-width", "1.5px")
                .style("opacity", 1);


	ligne_election2.selectAll("path")
	    .data(geojson_rer.features)
	    .enter()
	    .append("path")
	    .attr("d", path2)
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "1.5px");

	stations_election2.selectAll("path")
	    .data(geojson_stations.features)
	    .enter()
	    .append("path")
	    .attr("d", path2)
      .attr('id', 'stations')
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "1.5px")
	    .on("mouseover", function(d) {
		div2.transition()
		   .duration(200)
		   .style("opacity", 0.9);
		div2.html(d.properties.nom_long)
		    // on rÃ©cupÃ¨re la position de la souris et dÃ©plaÃ§ons la fenÃªtre qui apparait de quelques pixels
		   .style("left", (d3.event.pageX + 30) + "px")
		   .style("top", (d3.event.pageY - 30) + "px");
	    })
	    .on("mouseout", function(d) {
		div2.style("opacity", 0)
		div2.html("")
		    // On le dÃ©place en dehors de la zone visible car mÃªme avec une opacitÃ© de 0 il recouvert les autres communes
		   .style("left", "-500px")
		   .style("top", "-500px");
	    });

  
    svg_election2.append("foreignObject")
    .attr("transform", "translate(" + (190) +","+(240)+")rotate(0)")
    .attr("width", 97)
    .attr("height", 26)
    .append("xhtml:div")
    .html('<img src="images/lgd_election_3.png", style="widht:97px;height:25px;"></img>')
    .style("bottom", "0px");
    
     ///////////////////////////////////////////////////////////////////////////// 

  
     
});

  d3.select("#map_election2").append("img")
            .attr({"src":"images/lgd_election_3.png"});

   svg_election.append("text")
    .attr("x", (width / 2))
    .attr("y", 45)
    .attr("text-anchor", "middle")
    .style("fill", "#666f77")
    .style("font-weight", "500")
    .style("font-size", "20px")
    .text("Résultats du premier tour des élections présidentielles de 2017");



   svg_election2.append("text")
    .attr("x", 20)
    .attr("y", 30)
    .attr("text-anchor", "left")
    .style("fill", "#666f77")
    .style("font-weight", "500")
    .style("font-size", "15px")
    .style("text-decoration", "underline")
    .text("Résultats du 1er tour des présidentielles :");

  
  
  // Append a DIV for the tooltip
  var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

  var div2 = d3.select("body").append("div2")   
    .attr("class", "tooltip2")               
    .style("opacity", 0);

const colors_pop_slider = ["#FFF5F0","#ffeee6" ,"#FEE0D2" ,"#FCBBA1", "#FC9272", "#FB6A4A", "#EF3B2C", "#CB181D", "#A50F15", "#67000D"];


var count = 0;

function affichage_carte(geojson) {

  if (count > 0) {
    d3.select("svg").remove();
  }

  //console.log('1');

  var svg = d3.select('#map_pop').append("svg")
                                .attr("id", "svg_noticeMe")
                                .attr("width", width)
                                .attr("height", height)
                                .attr('fill', 'none');



    svg.append("foreignObject")
    .attr("transform", "translate(" + (width * 2 / 3) +","+(height - 200)+")rotate(0)")
    .attr("width", width / 2)
    .attr("height", 100)
    .append("xhtml:div")
    .html('<i class="fa fa-info-circle"></i>&nbsp;&nbsp;Je suis interactive, <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;essayez-moi !')
    .style("color", "#A50F15")//""#C17F1B ")// "#66ff33")
    .attr("class", "animated flash slower infinite")
    .style("bottom", "0px");



  var deps = svg.append("g");

  var quantile = d3.scaleQuantile()
                  .domain([d3.min(geojson.features, function(d) { 
                                                      return  +d.properties.pct_ch_2; }), 
                          d3.max(geojson.features, function(d) { 
                                                      return  +d.properties.pct_ch_2; })
                          ])
                    .range(colors_pop_slider);

  var legend = svg.append('g')
                  .attr('transform', 'translate(20, 150)')
                  .attr('id', 'legend');

  svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (15) +","+(height/2.42)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Taux d'accroissement de la population (%)")
            .style("fill", "#666f77")
    .style("font-weight", "500")
    .style("font-size", "14px");


  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 25)
    .attr("text-anchor", "middle")
    .style("fill", "#666f77")
    .style("font-weight", "500")
    .style("font-size", "20px")
    .text("Evolution de la ligne du RER B et de la croissance de la population");

    svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 48)
    .attr("text-anchor", "middle")
    .style("fill", "#666f77")
    .style("font-weight", "500")
    .style("font-size", "20px")
    .text(" de 1962 à 2017");
 
    
        
  legend.selectAll()
        .data(d3.range(colors_pop_slider.length))
        .enter().append('svg:rect')
        .attr('height', '20px')
        .attr('width', '20px')
        .attr('x', 1)
        .attr('y', function(d) { return d * 20; })
        .style("fill", function(d) { return colors_pop_slider[d]; });
	
  var legendScale = d3.scaleLinear()
                      .domain([ d3.min(geojson.features, function(d) { 
                                    return  +d.properties.pct_ch_2; 
                                                          }), 
                                d3.max(geojson.features, function(d) { 
                                     return  +d.properties.pct_ch_2; 
                                     })
                              ])
                      .range([0, colors_pop_slider.length * 20]);
	      
	var legendAxis = svg.append("g")
                      .attr('transform', 'translate(40, 150)')
                      .call(d3.axisRight(legendScale).ticks(9));

	var div = d3.select("body").append("div")   
                              .attr("class", "tooltip")               
                              .style("opacity", 0);
                     
  var communes = svg.selectAll("path")
                    .data(geojson.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("class", "department")
                    .style("stroke", "black")
                    .style("fill", function(d) { 
                      return quantile(d.properties.pct_ch_2);
                      });


	communes.on("mouseover", function(d) {
                div.transition()
                   .duration(200)
                   .style("opacity", 0.9);
                div.html("<b>Commune : </b>" + d.properties.nom.toUpperCase() +  "<br/>" + "<b>Taux d'accroissement de la population : </b>" + d.properties.pct_ch_2.toFixed(0) + " %")
                   .style("left", (d3.event.pageX + 30) + "px")
                   .style("top", (d3.event.pageY - 30) + "px");
            })
            .on("mouseout", function(d) {
                div.style("opacity", 0)
                div.html("")
                   .style("left", "-500px")
                   .style("top", "-500px");
            });

  count++;        
};



var slider_2 = d3.select("#slider_2")
            .append("input")
            .attr("class", "slider2")
            .attr("type", "range")
            .attr("min", 2)
            .attr("max", 10)
            .attr("step", 1)
            .style("width", "350px")
            .on("input", function() {
              var year = this.value;
              Dataget(year);
            });


function affichage_stations(geojson) {

  //console.log('2');

  var svg = d3.select('svg').attr("id", "svg")
                                .attr("width", width)
                                .attr("height", height)
                                .attr('fill', 'none');
  
  const ligne = svg.append("g");

  ligne.selectAll("path")
	    .data(geojson.features)
	    .enter()
	    .append("path")
	    .attr("d", path)
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "5px");

}

function affichage_lignes(geojson) {

  //console.log('3');

  var svg = d3.select('svg').attr("id", "svg")
                                .attr("width", width)
                                .attr("height", height)
                                .attr('fill', 'none');
  
  const stations = svg.append("g");

  
	stations.selectAll("path")
	    .data(geojson.features)
	    .enter()
	    .append("path")
	    .attr("d", path)
      .attr('id', 'stations')
	    .style("stroke", "#7BA3DC")
	    .style("stroke-width", "3px")
	    .on("mouseover", function(d) {
		div2.transition()
		   .duration(200)
		   .style("opacity", 0.9);
		div2.html(d.properties.nom_long)
		    // on rÃ©cupÃ¨re la position de la souris et dÃ©plaÃ§ons la fenÃªtre qui apparait de quelques pixels
		   .style("left", (d3.event.pageX + 30) + "px")
		   .style("top", (d3.event.pageY - 30) + "px");
	    })
	    .on("mouseout", function(d) {
		div2.style("opacity", 0)
		div2.html("")
		    // On le dÃ©place en dehors de la zone visible car mÃªme avec une opacitÃ© de 0 il recouvert les autres communes
		   .style("left", "-500px")
		   .style("top", "-500px");
	    });

}  

function affichage_paris(geojson) {

  //console.log('3');

  var svg = d3.select('svg').attr("id", "svg")
                                .attr("width", width)
                                .attr("height", height)
                                .attr('fill', 'none');
  
  const contour_paris = svg.append("g");


	contour_paris.selectAll("path")
                .data(geojson.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("id", "paris")
                .style("stroke", "#21211f")/*"#404038")"#807E7E")*/
                .style("stroke-width", "1.5px")
                .style("opacity", 1);

} 

var dict = {"2":"1962",
            "3":"1968",
            "4":"1975",
            "5":"1982",
            "6":"1990",
            "7":"1999",
            "8":"2006",
            "9":"2012",
            "10":"2017"
            }

function afficher_text(year){
  if(year=="2"){
    return ("Au début des années 1960, le RER B, encore appelé la ligne de Sceaux, relie Saint-Rémy-Lès-Chevreuse à Denfert-Rochereau. Dans le même temps, la banlieue commence à s'organiser autour de nouveaux pôles comme Massy et de grands ensembles surgissent au milieu des anciens champs de blé. ");
  }
  else if (year=="3"){
    return ("Dans les années 1960, l'Ile-de-France construit massivement de nouveaux logements, mais a du mal à gérer cette population grandissante et les travailleurs résidant en banlieue sont toujours très mal desservis par les transports. En 1968, la ligne du RER B sera étendue jusqu'à Luxembourg");
  }
  else if (year=="4"){
    return ("Le 8 décembre 1977, la ligne de Sceaux devient officiellement la ligne B du RER et est prolongée jusqu'à Châtelet–Les-Halles. En parallèle, la population parisienne se métamorphose. Les cadres s'installent dans la capitale tandis que les ouvriers la quittent. Les résidences se voient remplacer par des bureaux.");
  }
  else if(year=='5'){
    return ("En 1983, le RER B est interconnecté au réseau Paris Nord et les premiers RER font le lien entre le Nord et le Sud de Paris. Une relève de conducteur SNCF/Transilien est mise en place.");
  }
    else if(year=='6'){
    return ("En 1988, ouvrent les gares de Saint-Michel-Notre-Dame et de Port Royal, l'interconnexion est encore renforcée avec 20 trains par heure.");
  }
   else if(year=="7"){
    return ("En 1998, à l'occasion de la coupe du monde de football, la gare de La Plaine - Stade de France ouvre ses portes.");
  }
    else if(year=="8"){
    return ("En 2006 et pour la première fois depuis un demi-siècle, l'INSEE note un accroissement de la population parisienne. Celui-ci s'explique notamment par la forte métropolisation de la ville et l'augmentation de son taux de natalité.");
  }
    else if(year=="9"){
    return ("Face à la vetusté des trains du RER B qui n'ont pas été rénovés depuis les années 70, des travaux de réhabilitation et de modernisation sont lancés. Ce projet dit RER B + prend fin en 2012.");
  }
    else if(year=="10"){
    return ("Aujourd'hui l'acroissement de la population se fait principalement grâce à la banlieue alors que Paris semble se vider de ses habitants. La forte hausse des loyers et des prix immobiliers est la principale raison de cette fuite. Le Grand Paris aura certainement des conséquences démographiques importantes dans les prochaines années.");
  }
  else {
    return ("");
  }
};


function afficher_image(year){
  if(year=="2"){
    return ("images/ligne_sceaux.jpg");
  }
  else if (year=="3"){
    return ("http://a53.idata.over-blog.com/5/11/93/62/1828537989_392724645c-copie-1.jpg");
  }
  else if (year=="4"){
    return ("https://rera-leblog.fr/wp-content/uploads/2016/11/inauguration-rera-1977-giscard-destaing.jpg");/*https://www.laviedurail.com/rp/wp-content/uploads/sites/3/2018/01/72A-7506n01246.jpg*/
  }
  else if(year=='5'){
    return ("http://www.leparisien.fr/resizer/fPfkBDbM-iEKdnp55wFP7ufVi8o=/1212x1280/arc-anglerfish-eu-central-1-prod-leparisien.s3.amazonaws.com/public/E5GWTQAJ6WT7KAKWL74KDE7XJQ.jpg");
  }
  /*https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Paris-Nord_construction.jpg/1920px-Paris-Nord_construction.jpg*/
  else if(year=='6'){
    return ("https://www.peintures-tableaux.com/pic/Oil%20Painting%20Masterpieces%20on%20Canvas/Antoine%20Blanchard_French%201910-1988/7-antoine-blanchard-quai-st-michel-notre-dame.jpg");
  }
    else if(year=='7'){
    return ("https://static.ruedufootball.com/images/cdm/archives/france-1998.jpg");
  }
    else if(year=="8"){
    return ("https://uploads.lebonbon.fr/source/2019/january/h7xphjeacu_2_675.jpg");
  }
  else if(year=="9"){
    return ("https://www.challenges.fr/assets/img/2017/12/11/cover-r4x3w1000-5a2ea1468de98-sipa-00520822-000007-1.jpg"); /*https://www.mesopinions.com/public/img/petition/petition-img-41261-fr.jpeg*/
  }
    else if(year=="10"){
    return ("https://www.jerevedunemaison.com/hs-fs/hubfs/Haussmannien%20copie.jpg?width=690&height=460&name=Haussmannien%20copie.jpg");
  }
  else {
    return ("");
  }
};
// FIN ESSAI*/

var nb_img = 0;

function Dataget(year) {

  d3.json("https://raw.githubusercontent.com/cerezamo/dataviz/master/Graphique_bokeh/communes_pop2" 
            + year
            + ".geojson")
            .then(function(data) {
                    var theData = data;
                    affichage_carte(theData);
                    slider_2.property("value", year);
                    d3.select(".year").text(dict[year]);
                    d3.select(".text_map").text(afficher_text(year))
                                          .style('height', "210px")
                                          .style('width', "350px");

                    if (nb_img > 0) {d3.select("#pop_com").select("img").remove();}
                
                    d3.select("#pop_com").append("img")
                                          .attr("src", afficher_image(year))
                                          .attr('width', "350px")
                                          .attr('height', "260px")
                                          .style("position", "absolute")
                                          .style("opacity", "0.7")
                                          .style("border-radius", "30px")
                                          .style("box-shadow", "0 0 20px dimgrey");
                       
                    nb_img += 1;
                    


                     setTimeout(function(){
                             d3.json("https://raw.githubusercontent.com/cerezamo/dataviz/master/contours_paris2.geojson")
                                      .then(function(data) {
                                              var theData = data;
                                              affichage_paris(theData)
                                              setTimeout(function(){
                                              d3.json("https://raw.githubusercontent.com/cerezamo/dataviz/master/Graphique_bokeh/rer2" 
                                                        + year
                                                        + ".geojson")
                                                        .then(function(data) {
                                                                var theData = data;
                                                                affichage_stations(theData)
                                                                setTimeout(function(){
                                                                  d3.json("https://raw.githubusercontent.com/cerezamo/dataviz/master/Graphique_bokeh/stations2" 
                                                                  + year
                                                                  + ".geojson")
                                                                        .then(function(data) {
                                                                          var theData=data;
                                                                          affichage_lignes(theData)
                                                                        });

                                                                },5);
                                                              });
                                                }, 5);
                                            });
                        }, 5);
                  });

"https://raw.githubusercontent.com/cerezamo/dataviz/master/contours_paris2.geojson"
};

Dataget(2);

$(document).ready(function() {
  $('#depart').on('click', function() {
 // Au clic sur un élément
    var page = $(this).attr('href'); // Page cible
    var speed = 750; // Durée de l'animation (en ms)
    $('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
    return false;
  });
});

////////////////// Création d'évènements ////////////////////////

var mesSections = document.getElementsByClassName("testEvent");

for (var i = 0; i < mesSections.length; i++) {
  mesSections[i].addEventListener("mouseover", function() {

    var mesTitres = this.getElementsByTagName("h4");

    for (var j = 0; j < mesTitres.length; j++) {

    this.getElementsByTagName("h4")[j].classList.remove('invisible');
    this.getElementsByTagName("h4")[j].classList.add('animated', 'fadeIn', 'slow');
    };
  });
};


document.getElementById("blockTitre").addEventListener("mouseover", function() {
  document.getElementById("titre").classList.remove('invisible');
  document.getElementById("titre").classList.add('animated', 'fadeInLeft', 'slow');
});