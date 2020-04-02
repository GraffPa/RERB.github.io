$(function () {

  var optionsEvolNb = {
    chart: {
        renderTo: 'buble_graph', 
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        style: {
            color: '#7BA3DC',
        },
        text: 'Cumul des nuisances encironnementales'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
    },
    plotOptions: {
        packedbubble: {
            minSize: '30%',
            maxSize: '120%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 250
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },  
    series: [{
        name: 'Essonne - 91/78',
        data: [{
            name: 'Saint-Remy-les-Chevreuse',
            value: 0.5
        },{
            name: 'Gif-sur-Yvette',
            value: 0.5
        }, {
            name: 'Bures-sur-Yvette',
            value: 0.5
        },
        {
            name: "Massy",
            value: 1.5
        },
        {
            name: "Palaiseau",
            value: 1
        },
        {
            name: "Orsay",
            value: 1
        }]
    }, {
        name: 'Hauts-de-Seine - 92',
        data: [{
            name: "Antony",
            value: 1.5
        },
        {
            name: "Bourg-la-Reine",
            value: 1.5
        }]
    }, {
        name: 'Paris - 75',
        data: [{
            name: "3er Ardt",
            value: 2.5
        },{
            name: "5eme Ardt",
            value: 2
        },{
            name: "10eme Ardt",
            value: 2
        },{
            name: "14eme Ardt",
            value: 3
        }]
    }, {
        name: 'Seine-Saint-Denis - 93',
        data: [{
            name: "Aulnay-sous-Bois",
            value: 1.5
        },
        {
            name: "Le Blanc-Mesnil",
            value: 1.5
        },
        {
            name: "Le Bourget",
            value: 2.5
        },
        {
            name: "La Courneuve",
            value: 2
        },
        {
            name: "Drancy",
            value: 1.5
        },
        {
            name: "Saint Denis",
            value: 2.5
        },
        {
            name: "Villepinte",
            value: 2
        },
        {
            name: "Roissy -en-France",
            value: 2
        }]
    }, {
        name: 'Val de Marne',
        data: [{
            name: "Arcueil",
            value: 2.5
        },
        {
            name: "Gentilly",
            value: 2.5
        }]
    }],

  navigation: {
        buttonOptions: {
            enabled: false
        }
    },
     credits: {
        enabled: false
    }
  };

    var chartEvolNb = new Highcharts.Chart(Highcharts.merge(optionsEvolNb, null));


});
