//=============================================================================
// SceneMenu.js ver 0.0.1
//=============================================================================
(function() {
    Scene_Menu.prototype.commandBook = function() {
        // this._statusWindow.setFormationMode(false);
        this._statusWindow.selectLast();
        this._statusWindow.activate();
        this._statusWindow.setHandler('ok',     this.onHandBookOk.bind(this));
        this._statusWindow.setHandler('cancel', this.onHandBookCancel.bind(this));
    };

    

    Scene_Menu.prototype.onHandBookOk = function() {
        this._statusWindow.deselect();
        this._commandWindow.activate();
    };

    Scene_Menu.prototype.onHandBookCancel = function() {
        this._statusWindow.deselect();
        this._commandWindow.activate();
    };

    Scene_Menu.prototype.createCommandWindow = function() {
        this._commandWindow = new Window_MenuCommand(0, 0);
        this._commandWindow.setHandler('item',      this.commandItem.bind(this));
        this._commandWindow.setHandler('skill',     this.commandPersonal.bind(this));
        this._commandWindow.setHandler('equip',     this.commandPersonal.bind(this));
        this._commandWindow.setHandler('status',    this.commandPersonal.bind(this));
        this._commandWindow.setHandler('formation', this.commandFormation.bind(this));
        this._commandWindow.setHandler('options',   this.commandOptions.bind(this));
        this._commandWindow.setHandler('save',      this.commandSave.bind(this));
        this._commandWindow.setHandler('gameEnd',   this.commandGameEnd.bind(this));
        this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
        this._commandWindow.setHandler('book',    this.commandBook.bind(this));
        this._commandWindow.setHandler('trans',    this.commandTrans.bind(this));
        this.addWindow(this._commandWindow);
    };
})();