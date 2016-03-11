angular.module("FamilyPlusApp").factory("checkinFactory",['$http',function($http)
{
    var factory ={};

    factory.add = function(data)
    {
       $http({
                    method:'post',
                    url:'http://10.12.42.58:3001/checkin',
                    data:data,
                    headers:{'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}
                   }).success(function(data)
                   {
                    
                   return data;
                 

                   }).error(function(status,data)
                   {
                      alert("error in check in");
                   });

    };

    factory.getData =function(data)
    {

                  $http({
                    method:'post',
                    url:'http://10.12.42.58:3001/getCheckinData',
                    data:data,
                    headers:{'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}
                  }).success(function(data)
                  {
                     return data;
                  }).error(function(status,data)
                  {

                  });
    }

        return factory;

    
            }
           
          
]);