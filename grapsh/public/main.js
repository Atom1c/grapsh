$(function() {
var socket = io();
var GETING_TIMER_LENGTH = 400;
var geting = false;
var lastGetingTime;
var numbers;
socket.on('start',function(data){
    numbers = data.data;
    console.log(data);
    console.log(numbers)


    // Get the CSV and create the chart

    Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        $('#container').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        socket.on('getting',function (data) {
                            var x = data.x, 
                                y = data.y;
                            series.addPoint([x, y], true, true);
                            console.log(x,y)
                        });
                    }
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'Value',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = 0; i <= numbers.x.length; i += 1) {
                        data.push({
                            x: numbers.x[i],
                            y: numbers.y[i]
                        });
                    }
                    return data;
                }())
            }]
        });
})
});



