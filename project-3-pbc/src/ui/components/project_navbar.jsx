import React from "react";
import { Grid, AppBar, Toolbar } from "@material-ui/core";
import {Link} from "react-router-dom";
 

export default class ProjectNavbar extends React.Component {
    constructor (props) {
        super (props);
        this.state ={

        }
    }

    render () {
        return (
            <AppBar position='static' color='secondary'>
                <Toolbar>
                    <Grid container direction="row" justify="space-around" alignItems="center">
                        <Grid item>
                            <Link to='/'>About</Link>
                        </Grid>
                        <Grid item>
                            <Link to='/basketball'>Basketball Page</Link>
                        </Grid>
                        <Grid item>
                            <Link to='/baseball'>Baseball Page</Link>
                        </Grid>
                        <Grid item>
                            <Link to='/hockey'>Hockey Page</Link>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}