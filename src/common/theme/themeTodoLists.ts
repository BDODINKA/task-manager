import {createTheme} from "@mui/material";
import {theme} from "common/constants/themeConstants";

export const themeTodoLists = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    margin: '0 auto',
                    minWidth: '100%',
                    background: theme.$bg_light,
                    padding: '60px 0 0',
                    overflowX: 'hidden',

                },
            }
        },
        MuiGrid: {
            styleOverrides: {
                "grid-xs-12": {
                    minHeight: '100px',
                    gridArea: '1/1/2/13',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '25px',
                    flexBasis: '100% !important',
                    justifyContent: 'flex-start',
                },
                "grid-xs-1": {
                    minWidth: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    wordBreak: 'break-word',
                },
                "grid-xs-2": {
                    minWidth: '100%',
                    display: 'grid',
                    gridTemplateColumns: '0.1fr 1fr 0.1fr',
                    alignItems: 'center',
                    wordBreak: 'break-word',
                },
                item: {
                    width: '100%',
                    flexBasis: '45%',
                    display: 'flex',
                    justifyContent: 'center',
                    wordBreak: 'break-word',
                    '@media (max-width:1024px)': {
                        width: 'auto',
                        flexWrap: 'wrap',
                        flexBasis: '45%',

                    },
                    '@media (max-width:767px)': {
                        flexBasis: '100%',
                    },
                },
                container: {
                    height: '100vh',
                    display: 'grid',
                    alignContent: 'flex-start',
                    gridTemplateColumns: 'repeat( 10,minmax(300px, 1fr))',
                    gridTemplateRows: '0.1fr 1fr',
                    gridColumnGap: '20px',
                    gridRowGap: '10px',
                    overflowX: 'auto',
                    padding: '0 5px',
                    '@media (max-width:1024px)': {
                        overflowX: 'initial',
                        display: 'flex',
                        justifyContent: 'center',
                    },
                },
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    position: 'absolute',
                    bottom: '-25px',
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    border: `2px solid ${theme.$color_primary}`,
                    borderRadius: '2px',
                    ":hover": {
                        border: `2px solid ${theme.$color_primary}`
                    },
                    ":focus": {
                        border: `2px solid ${theme.$color_primary}`
                    },
                    ":active": {
                        border: `2px solid ${theme.$color_primary}`
                    }
                },
                notchedOutline: {
                    border: 'none',
                },
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: `${theme.$color_primary} !important`,
                    backgroundColor: theme.$bg_light,
                },
            }
        },
        MuiIconButton: {
            styleOverrides: {
                colorPrimary: {
                    color: theme.$bg_btn_primary,
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    flexDirection: 'column',
                    width: '290px',
                    height: 'min-content',
                    padding: '10px',
                    gap: '15px',
                    boxShadow: '0px 1px 4px 0px rgba(34, 60, 80, 0.2)',
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                h3: {
                    fontSize: theme.$font_size_secondary,
                    fontWeight: '600',
                    wordBreak: 'break-word',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                },
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
                    '.MuiSvgIcon-root':{
                        color: theme.$bg_btn_primary,
                    }
                },
            }
        },
        MuiButtonGroup: {
            styleOverrides: {
                root: {
                    justifyContent: 'space-between',

                    '.MuiButtonGroup-grouped': {
                        background: theme.$bg_btn_primary,
                        color:theme.$color_light,
                        ":nth-child(1)": {
                            ':hover':{
                                color:theme.$color_dark,
                                background: theme.$bg_btn_secondary,
                                boxShadow: '0px 1px 4px 0px rgba(34, 60, 80, 0.4)',
                            },
                        },
                        ":nth-child(2)": {
                            ':hover':{
                                background: theme.$bg_btn_four,
                                boxShadow: '0px 1px 4px 0px rgba(34, 60, 80, 0.4)',
                            },
                        },
                        ":nth-child(3)": {
                            ':hover':{
                                background: theme.$bg_btn_third,
                                boxShadow: '0px 1px 4px 0px rgba(34, 60, 80, 0.4)',
                            },
                        }
                    }

                }
            }
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    "&.MuiButtonGroup-grouped": {
                        border: '1px solid black !important',
                        borderRadius: '2px !important',
                    }
                }
            }
        }
    }
})
