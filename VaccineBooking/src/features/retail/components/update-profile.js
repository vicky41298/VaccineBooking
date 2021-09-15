import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { UserDetailForm } from './signup';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../slice';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function UserFormActions(props) {
    const classes = useStyles();
    const { handleSubmit } = props;
    return (
      <>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Submit
        </Button>
      </>
    )
}
export default function UpdateProfile() {
  const classes = useStyles(); 
  const userInfo = useSelector(selectUserInfo); 
  const [formdata, setFormdata] = useState(userInfo);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar className={classes.avatar} src="/eduonix-logo.png"></Avatar>
        <Typography component="h1" variant="h5">
          Edit Details
        </Typography>
        <UserDetailForm formdata={formdata} setFormdata={setFormdata}/>
      </div>
    <UserFormActions/>
    </Container>
  );
}