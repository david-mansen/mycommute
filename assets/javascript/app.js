$(document).ready(function(){


  
  function buildPropertyObjects(propertiesJSON){
    var properties = [];

    console.log(propertiesJSON.property[0]);

    for(let i=0; i<propertiesJSON.property.length; i++){
      var temp = propertiesJSON.property[i];
      var property = {
        distance: temp.location.distance,
        latitude: temp.location.latitude,
        longitude: temp.location.longitude
      };
      properties.push(property);
    }
    console.log(properties);
    return properties;
  }

  function retrieveProperties(){
    var url = "https://search.onboard-apis.com/propertyapi/v1.0.0/property/address";
    var parameters = $.param({
      'address1': "10838 Heather Ridge Circle",
      'address2': "Orlando, FL 32817",
      'radius': 10,
      'orderby': "distance",
      'pagesize': 100
    });

    url+="?"+parameters;

    if(window.localStorage.getItem(url)){
      console.log("retrieving from cache");
      var cachedProperty = JSON.parse(window.localStorage.getItem(url));
      //console.log(cachedProperty);
      buildPropertyObjects(cachedProperty);
    }
    else{
      console.log("Making request to",url);

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
          "apikey": "e497790fddc100419fd40da7adce6d2c",
          "accept": "application/json",
          "cache-control": "no-cache",
          "postman-token": "9a64831b-b44f-501f-b94b-4528059aca82"
        }
      }

      $.ajax(settings).done(function (response) {
        //console.log(response);
        window.localStorage.setItem(url, JSON.stringify(response));
        buildPropertyObjects(response);
      });
    }
  }

  // function zillowTest(){
  //   var url = "http://www.zillow.com/webservice/GetSearchResults.htm"
  //
  //   var parameters = $.param({
  //     'zws-id': "X1-ZWz1962gltdszv_4srxq",
  //     'address': "6773 Red Reef Street",
  //     'citystatezip': "Lake Worth, FL",
  //     'rentzestimate': "false"
  //   });
  //
  //   url+= "?"+parameters;
  //
  //   $(document).ready(function () {
  //     $.ajax({
  //       type: "GET",
  //       url: url,
  //       dataType: "xml",
  //       success: function(xml) {
  //         console.log(xml);
  //
  //       }
  //     });
  //   });
  // }


  $("#startButtonInner").on("click", retrieveProperties);
});
