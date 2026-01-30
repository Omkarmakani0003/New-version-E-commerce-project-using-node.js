'use strict';
$(document).ready(function() {
    setTimeout(function() {
        floatchart()
    }, 100);
});

function floatchart() {
    // [ support-chart ] start
    $(function() {
        var options1 = {
            chart: {
                type: 'area',
                height: 65,
                sparkline: {
                    enabled: true
                }
            },
            colors: ["#1abc9c"],
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            series: [{
                data: [0, 20, 10, 45, 30, 55, 20, 30, 0]
            }],
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function(seriesName) {
                            return 'Ticket '
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        }
        new ApexCharts(document.querySelector("#support-chart"), options1).render();
    });
    // [ support-chart ] end
    // [ power-card-chart1 ] start
    $(function() {
        var options = {
            chart: {
                type: 'line',
                height: 75,
                sparkline: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#e74c3c"],
            stroke: {
                curve: 'smooth',
                width: 3,
            },
            series: [{
                name: 'series1',
                data: [55, 35, 75, 50, 90, 50]
            }],
            yaxis: {
                min: 10,
                max: 100,
            },
            tooltip: {
                theme: 'dark',
                fixed: {
                    enabled: false
                },
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: function(seriesName) {
                            return 'Power'
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#power-card-chart1"), options);
        chart.render();
    });
    // [ power-card-chart1 ] end
    // [ power-card-chart3 ] start
    $(function() {
        var options = {
            chart: {
                type: 'line',
                height: 75,
                sparkline: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#f1c40f"],
            stroke: {
                curve: 'smooth',
                width: 3,
            },
            series: [{
                name: 'series1',
                data: [55, 35, 75, 50, 90, 50]
            }],
            yaxis: {
                min: 10,
                max: 100,
            },
            tooltip: {
                theme: 'dark',
                fixed: {
                    enabled: false
                },
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: function(seriesName) {
                            return 'Temperature'
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#power-card-chart3"), options);
        chart.render();
    });
    // [ power-card-chart3 ] end
    // [ seo-chart1 ] start
    $(function() {
        var options = {
            chart: {
                type: 'area',
                height: 40,
                sparkline: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#1abc9c"],
            fill: {
                type: 'solid',
                opacity: 0.3,
            },
            markers: {
                size: 2,
                opacity: 0.9,
                colors: "#1abc9c",
                strokeColor: "#1abc9c",
                strokeWidth: 2,
                hover: {
                    size: 4,
                }
            },
            stroke: {
                curve: 'straight',
                width: 3,
            },
            series: [{
                name: 'series1',
                data: [9, 66, 41, 89, 63, 25, 44, 12, 36, 20, 54, 25, 9]
            }],
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function(seriesName) {
                            return 'Visits :'
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#seo-chart1"), options);
        chart.render();
    });
    // [ seo-chart1 ] end
    // [ seo-chart2 ] start
    $(function() {
        var options = {
            chart: {
                type: 'bar',
                height: 40,
                sparkline: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#2ecc71"],
            plotOptions: {
                bar: {
                    columnWidth: '60%'
                }
            },
            series: [{
                data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54, 25, 66, 41, 89, 63]
            }],
            xaxis: {
                crosshairs: {
                    width: 1
                },
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function(seriesName) {
                            return 'Bounce Rate :'
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#seo-chart2"), options);
        chart.render();
    });
    // [ seo-chart2 ] end
    // [ seo-chart3 ] start
    $(function() {
        var options = {
            chart: {
                type: 'area',
                height: 40,
                sparkline: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#e74c3c"],
            fill: {
                type: 'solid',
                opacity: 0,
            },
            markers: {
                size: 2,
                opacity: 0.9,
                colors: "#e74c3c",
                strokeColor: "#e74c3c",
                strokeWidth: 2,
                hover: {
                    size: 4,
                }
            },
            stroke: {
                curve: 'straight',
                width: 3,
            },
            series: [{
                name: 'series1',
                data: [9, 66, 41, 89, 63, 25, 44, 12, 36, 20, 54, 25, 9]
            }],
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function(seriesName) {
                            return 'Products :'
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#seo-chart3"), options);
        chart.render();
    });
    // [ seo-chart3 ] end
    // [ tot-lead ] start
$(function() {
    var options = {
        chart: {
            type: 'area',
            height: 150,
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#1abc9c"],
        fill: {
            type: 'solid',
            opacity: 0.3,
        },
        stroke: {
            curve: 'straight',
            width: 3,
        },
        series: [{
            name: 'series1',
            data: [25, 66, 41, 89, 25, 44, 12, 36, 9, 54, 25, 66, 41, 89]
        }],
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function(seriesName) {
                        return 'Total Leads :'
                    }
                }
            },
            marker: {
                show: false
            }
        }
    };
    var chart = new ApexCharts(document.querySelector("#tot-lead"), options);
    chart.render();
});
// [ tot-lead ] end
}


 // Initialize CKEditor for product description
        ClassicEditor
            .create(document.querySelector('#productDescription'))
            .catch(error => {
                console.error(error);
            });

        // Image Preview on File Selection
        document.getElementById('productImages').addEventListener('change', function (e) {
            const previewContainer = document.getElementById('imagePreview');
            previewContainer.innerHTML = ''; // Clear previous previews

            const files = e.target.files;
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const imgElement = document.createElement('div');
                    imgElement.classList.add('image-thumbnail');
                    imgElement.innerHTML = `
                    <img src="${event.target.result}" class="img-thumbnail" alt="Image preview" style="max-width: 250px; max-height: auto;">
                    <button type="button" class="remove-image-btn" onclick="removeImage(this)">Remove</button>
                `;
                    previewContainer.appendChild(imgElement);
                };
                reader.readAsDataURL(file);
            });
        });

        // Remove image from preview
        function removeImage(button) {
            button.parentElement.remove();
        }

        // Add Variation Field
        let variationCount = 0;
        
        function addVariationField(count = 0) {

            if(variationCount >= count){
                variationCount++
            }else{
               variationCount = parseInt(count) || 0
               variationCount++
            }

            const variationDiv = document.createElement('div');
            variationDiv.classList.add('variation-field');
            variationDiv.classList.add('mt-3');
            variationDiv.id = `variationField_${variationCount}`;

            variationDiv.innerHTML = `
            <div class="row">
                <div class="col-sm-4">
                    <div class="form-group">
                        <label for="variationType_${variationCount}">Variation Type</label>
                        <input type="text" class="form-control" id="variationType_${variationCount}" name="variation_type[${variationCount}]" placeholder="e.g.  Size, Material" required>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="form-group">
                        <label for="variationOptions_${variationCount}">Options (comma separated)</label>
                        <input type="text" class="form-control" id="variationOptions_${variationCount}" name="variations[${variationCount}]" placeholder="e.g. " required>
                    </div>
                </div>
                <div class="col-sm-4 mt-4">
                    <div class="form-group">
                        <button type="button" class="btn btn-danger" onclick="removeVariationField(${variationCount})">Remove Variation</button>
                    </div>
                </div>
            </div>
        `;

            document.getElementById('variationsContainer').appendChild(variationDiv);
        }

        // Remove Variation Field
        function removeVariationField(id) {
            document.getElementById(`variationField_${id}`).remove();
        }

        function addColorVariation(count = 0) {
        
            if(variationCount >= count){
                variationCount++
            }else{
               variationCount = parseInt(count) || 0
               variationCount++
            }

          const colorDiv = document.createElement('div');
          colorDiv.classList.add('variation-field');
          colorDiv.classList.add('mt-3');
          colorDiv.id = `colorVariation_${variationCount}`;

          colorDiv.innerHTML = `
        <div class="row">
            <div class="col-sm-4">
                <div class="form-group">
                    <label>Variation Type</label>
                    <input type="text"
                        class="form-control"
                        name="variation_type[${variationCount}]"
                        value="Color"
                        readonly>
                </div>
            </div>

            <div class="col-sm-4">
                <div class="form-group">
                    <label>Select Color</label>
                    <input type="color"
                        class="form-control"
                        name="variations[${variationCount}]"
                        value="#000000">
                </div>
            </div>

            <div class="col-sm-4 mt-4">
                <button type="button"
                        class="btn btn-danger"
                        onclick="removeColorVariation(${variationCount})">
                    Remove Color
                </button>
            </div>
        </div>
        `;

        document.getElementById('variationsContainer').appendChild(colorDiv);
}

function removeColorVariation(id) {
    
    document.getElementById(`colorVariation_${id}`).remove();
}
 
       