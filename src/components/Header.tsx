import { AppBar, Toolbar, Typography, } from "@mui/material"

const Header = () => {
    return <AppBar component="header" color='primary' sx={{ marginBottom: '1px' }}>
        <Toolbar>
          <Typography
            // fontFamily="Avant Garde"
            variant='h5'
            sx={{
              letterSpacing: '.3rem',
              color: 'inherit',
              flexGrow: '1'
            }}
          >TODO App</Typography>
        </Toolbar>
      </AppBar>
}

export default Header