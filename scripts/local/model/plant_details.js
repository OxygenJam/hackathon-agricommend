function loadPlantModalDetails(index){
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
        } = recommended_plant_data.data[index];

    $('#plant-details-title').html(plant_name);

    $('#plant-details .modal-body').html(`
        <b>Also known as:</b> ${common_name ? common_name : "No common names known..."}
        <table>
            <tr>
                <td></td>
                <th>Recommended Minimum</th>
                <th>Recommended Maximum</th>
                <th>Capable Minimum</th>
                <th>Capable Maximum</th>
            </tr>

            <tr>
                <th>pH Levels</th>
                <td>${ph_opt_min}</td>
                <td>${ph_opt_max}</td>
                <td>${ph_abs_min}</td>
                <td>${ph_abs_max}</td>
            </tr>

            <tr>
                <th>Temperature</th>
                <td>${temp_opt_min}</td>
                <td>${temp_opt_max}</td>
                <td>${temp_abs_min}</td>
                <td>${temp_abs_max}</td>
            </tr>

            <tr>
                <th>Rainfall (annual)</th>
                <td>${rain_opt_min}</td>
                <td>${rain_opt_max}</td>
                <td>${rain_abs_min}</td>
                <td>${rain_abs_max}</td>
            </tr>

            <tr>
                <th>Light Intensity (lx)</th>
                <td>${sun_opt_min}</td>
                <td>${sun_opt_max}</td>
                <td>${sun_abs_min}</td>
                <td>${sun_abs_max}</td>
            </tr>
        </table>
    `)
}