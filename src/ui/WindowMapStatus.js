//=============================================================================
// AMTT_WindowMapStatus.js ver 0.0.1
//=============================================================================

/*:
 * @plugindesc 在地图上显示角色状态的类
 * @author Shadow Studio
 *
 * @help 可选插件(也许是必须插件?)
 */
 (function() {

 	function Window_MapStatus() {
    	this.initialize.apply(this, arguments);
	}

	Window_MapStatus.prototype = Object.create(Window_Base.prototype);
	Window_MapStatus.prototype.constructor = Window_MapStatus;

	Window_MapStatus.prototype.initialize = function() {
	    var wight = this.windowWidth();
	    var height = this.windowHeight();
	    Window_Base.prototype.initialize.call(this, 0, 0, wight, height);
	    this.refresh();
	};

	Window_MapStatus.prototype.windowWidth = function() {
	    return 240;
	};

	Window_MapStatus.prototype.windowHeight = function() {
	    return Graphics.boxHeight;
	};

	Window_MapStatus.prototype.refresh = function() {
	    this.contents.clear();
	    
        var width = this.contentsWidth();
        this.drawBackground(0, 0, width, this.lineHeight());
        //HP
        this.drawText('HP', 0, 0, width, 'left');
	    this.drawText(''  + $amttActor.activeActor.hp, 0, 0,  width, 'right');
	    //ATK
        this.drawText('ATK', 0, this.lineHeight(), width, 'left');
	    this.drawText(''  + $amttActor.activeActor.atk, 0, this.lineHeight(),  width, 'right');
	    //DEF
        this.drawText('DEF', 0, this.lineHeight() * 2, width, 'left');
	    this.drawText(''  + $amttActor.activeActor.def, 0, this.lineHeight() * 2,  width, 'right');

	    //GOLD
	    this.drawText('GOLD', 0, this.lineHeight() * 4, width, 'left');
	    this.drawText(''  + $gameParty.gold(), 0, this.lineHeight() * 4,  width, 'right');
	    //EXP
	    this.drawText('EXP', 0, this.lineHeight() * 5, width, 'left');
	    this.drawText(''  + $amttActor.activeActor.currentExp(), 0, this.lineHeight() * 5,  width, 'right');
	};

	Window_MapStatus.prototype.drawBackground = function(x, y, width, height) {
	    var color1 = this.dimColor1();
	    var color2 = this.dimColor2();
	    this.contents.gradientFillRect(x, y, width / 2, height, color2, color1);
	    this.contents.gradientFillRect(x + width / 2, y, width / 2, height, color1, color2);
	};

 	Scene_Map.prototype.createMapStatusWindow = function() {
	    this._mapStatusWindow = new Window_MapStatus();
	    this.addChild(this._mapStatusWindow);
	};

	var Scene_Map_Create_Display_Objects = Scene_Map.prototype.createDisplayObjects;
	//添加窗口
	Scene_Map.prototype.createDisplayObjects = function() {
		Scene_Map_Create_Display_Objects.call(this);
	    this.createMapStatusWindow();
	    this._mapStatusWindow.open();
	};
	//更新窗口
	var Scene_Map_Update = Scene_Map.prototype.update;

	Scene_Map.prototype.update = function() {
	    Scene_Map_Update.call(this);
	    this._mapStatusWindow.refresh();
	};
})();