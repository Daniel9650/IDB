var width = 1800,
    height = 900,
    centered;

var state_list = [
null,
{"code":"AL","name":"Alabama"},
{"code":"AK","name":"Alaska"},
null,
{"code":"AZ","name":"Arizona"},
{"code":"AR","name":"Arkansas"},
{"code":"CA","name":"California"},
null,
{"code":"CO","name":"Colorado"},
{"code":"CT","name":"Connecticut"},
{"code":"DE","name":"Delaware"},
{"code":"DC","name":"District of Columbia"},
{"code":"FL","name":"Florida"},
{"code":"GA","name":"Georgia"},
null,
{"code":"HI","name":"Hawaii"},
{"code":"ID","name":"Idaho"},
{"code":"IL","name":"Illinois"},
{"code":"IN","name":"Indiana"},
{"code":"IA","name":"Iowa"},
{"code":"KS","name":"Kansas"},
{"code":"KY","name":"Kentucky"},
{"code":"LA","name":"Louisiana"},
{"code":"ME","name":"Maine"},
{"code":"MD","name":"Maryland"},
{"code":"MA","name":"Massachusetts"},
{"code":"MI","name":"Michigan"},
{"code":"MN","name":"Minnesota"},
{"code":"MS","name":"Mississippi"},
{"code":"MO","name":"Missouri"},
{"code":"MT","name":"Montana"},
{"code":"NE","name":"Nebraska"},
{"code":"NV","name":"Nevada"},
{"code":"NH","name":"New Hampshire"},
{"code":"NJ","name":"New Jersey"},
{"code":"NM","name":"New Mexico"},
{"code":"NY","name":"New York"},
{"code":"NC","name":"North Carolina"},
{"code":"ND","name":"North Dakota"},
{"code":"OH","name":"Ohio"},
{"code":"OK","name":"Oklahoma"},
{"code":"OR","name":"Oregon"},
{"code":"PA","name":"Pennsylvania"},
null,
{"code":"RI","name":"Rhode Island"},
{"code":"SC","name":"South Carolina"},
{"code":"SD","name":"South Dakota"},
{"code":"TN","name":"Tennessee"},
{"code":"TX","name":"Texas"},
{"code":"UT","name":"Utah"},
{"code":"VT","name":"Vermont"},
{"code":"VA","name":"Virginia"},
null,
{"code":"WA","name":"Washington"},
{"code":"WV","name":"West Virginia"},
{"code":"WI","name":"Wisconsin"},
{"code":"WY","name":"Wyoming"},
null,
null,
null,
{"code":"AS","name":"America Samoa"},
null,
null,
null,
{"code":"FM","name":"Federated States of Micronesia"},
null,
{"code":"GU","name":"Guam"},
null,
{"code":"MH","name":"Marshall Islands"},
{"code":"MP","name":"Northern Mariana Islands"},
{"code":"PW","name":"Palau"},
null,
{"code":"PR","name":"Puerto Rico"},
null,
{"code":"UM","name":"U.S. Minor Outlying Islands"},
null,
null,
null,
{"code":"VI","name":"Virgin Islands of the United States"}
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
   var cityData;
   var cityWebcamList = [];
   fetchCityData(state_list[d.id],function(data){
      cityData = data;
      for(var i = 0; i < cityData.list.length; i ++){
         var item = cityData.list[i];
         var webcamLink;
         var object;
         fetchWebcamData(item.webcams[0], item.name, function(data, name){
            if(data.liveView.length != 0)
               webcamLink = data.liveView;
            else {
               webcamLink = data.timespanView;
            }
            cityWebcamList.push({ cityName: name, webcamLink: webcamLink});
         });
      }
      console.log(cityWebcamList);
   });
    var x, y, k;
    if (d && centered !== d) {
        var centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 4;
        centered = d;
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

function fetchCityData(state, callback) {
    var stringURL = "http://api.projectrunway.me/cities?filter=region,"+state.name+"&filter=country,United%20States&limit=10";
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

function fetchWebcamData(id, name, callback){
   var stringURL = "http://api.projectrunway.me/webcams/" + id;
   $.ajax({
      url: stringURL,
      method: "GET",
      async: true,
      success: function(data) {
           callback(data, name);
      },
      error: function() {
           console.log("error");
      }
   });

}
