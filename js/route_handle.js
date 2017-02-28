 function ControlPoint (lon, lat, bearing = 0) {
    this.lon = lon; 
    this.lat = lat;
    this.bearing = bearing;
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
		document.getElementById('start_route_click').firstChild.data = "end";
	}else 
	{
		document.getElementById('save_route').disabled = true; 
		document.getElementById('demo_route').disabled = false; 
		job_type = Job_Enum.IDLE;
		document.getElementById('start_route_click').firstChild.data = "start";
	}
  }
