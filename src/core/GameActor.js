//=============================================================================
// AMTTCore_GameActor.js ver 0.0.1
//=============================================================================

(function() {
    //------------------------------------------------------------------------
    //Game_Actor
    //------------------------------------------------------------------------
    var _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function(){
        _Game_Actor_initMembers.call(this);
        this._amtt_atk = 0;
        this._amtt_hp = 0;
        this._amtt_def = 0;
        this._amtt_exp = 0;
    }

    var _Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        _Game_Actor_setup.call(this, actorId);
        var actor = $dataActors[actorId];
        var hp = Number(actor.meta.hp || -1);
        if(hp <= 0){
            throw new Error('角色未定义HP属性或HP属性定义错误.</br>触发异常的角色ID:' + actorId + '名称:' + actor.name);
        }
        this._amtt_hp = hp;

        var atk = Number(actor.meta.atk || -1);
        if(atk < 0){
             throw new Error('角色未定义ATK属性或ATK属性定义错误.</br>触发异常的角色ID:' + actorId + '名称:' + actor.name);
        }
        this._amtt_atk = atk;

        var def = Number(actor.meta.def || -1);
        if(def < 0){
            throw new Error('未定义DEF属性或DEF属性定义错误.</br>触发异常的角色ID:' + actorId + '名称:' + actor.name);
        }
        this._amtt_def = def;
    };    

    Game_Actor.prototype.amttGainATK = function(setValue){
        var result = Number(setValue || NaN);
        if(isNaN(setValue)){
            throw new Error('调用Game_Actor.amttGainATK(' + setValue + ')的参数设置错误');
        }
        this._amtt_atk += result;
        if(this._amtt_atk < 0){
            this._amtt_atk = 0;
        }
    };

    Game_Actor.prototype.amttGainDEF = function(setValue){
        var result = Number(setValue || NaN);
        if(isNaN(setValue)){
            throw new Error('调用Game_Actor.amttGainDEF(' + setValue + ')的参数设置错误');
        }
        this._amtt_def += result;
        if(this._amtt_def < 0){
            this._amtt_def = 0;
        }
    };

    Game_Actor.prototype.amttGainHP = function(setValue){
        var result = Number(setValue || NaN);
        if(isNaN(setValue)){
            throw new Error('调用Game_Actor.amttGainHP(' + setValue + ')的参数设置错误');
        }
        this._amtt_hp += result;
        if(this._amtt_hp < 0){
            this._amtt_hp = 0;
        }
    };

    Game_Actor.prototype.amttGainEXP = function(setValue){
        var result = Number(setValue || NaN);
        if(isNaN(setValue)){
            throw new Error('调用Game_Actor.amttGainEXP(' + setValue + ')的参数设置错误');
        }
        this._amtt_exp += result;
        if(this._amtt_exp < 0){
            this._amtt_exp = 0;
        }
    };

    Object.defineProperties(Game_Actor.prototype, {
        amttHP : {
            get : function(){
                return this._amtt_hp;
            }, configurable: true 
        },
        amttATK : {
            get : function(){
                return this._amtt_atk;
            }, configurable: true 
        },
        amttDEF : {
            get : function(){
                return this._amtt_def;
            }, configurable: true 
        },
        amttEXP : {
            get : function(){
                return this._amtt_exp;
            }, configurable: true 
        },
        amttIsDead : {
            get : function(){
                return this._amtt_hp <= 0;
            }, configurable: false 
        }
    });

    
})();