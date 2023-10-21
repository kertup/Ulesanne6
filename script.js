(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 10);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours()%12 || 12;
            let m = date.getMinutes();
            let s = date.getSeconds();
			let hbaas = date.getHours();

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }
			if (hbaas < 12) {
             c.innerHTML = h + ":" + m + ":" + s + " EL";   
				} else {
				c.innerHTML = h + ":" + m + ":" + s + " PL";
				}
			
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
function estimateDelivery(event) {
    event.preventDefault();
    
    let linn = document.getElementById("linn");
    let v1 = document.getElementById("v1");
    let v2 = document.getElementById("v2");
	
	let fname = document.getElementById("fname");
    let lname = document.getElementById("lname");
    
    let paber = document.getElementById("paber");
	let papp = document.getElementById("papp");

if (fname.value.trim() === "") {
        alert("Palun sisestage eesnimi");
        fname.focus();
        return;
    }

    if (lname.value.trim() === "") {
        alert("Palun sisestage perekonnanimi");
        lname.focus();
        return;
    }
	
	    if (linn.value === "") {
        alert("Palun valige linn nimekirjast");
        linn.focus();
        return;
    }
	
	 if (!paber.checked && !papp.checked) {
        alert("Palun valige pakendi eelistus");
        return;
    }

    //Hinnad ainult linna valides
    let linnaHind = 0;
    switch (linn.value) {
        case "tln":
            linnaHind = 0;
            break;
        case "trt":
        case "nrv":
            linnaHind = 2.5;
            break;
        case "prn":
            linnaHind = 3;
            break;
    }

    // Checkboxidest juurde liidetavad hinnad
    let kokkuHind = linnaHind;
    if (v1.checked) {
        kokkuHind += 5;
    }
    if (v2.checked) {
        kokkuHind += 1;
    }

    // 
    e.innerHTML = kokkuHind.toFixed(2) + " &euro;";

    console.log("Tarne hind on arvutatud");
}
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";

    let tartuPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        zoom: 14,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(tartuPoint, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });

    map.entities.push(pushpin);


    let viljandiPoint = new Microsoft.Maps.Location(
        58.36306,
        25.59375
    );

    let viljandiPushpin = new Microsoft.Maps.Pushpin(viljandiPoint, {
        title: 'Viljandi linn'
    });

    map.entities.push(viljandiPushpin);

    map.setView({
        bounds: Microsoft.Maps.LocationRect.fromLocations([tartuPoint, viljandiPoint]),
    });
function createInfobox(location, title) {
    const infobox = new Microsoft.Maps.Infobox(location, {
        title: title,
        description: 'Siin asub ' + title,
        visible: false,
        showPointer: false,
    });
    infobox.setMap(map);
    return infobox;
}

const tartuInfobox = createInfobox(tartuPoint, 'Tartu Ülikool');
const viljandiInfobox = createInfobox(viljandiPoint, 'Viljandi linn');


Microsoft.Maps.Events.addHandler(pushpin, 'click', function () {
    tartuInfobox.setOptions({ visible: true });
    viljandiInfobox.setOptions({ visible: false });
});

Microsoft.Maps.Events.addHandler(viljandiPushpin, 'click', function () {
    viljandiInfobox.setOptions({ visible: true });
    tartuInfobox.setOptions({ visible: false });
});
};



// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

