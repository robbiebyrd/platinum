"use client";

import {getTheme} from "@/app/SystemFolder/Appearance/PlatinumAppearance";
import {ClassicyAboutWindow} from "@/app/SystemFolder/SystemResources/AboutWindow/ClassicyAboutWindow";
import ClassicyApp from "@/app/SystemFolder/SystemResources/App/ClassicyApp";
import {useDesktop, useDesktopDispatch,} from "@/app/SystemFolder/SystemResources/AppManager/ClassicyAppManagerContext";
import ClassicyButton from "@/app/SystemFolder/SystemResources/Button/ClassicyButton";
import ClassicyControlLabel from "@/app/SystemFolder/SystemResources/ControlLabel/ClassicyControlLabel";
import ClassicyPopUpMenu from "@/app/SystemFolder/SystemResources/PopUpMenu/ClassicyPopUpMenu";
import {useSound, useSoundDispatch,} from "@/app/SystemFolder/SystemResources/SoundManager/PlatinumSoundManagerContext";
import PlatinumWindow from "@/app/SystemFolder/SystemResources/Window/PlatinumWindow";
import React from "react";

export const AppearanceManager: React.FC = () => {
    const appName: string = "Appearance Manager";
    const appId: string = "AppearanceManager.app";
    const appIcon: string = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/control-panels/appearance-manager/app.png`;
    const packageIcon: string = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/control-panels/appearance-manager/platinum.png`;

    const desktopContext = useDesktop(), desktopEventDispatch = useDesktopDispatch();

    const playerState = useSound(), player = useSoundDispatch();

    const [showAbout, setShowAbout] = React.useState(false);
    const [enableAllSounds, setEnableAllSounds] = React.useState(false);

    const themesList = desktopContext.availableThemes.map((a: any) =>
        (({id, name}) => ({value: id, label: name}))(a),
    );

    const switchTheme = (e) => {
        desktopEventDispatch({
            type: "PlatinumDesktopTheme",
            activeTheme: e.target.value,
        });
        loadSoundTheme(e.target.value);
    };

    const loadSoundTheme = (themeName: string) => {
        const soundTheme = getTheme(themeName).sound;
        player({
            type: "PlatinumSoundLoad",
            file: soundTheme.file,
            disabled: soundTheme.disabled,
        });
    };

    const quitApp = () => {
        desktopEventDispatch({
            type: "PlatinumAppClose",
            app: {
                id: appId,
                title: appName,
                icon: appIcon,
            },
        });
    };

    const appMenu = [
        {
            id: appId + "_file",
            title: "File",
            menuChildren: [
                {
                    id: appId + "_quit",
                    title: "Quit",
                    onClickFunc: quitApp,
                },
            ],
        },
        {
            id: appId + "_help",
            title: "Help",
            menuChildren: [
                {
                    id: appId + "_about",
                    title: "About",
                    onClickFunc: () => {
                        setShowAbout(true);
                    },
                },
            ],
        },
    ];

    const cleanupIcons = () => {
        desktopEventDispatch({
            type: "PlatinumDesktopIconCleanup",
        });
    };

    return (
        <ClassicyApp
            id={appId}
            name={appName}
            icon={appIcon}
            defaultWindow={"AppearanceManager_1"}
            openOnBoot={true}
        >
            <PlatinumWindow
                id={"AppearanceManager_1"}
                title={appName}
                appId={appId}
                icon={appIcon}
                closable={true}
                resizable={false}
                zoomable={false}
                scrollable={false}
                collapsable={false}
                initialSize={[500, 0]}
                initialPosition={[300, 50]}
                modalWindow={true}
                appMenu={appMenu}
            >
                <ClassicyControlLabel label={"The current Theme Package is Platinum"} icon={packageIcon}/>
                <ClassicyPopUpMenu
                    id={"select_theme"}
                    label={"Selected Theme"}
                    options={themesList}
                    onChangeFunc={switchTheme}
                    selected={desktopContext.activeTheme || "default"}
                />
                <ClassicyButton onClick={cleanupIcons}>Cleanup Icons</ClassicyButton>
            </PlatinumWindow>
            {showAbout && (
                <ClassicyAboutWindow appId={appId}
                                     appName={appName}
                                     appIcon={appIcon}
                                     hideFunc={() => {
                                         setShowAbout(false)
                                     }}
                />
            )}
        </ClassicyApp>
    );
};
