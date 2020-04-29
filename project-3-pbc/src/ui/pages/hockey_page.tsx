import React from 'react';
import {Table, Button, DialogTitle, TextField, TableBody, TableHead, TableRow, TableCell, CircularProgress, Dialog, DialogContent, DialogContentText, DialogActions} from "@material-ui/core";
import ProjectNavbar from "../components/project_navbar";
import HockeyStore from "../../services/hockey_store";
import ListenerComponent from "../components/listener_component";
import HockeyPlayer from '../../model/hockey_player';

interface HockeyPageState {
    shouldDisplayDialog: boolean,
    expandedPlayer?: HockeyPlayer,
}

export default class HockeyPage extends ListenerComponent<{}, HockeyPageState>  {
    private salaryCap: string = "";
    constructor (props: {}) {
        super (props);
        this.state = {
            shouldDisplayDialog: false,
            expandedPlayer: undefined,
        };
        this.renderTable = this.renderTable.bind(this);
        this.getDialogContent = this.getDialogContent.bind(this);
    }

    getEmployedListenerClients () {
        return [HockeyStore.getHockeyListenerClient()]
    }

    getPathOnRefresh () {
        return "/hockey";
    }

    renderGuarded () {
        return (
            <React.Fragment>
                <ProjectNavbar/>
                <Dialog open={this.state.shouldDisplayDialog} onClose={() => {
                    this.setState({shouldDisplayDialog: false, expandedPlayer: undefined});
                }}>
                    {this.getDialogContent()}
                </Dialog>
                {this.renderTable()}
            </React.Fragment>
        );
    }

    renderTable() {
        if (!HockeyStore.instance().isLoaded()) {
            return (
                <CircularProgress/>
            );
        }
        let players: HockeyPlayer[] = HockeyStore.instance().getPlayers()!;
        let playerData = [];
        for (let player of players) {
            playerData.push(
              <TableRow key={player.Player}>
                  <TableCell><Button variant="outlined" color="default" onClick={() => {
                      this.setState({shouldDisplayDialog: true, expandedPlayer: player,})
                  }}>{player.Player}</Button></TableCell>
                  <TableCell>{player.Tm}</TableCell>
                  <TableCell>{player.Pos}</TableCell>
                  <TableCell>{player.GP}</TableCell>
                  <TableCell>{player.G}</TableCell>
                  <TableCell>{player.A}</TableCell>
                  <TableCell>{player.PTS}</TableCell>
              </TableRow>
            )
        }
        return(
          <Table>
              <TableHead>
                  <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Team Name</TableCell>
                      <TableCell>Position</TableCell>
                      <TableCell>Games Played</TableCell>
                      <TableCell>Goals</TableCell>
                      <TableCell>Assists</TableCell>
                      <TableCell>Points</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                {playerData}
              </TableBody>
          </Table>
        )

    }

    getDialogContent () {
        if (this.state.expandedPlayer === undefined) {
            return (
                <CircularProgress></CircularProgress>
            )
        }
        let player = this.state.expandedPlayer!;
        return (
            <React.Fragment>
                <DialogTitle>{player.Player}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please input a team's salary cap to display how much he should be getting payed based on his statistics.</DialogContentText>
                    <TextField placeholder='Salary Cap' value={this.salaryCap}></TextField>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={() => {

                    }}>
                        Calculate Salary
                    </Button>
                    <Button variant='contained' onClick={() => {
                    this.setState({shouldDisplayDialog: false, expandedPlayer: undefined});
                    }}>
                        Close
                    </Button>
                </DialogActions>
            </React.Fragment>
        );
    }


}
