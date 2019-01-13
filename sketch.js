const accessToken = 'pk.eyJ1IjoiZnJhbmtjNjAiLCJhIjoiY2pxdXg1NGN1MDJwMDQycGN4ank5dms3ZiJ9.iXaCdWnJD6TQoCF2uxWPdA';


// (N = +long, S = -long ),  (E = +lat, W = -lat)
// christchurch, nz 
//43.5321° S, 172.6362° E
// shanghi, china
//31.2304° N 121.4737° E



let imageMap;
let zoom = 1;
const clat = 0;
const clon = 0;

let lat = 31.2304;
let lon = 121.4737;

function preload() {
//                                               styles/v1/{username}/{style_id}/static/{overlay}/{lon},{lat},{zoom},{bearing},{pitch}|{auto}/{width}x{height}{@2x}
    imageMap = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/120,0.05,"+zoom+",0,0/1024x700?access_token=pk.eyJ1IjoiZnJhbmtjNjAiLCJhIjoiY2pxdXg1NGN1MDJwMDQycGN4ank5dms3ZiJ9.iXaCdWnJD6TQoCF2uxWPdA");

}

function setup() {
    createCanvas(1024,700);
    image(imageMap,0,0)

    translate(width/2, height/2); //move top left to center
   // imageMode(CENTER)

    let cx = convertX(clon);
    let cy = convertY(clat);

    let x = convertX(lat) - cx;
    let y = convertY(lon) - cy;

console.log(x,y)



    fill("red")
    ellipse(x,y,30,30)
    ellipse(1,1,10,10)

    

}

convertX = (lon) => {
    lon = radians(lon);

    let a = ( 256 / PI ) * pow( 2, zoom );

    let b = lon + PI;

    return a * b;
}

convertY = (lat) => {
    lat = radians(lat);



    let a = ( 256 / PI ) * Math.pow( 2, zoom );

    let b = tan( (Math.PI / 4) + (lat / 2) );

    let c = PI - Math.log1p(b);
    
    console.log(`PI = ${PI}\npow(2,2)=${pow(2,zoom)}\nlat=${lat}\nlog(b) = ${Math.log1p(b)}`)
    return a * c;
}



