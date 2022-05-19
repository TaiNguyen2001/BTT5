import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems } from './listItems';
import Orders from './Orders';
import { AdminsContext, reducer } from '../../context/adminContext';
import { useNavigate } from 'react-router';
import { validate } from '../../validate/validate';
import { useEffect } from 'react';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open)
  }
  const context = React.useContext(AdminsContext)
  const [, dispatch] = React.useReducer(reducer, context)
  const [name, setName] = React.useState('')
  const [date, setDate] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [cardNum, setCardNum] = React.useState('')
  const [saleAmount, setSaleAmount] = React.useState('')
  const [paymentMethod, setPaymentMothod] = React.useState('')
  const navigate = useNavigate()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validate(name, address, date, saleAmount, cardNum, paymentMethod)){
      dispatch({type: "addOrder", 
        payload: {
          name: name,
          date: date, 
          address: address,
          cardNum: cardNum,
          cardType: paymentMethod,
          saleAmount: saleAmount}})
      alert("Successfull!")
    } else {
      alert("Enter again!!!")
      return
    }
  }
  const logOut = () => {
    navigate('/')
    context.admins.forEach(admin => {
      if (admin.isLogIn) {
        admin.isLogIn = !admin.isLogIn
        let option = {
          method: "PATCH",
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify(admin)
        }
        fetch("http://localhost:5000/admins/" + admin.id, option)
        .then((res) => res.json())
      }
    })
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }} onSubmit={handleSubmit} noValidate component='form'>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <Button variant="text" style={{color : "#fff"}}
              onClick={logOut}
            >
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 600,
                  }}
                >
                    <TextField margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      value = {name}
                      onChange = {(e:any) => setName(e.target.value)} />
                    <TextField margin="normal"
                      required
                      fullWidth
                      id="date"
                      label="Date"
                      name="date"
                      autoComplete="date"
                      autoFocus
                      value={date}
                      onChange={(e:any) => setDate(e.target.value)} />
                    <TextField margin="normal"
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      autoComplete="address"
                      autoFocus
                      value={address}
                      onChange={(e:any) => setAddress(e.target.value)} />
                    <TextField margin="normal"
                      required
                      fullWidth
                      id="sale-amount"
                      label="Sale Amount"
                      name="sale-amount"
                      autoComplete="sale-amount"
                      autoFocus
                      value={saleAmount}
                      onChange={(e:any) => setSaleAmount(e.target.value)} />
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">Payment Method</FormLabel>
                      <RadioGroup
                        row
                        name="card-type"
                        id="card-type"
                        value={paymentMethod}
                        onChange={(e:any) => setPaymentMothod(e.target.value)}
                      >
                        <FormControlLabel value="visa" control={<Radio />} label="VISA" />
                        <FormControlLabel value="mc" control={<Radio />} label="MC" />
                        <FormControlLabel value="amec" control={<Radio />} label="AMEC" />
                      </RadioGroup>
                    </FormControl>
                    <TextField margin="normal"
                      required
                      fullWidth
                      id="card-num"
                      label="Card Number"
                      name="card-num"
                      autoComplete="card-num"
                      autoFocus
                      value={cardNum}
                      onChange={(e:any) => setCardNum(e.target.value)} />
                    <Button type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}>
                      Submit
                    </Button>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
