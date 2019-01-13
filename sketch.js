const accessToken = 'pk.eyJ1IjoiZnJhbmtjNjAiLCJhIjoiY2pxdXg1NGN1MDJwMDQycGN4ank5dms3ZiJ9.iXaCdWnJD6TQoCF2uxWPdA';

// christchurch, nz 
//43.5321° S, 172.6362° E




let imageMap;

function preload() {
//                                               styles/v1/{username}/{style_id}/static/{overlay}/{lon},{lat},{zoom},{bearing},{pitch}|{auto}/{width}x{height}{@2x}
    imageMap = loadImage("https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/120,0.05,2,180,0/900x600?access_token=pk.eyJ1IjoiZnJhbmtjNjAiLCJhIjoiY2pxdXg1NGN1MDJwMDQycGN4ank5dms3ZiJ9.iXaCdWnJD6TQoCF2uxWPdA");

}

function setup() {
    createCanvas(900,600);
    image(imageMap,0,0)

    fill("red")
    ellipse(100,100,10,10)
    
}




