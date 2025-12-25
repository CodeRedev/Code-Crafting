fx_version 'cerulean'
game 'gta5'

author 'CodeRed'
description 'Advanced Crafting System UI Created By BLDR.chat'
version '1.0.0'

ui_page 'web/dist/index.html'

files {
    'web/dist/index.html',
    'web/dist/assets/**/*',
}

shared_scripts {
    '@ox_lib/init.lua',
    'config.lua',
}

server_scripts {
    'server/crafting.lua',
}

client_scripts {
    'client/main.lua',
}

dependencies {}
