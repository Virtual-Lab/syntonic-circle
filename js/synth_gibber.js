var Synthesizer = {};

Synthesizer.init = function (number) {

  console.log('initialize audio ...');
  // Array of Presets (Synth types)

  this.preset = [
      Synth({  maxVoices: 12, 
               amp: 1,
               waveform: "Triangle",
               pulsewidth: 0.4,
               glide : 0.1,
               useADSR: true,
               requireReleaseTrigger:false,
               attack:ms(1), decay:ms(50), sustain:ms(500), release:ms(200),
               pan: 0,
                }),

      Synth2({ maxVoices: 12,
               amp: 2.,
               waveform: "PWM",
               pulsewidth: 0.4,
               glide : 0.1,
               resonance : 1,
               cutoff: 0.3,  
               useADSR: true,
               requireReleaseTrigger:false,
               attack:ms(10), decay:ms(50), sustain:ms(500), release:ms(200) }),

      Mono({ maxVoices: 2, 
             waveform: "PWM",
             pulsewidth: 0.4,
             cutoff: 0.2,
             resonance: 4.5,
             filterMult: 1,
             amp: 0.5,
             detune2: 0.01,
             detune3: 0.01,
             glide: 0.4,
             useADSR: true,

             attack:ms(50), decay:ms(400), sustain:ms(1000), release:ms(200),
             
             pan: 0
           }),

      Pluck( { maxVoices:12,
               amp: 1.,
               blend: 1,
               damping: 0,
               pan: 0
              } ),

      FM({ maxVoices:12, 
           amp: 1.,
           index: 5,
           cmRatio: 25,
           useADSR: true, 
           requireReleaseTrigger:false,
           attack:ms(1), decay:ms(50), sustain:ms(500), release:ms(200) })
      ];

  this.choose = number;
  this.view.init(); 

 // Synth.master.init();
 // Synth.view.init();
 // Synth.ctl.init();

}

Synthesizer.set = {

  Synthesizer1 : [
    ['select', 'change', 'Type', ['Sine', 'Saw', 'Triangle', 'PWM', 'Noise'], 'Triangle', 'left', 'waveform: '],
    ['button', ['mousedown'], 'Hold', 'hold', '----', ''],
    ['slider', 'change', 'Volume', 0, 1000, 1, 'volume: '], 
    ['slider', 'change', 'Attack', 1, 1000, 0.005, 'attack: '],
    ['slider', 'change', 'Decay', 1, 1000, 0.2, 'decay: '],
    ['slider', 'change', 'Sustain', 1, 1000, 0.4, 'sustain: '],
    ['slider', 'change', 'Release', 1, 1000, 0.2, 'release: '],
    ['slider', 'change', 'Pulsewidth', 1, 1000, 0.4, 'pulsewidth: '],
    ['slider', 'change', 'Pan', 1, 1000, 0, 'pan: ']
    ],
  Synthesizer2 : [
    ['select', 'change', 'Type', ['Sine', 'Saw', 'Triangle', 'PWM', 'Noise'], 'PWM', 'left', 'waveform: '],
    ['button', ['mousedown'], 'Hold', 'hold', '----', ''],
    ['slider', 'change', 'Volume', 0, 1000, 2, 'volume: '], 
    ['slider', 'change', 'Attack', 1, 1000, 0.005, 'attack: '],
    ['slider', 'change', 'Decay', 1, 1000, 0.2, 'decay: '],
    ['slider', 'change', 'Sustain', 1, 1000, 0.4, 'sustain: '],
    ['slider', 'change', 'Release', 1, 1000, 0.2, 'release: '],
    ['slider', 'change', 'Pulsewidth', 1, 1000, 0.4, 'pulsewidth: '],
    ['slider', 'change', 'Resonance', 1, 1000, 1, 'resonance: '],
    ['slider', 'change', 'Cutoff', 1, 1000, 0.3, 'cutoff: '],
    ['slider', 'change', 'FilterMult', 1, 1000, 1., 'Filteramount: '],
    ['slider', 'change', 'Pan', 1, 1000, 0, 'pan: ']
    ],
  MonoSynth : [
    ['select', 'change', 'Type', ['Sine', 'Saw', 'Triangle', 'PWM', 'Noise'], 'PWM', 'left', 'waveform: '],
    ['button', ['mousedown'], 'Hold', 'hold', '----', ''],
    ['slider', 'change', 'Volume', 0, 1000, 0.5, 'volume: '], 
    ['slider', 'change', 'Attack', 1, 1000, 0.1, 'attack: '],
    ['slider', 'change', 'Decay', 1, 1000, 0.4, 'decay: '],
    ['slider', 'change', 'Pulsewidth', 1, 1000, 0.4, 'pulsewidth: '],
    ['slider', 'change', 'Resonance', 1, 1000, 1, 'resonance: '],
    ['slider', 'change', 'Cutoff', 1, 1000, 0.3, 'cutoff: '],
    ['slider', 'change', 'FilterMult', 1, 1000, 1., 'Filteramount: '],
    ['slider', 'change', 'Detune2', 1, 1000, .01, 'detune2: '],
    ['slider', 'change', 'Detune3', 1, 1000, .01, 'detune3: '],
    ['slider', 'change', 'Pan', 1, 1000, 0, 'pan: ']
    ],
  PluckString : [
    ['slider', 'change', 'Volume', 0, 1000, 0.5, 'volume: '],
    ['slider', 'change', 'Pan', 1, 1000, 0, 'pan: ']
        ],
  FMSynth : [
    ['slider', 'change', 'Volume', 0, 1000, 0.5, 'volume: '], 
    ['slider', 'change', 'Attack', 1, 1000, 0.01, 'attack: '],
    ['slider', 'change', 'Decay', 1, 1000, 0.02, 'decay: '],
    ['slider', 'change', 'Sustain', 1, 1000, 0.4, 'sustain: '],
    ['slider', 'change', 'Release', 1, 1000, 0.2, 'release: '],
    ['slider', 'change', 'Index', 1, 500, 5, 'index: '],
    ['slider', 'change', 'CmRatio', 1, 500, 5, 'cm-Ratio: '],
    ['slider', 'change', 'Pan', 1, 1000, 0, 'pan: ']
    ],

};

