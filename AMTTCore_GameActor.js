//=============================================================================
// AMTTCore_GameActor.js ver 0.0.1
//=============================================================================

/*:
 * @plugindesc 角色增强类
 * @author Shadow Studio
 *
 * @help 使用AMTT必须添加的插件
 */

(function() {
	$amttActor = new AMTTActor();

	function AMTTActor(){

	}

	Object.defineProperties(AMTTActor.prototype, {
		activeActor : {
			get : function() {
				return $gameActors._data[1];
			}, configurable: false
		}
	});
})();