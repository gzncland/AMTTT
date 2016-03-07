//=============================================================================
// WindowMenuCommand.js ver 0.0.1
//=============================================================================
(function() {
	Window_MenuCommand.prototype.windowWidth = function() {
        return 128;
    };

    Window_MenuCommand.prototype.needsCommand = function(name) {
        var flags = $dataSystem.menuCommands;
        if (flags) {
            switch (name) {
            case 'item':
                return flags[0];
            case 'skill':
                return flags[1];
            case 'equip':
                return flags[2];
            case 'status':
                return flags[3];
            case 'formation':
                return flags[4];
            case 'save':
                return flags[5];
            }
        }
        return true;
    };

    Window_MenuCommand.prototype.addMainCommands = function() {
        // var enabled = this.areMainCommandsEnabled();
        // if (this.needsCommand('book')) {
            //TODO:加入手册持有判定
            //TODO:AMTT VOCAL
            this.addCommand('小黄书', 'book', true);
            this.addCommand('传送', 'trans', true);
        // }
        if (this.needsCommand('item')) {
            this.addCommand(TextManager.item, 'item', this.areMainCommandsEnabled());
        }
        // if (this.needsCommand('equip')) {
        //     this.addCommand(TextManager.equip, 'equip', enabled);
        // }
        // if (this.needsCommand('status')) {
        //     this.addCommand(TextManager.status, 'status', enabled);
        // }
    };

    Window_MenuCommand.prototype.makeCommandList = function() {
        this.addMainCommands();
        //this.addFormationCommand();
        this.addOriginalCommands();
        this.addOptionsCommand();
        this.addSaveCommand();
        this.addGameEndCommand();
    };
})();