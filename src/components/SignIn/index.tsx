import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import API, {STATUS} from '../../apiConfig';
import { LoginPayload } from '../../types';
import { useAppSelector, useThunkDispatch } from '../../store/hooks';
import { loginUser } from '../../store/actions/user.action';
import { selectRequest } from '../../store/selectors/user.selector';
import { useNavigate } from 'react-router-dom';
import { loadPosts } from '../../store/actions/post.action';
import Home from '../Home';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn(props: {setSelectedComponent?: React.Dispatch<React.SetStateAction<JSX.Element>>}) {
  const dispatch = useThunkDispatch();
  const request = useAppSelector(selectRequest);
  const navigate = useNavigate();
  const {setSelectedComponent} = props;
    
  const [formData, setFormData] = useState<LoginPayload>({
    email: "",
    password: "",
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUser(formData))
    .then(() => {
        if (request.success) {
            if (setSelectedComponent) {
              setSelectedComponent(<Home />);
            }
            navigate("/dashboard");
        } else {
            window.alert(`Error: ${request.message}`);
        }
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleChange}
              value={formData.email}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={handleChange}
              value={formData.password}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}