Synthesizer.view = {

}


Synthesizer.view.init = function () {
    
    var index = 0;
    if (document.getElementById("synth"))
      this.synth = document.getElementById("synth");
    else this.synth = document.getElementsByTagName("BODY")[0];

    this.zeile = document.createElement('BR');
    for (var section in Synthesizer.set) {
      var element = document.getElementById(section);
      if (element) element.parentNode.removeChild(element)
      if (index == Synthesizer.choose) Synthesizer.view.draw(section, Synthesizer.set[section]);
      index++;
    }
    //Synth.ctl.init();

}


Synthesizer.view.draw = function (name, element) {

  //var element = document.createElement('div');
  var field = document.createElement('fieldset');
  var legend = document.createElement('legend');
  var legendName = document.createTextNode(name);
  var elements = element;
  var zeile = [];
  var number = 0;
  for (i=0;i<20;i++) { zeile[i] = document.createElement('BR');};

  field.id = name;
  legend.appendChild(legendName);
  field.appendChild(legend);

  // console.log('Settings: ',elements, 'length: ', elements.length);

  for (var i=0; i < elements.length; i++) {

    var type = elements[i][0];
    var settings = elements[i].slice(2, elements[i].length);
    
    // draw control with parameters and lables
    this[type](field, settings);

    // go to next line, except if there is a option "left"
    if (settings[settings.length-2] !== "left")
                field.appendChild(zeile[i]);

  };

  // append the section to the synth
  this.synth.appendChild(field);

}

Synthesizer.view.select = function (field, settings) { // id, values, labelName

  var options = [];
  var section = field;
  var select = settings[0];
  var values = settings[1];
  var value = settings[2];
  var labelName = settings[settings.length-1];
  var label = document.createElement("label");

  this[select] = document.createElement("select");
  this[select].id = select;
  this[select].name = select;
  label.for = this[select].id;
  label.innerHTML = labelName;
  


  for (var i=0; i<values.length; i++) {
    options[i]=document.createElement('option');
    options[i].value = values[i];
    options[i].innerHTML = values[i];
    this[select].appendChild(options[i]);
  };

  this[select].value = value;

  section.appendChild(label);
  section.appendChild(this[select]);

}

Synthesizer.view.slider = function (field, settings) { //id, value, min, max, labelName

  var section = field;
  var slider = settings[0];
  var min = settings[1];
  var max = settings[2];
  var value = settings[3];
  var labelName = settings[settings.length-1];
  var label = document.createElement("label");

  this[slider] = document.createElement("input");
  this[slider].type = "range";
  this[slider].id = slider;
  this[slider].name = slider;
  this[slider].min = min;
  this[slider].max = max;

  label.for = this[slider].id;
  label.innerHTML = labelName;

  section.appendChild(label);
  section.appendChild(this[slider]);

}

