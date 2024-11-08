import { AppBar, Toolbar, Typography, } from "@mui/material"

const Header = () => {
    return <AppBar color='primary' sx={{ marginBottom: '1px' }}>
        <Toolbar>
          <Typography
            variant='h6'
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