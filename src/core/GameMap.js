//=============================================================================
// Game_Map.js ver 0.0.1
//=============================================================================

/*:
 * @plugindesc 地图类增强
 * @author Shadow Studio
 *
 */
(function() {
    DataManager.onLoadMap = function(object) {
        var array;
        this.extractMetadata(object);
        array = object.events;
        if (Array.isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                var data = array[i];
                if (data && data.note !== undefined) {
                    this.extractMetadata(data);
                }
            }
        }
    };
    DataManager.loadMapDataToObject = function(mapId, mapEvent, onCompleteCallback) {
        if (mapId > 0) {
            var filename = 'Map%1.json'.format(mapId.padZero(3));
            return this.loadDataFileToObject(filename, onCompleteCallback);
        } else {
            throw new Error('找不到地图' + filename + '<br>触发异常的事件位于地图编号:' + mapEvent._mapId + ' 事件ID:' + mapEvent._eventId + ' 坐标: ' + mapEvent.event().x + ',' + mapEvent.event().y);
        }
    };

    DataManager.loadDataFileToObject = function(src, onCompleteCallback) {
        var xhr = new XMLHttpRequest();
        var url = 'data/' + src;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = function() {
            if (xhr.status < 400) {
                onCompleteCallback(JSON.parse(xhr.responseText));
            }
        };
        xhr.onerror = function() {
            throw new Error('地图读取失败<br>触发异常的地图路径为:' + url);
        };
        xhr.send();
    };


    var parameters = PluginManager.parameters('GoStair');
    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'GoStair') {
            if(args.length == 0){
                var gameEvent = $gameMap._events[this._eventId];
                console.debug(gameEvent);
                console.debug(gameEvent.upStairId);
                console.debug(gameEvent.downStairId);
                var gameInterpreter = this;
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
                                        break;
                                    } 
                                }else{
                                    var stairId = map.events[i].meta.us;
                                    //新地图的某个上楼梯ID与当前的下楼梯ID匹配
                                    if(stairId == gameEvent.downStairId){
                                        x = map.events[i].x;
                                        y = map.events[i].y;
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

    Object.defineProperties(Game_Map.prototype, {
        //地图上的敌人列表
        enemiesList : {
            get : function() {
                var result = {}; 
                //获取地图事件数组
                var events = this.events();
                for (var i = 0; i < events.length; i++){
                    var enemyId = events[i].enemyId;
                    //是否是敌人,并且不在结果集中
                    if(enemyId != -1 && result[enemyId] === undefined){
                        result[enemyId] = events[i];
                    }
                };
                return result;
            }, configurable: false
        },
        //地图上的敌人数量
        enemiesCount : {
            get : function() {
                var result = 0; 
                for (var enemy in this.enemiesList) {result += 1}
                return result;
            }, configurable: false
        },
        //上楼梯列表
        upStepList : {
            get : function() {
                var result = {}; 
                //获取地图事件数组
                var events = this.events();
                for (var i = 0; i < events.length; i++){
                    var stairId = events[i].upStairId;
                    //是否是楼梯,并且不在结果集中
                    if(stairId != -1){
                        if(result[stairId] === undefined){
                            result[stairId] = events[i];
                        }else{
                            throw new Error('定义了重复的楼梯ID:' + stairId + '<br> 触发异常的事件位于地图编号:' + this._mapId + ' 事件ID:' + events[i]._eventId + ' 坐标: ' + events[i].event().x + ',' + events[i].event().y);
                        }        
                    }
                };
                return result;
            }, configurable: false
        },
        //下楼梯列表
        downStepList : {
            get : function() {
                var result = {}; 
                //获取地图事件数组
                var events = this.events();
                for (var i = 0; i < events.length; i++){
                    var stairId = events[i].downStairId;
                    //是否是楼梯,并且不在结果集中
                    if(stairId != -1){
                        if(result[stairId] === undefined){
                            result[stairId] = events[i];
                        }else{
                            throw new Error('定义了重复的楼梯ID:' + stairId + '<br> 触发异常的事件位于地图编号:' + this._mapId + ' 事件ID:' + events[i]._eventId + ' 坐标: ' + events[i].event().x + ',' + events[i].event().y);
                        }        
                    }
                };
                return result;
            }, configurable: false
        }
    });
})();