const curl = './scripts/config.json';
var ip = '192.168.1.15';
const url ='http://' + ip + '/ServerScripts/chartdata.json'; ///< server app with JSON API   
var timer;

getConfig();
function getConfig(){
    /// Send request
	$.ajax( 
	{	
		url: curl,
		type: 'GET',
		dataType: 'json',
		/// success callback
		success: function(responseJSON, status, xhr) {	
			ip = responseJSON.ip;
			
		},
		/// error callback
		error: function(response){
		alert(response)}
	});
}

function getData(){
    $.ajax({
        url : url,
		type: 'GET',
        dataType: 'json',
		success: function(responseJSON, status, xhr) {
			console.log(responseJSON);
            var len = Object.keys(responseJSON).length;
            generateTable(responseJSON, len)
		},
        error: function(){
            console.log('error')
        }
	});
}
function generateTable(responseJSON, len){
    var tableH = document.getElementById('table-holder');
    tableH.removeChild(tableH.childNodes[0])
    tableC = document.createElement('div')
    tableC.setAttribute("id", 'table-content')
    tableH.appendChild(tableC)
    for(key in responseJSON){
        

            var tab = document.createElement("TR");
            tab.innerHTML = "<h4>" + key + "</h>" + ": "  + responseJSON[key].toFixed(2);
            document.getElementById('table-content').appendChild(tab);

        
    }
}
function startTimer(){
	timer = setInterval(getData, 100);
}
function stopTimer(){
	clearInterval(timer);
}
$(document).ready(function (){
    $("#start").click(startTimer);
    $("#stop").click(stopTimer);

});
