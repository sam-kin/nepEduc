import React from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';

import {
    ComputerOutlined,
    MeetingRoomOutlined,
    SchoolOutlined,
    EventOutlined,
    ImportantDevicesOutlined,
    PeopleOutline
} from '@material-ui/icons';

import { blue, orange, blueGrey, deepPurple } from '@material-ui/core/colors';

import { asideStyles } from '../../styles/homepageStyles';


const LeftMenuList = () => {
    const classes = asideStyles();
    return (
        <List className={classes.asideMenu}>
            <ListItem button className={classes.asideMenuItem}>
                <ListItemIcon>
                    <SchoolOutlined style={{ color: blue[500] }} />
                </ListItemIcon>
                <ListItemText primary="Universite" />
            </ListItem>
            <ListItem button className={classes.asideMenuItem}>
                <ListItemIcon>
                    <ComputerOutlined style={{ color: blueGrey[300] }} />
                </ListItemIcon>
                <ListItemText primary="Classes" />
            </ListItem>
            <ListItem button className={classes.asideMenuItem}>
                <ListItemIcon>
                    <MeetingRoomOutlined style={{ color: orange[500] }} />
                </ListItemIcon>
                <ListItemText primary="Clubs" />
            </ListItem>
            <ListItem button className={classes.asideMenuItem}>
                <ListItemIcon>
                    <EventOutlined style={{ color: deepPurple[500] }} />
                </ListItemIcon>
                <ListItemText primary="Evenements" />
            </ListItem>
            <ListItem button className={classes.asideMenuItem}>
                <ListItemIcon>
                    <PeopleOutline style={{ color: blue[500] }} />
                </ListItemIcon>
                <ListItemText primary="Friends" />
            </ListItem>
            <ListItem button className={classes.asideMenuItem}>
                <ListItemIcon>
                    <ImportantDevicesOutlined style={{ color: blue[500] }} />
                </ListItemIcon>
                <ListItemText primary="Bats" />
            </ListItem>
        </List>
    )
};

export default LeftMenuList;