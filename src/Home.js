import React, { Component } from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import {
  Button, Checkbox, Grid, Paper, TextField, Typography, IconButton,
} from '@material-ui/core';
import { Delete, Add, Search } from '@material-ui/icons';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 240,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: 16,
    marginTop: 100,
  },
  margin: {
    margin: 10,
  },
  searchbox: {
    minWidth: 200,
    width: '50%',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      title: '',
      search: '',
    };
    this.addItem = this.addItem.bind(this);
    this.toggleDone = this.toggleDone.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
  }

  setSearchTerm() {
    const { title } = this.state;
    this.setState({ search: title });
  }


  setTitle(e) {
    const title = e.target.value;
    this.setState({ title });
  }

  toggleDone({ id }) {
    this.setState(state => ({
      items: [...state.items.map(i => (
        i.id === id ? { ...i, done: !i.done } : i
      ))],
    }));
  }

  addItem(event) {
    event.preventDefault();
    const title = event.target.item.value;
    const id = (new Date()).getTime();
    this.setState(state => ({
      items: [...state.items, {
        id, title, done: false, delted: false,
      }],
      title: '',
      search: '',
    }));
  }

  removeItem({ id }) {
    this.setState(state => ({
      items: [...state.items.filter(i => (i.id !== id))],
    }));
  }

  renderItem(i) {
    const { classes } = this.props;
    return (
      <li key={i.id}>
        <Typography style={{ textDecoration: i.done ? 'line-through' : 'none' }} varient="body1">
          <Checkbox onClick={() => this.toggleDone(i)} checked={i.done} />
          {i.title}

          <IconButton onClick={() => { this.removeItem(i); }} aria-label="Delete" className={classes.margin}>
            <Delete fontSize="small" />
          </IconButton>

        </Typography>
      </li>
    );
  }

  renderItems(done) {
    const { items, search } = this.state;
    let sorted = _.sortBy(items, 'title').filter(x => (x.done === done));
    if (search) {
      sorted = sorted.filter(x => (x.title.search(new RegExp(search, 'i')) !== -1));
    }
    return (
      <ol>
        {sorted.map(i => (this.renderItem(i)))}
      </ol>
    );
  }

  render() {
    const { classes } = this.props;
    const { title, items } = this.state;
    const doneItems = items.filter(x => x.done);
    return (
      <Grid container justify="center" spacing={24}>
        <Grid item md={10}>
          <Paper className={classes.control}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography align="center" variant="h3">
                  To-Do List
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <form onSubmit={this.addItem}>
                  <Grid container spacing={24}>
                    <Grid item xs={12} className={classes.form}>
                      <TextField required name="item" onChange={this.setTitle} value={title} className={classes.searchbox} />
                      <Button type="submit">
                        <Add fontSize="small" />
                        Add
                      </Button>
                      <Button onClick={this.setSearchTerm}>
                        <Search fontSize="small" />
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item xs={12}>
                {items.length === 0 && (
                <Typography align="center" variant="caption">
                      Add some thing to the list.
                </Typography>
                )}
                {this.renderItems(false)}
                {doneItems.length > 0 && (
                  <React.Fragment>
                    <Typography variant="h5">
                      Done
                    </Typography>
                    {this.renderItems(true)}
                  </React.Fragment>)}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
