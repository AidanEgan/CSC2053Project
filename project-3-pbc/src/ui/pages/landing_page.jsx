import React from "react";
import ProjectNavbar from "../components/project_navbar";
import {Typography} from "@material-ui/core";
import '../../index.css';

export default class LandingPage extends React.Component {
    constructor (props) {
        super(props);
        this.state={

        };
    }

    render () {
        return (
            <React.Fragment>
                <ProjectNavbar/>
                <Typography className='paddingAround'>
                    How do the spending habits of NBA teams compare to those in the NFL? 
                    The MLB? The salary caps in these leagues are absolutely immense; throwing
                    around hundreds of millions of dollars for one player is not uncommon in 
                    these massive leagues. Although we can see the massive dollar amounts being 
                    flaunted around the league, it is harder to see whether or not the teams are 
                    using this money efficiently. For this reason, we’d like to look at how teams 
                    spend their money; specifically, we’d like to investigate how much money these 
                    teams spend per game, per season, per minute of play, and other efficiency 
                    standards that can help determine whether or not a team is spending their money
                    intelligently. We will display this information on a website with a different 
                    page for each league. Using Material and React will allow us to beautify the site, 
                    while using Google Firestore will let us get some real experience reading from a 
                    database, manipulating the data’s formatting to our advantage, and then displaying 
                    that information in meaningful ways. R will be used for data manipulation and for 
                    all the statistical work involved.
                </Typography>
            </React.Fragment>
        );
    }
}