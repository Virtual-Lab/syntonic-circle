// ------------------------------------------------------------------------------
//   synth.js creates a synth with oscillators with webaudio and html5 form
//   in a div with id = "synth" or as childobject of "body"
// ------------------------------------------------------------------------------

// initialize Audio -- must be initialized at the beginning

var Synth = {};

Synth.init = function () {

  console.log('initialize audio ...');

  // Fix up prefixing 
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  
  // Create AudioContext (Initialize webaudio Context)
  if (AudioContext) {
    context = new AudioContext();
    
  } else {
    alert('No audiocontext available');
  };

  // Check if createGain is available
  if (!context.createGain) context.createGain = context.createGainNode;

  Synth.master.init();
  Synth.view.init();
  Synth.ctl.init();

};

Synth.master = {

  init : function() {

  // initialize MastergainNode
  this.gainNode = context.createGain();
  this.gainNode.connect(context.destination);

  // set Master-Gain
  this.volume = 0.5;
  this.gainNode.gain = this.volume;
  
  }
}

Synth.set = {

  Oscillator : [
  ['select', 'change', 'Type', ['sine', 'sawtooth', 'triangle', 'square'], 'triangle', 'left', 'Choose type: '],
  ['button', ['mousedown'], 'Hold', 'hold', '----', ''],
  ['slider', 'change', 'Volume', 0, 1000, 0.2, 'volume: '], 
  ['slider', 'change', 'Attack', 0, 1000, 0.01, 'attack: '],
  ['slider', 'change', 'Decay', 0, 1000, 0.1, 'decay: '],
  ['slider', 'change', 'Sustain', 0, 1000, 1, 'sustain-level: '],
  ['slider', 'change', 'Release', 0, 1000, 0.2, 'release: ']
  ], 
  Master : [
  ['slider', 'change', 'masterVolume', 0, 1000, 0.5, 'volume: '], 
  ['button', 'mousedown', 'masterCompressor', 'off', '', 'compressor']
  ]


}

Synth.view = {

}


Synth.view.init = function () {
    
    if (document.getElementById("synth"))
      this.synth = document.getElementById("synth");
    else this.synth = document.getElementsByTagName("BODY")[0];

    this.zeile = document.createElement('BR');
    for (var section in Synth.set)
      Synth.view.draw(section, Synth.set[section]);
    //Synth.ctl.init();

}


