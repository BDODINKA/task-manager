import {createTheme} from "@mui/material";
import { theme } from "common/constants/themeConstants";

export const themeAuth = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    display: "flex",
                    flexDirection:'column',
                    alignItems: "center",
                    background: theme.$bg_light,
                    paddingTop: '120px'
                }
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 1px 4px 0px rgba(34, 60, 80, 0.2)',
                    padding: '20px',
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    padding: '0',
                }
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    color: 'red',
                    fontSize: theme.$font_size_primary,
                    wordBreak:"break-word",
                    maxWidth:'320px'
                },
            }
        },
        MuiTypography: {
            styleOverrides: {
                h2: {
                    fontSize: theme.$font_size_secondary,
                    color: theme.$color_warning
                },
                h4: {
                    fontSize: theme.$font_size_primary,
                    color: theme.$color_font_primary
                },
                h6: {
                    fontSize: theme.$font_size_primary,
                    color: theme.$color_font_primary,
                    width:'30%',
                    paddingBottom:'10px'
                },
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root:{
                    gap:'5px'
                },
                label: {
                    fontSize: theme.$font_size_secondary,
                    color: theme.$color_font_primary,
                }
            }
        },
        MuiCheckbox: {
            defaultProps: {
                disableRipple: true,
            },
            styleOverrides: {
                root: {
                    border:'none',
                    ":hover":{
                        background:'transparent',
                        boxShadow: '0px 1px 4px 0px rgba(34, 60, 80, 0.2)',
                    },
                },
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: theme.$bg_btn_primary,
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableRipple: true,
            },
            styleOverrides: {
                root: {
                    width:'80%',
                    background: theme.$bg_btn_primary,
                    color: theme.$color_light,
                    transition: 'none',
                    margin:'20px auto',
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

    }
})