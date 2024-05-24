import { intToHex } from '@/app/SystemFolder/Appearance/ClassicyColors'
import { intToPct, intToPx } from '@/app/SystemFolder/Appearance/ClassicySize'
import themesData from '@/app/SystemFolder/Appearance/styles/themes.json'

const makeThemeStyle = (theme = themesData[0]) => {
    return {
        '--color-black': intToHex(theme.color.black),
        '--color-white': intToHex(theme.color.white),
        '--color-alert': intToHex(theme.color.alert),
        '--color-error': intToHex(theme.color.error),
        '--color-system-01': intToHex(theme.color.system[0]),
        '--color-system-02': intToHex(theme.color.system[1]),
        '--color-system-03': intToHex(theme.color.system[2]),
        '--color-system-04': intToHex(theme.color.system[3]),
        '--color-system-05': intToHex(theme.color.system[4]),
        '--color-system-06': intToHex(theme.color.system[5]),
        '--color-system-07': intToHex(theme.color.system[6]),
        '--color-theme-01': intToHex(theme.color.theme[0]),
        '--color-theme-02': intToHex(theme.color.theme[1]),
        '--color-theme-03': intToHex(theme.color.theme[2]),
        '--color-theme-04': intToHex(theme.color.theme[3]),
        '--color-theme-05': intToHex(theme.color.theme[4]),
        '--color-theme-06': intToHex(theme.color.theme[5]),
        '--color-theme-07': intToHex(theme.color.theme[6]),
        '--window-control-size': intToPx(theme.measurements.window.controlSize),
        '--window-border-size': intToPx(theme.measurements.window.borderSize),
        '--window-padding-size': intToPx(theme.measurements.window.paddingSize),
        '--window-scrollbar-size': intToPx(theme.measurements.window.scrollbarSize),
        '--desktop-icon-size': intToPx(theme.desktop.iconSize),
        '--desktop-icon-font-size': intToPx(theme.desktop.iconFontSize),
        '--header-font': theme.typography.header,
        '--header-font-size': intToPx(theme.typography.headerSize),
        '--body-font': theme.typography.body,
        '--body-font-size': intToPx(theme.typography.bodySize),
        '--ui-font': theme.typography.ui,
        '--ui-font-size': intToPx(theme.typography.uiSize),
        '--color-window-border': intToHex(theme.color.window.border),
        '--color-window-border-outset': intToHex(theme.color.window.borderOutset),
        '--color-window-border-inset': intToHex(theme.color.window.borderInset),
        '--color-window-frame': intToHex(theme.color.window.frame),
        '--color-window-title': intToHex(theme.color.window.title),
        '--color-window-document': intToHex(theme.color.window.document),
        '--color-outline': intToHex(theme.color.outline),
        '--color-select': intToHex(theme.color.select),
        '--color-highlight': intToHex(theme.color.highlight),
        '--desktop-background-image': `url(${process.env.NEXT_PUBLIC_BASE_PATH || ''}${theme.desktop.backgroundImage})`,
        '--desktop-background-color': intToHex(theme.desktop.backgroundColor),
        '--desktop-background-repeat': theme.desktop.backgroundRepeat,
        '--desktop-background-position': theme.desktop.backgroundPosition,
        '--desktop-background-size': intToPct(theme.desktop.backgroundSize),
    }
}

export const getThemeVars = (theme: string) => {
    for (let i = 0; i < themesData.length; i++) {
        if (themesData[i].id === theme) {
            return makeThemeStyle(themesData[i])
        }
    }
    return makeThemeStyle(themesData[0])
}

export const getAllThemes = () => {
    return themesData
}

export const getTheme = (theme: string, overrides?: {}) => {
    let namedThemeData: object = themesData[0]
    for (let i: number = 0; i < themesData.length; i++) {
        if (themesData[i].id === theme) {
            namedThemeData = themesData[i]
        }
    }

    return overrides ? mergeDeep(namedThemeData, overrides) : namedThemeData
}

export const mergeDeep = (target: object, ...sources) => {
    if (!sources.length) {
    const source = sources.shift()

    const isObject = (item) => {
        return item && typeof item === 'object' && !Array.isArray(item)
    }

    for (const key in source) {
        if (isObject(source[key])) {
            if (!target[key]) {
            mergeDeep(target[key], source[key])
        } else {
            Object.assign(target, { [key]: source[key] })
        }
    }

    return mergeDeep(target, ...sources)
}
