import React from "react";
import { Grid } from "@material-ui/core";
 

export default class ProjectNavbar extends React.Component {
    constructor (props) {
        super (props);
        this.state ={

        }
    }

    render () {
        return (
            <React.Fragment>
                <Grid container direction="row" justify="space-around" alignItems="center">
                    <Grid item>
                        <a href=''>About</a>
                    </Grid>
                    <Grid item>
                        <a href=''>Basketball Page</a>
                    </Grid>
                    <Grid item>
                        <a href=''>Hockey Page</a>
                    </Grid>
                    <Grid item>
                        <a href=''>Baseball Page</a>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}