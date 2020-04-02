$(function () {
  
    const width = 850, 

    height = 800,

 
 

  colors = [ '#ffc299','#ffb380', '#ffa366', '#ff944d', '#ff8533', '#ff751a', '#ff6600', '#e65c00', '#cc5200', '#b34700', '#993d00', '#803300', '#662900', '#4d1f00'];

  const path = d3.geoPath();

  

  const projection = d3.geoMercator()

    .center([2.332978, 48.860117])

    .scale(40000)

    .translate([width / 2, height / 2]);

  

  path.projection(projection);

 

  const svg = d3.select('#mapp').append("svg")

    .attr("id", "svg")

    .attr("width", width)

    .attr("height", height)

    .attr('fill', 'none')

    .attr("class", "Blues");



  // Append the group that will contain our paths

  const deps = svg.append("g");

  

  // const geojson = d3.json("departments.json");

   //const geojson = getDepartments();

  // const csv = d3.csv("population.csv");

  //const csv = getPopulations();



  var promises = [];

    promises.push(d3.json('https://raw.githubusercontent.com/cerezamo/dataviz/master/Graphique_bokeh/pop_comgeo.geojson'))

    promises.push(d3.csv("https://raw.githubusercontent.com/cerezamo/dataviz/master/variables_rounded.csv"))



  Promise.all(promises).then(function(values){

    const geojson = values[0];

    const csv = values[1];

  

    

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



  var legend = svg.append('g')

    .attr('transform', 'translate(725, 150)')

    .attr('id', 'legend');

    

    legend.selectAll()

      .data(d3.range(colors.length))

      .enter().append('svg:rect')

        .attr('height', '20px')

        .attr('width', '20px')

        .attr('x', 5)

        .attr('y', function(d) { return d * 20; })

        .style("fill", function(d) { return colors[d]; });

        

  var legendScale = d3.scaleLinear()

    .domain([0, d3.max(csv, function(e) { return +e.TauxChomage; })])

    .range([0, colors.length * 20]);

      

  var legendAxis = svg.append("g")

    .attr('transform', 'translate(750, 150)')

    .call(d3.axisRight(legendScale).ticks(3));

svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 25)
    .attr("text-anchor", "middle")
    .style("fill", "#333300")
    .style("font-weight", "300")
    .style("font-size", "16px")
    .text("Taux de chômage par commune en 2016");

svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .style("fill", "#929292")
    .style("font-weight", "200")
    .style("font-size", "12px")
    .text("(Source : INSEE -- Base Comparateur de Territoires)");



      

  csv.forEach(function(e,i) {

     console.log("#d" +  e.insee);

    d3.select(("#d" +  e.insee))

      .style("fill", function(d) { return quantile(+e.TauxChomage); })

      .on("mouseover", function(d) {

        div.transition()        

          .duration(200)      

          .style("opacity", .9);

        div.html("<b>Commune : </b>" + " ..." + "</br>"+
		"<b>Code commune : </b>" + e.insee + "</br>"+
		"<b>Taux de chômage : </b>" + e.TauxChomage + "%" + "<br>")

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



  //console.log(csv.insee);



});
 // Append a DIV for the tooltip

  var div = d3.select("body").append("div")   

    .attr("class", "tooltip")               

    .style("opacity", 0);





})

