import React from 'react';
import {Table, TableBody, TableHead, TableRow, TableCell, CircularProgress} from "@material-ui/core";
import ProjectNavbar from "../components/project_navbar";
import HockeyStore from "../../services/hockey_store";
import ListenerComponent from "../components/listener_component";


export default class HockeyPage extends ListenerComponent  {
    constructor (props) {
        super (props);
        this.state = {
            shouldDisplayDialog: false,
        }
    }

    getEmployedListenerClients () {
        return [HockeyStore.getListenerClient()]
    }

    getPathOnRefresh () {
        return "/hockey";
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
        if (!HockeyStore.instance().isLoaded()) {
            return (
                <CircularProgress/>
            );
        }
        let players = HockeyStore.instance().getPlayers();
        for (let player of players) {
            return (
                <TableRow>

                </TableRow>
            );
        }

    }




}
