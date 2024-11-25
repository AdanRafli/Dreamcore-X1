// Script untuk melepas semua senjata kecuali tombak

// Fungsi untuk memeriksa dan melepas senjata lain jika sedang menggunakan tombak
Game_Actor.prototype.forceUnequipOtherWeapons = function() {
    // Dapatkan indeks senjata yang sedang digunakan
    const weaponIndex = this.equips()[0];

    // Jika senjata yang digunakan adalah tombak
    if (weaponIndex >= 0 && $dataWeapons[weaponIndex].type === 1) {
        // Loop melalui semua slot peralatan
        for (let i = 1; i < this.equips().length; i++) {
            // Jika slot berisi senjata dan bukan tombak, maka lepas
            if (this.equips()[i] && $dataItems[this.equips()[i]].type === 9 && $dataItems[this.equips()[i]].id !== weaponIndex) {
                this.forceChangeEquip(i, 0); // Lepas peralatan di slot ini
            }
        }
    }
};

// Panggil fungsi ini setelah pemain mengubah peralatan
Game_Actor.prototype.onEquipItems = function(items) {
    Game_Actor.prototype.onEquipItems.call(this, items);
    this.forceUnequipOtherWeapons();
};