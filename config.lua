Config = {}
-- Inventory images path
Config.InventoryImagePath = "nui://qb-inventory/html/images/"

-- Experience and progression
Config.ExpPerCraft = 50         -- XP gained per craft
Config.ExpPerLevel = 1000       -- XP needed per level


-- Crafting categories
Config.CraftingCategories = {
    weapon = {
        id = "weapon",
        label = "Weapons",
        icon = "wrench"
    },
    tools = {
        id = "tools",
        label = "Tools",
        icon = "wrench"
    },
    attachments = {
        id = "attachments",
        label = "Attachments",
        icon = "puzzle-piece"
    }
}

-- Crafting stations
Config.CraftingStations = {
    WeaponWorkshop = {
        label = "Weapon Workshop",
        coords = vector4(979.48, -1722.12, 31.12, 79.14),
        requiredJob = "police",
        -- requiredGang = "vagos",
        recipes = {
            -- Weapons
            weapon_knife = {
                item = "weapon_knife",
                category = "weapon",
                craftTime = 5,
                requiredLevel = 1,
                requirements = {
                    steel = 5,
                    rubber = 2
                }
            },
            weapon_bat = {
                item = "weapon_bat",
                category = "weapon",
                craftTime = 8,
                requiredLevel = 1,
                requirements = {
                    metalscrap = 8,
                    rubber = 2
                }
            },
            weapon_pistol = {
                item = "weapon_pistol",
                category = "weapon",
                craftTime = 20,
                requiredLevel = 3,
                requirements = {
                    iron = 20,
                    copper = 10,
                    plastic = 5
                }
            },
            weapon_pistol50 = {
                item = "weapon_pistol50",
                category = "weapon",
                craftTime = 25,
                requiredLevel = 5,
                requirements = {
                    iron = 25,
                    copper = 12,
                    plastic = 8
                }
            },
            weapon_combatpistol = {
                item = "weapon_combatpistol",
                category = "weapon",
                craftTime = 30,
                requiredLevel = 7,
                requirements = {
                    iron = 30,
                    copper = 15,
                    plastic = 10
                }
            },
            weapon_microsmg = {
                item = "weapon_microsmg",
                category = "weapon",
                craftTime = 40,
                requiredLevel = 10,
                requirements = {
                    steel = 40,
                    copper = 20,
                    plastic = 15
                }
            },
            weapon_minismg = {
                item = "weapon_minismg",
                category = "weapon",
                craftTime = 50,
                requiredLevel = 12,
                requirements = {
                    steel = 50,
                    copper = 25,
                    plastic = 20
                }
            },
            weapon_assaultrifle = {
                item = "weapon_assaultrifle",
                category = "weapon",
                craftTime = 70,
                requiredLevel = 15,
                requirements = {
                    steel = 70,
                    aluminum = 30,
                    plastic = 25
                }
            },
            weapon_compactrifle = {
                item = "weapon_compactrifle",
                category = "weapon",
                craftTime = 65,
                requiredLevel = 14,
                requirements = {
                    steel = 60,
                    aluminum = 25,
                    plastic = 20
                }
            },

            -- Attachments
            clip_attachment = {
                item = "clip_attachment",
                category = "attachments",
                craftTime = 8,
                requiredLevel = 2,
                requirements = {
                    steel = 8,
                    plastic = 4
                }
            },
            suppressor_attachment = {
                item = "suppressor_attachment",
                category = "attachments",
                craftTime = 12,
                requiredLevel = 4,
                requirements = {
                    steel = 12,
                    rubber = 6
                }
            },
            smallscope_attachment = {
                item = "smallscope_attachment",
                category = "attachments",
                craftTime = 15,
                requiredLevel = 6,
                requirements = {
                    glass = 8,
                    aluminum = 5
                }
            },

            -- Tools
            armor = {
                item = "armor",
                category = "tools",
                craftTime = 10,
                requiredLevel = 2,
                requirements = {
                    steel = 15,
                    plastic = 5
                }
            },
            handcuffs = {
                item = "handcuffs",
                category = "tools",
                craftTime = 5,
                requiredLevel = 1,
                requirements = {
                    steel = 5
                }
            },
            lockpick = {
                item = "advancedlockpick",
                category = "tools",
                craftTime = 7,
                requiredLevel = 1,
                requirements = {
                    steel = 4,
                    plastic = 3
                }
            },
            drill = {
                item = "drill",
                category = "tools",
                craftTime = 12,
                requiredLevel = 3,
                requirements = {
                    steel = 10,
                    copper = 5,
                    plastic = 4
                }
            },
            pistol_ammo = {
                item = "pistol_ammo",
                category = "tools",
                craftTime = 5,
                requiredLevel = 2,
                requirements = {
                    copper = 3,
                    gunpowder = 2
                }
            },
            smg_ammo = {
                item = "smg_ammo",
                category = "tools",
                craftTime = 7,
                requiredLevel = 4,
                requirements = {
                    copper = 5,
                    gunpowder = 4
                }
            },
            rifle_ammo = {
                item = "rifle_ammo",
                category = "tools",
                craftTime = 10,
                requiredLevel = 6,
                requirements = {
                    copper = 8,
                    gunpowder = 6
                }
            }
        }
    }
}
