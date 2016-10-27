

var scale, melody, context; 
var sdots, tones; 
var TWO_PI, f0 , x0, y0, u, r_p, r_12, r_53, r_z4, r_z7, r_s;
var rs, hues, descr, xM, yM;
var t, playk;

function SDot (x, y, o) {

    this.xPos, this.yPos; // coordinates on syntonic grid; {0,0} the point of reference has frequency = 1
    this.xx, this.yy; // coordinates of syntonic grid povar on canvas
    this.on;
    this.c_freq; // current frequency: number in [1, 2)
    this.c_octave; // current octave
    this.c_scale;  // current scale Synt = 0, Pyth = 1, 12-tet = 2, 53-tet = 3, Zarl_4 = 4, Zarl_7 = 5
    this.frs = [-1, -1, -1, -1, -1, -1]; // frequencies: Synt, Pyth, 12-tet, 53-tet, Zarl_4, Zarl_7
    this.xs = [0, 0, 0, 0, 0, 0];  // x-coordinates on the concentric circles
    this.ys = [0, 0, 0, 0, 0, 0];  // y-coordinates on the concentric circle

    var freq; // syntonic frequency
    var x_53, y_53, x_12, y_12, x_z4, y_z4, x_z7, y_z7, x_p, y_p;
    var x_s, y_s;
    var f_z4, f_z7; //Zarlino temperaments
    var f_53, f_12;  // tet frequencies
    var f_p; // Pythagorean frequency
    var p_53;  // 53-tet pitch
    var p_12;  // 12-tet pitch
    var powOf2;
    var c_7 = Math.pow(81./80, 1./7), phi=0; 

    this.xPos = x;
    this.yPos = y;
    this.xx = x0 + this.xPos*u;
    this.yy = y0 - this.yPos*u;
    freq = Math.pow(3, this.xPos)*Math.pow(5, this.yPos);
    powOf2 = Math.floor(Math.log(freq)/Math.log(2));
    freq = freq * Math.pow(2, -powOf2); // results in a frequency factor between 1 and 2
    f_z4 = Math.pow(Math.pow(5, 0.25), this.xPos)*Math.pow(5, this.yPos);
    powOf2 = Math.floor(Math.log(f_z4)/Math.log(2));
    f_z4 = f_z4 * Math.pow(2, -powOf2);
    f_z7 = Math.pow(3.*Math.pow(c_7, -2), this.xPos) * Math.pow(5./c_7, this.yPos);
    powOf2 = Math.floor(Math.log(f_z7)/Math.log(2));
    f_z7 = f_z7 * Math.pow(2, -powOf2);
    f_p = Math.pow(3., this.xPos+ 4*this.yPos);
    powOf2 = Math.floor(Math.log(f_p)/Math.log(2));
    f_p = f_p * Math.pow(2, -powOf2);

    p_53 = ((31*this.xPos + 17*this.yPos)%53 + 53)%53; // to make it positive
    p_12 = ((7*this.xPos + 4*this.yPos)%12 +12)%12; 

    f_53 = Math.pow(2, p_53/53.);
    f_12 = Math.pow(2, p_12/12.);

    this.frs[0] = freq;
    this.frs[1] = f_p;
    this.frs[2] = f_12;
    this.frs[3] = f_53;
    this.frs[4] = f_z4;
    this.frs[5] = f_z7;

    x_53 = xM + r_53*Math.sin(p_53*TWO_PI/53);
    y_53 = xM - r_53*Math.cos(p_53*TWO_PI/53);
    x_12 = xM + r_12*Math.sin(p_12*TWO_PI/12);
    y_12 = xM - r_12*Math.cos(p_12*TWO_PI/12);

    phi = Math.log(f_p)/Math.log(2)*TWO_PI;
    x_p = xM + r_p*Math.sin(phi);
    y_p = yM - r_p*Math.cos(phi);
    phi = Math.log(f_z4)/Math.log(2)*TWO_PI;
    x_z4 = xM + r_z4*Math.sin(phi);
    y_z4 = yM - r_z4*Math.cos(phi);
    phi = Math.log(f_z7)/Math.log(2)*TWO_PI;
    x_z7 = xM + r_z7*Math.sin(phi);
    y_z7 = yM - r_z7*Math.cos(phi);
    phi = Math.log(freq)/Math.log(2)*TWO_PI;
    x_s = xM + r_s*Math.sin(phi);
    y_s = yM - r_s*Math.cos(phi);

    this.xs[0] = x_s; 
    this.ys[0] = y_s;
    this.xs[1] = x_p; 
    this.ys[1] = y_p;
    this.xs[2] = x_12; 
    this.ys[2] = y_12;
    this.xs[3] = x_53; 
    this.ys[3] = y_53;
    this.xs[4] = x_z4; 
    this.ys[4] = y_z4;
    this.xs[5] = x_z7; 
    this.ys[5] = y_z7;

    this.on = o;


    this.sw_on = function (k, i, time) {

      if(this.on == 0) tones[k][i].play(f0*this.c_freq*Math.pow(2, this.c_octave), time); 
      this.on=1;

      console.log("Play tone - scale ", k, "tone, ", i, "Freq: ", this.c_freq);
    };
    
    this.sw_off = function (k, i, time) {
      if (time) tones[k][i].hold = false;
      if(this.on == 1 && !tones[k][i].hold) tones[k][i].stop();
      this.on = 0;
      //console.log("Tone stopped - scale: ", k, "tone",i, "Freq: ", this.c_freq);
    };

    this.set_cFreq = function(f) {
      this.c_freq = f;
    };

    this.set_cScale = function (j) {
      this.c_scale = j;
    };

    this.set_cOct = function (d) {
      this.c_octave = d;
    }
};

