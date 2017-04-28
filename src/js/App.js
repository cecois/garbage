/* ------------- GLOBALS -------------------------------------- */





// UTILITY CLASS (CONVERSIONS/SNIFFS/ETC.)
window.UTIL = new Util();

/* ------------- BASELAYERS ---------------------------------------- */
    // baselayers we now keep statically right here
    var baselayerz = (Config.MODE=="bus")?{"layers":[{"name":"carto_positron","active":false,"source":"carto","nom":"Carto Positron","mapis":"light","definition":{"subdomains":["a","b","c","d"],"maxZoom":18,"url":"https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png","noWrap":true}},{"name":"dummy","active":true,"source":"localhost","nom":"A Real Dummy","mapis":"dark","definition":{"maxZoom":18,"url":"images/thumbs/dummy.png","noWrap":true}}]}:{"layers":[{"name":"lichtenstein","active":false,"source":"mapbox","nom":"Katie Kowalsky's Pop Art (Inspored by Roy lichtenstein)","mapis":"dark","definition":{"subdomains":["a","b","c"],"maxZoom":18,"url":"https://{s}.tiles.mapbox.com/v4/katiekowalsky.236692c1/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1Ijoia2F0aWVrb3dhbHNreSIsImEiOiJHR2hfdlBNIn0.GUMLsSnT-SYx4ew7b77kqw","noWrap":true}},{"name":"carto_world_antique","active":false,"source":"carto","nom":"Carto World Antique","mapis":"light","definition":{"subdomains":["a","b","c","d"],"maxZoom":18,"url":"https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png","noWrap":true}},{"name":"carto_darkmatter","active":true,"source":"carto","nom":"Carto Dark Matter","mapis":"dark","definition":{"subdomains":["a","b","c","d"],"maxZoom":18,"url":"https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png","noWrap":true}},{"name":"carto_positron","active":false,"source":"carto","nom":"Carto Positron","mapis":"light","definition":{"subdomains":["a","b","c","d"],"maxZoom":18,"url":"https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png","noWrap":true}},{"name":"nokia_rgb_hybrid_day","active":false,"source":"carto","nom":"Carto/Nokia Imagery","mapis":"light","definition":{"subdomains":["1","2","3","4"],"maxZoom":18,"url":"https://{s}.maps.nlp.nokia.com/maptile/2.1/maptile/newest/hybrid.day/{z}/{x}/{y}/256/png8?lg=eng&token=A7tBPacePg9Mj_zghvKt9Q&app_id=KuYppsdXZznpffJsKT24","noWrap":true}},{"name":"pencil","active":false,"source":"mapbox","nom":"Aj Ashton's Pencil Map","definition":{"subdomains":["a","b","c"],"maxZoom":18,"url":"https://{s}.tiles.mapbox.com/v4/aj.03e9e12d/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYWoiLCJhIjoiY2lrZW1pczJzMDA1d3VybTJha216azVtdSJ9.vJBkGAq6CvN9vt0IwakQ-A","noWrap":true}},{"name":"cloudmade","active":false,"source":"cloudmade","nom":"CloudMade Grey","definition":{"maxZoom":18,"subdomains":["a","b","c"],"noWrap":true,"url":"http://{s}.tile.cloudmade.com/4f5c5233516d4c39a218425764d98def/22677/256/{z}/{x}/{y}.png"}},{"name":"cloudmade_redalert","active":false,"source":"cloudmade","nom":"Red Alert","definition":{"maxZoom":18,"subdomains":["a","b","c"],"noWrap":true,"url":"http://{s}.tile.cloudmade.com/4f5c5233516d4c39a218425764d98def/19996/256/{z}/{x}/{y}.png"}},{"name":"opencycle_cycle","active":false,"source":"opencycle","nom":"OpenCycle","definition":{"maxZoom":18,"subdomains":["a","b","c"],"noWrap":true,"url":"http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"}},{"name":"opencycle_landscape","active":false,"source":"opencycle","nom":"OpenCycle Landscape","definition":{"maxZoom":18,"subdomains":["a","b","c"],"noWrap":true,"url":"http://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png"}},{"name":"pinterest","active":false,"source":"pinterest","nom":"Pinterest (by Stamen)","definition":{"maxZoom":18,"subdomains":["a","b","c"],"noWrap":true,"url":"http://{s}.tiles.mapbox.com/v3/pinterest.map-ho21rkos/{z}/{x}/{y}.png"}},{"name":"stamen_toner","active":false,"nom":"Stamen Toner","source":"stamen","definition":{"id":"toner","url":null}},{"name":"stamen_watercolor","active":false,"nom":"Stamen Watercolor","source":"stamen","definition":{"id":"watercolor","url":null}},{"name":"mapbox_mario","active":false,"nom":"Duncan Graham's Super Mario","source":"mapbox","definition":{"maxZoom":18,"subdomains":["a","b","c"],"noWrap":true,"url":"http://{s}.tiles.mapbox.com/v4/duncangraham.552f58b0/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ"}}]};

    // var baselayerz = {"layers":[{"name":"dummy","active":true,"source":"localhost","nom":"A Real Dummy","thumb":"images/thumbs/dummy00-dummy00.jpg","mapis":"dark","definition":{"maxZoom":18,"url":"images/thumbs/dummy00-dummy00.jpg","noWrap":true}}]};
    var panelz ={"panels":[
    {"id":"home","displayname":"Home"}
    ,{"id":"baa","displayname":"Marathon 2014","active":true}
    ,{"id":"search","displayname":"Search Results"}
    ,{"id":"browse","displayname":"Browse"}
    // ,{"id":"queue","displayname":"Download Queue"}
    // ,{"id":"gsiab","displayname":"GSinaBOX"}
    ,{"id":"help","displayname":"Help/Docu"}
    ]}

