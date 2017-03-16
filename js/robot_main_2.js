
var connected = 0; 
var marker_robot, marker_init_point;
var overlay_init, overlay_route; 
var route_array = []; 
var no_runs = 10; 
var map; 
var no_point;
var point;
var init_point = new BMap.Point( 121.635139, 31.2112262); 
var init_bearing = 0;
var bearing = 0; 
var current_bearing = 0;
var robot_enabled = 0;
var robot_paused  = 0; 

var lat = 31.2112262;
var lon = 121.635139;

Job_Enum = {ROUTE_CLICK:0, ROUTE_RUN:1, ROUTE_DISPLAY:2, INIT_POINT:3, ROBOT_CONTROL:4, IDLE:5}
var job_type = Job_Enum.ROBOT_CONTROL;

point = new BMap.Point(lon, lat);
init_map("allmap", point);
// add a marker for the ini point 
map.disableDragging();

set_init_point();

var joystick  = new VirtualJoystick({
  container : document.getElementById('container'),
  mouseSupport  : true,
  stationaryBase: false,
    baseX: 200,
    baseY: 200,
});

joystick._container.addEventListener('mouseup', function(){
	publish_command('Resume');
	
	forward();
  	console.log('up1');
});

joystick._container.addEventListener('mousedown', function(){
	on_off();
	forward();
  	console.log('up1');
});


joystick._container.addEventListener('dblclick', function(){
	 pause();
  	console.log('up2')
});

var vectorFCArrow; 

setInterval(function(){
	if(joystick.deltaY() >0 || joystick.deltaX() > 0)
	{
		var rad = Math.atan2(joystick.deltaY(), joystick.deltaX()); 
		var deg = rad * (180 / Math.PI);
		console.log("Degree current %f", deg - 90)
		map.removeOverlay(vectorFCArrow);
		vectorFCArrow = new BMap.Marker(new BMap.Point(lon, lat), {
			  // 初始化方向向上的闭合箭头
			  icon: new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_CLOSED_ARROW, {
			    scale: 2,
			    strokeWeight: 0.1,
			    rotation: deg - 90,//顺时针旋转30度
			    fillColor: 'green',
			    fillOpacity: 0.4
			  })
		});
		map.addOverlay(vectorFCArrow);
	}
}, 1/30 * 1000);

parameter_listener.subscribe(function(message) {
	var str = message.data; 
	var var1_obj = JSON.parse(str);
	robot_enabled = var1_obj.parameters.ENABLE;
	robot_paused = var1_obj.parameters.PAUSED;
	/*if(robot_paused)
	{
		document.getElementById('robot_pause').firstChild.data = "Resume";
	}else 
	{
		document.getElementById('robot_pause').firstChild.data = "Pause";
	}*/

/*	if(robot_enabled == 0)
	{
		document.getElementById('btn_execute').disabled = true; 
		document.getElementById('robot_pause').disabled = true;
		document.getElementById('robot_switch').firstChild.data = "on";
	}else 
	{
		document.getElementById('btn_execute').disabled = false;
		document.getElementById('robot_pause').disabled = false;
		document.getElementById('robot_switch').firstChild.data = "off";
	}*/
	//insertText("IsMoving", var1_obj.parameters.MOVING)
	//insertText("OnMission", var1_obj.parameters.MISSION)
	//insertText("OnObstacle", var1_obj.parameters.OBSTACLE)
	//insertText("Direction", var1_obj.parameters.DIRECTION)
	//insertText("Speed", var1_obj.parameters.SPEED)
	//insertText("Lon", var1_obj.parameters.LONG)
	//insertText("Lat", var1_obj.parameters.LAT)
	update_robot_pos(var1_obj.parameters.LONG, var1_obj.parameters.LAT);
	//insertText("Bearing", var1_obj.parameters.BEARING)
  });

	

function update_robot_pos(lon_new, lat_new)
{
	if(lat_new == lat && lon_new == lon)
		return;
	point = new BMap.Point(lon_new, lat_new);
	var polyline = new BMap.Polyline(
	  [new BMap.Point(lon, lat),new BMap.Point(lon_new, lat_new)],    
	  {strokeColor:"green", strokeWeight:1, strokeOpacity:0.5}    
	); 
	map.addOverlay(polyline);
	marker_robot.setPosition(point);
	lat = lat_new
	lon = lon_new
}
	/*

  // handle of click to define route functions 
  map.addEventListener("click",function(e){
	if(job_type != Job_Enum.ROUTE_CLICK) 
	{
	  console.log('System not init for route test');
	  return; 
	}
	if(no_point == 1)
	{
	  route += '{"lon": "' + point.lng.toString() + '","lat":"' + point.lat.toString() + '"}';
	}
	route += ",";
	point_new = new BMap.Point(e.point.lng, e.point.lat);
	var marker = new BMap.Marker(point_new);
	route += '{"lon": "' + e.point.lng.toString() + '","lat":"' + e.point.lat.toString() + '"}';
	map.addOverlay(marker); 
	if(no_point >= 1)
	{
	  var polyline = new BMap.Polyline([    
		  point,
		  point_new
		 ],    
		{strokeColor:"blue", strokeWeight:3, strokeOpacity:0.5}    
	  ); 
	}
	map.addOverlay(polyline);
	no_point = no_point + 1;
	point = point_new; 
	console.log(route);
  });

	// Call back to get published parameters and put in the server 
  parameter_listener.subscribe(function(message) {
	var str = message.data; 
	//console.log(str); 
	var var1_obj = JSON.parse(str);
	console.log(var1_obj)
	insertText("IsEanble", var1_obj.parameters.ENABLE)
	robot_enabled = var1_obj.parameters.ENABLE;
	insertText("IsMoving", var1_obj.parameters.MOVING)
	insertText("OnMission", var1_obj.parameters.MISSION)
	insertText("OnObstacle", var1_obj.parameters.OBSTACLE)
	insertText("Direction", var1_obj.parameters.DIRECTION)
	insertText("Speed", var1_obj.parameters.SPEED)
	insertText("Lon", var1_obj.parameters.LONG)
	insertText("Lat", var1_obj.parameters.LAT)
	insertText("Bearing", var1_obj.parameters.BEARING)
  });

	if(job_type == Job_Enum.ROUTE_RUN) 
	{
		var joystick = new VirtualJoystick({
			mouseSupport	: true,
			stationaryBase	: true,
			baseX		: 300,
			baseY		: 300
		});
	}*/