Synthesizer.view.button = function (field, settings) { // id, value, labelName

  var section = field;
  var button = settings[0];
  var value = settings[1];
  var valueOff = settings[2];
  var labelName = settings[settings.length-1];
  var label = document.createElement("label");

  this[button] = document.createElement("input");
  this[button].type = "button";
  this[button].id = button;
  this[button].name = button;
  this[button].value = value;

  label.for = this[button].id;
  label.innerHTML = labelName;

  section.appendChild(label);
  section.appendChild(this[button]);

}

Synthesizer.ctl = {}; 

Synthesizer.ctl.init = function() {

  // init Master - Controls

  for (section in Synthesizer.set) {
    if (section === "Master") {

      console.log('Init ',  section, '...');
      var field = section;
      var elements = Synthesizer.set[section];
      var settings;

      for (var i=0; i < elements.length; i++) {

        var settings = elements[i].slice(0, elements[i].length);
        var type = settings[0];
        var action = settings[1];
        var id = settings[2];
        if (type === "select" || type === "button") var defaultValue = settings[4];
       
        settings = settings.slice(2, settings.length);
        // set Eventlistener 
        
        Synthesizer.view[id].addEventListener(
          action,
          function(e) {
            var element = e.target;
            var value;

            if (Synthesizer.view[element.id].type == "range") {  
              value = parseInt(element.value) / parseInt(element.max);
            } else value = element.value;

            console.log('\nEventlistener: ', Synthesizer.view[element.id].type, 
              '\nto: ', element.id, "Value", value);
            Synthesizer[element.id](value) 
          },
            false);

        Synthesizer[id].set(defaultValue);
        console.log("Default Value", id, defaultValue);

      } // end of loop through elements
    } // end section Master
  } // End loop through sections
}


var Sound = function (freq, volume) {

  // set frequency and volume as defined or default
  if (freq) this.freq = freq; else this.freq = 220;
  if (volume) this.volume = volume; else this.volume = 0.5;


  this.attack = 0.01;
  this.decay = 0.02;
  this.sustain = 0.2;
  this.release = 0.1;
  this.amount = 1;
  this.type = 'PWM';

  this.hold = true;
  this.active = false;

  this.wave = Synthesizer.preset[Synthesizer.choose];
  this.wave.disconnect();

  // setup controller for parameters
  this.controller();

}

Sound.prototype.play = function (freq, time, vol) {

  if (freq) this.freq = freq;
  if (time) this.sustain = time; 
  if (vol) this.volume = vol;

    // Set default Synth Type
  // this.wave = Synthesizer.preset[Synthesizer.choose];
  //this.gate();

  if (Synthesizer.choose === 0 || Synthesizer.choose === 1 || Synthesizer.choose === 2) {
  // set default Soundtype of Synths
    this.wave.waveform = this.type;
  };
  this.wave.connect();

  // play note with freq and amp
  //this.wave.frequency = this.freq;
  this.wave.note(this.freq, this.volume);
  this.active = true;

}

Sound.songPlay = function (seq, time) {

  if (Synthesizer.choose === 0 || Synthesizer.choose === 1 || Synthesizer.choose === 2) {
  // set default Soundtype of Synths
    this.wave.waveform = this.type;
  };
  this.wave.connect();

  this.wave.note.seq(seq, time);
  this.active = true;

}; 


Sound.prototype.gate = function () {

  this.wave.attack = this.attack;
  this.wave.decay = this.decay;
  this.wave.sustain = this.sustain;
  this.wave.release = this.release;

  // console.log("Envelope fired ...", this.attack, this.decay, this.sustain, this.sustain, this.release)

}

Sound.prototype.stop = function () {

  // this stop
  if (!this.hold && this.wave.requireReleaseTrigger) {

      this.wave.note(this.freq, 0); 
      this.active = false
      this.wave.disconnect;
  }
  // console.log("tone stopped");

}

