
function init_map(div_name, init_point)
{
    // create a map for div 'allmap'
    map = new BMap.Map(div_name);
    // Add some scale control and navigation control for baidu map 
    map.addControl(new BMap.ScaleControl());  
    map.addControl(new BMap.NavigationControl());  
    map.centerAndZoom(init_point, 19);     
}

function  draw_route_loop(route_array)
{
	if(overlay_route == undefined)
	{
		overlay_route = new BMap.Polyline(route_array, {strokeColor:"blue", strokeWeight:3, strokeOpacity:0.5});
		map.addOverlay(overlay_route);
	}
	else 
		overlay_route.setPath(route_array);
}

function draw_init_route_link(init_point, loop_start_point)
{
	if(overlay_init == undefined)
	{

		overlay_init = new BMap.Polyline([init_point, loop_start_point], {strokeColor:"red", strokeWeight:3, strokeOpacity:0.5});
		map.addOverlay(overlay_init);
	}else
		overlay_init.setPath([init_point, loop_start_point]);

}