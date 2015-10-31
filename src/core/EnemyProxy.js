//=============================================================================
// AMTTCore_EnemyProxy.js ver 0.0.1
//=============================================================================

(function() {
	function AMTTEnemyProxy(){

	}
	//抛出设定异常
	function ThrowEnemyProxyError(setEnemy,setParamsName){
		throw new Error('数据库中的敌人设定错误.缺少' + setParamsName + '属性</br>敌人ID:' + setEnemy.id + ' 名称:' + setEnemy.name);
	}

	//战斗预测
	//setActor 角色
	//setEnemy 敌人
	//result -1:无法战胜敌人 >=0:对角色造成的伤害值
	AMTTEnemyProxy.prototype.battle = function(setActor ,setEnemy){
		//生成角色每回合伤害
		var actorDpt = this.getActorDpt(setActor, setEnemy);
		//判断是否打不过
		if(actorDpt <= 0){
			//无法战胜敌人 返回-1
			return -1;
		}
		//获取敌人每回合伤害
		var enemyDpt = this.getEnemyDpt(setActor, setEnemy);
		//防杀 完全胜利
		if(enemyDpt <= 0){
			return 0;
		}
		//读取敌人HP
		var enemyHp = Number(setEnemy.meta.hp || ThrowEnemyProxyError(setEnemy,'HP'));
		//附加角色的战斗附加伤害
		enemyHp -= this.getActorExtraDamage(setActor, setEnemy);
		if(enemyHp < 0){
			enemyHp = 0;
		}
		//先获取附加回合数
		var turns = this.getExtraTurns(setActor, setEnemy);
		//计算战斗回合数
		turns += Math.floor(enemyHp / actorDpt);
		//回合修正
		if(enemyHp % actorDpt === 0){
			turns -= 1;
		}
		//总回合伤害
		var result = turns * enemyDpt;
		//附加敌人的战斗附加伤害
		result += this.getEnemyExtraDamage(setActor, setEnemy);
		if(result >= Number.MAX_SAFE_INTEGER){
			throw Error('伤害超过上限值');
		}
		return result;
	}

	//获取角色每回合伤害
	AMTTEnemyProxy.prototype.getActorDpt = function(setActor, setEnemy){
		var enemyDef = Number(setEnemy.meta.def || ThrowEnemyProxyError(setEnemy,'DEF'));
		var actorAtk = setActor.atk;
		return actorAtk - enemyDef;
	}

	//获取角色战斗附加伤害
	AMTTEnemyProxy.prototype.getActorExtraDamage = function(setActor, setEnemy){
		return 0;
	}


	//获取敌人每回合伤害
	AMTTEnemyProxy.prototype.getEnemyDpt = function(setActor, setEnemy){
		var enemyAtk = Number(setEnemy.meta.atk || ThrowEnemyProxyError(setEnemy,'ATK'));
		var actorDef = setActor.def
		return enemyAtk - actorDef;
	}

	//获取敌人战斗附加伤害
	AMTTEnemyProxy.prototype.getEnemyExtraDamage = function(setActor, setEnemy){
		return 0;
	}

	//获取战斗回合数
	AMTTEnemyProxy.prototype.getExtraTurns = function(setActor, setEnemy){
		return 0;
	}

	module.exports = new AMTTEnemyProxy();
})();
