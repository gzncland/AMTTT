//=============================================================================
// AMTTCore_DataManager.js ver 0.0.1
//=============================================================================
(function() {
	DataManager.onLoadMap = function(object) {
        var array;
        this.extractMetadata(object);
        array = object.events;
        if (Array.isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                var data = array[i];
                if (data && data.note !== undefined) {
                    this.extractMetadata(data);
                }
            }
        }
    };
    DataManager.loadMapDataToObject = function(mapId, mapEvent, onCompleteCallback) {
        if (mapId > 0) {
            var filename = 'Map%1.json'.format(mapId.padZero(3));
            return this.loadDataFileToObject(filename, onCompleteCallback);
        } else {
            throw new Error('找不到地图' + filename + '<br>触发异常的事件位于地图编号:' + mapEvent._mapId + ' 事件ID:' + mapEvent._eventId + ' 坐标: ' + mapEvent.event().x + ',' + mapEvent.event().y);
        }
    };

    DataManager.loadDataFileToObject = function(src, onCompleteCallback) {
        var xhr = new XMLHttpRequest();
        var url = 'data/' + src;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = function() {
            if (xhr.status < 400) {
                onCompleteCallback(JSON.parse(xhr.responseText));
            }
        };
        xhr.onerror = function() {
            throw new Error('地图读取失败<br>触发异常的地图路径为:' + url);
        };
        xhr.send();
    };
})();