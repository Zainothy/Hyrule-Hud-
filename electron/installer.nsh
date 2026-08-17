; Custom NSIS install/uninstall hooks.
; Creates desktop and Start Menu shortcuts with explicit icon so they always show correctly.
; electron-builder's built-in createDesktopShortcut and createStartMenuShortcut are disabled
; in package.json to avoid duplicate or icon-less shortcuts.

!macro customInstall
    Delete "$DESKTOP\BotW Live Savegame Monitor.lnk"
    Delete "$SMPROGRAMS\BotW Live Savegame Monitor.lnk"
    IfFileExists "$DESKTOP\Hyrule HUD.lnk" +2
    CreateShortcut "$DESKTOP\Hyrule HUD.lnk" "$INSTDIR\Hyrule-HUD.exe" "" "$INSTDIR\Hyrule-HUD.exe" 0
    IfFileExists "$SMPROGRAMS\Hyrule HUD.lnk" +2
    CreateShortcut "$SMPROGRAMS\Hyrule HUD.lnk" "$INSTDIR\Hyrule-HUD.exe" "" "$INSTDIR\Hyrule-HUD.exe" 0
!macroend

!macro customUnInstall
    ${ifNot} ${isUpdated}
        Delete "$DESKTOP\Hyrule HUD.lnk"
        Delete "$SMPROGRAMS\Hyrule HUD.lnk"
        Delete "$DESKTOP\BotW Live Savegame Monitor.lnk"
        Delete "$SMPROGRAMS\BotW Live Savegame Monitor.lnk"
    ${endIf}
!macroend
