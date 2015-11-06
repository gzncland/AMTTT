//=============================================================================
// WindowEnemyBook.js ver 0.0.1
//=============================================================================
 (function() {

    function Window_EnemyBook() {
        this.initialize.apply(this, arguments);
    }

    Window_EnemyBook.prototype = Object.create(Window_Selectable.prototype);
    Window_EnemyBook.prototype.constructor = Window_EnemyBook;

    Window_EnemyBook.prototype.initialize = function(x, y) {
        var wight = this.windowWidth();
        var height = this.windowHeight(); 
        Window_Selectable.prototype.initialize.call(this, x, y, wight, height);
        this._formationMode = false;
        this._pendingIndex = -1;

        this.initializeEnemyList();
        this.refresh();
    };

    //初始化敌人列表 并排序
    Window_EnemyBook.prototype.initializeEnemyList = function() {
        this.enemiesList = [];
        //添加敌人
        var enemmiesTempList = $gameMap.enemiesList;
        for(var enemy in enemmiesTempList){
            this.enemiesList.push(enemmiesTempList[enemy]);
        }
        //排序
        this.enemiesList.sort( 
            function(enemyA, enemyB){
                var damageA = enemyA.damageToActiveActor;
                var damageB = enemyB.damageToActiveActor;
                return damageA > damageB ? 1 : -1;
            }
        );
    };

    Window_EnemyBook.prototype.windowWidth = function() {
        return Graphics.boxWidth - 240;
    };

    Window_EnemyBook.prototype.windowHeight = function() {
        return Graphics.boxHeight;
    };

    Window_EnemyBook.prototype.maxItems = function() {
        return $gameMap.enemiesCount;
    };

    Window_EnemyBook.prototype.itemHeight = function() {
        var clientHeight = this.height - this.padding * 2;
        return Math.floor(clientHeight / this.numVisibleRows());
    };

    //每页显示的行数
    Window_EnemyBook.prototype.numVisibleRows = function() {
        return 6;
    };


    Window_EnemyBook.prototype.drawItem = function(index) {
        this.drawItemBackground(index);
        this.drawEnemyItem(index);
    };

    Window_EnemyBook.prototype.drawItemBackground = function(index) {
        //高亮选择区域背景
        if (index === this._pendingIndex) {
            var rect = this.itemRect(index);
            var color = this.pendingColor();
            this.changePaintOpacity(false);
            this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
            this.changePaintOpacity(true);
        }
    };
    var COLUMN_1_OFFSET_X = 128;
    var COLUMN_2_OFFSET_X = 264;
    var COLUMN_3_OFFSET_X = 400;
    Window_EnemyBook.prototype.drawEnemyItem = function(index) {
        var rect = this.itemRect(index);
        var enemyEvent = this.enemiesList[index];
        var enemyData = enemyEvent.enemyData;
        var enemyProxy = enemyEvent.enemyProxy;
        var damage = enemyEvent.damageToActiveActor;//enemyProxy.battle($gameParty.activeActor ,enemyData);
        this.drawText(enemyData.name, rect.x + 4, rect.y + 1, rect.width, 'left');
        this.drawDirectionCharacter(enemyEvent.characterName(), enemyEvent.characterIndex(),enemyEvent._originalDirection,rect.x + 24, rect.y + 88);
        //HP
        this.drawText(TextManager.hp                   , rect.x + COLUMN_1_OFFSET_X, rect.y + 1, 128, 'left');
        this.drawText(enemyProxy.getEnemyHp(enemyData) , rect.x + COLUMN_1_OFFSET_X, rect.y + 1, 128, 'right');
        //ATK
        this.drawText(TextManager.param(2)             , rect.x + COLUMN_2_OFFSET_X, rect.y + 1, 128, 'left');
        this.drawText(enemyProxy.getEnemyAtk(enemyData), rect.x + COLUMN_2_OFFSET_X, rect.y + 1, 128, 'right');
        //DEF
        this.drawText(TextManager.param(3)             , rect.x + COLUMN_3_OFFSET_X, rect.y + 1, 128, 'left');
        this.drawText(enemyProxy.getEnemyDef(enemyData), rect.x + COLUMN_3_OFFSET_X, rect.y + 1, 128, 'right');
        //GOLD
        this.drawText(TextManager.currencyUnit         , rect.x + COLUMN_1_OFFSET_X, rect.y + 32, 128, 'left');
        this.drawText(enemyProxy.getEnemyGold(enemyData) , rect.x + COLUMN_1_OFFSET_X, rect.y + 32, 128, 'right');
        //EXP
        this.drawText(TextManager.expA                 , rect.x + COLUMN_2_OFFSET_X, rect.y + 32, 128, 'left');
        this.drawText(enemyProxy.getEnemyExp(enemyData), rect.x + COLUMN_2_OFFSET_X, rect.y + 32, 128, 'right');
        //DAMAGE
        this.drawText('Dam'                            , rect.x + COLUMN_3_OFFSET_X, rect.y + 32, 128, 'left');
        this.drawText(damage                           , rect.x + COLUMN_3_OFFSET_X, rect.y + 32, 128, 'right');
    };

    Window_EnemyBook.prototype.selectLast = function() {
        this.select(0);
    };

    Window_EnemyBook.prototype.formationMode = function() {
        return this._formationMode;
    };

    Window_EnemyBook.prototype.setFormationMode = function(formationMode) {
        this._formationMode = formationMode;
    };
    Scene_Menu.prototype.createStatusWindow = function() {
        this._statusWindow = new Window_EnemyBook(this._commandWindow.width, 0);
        this.addWindow(this._statusWindow);
    };
})();