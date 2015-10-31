//=============================================================================
// AMTTCore_GameEvent.js ver 0.0.1
//=============================================================================

/*:
 * @plugindesc GameEvent增强 
 * @author Shadow Studio
 *
 * @help 使用AMTT必须添加的插件
 */

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
		}
	});
})();