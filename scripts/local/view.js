var ph_levels = 7.6, n_levels=55, k_levels=89, p_levels = 13;
var temp = 45, rain = 1500, sunlight = 34000, humidity = 42;
var user = 322;
var recommended_plant_data = [];

$(document).ready(()=>{

    initializeView();
    getRecommendations();
});


function initializeView(){

    $('#ph-level-bar').html(null);
    $('#p-level-bar').html(null);
    $('#n-level-bar').html(null);
    $('#k-level-bar').html(null);

     // pH Levels
     Highcharts.chart('ph-level-bar', {

        chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
      
        title: {
          text: 'pH Levels'
        },
      
        pane: {
          startAngle: -150,
          endAngle: 150,
          background: [{
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
          }]
        },
      
        // the value axis
        yAxis: {
          min: 0,
          max: 14,
      
          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickColor: '#666',
      
          tickPixelInterval: 72,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#666',
          labels: {
            step: 1,
            rotation: 'auto'
          },
          title: {
            text: 'pH Level'
          },
          plotBands: [{
            from: 0,
            to: 6.5,
            color: color['red']
          }, {
            from: 6.5,
            to: 7.3,
            color: color['green'] // green
          }, {
            from: 7.3,
            to: 14,
            color: color['blue'] // blue
          }]
        },
      
        series: [{
          name: 'pH',
          data: [ph_levels],
          tooltip: {
            valueSuffix: ' pH Level'
          }
        }]
    });


    // Phosphorus Levels
    Highcharts.chart('p-level-bar', {

        chart:{
            type:'column'
        },

        legend:{
            enabled:false
        },

        title:{
            text:"Phosphate Levels"
        },

        yAxis: {
            max:80,
            plotBands:[{
                from:16,
                to:40,
                color: '#96ffa6'
            }]
        },

        xAxis:{
            categories:['Input Phosphorus Level']
        },

        series:[{
            data:[p_levels],
            color: phosColorController(),
            dataLabels:{
                enabled:true,
                inside:true
            }

        }]
    });

    // Nitrogen Levels
    Highcharts.chart('n-level-bar', {
        chart:{
            type:'column'
        },

        legend:{
            enabled:false
        },

        title:{
            text:"Nitrogen Levels"
        },

        yAxis: {
            max:50,
            plotBands:[{
                from:20,
                to:30,
                color: '#96ffa6'
            }]
        },

        xAxis:{
            categories:['Input Nitrogen Level']
        },

        series:[{
            data:[n_levels],
            color: nitColorController(),
            dataLabels:{
                enabled:true,
                inside:true
            }
        }]
    });

    // Potassium Levels
    Highcharts.chart('k-level-bar', {
        chart:{
            type:'column'
        },

        legend:{
            enabled:false
        },

        title:{
            text:"Potassium Levels"
        },

        yAxis: {
            max:150,
            plotBands:[{
                from:81,
                to:120,
                color: '#96ffa6'
            }],
            
        },

        xAxis:{
            categories:['Input Potassium Level'],
        },

        series:[{
            data:[k_levels],
            color: potassColorController(),
            dataLabels:{
                enabled:true,
                inside:true
            }
        }]
    });


    // Temperature
    $('#temp-meter .my-meter').html(`${temp}°C`);
    $('#temp-meter .my-meter').css({'background-color':tempColorController()});
    $('#temp-meter .my-meter').animate({
        width:`${temp > 5 ? temp : 5}%`
    }, 1000);
    tempLogoController();

    // Rainfall
    $('#rain-meter .my-meter').html(`${rain}mm`);
    $('#rain-meter .my-meter').css({'background-color':rainColorController()});
    $('#rain-meter .my-meter').animate({
        width:`${ Math.ceil((rain/6000)*100) > 15 ? Math.ceil((rain/6000)*100) : 15 }%`
    }, 1000);
    rainLogoController();

    // Sunlight
    $('#sun-meter .my-meter').html(`${sunlight}lx`);
    $('#sun-meter .my-meter').css({'background-color':sunColorController()});
    $('#sun-meter .my-meter').animate({
        width:`${ Math.ceil((sunlight/100000)*100) > 15 ? Math.ceil((sunlight/100000)*100) : 15 }%`
    }, 1000);
    sunLogoController();

    // Humidty
    $('#hum-meter .my-meter').html(`${humidity}%`);
    $('#hum-meter .my-meter').css({'background-color':humidityColorController()});
    $('#hum-meter .my-meter').animate({
        width:`${humidity}%`
    }, 1000);
    humidityLogoController();
}

function getRecommendations(){

    $.get(`/recommend?user=${user}&temp=${temp}&ph=${ph_levels}&rain=${rain}&sun=${sunlight}`, (res) => {

        recommended_plant_data = res;
        
        $('#plant-recommendation').html(null);
        $('#plant-recommendation').append(`
            <table>
                <tr>
                    <th>Plant Name</th>
                    <th>Details</th>
                </tr>
            </table>
        `);

        let { data, remarks } = recommended_plant_data;

        if(data.length > 0){

            

            for(var i = 0; i < data.length; i++){

                let { plant_name } = data[i];
                $('#plant-recommendation table').append(`
                    <tr>
                        <td>${plant_name}</td>
                        <td>
                            <button onclick='loadPlantModalDetails(${i})' class="btn btn-primary" data-toggle="modal" data-target='#plant-details'>
                                Show details
                            </button>
                        </td>
                    </tr>
                `)
               
            }
            
        }
        else{
            $('#plant-recommendation').html(null);
            $('#plant-recommendation').append("<h1>No Recommandations can be found:</h1>")
            
            for(var i in remarks ){
                $('#plant-recommendation').append(`${remarks[i]}<br/>`);
            }
            
        }
        

    })

}