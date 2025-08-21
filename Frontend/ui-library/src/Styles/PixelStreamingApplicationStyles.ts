/* Copyright Epic Games, Inc. All Rights Reserved. */

import jss, { Styles } from 'jss';
import global from 'jss-plugin-global';
import camelCase from 'jss-plugin-camel-case';

export interface ColorPalette {
    '--color0': string;
    '--color1': string;
    '--color2': string;
    '--color3': string;
    '--color4': string;
    '--color5': string;
    '--color6': string;
    '--color7': string;
}

export class PixelStreamingApplicationStyle {
    defaultLightModePalette: ColorPalette = {
        '--color0': '#e2e0dd80',
        '--color1': '#FFFFFF',
        '--color2': '#000000',
        '--color3': '#0585fe',
        '--color4': '#35b350',
        '--color5': '#ffab00',
        '--color6': '#e1e2dd',
        '--color7': '#c3c4bf'
    };

    defaultDarkModePalette: ColorPalette = {
        '--color0': '#1d1f22e0',
        '--color1': 'linear-gradient(135deg, #232d4d 0%, #4b286d 100%)',
        '--color2': '#FFFFFF',
        '--color3': '#0585fe',
        '--color4': '#35b350',
        '--color5': '#ffab00',
        '--color6': '#1e1d22',
        '--color7': '#3c3b40'
    };

