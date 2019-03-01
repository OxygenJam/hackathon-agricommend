// ========================== //
// | Temperature            | //
// ========================== //

function tempLogoController(){
    let src='';

    if(temp > 45){
        src = 'local/images/tmp-high.svg';
    }
    else if(temp > 20 && temp <= 45){
        src = 'local/images/tmp-mid.svg';
    }
    else{
        src = 'local/images/tmp-low.svg';
    }

    $('#temp-logo').attr('src',src);
}


// ========================== //
// | Sunlight               | //
// ========================== //

function sunLogoController(){
    let src='';

    if(sunlight >= 32000){
        src = 'local/images/light-high.svg';
    }
    else if(sunlight > 10000 && sunlight < 32000){
        src = 'local/images/light-mid.svg';
    }
    else{
        src = 'local/images/light-low.svg';
    }

    $('#sun-logo').attr('src',src);
}


// ========================== //
// | Humidty                | //
// ========================== //

function humidityLogoController(){
    let src='';

    if(humidity > 75){
        src = 'local/images/hum-high.svg';
    }
    else if(humidity > 40 && humidity <= 75){
        src = 'local/images/hum-mid.svg';
    }
    else{
        src = 'local/images/hum-low.svg';
    }

    $('#hum-logo').attr('src',src);
}

// ========================== //
// | Rainfall               | //
// ========================== //

function rainLogoController(){
    let src='';

    if(rain > 5000){
        src = 'local/images/rain-high.svg';
    }
    else if(rain > 3000 && rain <= 5000){
        src = 'local/images/rain-mid-high.svg';
    }
    else if(rain >=1200 && rain <= 3000){
        src = 'local/images/rain-mid-low.svg';
    }
    else{
        src = 'local/images/rain-low.svg';
    }

    $('#rain-logo').attr('src',src);
}