Sound.prototype.controller = function(choosen) {

  var that = this;
  var index = 0;

  console.log('Synthesizer', choosen, 'Number: ', Synthesizer.choose);
  
  for (section in Synthesizer.set) {

    //console.log("Verify index: ", index);

    if (index == Synthesizer.choose) {

      var field = section;
      var elements = Synthesizer.set[section];
      var settings;

      for (var i=0; i < elements.length; i++) {

        var settings = elements[i].slice(0, elements[i].length);
    

        var type = settings[0];
        var action = settings[1];
        var id = settings[2];
        var ctl = "ctl"+id;
        var set = "set"+id;
        var defaultValue = settings[5];
        if (type === "select" || type === "button") 
            defaultValue = settings[4];

       
      //settings = settings.slice(2, settings.length);
      console.log('Controller -', type, '\nenabled id: ', id, 'Element Nr.: ', i,
       '\naction: ', action, '\nsettings: ', settings);

          // Add Eventlistener to form 
          Synthesizer.view[id].addEventListener(
            action,
            function(e) { 
              console.log("action");
              var element = e.target;
              var ectl = "ctl"+ element.id;
              var id = element.id;
              var value = element.value;

              if (Synthesizer.view[element.id].type == "range") {  
              value = parseInt(element.value) / parseInt(element.max);
                } else value = element.value;

            console.log('\nEventlistener: ', Synthesizer.view[id].type, 
              '\nto: ', id, "Value", value);
            that[ectl](value) 
          }, false);
        
        console.log("id controller: ", set);

        that[set](defaultValue);

      }; // end of loop through elements

    }; // end choosen section

    index++;
  } // End loop through sections
};

Sound.prototype.ctlPulsewidth = function (value) { 
  
  var ctlValue = value;
  var viewValue = value * 1000;

  if (Synthesizer.view.Pulsewidth.value != viewValue) 
          Synthesizer.view.Pulsewidth.value = viewValue;

  if (this.wave.pulsewidth != ctlValue) 
    this.wave.pulsewidth = ctlValue;
  console.log("Pulsewidth =", ctlValue, viewValue)

 }

Sound.prototype.setPulsewidth = function(value) {
  
  this.ctlPulsewidth(value);

}

Sound.prototype.ctlGlide = function (value) { 
  
  var ctlValue = value;
  var viewValue = value * 1000;

  if (Synthesizer.view.Glide.value != viewValue) 
          Synthesizer.view.Glide.value = viewValue;

  if (this.wave.glide != ctlValue) 
    this.wave.glide = ctlValue;
  console.log("Glide =", ctlValue, viewValue)

 }

Sound.prototype.setGlide = function(value) {
  
  this.ctlGlide(value);

}

Sound.prototype.ctlPan = function (value) { 
  
  var ctlValue = value*2-1;
  var viewValue = value * 1000;

  if (Synthesizer.view.Pan.value != viewValue) 
          Synthesizer.view.Pan.value = viewValue;

  if (this.wave.pan != ctlValue) 
    this.wave.pan = ctlValue;
  console.log("Pan =", ctlValue, viewValue)

 }

Sound.prototype.setPan = function(value) {
  
  var ctlValue = (value+1) / 2;
  this.ctlPan(ctlValue);

}

Sound.prototype.ctlCutoff = function (value) { 
  
  var ctlValue = value*.7;
  var viewValue = value * 1000;

  if (Synthesizer.view.Cutoff.value != viewValue) 
          Synthesizer.view.Cutoff.value = viewValue;

  if (this.wave.cutoff != ctlValue) 
    this.wave.cutoff = ctlValue;
  console.log("Cutoff =", ctlValue, viewValue)

 }

Sound.prototype.setCutoff = function(value) {
  
  var ctlValue = value / .7;
  this.ctlCutoff(ctlValue);

}

Sound.prototype.ctlResonance = function (value) { 
  
  var ctlValue = value*5.5;
  var viewValue = value * 1000;

  if (Synthesizer.view.Resonance.value != viewValue) 
          Synthesizer.view.Resonance.value = viewValue;

  if (this.wave.resonance != ctlValue) 
    this.wave.resonance = ctlValue;
  console.log("Resonance =", ctlValue, viewValue)

 }

Sound.prototype.setResonance = function(value) {
  
  var ctlValue = value / 5.5;
  this.ctlResonance(ctlValue);

}

Sound.prototype.ctlFilterMult = function (value) { 
  
  var ctlValue = value*5.5;
  var viewValue = value * 1000;

  if (Synthesizer.view.FilterMult.value != viewValue) 
          Synthesizer.view.FilterMult.value = viewValue;

  if (this.wave.filterMult != ctlValue) 
    this.wave.filterMult = ctlValue;
  console.log("FilterMult =", ctlValue, viewValue)

 }

Sound.prototype.setFilterMult = function(value) {
  
  var ctlValue = value / 5.5;
  this.ctlFilterMult(ctlValue);

}

Sound.prototype.ctlIndex = function (value) { 
  
  var ctlValue = value*50;
  var viewValue = value * 500;

  if (Synthesizer.view.Index.value != viewValue) 
          Synthesizer.view.Index.value = viewValue;

  if (this.wave.index != ctlValue) 
    this.wave.index = ctlValue;
  console.log("Index =", ctlValue, viewValue)

 }

