var width = 1800,
    height = 900,
    centered;

var state_list = [
null,
{"code":"AL","name":"Alabama","data": null},
{"code":"AK","name":"Alaska","data": null},
null,
{"code":"AZ","name":"Arizona","data": null},
{"code":"AR","name":"Arkansas","data": null},
{"code":"CA","name":"California","data": null},
null,
{"code":"CO","name":"Colorado","data": null},
{"code":"CT","name":"Connecticut","data": null},
{"code":"DE","name":"Delaware","data": null},
{"code":"DC","name":"District of Columbia","data": null},
{"code":"FL","name":"Florida","data": null},
{"code":"GA","name":"Georgia","data": null},
null,
{"code":"HI","name":"Hawaii","data": null},
{"code":"ID","name":"Idaho","data": null},
{"code":"IL","name":"Illinois","data": null},
{"code":"IN","name":"Indiana","data": null},
{"code":"IA","name":"Iowa","data": null},
{"code":"KS","name":"Kansas","data": null},
{"code":"KY","name":"Kentucky","data": null},
{"code":"LA","name":"Louisiana","data": null},
{"code":"ME","name":"Maine","data": null},
{"code":"MD","name":"Maryland","data": null},
{"code":"MA","name":"Massachusetts","data": null},
{"code":"MI","name":"Michigan","data": null},
{"code":"MN","name":"Minnesota","data": null},
{"code":"MS","name":"Mississippi","data": null},
{"code":"MO","name":"Missouri","data": null},
{"code":"MT","name":"Montana","data": null},
{"code":"NE","name":"Nebraska","data": null},
{"code":"NV","name":"Nevada","data": null},
{"code":"NH","name":"New Hampshire","data": null},
{"code":"NJ","name":"New Jersey","data": null},
{"code":"NM","name":"New Mexico","data": null},
{"code":"NY","name":"New York","data": null},
{"code":"NC","name":"North Carolina","data": null},
{"code":"ND","name":"North Dakota","data": null},
{"code":"OH","name":"Ohio","data": null},
{"code":"OK","name":"Oklahoma","data": null},
{"code":"OR","name":"Oregon","data": null},
{"code":"PA","name":"Pennsylvania","data": null},
null,
{"code":"RI","name":"Rhode Island","data": null},
{"code":"SC","name":"South Carolina","data": null},
{"code":"SD","name":"South Dakota","data": null},
{"code":"TN","name":"Tennessee","data": null},
{"code":"TX","name":"Texas","data": null},
{"code":"UT","name":"Utah","data": null},
{"code":"VT","name":"Vermont","data": null},
{"code":"VA","name":"Virginia","data": null},
null,
{"code":"WA","name":"Washington","data": null},
{"code":"WV","name":"West Virginia","data": null},
{"code":"WI","name":"Wisconsin","data": null},
{"code":"WY","name":"Wyoming","data": null},
null,
null,
null,
{"code":"AS","name":"America Samoa","data": null},
null,
null,
null,
{"code":"FM","name":"Federated States of Micronesia","data": null},
null,
{"code":"GU","name":"Guam","data": null},
null,
{"code":"MH","name":"Marshall Islands","data": null},
{"code":"MP","name":"Northern Mariana Islands","data": null},
{"code":"PW","name":"Palau","data": null},
null,
{"code":"PR","name":"Puerto Rico","data": null},
null,
{"code":"UM","name":"U.S. Minor Outlying Islands","data": null},
null,
null,
null,
{"code":"VI","name":"Virgin Islands of the United States","data": null}
];

var projection = d3.geo.albersUsa()
    .scale(1070)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);

var g = svg.append("g");

d3.json("us.json", function(error, us) {
    if (error) throw error;

    var data = topojson.feature(us, us.objects.states).features;


    g.append("g")
        .attr("id", "states")
        .selectAll("path")
        .data(data)
        .enter().append("path")
        .attr("d", path)
        .attr("id", function(d) {
            return d.id;
        })
        .on("click", function(d) {
            clicked(d);
        });

    g.append("path")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) {
            return a !== b;
        }))
        .attr("id", "state-borders")
        .attr("d", path);
});

function clicked(d) {
    g.selectAll("circle.city_dot").remove()
    var x, y, k;
    if (d && centered !== d) {
        var centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 4;
        centered = d;
        if(state_list[d.id].data == null){
            state_list[d.id].data = [];
            fetchCityData(state_list[d.id], function(data){
                var state_code = state_list[d.id].code;
                $.each(data.list, function( index, value ) {
                    var city_name = value.name;
                    console.log(city_name);
                    fetchGeoData(city_name, state_code, function(city_data){
                        var city_obj = city_data.results[0];
                        var lat = city_obj.geometry.location.lat;
                        var lng = city_obj.geometry.location.lng;
                        var dot_click = function(d) {
                            var index = Math.floor(Math.random() * (value.webcams.length));
                            var webcam_id = value.webcams[index];
                            fetchWebcam(webcam_id, function(data){
                              var link = data.liveView;
                              if(link == null || link === "")
                                  link = data.timespanView;
                              window.location.href = link;
                            });
                        };
                        g.append("circle")
                          .attr("r",2)
                          .attr("fill", "red")
                          .attr("class", "city_dot")
                          .attr("stroke", "black")
                          .attr("stroke-width", 0.5)
                          .attr("transform", function() {return "translate(" + projection([lng,lat]) + ")";})
                          .on("click", dot_click);
                        var city_store = {"obj": value, "lat": lat, "lng": lng, "dot_click": dot_click};
                        state_list[d.id].data.push(city_store);
                    });
                });
            });
        }
        else{
          $.each(state_list[d.id].data, function( index, value ) {
            g.append("circle")
              .attr("r",2)
              .attr("fill", "red")
              .attr("class", "city_dot")
              .attr("stroke", "black")
              .attr("stroke-width", 0.5)
              .attr("transform", function() {return "translate(" + projection([value.lng,value.lat]) + ")";})
              .on("click", value.dot_click);
          });
        }
    } else {
        x = width / 2;
        y = height / 2;
        k = 1;
        centered = null;
    }

    g.selectAll("path")
        .classed("active", centered && function(d) {
            return d === centered;
        });

    g.transition()
        .duration(750)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");
}

function fetchGeoData(city_name, state_code, callback){
    var stringURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+city_name+","+state_code+"&key=AIzaSyAlhktTfmSwdgx77xWf36YGjV6qcbWPogU";
    $.ajax({
        url: stringURL,
        method: "GET",
        async: true,
        success: function(data) {
            callback(data);
        },
        error: function() {
            console.log("error");
        }
    });
}

function fetchWebcam(webcam_id, callback){
    var stringURL = "http://api.projectrunway.me/webcams/"+webcam_id;
    $.ajax({
        url: stringURL,
        method: "GET",
        async: true,
        success: function(data) {
            callback(data);
        },
        error: function() {
            console.log("error");
        }
    });
}

function fetchCityData(state, callback) {
    var stringURL = "http://api.projectrunway.me/cities?filter=region,"+state.name+"&filter=country,United%20States&limit=100";
    $.ajax({
        url: stringURL,
        method: "GET",
        async: true,
        success: function(data) {
            callback(data);
        },
        error: function() {
            console.log("error");
        }
    });
}