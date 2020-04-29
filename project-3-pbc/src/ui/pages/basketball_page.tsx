import React from 'react';
import {Table, Button, DialogTitle, TextField, TableBody, TableHead, TableRow, TableCell, CircularProgress, Dialog, DialogContent, DialogContentText, DialogActions, Typography} from "@material-ui/core";
import ProjectNavbar from "../components/project_navbar";
import BasketballStore from "../../services/basketball_store";
import ListenerComponent from "../components/listener_component";
import BasketballPlayer from '../../model/basketball_player';

interface BasketballPageState {
    shouldDisplayDialog: boolean,
    expandedPlayer?: BasketballPlayer,
    salary?: number,
}

export default class BasketballPage extends ListenerComponent<{}, BasketballPageState>  {
    private salaryCap: string = "";
    constructor (props: {}) {
        super (props);
        this.state = {
            salary: undefined,
            shouldDisplayDialog: false,
            expandedPlayer: undefined,
        };
        this.renderTable = this.renderTable.bind(this);
        this.renderTableBody = this.renderTableBody.bind(this);
        this.onSalaryCapUpdated = this.onSalaryCapUpdated.bind(this);
        this.getDialogContent = this.getDialogContent.bind(this);
        this.getSalary = this.getSalary.bind(this);
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
                    this.salaryCap = "";
                    this.setState({shouldDisplayDialog: false, expandedPlayer: undefined, salary: undefined,});
                }}>
                    {this.getDialogContent()}
                </Dialog>
                {this.renderTable()}
            </React.Fragment>
        );
    }

    renderTable(){
      if (!BasketballStore.instance().isLoaded()) {
          return (
            <div style={{display: 'flex', justifyContent: 'center', margin: '5%'}}>
              <CircularProgress/>
            </div>
          );
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
                    <TableCell>Win Shares</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.renderTableBody()}
            </TableBody>
        </Table>
      );
    }

    renderTableBody() {
        let players: BasketballPlayer[] = BasketballStore.instance().getPlayers()!;
        return (players.map((player) => {
            return (
                <TableRow key={player.player}>
                    <TableCell><Button variant="outlined" color="default" onClick={() => {
                        this.setState({shouldDisplayDialog: true, expandedPlayer: player,})
                    }}>{player.player}</Button></TableCell>
                    <TableCell>{player.tm}</TableCell>
                    <TableCell>{player.pos}</TableCell>
                    <TableCell>{player.tspercent}</TableCell>
                    <TableCell>{player.per}</TableCell>
                    <TableCell>{player.vorp}</TableCell>
                    <TableCell>{player.ws}</TableCell>
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
                <DialogTitle>{player.player}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please input a team's salary cap to display how much he should be getting payed based on his statistics.</DialogContentText>
                    <TextField placeholder='Salary Cap' value={this.salaryCap} onChange={this.onSalaryCapUpdated}>{this.salaryCap}</TextField>
                    <Typography>The player's salary should be: {this.getSalary()}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={() => {
                        var teamBudget: number = parseFloat(this.salaryCap);
                        let mpW: number = teamBudget / 50;
                        this.setState({salary: player.ws * mpW});
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
