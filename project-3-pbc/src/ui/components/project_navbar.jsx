import React from "react";
import { Grid, AppBar, Toolbar, Button } from "@material-ui/core";
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
                          <Link style={{"text-decoration": "none"}} to='/'>
                            <Button variant="contained"> About </Button>
                          </Link>
                        </Grid>

                        <Grid item>
                          <Link style={{"text-decoration": "none"}} to='/basketball'>
                            <Button variant="contained"> Basketball Page </Button>
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link style={{"text-decoration": "none"}} to='/baseball'>
                            <Button variant="contained"> Baseball Page </Button>
                          </Link>
                        </Grid>

                        <Grid item>
                          <Link style={{"text-decoration": "none"}} to='/hockey'>
                            <Button variant="contained"> Hockey Page </Button>
                          </Link>
                        </Grid>

                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}
