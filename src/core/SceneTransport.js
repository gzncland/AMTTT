(function() {
	function Scene_Transport() {
	    this.initialize.apply(this, arguments);
	}

	Scene_Transport.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_Transport.prototype.constructor = Scene_Transport;

	Scene_Transport.prototype.initialize = function() {
	    Scene_MenuBase.prototype.initialize.call(this);
	};

	Scene_Transport.prototype.create = function() {
	    Scene_MenuBase.prototype.create.call(this);
	    this.createCommandWindow();
	    // this.createStatusWindow();
	};

	Scene_Transport.prototype.start = function() {
	    Scene_MenuBase.prototype.start.call(this);
	    // this._statusWindow.refresh();
	};


	Scene_Transport.prototype.createCommandWindow = function() {
	    this._commandWindow =  new Window_TransList(0, 0, 192, Graphics.boxHeight);
	    this._commandWindow.setHandler('ok',     this.onTransOk.bind(this));
    	this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    	this.addWindow(this._commandWindow);
    	this._commandWindow.refresh();
    	this._commandWindow.activate();
    	this._commandWindow.selectLast();
	};

	Scene_Transport.prototype.canTrans = function() {
	    return this._commandWindow._data.length > 0 && this._commandWindow._data[0] != null;
	};

	Scene_Transport.prototype.transport = function() {
		var mapId = this._commandWindow._data[this._commandWindow.index()].mapId;
		var eventId = this._commandWindow._data[this._commandWindow.index()].eventId;
		var x = -1;
		var y = -1;
        //读取临时地图
        DataManager.loadMapDataToObject2(mapId, function(map){
            DataManager.onLoadMap(map);
            //找出楼梯
            x = map.events[eventId].x;
            y = map.events[eventId].y;
            
            //有匹配的楼梯
            if(x != -1 && y != -1){
            	$gamePlayer.reserveTransfer(mapId, x, y);
        		$gamePlayer.requestMapReload();
                SceneManager.goto(Scene_Map);
            }else{
                throw new Error('没有匹配的楼梯');
            }
        });
		this._commandWindow.refresh();
    	this._commandWindow.activate();
	};

	Scene_Transport.prototype.onTransOk = function() {
	    //TODO:Trnas
	    if(this.canTrans()){
	    	this.transport();
	    }else{
	    	SoundManager.playBuzzer();
	    	this._commandWindow.refresh();
    		this._commandWindow.activate();
	    }
	};

	Scene_Menu.prototype.commandTrans = function() {
        SceneManager.push(Scene_Transport);
    };

	function Window_TransList() {
	    this.initialize.apply(this, arguments);
	}

	Window_TransList.prototype = Object.create(Window_Selectable.prototype);
	Window_TransList.prototype.constructor = Window_TransList;

	Window_TransList.prototype.initialize = function(x, y, width, height) {
	    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	    this._data = [];
	};

	Window_TransList.prototype.maxCols = function() {
	    return 1;
	};


	Window_TransList.prototype.spacing = function() {
	    return 48;
	};

	Window_TransList.prototype.maxItems = function() {
	    return this._data ? this._data.length : 1;
	};

	Window_TransList.prototype.makeItemList = function() {
		if($gameParty.amtt_transportPoints.length == 0){
			this._data = [];
			this._data.push(null);
		}else{
			this._data = $gameParty.amtt_transportPoints;
		}
	    // this._data = $gameParty.allItems().filter(function(item) {
	    //     return this.includes(item);
	    // }, this);
	    // if (this.includes(null)) {
	    //     this._data.push(null);
	    // }
	};


	Window_TransList.prototype.drawItem = function(index) {
	    var item = this._data[index];
	    if (item) {
	    	console.log(item);
	        // var numberWidth = this.numberWidth();
	        var rect = this.itemRect(index);
	        // rect.width -= this.textPadding();
	        // this.changePaintOpacity(this.isEnabled(item));
	        this.drawText('mid = ' + item.mapId + ' eid = ' + item.eventId, rect.x,  rect.y, rect.width);
	        // this.drawItemNumber(item, rect.x, rect.y, rect.width);
	        // this.changePaintOpacity(1);
	    }
	};

	Window_TransList.prototype.refresh = function() {
	    this.makeItemList();
	    this.createContents();
	    this.drawAllItems();
	};

	Window_TransList.prototype.selectLast = function() {
	    var index = 0;//this._data.indexOf($gameParty.lastItem());
	    this.select(index >= 0 ? index : 0);
	};

})();