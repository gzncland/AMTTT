//=============================================================================
// Game_TransportPoint.js ver 0.0.1
//=============================================================================

(function() {
    
	function GameTransportPoint(){
        this.initialize.apply(this, arguments);
    }

    // Game_TransportPoint.prototype = Object.create(Game_TransportPoint.prototype);
    // Game_TransportPoint.prototype.constructor = Game_TransportPoint;

    GameTransportPoint.prototype.initialize = function(){
        this.mapId = 0;
        this.eventId = 0;
        // this.mapX = 0;
        // this.mapY = 0;
        this.canDetected = true;
    }
    module.exports = GameTransportPoint;
})();