Sound.prototype.setIndex = function(value) {
  
  var ctlValue = value / 50;
  this.ctlIndex(ctlValue);

}

Sound.prototype.ctlCmRatio = function (value) { 
  
  var ctlValue = value*50;
  var viewValue = value * 500;

  if (Synthesizer.view.CmRatio.value != viewValue) 
          Synthesizer.view.CmRatio.value = viewValue;

  if (this.wave.cmRatio != ctlValue) 
    this.wave.cmRatio = ctlValue;
  console.log("CmRatio =", ctlValue, viewValue)

 }

Sound.prototype.setCmRatio = function(value) {
  
  var ctlValue = value / 50;
  this.ctlCmRatio(ctlValue);

}


Sound.prototype.ctlAttack = function (value) { 
  
  var ctlValue = (value + 0.0005) * 1.995;
  var viewValue = value * 1000;

  if (Synthesizer.view.Attack.value != viewValue) 
          Synthesizer.view.Attack.value = viewValue;

  if (this.wave.attack != ctlValue) 
    this.wave.attack = ctlValue;
  console.log("attack =", ctlValue, viewValue)

 }

Sound.prototype.setAttack = function(value) {
  
  var ctlValue = (value/1.995) - 0.0005;
  this.ctlAttack(ctlValue);

  console.log("Attack: ", value);
}

Sound.prototype.ctlDecay = function (value) { 

  var ctlValue = (value + 0.0005) * 1.995;
  var viewValue = value * 1000;

  if (Synthesizer.view.Decay.value != viewValue) 
          Synthesizer.view.Decay.value = viewValue;

  if (this.wave.decay != ctlValue) 
        this.wave.decay = ctlValue;
}

Sound.prototype.setDecay = function (value) { 

  var ctlValue = (value/1.995) - 0.0005;
  this.ctlDecay(ctlValue);

  console.log("Decay: ", value);
}

Sound.prototype.ctlSustain = function (value) { 
  
  var ctlValue = value * 2;
  var viewValue = value * 1000;

  if (Synthesizer.view.Sustain.value != viewValue) 
          Synthesizer.view.Sustain.value = viewValue;

  if (this.wave.sustain != ctlValue) 
      this.wave.sustain = ctlValue
}

Sound.prototype.setSustain = function (value) { 
  
  var ctlValue = value / 2;
  this.ctlSustain(ctlValue);
}

Sound.prototype.ctlRelease = function (value) {
  
  var ctlValue = (value + 0.0005) * 1.995;
  var viewValue = value * 1000;

  if (Synthesizer.view.Release.value != viewValue) 
      Synthesizer.view.Release.value = viewValue;

  if (this.wave.release != ctlValue) 
      this.wave.release = value;
}

Sound.prototype.setRelease = function (value) {
  
  var ctlValue = (value/1.995) - 0.0005;
  this.ctlRelease(ctlValue)
  
}

Sound.prototype.ctlVolume = function (value) { 
  
  var ctlValue = value*2;
  var viewValue = value * 1000;
  
  if (Synthesizer.view.Volume.value != viewValue) 
      Synthesizer.view.Volume.value = viewValue;

  if (this.volume != ctlValue) this.volume = value;
}

Sound.prototype.setVolume = function (value) { 

  var ctlValue = value / 2;
  this.ctlVolume(ctlValue);
}

Sound.prototype.ctlHold = function (value) { 
  
  var hold;
  if (!this.hold) {
    hold = "----";
    this.hold = true;
    //this.wave.sustain = 100000000;
    //this.wave.requireReleaseTrigger = false;
    Synthesizer.view.Hold.value = hold;
  } else {
    hold = "hold";
    this.hold = false;
    this.wave.sustain = this.sustain;
    //this.wave.requireReleaseTrigger = true;
    if (this.active) this.stop();
    //this.wave.disconnect();

    Synthesizer.view.Hold.value = hold;
  };
  console.log('Hold: ', this.hold);
}

Sound.prototype.setHold = function (value) { 
 
  this.ctlHold(value);
  console.log('Hold value: ', value)
  
}

Sound.prototype.ctlType = function (value) {

  this.type = value;

  if (this.wave) this.wave.waveform = this.type;
}

Sound.prototype.setType = function (value) {

  this.type = value;
  console.log('set type: ', this.type)

  //if (this.wave) this.wave.waveform = this.type;
}

Sound.prototype.trigger = function (value) { 

  if (!this.triggered && this.active) {
    this.triggered = true;
    this.play(this.frequency);
  }
  else {
    this.stop();
    this.active = false;
    this.triggered = false;
  };

  console.log('Trigger: ', this.triggered);
}
