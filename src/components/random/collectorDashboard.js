import React, { Component } from 'react';
import theme, { pxToVh } from '../utils/theme';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Footer from '../components/Footer';
import { Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { InputBase, TextField, OutlinedInput, Button } from '@material-ui/core';
import { callDummyAPI } from '../services/services';
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: '1vw',
    paddingRight: '1vw',
  },
  textStyle1: {
    color: '#FFFFFFA6',
    fontSize: '2.5vw',
    marginTop: '2vh',
  },
  textStyle2: {
    color: '#FFFFFFA6',
    fontSize: '1.5vw',
  },
  textfield: {
    color: '#FFFFFFA6',
    fontSize: '1.5vw',
  },
  nameInput: {
    fontSize: '1vw',
    color: '#FFFFFF',
  },
  notchedOutline: { borderWidth: '1px', borderColor: '#5DAAE0 !important' },
  searchBtn: {
    marginTop: '8vh',
    minWidth: '5vw',
    minHeight: '2.188vw',
    fontSize: '0.95vw',
    border: 'solid 0.75px #3B617C',
    // marginRight: '0.5rem',
    alignSelf: 'center',
    color: '#5DAAE0',
    '&:hover': {
      backgroundColor: '#5daae0',
      color: 'white',
    },
  },
  searchBtnDisabled: {
    minWidth: '5vw',
    minHeight: '2.188vw',
    fontSize: '0.95vw',
    border: 'solid 0.75px #3B617C',
    // marginRight: '0.5rem',
    alignSelf: 'center',
    color: 'white !important',
    background: '#FFFFFFa5',
    '&:hover': {
      cursor: 'default',
      backgroundColor: '#FFFFFFa5',
    },
  },
});

class CollectorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      response: 0,
      redirect: false,
      loading: false,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleGetStarted = (e) => {
    callDummyAPI(this.state.name).then((response) => {
      // });
      this.setState({
        response: response.data.name,
        redirect: true,
        loading: false,
      });
    });
  };

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={2} xs={12}>
        <Grid
          container
          style={{ height: '95vh' }}
          justify="center"
          alignItems="center"
        >
          <Grid
            item
            style={{
              height: '40vh',
              width: '60vh',
              backgroundColor: '#252C48',
            }}
            alignItems="center"
            direction="column"
            container
          >
            <Typography className={classes.textStyle1}>Hey There !</Typography>
            <Typography className={classes.textStyle2}>
              What's your name?
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              autoid="ship-to-input"
              type="text"
              style={{ marginTop: '4vh' }}
              value={this.state.name}
              onChange={this.handleNameChange}
              InputProps={{
                classes: {
                  input: classes.nameInput,
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />

            <Button
              size="small"
              className={classes.searchBtn}
              classes={{ disabled: classes.searchBtnDisabled }}
              disabled={this.state.name == ''}
              onClick={this.handleGetStarted}
            >
              GET STARTED
            </Button>
          </Grid>
        </Grid>

        {this.state.redirect === true && (
          <Redirect
            to={{
              pathname: '/customer-dashboard',
              state: { name: this.state.response },
            }}
          />
        )}
        <Footer />
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CollectorDashboard);