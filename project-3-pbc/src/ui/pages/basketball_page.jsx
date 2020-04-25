import React from 'react';
import {Table, TableBody, TableHead, TableRow, TableCell, CircularProgress} from "@material-ui/core";
import ProjectNavbar from "../components/project_navbar";
import BasketballStore from "../../services/basketball_store";
import ListenerComponent from "../components/listener_component";


export default class BasketballPage extends ListenerComponent  {
    constructor (props) {
        super (props);
        this.state = {
            shouldDisplayDialog: false, 
        }
    }

    getEmployedListenerClients () {
        return [BasketballStore.getListenerClient()]
    }

    getPathOnRefresh () {
        return "/basketball";
    }

    render () {
        return (
            <React.Fragment>
                <ProjectNavbar/>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderTableBody()}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
    
    renderTableBody () {
        if (!BasketballStore.instance().isLoaded()) {
            return (
                <CircularProgress/>
            );
        }
        let players = BasketballStore.instance().getPlayers(); 
        for (let player of players) {
            return (
                <TableRow>
                    
                </TableRow>
            );
        }
        
    }
   
    


}