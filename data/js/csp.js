$(function () {

  var optionsEvolNb = {
    chart:{renderTo: 'second_graph', type:'column'},
  
    title: {
        text: 'Structure de la population active par catégorie socio-professionnelle dans les départements traversés par le RER B (2016)'
    },
	  subtitle: {
		  text: 'Source: INSEE'
	  },
    xAxis: {
        categories: ['Paris','Hauts-de-Seine','Yvelines','Val-de-Marne','Essonne',"Val-d'Oise",'Seine-et-Marne','Seine-Saint-Denis','Ensemble des départements']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Part des CSP (%)'
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr><br/>',
        shared: true
    },
    plotOptions: {
        column: {
            stacking: 'percent'
        }
    },
    series: [{
        name: 'Part des agriculteurs exploitants',
        data: [0.0,0.0,0.1,0.0,0.1,0.1,0.4,0.0,0.1]
    }, {
        name: 'Autres',
        data: [1.3,1.3,1.1,1.7,1.5,1.8,1.3,3.2,1.7]
    }, {
        name: 'Part des ouvriers',
        data: [6.8,8.6,12.5,14.0,16.3,17.5,18.5,21.8,14.5]
    }, {
        name: 'Part des employés',
        data: [19.3,22.6,24.8,28.6,28.0,30.3,30.6,33.3,27.2,]
    }, {
        name: 'Part des professions interméd.',
        data: [22.8,24.3,26.9,26.2,28.2,27.7,28.1,22.7,25.9,]
    }, {
        name: 'Part des cadres, professions intellect. supérieures',
        data: [44.6,38.3,29.9,24.6,21.6,17.9,16.2,14.1,25.9,]
    }, {
        name: 'Part des artisans, comm., chefs d’entr.',
        data: [5.2,4.8,4.7,4.8,4.3,4.7,4.9,4.9,4.8]
    }]
  };
    var chartEvolNb = new Highcharts.Chart(Highcharts.merge(optionsEvolNb, null));


   
});
    