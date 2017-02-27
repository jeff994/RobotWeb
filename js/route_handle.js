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

