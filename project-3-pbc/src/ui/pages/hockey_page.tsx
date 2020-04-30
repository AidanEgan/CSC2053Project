import React from 'react';
import {Table, Button, DialogTitle, TextField, TableBody, TableHead, TableRow, TableCell, CircularProgress, Dialog, DialogContent, DialogContentText, DialogActions, Typography} from "@material-ui/core";
import ProjectNavbar from "../components/project_navbar";
import HockeyStore from "../../services/hockey_store";
import ListenerComponent from "../components/listener_component";
import HockeyPlayer from '../../model/hockey_player';

interface HockeyPageState {
    shouldDisplayDialog: boolean,
    expandedPlayer?: HockeyPlayer,
    salary?: number,
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
        this.renderTableBody = this.renderTableBody.bind(this);
        this.onSalaryCapUpdated = this.onSalaryCapUpdated.bind(this);
        this.getDialogContent = this.getDialogContent.bind(this);
        this.getDialogContent = this.getDialogContent.bind(this);
        this.getSalary = this.getSalary.bind(this);
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
                    this.salaryCap = "";
                    this.setState({shouldDisplayDialog: false, expandedPlayer: undefined, salary: undefined,});
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
              <div style={{display: 'flex', justifyContent: 'center', margin: '5%'}}>
                <CircularProgress/>
              </div>
            );
        }
        return(<Table>
              <TableHead>
                  <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Team Name</TableCell>
                      <TableCell>Position</TableCell>
                      <TableCell>Games Played</TableCell>
                      <TableCell>Goals</TableCell>
                      <TableCell>Assists</TableCell>
                      <TableCell>Points</TableCell>
                      <TableCell>Added Point Shares </TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                {this.renderTableBody()}
              </TableBody>
          </Table>
        )

    }

    renderTableBody() {
        let players: HockeyPlayer[] = HockeyStore.instance().getPlayers()!;
        return (players.map((player) => {
            return (
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
                    <TableCell>{player.aPS}</TableCell>
                  </TableRow>
                );
            })
        );
    }

    onSalaryCapUpdated(event: React.ChangeEvent<HTMLInputElement>){
        let value: string = event.target.value;
        this.salaryCap = value;
        this.setState({});
    }

    getSalary () {
        if (this.state.salary === undefined) {
            return "";
        }
        else {
            return this.state.salary!.toLocaleString();
        }
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
                    <TextField placeholder='Salary Cap' value={this.salaryCap} onChange={this.onSalaryCapUpdated}>{this.salaryCap}</TextField>
                    <Typography>The player's salary should be: {this.getSalary()}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={() => {
                      var teamBudget: number = parseFloat(this.salaryCap);
                      let budget: number = teamBudget - 19 * 650000;
                      let moneyPerPoint: number = budget / 13;
                      this.setState({salary: moneyPerPoint * player.aPS});
                    }}>
                        Calculate Salary
                    </Button>
                    <Button variant='contained' onClick={() => {
                      this.salaryCap = "";
                      this.setState({shouldDisplayDialog: false, expandedPlayer: undefined, salary: undefined});
                    }}>
                        Close
                    </Button>
                </DialogActions>
            </React.Fragment>
        );
    }


}