function setup() {

  // -------------------------------------------------
  // initialize variables the global variables for p5js in the setup
  // see explanation below .....

  scale = [[0, 0], [-1, 2], [-2, 1], [1, -1], [0, 1], [-1, 0], [-2, 2], [1, 0], [0, 2], [-1, 1], [2, -1], [1, 1]]; // chromatic scale --> Holder

  melody = [[-1, -1], 
  [-1,24],[-1,28],[-1,31],[-1,28],[-1,24],[-1,31],[-1,28],[-1,24],[-1,36],
  [7,35],[11,35],[14,31],[11,38],[7,35],[14,31],[11,38],[7,35],[17,31], 
  [16,36],[16,31],[12,28],[19,34],[16,31],[12,28],[19,34],[16,31],[12,28],
  [17,33],[21,29],[17,26],[14,23],[17,26],[14,29],[11,33],[12,31],[14,29],
  [16,31],[16,31],[-1,-1], // + 1 semitone
  [-1,25],[-1,29],[-1,32],[-1,29],[-1,25],[-1,32],[-1,29],[-1,25],[-1,37],
  [8,36],[12,36],[15,32],[12,39],[8,36],[15,32],[13,39],[8,36],[18,32], 
  [17,37],[17,32],[13,29],[20,35],[17,32],[13,29],[20,35],[17,32],[13,29],
  [18,34],[22,30],[18,27],[15,24],[18,27],[15,30],[12,34],[13,32],[15,30],
  [17,32],[17,32],[-1,-1],[-1,-1],[-1,-1]]; 


  sdots = new Array(scale.length); // new SDot[scale.length];
  tones = new Array(scale.length); // new Osc[scale.length][melody[0].length];

  for (i= 0; i < scale.length; i++) tones[i] = [];

  TWO_PI = 2*Math.PI;

  f0 = 180; // reference frequence
  x0 =80, y0 = 120; // position of the origin of the grid
  u = 20; // unit of grid coordinate system

  // Radius of circles
  r_p = 110, r_12 = 130, r_53 = 150, r_z4 = 170, r_z7 = 190, r_s = 210;

  // list of radius
  rs = [r_s, r_p, r_12, r_53, r_z4, r_z7];

  // colour of circles?
  hues = [0, 60, 120, 180, 240, 300];
  descr = ["Synt", "Pyth", "12-tet", "53-tet", "Zarl_4", "Zarl_7"];
  xM = 300, yM = 300; // center of circle
  t = 0;
  playk = 0;

  // Variables moved from top to here (setup) and initialized with the values
  // It is necessary for p5js with global variables to define them in setup or draw
  // -------------------------------------------------------------------------------------

  Synth.init();

  var diagram = createCanvas(700, 600);
  
  diagram.parent("diagram");
  
  ellipseMode(RADIUS);
  
  colorMode(HSB, 360);
  
  for (var k=0; k < sdots.length; k++) { 

    sdots[k] = new SDot(scale[k][0], scale[k][1], 0);

    for(var i = 0; i < melody[0].length; i++){
      tones[k][i] = new Sound();
    }
  };

  for (var k=0; k < sdots.length; k++) { 
    console.log("sdots: ", sdots[k].frs);
  };

};

