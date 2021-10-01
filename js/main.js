<div id ="MetaData"> </div>
<script>
async function readMetaData(){
	let url = 'WYO_MetaData.json';
	try{
		let res = await fetch(url);
		
		return await res.json();
	} catch (error) {
		console.log(error);
	}
}

function initMap() {
	let data = readMetaData();
	var count, marker;

	// Init map
	var mapOptions = {
		zoom: 13,
		center: new google.maps.LatLng(data.Lat[0], data.Lon[0]),
		scrollwheel: true,
	};

	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	// Create info window
	var infowindow = new google.maps.InfoWindow({
		maxWidth: 350,
		pixelOffset: new google.maps.Size(-10,-25)
	});

	var infoFn = function (count) {
		return function (e) {
			var content = '<div>' +
				'<span> Name: ' + data.Wellhead(s)[count] + '</span>' +
				'<span>, Detections: ' + data.Detections[count] + '</span>' +
				'<span>, Anomaly: ' + data.Abnormal[count] + '</span>' +
				'<span>, Emission: ' + data.Q_med[count] + '</span>' +
				'<span>, Confidence range: ' + data.Q_low[count] + 'to' + data.Q_high[count] + '</span>' +
				'</div>';
			infowindow.setContent(content);
			infowindow.open(map);
			infowindow.setPosition(new google.maps.LatLng(data.Lat[count], data.Lon[count]));
		}
	};

	// Add markers
	for (count = 0; count < data.length; count++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(data.Lat[count], data.Lon[count]),
			map: map,
			title: data.Wellhead(s)[count]
		});
		marker.setMap(map);

		let fn = infoFn(count);
		google.maps.event.addListener(marker, 'click', fn);
	}
}
</script>
