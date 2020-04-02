$(function () {

  var optionsEvolNb = {
    chart:{
      renderTo: 'graph_niveau_de_vie',
      backgroundColor: '#c9c9c9',

    },
    title: {
             style: {
            color: "#666f77",
        },
		text: '<b>Niveau de vie le long du RER B en 2016</b>'
	    },

	    /*subtitle: {
		text: 'Source: INSEE',
    style: {
            color: '#555f66'
         }
	    },*/

	    yAxis: {
		title: {
		    text: "Revenu disponible moyen <br> (en milliers d'euros annuels)",
       style : {color: "#666f77", fontSize:"14px", fontWeight:"500"}
		}
	    },

	    xAxis: {
		categories : ["SAINT-REMY-LES-CHEVREUSE", "GIF-SUR-YVETTE", "BURES-SUR-YVETTE", "ORSAY", "PALAISEAU", "MASSY", "ANTONY", "BOURG-LA-REINE", "ARCUEIL", "GENTILLY", "PARIS: 3,5,10,14E ARDT", "SAINT-DENIS", "LA COURNEUVE", "LE BOURGET", "DRANCY", "LE BLANC-MESNIL", "AULNAY-SOUS-BOIS", "VILLEPINTE", "ROISSY-EN-FRANCE"]
	    ,
      labels: {
         style: {
            color: '#555f66'
         }
        }
      },

	    legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          color: 'white'
	    },

	    plotOptions: {
		categories: {
		    label: {
		        connectorAllowed: false
		    },
		    pointStart: 2010
		}
	    },

	    series: [{
    showInLegend: false, 
		name: 'Niveau de vie',
		data: [32667.14, 32937.78, 31651.5, 30598,
	       26344.4     , 22253.89, 28662, 30845.24,
	       26820.95, 20853.12   , 24112.25, 24242.86, 13301.38 ,
	       16444.67, 16581.43, 15753, 16938,
	       22544.44, 17790],
    marker: {
              fillColor: '#fff',
              lineWidth: 4,
              lineColor: '#7BA3DC',
              radius : 5,
        },
    color: '#7BA3DC',
    lineWidth : 4,
	    }],

      navigation: {
        buttonOptions: {
            enabled: false
        }
    },

     credits: {
        enabled: false
    },
    
    /*[32667.142857, 32937.777778, 31651.5     , 30598,
	       26344.4     , 22253.888889, 28662, 30845.238095,
	       26820.952381, 20853.125   , 19310, 32336,
	       14481.25    , 30322, 24242.857143, 13301.37931 ,
	       16444.666667, 16581.428571, 15753, 16938,
	       22544.444444, 17790]
	    }],*/

	    responsive: {
		rules: [{
		    condition: {
		        maxWidth: 500
		    },
		    chartOptions: {
		        legend: {
		            layout: 'horizontal',
		            align: 'center',
		            verticalAlign: 'bottom'
		        }
		    }
		}]
	    }
    };
    var chartEvolNb = new Highcharts.Chart(Highcharts.merge(optionsEvolNb, null));

   
});