    defaultStyles = {
        ':root': {
            '--color0': '#1d1f22e0',
            '--color1': '#000000',
            '--color2': '#FFFFFF',
            '--color3': '#0585fe',
            '--color4': '#35b350',
            '--color5': '#ffab00',
            '--color6': '#1e1d22',
            '--color7': '#3c3b40',
            '--color8': '#41008c',
            '--color9': '#3e0070',
            '--color10': '#2e0052',
            '--color11': 'rgba(65,0,139,1)',
            '--controlsDisplay': 'block'
        },
        '.noselect': {
            userSelect: 'none'
        },
        '.bg-black': {
            background: 'black !important'
        },
        '.d-block': {
            display: 'block'
        },
        '.d-none': {
            display: 'none'
        },
        '#playerUI': {
            width: '100%',
            height: '100%',
            position: 'relative'
        },
        '#videoElementParent': {
            width: '100%',
            height: '100%',
            position: 'absolute',
            background: 'var(--color1)'
        },
        '#uiFeatures': {
            width: '100%',
            height: '100%',
            zIndex: '30',
            position: 'relative',
            color: 'var(--color2)',
            pointerEvents: 'none',
            overflow: 'hidden'
        },
        '#guide-panel': {
            backgroundColor: 'var(--color2)',
            padding: '20px',
            width: '50%',
            maxWidth: '550px',
            borderRadius: '5px',
            position: 'absolute',
            top: '50%',
            right: '35px',
            transform: 'translateY(-50%)',
            zIndex: '40',
            color: 'var(--color0)',
            pointerEvents: 'all'
        },
        '#guide-panel-title': {
            fontSize: '19px',
            marginBottom: '12px',
            color: 'black'
        },
        '#guide-panel-subtitle': {
            color: '#999999',
            fontSize: '14px'
        },
        '#guide-panel-movement, #guide-panel-mouse': {
            margin: '30px 0 10px',
            fontSize: '14px',
            color: 'black'
        },
        '#guide-panel-footer': {
            textAlign: 'center',
            color: '#999999',
            padding: '20px 0 0'
        },
        '#guide-panel-move-forward, #guide-panel-move-around, #guide-panel-move-up-down': {
            display: 'flex',
            gap: '1.2rem',
            alignItems: 'center',
            margin: '15px 0'
        },
        '.key-icon': {
            color: 'black',
            border: '1px solid var(--color7)',
            borderRadius: '5px',
            width: '30px',
            height: '30px',
            textAlign: 'center',
            lineHeight: '30px'
        },
        '.key-text': {
            fontSize: '14px',
            color: 'var(--color0)'
        },
        '#guide-panel-moving-keys, #guide-panel-move-up-down-icons': {
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center'
        },
        '.UiTool .tooltiptext': {
            visibility: 'hidden',
            width: 'auto',
            color: 'var(--color2)',
            textAlign: 'center',
            borderRadius: '15px',
            padding: '0px 10px',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.75rem',
            letterSpacing: '0.75px',
            position: 'absolute',
            top: '0',
            transform: 'translateY(25%)',
            left: '125%',
            zIndex: '20'
        },
        '.UiTool:hover .tooltiptext': {
            visibility: 'visible',
            backgroundColor: 'var(--color7)'
        },
        '#connection .tooltiptext': {
            top: '125%',
            transform: 'translateX(-25%)',
            left: '0',
            zIndex: '20',
            padding: '5px 10px'
        },
        '#videoQuality': {
            position: 'absolute',
            top: '3%',
            right: '3%',
            pointerEvents: 'all',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: 'var(--color0)',
            fontSize: '0.75rem'
        },
        '#rdesignWrapper': {
            position: 'absolute',
            bottom: '3%',
            left: '3%',
            pointerEvents: 'all',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        '#rdesignCenter': {
            position: 'relative'
        },
        '.rdesignCenterButton': {
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: 'var(--color0)',
            cursor: 'pointer',
            color: '#b0b0b0'
        },
        '#rdesignCenterMenu': {
            position: 'absolute',
            bottom: '100%',
            left: '0',
            backgroundColor: 'var(--color0)',
            borderRadius: '8px',
            marginBottom: '5px',
            width: '210px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            fontFamily: 'inherit',
            overflow: 'hidden',
            zIndex: 10
        },
        '.menuSection': {
            padding: '0',
            margin: '0 0 10px 0',
            background: 'none',
            boxShadow: 'none'
        },
        '.menuHeader': {
            fontSize: '0.85rem',
            fontWeight: 'bold',
            padding: '12px 16px',
            borderBottom: '1px solid var(--color7)',
            background: 'none',
            color: '#ffffff'
        },
        '.menuBtn': {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: '10px 16px',
            background: 'none',
            border: 'none',
            outline: 'none',
            color: '#b0b0b0',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'background 0.15s',
            borderRadius: '0'
        },
        '.menuBtn:hover': {
            background: '#000000'
        },
        '.connectionInfoList': {
            listStyle: 'none',
            margin: '0',
            padding: '10px 16px',
            color: '#b0b0b0',
            fontSize: '13px'
        },
        '.connectionInfoList li': {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '4px'
        },
        '.connectionInfoList li span': {
            color: '#b0b0b0',
            fontWeight: '500',
            marginRight: '10px'
        },
        '.stopStreamingBtn': {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: 'calc(100% - 32px)',
            margin: '12px 16px',
            padding: '10px 0',
            background: '#B71C1C',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '13px',
            cursor: 'pointer',
            justifyContent: 'center',
            transition: 'background 0.15s'
        },
        '.stopStreamingBtn:hover': {
            background: '#D32F2F'
        },
        '#connection': {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: 'var(--color0)'
        },
        '#connectionStrength': {
            height: '20px',
            width: '20px'
        },
        '#qualityText': {
            fontSize: '0.75rem'
        },
        '#settings-panel .tooltiptext': {
            display: 'block',
            top: '125%',
            transform: 'translateX(-50%)',
            left: '0',
            zIndex: '20',
            padding: '5px 10px',
            border: '3px solid var(--color3)',
            width: 'max-content',
            fallbacks: [
                {
                    width: 'max-content'
                },
                {
                    border: '3px solid var(--color3)'
                },
                {
                    padding: '5px 10px'
                },
                {
                    zIndex: '20'
                },
                {
                    left: '0'
                },
                {
                    transform: 'translateX(-50%)'
                },
                {
                    top: '125%'
                },
                {
                    display: 'block'
                }
            ]
        },
        '#controls': {
            position: 'absolute',
            top: '3%',
            left: '2%',
            fontFamily: "'Michroma', sans-serif",
            pointerEvents: 'all',
            display: 'var(--controlsDisplay)'
        },
        '#controls>*': {
            marginBottom: '0.5rem',
            borderRadius: '50%',
            display: 'block',
            height: '2rem',
            lineHeight: '1.75rem',
            padding: '0.5rem'
        },
        '#controls #additionalinfo': {
            textAlign: 'center',
            fontFamily: "'Montserrat', sans-serif"
        },
        '#fullscreen-btn': {
            padding: '0.6rem !important'
        },
        '#minimizeIcon': {
            display: 'none'
        },
        '#settingsBtn, #statsBtn': {
            cursor: 'pointer'
        },
        '#uiFeatures button': {
            backgroundColor: 'var(--color7)',
            border: '1px solid var(--color7)',
            color: 'var(--color2)',
            position: 'relative',
            width: '3rem',
            height: '3rem',
            padding: '0.5rem',
            textAlign: 'center'
        },
        '#uiFeatures button:hover': {
            backgroundColor: 'var(--color3)',
            border: '3px solid var(--color3)',
            transition: '0.25s ease',
            paddingLeft: '0.55rem',
            paddingTop: '0.55rem'
        },
        '#uiFeatures button:active': {
            border: '3px solid var(--color3)',
            backgroundColor: 'var(--color7)',
            paddingLeft: '0.55rem',
            paddingTop: '0.55rem'
        },
        '.btn-flat': {
            backgroundColor: 'transparent',
            color: 'var(--color2)',
            fontFamily: "'Montserrat'",
            fontWeight: 'bold',
            border: '3px solid var(--color3)',
            borderRadius: '1rem',
            fontSize: '0.75rem',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            cursor: 'pointer',
            textAlign: 'center'
        },
        '.btn-flat:hover': {
            backgroundColor: 'var(--color3)',
            transition: 'ease 0.3s'
        },
        '.btn-flat:disabled': {
            background: 'var(--color7)',
            borderColor: 'var(--color3)',
            color: 'var(--color3)',
            cursor: 'default'
        },
        '.btn-flat:active': {
            backgroundColor: 'transparent'
        },
        '.btn-flat:focus': {
            outline: 'none'
        },
        '#uiFeatures img': {
            width: '100%',
            height: '100%'
        },
        '.panel-wrap': {
            position: 'absolute',
            top: '0',
            bottom: '0',
            right: '0',
            height: '100%',
            minWidth: '20vw',
            maxWidth: '90vw',
            transform: 'translateX(100%)',
            transition: '.3s ease-out',
            pointerEvents: 'all',
            overflowY: 'auto',
            overflowX: 'hidden',
            backgroundColor: 'var(--color0)'
        },
        '.panel-wrap-visible': {
            transform: 'translateX(0%)'
        },
        '.panel': {
            overflowY: 'auto',
            padding: '1em'
        },
        '#settingsHeading, #statsHeading': {
            display: 'inline-block',
            fontSize: '2em',
            marginBlockStart: '0.67em',
            marginBlockEnd: '0.67em',
            marginInlineStart: '0px',
            marginInlineEnd: '0px',
            position: 'relative',
            padding: '0 0 0 2rem'
        },
        '#settingsClose, #statsClose': {
            margin: '0.5rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            paddingRight: '0.5rem',
            fontSize: '2em',
            float: 'right'
        },
        '#settingsClose:after, #statsClose:after': {
            paddingLeft: '0.5rem',
            display: 'inline-block',
            content: '"\\00d7"'
        },
        '#settingsClose:hover, #statsClose:hover': {
            color: 'var(--color3)',
            transition: 'ease 0.3s'
        },
        '#settingsContent, #statsContent': {
            marginLeft: '2rem',
            marginRight: '2rem'
        },
        '#stopBtn': {
            borderRadius: '50%',
            backgroundColor: '#B71C1C !important'
        },
        '#stopBtn:hover': {
            padding: '0 !important',
            border: '0 !important'
        },
        '.setting': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '0.15rem 10px 0.15rem 10px'
        },
        '.settings-text': {
            color: 'var(--color2)',
            verticalAlign: 'middle',
            fontWeight: 'normal'
        },
        '.settings-option': {
            width: '100%',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },
        '#connectOverlay, #playOverlay, #infoOverlay, #errorOverlay, #afkOverlay, #disconnectOverlay, #loadingOverlay':
            {
                zIndex: '30',
                position: 'absolute',
                color: 'var(--color2)',
                fontSize: '1.8em',
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--color1)',
                alignItems: 'center',
                justifyContent: 'center'
            },
        '#loadingOverlay': {
            display: 'flex',
            flexDirection: 'column'
        },
        '@keyframes spin': {
            to: {
                transform: 'rotate(360deg)'
            }
        },
        '.loadingIcon': {
            animation: 'spin 1s linear infinite',
            borderLeft: '3px solid var(--color7)',
            borderRight: '3px solid var(--color7)',
            borderBottom: '3px solid var(--color7)',
            borderTop: '3px solid var(--color2)',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            marginBottom: '20px'
        },
        '.loadingText': {
            marginBottom: '10px'
        },
        '.clickableState': {
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            cursor: 'pointer'
        },
        '.textDisplayState': {
            display: 'flex'
        },
        '.hiddenState': {
            display: 'none !important'
        },
        '#playButton, #connectButton': {
            display: 'inline-block',
            height: 'auto',
            zIndex: '30'
        },
        'img#playButton': {
            maxWidth: '241px',
            width: '10%'
        },
        '#uiInteraction': {
            position: 'fixed'
        },
        '#UIInteractionButtonBoundary': {
            padding: '2px'
        },
        '#UIInteractionButton': {
            cursor: 'pointer'
        },
        '.btn-overlay': {
            verticalAlign: 'middle',
            display: 'inline-block'
        },
        '.tgl-switch': {
            verticalAlign: 'middle',
            display: 'inline-block'
        },
        '.tgl-switch .tgl': {
            display: 'none'
        },
        '.tgl, .tgl:after, .tgl:before, .tgl *, .tgl *:after, .tgl *:before, .tgl+.tgl-slider': {
            '-webkit-box-sizing': 'border-box',
            boxSizing: 'border-box'
        },
        '.tgl::-moz-selection, .tgl:after::-moz-selection, .tgl:before::-moz-selection, .tgl *::-moz-selection, .tgl *:after::-moz-selection, .tgl *:before::-moz-selection, .tgl+.tgl-slider::-moz-selection':
            {
                background: 'none'
            },
        '.tgl::selection, .tgl:after::selection, .tgl:before::selection, .tgl *::selection, .tgl *:after::selection, .tgl *:before::selection, .tgl+.tgl-slider::selection':
            {
                background: 'none'
            },
        '.tgl-slider': {},
        '.tgl+.tgl-slider': {
            outline: '0',
            display: 'block',
            width: '40px',
            height: '18px',
            position: 'relative',
            cursor: 'pointer',
            userSelect: 'none'
        },
        '.tgl+.tgl-slider:after, .tgl+.tgl-slider:before': {
            position: 'relative',
            display: 'block',
            content: '""',
            width: '50%',
            height: '100%'
        },
        '.tgl+.tgl-slider:after': {
            left: '0'
        },
        '.tgl+.tgl-slider:before': {
            display: 'none'
        },
        '.tgl-flat+.tgl-slider': {
            padding: '2px',
            '-webkit-transition': 'all .2s ease',
            transition: 'all .2s ease',
            background: 'var(--color6)',
            border: '3px solid var(--color7)',
            borderRadius: '2em'
        },
        '.tgl-flat+.tgl-slider:after': {
            '-webkit-transition': 'all .2s ease',
            transition: 'all .2s ease',
            background: 'var(--color7)',
            content: '""',
            borderRadius: '1em'
        },
        '.tgl-flat:checked+.tgl-slider': {
            border: '3px solid var(--color3)'
        },
        '.tgl-flat:checked+.tgl-slider:after': {
            left: '50%',
            background: 'var(--color3)'
        },
        '.btn-apply': {
            display: 'block !important',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '40%'
        },
        '.form-control': {
            backgroundColor: 'var(--color7)',
            border: '2px solid var(--color7)',
            borderRadius: '4px',
            color: 'var(--color2)',
            textAlign: 'right',
            fontFamily: 'inherit'
        },
        '.form-control:hover': {
            borderColor: 'var(--color7)'
        },
        '.form-group': {
            paddingTop: '4px',
            display: 'grid',
            gridTemplateColumns: '80% 20%',
            rowGap: '4px',
            paddingRight: '10px',
            paddingLeft: '10px'
        },
        '.form-group label': {
            verticalAlign: 'middle',
            fontWeight: 'normal'
        },
        '.settingsContainer': {
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px solid var(--color7)',
            paddingTop: '10px',
            paddingBottom: '10px'
        },
        '.settingsContainer> :first-child': {
            marginTop: '4px',
            marginBottom: '4px',
            fontWeight: 'bold',
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline'
        },
        '.collapse': {
            paddingLeft: '5%'
        },
        '#streamTools': {
            borderBottomRightRadius: '5px',
            borderBottomLeftRadius: '5px',
            userSelect: 'none',
            position: 'absolute',
            top: '0',
            right: '2%',
            zIndex: '100',
            border: '4px solid var(--colour8)',
            borderTopWidth: '0px'
        },
        '.settingsHeader': {
            fontStyle: 'italic'
        },
        '#streamToolsHeader': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--colour8)',
            backgroundColor: 'var(--color7)'
        },
        '.streamTools': {
            backgroundColor: 'var(--color2)',
            fontFamily: 'var(--buttonFont)',
            fontWeight: 'lighter',
            color: 'var(--color7)'
        },
        '.streamTools-shown>#streamToolsSettings, .streamTools-shown>#streamToolsStats': {
            display: 'block'
        },
        '#streamToolsToggle': {
            width: '100%'
        },
        '#qualityStatus': {
            fontSize: '37px',
            paddingRight: '4px'
        },
        '.svgIcon': {
            fill: 'var(--color2)'
        },
        '.modal': {
            minWidth: '100vw',
            minHeight: '100vh',
            left: '0',
            top: '0',
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'var(--color2)'
        },
        '.innerModal': {
            position: 'relative',
            width: '500px',
            height: '300px',
            backgroundColor: 'var(--color0)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '0.75em'
        },
        '.modalBtnContainer': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            paddingTop: '1em',
            paddingBottom: '1em'
        },
        '.modalTextArea': {
            textAlign: 'left',
            width: '95%',
            height: '100%',
            resize: 'none',
            fontSize: '1rem',
            border: '1px solid var(--color2)'
        },
        '.modalTextArea:focus-visible': {
            outline: 'none !important',
            border: '1px solid var(--color3)'
        },
        '.modal .btn-flat': {
            fontSize: '1.0rem'
        }
    };

    customStyles?: Partial<Styles>;
    lightModePalette: ColorPalette;
    darkModePalette: ColorPalette;

    constructor(options?: {
        customStyles?: Partial<Styles>;
        lightModePalette?: ColorPalette;
        darkModePalette?: ColorPalette;
        jssInsertionPoint?: string | HTMLElement;
    }) {
        const { customStyles, lightModePalette, darkModePalette, jssInsertionPoint } = options ?? {};
        // One time setup with default plugins and settings.
        const jssOptions = {
            // JSS has many interesting plugins we may wish to turn on
            //plugins: [functions(), template(), global(), extend(), nested(), compose(), camelCase(), defaultUnit(options.defaultUnit), expand(), vendorPrefixer(), propsSort()]
            plugins: [global(), camelCase()],
            insertionPoint: jssInsertionPoint
        };

        jss.setup(jssOptions);

        this.customStyles = customStyles;
        this.lightModePalette = lightModePalette ?? this.defaultLightModePalette;
        this.darkModePalette = darkModePalette ?? this.defaultDarkModePalette;
    }

    applyStyleSheet() {
        // Todo: refactor codebase to use jss at a component level, classes can be grabbed like so:
        //const {pixelStreamingClasses} = jss.createStyleSheet(styles).attach();

        // attach generated style sheet to page
        jss.createStyleSheet({
            '@global': {
                ...this.defaultStyles,
                ...this.customStyles
            }
        }).attach();
    }

    applyPalette(palette: ColorPalette) {
        const rootElement = document.querySelector(':root') as HTMLElement;
        rootElement.style.setProperty('--color0', palette['--color0']);
        rootElement.style.setProperty('--color1', palette['--color1']);
        rootElement.style.setProperty('--color2', palette['--color2']);
        rootElement.style.setProperty('--color3', palette['--color3']);
        rootElement.style.setProperty('--color4', palette['--color4']);
        rootElement.style.setProperty('--color5', palette['--color5']);
        rootElement.style.setProperty('--color6', palette['--color6']);
        rootElement.style.setProperty('--color7', palette['--color7']);
    }

    /**
     * Update the players color variables
     * @param isLightMode - should we use a light or dark color scheme
     */
    setColorMode(isLightMode: boolean) {
        if (isLightMode) {
            this.applyPalette(this.lightModePalette);
        } else {
            this.applyPalette(this.darkModePalette);
        }
    }

    setHideControls(isHidden: boolean) {
        const rootElement = document.querySelector(':root') as HTMLElement;
        rootElement.style.setProperty('--controlsDisplay', isHidden ? 'none' : 'block');
    }
}
