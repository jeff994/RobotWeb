 function RouteObject (init_point, array_route, no_runs = 10) {
    this.init_point 	= init_point; 
    this.route 			= array_route; 
    this.runs 			= no_runs;
}

 function init_parameters()
  {
    no_point = 1; 
    route = '{ "route" : ['; 
  }

 function reset_init_point()
{
		lat = 31.2112262;
		lon = 121.635139;
		point = new BMap.Point(lon, lat);
		init_marker()
}

function undo_ctrl_point()
{
	route_array.pop();
	draw_route_loop(route_array);
	if(route_array.length == 0)
	{
		map.removeOverlay(overlay_init);
	}
}



// publish the route to robot 
function save_route()
{
	// Convert the data to the required format, then publish it to our robot 
	// Each robot could only have 1 task at one time 
	var route_object = new RouteObject(init_point, route_array, no_runs);
	//console.log(route_object);
	var json = JSON.stringify(route_object);
	console.log(json);
	publish_job(json);

}

// Init the html page for route 
function init_route()
{
	if(job_type != Job_Enum.ROUTE_CLICK)
	{
	/*	map.clearOverlays();
		lat = 31.2112262;
		lon = 121.635139;
		point = new BMap.Point(lon, lat);
		if(marker == undefined)
			marker = new BMap.Marker(point)
		else 
			marker.setPosition(point);
		map.panTo(point);
		map.addOverlay(marker);
		//init_robot(); */
		init_parameters(); 
		job_type = Job_Enum.ROUTE_CLICK; //开始点击定义任务
		document.getElementById('save_route').disabled = false; 
		document.getElementById('demo_route').disabled = true; 
		document.getElementById('undo_route_click').disabled = false; 
		document.getElementById('start_route_click').firstChild.data = "end";
	}else 
	{
		document.getElementById('save_route').disabled = true; 
		document.getElementById('demo_route').disabled = false; 
		document.getElementById('undo_route_click').disabled = true; 
		job_type = Job_Enum.IDLE;
		document.getElementById('start_route_click').firstChild.data = "start";
	}
}
