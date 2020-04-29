import React from 'react';
import {Table, Button, DialogTitle, TextField, TableBody, TableHead, TableRow, TableCell, CircularProgress, Dialog, DialogContent, DialogContentText, DialogActions} from "@material-ui/core";
import ProjectNavbar from "../components/project_navbar";
import BasketballStore from "../../services/basketball_store";
import ListenerComponent from "../components/listener_component";
import BasketballPlayer from '../../model/basketball_player';

interface BasketballPageState {
    shouldDisplayDialog: boolean,
    expandedPlayer?: BasketballPlayer,
}

export default class BasketballPage extends ListenerComponent<{}, BasketballPageState>  {
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
        return [BasketballStore.getBasketballListenerClient()]
    }

    getPathOnRefresh () {
        return "/basketball";
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
        if (!BasketballStore.instance().isLoaded()) {
            return (
              <div style={{display: 'flex', justifyContent: 'center', margin: '5%'}}>
                <CircularProgress/>
              </div>
            );
        }
        let players: BasketballPlayer[] = BasketballStore.instance().getPlayers()!;
        let playerData = [];
        for (let player of players) {
            playerData.push(
              <TableRow key={player.player}>
                  <TableCell><Button variant="outlined" color="default" onClick={() => {
                      this.setState({shouldDisplayDialog: true, expandedPlayer: player,})
                  }}>{player.player}</Button></TableCell>
                  <TableCell>{player.tm}</TableCell>
                  <TableCell>{player.pos}</TableCell>
                  <TableCell>{player.tspercent}</TableCell>
                  <TableCell>{player.per}</TableCell>
                  <TableCell>{player.vorp}</TableCell>
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
                    <TableCell>Total Shot %</TableCell>
                    <TableCell>Player Efficiency Rating</TableCell>
                    <TableCell>Value over Replacement Player</TableCell>
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
                <DialogTitle>{player.player}</DialogTitle>
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
