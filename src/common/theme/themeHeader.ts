import {createTheme} from "@mui/material";
import {theme} from "../constants/themeConstants";

export const themeHeader = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    position: "fixed",
                    height: '60px',
                    zIndex: '1',
                    background: theme.$bg_primary,
                }
            }
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    justifyContent: 'space-between'
                }
            }
        },
        MuiTypography:{
            styleOverrides:{
                h1:{
                    fontSize:theme.$font_size_third
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableRipple: true,
            },
            styleOverrides: {
                root: {
                    background: theme.$bg_btn_primary,
                    color: theme.$color_light,
                    transition: 'none',
                    ":hover": {
                        background: theme.$bg_btn_secondary,
                        boxShadow: '0px 1px 4px 0px rgba(34, 60, 80, 0.4)',
                        color: theme.$color_primary,
                    },
                    ":disabled": {
                        background: theme.$bg_btn_secondary,
                        boxShadow: '0px 1px 4px 0px rgba(34, 60, 80, 0.2)',
                        color: theme.$color_dark,
                    },
                    ":active": {
                        background: theme.$bg_btn_secondary,
                        boxShadow: '0px 1px 4px 0px rgba(34, 60, 80, 0.2)',
                    },
                },

            }
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    width: '100%',
                    position: 'absolute',
                    zIndex: '2',
                    marginTop: '56px',
                }
            }
        }

    }
})