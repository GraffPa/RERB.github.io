$(function () {
    var optionsEvolNb = {
      chart: {renderTo: 'vote_graph', type:'column'
    },
    title: {
        text: 'Résultats du 2nd tour de la présidentielle 2017'
    },
    subtitle: {
        text: 'Source: data.gouv'
    },
    xAxis: {
        categories: [
            'Paris','Hauts-de-Seine','Val-de-Marne','Yvelines','Essonne','Seine-Saint-Denis',"Val-d'Oise","Seine-et-Marne"
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Votes (%)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Emmanuel Macron',
        data: [65.25,60.09,53.35,52.97,48.12,47.96,46.83,41.97]

    }, {
        name: 'Marine Le Pen',
        data: [7.51,10.07,13.07,15.69,18.55,12.89,17.73,23.75]

    }, {
        name: 'Abstention',
        data: [21.51,23.06,26.41,23.68,25.08,32.49,27.96,25.88]

    }, {
        name: 'Blancs',
        data: [4.45,5.83,5.57,6.05,6.33,5.04,5.88,6.64]

    }]
    }
    ;
    var chartEvolNb = new Highcharts.Chart(Highcharts.merge(optionsEvolNb, null));
});