//=============================================================================
// Window_Base.js ver 0.0.1
//=============================================================================
 (function() {

    Window_Base.prototype.drawDirectionCharacter = function(characterName, characterIndex, characterDirection, x, y) {
        var bitmap = ImageManager.loadCharacter(characterName);
        var big = ImageManager.isBigCharacter(characterName);
        var pw = bitmap.width / (big ? 3 : 12);
        var ph = bitmap.height / (big ? 4 : 8);
        var n = characterIndex;
        var sx = (n % 4 * 3 + 1) * pw;
        var dirY = Math.floor(characterDirection / 2) - 1;
        var sy = (Math.floor(n / 4) * 4 + dirY) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
    };
})();