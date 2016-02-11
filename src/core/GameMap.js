//=============================================================================
// Game_Map.js ver 0.0.1
//=============================================================================
(function() {
    Game_Map.prototype.getEventById = function(setEventId) {
        var events = this.events();
        for (var i = 0; i < events.length; i++){
            if(events[i]._eventId == setEventId){
                return events[i];
            }
        }
        return undefined;
    };
    Object.defineProperties(Game_Map.prototype, {
        //地图上的敌人列表
        enemiesList : {
            get : function() {
                var result = {}; 
                //获取地图事件数组
                var events = this.events();
                for (var i = 0; i < events.length; i++){
                    //是否是敌人
                    var enemyId = events[i].enemyId;
                    if(enemyId == -1){
                        continue;
                    }
                    //获取独立开关
                    var deadKey = [events[i]._mapId, events[i]._eventId, events[i].deadSwitchId];
                    if ($gameSelfSwitches.value(deadKey) === true) {
                        //敌人已经死亡 跳过
                        continue;
                    }
                    if(events[i].activeSwitchId !== null){
                        var activeKey = [events[i]._mapId, events[i]._eventId, events[i].activeSwitchId];
                        if ($gameSelfSwitches.value(activeKey) === false) {
                            //敌人尚未激活 跳过
                            continue;
                        }
                    }
                    //并且不在结果集中
                    if(result[enemyId] === undefined){
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