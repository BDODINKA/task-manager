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
                    height: '100vh',
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
                    flexBasis:'100% !important',
                },
                item: {
                    width: '100%',
                    flexBasis:'45%',
                    '@media (max-width:1024px)': {
                        width: 'auto',
                        display:'flex',
                        flexWrap:'wrap',
                        flexBasis:'45%',
                        justifyContent:'center',
                    },
                    '@media (max-width:767px)': {
                        flexBasis:'100%',
                    },
                },
                container: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat( 10,minmax(300px, 1fr))',
                    gridTemplateRows: '0.1fr 1fr',
                    gridColumnGap: '20px',
                    gridRowGap: '10px',
                    overflowX: 'auto',
                    padding: '0 5px',
                    '@media (max-width:1024px)': {
                        overflowX: 'initial',
                        display:'flex',
                        justifyContent:'center',
                        gridRowGap: '20px',
                        gridColumnGap: '30px',
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
                    width:'290px',
                    height:'min-content',
                    padding: '10px',
                    boxShadow: '0px 1px 4px 0px rgba(34, 60, 80, 0.2)',
                    '@media (max-width:1024px)': {
                        gap:'10px'
                    },
                }

            }
        }
    }
})
