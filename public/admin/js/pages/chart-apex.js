var options1 = {
    chart: {
        height: 300,
        type: 'line'
    },
    series: [{
        name: 'Total Sales',
        data: seriesData
    }],
    xaxis: {
        type: 'category',
        categories: labels
    },
    stroke: {
        curve: 'straight',
        width: 2
    },
    dataLabels: {
        enabled: false
    },
    colors: ['#1abc9c']
};

new ApexCharts(
    document.querySelector("#line-chart-1"),
    options1
).render();


var options2 = {
    chart: {
        height: 320,
        type: 'pie',
    },
    labels: labels,
    series: seriesData,
    colors: ["#1abc9c", "#0e9e4a", "#00acc1", "#f1c40f", "#e74c3c"],
    legend: {
        show: true,
        position: 'bottom',
    },
    dataLabels: {
        enabled: true,
        dropShadow: {
            enabled: false,
        }
    },
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                position: 'bottom'
            }
        }
    }]
}
var chart = new ApexCharts(
    document.querySelector("#pie-chart-1"),
    options2
);
chart.render();


