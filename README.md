# Code-Crafting for QB-Core (UI Created by [BLDR](https://bldr.chat))


**A fully-featured crafting system for FiveM using QB-Core.**
This resource allows players to craft items using configurable crafting stations, recipes, and XP progression. Includes NUI interface with progress bars 

---

## Features

* Configurable crafting stations and recipes

* Player XP system for crafting levels

* NUI-based crafting UI with live progress bar

* Integration with `qb-target` for ped interactions

---

## Configuration

* `config.lua` contains all stations, recipes, XP settings, and UI paths.

Example station:

```lua
Config.CraftingStations = {
    WeaponWorkshop = {
        label = "Weapon Workshop",
        coords = vector4(979.48, -1722.12, 31.12, 79.14),
        recipes = {
            weapon_knife = {
                item = "weapon_knife",
                category = "weapon",
                craftTime = 5, -- seconds
                requiredLevel = 1,
                requirements = {
                    steel = 5,
                    rubber = 2
                }
            },
        }
    }
}
```

Other options:

* `Config.CraftingCategories` → UI categories
* `Config.ExpPerCraft` → XP gained per craft
* `Config.InventoryImagePath` → path to images for NUI

---


### Client

* Approach a crafting ped and interact (qb-target)
* NUI interface will open:

  * Select recipe
  * Start crafting
  * Progress bar displays
  * Upon completion, item added to inventory

---

## Preview

![Crafting Interface](https://files.fivemerr.com/images/9af6013b-77d0-4d4d-814d-53b28be4a19c.png)

## Dependencies

* [qb-core](https://github.com/qbcore-framework/qb-core)
* [qb-target](https://github.com/qbcore-framework/qb-target)

---

## *License*

*MIT License – free to use, modify, and distribute. Please give credit if shared publicly.*
