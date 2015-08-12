describe("Node Events", function() {

    var events = require('events')
    var emitter;

    beforeEach(function() {
      emitter = new  events.EventEmitter();        
    });

    afterEach(function(){
      emitter.removeAllListeners();
    });

    it("adds a listener with on", function() {
        var tempVar = 0;
        emitter.on('someevent', function(data, listener){
            tempVar += data;
        });    
        emitter.emit('someevent', 5);
        expect(tempVar).toEqual(5);        
    });
    
    it("adds a listener with add listener", function() {
        var tempVar = 0;
        emitter.addListener('someevent', function(data, listener){
            tempVar += data;
        });    
        emitter.emit('someevent', 5);
        expect(tempVar).toEqual(5);
    });

    it("can execute some listeners once", function(){
        console.log = jasmine.createSpy('log');

        emitter.once('someevent', function(data){
            console.log('will only happen once');
        });

        emitter.emit('someevent');
        emitter.emit('someevent');

        expect(console.log.calls.count()).toBe(1);
    });

    it("throws a warning when more than 10 listeners are invoked", function() {
        spyOn(console, "error").and.callThrough();
        var someFn = function(x) {
            return function() { 
                emitter.on('someevent', function(data) {
                    console.log('someevent listener ' + x, data);
                });
            }
        }

        for(var i=0; i<11; i++) {
            someFn(i)();    
        }

        expect(console.error).toHaveBeenCalled();
    });
});