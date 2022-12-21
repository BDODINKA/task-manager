import {createTheme} from "@mui/material";
import {theme} from "common/constants/themeConstants";

export const themeTodoLists = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    margin: '0 auto',
                    minWidth: '90%',
                    height: '100vh',
                    background: theme.$bg_light,
                    paddingTop: '60px',
                    overflowX: 'hidden',
                }
            }
        },
        MuiGrid: {
            styleOverrides: {
                "grid-xs-12": {
                    minHeight: '100px',
                    gridArea: '1/1/2/13',
                    display: 'flex',
                    alignItems: 'center'
                },
                item: {
                    width: '100%',
                },
                container: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(10,1fr)',
                    gridTemplateRows: '0.1fr 1fr',
                    gridColumnGap: '20px',
                    gridRowGap: '10px',
                    overflowX: 'auto'
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
                        border: `2px solid red`
                    },
                    ":focus":{
                        border:'2px solid black'
                    },
                    ":active":{
                        border: `2px solid black`
                    }
                },
                notchedOutline: {
                    border: 'none',
                    color:'green'
                },
            }
        },
        MuiInputLabel:{
            styleOverrides:{
                root:{
                    color:'red',
                    backgroundColor:'white',
                    ":focus":{
                        color:'red',
                    }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                colorPrimary: {
                    color: theme.$bg_btn_primary,
                }
            }
        }
    }
})