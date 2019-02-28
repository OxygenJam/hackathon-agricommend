// ========================== //
// | Temperature            | //
// ========================== //

function tempColorController(){
    let c;

    if(temp > 80){
        c = color['red'];
    }
    else if(temp > 60 && temp <= 80){
        c = color['orange'];
    }
    else if(temp > 39 && temp <= 60){
        c = color['amber'];
    }
    else if(temp > 20 && temp <= 30){
        c = color['green'];
    }
    else if(temp > 10 && temp <= 20){
        c = color['bluegreen'];
    }
    else{
        c = color['blue'];
    }

    return c;
}


// ========================== //
// | Sunlight               | //
// ========================== //

function sunColorController(){
    let c;

    if(sunlight > 100000){
        c = color['red'];
    }
    else if(sunlight > 75000 && sunlight <= 100000){
        c = color['orange'];
    }
    else if(sunlight > 50000 && sunlight <= 75000){
        c = color['amber'];
    }
    else if(sunlight > 25000 && sunlight <= 50000){
        c = color['green'];
    }
    else if(sunlight > 5000 && sunlight <= 25000){
        c = color['bluegreen'];
    }
    else{
        c = color['blue'];
    }

    return c;
}


// ========================== //
// | Humidty                | //
// ========================== //

function humidityColorController(){
    let c;

    if(humidity > 90){
        c = color['red'];
    }
    else if(humidity > 75 && humidity <= 90){
        c = color['orange'];
    }
    else if(humidity > 60 && humidity <= 75){
        c = color['amber'];
    }
    else if(humidity > 50 && humidity <= 60){
        c = color['green'];
    }
    else if(humidity > 30 && humidity <= 50){
        c = color['bluegreen'];
    }
    else{
        c = color['blue'];
    }

    return c;
}

// ========================== //
// | Rainfall               | //
// ========================== //

function rainColorController(){
    let c;

    if(rain > 5000){
        c = color['blue'];
    }
    else if(rain > 3000 && rain <= 5000){
        c = color['bluegreen'];
    }
    else if(rain >=1200 && rain <= 3000){
        c = color['green'];
    }
    else if(rain > 800 && rain < 1200){
        c = color['amber'];
    }
    else if(rain > 500 && rain <= 800){
        c = color['orange'];
    }
    else{
        c = color['red'];
    }

    return c;
}

// ========================== //
// | Nitrogen               | //
// ========================== //

function nitColorController(){
    let c;

    if(n_levels > 40){
        c = color['blue'];
    }
    else if(n_levels > 30 && n_levels <= 40){
        c = color['bluegreen'];
    }
    else if(n_levels >= 20 && n_levels <= 30){
        c = color['green'];
    }
    else if(n_levels > 10 && n_levels < 20){
        c = color['amber'];
    }
    else if(n_levels > 5 && n_levels <= 10){
        c = color['orange'];
    }
    else{
        c = color['red'];
    }

    return c;
}

// ========================== //
// | Phosphorus             | //
// ========================== //

function phosColorController(){
    let c;

    if(p_levels > 60){
        c = color['blue'];
    }
    else if(p_levels > 40 && p_levels <= 60){
        c = color['bluegreen'];
    }
    else if(p_levels >= 16 && p_levels <= 40){
        c = color['green'];
    }
    else if(p_levels > 10 && p_levels < 16){
        c = color['amber'];
    }
    else if(p_levels > 5 && p_levels <= 10){
        c = color['orange'];
    }
    else{
        c = color['red'];
    }

    return c;
}

// ========================== //
// | Potassium              | //
// ========================== //

function potassColorController(){
    let c;

    if(k_levels > 140){
        c = color['blue'];
    }
    else if(k_levels > 121 && k_levels <= 140){
        c = color['bluegreen'];
    }
    else if(k_levels >= 80 && k_levels <= 121){
        c = color['green'];
    }
    else if(k_levels > 50 && k_levels < 80){
        c = color['amber'];
    }
    else if(k_levels > 20 && k_levels <= 50){
        c = color['orange'];
    }
    else{
        c = color['red'];
    }

    return c;
}