// STATE LISTENS FOR AND SETS MOST/ALL OF THE PARAMS COMING IN FRM ROUTE (OR DEFAULT)
window.appState = new State();
window.appPanels = new PanelsCollection(panelz.panels);
window.appPanelMenuView = new PanelMenuView({collection:appPanels});

var slider = $("#slider").slider({
    id:"slider"
    ,formatter: (v)=>{return moment(v,['X']).format('dd hh:ss A')}
    ,ticks_snap_bounds:1800
    ,ticks:[ 1398038400,
    1398045600,
    1398052800,
    1398060000,
    1398067200,
    1398074400,
    1398081600,
    1398088800,
    1398096000,
    1398103200,
    1398110400,
    1398117600,
    1398124800,
    1398132000,
    1398139200,
    1398146400,
    1398153600,
    1398160800,
    1398168000 ]
    ,tooltip:"show"
    }); //slider init



// var slider = document.getElementById('slider');
// noUiSlider.create(slider, {
//   start: [1398038400, 1398042000]
//   ,behaviour: 'drag-fixed'
//   ,tooltips:true
//   ,step:3600
//   ,connect: true
//   ,range: {
//     'min':  1398038400
//     ,'max': 1398167999 // 22nd
//     // ,'max':1398427732 //25th
// }
// ,format: {
//       to: function ( value ) {
// console.log("to",value);
//         var t = parseInt(value)
//         return moment(t,['X']).format();
//       },
//       from: function ( value )
//       {
//         console.log("from",value);
//         var t = parseInt(value)
//         return moment(t,['X']).format();
//       }
//     }
// });




//
// MANAGES PANECONTAINERS FOR ONE THING
window.appActivity = new Activity();
window.appActivityView  = new ActivityView({model:appActivity})

window.appStateView  = new StateView({model:appState})

// POTENTIAL PLACES FROM EITHER NOMINATIM OR OUR OWN PARSING OF COORDS
// window.triagePlaces = new TriageCollection();

// window.appQuery = new Query();window.appQueryView  = new QueryView({model:appQuery})
// CLOUDMADE ET AL
mapBaseLayers = new BaseLayersCollection(baselayerz.layers);

window.appBaseMapsMenuView = new BaseMapsMenuView({
    collection: mapBaseLayers
});
window.mapBaseMapView = new BaseMapView({
    collection: mapBaseLayers
});

window.appBellies = new BelliesCollection();window.appBelliesView  = new BelliesView({collection:appBellies});
// window.appBelliesMenuView  = new BelliesMenuView({collection:appBellies})

// slider.noUiSlider.on('end',(e)=>{
//     appActivity.set({msg:"calculating belly calls..."})
//     appBelliesView.render(e)
// })

// slider.on('change',(v)=>{
//     t = [v.value.oldValue,v.value.newValue]
//     appBelliesView.render(t)
// })
var t =[]
slider.on('slideStart',(v)=>{
    console.log("start v",v)
    t.push(v.value)
}).on('slideStop',(v)=>{
    t.push(v.value)
    appBelliesView.render(t)
    console.log("end v",v)
    t=[]
})

L.geoJSON(BOS, {

    style:UTIL.get_style('baa')

}).addTo(map);
    // and a menu view for stylish swappin'
    // window.appBaseMapsMenuView = new BaseMapsMenuView({
    //     collection: mapBaseLayers
    // });
    // window.mapBaseMapView = new BaseMapView({
    //     collection: mapBaseLayers
    // });
    // window.appPanelMenuView = new PanelMenuView({
    //     collection: appPanels
    // });

// new activity model and view
// appActivity = new Activity();
// appActivityView = new ActivityView({
//     model: appActivity
// });
