import start from './01-Start.png';
import tunnel from './02-Tunnel.png';
import threePaths from './03-Three Paths.png';
import darkPath from './04-Dark Path.png';
import sleepingGoblins from './05-Sleeping Goblins.png';
import mahoganyDoor from './07-Mahogany Door.png';
import goblinMerchant from './08-Goblin Merchant.png';
import time from './09-Time.png';
import wormFight from './10-Worm Fight.png';
import wormEnd from './12-Worm End.png';
import singleDoor from './13-Single Door.png';
import correctRoomB from './13b-Correct Room.png';
import correctRoomBB from './13bb-Correct Room.png';

export const backgroundImages = {
	'01-Start': start,
	'02-Tunnel': tunnel,
	'02c-Dead Adventurer': tunnel, // Needed due to 02-Tunnel being blacklisted
	'02b-Relight Fire': tunnel, // Needed due to 02-Tunnel being blacklisted
	'02a-Locked': tunnel, // Needed due to 02-Tunnel being blacklisted
	'03-Three Paths': threePaths,
	'03-Three Paths Variant': threePaths, // Needed due to 03-Three Paths being blacklisted
	'04-Dark Path': darkPath,
	'05-Sleeping Goblins': sleepingGoblins,
	'07-Mahogany Door': mahoganyDoor,
	'08-Goblin Merchant': goblinMerchant,
	'09-Time': time,
	'10-Worm Fight': wormFight,
	'12-Worm End': wormEnd,
	'13-Single Door': singleDoor,
	'13b-Correct Room': correctRoomB,
	'13bb-Correct Room': correctRoomBB
}

export default backgroundImages;