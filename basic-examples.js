var events = require("events");
var emitter = new events.EventEmitter;

console.log(emitter)

emitter.on('newListener', function(data, listener){
    console.log('newlistener fired', data, listener);
});

emitter.once('someevent', function(data){
    console.log('will only happen once');
})

emitter.on('someevent', function(data) {
    console.log('someevent happened', data);
}).addListener('someevent', function (data){
   console.log('another way to know that someevent happened', data); 
});

var someFn = function(x) {
    return function() { emitter.on('someevent', function(data) {
        console.log('someevent listener ' + x, data);
    });
    }
}

for(var i=0; i<9; i++) {
    someFn(i)();    
}

var tempListener = function(data){
   console.log('should not be fired', data); 
}
emitter.addListener('someevent', tempListener);

emitter.on('removeListener', function(data, listener){
    console.log('removelistener fired', data, listener);
});

emitter.removeListener('someevent', tempListener);

console.log( emitter.listeners('someevent') );

console.log(events.EventEmitter.listenerCount(emitter, 'someevent'));

emitter.emit('someevent', {'some' : 'event'});

//module.exports(emitter)