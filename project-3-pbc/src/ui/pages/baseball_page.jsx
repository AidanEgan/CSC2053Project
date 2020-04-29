import React from 'react';
import {Button, Table, TableBody, TableRow, TableCell, CircularProgress, TableHead, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Typography, DialogActions} from "@material-ui/core";
import ProjectNavbar from "../components/project_navbar";
import PitcherStore from "../../services/pitcher_store";
import HitterStore from "../../services/hitter_store";
import ListenerComponent from "../components/listener_component";
import '../../index.css';

export default class BaseballPage extends ListenerComponent  {
    salaryCap = "";
    constructor (props) {
        super (props);
        this.state = {
            hitterSalary: undefined,
            pitcherSalary: undefined,
            shouldDisplayDialog: false,
            expandedPlayer: undefined,
        }
        this.renderTable = this.renderTable.bind(this);
        this.renderTableBody = this.renderTableBody.bind(this);
        this.onSalaryCapUpdated = this.onSalaryCapUpdated.bind(this);
        this.getDialogContent = this.getDialogContent.bind(this);
        this.getPitcherSalary = this.getPitcherSalary.bind(this);
        this.getHitterSalary = this.getHitterSalary.bind(this);
    };

    getEmployedListenerClients () {
        return [HitterStore.getHitterListenerClient(), PitcherStore.getPitcherListenerClient()]
    }

    getPathOnRefresh () {
        return "/baseball";
    }

    renderGuarded () {
        return (
            <React.Fragment>
                <ProjectNavbar/>
                <Dialog open={this.state.shouldDisplayDialog} onClose={() => {
                    this.salaryCap = "";
                    this.setState({shouldDisplayDialog: false, expandedPlayer: undefined, pitcherSalary: undefined, hitterSalary: undefined});
                }}>
                    {this.getDialogContent()}
                </Dialog>
                <Typography className='paddingAround'>Hitters</Typography>
                  {this.renderTable("Hitters")}
                <Typography  className='paddingAround'>Pitchers</Typography>
                  {this.renderTable("Pitchers")}
            </React.Fragment>
        );
    }

    renderTable(playerType){
      if (!HitterStore.instance().isLoaded() || !PitcherStore.instance().isLoaded()) {
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
                    <TableCell>AB</TableCell>
                    <TableCell>H</TableCell>
                    <TableCell>BB</TableCell>
                    <TableCell>TB</TableCell>
                    <TableCell>SB</TableCell>
                    <TableCell>ERP</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.renderTableBody(playerType)}
            </TableBody>
        </Table>
      );
    }

    renderTableBody(playerType){
      let players = ((playerType === "Hitters") ? HitterStore.instance().getPlayers() : PitcherStore.instance().getPlayers());
      return(players.map((player)=>{
          return (
              <TableRow key={player.playerName}>
                  <TableCell><Button variant="outlined" color="default" onClick={() => {
                      this.setState({shouldDisplayDialog: true, expandedPlayer: player})
                    }}>{player.playerName}</Button>
                  </TableCell>
                  <TableCell>{player.atBats}</TableCell>
                  <TableCell>{player.h}</TableCell>
                  <TableCell>{player.walks}</TableCell>
                  <TableCell>{player.tb}</TableCell>
                  <TableCell>{player.sb}</TableCell>
                  <TableCell>{player.erp}</TableCell>
              </TableRow>);
      }));
    }

    getPitcherSalary(){
        if(this.state.pitcherSalary === undefined)
            return("")
        else
            return(this.state.pitcherSalary.toLocaleString())
    }
    getHitterSalary(){
        if(this.state.hitterSalary === undefined)
            return("")
        else
            return(this.state.hitterSalary.toLocaleString())
    }


    getDialogContent () {
        if (this.state.expandedPlayer === undefined) {
            return (
                <CircularProgress></CircularProgress>
            )
        }
        let player = this.state.expandedPlayer;
        return (
            <React.Fragment>
                <DialogTitle>{player.playerName}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please input a team's salary cap to display how much he should be getting payed based on his statistics.</DialogContentText>
                    <TextField placeholder='Salary Cap' value={this.salaryCap} onChange={this.onSalaryCapUpdated}>{this.salaryCap}</TextField>
                    <Typography>The player's salary as a hitter should be: {this.getPitcherSalary()}</Typography>
                    <Typography>The player's salary as a pitcher should be: {this.getHitterSalary()}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={() => {
                        var teamBudget = parseFloat(this.salaryCap) - (parseFloat(this.salaryCap) / 2.196362);
                        let mpRS = teamBudget / 814;
                        this.setState({hitterSalary: player.erp * mpRS});
                        teamBudget = parseFloat(this.salaryCap) / 2.196362;
                        let RA = teamBudget / 654;
                        this.setState({pitcherSalary:(((RA - player.erp) / RA) * teamBudget * (player.atBats / 5543))});}}>
                        Calculate Salary
                    </Button>
                    <Button variant='contained' onClick={() => {
                    this.salaryCap = "";
                    this.setState({shouldDisplayDialog: false, expandedPlayer: undefined, hitterSalary: undefined, pitcherSalary: undefined});
                    }}>
                        Close
                    </Button>
                </DialogActions>
            </React.Fragment>
        );
    }

    onSalaryCapUpdated(event){
        let value = event.target.value;
        this.salaryCap = value;
        this.setState({});
    }

}
