/*
* @Author: Administrator
* @Date:   2018-03-31 08:59:05
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-08 16:09:36
*/
var weather;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=吕梁",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		weather=obj.data.weather;
		console.log(weather);
	}
})


var city;
$.ajax({
    url: "https://www.toutiao.com/stream/widget/local_weather/city/",
    type: "get",
    dataType: "jsonp",
    success:function(obj){
        city=obj.data;
        console.log(city);
    }
})


function updata(){
	// 城市名
	var city_name=document.querySelector(".city");
	city_name.innerHTML=weather.city_name;
	// 当前温度
	var tamputer=document.querySelector(".tamputer");
    tamputer.innerHTML=weather.current_temperature+"°";
    // 当前天气情况
    var condition=document.querySelector(".condition");
    condition.innerHTML=weather.current_condition;
    // 今天最高温度
    var dat_high_temperature=document.querySelector("#dat_high_temperature");
    dat_high_temperature.innerHTML=weather.dat_high_temperature;
    // 今天最低温度
    var dat_low_temperature=document.querySelector("#dat_low_temperature");
    dat_low_temperature.innerHTML=weather.dat_low_temperature+"°";
    // 今天天气状况
    var dat_condition=document.querySelector("#dat_condition");
    dat_condition.innerHTML=weather.dat_condition;
    // 明天最高温度
    var tomorrow_high_temperature=document.querySelector("#tomorrow_high_temperature");
    tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
    // 明天最低温度
    var tomorrow_low_temperature=document.querySelector("#tomorrow_low_temperature");
    tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature+"°";
    // 明天天气状况
    var tomorrow_condition=document.querySelector("#tomorrow_condition");
    tomorrow_condition.innerHTML=weather.tomorrow_condition;
    // 今天icon
    var dat_weather_icon_id=document.querySelector("#dat_weather_icon_id");
    dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png)`;
    // 明天icon
    var tomorrow_weather_icon_id=document.querySelector("#tomorrow_weather_icon_id");
    tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png)`;
    // 获取类型对象
    for(var i in weather.hourly_forecast){
        var now=document.createElement("div");
        now.className="now";
        var wrap=document.querySelector(".wrap");
        wrap.appendChild(now);

        var h2=document.createElement("h2");
        h2.className="now_time";
        h2.innerHTML=weather.hourly_forecast[i].hour+":00";
        now.appendChild(h2); 
     
        var icon=document.createElement("div");
        icon.className="now_icon";
        icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png)`;
        now.appendChild(icon); 


        var now_temp=document.createElement("h2");
        now_temp.className="now_temp";
        now_temp.innerHTML=weather.hourly_forecast[i].temperature+"°";
        now.appendChild(now_temp);
    }  

    for(var j in weather.forecast_list){
        var con=document.createElement("div");
        con.className="con";
        var wrap1=document.querySelector(".wrap1");
        wrap1.appendChild(con); 

        var con_date=document.createElement("div");
        con_date.className="con_date";
        con_date.innerHTML=weather.forecast_list[j].date.slice(5,7)+"/"+weather.forecast_list[j].date.slice(8);
        con.appendChild(con_date);

        var con_weaH=document.createElement("div");
        con_weaH.className="con_weaH";
        con_weaH.innerHTML=weather.forecast_list[j].condition;
        con.appendChild(con_weaH);

        var con_picH=document.createElement("div");
        con_picH.className="con_picH";
        con_picH.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png)`;
        con.appendChild(con_picH);

        var con_high=document.createElement("div");
        con_high.className="con_high";
        con_high.innerHTML=weather.forecast_list[j].high_temperature;
        con.appendChild(con_high);

        var con_low=document.createElement("div");
        con_low.className="con_low";
        con_low.innerHTML=weather.forecast_list[j].low_temperature;
        con.appendChild(con_low);

        var con_picL=document.createElement("div");
        con_picL.className="con_picL";
        con_picL.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png)`;
        con.appendChild(con_picL);

        var con_wind=document.createElement("div");
        con_wind.className="con_wind";
        con_wind.innerHTML=weather.forecast_list[j].wind_direction;
        con.appendChild(con_wind);

        var con_level=document.createElement("div");
        con_level.className="con_level";
        con_level.innerHTML=weather.forecast_list[j].wind_level+"级";
        con.appendChild(con_level);

        // var a="2018-03-21";
        // var b=a.slice(5,7);
        // console.log(b);
        // var c=a.slice(8);
        // console.log(c);
        // var d=a+"/"+c;
    }

    for(var m in city){
        var div=document.createElement("div");
        div.className="l_cityt";
        div.innerHTML=m;
        var l_city=document.querySelector(".l_city");
        l_city.appendChild(div);  
    
        var l_cityz=document.createElement("ul");
        l_cityz.className="l_cityz";
        // var l_city=document.querySelector(".l_city");
        l_city.appendChild(l_cityz); 
    
    for(var n in city[m]){
        var li=document.createElement("li");
        li.className="span";
        li.innerHTML=n;
        l_cityz.appendChild(li);
    }
}

}

function AJAX(str){
    var url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
    $.ajax({
    url:url1,
    dataType:"jsonp",
    type:"get",
    success:function(obj){
        weather=obj.data.weather;
        updata();
        $(".location").css({"display":"none"});
       
    }
})
     }
window.onload=function(){
	updata();
    $(".span").on("click",function(){
            var cityh=this.innerHTML;
            AJAX(cityh);
    })
    $("header").on("click",function(){
            var cityb=this.innerHTML;
            $(".location").css({"display":"block"});
})
    $("input").on("focus",function(){
            $(".sear_right").html("搜索");
})
    var button=document.querySelector(".sear_right");
    button.onclick=function(){
        var text=button.innerText;
        console.log(text);
        if(text=="取消"){
             $(".location").css({"display":"none"});
        }
        else{
            var str1=document.querySelector("input").value;
            for(var i in city){
                for(var j in city[i]){
                    if(str1==j){
                        AJAX(str1);
                        return;
                    }
                }
        }
        alert("没这地儿！")
    }
}
}