function draw () {

  background(359); // 
  fill(0); // 
  t = (t+1)% 30; // cycle of xx frames

  // Play the melody if mouse is over circles beside
  // Loop through circles beside

  for (var j = 0; j < rs.length; j++) {

    // look if distance is less than 7 pixels
    if (dist(20, yM + rs[j], mouseX, mouseY) < 7) {
      tones
      // if time = 0 (Circle through frames, half secound)
      if ( t == 0) {
        //console.log("Play Melody", rs, playk, m_k);
        for (var i = 0; i < melody[0].length; i++) {
          if (melody[playk][i] != -1) {
            sdots[melody[playk][i] % scale.length].set_cFreq(-1.);
            sdots[melody[playk][i] % scale.length].sw_off(melody[playk][i] % scale.length, i, 0.5);
          }
        }
        playk = (playk+1) % melody.length;
        for (var i = 0; i < melody[0].length; i++) {
          var m_k = melody[playk][i] % scale.length;
          var oct = parseInt(melody[playk][i] / scale.length);

          if (melody[playk][i] != -1) {
             console.log("Melody: ", m_k, "octave: ", oct, "scale.length", scale.length)
            sdots[m_k].set_cScale(j);
            sdots[m_k].set_cFreq(sdots[m_k].frs[j]);
            sdots[m_k].set_cOct(oct);
            sdots[m_k].sw_on(m_k, i, 0.5);
          }
        }
      }
      fill(hues[j], 359, 359);
      ellipse(20, yM + rs[j], 7, 7);
    }
  }
  // ---------------------------------------------

  line(x0-10, y0, x0+10, y0);
  line(x0, y0-10, x0, y0+10);
  noFill();
  for (var j = 0; j < rs.length; j++) {
    stroke(hues[j], 359, 359);
    ellipse(20, yM + rs[j], 7, 7);
    fill(0); noStroke();
    text(descr[j], 40, yM + rs[j] + 5);
    noFill(); stroke(hues[j], 359, 359);
    ellipse(xM, yM, rs[j], rs[j]);
  }

  var n_t = 0;
  for (var k=0; k < sdots.length; k++) { 
    if (sdots[k].on == 1) {
      n_t++;
      fill(0); noStroke();
      // Another method for fixed size: toPrecision(5) (whole length) 
      // or toFixed(4) (fixed number of digits)

      text("synt: " + Math.round(10000*sdots[k].frs[0])/10000., 100 , 20 + n_t*20);
      text("curr: " + Math.round(10000*sdots[k].c_freq)/10000., 200, 20 + n_t*20);

      // Desciptions of tone beside the diagram
      text(descr[sdots[k].c_scale], 50, 60);
      for (var j = 0; j < rs.length; j++) {
        fill(hues[j], 359, 359);
        // text(descr[j] + " : " + sdots[k].frs[j], 490 + n_t*100, yM - rs[j]);
        text(descr[j] + " : " + Math.round(1000*sdots[k].frs[j])/1000., 420 + n_t*80, yM - rs[j]);
      }
      fill(0, 359, 359);
    } else {
      fill(359);
    }
    stroke(0);
    ellipse(sdots[k].xx, sdots[k].yy, 5, 5);
    line(xM, yM, sdots[k].xs[0], sdots[k].ys[0]);
    ellipse(sdots[k].xs[0], sdots[k].ys[0], 5, 5);
    for (var j = 0; j < rs.length; j++) {
      if (sdots[k].frs[j] == sdots[k].c_freq) {
        fill(hues[j], 359, 359);
        ellipse(20, yM + rs[j], 7, 7);
      } else {
        fill(359);
      }
      ellipse(sdots[k].xs[j], sdots[k].ys[j], 5, 5);
    }
  }
  fill(0, 359, 359);
};


// Function if mouse pressed and mouse is over diagram circles or grid circles
function mousePressed () {

  // Transposition of 1 octave with right mouseclick
  var oct = 0;
  if (mouseButton == RIGHT) { 
    oct = 1;
  }
  // console.log("activate tone");

  for (var k=0; k < sdots.length; k++) {  
    if (dist(sdots[k].xx, sdots[k].yy, mouseX, mouseY) < 5) {
      sdots[k].set_cScale(0);
      sdots[k].set_cFreq(sdots[k].frs[0]);
      sdots[k].set_cOct(oct);
      if (sdots[k].sw_on(k, 0) == 0) sdots[k].sw_on(k, 0);
    }
    for (var j=0; j < sdots[k].xs.length; j++) {
      if (dist(sdots[k].xs[j], sdots[k].ys[j], mouseX, mouseY) < 5) {
        sdots[k].set_cScale(j);
        sdots[k].set_cFreq(sdots[k].frs[j]);
        sdots[k].set_cOct(oct);
        if (sdots[k].sw_on(k, 0) == 0) sdots[k].sw_on(k, 0);
      }
    }
  }

};

function mouseReleased () {

  for (var k=0; k < sdots.length; k++) {
    for (var i = 0; i < melody[0].length; i++) {
    
     if (sdots[k].on == 1) {

        sdots[k].sw_off(k, i);
        //tones[k][i].stop();

        //console.log("switch off: ", k ,i);
      };

    //console.log("switch off: ", k , i);
    //tones[k][i].stop();
    }
    sdots[k].set_cFreq(-1.);
  }
};





