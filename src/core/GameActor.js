//=============================================================================
// AMTTCore_GameActor.js ver 0.0.1
//=============================================================================

(function() {
	function AMTTActor(){

	}

	Object.defineProperties(AMTTActor.prototype, {
		activeActor : {
			get : function() {
				return $gameActors._data[1];
			}, configurable: false
		}
	});

	module.exports = new AMTTActor();
})();