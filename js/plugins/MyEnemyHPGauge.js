//=============================================================================
// My Plugin - Enemy HP Gauge
//=============================================================================
'use strict';
var Imported = Imported || {};
Imported.MyEnemyHPGauge = true;

var MyPlugin = MyPlugin || {};

// Parameter Plugin
MyPlugin.Parameters = PluginManager.parameters('MyEnemyHPGauge');
MyPlugin.Param = MyPlugin.Param || {};

MyPlugin.Param.gaugeWidth = Number(MyPlugin.Parameters['Gauge Width']) || 200;
MyPlugin.Param.gaugeHeight = Number(MyPlugin.Parameters['Gauge Height']) || 24;
MyPlugin.Param.x = Number(MyPlugin.Parameters['X Position']) || 0;
MyPlugin.Param.y = Number(MyPlugin.Parameters['Y Position']) || 0;

// Inisialisasi
var _Scene_Battle_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function() {
    _Scene_Battle_start.call(this);
    this._enemyHpGaugeWidth = MyPlugin.Param.gaugeWidth;
    this._enemyHpGaugeHeight = MyPlugin.Param.gaugeHeight;
    this._enemyHpGaugeX = MyPlugin.Param.x;
    this._enemyHpGaugeY = MyPlugin.Param.y;
};

Scene_Battle.prototype.drawEnemyHpGauge = function() {
    // Loop through all enemies in the troop
    for (var i = 0; i < $gameTroop.members().length; i++) {
        var enemy = $gameTroop.members()[i];

        // Check if enemy exists before accessing properties (optional)
        if (enemy) {
            var hpRate = enemy.hp / enemy.mhp;
            var gaugeWidth = this._enemyHpGaugeWidth * hpRate;

            // Draw gauge for each enemy
            Graphics.fillRect(this._enemyHpGaugeX, this._enemyHpGaugeY + (i * this._enemyHpGaugeHeight), gaugeWidth, this._enemyHpGaugeHeight);
        }
    }
};