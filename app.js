const DataFrame = require('dataframe-js').DataFrame;
const express = require('express');
const app = express();
const pp = require('./scripts/local/prettyPrint.js');
var bodyParser = require('body-parser');

// ================ //
// | Routing       | //
// ================ //

function loggedIn(req, res, next){

    // Check authentication
}

// ================ //
// | Middleware   | //
// ================ //

app.use('/css', express.static('css'));
app.use('/local', express.static('local'));
app.use('/scripts', express.static('scripts'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// Default Page
app.get('/dashboard', (req,res)=>{

    res.sendFile(`${__dirname}/green_iot.html`);
})

// Login Page
app.get('/', (req,res)=>{

    res.sendFile(`${__dirname}/green_iot_login.html`);
})

// Fertilizers Page
app.get('/fertilizer', (req,res)=>{

    res.sendFile(`${__dirname}/green_iot_admin.html`);
})

// ========== //
// | POST   | //
// ========== //

app.post(`/authenticate`, (req,res)=>{

    const { user, pass } = req.body;

    console.log(req.body);

    // TO DO: Implement token and authorization in real implementation

    if(user == 'admin' && pass == 'admin'){
        res.redirect('/dashboard')
    }
})


// ======== //
// | GET   | //
// ======== //

// ====================================== //
// | Check for updates in local data    | //
// ====================================== //
app.get('/update', (req,res)=>{

    pp.logPrint("Checking for syncing in server data and local data...");
    let user = req.query.user;
    let date = req.query.date;

    console.log(req.query);
    
    let data = null;
    // -DB connection retrieve all data
    // -Serialize to JSON

    return data;
});

// ====================================== //
// | Get recommendation                 | //
// ====================================== //
app.get('/recommend', (req,res) => {

    let temp = 0;
    let rain = 0;
    let sun = 0;
    let ph = 0;

    pp.logPrint("Retrieving recommendations for the user...");

    temp = req.query.temp;
    rain = req.query.rain;
    sun = req.query.sun > 32000 ? 32000 : req.query.sun;
    ph = req.query.ph;

    console.log(req.query);

    DataFrame.fromCSV('http://localhost:3000/local/data/plant_data.csv').then((df)=>{
        let remarks =[];

        pp.logPrint(`Number of rows found in local plant data: ${df.count()}`);
        pp.logPrint('Filtering non-numerical values...');

        df = df.filter((r) => { return r.get('ph_opt_min') != '-' || r.get('temp_opt_max') != '-' });

        pp.logPrint(`Number of rows found in filtered plant data: ${df.count()}`);

        // Filter base on passed value here
        let dfph = df.filter((r) => { return ph >= parseFloat(r.get('ph_opt_min'))  && ph <= parseFloat(r.get('ph_opt_max')) });
        let dftemp = df.filter((r) => { return temp >= parseFloat(r.get('temp_opt_min')) && temp <= parseFloat(r.get('temp_opt_max')) });
        let dfrain = df.filter((r) => { return rain >= parseFloat(r.get('rain_opt_min')) && rain <= parseFloat(r.get('rain_opt_max')) });
        let dfsun = df.filter((r) => { return sun >= parseFloat(r.get('sun_opt_min')) && sun <= parseFloat(r.get('sun_opt_max')) });

        pp.logPrint(`Number of rows found in ph plant data: ${dfph.count()}`);
        if(dfph.count() < 10){
            remarks = [...remarks, 'Low amount of plants can be planted via at the current levels, this has effect on the list of recommendations.'];
        }

        pp.logPrint(`Number of rows found in temp plant data: ${dftemp.count()}`);
        if(dftemp.count() < 10){
            remarks = [...remarks, 'Low amount of plants can be planted at the current temperature levels, this has effect on the list of recommendations.'];
        }

        pp.logPrint(`Number of rows found in rain plant data: ${dfrain.count()}`);
        if(dfrain.count() < 10){
            remarks = [...remarks, 'Low amount of plants can be planted at the current rainfall levels, this has effect on the list of recommendations.'];
        }

        pp.logPrint(`Number of rows found in sun plant data: ${dfsun.count()}`);
        if(dfsun.count() < 10){
            remarks = [...remarks, 'Low amount of plants can be planted at the current light intensity levels, this has effect on the list of recommendations.'];
        }

        let recom = df;

        if(ph){
            recom = recom.innerJoin(dfph, 'plant_name');
        }else{
            remarks = [...remarks, 'No data for pH levels were provided.'];
        }
        
        if(temp){
            recom = recom.innerJoin(dftemp, 'plant_name');
        }else{
            remarks = [...remarks, 'No data for temperature levels were provided.'];
        }

        if(rain){
            recom = recom.innerJoin(dfrain, 'plant_name');
        }else{
            remarks = [...remarks, 'No data for rain levels were provided.'];
        }
         
        if(sun){
            recom = recom.innerJoin(dfsun, 'plant_name');
        }else{
            remarks = [...remarks, 'No data for light intensity levels were provided.'];
        }

        pp.logPrint(`Number of rows found in both joined plant data: ${recom.count()}`);

        let data = {
            data:[],
            remarks:remarks
        };
        
        let recom_json = JSON.parse(recom.toJSON());
        let { 
            plant_name,
            common_name,
            temp_opt_min,
            temp_opt_max,
            temp_abs_min,
            temp_abs_max,
            rain_opt_min,
            rain_opt_max,
            rain_abs_min,
            rain_abs_max,
            ph_opt_min,
            ph_opt_max,
            ph_abs_min,
            ph_abs_max,
            sun_opt_min,
            sun_opt_max,
            sun_abs_min,
            sun_abs_max,
        } = recom_json;

        /* console.log(recom);
        console.log(plant_name);
        console.log(recom_json) */

        for(var i=0; i < recom.count(); i++){
            
            data.data = [...data.data, {
                plant_name: plant_name[i],
                common_name: common_name[i],
                temp_opt_min: temp_opt_min[i],
                temp_opt_max: temp_opt_max[i],
                temp_abs_min: temp_abs_min[i],
                temp_abs_max: temp_abs_max[i],
                rain_opt_min: rain_opt_min[i],
                rain_opt_max: rain_opt_max[i],
                rain_abs_min: rain_abs_min[i],
                rain_abs_max: rain_abs_max[i],
                ph_opt_min: ph_opt_min[i],
                ph_opt_max: ph_opt_max[i],
                ph_abs_min: ph_abs_min[i],
                ph_abs_max: ph_abs_max[i],
                sun_opt_min: sun_opt_min[i] >= 32000 ? ">32000" : sun_opt_min[i],
                sun_opt_max: sun_opt_max[i] >= 32000 ? ">32000" : sun_opt_max[i],
                sun_abs_min: sun_abs_min[i] >= 32000 ? ">32000" : sun_abs_min[i],
                sun_abs_max: sun_abs_max[i] >= 32000 ? ">32000" : sun_abs_max[i]
            }
            ];
        }

        res.send(data);

    })
    .catch((err)=>{
        pp.errPrint(err);
    });

    
    
    
})

app.listen(3000,()=>{
    pp.logPrint("Server is now up and running!");

    /* DataFrame.fromCSV('http://localhost:3000/local/data/plant_data.csv').then((df)=>{
        console.log(df);

        pp.logPrint("PH ROW")
        
        df = df.filter((r) => { return r.get('ph_opt_min') != '-' })

        let dfph = df.filter((r) => { console.log(r.get('ph_opt_min')) });
        pp.logPrint("temp ROW")
        let dftemp = df.filter((r) => { temp >= r.get('temp_opt_min') && temp <= r.get('temp_opt_max') });

        console.log(dfph);
        console.log(dftemp);
        let recom = dfph.innerJoin(dftemp);

    })
    .catch((err)=>{
        pp.errPrint(err);
    }); */

});