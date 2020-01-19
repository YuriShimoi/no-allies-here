function addonmessagescreenfunc(){}
function message(text, triggerfunc=addonmessagescreenfunc,triggerfuncargs=[]){
	var html =  "<div id='addonmessagescreen' style='display:block;position:absolute;width:100%;height:100%;"+
							"top:0;left:0;background-color:#44444455;z-index:100'>"+
								"<div style='display:inline-block;position:absolute;left:50%;top:50%;z-index:101;"+
								"transform:translate(-50%,-50%);background-color:#0a0a0a;padding:20px;color:white;"+
								"box-shadow:#0a0a0a 0 0 10px 10px'>"+
									text+
									"<span style='text-decoration:none;margin-top:20px;background-color:#0a0a0a;cursor:pointer;"+
									"box-shadow:#0a0a0a 0 0 10px 10px;width:100%;display:inline-block;color:#929292;"+
									"text-align:center;transition:color 0.3s,background-color 0.6s,box-shadow 0.6s;'"+
									" onmouseover='{this.style.color=\"white\";this.style.backgroundColor=\"black\";"+
									"this.style.boxShadow=\"black 0 0 10px 10px\"}'"+
									" onmouseout='{this.style.color=\"#929292\";this.style.backgroundColor=\"#0a0a0a\";"+
									"this.style.boxShadow=\"#0a0a0a 0 0 10px 10px\"}'"+
									" onclick='{$(\"#addonmessagescreen\").remove();"+
									triggerfunc.name+".apply(this,eval("+JSON.stringify(triggerfuncargs)+"));}'>"+
									"Fechar</span>"+
								"</div>"
							"</div>";
	$("body").append(html);
}

function loadTransition(loadmessage="Loading...", duration=3000, fadeintime=200, fadeouttime=500, framevelocity=3000, frameskip=24){
	var html =  "<div id='addontransitionscreen' style='display:block;position:absolute;width:100%;height:100%;"+
							"top:0;left:0;background-color:black;z-index:100;opacity:0'>"+
								"<img id='addontransitionstairs' style='display:inline-block;position:absolute;left:50%;top:50%;"+
								"z-index:101;transform:translate(-50%,-75%);clip: rect(120px,240px,240px,120px);' src='img/stairs3.svg'>"+
								"<span style='display:inline-block;position:absolute;left:50%;top:50%;z-index:101;"+
								"transform:translate(-50%);margin-left:20px;font-size:20px;text-align:center'>"+
								loadmessage+
								"</span>"+
							"</div>";
	
	$("body").append(html);


	// fadein
	$("#addontransitionscreen").animate({
		"opacity":"1"
	},fadeintime);

	setTimeout(function(){
		// animate stairs
		for(var i=0;i<=duration;i+=frameskip){
			var steptime = Math.floor(((120/framevelocity)*i)%120);

			setTimeout(function(steptime){
				$("#addontransitionstairs").css({
					"clip"  : 'rect('+(120-steptime)+'px,'+(240-steptime)+'px,'+(240-steptime)+'px,'+(120-steptime)+'px)',
					"margin": steptime+'px 0 0 '+ steptime+'px'
			});
			},i,steptime);
		}

		setTimeout(function(){
			// fadeout
			$("#addontransitionscreen").animate({
				"opacity":"0"
			},fadeouttime);
			setTimeout(function(){
				// finish
				$("#addontransitionscreen").remove();
			},fadeouttime);
		},duration);
	},fadeintime);
}