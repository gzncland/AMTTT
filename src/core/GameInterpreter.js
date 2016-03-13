//=============================================================================
// Game_Interpreter.js ver 0.0.1
//=============================================================================
(function() {
    Game_Interpreter.prototype.throwError = function(setErrorFuncName, setErrorType,setErorrFuncValue){
        var gameEvent = $gameMap._events[this._eventId];
        switch(setErrorType){
            case 0:
                throw new Error('' + setErrorFuncName + '指令未设置变化值<br> 触发异常的事件位于地图编号:' + gameEvent._mapId + ' 事件ID:' + gameEvent._eventId + ' 坐标: ' + gameEvent.event().x + ',' + gameEvent.event().y);
            break;
            case 1:
                throw new Error('' + '指令设置了不正确的参数 "' + setErorrFuncValue + '"<br> 触发异常的事件位于地图编号:' + gameEvent._mapId + ' 事件ID:' + gameEvent._eventId + ' 坐标: ' + gameEvent.event().x + ',' + gameEvent.event().y);
            break;

        }
    };

    var parameters = PluginManager.parameters('GoStair');
    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        var gameEvent = $gameMap._events[this._eventId];
        var gameInterpreter = this;
        if (command === 'GainHP'){
            if(args.length == 0){
                this.throwError(command, 0, 0);
            }else if(args.length == 1){
                var result = Number(args[0] || NaN); 
                if(isNaN(result)){
                    this.throwError(command, 1, args[0]);
                }else{
                    $gameParty.activeActor.amttGainHP(result);
                }
            }
        }else if (command === 'GainATK'){
            if(args.length == 0){
                this.throwError(command, 0, 0);
            }else if(args.length == 1){
                var result = Number(args[0] || NaN); 
                if(isNaN(result)){
                    this.throwError(command, 1, args[0]);
                }else{
                    $gameParty.activeActor.amttGainATK(result);
                }
            }
        }else if (command === 'GainDEF'){
            if(args.length == 0){
                this.throwError(command, 0, 0);
            }else if(args.length == 1){
                var result = Number(args[0] || NaN);
                if(isNaN(result)){
                    this.throwError(command, 1, args[0]);
                }else{
                    $gameParty.activeActor.amttGainDEF(result);
                }
            }
        }else if (command === 'GainEXP'){
            if(args.length == 0){
                this.throwError(command, 0, 0);
            }else if(args.length == 1){
                var result = Number(args[0] || NaN); 
                if(isNaN(result)){
                    this.throwError(command, 1, args[0]);
                }else{
                    $gameParty.activeActor.amttGainEXP(result);
                }
            }
        }else if (command === 'GoStair') {
            if(args.length == 0){             
                // console.debug(gameEvent);
                // console.debug(gameEvent.upStairId);
                // console.debug(gameEvent.downStairId);
                var isUpStair = false;
                if(gameEvent.upStairId != -1){
                    //上楼
                    isUpStair = true;
                }else if(gameEvent.downStairId != -1){
                    //默认下楼
                }else{
                    throw new Error('非上下楼梯事件使用GoStair命令时,需要显式地指定楼梯ID参数<br> 触发异常的事件位于地图编号:' + gameEvent._mapId + ' 事件ID:' + gameEvent._eventId + ' 坐标: ' + gameEvent.event().x + ',' + gameEvent.event().y);
                }
                if (!$gameParty.inBattle() && !$gameMessage.isBusy()) {
                    var mapId = this._mapId;
                    var x = -1;
                    var y = -1;
                    if(isUpStair){
                        mapId = this._mapId + 1;
                    }else{
                        mapId = this._mapId - 1;
                    }
                    //读取临时地图
                    DataManager.loadMapDataToObject(mapId, this, function(map){
                        DataManager.onLoadMap(map);
                        //找出楼梯
                        for (var i = 1; i < map.events.length; i++) {
                            if(map.events[i]){
                                if(isUpStair){
                                    var stairId = map.events[i].meta.ds;
                                    //新地图的某个下楼梯ID与当前的上楼梯ID匹配
                                    if(stairId == gameEvent.upStairId){
                                        x = map.events[i].x;
                                        y = map.events[i].y;
                                        var stairEvent = new Game_Event(mapId, i);
                                        $gameParty.detectedTransportPoint(stairEvent);//map.events[i]);
                                        break;
                                    } 
                                }else{
                                    var stairId = map.events[i].meta.us;
                                    //新地图的某个上楼梯ID与当前的下楼梯ID匹配
                                    if(stairId == gameEvent.downStairId){
                                        x = map.events[i].x;
                                        y = map.events[i].y;
                                        var stairEvent = new Game_Event(mapId, i);
                                        $gameParty.detectedTransportPoint(stairEvent);
                                        break;
                                    } 
                                }
                            }
                        };
                        
                        //有匹配的楼梯
                        if(x != -1 && y != -1){
                            $gamePlayer.reserveTransfer(mapId, x, y, 0, 0);
                            gameInterpreter.setWaitMode('transfer');
                        }else{
                            throw new Error('没有匹配的楼梯');
                        }
                    });
                }
            }
        }
    };
})();