Synth.view.draw = function (name, element) {

  var field = document.createElement('fieldset');
  var legend = document.createElement('legend');
  var legendName = document.createTextNode(name);
  var elements = element;
  var zeile = [];
  var number = 0;
  for (i=0;i<20;i++) { zeile[i] = document.createElement('BR');};

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

Synth.view.select = function (field, settings) { // id, values, labelName

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

Synth.view.slider = function (field, settings) { //id, value, min, max, labelName

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

Synth.view.button = function (field, settings) { // id, value, labelName

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

Synth.ctl = {}; 

Synth.ctl.init = function() {

  // init Master - Controls

  for (section in Synth.set) {
    if (section === "Master") {

      console.log('Init ',  section, '...');
      var field = section;
      var elements = Synth.set[section];
      var settings;

      for (var i=0; i < elements.length; i++) {

        var settings = elements[i].slice(0, elements[i].length);
        var type = settings[0];
        var action = settings[1];
        var id = settings[2];
        var defaultValue = settings[5];
       
        settings = settings.slice(2, settings.length);
        // set Eventlistener 
        
        Synth.view[id].addEventListener(
          action,
          function(e) {
            var element = e.target;
            var value;

            if (Synth.view[element.id].type == "range") {  
              value = parseInt(element.value) / parseInt(element.max);
            } else value = element.value;

            console.log('\nEventlistener: ', Synth.view[element.id].type, 
              '\nto: ', element.id, "Value", value);
            Synth[element.id](value) 
          },
            false);

        Synth[id].set(defaultValue);
        console.log("Default Value", id, defaultValue);

      } // end of loop through elements
    } // end section Master
  } // End loop through sections
}

Synth.masterVolume = function(value) {

  ctlValue = value * 1;
  viewValue = value * 1000;

  if (Synth.view.masterVolume.value != viewValue) 
          Synth.view.masterVolume.value = viewValue;

  if (Synth.master.volume != ctlValue) 
    Synth.masterVolume.set(ctlValue);
  
  // console.log('Volume:', Synth.master.volume);
}

Synth.masterVolume.set = function(ctlValue) {
  
  Synth.master.volume = ctlValue;
  Synth.master.gainNode.gain.value = ctlValue;
  Synth.masterVolume(ctlValue);

  console.log(Synth.master.gainNode.gain.value);
}

Synth.masterCompressor = function(value) {

  if (value = "on") {
    this.compressorOn = false;
    Synth.view.masterCompressor.value = "off";
    console.log('mastercompressor Off');
  } else {
    this.compressorOn = true;
    Synth.view.masterCompressor.value = "on";
    console.log('mastercompressor On');
  }
}

Synth.masterCompressor.set = function(value) {

  if (value = "off") {
    Synth.masterCompressor("on")
  } else {
    Synth.masterCompressor("off")
  }
}


var Sound = function (freq, volume) {

  // set frequency and volume as defined or default
  if (freq) this.freq = freq; else this.freq = 220;
  if (volume) this.volume = volume; else this.volume = 0.2;

  // set default Soundtype
  this.type = 'sine';

  this.attack = 0.01;
  this.decay = 0.02;
  this.sustainLevel = 0.4;
  this.release = 0.2;
  this.amount = 1;

  // create Envelope
  this.envelope = context.createGain();
  this.envelope.gain.value = 0;
  this.envelope.connect(Synth.master.gainNode);
  this.adsr();

  // optional if additional Envelope is needed:
  this.adsr2 = new this.adsr();
  this.hold = true;
  // setup controller for parameters
  this.controller();
  this.active = false;

};


Sound.prototype.adsr = function(a, d, s, r, v, sT) {

    // set adsr as defined or default
    if (a) this.attack = a; 
    if (d) this.decay = d; 
    if (s) this.sustainLevel = s; 
    if (r) this.release = r; 

    // set gain of envelope
    if (v) this.amount = v; 
    // set SustainTime if available (optional)
    if (sT) {
      this.sustainTime = sT;
      // calculation of total Time
      this.time = this.attack + this.decay + this.sustainTime;
    };
    
    this.loop = false;

  };

Sound.prototype.play = function (freq, time) {

  if (freq) this.freq = freq;
  //if (time) this.sustainTime = time; else this.sustainTime = false;

  // create oscillator and gainNode
  this.wave = context.createOscillator();
  this.gainNode = context.createGain();

  // connect to GainNode and Envelope
  this.wave.connect(this.gainNode);
  this.gainNode.connect(this.envelope)

  // values of oscillator and gainNode
  this.gainNode.gain.value = this.volume;
  this.wave.frequency.value = this.freq;
  this.wave.type = this.type;
  this.gate();
  this.wave.start(0);
  this.active = true;

  //if (!Adsr.loop) this.wave.stop(context.currentTime + this.time)

};


Sound.prototype.gate = function () {

    var time = context.currentTime + 0.001;

    var volume = this.amount;

    // console.log('attack, decay, sustain, release', this.attack, this.decay, this.sustainLevel, this.release);
    // console.log('volume :', volume, 'time', time);

    // set on 0 Level
    this.envelope.gain.linearRampToValueAtTime(0, time);
    // set on attack Level (highest Volume) 
    this.envelope.gain.linearRampToValueAtTime(volume, time + this.attack);
    // decay to sustain 
    this.envelope.gain.linearRampToValueAtTime(volume*this.sustainLevel, time + this.attack+this.decay);
    
    if (this.sustainTime) {// sustain - 
      this.envelope.gain.linearRampToValueAtTime(volume*this.sustainLevel, time + this.attack+this.decay+this.sustainTime);
      // this.decay - 
      this.envelope.gain.linearRampToValueAtTime(0, time + this.attack+this.decay+this.sustainTime+this.release);
      this.stop();
    }

    // console.log("Envelope fired ...", this.attack, this.decay, this.sustain, this.sustain, this.release)

}

Sound.prototype.stop = function () {

  var time = context.currentTime;
  var volume = this.volume;
  // this stop
  if (!this.hold) {

    //this.envelope.gain.cancelScheduledValues(0);
    //this.envelope.gain.linearRampToValueAtTime(this.volume*this.sustainLevel, time);
    this.envelope.gain.linearRampToValueAtTime(0, time+this.release)
    if (this.active) {
      this.wave.stop(time+this.release); 
      this.active = false;}
  }
  // console.log("tone stopped");

}

Sound.prototype.controller = function() {

  var that = this;
  for (section in Synth.set) {

    if (section === "Oscillator") {

      console.log('Init ',  section, '...');
      var field = section;
      var elements = Synth.set[section];
      var settings;

      for (var i=0; i < elements.length; i++) {

        var settings = elements[i].slice(0, elements[i].length);
        var type = settings[0];
        var action = settings[1];
        var id = settings[2];
        var ctl = "ctl"+id;
        var set = "set"+id;
        var defaultValue = settings[5];

       
        settings = settings.slice(2, settings.length);
        //console.log('Controller -', type, '\nenabled id: ', id, 'Element Nr.: ', i,
        // '\naction: ', action, '\nsettings: ', settings);

          // Add Eventlistener to form 
          Synth.view[id].addEventListener(
            action,
            function(e) { 
              console.log("action");
              var element = e.target;
              var ectl = "ctl"+ element.id;
              var id = element.id;
              var value = element.value;

              if (Synth.view[element.id].type == "range") {  
              value = parseInt(element.value) / parseInt(element.max);
                } else value = element.value;

            console.log('\nEventlistener: ', Synth.view[id].type, 
              '\nto: ', id, "Value", value);
            that[ectl](value) 
          }, false);
        
        console.log("id controller: ", set);

        that[set](defaultValue);

      }; // end of loop through elements
    }; // end section Oscillator
  } // End loop through sections
};


Sound.prototype.ctlAttack = function (value) { 
  
  var ctlValue = (value + 0.0005) * 1.995;
  var viewValue = value * 1000;

  if (Synth.view.Attack.value != viewValue) 
          Synth.view.Attack.value = viewValue;

  if (this.attack != ctlValue) 
    this.attack = ctlValue;
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

  if (Synth.view.Decay.value != viewValue) 
          Synth.view.Decay.value = viewValue;

  if (this.decay != ctlValue) 
        this.decay = ctlValue;
}

Sound.prototype.setDecay = function (value) { 

  var ctlValue = (value/1.995) - 0.0005;
  this.ctlDecay(ctlValue);

  console.log("Decay: ", value);
}

Sound.prototype.ctlSustain = function (value) { 
  
  var ctlValue = value * 2;
  var viewValue = value * 1000;

  if (Synth.view.Sustain.value != viewValue) 
          Synth.view.Sustain.value = viewValue;

  if (this.sustainLevel != ctlValue) 
      this.sustainLevel = ctlValue
}

Sound.prototype.setSustain = function (value) { 
  
  var ctlValue = value / 2;
  this.ctlSustain(ctlValue);
}

Sound.prototype.ctlRelease = function (value) {
  
  var ctlValue = (value + 0.0005) * 1.995;
  var viewValue = value * 1000;

  if (Synth.view.Release.value != viewValue) 
      Synth.view.Release.value = viewValue;

  if (this.release != ctlValue) 
      this.release = value;
}

Sound.prototype.setRelease = function (value) {
  
  var ctlValue = (value/1.995) - 0.0005;
  this.ctlRelease(ctlValue)
  
}

Sound.prototype.ctlVolume = function (value) { 
  
  var ctlValue = value;
  var viewValue = value * 1000;
  
  if (Synth.view.Volume.value != viewValue) 
      Synth.view.Volume.value = viewValue;

  if (this.volume != ctlValue) this.volume = value;
}

Sound.prototype.setVolume = function (value) { 

  this.ctlVolume(value);
}

Sound.prototype.ctlHold = function (value) { 

  if (!this.hold) {
    value = "----";
    this.hold = true;
  }
  else {
    value = "hold";
    this.hold = false;
    if (this.active) this.stop();
  };

  Synth.view.Hold.value = value;
  console.log('Hold: ', this.hold);
}

Sound.prototype.setHold = function (value) { 
  this.ctlHold(value);
}

Sound.prototype.trigger = function (value) { 

  if (!this.triggered && this.active) {
    this.triggered = true;
    this.play();
  }
  else {
    this.stop();
    this.active = false;
    this.triggered = false;
  };

  console.log('Trigger: ', this.triggered);
}

Sound.prototype.ctlType = function (value) {

  this.type = value;

  if (this.wave) this.wave.type = this.type;
}

Sound.prototype.setType = function (value) {

  this.type = value;

  if (this.wave) this.wave.type = this.type;
}



Sound.prototype.setFrequency = function (value) { 

   this.freq = value;

   if (this.active) {
    this.wave.frequency.cancelScheduledValues(0);
    this.wave.frequency.value = this.freq;
  };

}

var Midi =  function () {

  this.midiAccess = null;  // the MIDIAccess object.
  this.portamento = 0.05;  // this.portamento/glide speed
  
  this.activeNotes = new Array(); // the stack of actively-pressed keys
  this.isSet = false;
  this.selected = false;
  this.device = {};
  this.inputs = null;

};



Midi.prototype.init = function () { 

  if (navigator.requestMIDIAccess)
  {
        navigator.requestMIDIAccess().then( this.success, this.reject );
        console.log('Midi activated ..');
      } 
    else console.log('No Midi available');

};

Midi.prototype.success = function (access) {

  this.midiAccess = access;
  this.selected = document.getElementById("midiInputSelect");
  this.selectedInput = this.selected.value;
  this.inputs = this.midiAccess.inputs.values();

  var that = this;

  if(this.midiAccess.inputs.size > 0) {

    this.device = Midi.getInputs(this.selected, this.inputs);
  };
  
  console.log(this.inputs);
  //this.input = inputs[port];

  if (this.selectedInput == "none" || !this.selectedInput)
    console.log("No MIDI input selected.");
 
  else {

    console.log("Midiinput: ", this.selectedInput)
    //this.input = this.midiAccess.inputs.key[this.selectedInput];
    this.device[this.selectedInput].onmidimessage = function (event) {Midi.message(event)};
  }

  
};

Midi.prototype.getInputs = function (element, inmidi) {

    var inputs = inmidi;
    var selected = element;

    selected.options.length = 0;

    var opt = document.createElement("option");
    opt.text = "none";
    selected.add(opt);
      
    
    // iterate through the devices
    for (input = inputs.next(); input && !input.done; input = inputs.next()) {
          
      var opt = document.createElement("option");

      opt.text = input.value.name;
      selected.add(opt);

      this.isSet = true;
      console.log('Midi-devices dedected:', input.value.name)

      this.device[input.value.name] = input.value;

    };

    return this.device;

};

Midi.prototype.inputRefresh = function(e) {

  this.init();
  console.log('list refreshed');
    
};

Midi.prototype.inputSelect = function(e) {

  var element = e.target;

  this.selectedInput = element.value;
  //this.input = this.midiAccess.inputs.key[this.selectedInput];

  console.log("Midi selected:", this.selectedInput);

  for (var name in this.device) {
    if (name === this.selectedInput)
      this.device[name].onmidimessage = function (event) {Midi.message(event)}
        else
          this.device[name].onmidimessage = null;
      };
    
};

Midi.prototype.message = function(event) {
  // Mask off the lower nibble (MIDI channel, which we don't care about)
  //console.log(event);
  switch (event.data[0] & 0xf0) {
    case 0x90:
      if (event.data[2]!=0) {  // if velocity != 0, this is a note-on message
        Midi.noteOn(event.data[1]);
        return;
      }
      // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
    case 0x80:
      Midi.noteOff(event.data[1]);
      return;
  }
};

Midi.prototype.midiToFreq = function ( note ) {
  return 440 * Math.pow(2,(note-69)/12);
};

Midi.prototype.noteOn = function (noteNumber) {


  this.activeNotes.push( noteNumber );

  console.log('Midi-massage note on', noteNumber)

};

Midi.prototype.noteOff = function(noteNumber) {
  var position = this.activeNotes.indexOf(noteNumber);

  console.log('Midi-massage note off', noteNumber)
  if (position!=-1) {
    this.activeNotes.splice(position,1);
  }
};
