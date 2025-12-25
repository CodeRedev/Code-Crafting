local QBCore = exports['qb-core']:GetCoreObject()

QBCore.Functions.CreateCallback('crafting:getXP', function(source, cb)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then
        return cb(0)
    end

    local xp = Player.Functions.GetRep('CraftingXP') or 0
    cb(xp)
end)

-- =========================
-- Helper
-- =========================
local function GetRecipeByItemId(itemId)
    for _, station in pairs(Config.CraftingStations) do
        if station.recipes[itemId] then
            return station.recipes[itemId]
        end
    end
    return nil
end

-- =========================
-- Crafting Event
-- =========================
RegisterNetEvent('crafting:giveItem', function(itemId, quantity)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    if not Player then return end

    quantity = tonumber(quantity) or 1
    if quantity <= 0 then return end

    local recipe = GetRecipeByItemId(itemId)
    if not recipe then return end

    local requiredItems = {}
    for item, amount in pairs(recipe.requirements) do
        requiredItems[item] = amount * quantity
    end

    local removedItems = {}
    local failedItem = nil

    for item, amount in pairs(requiredItems) do
        local success = Player.Functions.RemoveItem(item, amount)

        if success then
            removedItems[item] = amount
        else
            failedItem = item
            break
        end
    end

    if failedItem then
        for item, amount in pairs(removedItems) do
            Player.Functions.AddItem(item, amount)
        end
        TriggerClientEvent('QBCore:Notify',src,'Crafting failed (missing materials)','error')
        return
    end

    Player.Functions.AddItem(recipe.item, quantity)
    local gainedXP = Config.ExpPerCraft * quantity
    Player.Functions.AddRep('craftingP', gainedXP)
    local newXP = Player.Functions.GetRep('craftingP')
    TriggerClientEvent('crafting:finishCraft', src, itemId, quantity, newXP)
    TriggerClientEvent('inventory:client:ItemBox', src, QBCore.Shared.Items[recipe.item], 'add')
end)
