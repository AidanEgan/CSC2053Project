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
                <Typography className='paddingAround'>Description</Typography>
                <Typography className="paddingSides">
                    How do the spending habits of NBA teams compare to those in the NHL?
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
                <Typography className='paddingAround'>Usage</Typography>
                <Typography className="paddingSides">
                    On each sports page you see in the header, there is a table of players with different
                    stats displayed. One of the stats in these tables is used for the player evaluation as
                    explained in the below descriptions. You can then click on a player and a dialog box
                    will pop up. In this dialog, there is an input box which you can put in your team’s estimated
                    total budget. From this information, the box will give you back the amount of money that your
                    player is worth to a team with that budget.
                </Typography>
                <Typography className='paddingAround'>
                    Calculations: below are explanations of how the estimated player values are calculated
                </Typography>
                <Typography className='paddingAround'>Baseball</Typography>
                <Typography className="paddingSides">
                The evaluative stat used for this calculation was Estimated Runs Produced(ERP). This estimates
                the number of runs that a hitter contributes to their team or that a pitcher gives up to the other team.
                I base my calculations off of estimates for the total number of runs that a team must score or allow in
                order to make the playoffs. I divided the team budget into a pitching budget and a hitting budget based
                on the difference in average salary that a pitcher and a hitter are paid. Then I use those budgets and
                the number of runs the team needs to score or allow to make the playoffs to determine what proportion of
                the runs that player is accounting for and their estimated salary is an equal proportion to the budget.
                If you are interested in learning more in depth details, please see Joshua Mould’s article:
                </Typography>
                <a className='paddingSides' href='https://community.fangraphs.com/what-is-a-run-worth/' target="_blank" rel="noopener noreferrer">What is a Run Worth?</a>
                <Typography className='paddingAround'>Basketball</Typography>
                <Typography className="paddingSides">
                The evaluative stat used for this calculation is Win Shares(WS). This is a stat that estimates the number of
                wins that a player contributes to their team. I used 50 wins as a benchmark because there has not been a 50 win
                team in NBA history to miss the playoffs. Then I calculated an estimated value by using the proportion of win
                shares to 50 that the player produces. I then calculate what the player’s salary should be in proportion to the
                team’s total budget.
                </Typography>
                <Typography className='paddingAround'>Hockey</Typography>
                <Typography className="paddingSides">
                The evaluative stat I used for this is Added Point Shares(aPS). This is a stat I calculated off of the expected Plus
                Minus stat(E+/-). This Expected Plus Minus tells us what the player’s plus minus should have been had there been no
                luck, taking league averages of events that happen on the ice and determining whether or not shots should have gone
                in based on regular circumstances. This is  a good evaluation of the player’s contribution in terms of the difference
                in goals scored and goals against when the player is on the ice. I then determined how many goals were equal to a win
                using the logic of Kyle Gipe in his <a href= 'https://thehockeywriters.com/what-is-an-nhl-win-worth/' target="_blank" rel="noopener noreferrer"> article</a> where he estimated that around 5 goals is equal to a win. I then divided
                the player’s expected plus minus by five to get their added Win Shares(aWS) which says how many wins a player contributed
                to their team. I simply scaled this stat up by a factor of two because a win is worth two points in the NHL to get to added
                Point Shares(aPS) which indicates how many points a player adds to their team. The reason this is ADDED point shares is
                because an Expected plus minus of 0 would result in a winning percentage of .500 using the pythagorean expectation formula
                proposed by Kyle Gipe in his previous article. This would mean that with an expected plus minus of 0 a team would win 41 out
                of 82 games, equivalent to 82 points. I then needed to find out how many points a team needs in order to reach the playoffs which
                I found to be 95 because only two teams in NHL history have missed the playoffs with 95 points. This means that a team would need a
                total of 13 aPS to make the playoffs. I then use how many of these point shares a player accounts for to determine how much they should
                be paid based on the team budget. However, this poses a problem because some players are worth more than 13 point shares, so we must account
                for the other 19 players on the roster. To do this I subtract 19 times the minimum NHL salary from the given budget and calculate based off
                of the resulting number. Disclaimer: The hockey evaluation is not accurate because it is based off of the league average player when it should be
                based off of the value of an NHL replacement player. This will cause any player with a negative Expected +/- to have a negative contract estimate.
                Given more time, the statistics of a replacement player could be extracted and implemented to be accurate.
                </Typography>
            </React.Fragment>
        );
    }
}
