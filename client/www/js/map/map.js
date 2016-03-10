angular.module("FamilyPlusApp").factory("mapFactory",[function()
{
	 var map;
	 var div = document.getElementById("map_canvas");
	 return {
            getmap: function ()
            {
            	
            	map = window.plugin.google.maps.Map.getMap(div);
            	return map;
         
         
            }




        }

    }]);

	
