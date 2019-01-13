const accessToken = 'pk.eyJ1IjoiZnJhbmtjNjAiLCJhIjoiY2pxdXg1NGN1MDJwMDQycGN4ank5dms3ZiJ9.iXaCdWnJD6TQoCF2uxWPdA';


// (N = +long, S = -long ),  (E = +lat, W = -lat)
// christchurch, nz 
//43.5321° S, 172.6362° E
// shanghi, china
//31.2304° N 121.4737° E
// madrid, spain
//40.4168° N, 3.7038° W


let imageMap;
let earthData;

let zoom = 1;

const clon = 0;
const clat = 0;


let lon = -43.5321;
let lat = 172.6362;

function preload() {
//                                               styles/v1/{username}/{style_id}/static/{overlay}/{lon},{lat},{zoom},{bearing},{pitch}|{auto}/{width}x{height}{@2x}
    imageMap = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/0,0,"+zoom+",0,0/1024x700?access_token=" + accessToken);
    earthData = loadTable("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv","csv","header");


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



  /*   fill("red")
    ellipse(x,y,10,10)
    ellipse(1,1,10,10)
 */
    //console.log(earthData.rows[0])
    let ecl, cl;
    for(let w=0; w < earthData.rows.length; w++) {

        ecl = map(earthData.rows[w].arr[4],0,10,5,12)

        if(ecl > 9) {
            cl = "red"
        } else if(ecl > 8) {
            cl = "orange"
        } else if(ecl > 7) {
            cl = "yellow"
        } else if(ecl > 6) {
            cl = "blue"
        } else if(ecl > 5) {
            cl = "green"
        } else {
            cl = "white"
        }
         
        fill(cl)
        ellipse((convertX(earthData.rows[w].arr[2]) - cx), (convertY(earthData.rows[w].arr[1]) - cy), ecl, ecl );
    }
}

const convertX = (lon) => {
    lon = radians(lon);

    let a = ( 256 / PI ) * pow( 2, zoom );

    let b = lon + PI;

    return a * b;
}

const convertY = (lat) => {
    lat = radians(lat);

    let a = ( 256 / PI ) * Math.pow( 2, zoom );

    let b = tan( Math.PI / 4 + lat / 2 );

    let c = PI - Math.log(b);
    
//    console.log(`PI = ${PI}\npow(2,2)=${pow(2,zoom)}\nlat=${lat}\nlog(b) = ${Math.log1p(b)}`)
    return a * c;
}



