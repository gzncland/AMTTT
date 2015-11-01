//=============================================================================
// Game_Map.js ver 0.0.1
//=============================================================================

/*:
 * @plugindesc 地图类增强
 * @author Shadow Studio
 *
 */
(function() {
    

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
        }
    });
})();