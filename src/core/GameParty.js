//=============================================================================
// Game_Party.js ver 0.0.1
//=============================================================================

(function() {
    var _Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _Game_Party_initialize.call(this);
        this.amtt_transportPoints = [];
    }
    Game_Party.prototype.detectedTransportPoint = function(setEvent) {
        console.log(setEvent);
        // var point = setEvent.transportData;
        // console.log(point);
        // if(point.canDetected == false){
        //     return;
        // }
        // // var pointInitFunc = require('./GameTransportPoint'); 
        // // var point = new GameTransportPoint();

        // point.eventId = setEvent._eventId;
        // point.mapId = setEvent._mapId;
        // for (var i = 0;i < this.amtt_transportPoints.length; i++) {
        //     if(this.amtt_transportPoints[i].eventId == setEvent._eventId){
        //         return false;
        //     }
        // };
        // this.amtt_transportPoints.add(point);
        return true;
    };

    //------------------------------------------------------------------------
    //Game_Party属性追加
    //------------------------------------------------------------------------
    //获取第一位角色
    Object.defineProperties(Game_Party.prototype, {
        activeActor : {
            get : function() {
                return $gameActors._data[1];
            }, configurable: false
        }
    });


})();