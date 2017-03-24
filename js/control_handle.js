function disable_route_click()
{
	return job_type != Job_Enum.ROUTE_CLICK;
}

function disable_undo()
{
	return (job_type != Job_Enum.ROUTE_CLICK && route_array.length > 0);
}

function insertText (id, txt) {
	document.getElementById(id).innerHTML = txt;
}

function init_parameters()
{
	no_point = 1; 
	route = '{ "route" : ['; 
}

// Set init point with t
function set_init_point()
{
	// First time that a java script object is not defined 
	if(marker_init_point 	== undefined)
	{
		marker_robot	= new BMap.Marker(init_point);  // 创建标注          // 将标注添加到地图中
		marker_init_point = new BMap.Marker(new BMap.Point(init_point.lng,init_point.lat), {
		  // 指定Marker的icon属性为Symbol
		  icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
		    scale: 1,//图标缩放大小
		    fillColor: "pink",//填充颜色
		    fillOpacity: 0.6,//填充透明度
		     strokeWeight: 0.5
		  })
		});

		var markerMenu		= new BMap.ContextMenu();
		markerMenu.addItem(new BMap.MenuItem('视频对话',openVideo.bind(marker_robot)));
		//var icons 			= "img/init_point.png"; //这个是你要显示坐标的图片的相对路径
		//var icon 			= new BMap.Icon(icons, new BMap.Size(32, 32)); //显示图标大小
		//marker_robot.setIcon(icon);//设置标签的图标为自定义图标
		marker_robot.addContextMenu(markerMenu);
		map.addOverlay(marker_init_point);    
		map.addOverlay(marker_robot);    
	}
	else
	{
		marker_init_point.setPosition(init_point);
	}
	map.panTo(init_point);
}

function reset_init_point()
{
	if(job_type != Job_Enum.INIT_POINT)
	{
		job_type = Job_Enum.INIT_POINT;
		insertText("btn_reset_init_point", "Lock Init Point");

	}else
	{
		insertText("btn_reset_init_point", "Reset Init Point");
		job_type = Job_Enum.IDLE;
	}
}

