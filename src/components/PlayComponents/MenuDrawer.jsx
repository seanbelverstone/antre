import { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { LogoutButton } from '../LogoutButton';
import Button from '../Button';
import { SaveButton } from '../SaveButton';
import antreLogo from '../../assets/images/AntreCrop.png';
import '../css/MenuDrawer.css'
import InventoryModal from '../InventoryModal';

export const MenuDrawer = (props) => {
	const { characterData, supabase } = props;
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    <div>
			<Button onClick={toggleDrawer(true)} text="menu" customClassName="material-symbols-outlined menuButton" id="hamburger" />
			<SwipeableDrawer
				anchor="left"
				open={open}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
			>
				<Box
					sx={{ width: 250 }}
					role="presentation"
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
				>
					<List>
						<ListItem disablePadding>
							<InventoryModal id="inventoryButton" customClassName="menuButton" character={characterData} />
						</ListItem>
						<ListItem disablePadding>
							<SaveButton text="Save Game" id="saveGame" disabled customClassName="menuButton" characterData={characterData} supabase={supabase} />
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListItem disablePadding>
							<LogoutButton type="backToSelect" text="Back to Character Select" customClassName="menuButton" />
						</ListItem>
						<ListItem disablePadding>
							<LogoutButton text="Sign Out" customClassName="menuButton" />
						</ListItem>
					</List>
				</Box>
				<div id="logoContainer">
					<img src={antreLogo} id="menuLogo" />
				</div>
			</SwipeableDrawer>
    </div>
  );
}

export default MenuDrawer;