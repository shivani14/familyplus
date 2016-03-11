angular.module("FamilyPlusApp").factory("getCheckinDataFactory",['$http',function($http)
{
   
    
        return {
                getData:function(data)
                {
                  alert(data);
                  $http({
                    method:'post',
                    url:'http://10.12.42.58:3001/getCheckinData',
                    data:data,
                    headers:{'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}
                  }).success(function(data)
                  {
                      if(data != "false")
                      {
                        return data;
                      }
                      else
                      {
                        return false;
                      }
                  }).error(function(status,data)
                  {

                  });
                }
            }
           }
          
]);