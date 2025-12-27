local QBCore = exports['qb-core']:GetCoreObject()

--============================--
--  STATE
--============================--

local isCraftingOpen = false
local currentStation = nil
local PlayerCraftingXP = 0

--============================--
--  UTIL / HELPERS
--============================--

local function LoadModel(model)
    RequestModel(model)
    while not HasModelLoaded(model) do
        Wait(10)
    end
end

local function BuildCraftItems(station)
    local items = {}

    for id, recipe in pairs(station.recipes) do
        local materials = {}

        for material, amount in pairs(recipe.requirements) do
            materials[#materials + 1] = {
                name = material,
                quantity = amount,
                image = Config.InventoryImagePath .. material .. ".png"
            }
        end

        items[#items + 1] = {
            id = id,
            name = recipe.item:gsub("_", " "):upper(),
            category = recipe.category,
            image = Config.InventoryImagePath .. recipe.item .. ".png",
            levelRequired = recipe.requiredLevel,
            craftTime = recipe.craftTime,
            materials = materials
        }
    end

    return items
end

local function GetCategories()
    local categories = {}

    for _, category in pairs(Config.CraftingCategories) do
        categories[#categories + 1] = {
            id = category.id,
            label = category.label,
            icon = category.icon
        }
    end

    return categories
end

local function GetPlayerCraftingXP(cb)
    QBCore.Functions.TriggerCallback('crafting:getXP', function(xp)
        PlayerCraftingXP = xp or 0
        if cb then cb(PlayerCraftingXP) end
    end)
end

local function GetUserMaterials(stationKey)
    local Player = QBCore.Functions.GetPlayerData()
    local materials = {}

    if not stationKey then return materials end

    local recipes = Config.CraftingStations[stationKey].recipes
    local needed = {}

    for _, recipe in pairs(recipes) do
        for mat in pairs(recipe.requirements) do
            needed[mat] = true
        end
    end

    for _, item in pairs(Player.items or {}) do
        if needed[item.name] then
            materials[item.name] = item.amount
        end
    end

    return materials
end

--============================--
--  UI OPEN / CLOSE
--============================--

local function OpenCrafting(stationKey)
    local station = Config.CraftingStations[stationKey]
    if not station then return end

    currentStation = stationKey
    isCraftingOpen = true
    SetNuiFocus(true, true)

    GetPlayerCraftingXP(function(xp)
        SendNUIMessage({ type = 'openCrafting' })

        SendNUIMessage({
            type = 'updateUI',
            data = {
                stationLabel = station.label,
                items = BuildCraftItems(station),
                categories = GetCategories(),
                userMaterials = GetUserMaterials(stationKey),
                xp = xp,
                expPerLevel = Config.ExpPerLevel,
            }
        })
    end)
end

local function CloseCrafting()
    isCraftingOpen = false
    currentStation = nil
    SetNuiFocus(false, false)

    SendNUIMessage({ type = 'closeCrafting' })
end

--============================--
--  NUI CALLBACKS
--============================--

RegisterNUICallback('craft:close', function(_, cb)
    CloseCrafting()
    cb({})
end)

RegisterNUICallback('craft:requestData', function(_, cb)
    if not currentStation then return cb({}) end

    local station = Config.CraftingStations[currentStation]

    SendNUIMessage({
        type = 'updateUI',
        data = {
            stationLabel = station.label,
            items = BuildCraftItems(station),
            categories = GetCategories(),
            userMaterials = GetUserMaterials(currentStation),
            xp = PlayerCraftingXP,
            expPerLevel = Config.ExpPerLevel
        }
    })

    cb({})
end)

RegisterNUICallback('craft:start', function(data, cb)
    if not currentStation then return cb({ success = false }) end

    local recipe = Config.CraftingStations[currentStation].recipes[data.itemId]
    if not recipe then return cb({ success = false }) end

    local totalTime = recipe.craftTime * data.quantity

    CreateThread(function()
        local interval = totalTime / 100

        for progress = 1, 100 do
            Wait(interval * 1000)
            SendNUIMessage({
                type = 'craftingProgress',
                data = { progress = progress }
            })
        end

        TriggerServerEvent('crafting:giveItem', data.itemId, data.quantity)
    end)

    cb({ success = true })
end)

--============================--
--  SERVER EVENTS
--============================--

RegisterNetEvent('crafting:finishCraft', function(itemId, quantity, newXP)
    PlayerCraftingXP = newXP

    SendNUIMessage({
        type = 'updateUI',
        data = { xp = newXP }
    })

    local materials = {}
    local station = Config.CraftingStations[currentStation]
    if not station then return end

    for _, recipe in pairs(station.recipes) do
        for mat in pairs(recipe.requirements) do
            materials[mat] = 0
        end
    end

    for _, item in pairs(QBCore.Functions.GetPlayerData().items or {}) do
        if materials[item.name] ~= nil then
            materials[item.name] = item.amount
        end
    end

    SendNUIMessage({
        type = 'updateUI',
        data = { userMaterials = materials }
    })
end)

--============================--
--  PED / TARGET
--============================--

CreateThread(function()
    for key, station in pairs(Config.CraftingStations) do
        LoadModel(`s_m_y_chef_01`)

        local c = station.coords
        local ped = CreatePed(0, `s_m_y_chef_01`, c.x, c.y, c.z - 1.0, c.w, false, true)

        SetEntityInvincible(ped, true)
        SetBlockingOfNonTemporaryEvents(ped, true)
        FreezeEntityPosition(ped, true)

        exports['qb-target']:AddTargetEntity(ped, {
            options = {
                {
                    icon = "fas fa-tools",
                    label = station.label,
                    job = station.requiredJob,
                    gang = station.requiredGang,
                    action = function()
                        OpenCrafting(key)
                    end
                }
            },
            distance = 2.0
        })
    end
end)

--============================--
--  SAFETY
--============================--

AddEventHandler('onResourceStop', function(res)
    if res == GetCurrentResourceName() and isCraftingOpen then
        SetNuiFocus(false, false)
    end
end)
