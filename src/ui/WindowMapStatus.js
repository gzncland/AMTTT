//=============================================================================
// WindowMapStatus.js ver 0.0.3
//=============================================================================

/*:
 * @plugindesc 在地图上显示角色状态的类
 * @author Shadow Studio
 *
 */
 (function() {

 	function Window_MapStatus() {
    	this.initialize.apply(this, arguments);
	}

	var keyItems = new Array();

	Window_MapStatus.prototype = Object.create(Window_Base.prototype);
	Window_MapStatus.prototype.constructor = Window_MapStatus;

	Window_MapStatus.prototype.initialize = function() {
	    var wight = this.windowWidth();
	    var height = this.windowHeight();
	    Window_Base.prototype.initialize.call(this, 0, 0, wight, height);
	    //添加带key标签的物品进描绘队列
	    for (var i = 1; i < $dataItems.length; i++) {
	    	if($dataItems[i].meta.type === 'key'){
	    		keyItems.push($dataItems[i]);
	    	}
	    };
	    this.refresh();
	};

	Window_MapStatus.prototype.windowWidth = function() {
	    return 240;
	};

	Window_MapStatus.prototype.windowHeight = function() {
	    return Graphics.boxHeight;
	};
	var WINDOW_MAP_STATUS_BASE_OFFSET_Y = 96;
	var WINDOW_MAP_STATUS_LINE_HEIGHT = 36;
	var WINDOW_MAP_STATUS_HP_Y = WINDOW_MAP_STATUS_BASE_OFFSET_Y;
	var WINDOW_MAP_STATUS_ATK_Y = WINDOW_MAP_STATUS_BASE_OFFSET_Y + WINDOW_MAP_STATUS_LINE_HEIGHT;
	var WINDOW_MAP_STATUS_DEF_Y = WINDOW_MAP_STATUS_BASE_OFFSET_Y + WINDOW_MAP_STATUS_LINE_HEIGHT * 2;

	var WINDOW_MAP_STATUS_GOLD_Y = WINDOW_MAP_STATUS_BASE_OFFSET_Y + WINDOW_MAP_STATUS_LINE_HEIGHT * 4;
	var WINDOW_MAP_STATUS_EXP_Y = WINDOW_MAP_STATUS_BASE_OFFSET_Y + WINDOW_MAP_STATUS_LINE_HEIGHT * 5;

	var WINDOW_MAP_STATUS_KEY_Y = WINDOW_MAP_STATUS_BASE_OFFSET_Y + WINDOW_MAP_STATUS_LINE_HEIGHT * 7;

	Window_MapStatus.prototype.refresh = function() {
	    this.contents.clear();
        var width = this.contentsWidth();
        var actor = $gameParty.activeActor;
        this.drawFace(actor.faceName(),actor.faceIndex(),0, 0, 80, 80);
        //NAME
        this.drawText(actor.name(), WINDOW_MAP_STATUS_BASE_OFFSET_Y, 0, width - WINDOW_MAP_STATUS_BASE_OFFSET_Y, 'left');
        //HP
        this.drawText('HP', 0, WINDOW_MAP_STATUS_HP_Y, width, 'left');
	    this.drawText(''  + actor.hp, 0, WINDOW_MAP_STATUS_HP_Y,  width, 'right');
	    //ATK
        this.drawText('ATK', 0, WINDOW_MAP_STATUS_ATK_Y, width, 'left');
	    this.drawText(''  + actor.atk, 0, WINDOW_MAP_STATUS_ATK_Y,  width, 'right');
	    //DEF
        this.drawText('DEF', 0, WINDOW_MAP_STATUS_DEF_Y, width, 'left');
	    this.drawText(''  + actor.def, 0, WINDOW_MAP_STATUS_DEF_Y,  width, 'right');

	    //GOLD
	    this.drawText('GOLD',0 , WINDOW_MAP_STATUS_GOLD_Y, width, 'left');
	    this.drawText(''  + $gameParty.gold(), 0, WINDOW_MAP_STATUS_GOLD_Y,  width, 'right');
	    //EXP
	    this.drawText('EXP', 0, WINDOW_MAP_STATUS_EXP_Y, width, 'left');
	    this.drawText(''  + actor.currentExp(), 0 , WINDOW_MAP_STATUS_EXP_Y,  width, 'right');
	    //KEY
	    for (var i = 0; i < keyItems.length; i++) {
	    	var y = WINDOW_MAP_STATUS_KEY_Y + i * WINDOW_MAP_STATUS_LINE_HEIGHT;
	    	//提取持有物品个数
	    	var itemCount = Number($gameParty._items[keyItems[i].id] || 0);
		    this.drawText(keyItems[i].name, 0, y , width, 'left');
		    this.drawText('' + itemCount , 0 , y,  width, 'right');
	    };
	    
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