
// (N = +long, S = -long ),  (E = +lat, W = -lat)
//
// christchurch, nz 
//43.5321° S, 172.6362° E
// shanghi, china
//31.2304° N 121.4737° E
// madrid, spain
//40.4168° N, 3.7038° W


let imageMap;
let earthData;

const map = {
    zoom: 5,
    clon: 170,
    clat: -41,
    wdth: 1024,
    hght: 768,
    tokn: "pk.eyJ1IjoiZnJhbmtjNjAiLCJhIjoiY2pxdXg1NGN1MDJwMDQycGN4ank5dms3ZiJ9.iXaCdWnJD6TQoCF2uxWPdA"
};

let bubbles = [];
let x2, y2;



function preload() {
    //           styles/v1/{username}/{style_id}/static/{overlay}/{lon},{lat},{zoom},{bearing},{pitch}|{auto}/{width}x{height}{@2x}
    imageMap = loadImage("https://api.mapbox.com/styles/v1/mapbox/navigation-preview-night-v4/static/"+map.clon+","+map.clat+","+map.zoom+",0,0/"+map.wdth+"x"+map.hght+"?access_token=" + map.tokn);
    // earthData = loadTable("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv","csv","header");
    nzData = loadJSON("https://api.geonet.org.nz/quake?MMI=1");
}



function setup() {
    createCanvas(map.wdth,map.hght);
    image(imageMap,0,0)

    translate(width/2, height/2); //move top left to center
    imageMode(CENTER)

   let b;
    //nz stuff
    for(let t=0; t < nzData.features.length; t++) { //nzData.features.length

        xNz = nzData.features[t].geometry.coordinates[0];
        yNz =nzData.features[t].geometry.coordinates[1];

        magNz = nzData.features[t].properties.magnitude;

        b = new Bubble(xNz,yNz,magNz);
        bubbles.push(b);

        b.make();
    }
}




function draw() {
    document.getElementById("x").innerHTML = int(mouseX);
    document.getElementById("y").innerHTML = int(mouseY);
}





class Bubble {
    constructor(x,y,mag=6) {
        this.x = x;
        this.y = y;
        this.mag = mag;
        if(mag > 5) {
            this.color = "red";
            this.size = 4.1;
        } else if(mag > 4) {
            this.color = "orange";
            this.size = 3.8;
        } else if(mag > 3) {
            this.color = "yellow";
            this.size = 3.4;
        } else if(mag > 2) {
            this.color = "blue";
            this.size = 3;
        } else if(mag > 1) {
            this.color = "green";
            this.size = 2.5;
        } else {
            this.color = "green";
            this.size = 2;
        }
    }



    make() {
        fill(this.color);
        ellipse(Bubble.convertX(this.x) - Bubble.convertX(map.clon), Bubble.convertY(this.y) - Bubble.convertY(map.clat), this.mag*this.size, this.mag*this.size);
       
        //console.log("make: " + this.x, this.y + " - " + x2, y2)
    }



    clicked() {
        ellipse(mouseX, mouseY,15,15)
        console.log(`clicked @ ${int(mouseX)}, ${int(mouseY)}`);

        let d = int(dist(Bubble.convertX(mouseX) - Bubble.convertX(map.clon), Bubble.convertY(mouseY) - Bubble.convertY(map.clat),Bubble.convertX(this.x) - Bubble.convertX(map.clon), Bubble.convertY(this.y) - Bubble.convertY(map.clat)));
        let bRadius = this.size*this.size;
        if(d > bRadius) {
            //console.log("clicked on buddle!!!!")
        }
    }



    static convertX(lon) {
        lon = radians(lon);
    
        let a = ( 256 / PI ) * pow( 2, map.zoom );
    
        let b = lon + PI;
    
        return a * b;
    }
    


    static convertY(lat) {
        lat = radians(lat);
    
        let a = ( 256 / PI ) * Math.pow( 2, map.zoom );
    
        let b = tan( Math.PI / 4 + lat / 2 );
    
        let c = PI - Math.log(b);
        //    console.log(`PI = ${PI}\npow(2,2)=${pow(2,zoom)}\nlat=${lat}\nlog(b) = ${Math.log1p(b)}`)
        return a * c;
    }
}




function mouseClicked() {
   // console.log("bubbles: " + bubbles.length)
   for(let b=0; b < bubbles.length; b++) {
       bubbles[b].clicked();
   }
}

