//=============================================================================
// AMTTCore_GameEvent.js ver 0.0.1
//=============================================================================

(function() {
    //------------------------------------------------------------------------
    //Game_Event方法重写
    //------------------------------------------------------------------------
    Object.defineProperties(Game_Event.prototype, {
        //获取敌人ID
        //result  -1:非敌人事件 >0:敌人ID
        enemyId : {
            get : function() {
                //从note中提取<e:number> 属性
                var result = Number(this.event().meta.e || -1);
                //是否定义了<e:number>标签
                if(result != undefined){
                    //是的场合
                    return result;
                }
                //未定义<e:number>的场合(普通事件)
                return -1;
            }, configurable: false
        },
        //获取标记敌人已经死亡的开关(默认A)
        //result  开关编号
        deadSwitchId : {
            get : function() {
                //从note中提取<d:A|B|C|D> 属性
                var result = String(this.event().meta.d || 'A');
                if(    result !== 'A'
                    && result !== 'B'
                    && result !== 'C'
                    && result !== 'D'){
                    throw new Error('敌人死亡开关标记只能为以下4个值:"A" "B" "C" "D"</br>触发异常的事件位于地图编号:' + this._mapId + ' 事件ID:' + this._eventId + ' 坐标: ' + this.event().x + ',' + this.event().y);
                }
                return result;
            }, configurable: false
        },
        //获取标记敌人是否激活的开关(默认无)
        //result  开关编号
        activeSwitchId : {
            get : function() {
                //从note中提取<a:A|B|C|D> 属性
                var result = String(this.event().meta.a || undefined);
                if(result === 'undefined'){
                    return null;
                }
                if(    result !== 'A'
                    && result !== 'B'
                    && result !== 'C'
                    && result !== 'D'){
                    
                    throw new Error('敌人激活开关标记只能为以下4个值:"A" "B" "C" "D",当前值为' + result + '</br>触发异常的事件位于地图编号:' + this._mapId + ' 事件ID:' + this._eventId + ' 坐标: ' + this.event().x + ',' + this.event().y);
                }
                return result;
            }, configurable: false
        },
        //获取上楼梯ID
        //result -1:非楼梯事件 >0:楼梯ID
        upStairId : {
            get : function() {
                //从note中提取<us:number> 属性
                var result = Number(this.event().meta.us || -1);
                //是否定义了<us:number>标签
                if(result != undefined){
                    //是的场合
                    return result;
                }
                //未定义<us:number>的场合(普通事件)
                return -1;
            }, configurable: false
        },
        //获取传送点信息
        //result 传送点信息
        transportData : {
            get : function() {
                var GameTransportPoint = require('./GameTransportPoint'); 
                var point = new GameTransportPoint();
                //从note中提取<nodetec> 属性
                // var canDetected = Number(this.event().meta.nodetec || -1);
                // console.log(canDetected);
                //是否定义了<nodetec>标签
                // if(canDetected != undefined){
                //     //是的场合
                //     point._canDetected = false;
                // }
                point.eventId = this._eventId;
                point.mapId = this._mapId;
                return point;
            }, configurable: false
        },
        //获取下楼梯ID
        //result -1:非楼梯事件 >0:楼梯ID
        downStairId : {
            get : function() {
                //从note中提取<ds:number> 属性
                var result = Number(this.event().meta.ds || -1);
                //是否定义了<ds:number>标签
                if(result != undefined){
                    //是的场合
                    return result;
                }
                //未定义<ds:number>的场合(普通事件)
                return -1;
            }, configurable: false
        },
        //获取该事件的敌人代理实例(如果是敌人的话)
        enemyData : {
            get : function() {
                //获取敌人ID
                var enemyId = this.enemyId;
                //判断是否是敌人
                if(enemyId != -1){
                    //是的场合
                    var enemy = $dataEnemies[enemyId];
                    if(enemy != null){
                        //存在此敌人
                        return $dataEnemies[enemyId];
                    }
                }
                //否的场合 抛出异常
                throw new Error('数据库中未找到编号为' + enemyId + '的敌人.</br>触发异常的事件位于地图编号:' + this._mapId + ' 事件ID:' + this._eventId + ' 坐标: ' + this.event().x + ',' + this.event().y);
            }, configurable: false
        },
        enemyProxy : {
            get : function() {
                var result = require('./EnemyProxy');
                return result;
            }, configurable: false
        },
        damageToActiveActor : {
            get : function(){
                return this.enemyProxy.battle($gameParty.activeActor, this.enemyData);
            }, configurable: false
        }
    });
})();