// {{weapon}} allows you to dynamically insert values here

const storylines = {
	'01-Start': {
		name: '01-Start',
		text: "You wake up, cold and alone. \n How long have you been in this cave? How did you get here? \n\nQuestions flood your mind as you pick yourself up off the stone floor, but answers are nowhere to be found. A {{weapon}} lies next to you. Not knowing what may lay ahead, you pick it up. \n\nYou are in a dark, dank cave and the only light is a single torch on the west wall. There is a path to the north and a path to the south. Both seem eerily quiet.",
		modifier: {},
		options: [
			{
				label: "Go North",
				target: "02-Tunnel"
			},
			{
				label: "Cry",
				target: "01a-Cry"
			},
			{
				label: "Do nothing",
				target: "01b-Goblins"
			},
			{
				label: "Inspect Torch",
				target: "01c-Torch"
			}
		]
	},
	'02-Tunnel': {
		name: '02-Tunnel',
		text: "Deciding to leave the cave behind you and find some answers to why you're here, you head north. Ahead of you is a short tunnel, that leads to a door that is slightly ajar. Opening it, you are faced with a small room. \n\nTo your left is a closed door and to your right is the remains of both a fire and a poor adventurer that lies decomposing beside it. There is also a path that continues north.",
		modifier: {},
		options: [
			{
				label: "Open door",
				target: "02a-Locked"
			},
			{
				label: "Continue North",
				target: "03-Three Paths"
			},
			{
				label: "Relight fire",
				target: "02b-Relight Fire"
			},
			{
				label: "Inspect the adventurer",
				target: "02c-Dead Adventurer"
			}
		]
	},
	'01a-Cry': {
	  name: '01a-Cry',
		text: "Tears run down your cheeks, and you fall to your knees. Whatever has placed you here in this cave must surely be a creature of malevolence. You think about the life that you left behind, although your memory of it is rapidly fading. \n\nAfter your many tears have dried and you once again get to your feet, you find that you have accepted whatever fate may lay before you. Be it monsters or traps, you will fight until the very end. Your epiphany makes you feel much wiser and imbues you with confidence.",
		modifier: { wisdom: 1 },
		options: [
			{
				label: "Go North",
				target: "02-Tunnel"
			},
			{
				label: "Do nothing",
				target: "01b-Goblins"
			},
			{
				label: "Inspect Torch",
				target: "01c-Torch"
			}
		]
	},
	'01b-Goblins': {
	  name: '01b-Goblins',
		text: "You decide to remain right where you are, and resign into a state of bewildered depression. After all, you didn't ask to be here. \n\nBefore you can start to brood over the circumstances that led to your arrival, you hear some voices up ahead. \n\nIt sounds like goblins!",
		modifier: {},
		options: [
			{
				label: "Flee",
				target: "01ba-Goblin Flee"
			},
			{
				label: "Hide",
				target: "01bb-Goblin Hide"
			},
			{
				label: "Bargain",
				target: "01bc-Bargain"
			},
			{
				label: "Fight",
				target: "01bd-Goblin Battle"
			}
		]
	},
	'01c-Torch': {
	  name: '01c-Torch',
		text: "You approach the torch and take a closer look. You notice that this sconce is no typical one, as it can be removed from the wall. Additionally it appears to have some kind of flint and steel type of switch, which will reignite it if its flame goes out. Amazing! You extinguish the torch and add it to your inventory. \n\nTurning away from the wall, you consider your remaining choices.",
		modifier: { torch: true },
		options: [
			{
				label: "Go North",
				target: "02-Tunnel"
			},
			{
				label: "Cry",
				target: "01a-Cry"
			},
			{
				label: "Do nothing",
				target: "01b-Goblins"
			}
		]
	},
	'01ba-Goblin Flee': {
	  name: '01ba-Goblin Flee',
		text: `Terrified of what goblins might do if they see you, you attempt to run away.
		\n\nSprinting to the back of the cave, you are only met with a cold, hard wall. You grope around in the darkness for some kind of opening, some escape from this hellhole.
		\n\n"Well, what do we have here then?" a voice cackles behind you. You spin around to see your foe, but an ugly looking goblin quickly dashes forward and manages to slash your leg, before springing back. You have no choice but to face this creature in battle.`,
		modifier: { health: -20 },
		options: [
			{
				label: "Fight",
				target: "01bd-Goblin Alternate Battle"
			}
		]
	},
	'01bb-Goblin Hide': {
	  name: '01bb-Goblin Hide',
		text: "Realizing your only option may be to hide, you frantically search the room for a suitable hiding place, coming upon a boulder that might just be big enough to conceal you from your approaching doom. \n\nWiping sweat from your brow, you hide and wait. The voices have stopped. Maybe they've turned around and gone the other way? After a few moments, your curiosity gets the better of you and you shuffle around to peer over the boulder. \n\nThere is a flash of steel, and you realize that one of the goblins was waiting for you. He manages to cut your arm deeply before you fall backwards. Feeling noticibly weaker, you scramble to stand and face your foe.",
		modifier: { health: -30, strength: -1 },
		options: [
			{
				label: "Fight",
				target: "01bd-Goblin Alternate Battle"
			}
		]
	},
	'01bc-Bargain': {
	  name: '01bc-Bargain',
		text: "Holding the rusty sword loosely in your hand, you stand your ground as the goblins approach. As they enter the doorway, the stop in their tracks. \n\n\"Cor, look at this one. He looks ready for battle!\" \n\nKnowing that all goblins love a good deal, you hold up your hands and explain that you'd rather offer them your sword. \n\n\"That thing doesn't look like it's worth the dirt under my nails\", the goblin sneers. \"Tell ya what. We'll take your sword, in exchange for your life. Sound good? Good.\" \n\nAnd with that, the goblins snatch up your weapon and disappear from the way they came. Damn. That weapon could have been useful. At least you're still breathing.",
		modifier: { weapon: "fists" },
		options: [
			{
				label: "Return to the task at hand",
				target: "01-Start Bargain Variant"
			}
		]
	},
	'01-Start Bargain Variant': {
	  name: '01-Start Bargain Variant',
		text: "After the goblins leave, you reevaluate your choices. You are still in the dark, dank cave and the only light is a single torch on the west wall. \n\nThere is a path to the north and a path to the south. Both still seem eerily quiet.",
		modifier: {},
		options: [
			{
				label: "Go North",
				target: "02-Tunnel"
			},
			{
				label: "Cry",
				target: "01a-Cry"
			},
			{
				label: "Inspect Torch",
				target: "01c-Torch"
			}
		]
	},
	'01bd-Goblin Battle': {
	  name: '01bd-Goblin Battle',
		text: "You shift to a battle stance as two goblins enter the cave. They stop in their tracks. \n\n\"This one looks feisty!\", the uglier one cackles. The goblin murmurs something to its partner, who runs off down the tunnel from which they entered. \n\n\"Don't worry sunshine, I'll deal with you myself.\" The goblin unsheathes a sharp looking dagger, and steps forward to attack.",
		modifier: { fight: true },
		enemy: {
			name: "GOBLIN",
			stats: {
				health: 40,
				strength: 2,
				defense: 2,
				wisdom: 1,
				luck: 1,
			},
			weapon: "dagger"
		},
		victory: {
				target: "01bda-Goblin Victory"
		}
	},
	'01bd-Goblin Alternate Battle': {
	  name: '01bd-Goblin Alternate Battle',
		text: "Despite your blood pooling beneath you, you shift to a battle stance. This creature will pay for catching you unaware.",
		modifier: { fight: true },
		enemy: {
			name: "GOBLIN",
			stats: {
				health: 40,
				strength: 2,
				defense: 2,
				wisdom: 1,
				luck: 1,
			},
			weapon: "dagger"
		},
		victory: {
			target: "01bda-Goblin Victory"
		}
	},
	'01bda-Goblin Victory': {
	  name: '01bda-Goblin Victory',
		text: "You strike the goblin down, and its lifeless body hits the floor with a thump. \n\nYou quickly rifle through its belongings, and find a few gold pieces. You also decide to take the weapon it was holding.",
		modifier: {
			weapon: "dagger",
			gold: 3
		},
		options: [
			{
				label: "Return to the task at hand",
				target: "01-Start Victory Variant"
			}
		]
	},
	'01-Start Victory Variant': {
	  name: '01-Start Victory Variant',
		text: "Giving the dead goblin one last kick to make sure he's dead, and decide to move on. \n\nYou are still in the dark, dank cave and the only light is a single torch on the west wall. There is a path to the north and a path to the south. Both still seem eerily quiet. \n\nThe other goblin that ran away is nowhere to be seen.",
		modifier: {},
		options: [
			{
				label: "Go North",
				target: "02-Tunnel"
			},
			{
				label: "Cry",
				target: "01a-Cry"
			},
			{
				label: "Inspect Torch",
				target: "01c-Torch"
			}
		]
	},
	'02a-Locked': {
	  name: '02a-Locked',
		text: "Walking towards the door on your left, you try the handle. \n\nIt's locked. Looking around for a key, you manage to spot one just poking out from beneath the door. You pick it up, wipe some dust off it, and place it in the keyhole.",
		modifier: {},
		options: [
			{
				label: "Open door",
				target: "02aa-Open Door"
			},
			{
				label: "Leave the door alone",
				target: "02ab-Leave Door"
			}
		]
	},
	'02ab-Leave Door': {
	  name: '02ab-Leave Door',
		text: "Deciding that whatever is inside that door should probably stay there, you step back.\n\n The key rattles in the lock, and clatters to the ground. A fleshless, bony finger retreats from the keyhole and is replaced by a blue flame that watches you intently. A cold chill washes over you as you turn around from the door and you think that you probably made the correct choice. Shuddering, you decide to move on.",
		modifier: {},
		options: [
			{
				label: "Continue North",
				target: "03-Three Paths"
			},
			{
				label: "Relight fire",
				target: "02b-Relight Fire"
			},
			{
				label: "Inspect the adventurer",
				target: "02c-Dead Adventurer"
			}
		]
	},
	'02aa-Open Door': {
	  name: '02aa-Open Door',
		text: "Shrugging to no-one in particular, you turn the key in the lock. The door swings open wide, and inside you discover a small chamber. \n\nThe walls are mostly made from shaped stone, and there's a broken chair in one corner. In an opposite corner, stands a fleshless skeleton, facing away from you. Upon hearing the door creak open, it turns around. \n\nIts hollow eyes shine blue, its mouth hangs open, and it charges at you with its axe held high.",
		modifier: { fight: true },
		enemy: {
			name: "SKELETON",
			stats: {
				health: 40,
				strength: 1,
				defense: 2,
				wisdom: 1,
				luck: 1,
			},
			weapon: "iron axe"
		},
		victory: {
				target: "02aaa-Skeleton Victory"
		}
	},
	'02aaa-Skeleton Victory': {
	  name: '02aaa-Skeleton Victory',
		text: "Upon your last attack, the skeleton falls apart and its bones clatter to the ground. Noticing that the skeleton had a superior weapon, you pick up the axe that it was wielding and leave the room behind you.",
		modifier: {
			weapon: "Iron Axe",
			wisdom: 1
		},
		options: [
			{
				label: "Return to the room",
				target: "02-Tunnel Victory Variant"
			}
		]
	},
	'02-Tunnel Victory Variant': {
	  name: '02-Tunnel Victory Variant',
		text: "Closing the door behind you, you return to the small room. The remains of the fire and the adventurer that lies decomposing beside it are now in front of you. There is also a path to your left that continues north.",
		modifier: {},
		options: [
			{
				label: "Continue North",
				target: "03-Three Paths"
			},
			{
				label: "Relight fire",
				target: "02b-Relight Fire"
			},
			{
				label: "Inspect the adventurer",
				target: "02c-Dead Adventurer"
			}
		]
	},
	'03-Three Paths': {
	  name: '03-Three Paths',
		text: "Leaving the small room behind, you follow the path to the north. \n\nAfter a short walk, your path meets a crossroads. The road is split in three ways: The path to the west is dark, the one to the east smells like ash, and the path ahead to the north is a single door.",
		modifier: {},
		options: [
			{
				label: "Go Back",
				target: "02-Tunnel Return Variant"
			},
			{
				label: "Go West - Dark",
				target: "04-Dark Path"
			},
			{
				label: "Go North - Door",
				target: "13-Single Door"
			},
			{
				label: "Go East - Ash",
				target: "14-Ash Path"
			}
		]
	},
	'02b-Relight Fire': {
	  name: '02b-Relight Fire',
		text: "You bend down to relight the fire with your torch. It is illuminated now, and you sit beside the dead adventurer to rest awhile. \n\nYou end up talking out some of your problems with him, and feel better for it.",
		modifier: { health: 10 },
		options: [
			{
				label: "Return to the task at hand",
				target: "02-Tunnel Fire Variant"
			}
		]
	},
	'02c-Dead Adventurer': {
	  name: '02c-Dead Adventurer',
		text: "Deciding to see if the adventurer had any good items, you rifle through his belongings. He doesn't seem to have much and his food has long since rotten away, but you do find a couple health potions and add them to your inventory.",
			modifier: { healthPotions: 2 },
			options: [
				{
					label: "Return to the task at hand",
					target: "02-Tunnel Adventurer Variant"
				}
			]
	},
	'02-Tunnel Fire Variant': {
	  name: '02-Tunnel Fire Variant',
		text: "Feeling somewhat refreshed, you return to your decision.",
		modifier: {},
		options: [
			{
				label: "Open door",
				target: "02a-Locked"
			},
			{
				label: "Continue North",
				target: "03-Three Paths"
			},
			{
				label: "Inspect the adventurer",
				target: "02c-Dead Adventurer"
			}
		]
	},
	'02-Tunnel Adventurer Variant': {
	  name: '02-Tunnel Adventurer Variant',
		text: "You stand up from the adventurer, leaving them looking slightly more disheveled than before. The same options remain.",
		modifier: {},
		options: [
			{
				label: "Open door",
				target: "02a-Locked"
			},
			{
				label: "Continue North",
				target: "03-Three Paths"
			},
			{
				label: "Relight fire",
				target: "02b-Relight Fire"
			}
		]
	},
	'02-Tunnel Return Variant': {
	  name: '02-Tunnel Return Variant',
		text: "Feeling indecisive, you return to the small room with the dead adventurer.",
		modifier: {},
		options: [
			{
				label: "Open door",
				target: "02a-Locked"
			},
			{
				label: "Continue North",
				target: "03-Three Paths"
			},
			{
				label: "Relight fire",
				target: "02b-Relight Fire"
			},
			{
				label: "Inspect the adventurer",
				target: "02c-Dead Adventurer"
			}
		]
	},
	'04-Dark Path': {
	  name: '04-Dark Path',
		text: "You opt for the darker path to the West. It's hard to see exactly how far it stretches, all there is before you is inky blackness. There is a faint light at the end, which looks like it could be light from around a corner.",
		modifier: {},
		options: [
			{
				label: "Search Inventory For Torch",
				target: "04c-Torch Check"
			},
			{
				label: "Go Back",
				target: "03-Three Paths Variant"
			}
		]
	},
	'04c-Torch Check': {
	  name: '04c-Torch Check',
		text: "Searching through inventory...",
		modifier: { torchCheck: true }
	},
	'03-Three Paths Variant': {
	  name: '03-Three Paths Variant',
		text: "Thinking that maybe this path isn't the right choice, you return to the previous paths that faced you. The same choices remain.",
		modifier: {},
		options: [
			{
				label: "Go Back",
				target: "02-Tunnel Return Variant"
			},
			{
				label: "Go West - Dark",
				target: "04-Dark Path"
			},
			{
				label: "Go North - Door",
				target: "13-Single Door"
			},
			{
				label: "Go East - Ash",
				target: "14-Ash Path"
			}
		]
	},
	'04a-Torch Used': {
	  name: '04a-Torch Used',
		text: "Igniting the torch you grabbed earlier and raising it above your head, you see that this path looks similar to the one you'd followed previously. The only difference is that some of the cobbled stone floor is raised in parts. \n\nFrom a short distance, you lightly press a toe against one raised stone and a flurry of arrows shoot out of the wall beside you, narrowly missing your nose. Recognizing a trap when you see one and blessing your good fortune for taking the torch, you step through the corridor being careful to avoid the raised stones. \n\nYou make it through the traps unscathed, but unfortunately your torch uses all of its fuel and sputters out of life.",
		modifier: { torch: false },
		options: [
			{
				label: "Continue",
				target: "05-Sleeping Goblins"
			}
		]
	},
	'04b-No Torch': {
	  name: '04b-No Torch',
		text: "You rummage fruitlessly through your bag in search for a light source. Wishing you'd grabbed a torch earlier, you decide to enter the pitch black corridor anyway. Your foot steps on something and you hear a soft click, followed by a whoosh. \n\nYou scream in pain as an arrow embeds itself in your calf. You yank the arrow out and consider whether you should continue going down this path. \n\nWho knows how many more traps there are?",
		modifier: { health: -10 },
		options: [
			{
				label: "Continue",
				target: "04ba-Continue"
			},
			{
				label: "Go Back",
				target: "03-Three Paths Dark Variant"
			}
		]
	},
	'03-Three Paths Dark Variant': {
	  name: '03-Three Paths Dark Variant',
		text: "Leaving the dark way and part of your pride behind you, you return to the crossroads. \n\nThe road is split in three ways: The path to the west behind you is dark, the one to the east smells like ash, and the path ahead to the north is a single door. Or you could return to the small room before.",
		modifier: {},
		options: [
			{
				label: "Small Room",
				target: "02-Tunnel Return Variant"
			},
			{
				label: "Go West",
				target: "04-Dark Path"
			},
			{
				label: "Go North",
				target: "13-Single Door"
			},
			{
				label: "Go East",
				target: "14-Ash Path"
			}
		]
	},
	'04ba-Continue': {
	  name: '04ba-Continue',
		text: "By either incredible courage or plain stupidity, you decide to continue down the dark, trap-ridden path.",
		modifier: {},
		options: [
			{
				label: "Check Your Luck",
				target: "04baa-Check Luck"
			}
		]
	},
	'04baa-Check Luck': {
	  name: '04baa-Check Luck',
		text: "Checking luck...",
		modifier: { luckCheck: true, event: 1 }
	},
	'04bab-Death': {
	  name: '04bab-Death',
		text: "You somehow manage to hit each and every one of the traps. You bleed out before reaching the end.",
		modifier: { death: true }
	},
	'04bac-Bad Luck': {
	  name: '04bac-Bad Luck',
		text: "Either you're cursed or the luckiest bastard that ever existed. \n\nDuring your time stumbling in the dark, you managed to activate nearly every single trap that was in the corridor, yet miraculously you are still breathing. Exhausted and in pain, you can't help but be somewhat thankful the traps are behind you.",
		modifier: { health: -20 },
		options: [
			{
				label: "Continue",
				target: "05-Sleeping Goblins"
			}
		]
	},
	'04bad-Best Luck': {
	  name: '04bad-Best Luck',
		text: "You are insanely blessed, as you get through the trap filled corridor, in the dark, without setting off a single trap. \n\nYour confidence increases and you step forward.",
		modifier: { strength: 1 },
		options: [
			{
				label: "Continue",
				target: "05-Sleeping Goblins"
			}
		]
	},
	'05-Sleeping Goblins': {
	  name: '05-Sleeping Goblins',
		text: "Reaching the end of the trap-filled hallway, you reach the corner where the light was emanating from. \n\nSlowly easing your head around the corner to see the source from the light, you see a couple of goblins sleeping by the remains of a fire. The fire looks like it has only been out for a short while. \n\nThe only noise you can hear is a quiet snuffling, although you're unsure to where it's coming from.",
		modifier: {},
		options: [
			{
				label: "Approach Goblins",
				target: "05a-Approach Goblins"
			},
			{
				label: "Attack Goblins",
				target: "05a-Attack Goblins"
			},
			{
				label: "Call Out",
				target: "05b-Call Out"
			},
			{
				label: "Throw a rock",
				target: "05c-Throw Rock"
			}
		]
	},
	'05a-Approach Goblins': {
	  name: '05a-Approach Goblins',
		text: "As you begin moving towards the goblins, the snuffling noise stops. \n\nYour hand clenches and you move closer to the goblins. As you get closer, you discover that they aren't sleeping, well, not anymore. Their entire front sides that were obscured from your view during your approach, have been completely devoured by... something. \n\nThe snuffling resumes, now directly behind you.",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "05baa-Lizard Fight"
			}
		]
	}, 
	'05a-Attack Goblins': {
	  name: '05a-Attack Goblins',
		text: "As you begin moving towards the goblins, the snuffling noise stops. \n\nYour hand clenches and you move closer to the goblins. As you get closer, you discover that they aren't sleeping, well, not anymore. Their entire front sides that were obscured from your view during your approach, have been completely devoured by... something. \n\nThe snuffling resumes, now directly behind you.",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "05baa-Lizard Fight"
			}
		]
	}, 
	'05b-Call Out': {
	  name: '05b-Call Out',
		text: "You call out to the goblins, hoping that maybe they'll not immediately resort to violence, and perhaps you could come to some kind of agreement. As soon as you call out, there's a loud screech and a thud from directly in front of you.",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "05ba-Lizard Continue"
			}
		]
	},
	'05c-Throw Rock': {
	  name: '05c-Throw Rock',
		text: "Finding a rock by your feet, you cast it towards the goblins. \n\nIt's a good throw, and it cracks one of them in the back of the head. The rock loudly clatters to the ground. Either these goblins are heavy sleepers, or more likely, they've been dead for a while. No-one could sleep off a hit like tha- \n\nYou're broken off mid-thought as you hear a loud screech, followed by a thud.",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "05ba-Lizard Continue"
			}
		]
	},
	'05ba-Lizard Continue': {
	  name: '05ba-Lizard Continue',
		text: "A giant cave lizard leaps into view, attracted by all the noise you created. Illuminated by the remains of the fire, you can see its monstrous claws and sharp fangs which must have easily torn apart those poor goblins. You also notice that this particular lizard seems to be blind, its milky-white eyes frantically moving from side to side, searching restlessly for the source of the noise. \n\nIts loud sniffing resumes, in an attempt to track your scent.",
		modifier: {},
		options: [
			{
				label: "Attack Lizard",
				target: "05baa-Lizard Fight"
			},
			{
				label: "Keep Hiding",
				target: "09bab-Check Luck"
			}
		]
	},
	'05baa-Lizard Fight': {
	  name: '05baa-Lizard Fight',
		text: "Wheeling around, you see a giant cave lizard now blocking the way you came in. \n\nIts big claws and sharp fangs are menacing enough, although its milky-white eyes let you know that this creature has been down here for so long that it has been rendered blind. It looks like it now relies on smell and sound to find its prey, which explains the snuffling sound. These goblins never knew what was coming. \n\nSmelling your tasty skin, it lunges to attack you.",
		modifier: { fight: true },
		enemy: {
			name: "BLIND_LIZARD",
			stats: {
				health: 90,
				strength: 4,
				defense: 2,
				wisdom: 1,
				luck: 2,
			},
			weapon: "teeth"
		},
		victory: {
			target: "06-Lizard Victory"
		}
	},
	'09bab-Check Luck': {
	  name: '09bab-Check Luck',
		text: "Checking luck...",
		modifier: {
			luckCheck: true,
			event: 6
		}
	},
	'05bad-Lizard Success': {
		name: '05bad-Lizard Success',
		text: 'You deftly slide your body behind a corner to hide from the blind creature. As its snuffling gets closer, you hold your breath and try to stay as still as possible.\n\nAfter what feels like an eternity, the lizard eventually loses interest and wanders away, presumably into its den. While you wait for the sound of its heavy footsteps to fade, you consider your options.',
		options: [
			{
				label: "Relight fire",
				target: "06a-Relight Fire"
			},
			{
				label: "Continue down corridor",
				target: "06b-Corridor"
			},
			{
				label: "Long Room Search",
				target: "06c-Long Search"
			},
			{
				label: "Quick room search",
				target: "06d-Quick Search"
			}
		]
	},
	'06-Lizard Victory': {
	  name: '06-Lizard Victory',
		text: "Blood oozes from the giant lizard's wounds, and it slumps over dead. \n\nThe light in this room is rapidly going out due to the fire's close proximity during your fight, however the corridor adjacent to you is relatively well lit.",
		modifier: {},
		options: [
			{
				label: "Relight fire",
				target: "06a-Relight Fire"
			},
			{
				label: "Continue down corridor",
				target: "06b-Corridor"
			},
			{
				label: "Long Room Search",
				target: "06c-Long Search"
			},
			{
				label: "Quick room search",
				target: "06d-Quick Search"
			}
		]
	},
	'06a-Relight Fire': {
		name: '06a-Relight Fire',
		text: 'Crouching down by the fire, you look for something to relight it. You notice that the goblins were using flint and steel, so you snatch them up. Something in the back of your mind gives you caution, and you consider this for a moment.',
		modifier: {},
		options: [
			{
				label: 'Check Wisdom',
				target: '06ab-Check Wisdom'
			}
		]
	},
		'06ab-Check Wisdom': {
	  name: '06ab-Check Wisdom',
		text: "Checking wisdom...",
		modifier: {
			luckCheck: true,
			event: 7
		}
	},
	'06ac-Another Lizard Fight': {
	  name: '06ca-Another Lizard Fight',
		text: "Ignoring the little voice protesting in your head, you strike the flint and steel to relight the fire. Unsurprisingly, this attracts another lizard which pounces in front of you. Sighing and wishing you'd made a wiser decision, you stand ready to attack your foe.",
		modifier: { fight: true },
		enemy: {
			name: "BLIND_LIZARD",
			stats: {
				health: 90,
				strength: 4,
				defense: 2,
				wisdom: 1,
				luck: 2,
			},
			weapon: "teeth"
		},
		victory: {
			target: "06ca-Second Lizard Victory"
		}
	},
	'06ad-Fire Wisdom Success': {
	  name: '06ad-Fire Wisdom Success',
		text: "Realizing that striking the flint and steel together would probably only attract more of those blind lizards, you carefully put them back where you found them and reconsider your options.",
		modifier: {},
		options: [
			{
				label: "Continue down corridor",
				target: "06b-Corridor"
			},
			{
				label: "Long Room Search",
				target: "06c-Long Search"
			},
			{
				label: "Quick room search",
				target: "06d-Quick Search"
			}
		]
	},
	'06b-Corridor': {
	  name: '06b-Corridor',
		text: "You continue to walk down the well lit corridor, hoping that any more of those vile lizards will be dissuaded by what remains of the light. You press on.",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "07-Mahogany Door"
			}
		]
	},
	'06c-Long Search': {
	  name: '06c-Long Search',
		text: "Although the light is fading fast, you decide to take your time looting the room. \n\nYou uncover a number of great items, however, before long you hear another screech, followed by a thump. \n\nOh great. Another lizard has arrived.",
		modifier: {
			weapon: "Steel shortsword",
			chest: "Leather armor",
			feet: "Iron boots",
			defense: 4,
			gold: 20
		},
		options: [
			{
				label: "Attack",
				target: "06ca-Second Lizard Fight"
			}
		]
	},
	'06ca-Second Lizard Fight': {
	  name: '06ca-Second Lizard Fight',
		text: "Gritting your teeth and wishing you'd left sooner, you ready to attack your new foe.",
		modifier: { fight: true },
		enemy: {
			name: "BLIND_LIZARD",
			stats: {
				health: 90,
				strength: 4,
				defense: 2,
				wisdom: 1,
				luck: 2,
			},
			weapon: "teeth"
		},
		victory: {
				target: "06ca-Second Lizard Victory"
		}
	},
	'06d-Quick Search': {
	  name: '06d-Quick Search',
		text: "You do a quick scour of the room and manage to find a few gold pieces, and oddly, a pair of boots that fit you perfectly. \n\nMaking sure not to stay for too long in the room, you dart out and continue down the well lit hallway.",
		modifier: {
			feet: "Iron boots",
			defense: 2,
			gold: 3
		},
		options: [
			{
				label: "Continue",
				target: "06b-Corridor"
			}
		]
	},
	'06ca-Second Lizard Victory': {
	  name: '06ca-Second Lizard Victory',
		text: "Gasping for air, you strike another lizard down. Keen not to fight another one, you quickly gather your loot and continue down the well lit hallway.",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "07-Mahogany Door"
			}
		]
	},
	'07-Mahogany Door': {
	  name: '07-Mahogany Door',
		text: "After journeying down the corridor for some time, you reach a door. It's a heavy mahogany door, much taller than you are and it has a variety of engravings all over it. The door handle is shaped like a bony green fist. \n\nYou can almost hear a distant rumble, that is gradually getting louder.",
		modifier: {},
		options: [
			{
				label: "Knock",
				target: "07a-Knock"
			},
			{
				label: "Open Door",
				target: "08-Goblin Merchant"
			}
		]
	},
	'07a-Knock': {
	  name: '07a-Knock',
		text: "Knocking gently on the door, eyes still fixed on the peculiar shaped door handle, you wait for a response. \n\nNone comes. \n\nPerhaps you knocked too quietly? You knock harder this time, and hear a muffled voice inside. \"Grah you idiot, come in! Didn't you hear me the first time?\" yells a voice, quite impatiently.",
		modifier: {},
		options: [
			{
				label: "Open Door",
				target: "08-Goblin Merchant"
			}
		]
	},
	'08-Goblin Merchant': {
	  name: '08-Goblin Merchant',
		text: "Turning the door handle and swinging the door open wide, you are greeted by a room that is dimly lit, filled with an assortment of weapons, half-filled flasks, among other oddities. As you peer around the room, your eyes land on a green-skinned goblin, sitting at the far end of the room behind a shrouded table. Its arms are extended out beckoning you inside. \n\n\"Quickly now, quick, we don't have much time,\" the goblin exclaims. \"Are you gonna buy something or not?\" \n\nThe rumbling grows steadily louder.",
		modifier: {},
		options: [
			{
				label: "Obsidian Axes - 11 Gold",
				value: 11,
				target: "08a-Axes"
			},
			{
				label: "Plate Gauntlets - 6 Gold",
				value: 6,
				target: "08b-Gauntlets"
			},
			{
				label: "Black Iron Helmet - 20 Gold",
				value: 20,
				target: "08c-Helmet"
			},
			{
				label: "Nothing",
				target: "08d-Nothing"
		}
		]
	},
	'08a-Axes': {
	  name: '08a-Axes',
		text: "\"Anything else? We're running out of time!\" \n\nThe rumbling gets ever louder.",
		modifier: {
			weapon: "Obsidian Axes",
			gold: -11
		},
		options: [
			{
				label: "Plate Gauntlets - 6 Gold",
				value: 6,
				target: "08aa-Axe and Gauntlets"
			},
			{
				label: "Black Iron Helmet - 20 Gold",
				value: 20,
				target: "08ab-Axe and Helmet"
			},
			{
				label: "Health Potion - 2 Gold",
				value: 2,
				target: "08ac-Axe and HP"
			},
			{
				label: "Nothing",
				target: "08d-Continue"
			}
		]
	},
	'08b-Gauntlets': {
	  name: '08b-Gauntlets',
		text: "\"Anything else? We're running out of time!\" \n\nThe rumbling gets ever louder.",
		modifier: {
			hands: "Plate Gauntlets",
			defense: 2,
			gold: -6,
		},
		options: [
			{
				label: "Obsidian Axes - 11 Gold",
				value: 11,
				target: "08ba-Gauntlets and Axe"
			},
			{
				label: "Black Iron Helmet - 20 Gold",
				value: 20,
				target: "08bb-Gauntlets and Helmet"
			},
			{
				label: "Health Potion - 2 Gold",
				value: 2,
				target: "08bc-Gauntlets and HP"
			},
			{
				label: "Nothing",
				target: "08d-Nothing"
			}
		]
	},
	'08c-Helmet': {
	  name: '08c-Helmet',
		text: "\"Anything else? We're running out of time!\" \n\nThe rumbling gets ever louder.",
		modifier: {
			head: "Black Iron Helmet",
			defense: 4,
			strength: 4,
			gold: -20
		},
		options: [
			{
				label: "Obsidian Axes - 11 Gold",
				value: 11,
				target: "08ba-Helmet and Gauntlets"
			},
			{
				label: "Plate Gauntlets - 6 Gold",
				value: 6,
				target: "08aa-Helmet and Axe"
			},
			{
				label: "Health Potion - 2 Gold",
				value: 2,
				target: "08bc-Helmet and HP"
			},
			{
				label: "Nothing",
				target: "08d-Nothing"
			}
		]
	},
	'08aa-Axe and Gauntlets': {
	  name: '08aa-Axe and Gauntlets',
		text: "\"Hurry!!\" \n\nThe rumbling gets ever louder.",
		modifier: {
			hands: "Plate Gauntlets",
			defense: 2,
			gold: -6
		},
		options: [
			{
				label: "Black Iron Helmet - 20 Gold",
				value: 20,
				target: "09-Time"
			},
			{
				label: "Health Potion - 2 Gold",
				value: 2,
				target: "09-Time"
			},
			{
				label: "Nothing",
				target: "08d-Nothing"
			}
		]
	},
	'08ab-Axe and Helmet': {
	  name: '08ab-Axe and Helmet',
		text: "\"Hurry!!\" \n\nThe rumbling gets ever louder.",
		modifier: {
			head: "Black Iron Helmet",
			defense: 4,
			strength: 4,
			gold: -20
		},
		options: [
			{
				label: "Plate Gauntlets - 6 Gold",
				value: 6,
				target: "09-Time"
			},
			{
				label: "Health Potion - 2 Gold",
				value: 2,
				target: "09-Time"
			},
			{
				label: "Nothing",
				target: "08d-Nothing"
			}
		]
	},
	'08ac-Axe and HP': {
	  name: '08ac-Axe and HP',
		text: "\"Hurry!!\" \n\nThe rumbling gets ever louder.",
		modifier: {
			healthPotions: 1,
			gold: -2
		},
		options: [
			{
				label: "Plate Gauntlets - 6 Gold",
				value: 6,
				target: "09-Time"
			},
			{
				label: "Black Iron Helmet - 20 Gold",
				value: 20,
				target: "09-Time"
			},
			{
				label: "Nothing",
				target: "08d-Nothing"
			}
		]
	},
	'08ba-Gauntlets and Axe': {
	  name: '08ba-Gauntlets and Axe',
		text: "\"Hurry!!\" \n\nThe rumbling gets ever louder.",
		modifier: {
			weapon: "Obsidian Axes",
			gold: -11
		},
		options: [
			{
				label: "Black Iron Helmet - 20 Gold",
				value: 20,
				target: "09-Time"
			},
			{
				label: "Health Potion - 2 Gold",
				value: 2,
				target: "09-Time"
			},
			{
				label: "Nothing",
				target: "08d-Nothing"
			}
		]
	},
	'08bb-Gauntlets and Helmet': {
	  name: '08bb-Gauntlets and Helmet',
		text: "\"Hurry!!\" \n\nThe rumbling gets ever louder.",
		modifier: {
			head: "Black Iron Helmet",
			defense: 4,
			strength: 4,
			gold: -20
		},
		options: [
			{
				label: "Obsidian Axes - 11 Gold",
				value: 11,
				target: "09-Time"
			},
			{
				label: "Health Potion - 2 Gold",
				value: 2,
				target: "09-Time"
			},
			{
				label: "Nothing",
				target: "08d-Nothing"
			}
		]
	},
	'08bc-Greaves and HP': {
	  name: '08bc-Greaves and HP',
		text: "\"Hurry!!\" \n\nThe rumbling gets ever louder.",
		modifier: {
			healthPotions: 1,
			gold: -2
		},
		options: [
			{
				label: "Obsidian Axes - 11 Gold",
				value: 11,
				target: "09-Time"
			},
			{
				label: "Black Iron Helmet - 20 Gold",
				value: 20,
				target: "09-Time"
			},
			{
				label: "Nothing",
				target: "08d-Nothing"
			}
		]
	},
	'08ba-Helmet and Greaves': {
	  name: '08ba-Helmet and Greaves',
		text: "\"Hurry!!\" \n\nThe rumbling gets ever louder.",
		modifier: {
			hands: "Plate Greaves",
			defense: 2,
			gold: -6
		},
		options: [
			{
				label: "Obsidian Axes - 11 Gold",
				value: 11,
				target: "09-Time"
			},
			{
				label: "Health Potion - 2 Gold",
				value: 2,
				target: "09-Time"
			},
			{
				label: "Nothing",
				target: "08d-Nothing"
		 }
		]
	},
	'08aa-Helmet and Axe': {
	  name: '08aa-Helmet and Axe',
		text: "\"Hurry!!\" \n\nThe rumbling gets ever louder.",
		modifier: {
			weapon: "Obsidian Axes",
			gold: -11
		},
		options: [
			{
				label: "Plate Greaves - 6 Gold",
				value: 6,
				target: "09-Time"
			},
			{
				label: "Health Potion - 2 Gold",
				value: 2,
				target: "09-Time"
			},
			{
				label: "Nothing",
				target: "08d-Nothing"
		 }
		]
	},
	'08bc-Helmet and HP': {
	  name: '08bc-Helmet and HP',
		text: "\"Hurry!!\" \n\nThe rumbling gets ever louder.",
		modifier: {
			healthPotions: 1,
			gold: -2
		},
		options: [
			{
				label: "Obsidian Axes - 11 Gold",
				value: 11,
				target: "09-Time"
			},
			{
				label: "Plate Greaves - 6 Gold",
				value: 6,
				target: "09-Time"
			},
			{
				label: "Nothing",
				target: "08d-Nothing"
		 }
		]
	},
	'08d-Nothing': {
	  name: '08d-Nothing',
		text: "\"Phew, I thought you'd never make it!\" the goblin said exasperatedly. The rumbling is now almost deafening, and you reflexively put your hands over your ears to salvage whatever's left of your eardrums. \n\nThe goblin cups its mouth to yell something at you, but you can't hear anything but the rumbling. The goblin shrugs, clicks its fingers and disappears in a puff of orange smoke. \n\nThe entire room is now shaking and glass vials and old tomes cascade to the ground.",
		modifier: {},
		options: [
			{
				label: "Leave",
				target: "09-Time"
			}
		]
	},
	'09-Time': {
	  name: '09-Time',
		text: "Suddenly, the entire room gets torn away from its foundations. \n\nYou are thrown to the left wall, and pinned there momentarily as you realise that the room is now moving at an incredibly fast pace. The wall opposite you starts to break apart, unable to remain intact due to this unnatural force being exerted upon it, and as the bricks break apart, and narrowly miss your face -- you see it. \n\nYou are inside the mouth of a colossal worm. You see its ring of massive jagged teeth biting down on the walls and ceiling of the room you're in, and as it burrows through the ground at an incredible rate you realize that it's both picked you up on its journey underground, and it's now very pissed off. By looking at the size of its mouth, you judge that the worm must be at least 400 feet long, and you wonder how you could be this unfortunate. As your body gets acclimatized to the force that's pinning you to the wall, you manage to push yourself up and into a hunched over position. Standing inside a slowly deteriorating room, in the mouth of a colossal worm, you rapidly begin formulating a plan.",
		modifier: {},
		options: [
			{
				label: "Give up",
				target: "09a-Give Up"
			},
			{
				label: "Call out",
				target: "09b-Call Out"
			},
			{
				label: "Climb out",
				target: "09c-Climb"
			},
			{
				label: "Attack",
				target: "09ca-Check Luck"
			}
		]
	},
	'09ca-Check Luck': {
	  name: '09ca-Check Luck',
		text: "Checking luck...",
		modifier: {
			luckCheck: true,
			event: 2
		}
	},
	'09a-Give Up': {
	  name: '09a-Give Up',
		text: "Realizing that there's probably no way out of this insane situation, you close your eyes and accept your fate. \n\nYou think of a spring meadow, filled with new flowers and joyful bees. The air is cool, and you feel utterly at peace. As the wall behind you crumbles away, you fall into the gullet of the colossal worm. Although your body will soon be consumed by the beast, you manage one last smile before the end.",
		modifier: { death: true }
	},
	'09b-Call Out': {
	  name: '09b-Call Out',
		text: "Muted by the noise generated from the worm's burrowing, calling out has no effect. The walls continue to crumble.",
		modifier: {},
		options: [
			{
				label: "Give up",
				target: "09a-Give Up"
			},
			{
				label: "Climb out",
				target: "09c-Climb"
			},
			{
				label: "Attack",
				target: "09cab-Worm Success"
			}
		]
	},
	'09c-Climb': {
	  name: '09c-Climb',
		text: "Half walking, half crawling, you make your way across the collapsing room and climb towards the tooth filled opening. As you place a hand between the huge teeth, you feel a shiver run through the gums of the worm. \n\nAgitated, it shakes its head violently, causing you to be thrown back to the room's back wall. The stones behind you give way and for a moment, you are freefalling. \n\nWith the creature's dark gullet behind you, you desperately reach for your weapon.",
		modifier: {},
		options: [
			{
				label: "Check Your Luck",
				target: "09ca-Check Luck"
			}
		]
	},
	'09caa-Worm Failure': {
	  name: '09caa-Worm Failure',
		text: "You reach for your weapon, but your fingers slip past it. You continue fumbling in a panic, but it is too late. You fall back into the gullet of the colossal worm, screaming. \n\nIts intense stomach acid dissolves part of your armor and weapon, then it violently regurgitates you out and onto the floor below. Although your weapon and some of your defenses melted away during the struggle, the only thing you can do now is fight.",
		modifier: { defense: -2, strength: -2 },
		options: [
			{
				label: "Continue",
				target: "10-Worm Fight"
			}
		]
	},
	'09cab-Worm Success': {
	  name: '09cab-Worm Success',
		text: "You manage to grasp your weapon and plunge it into the creature's flesh. You hear a deafening roar, and everything around you convulses. The beast stops digging, and you feel its throat tense up and the sound of liquid rushing towards you. \n\nYou are painfully vomited out of the creature's mouth.",
		modifier: { health: -5 },
		options: [
			{
				label: "Continue",
				target: "10-Worm Fight"
			}
		]
	},
	'10-Worm Fight': {
	  name: '10-Worm Fight',
		text: "Coughing, spluttering, and burning from the colossal worm's intense stomach acid, you stand up. \n\nYou are in a vast chasm, created by the creature that looms in front of you. Most of it is obscured by the darkness, although the ceiling is so high up that some sunlight breaks through, illuminating its face. An eyeless monstrosity faces you, with a massive circular mouth. The teeth were so sharp and strong, that it must have burrowed for miles. \n\nHolding your {{weapon}} at the ready, you stand and face this impossibly large beast, trying not to think about your chances of survival.",
		modifier: { fight: true },
		enemy: {
			name: "COLOSSAL_WORM",
			stats: {
				health: 180,
				strength: 8,
				defense: 5,
				wisdom: 1,
				luck: 2,
			},
			weapon: "teeth"
		},
		victory: {
			target: "11-Worm Victory"
		}
	},
	'11-Worm Victory': {
	  name: '11-Worm Victory',
		text: "After skillfully dodging many of the colossal worm's attacks, and landing some incredible blows to its face and body, the beast shrieks in horror at its inevitable demise. \n\nIn a last ditch attempt to get away from its assailant, it writhes towards the ceiling, towards the light. Smashing through the roof and bathing the area in light, the worm reaches the top and comes to a complete stop. It's done. The worm is dead.",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "12-Worm End"
			}
		]
	},
	'12-Worm End': {
	  name: '12-Worm End',
		text: "Wounded and exhausted, you realize that in its defeat, the worm has created a way out of this hellhole. Using your weapon as a grapple of sorts, you hoist yourself up the creature's back. \n\nYou climb up and up, until you reach the top and collapse from exhaustion. The fresh air washes over you, dousing you in newly found freedom. The grass around you breathes and sighs with each gust of wind, and the sun caresses your face like an old partner. \n\nGrinning from ear to ear, you ease into the best sleep you've had since you can remember.",
		modifier: { end: true }
	},
	'13-Single Door': {
	  name: '13-Single Door',
		text: "Continuing your journey north, you open the single door. Inside, you see a square room with 4 identical wooden doors on the far side. The room is quite empty, apart from a metal sundial in the center of the room which is facing straight at you, to the south. You wonder why someone would have a sundial this far underground.",
		modifier: {},
		options: [
			{
				label: "Door 1",
				target: "13a-Wrong room"
			},
			{
				label: "Door 2",
				target: "13a-Wrong room"
			},
			{
				label: "Door 3",
				target: "13b-Correct Room"
			},
			{
				label: "Door 4",
				target: "13a-Wrong room"
			}
		]
	},
	'13a-Wrong room': {
	  name: '13a-Wrong room',
		text: "You select a door, and enter it. The room you have just entered seems to be an exact copy of the first one, including the south-facing sundial. You realize that these rooms must be enchanted with some kind of magic, teleporting you back to the start if you choose incorrectly. \n\nMaybe you selected the wrong one?",
		modifier: {},
		options: [
			{
				label: "Door 1",
				target: "13aa-Wrong room"
			},
			{
				label: "Door 2",
				target: "13aa-Wrong room"
			},
			{
				label: "Door 3",
				target: "13b-Correct Room"
			},
			{
				label: "Door 4",
				target: "13aa-Wrong room"
			}
		]
	},
	'13aa-Wrong room': {
	  name: '13aa-Wrong room',
		text: "You select a door, and enter it. The room you have just entered seems to be an exact copy of the one you just left, including the south-facing sundial. You realize that these rooms must be enchanted with some kind of magic, teleporting you back to the start if you choose incorrectly. \n\nMaybe you selected the wrong one again?",
		modifier: {},
		options: [
			{
				label: "Door 1",
				target: "13a-Wrong room"
			},
			{
				label: "Door 2",
				target: "13a-Wrong room"
			},
			{
				label: "Door 3",
				target: "13b-Correct Room"
			},
			{
				label: "Door 4",
				target: "13a-Wrong room"
			}
		]
	},
	'13b-Correct Room': {
	  name: '13b-Correct Room',
		text: "You select a door, and enter it. This room seems to be slightly different from the last one. There are the same number of doors, however, the sundial now points to the west.",
		modifier: {},
		options: [
			{
				label: "Door 1",
				target: "13a-Wrong room"
			},
			{
				label: "Door 2",
				target: "13a-Wrong room"
			},
			{
				label: "Door 3",
				target: "13a-Wrong room"
			},
			{
				label: "Door 4",
				target: "13bb-Correct Room"
			}
		]
	},
	'13bb-Correct Room': {
	  name: '13bb-Correct Room',
		text: "You select a door, and enter it. Now you're making some progress! Excitedly you notice that the sundial is pointing to the north. Hoping this is the last one, begin to decide which door to choose.",
		modifier: {},
		options: [
			{
				label: "Door 1",
				target: "13bba-Success"
			},
			{
				label: "Door 2",
				target: "13a-Wrong room"
			},
			{
				label: "Door 3",
				target: "13a-Wrong room"
			},
			{
				label: "Door 4",
				target: "13a-Wrong room"
			}
		]
	},
	'13bba-Success': {
	  name: '13bba-Success',
		text: "After the last door is opened, finally you're in a room that is completely unlike the last ones. It appears to be some kind of prison, although it has been a long time since it has had any occupants. At least you made it out of those enchanted rooms in one piece.",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "18-Prison"
			}
		]
	},
	'14-Ash Path': {
	  name: '14-Ash Path',
		text: "Deciding to take the path that smells like ash, you head east. \n\nThe stone around you is charred and blackened, and there are a number of burnt corpses littering the floor. You wonder what could have caused such devastation, and your thoughts immediately turn to something not so pleasant. Not all is doom and gloom however, as one of the corpses is still wearing some chainmail that is mostly intact. \n\nYou pick it up and put it on, hopefully it will bring you more protection that it did for them...",
		modifier: {
			chest: "Chainmail",
			defense: 1
		},
		options: [
			{
				label: "Continue",
				target: "15-Dragon Fight"
			}
		]
	},
	'15-Dragon Fight': {
	  name: '15-Dragon Fight',
		text: "During your journey down this path, you notice a pulsating light emanating from the end of the room. The closer you get, the warmer it becomes. It's a nice change from the chilly caves, however you are now producing a considerable amount of sweat. Finally, you reach the end of the path and enter into a swelteringly hot room. There, you see it. \n\nA juvenile dragon (arguably more dangerous than an adult, as it has no control of its flames), sits across from you waiting for its next prey to arrive. One eye flicks open, and the dragon lets out an almighty roar. The path behind you shudders, and collapses. No way out now. \n\nYou ready for attack.",
		modifier: { fight: true },
		enemy: {
			name: "JUVENILE_DRAGON",
			stats: {
				health: 70,
				strength: 3,
				defense: 3,
				wisdom: 4,
				luck: 2,
			},
			weapon: "claws"
		},
		victory: {
			target: "15a-Dragon Victory"
		}
	},
	'15a-Dragon Victory': {
	  name: '15a-Dragon Victory',
		text: "You strike the dragon down, and its flames are finally extinguished. Looking past its now corpse, you notice a glint hiding in the nest behind it. It appears that the dragon was guarding some kind of relic. You add it to your inventory for safe-keeping and you feel slightly luckier after that encounter.",
		modifier: {
			amulet: true,
			luck: 1
		},
		options: [
			{
				label: "Continue",
				target: "16-Dragon Room"
			}
		]
	},
	'16-Dragon Room': {
	  name: '16-Dragon Room',
		text: "After collecting the relic and inspecting the room, you notice a crawlspace in the back of the room. Maybe the dragon was using this to get around? The tunnel you entered through is still collapsed, and it seems like this might be the only way out.",
		modifier: {},
		options: [
			{
				label: "Dig tunnel",
				target: "16a-Dig"
			},
			{
				label: "Go into crawl space",
				target: "16b-Crawlspace"
			},
			{
				label: "Make fire",
				target: "16c-Make Fire"
			},
			{
				label: "Rest",
				target: "16d-Rest"
			}
		]
	},
	'16a-Dig': {
	  name: '16a-Dig',
		text: "Using your hands, you start trying to move the huge rocks blocking the exit behind you. \n\nYou manage to move some successfully, however you eventually crush your finger between two exceptionally heavy rocks. Howling in pain, your finger most definitely being broken, you step away from your fruitless attempt of digging and reconsider your options.",
		modifier: {
			health: -15,
			strength: -1
		},
		options: [
			{
				label: "Go into crawl space",
				target: "16b-Crawlspace"
			},
			{
				label: "Make fire",
				target: "16c-Make Fire"
			},
			{
				label: "Rest",
				target: "16d-Rest"
			}
		]
	},
	'16b-Crawlspace': {
	  name: '16b-Crawlspace',
		text: "You squeeze your way into the crawlspace. It's just as warm as the room you left, and you see many shredded scales stuck to the edges of the stone. As you make your way through, you notice a few small alcoves filled with coins that the dragon must have been hiding. You pocket them and emerge on the other side.",
		modifier: {
			gold: 10
		},
		options: [
			{
				label: "Continue",
				target: "17-Chests"
			}
		]
	},
	'16c-Make Fire': {
	  name: '16c-Make Fire',
		text: "Using some old books from a nearby shelf that are somehow still intact, you make a fire with the aid of some still smouldering furniture. Eventually, after some careful tending, the fire burns bright and makes the room smell pleasant as there were some herbs hidden in the book leaves. You feel fully rejuvenated.",
		modifier: {
			health: 50
		},
		options: [
			{
				label: "Go into crawl space",
				target: "16b-Crawlspace"
			},
			{
				label: "Dig tunnel",
				target: "16a-Dig"
			},
			{
				label: "Rest",
				target: "16d-Rest"
			}
		]
	},
	'16d-Rest': {
	  name: '16d-Rest',
		text: "The fumes from the dragonfire make you sleepy, so you decide to lie down and take a nap. You wake up sometime later feeling not at all refreshed and something stole your armor while you were asleep. You realize that the fumes from the dragon probably caused this terrible nap, so you get up and consider your next move.",
		modifier: { health: 5, chest: "Ragged shirt" },
		options: [
			{
				label: "Go into crawl space",
				target: "16b-Crawlspace"
			},
			{
				label: "Make fire",
				target: "16c-Make Fire"
			},
			{
				label: "Rest",
				target: "16d-Rest"
			}
		]
	},
	'17-Chests': {
	  name: '17-Chests',
		text: "You emerge from the crawlspace, slightly dustier than you already were. \n\nYou discover yourself in a room containing a number of chests, with a large iron door towards the rear. There are a few that catch your eye; a gilded chest, with beautiful decorations lining the edges, a dark wooden chest with a humanoid skull placed on top, and for some reason you are also drawn to an unsuspecting box, one that couldn't be much bigger than your foot. ",
		modifier: {},
		options: [
			{
				label: "Leave through iron door",
				target: "17d-Iron Door"
			},
			{
				label: "Open Gilded Chest",
				target: "17a-Gilded Chest"
			},
			{
				label: "Open Skull Chest",
				target: "17b-Skull Chest"
			},
			{
				label: "Open Tiny Chest",
				target: "17c-Tiny Chest"
			}
		]
	},
	'17a-Gilded Chest': {
	  name: '17a-Gilded Chest',
		text: "Cracking the gilded chest open with a nearby rock, the only item inside is a fairly nondescript leather bound book. Curious, you start to leaf through it and words rush onto its pages that don't seem to make any sense.",
		modifier: {},
		options: [
			{
				label: "Keep reading",
				target: "17aa-Gilded Continue"
			},
			{
				label: "Put down the book",
				target: "17ab-Chests Variant"
			}
		]
	},
	'17aa-Gilded Continue': {
	  name: '17aa-Gilded Continue',
		text: "As you read, more words flood the pages and you struggle to keep up with them. All sense of time has gone, and although it seems like seconds since you picked up this book, you've been standing in the same spot for 4 hours. \n\nThe words do seem somewhat familiar now though, as your brain attempts to decipher the symbols that are unravelling before your eyes.",
		modifier: {},
		options: [
			{
				label: "Keep reading",
				target: "17aaa-Gilded Continue"
			},
			{
				label: "Put down the book",
				target: "17ab-Chests Variant"
			}
		]
	},
	'17aaa-Gilded Continue': {
	  name: '17aaa-Gilded Continue',
		text: "The words are now filling up the book faster than you can turn the pages. Suddenly, the book flies out of your hands and hovers in front of you. The words now make sense - they're magic runes! As the runes fill your mind you gain knowledge that you never knew existed. You also realise that you've been standing in the same spot now for over a day, and you collapse in exhaustion. \n\nYou take a few minutes to recover from the experience, and place the book back down in the chest.",
		modifier: {
			wisdom: 4,
			health: -10,
			strength: -1
		},
		options: [
			{
				label: "Continue",
				target: "17aaaa-Gilded Variant"
			}
		]
	},
	'17ab-Chests Variant': {
	  name: '17ab-Chests Variant',
		text: "Figuring that this book may be more trouble than it's worth, you drop it back into the gilded chest and slam it shut.",
		modifier: {},
		options: [
			{
				label: "Leave through iron door",
				target: "17d-Iron Door"
			},
			{
				label: "Open Skull Chest",
				target: "17b-Skull Chest"
			},
			{
				label: "Open Tiny Chest",
				target: "17c-Tiny Chest"
			}
		]
	},
	'17aaaa-Gilded Variant': {
	  name: '17aaaa-Gilded Variant',
		text: "You return to the present moment and consider whether to open any more chests, or to leave through the iron door.",
		modifier: {},
		options: [
			{
				label: "Leave through iron door",
				target: "17d-Iron Door"
			},
			{
				label: "Open Skull Chest",
				target: "17b-Skull Chest"
			},
			{
				label: "Open Tiny Chest",
				target: "17c-Tiny Chest"
			}
		]
	},
	'17b-Skull Chest': {
	  name: '17b-Skull Chest',
		text: "You approach the skull chest and crack it open, coughing as your lungs are assailed by dust. Inside is a full length halberd, complete with grip and 6 foot long handle. How this managed to fit inside this chest is anyone's guess, but you gladly pick it up and test its weight. There doesn't seem to be anything wrong with it, and breathe a sigh of relief as you were almost sure that this one would be cursed.",
		modifier: {
			weapon: "Halberd",
		},
		options: [
			{
				label: "Leave through iron door",
				target: "17d-Iron Door"
			},
			{
				label: "Open Gilded Chest",
				target: "17a-Gilded Chest"
			},
			{
				label: "Open Tiny Chest",
				target: "17c-Tiny Chest"
			}
		]
	},
	'17c-Tiny Chest': {
	  name: '17c-Tiny Chest',
		text: "Popping open the tiny chest with ease, you find a small health potion and a few gold pieces inside.",
		modifier: {
			healthPotions: 1,
			gold: 4
		},
		options: [
			{
				label: "Leave through iron door",
				target: "17d-Iron Door"
			},
			{
				label: "Open Gilded Chest",
				target: "17a-Gilded Chest"
			},
			{
				label: "Open Skull Chest",
				target: "17b-Skull Chest"
			}
		]
	},
	'17d-Iron Door': {
	  name: '17d-Iron Door',
		text: "You exit through the iron door and as it closes behind you, you realise that it was a hidden doorway that leads into some kind of prison. The door seals shut behind you with no way to open it again.",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "18-Prison"
			}
		]
	},
	'18-Prison': {
	  name: '18-Prison',
		text: "The only way out of this prison is past some iron bars at the end of the room. They extend from the floor to the ceiling and are too close together for you to squeeze through. There is a tapestry hung to the left of the bars, and a small colony of mushrooms growing in a corner. \n\nYou hear a slow, steady breathing coming from behind the bars, as if something is sleeping behind them.",
		modifier: {},
		options: [
			{
				label: "Inspect Tapestry",
				target: "19-Tapestry"
			},
			{
				label: "Call out",
				target: "18a-Call Out"
			},
			{
				label: "Attack the bars",
				target: "18b-Attack"
			},
			{
				label: "Pick Mushrooms",
				target: "20-Mushrooms"
			}
		]
	},
	'19-Tapestry': {
	  name: '19-Tapestry',
		text: "The tapestry is extremely detailed, seeming to depict a battle from ancient times. It occasionally puffs out from the wall, as if there is an air current blowing into it from behind.",
		modifier: {},
		options: [
			{
				label: "Tear It Down",
				target: "19a-Tear Down"
			},
			{
				label: "Burn Tapestry",
				target: "19b-Burn Tapestry"
			},
			{
				label: "Inspect Tapestry",
				target: "19c-Inspect"
			},
			{
				label: "Ignore it",
				target: "18-Prison"
			}
		]
	},
	'18a-Call Out': {
	  name: '18a-Call Out',
		text: "As you inhale to call out for help, the large creature behind the bars makes an audible grunt. \n\nYou rethink your choice.",
		modifier: {},
		options: [
			{
				label: "Inspect Tapestry",
				target: "19-Tapestry"
			},
			{
				label: "Attack the bars",
				target: "18b-Attack"
			},
			{
				label: "Pick Mushrooms",
				target: "20-Mushrooms"
			}
		]
	},
	'18b-Attack': {
	  name: '18b-Attack',
		text: "Do you have a weapon equipped?",
		modifier: {},
		options: [
			{
				label: "Yes",
				target: "18ba-Weapon"
			},
			{
				label: "No",
				target: "18bb-No Weapon"
			}
		]
	},
	'18ba-Weapon': {
	  name: '18ba-Weapon',
		text: "Raising your weapon over the top of your head, you smash it against the bars of the prison. The bars, clearly more durable than you expected, cause your weapon to shatter into a thousand fragments. Perhaps this wasn't the best idea.",
		modifier: {
			weapon: "fists",
		},
		options: [
			{
				label: "Continue",
				target: "20-Continue"
			}
		]
	},
	'18ba-No Weapon': {
	  name: '18ba-No Weapon',
		text: "Without actually owning a weapon, attacking some iron bars seems folly. However, you proceed to strike the bars with all your might. You hear an audible snap, and know that you have done some irreparable damage to your hand.",
			modifier: {
				health: -5
			},
			options: [
				{
					label: "Continue",
					target: "20-Continue"
				}
			]
	},
	'20-Continue': {
	  name: '20-Continue',
		text: "A low growl fills the chamber. The ground shakes as something gets to its feet, clearly annoyed by being rudely awoken. \n\nA massive fist plows through the iron bars, and catches you completely off guard. Catapulted across the room, your head bounces off the wall and you pass out. \n\nDarkness.",
		modifier: {
			health: -20
		},
		options: [
			{
				label: "Continue",
				target: "21-Continue"
			}
		]
	},
	'21-Continue': {
	  name: '21-Continue',
		text: "You regain consciousness, some time later. The hole created by the fist is directly facing you, the rubble from the wall scattered all around. Why did the creature not eat or kill you? It was clearly powerful enough to do so. As you wonder how something so large could get inside the cave, you gather yourself up from the prison floor. Although you are injured, you must continue. The way is clear. \n\nYou walk through the hole and enter the next corridor.",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "23-Corridor"
			}
		]
	},
	'20-Mushrooms': {
	  name: '20-Mushrooms',
		text: "You bend down and pick a handful of the pungent mushrooms. As you pop a couple in your mouth and begin to chew, you question the myriad of flavors that are assaulting your mouth. \n\nThe room melts away. \n\nYou find yourself standing in the shadow of an impossibly large castle, wreathed in flame. The city is on fire. This is the War of Deceit. You and your friends fought in this battle, fighting for the honor of your King. Many of your friends died during this battle... yet you still can't seem to recall any of their names.",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "20a-Knight Fight"
			}
		]
	},
	'20a-Knight Fight': {
	  name: '20a-Knight Fight',
		text: "You hear a whistling grow louder, and an arrow flies towards you. Before you can react, the arrow flies past your greatsword and hits you square in the chest, but it bounces harmlessly off your full plate armor. You realize that you are wearing the armor and wielding the weapon that you once owned, when this battle was not just a memory. You're really here, defending the King's honor once more. \n\nAnother arrow streaks towards you, but you are ready this time. You deflect it easily, and move forward to an enemy knight.",
		modifier: {
			fight: true,
			head: 'Plate Helmet',
			chest: 'Plate Armor',
			arms: 'Plate Gauntlets',
			legs: 'Plate Greaves',
			feet: 'Plate Boots',
			weapon: 'Steel Greatsword',
			defense: 6,
			strength: 4
		},
		enemy: {
			name: "KNIGHT",
			stats: {
				health: 50,
				strength: 3,
				defense: 3,
				wisdom: 3,
				luck: 3,
			},
			weapon: "longsword"
		},
		victory: {
			target: "20aa-Knight Interim"
		}
	},
	'20aa-Knight Interim': {
	  name: '20aa-Knight Interim',
		text: "Standing victorious over your slain foe, allow yourself a second to take in your surroundings. \n\nFellow soldiers are fighting all around you, struggling to keep the enemies away from the enormous city gates that tower behind them. \n\nYou also notice an old friend, who skillfully dodges an approaching enemy cavalry unit, dismounting a rider in the process with a precise thrust of his spear. As he looks over you try to call out to him, but no sound comes out of your mouth. \n\nA group of enemy pikemen charge in an arrow formation, and you realize that time is of the essence.",
		modifier: {},
		options: [
			{
				label: "Assist the gate defenders",
				target: "20aaa-War Hammer Knight"
			},
			{
				label: "Help your friend",
				target: "20aab-Pikeman battle"
			},
			{
				label: "Retreat to the walls",
				target: "20aac-Retreat"
			},
			{
				label: "Charge into battle",
				target: "20aad-Charge"
			}
		]
	},
	'20aaa-War Hammer Knight': {
	  name: '20aaa-War Hammer Knight',
		text: "Noticing that the soldiers defending the gates are being beaten back, you quickly move over to assist them. You deflect a few blows from nearby spearmen, and just manage to dodge out of the way as a huge war hammmer slams into the ground beside you. It's lifted from the crater it created by its wielder, a monstrous looking knight encased in a thick scarlet armor. The knight grunts, and readies for another swing.",
		modifier: { fight: true },
		enemy: {
			name: "SCARLET_KNIGHT",
			stats: {
				health: 50,
				strength: 4,
				defense: 5,
				wisdom: 1,
				luck: 2,
			},
			weapon: "War Hammer"
		},
		victory: {
			target: "20aaaa-War Victory"
		}
	},
	'20aab-Pikeman battle': {
	  name: '20aab-Pikeman battle',
		text: "\"You look exhausted!\" chuckles your friend, as you run over to their aid. \n\n\"There isn't any time for rest now you fat prick, come on, help me take out some of these twats!\" He dives headfirst into battle, spear at his side. You can't help but laugh, how did they ever get away being so reckless in battle? They really were always so reckless, right up until -- \n\nBefore you can continue your thought, a screaming pikeman engages you in combat.",
		modifier: { fight: true },
		enemy: {
			name: "PIKEMAN",
			stats: {
				health: 50,
				strength: 4,
				defense: 2,
				wisdom: 1,
				luck: 4,
			},
			weapon: "Pike"
		},
		victory: {
			target: "20aaaa-War Victory"
		}
	},
	'20aac-Retreat': {
	  name: '20aac-Retreat',
		text: "Raising your sword and pointing it at the walls behind you, you order your men to retreat to safety. As you all begin to fall back, the enemy troops advance. A flurry of arrows rain down upon you and your men as you run, taking a few of their lives. \n\nThe wall is edging closer, but another round of arrows descend from above. Screams of your men fill the air. \n\nYou've got to do something, otherwise no-one will make it. Looking up and with a silent nod of agreement, both you and your friend stop running away from battle, and instead charge back towards it. Raising your weapons high and bellowing out louder than you ever thought possible, you leap at nearby infantry.",
		modifier: { fight: true },
		enemy: {
			name: "INFANTRY",
			stats: {
				health: 50,
				strength: 2,
				defense: 2,
				wisdom: 2,
				luck: 6,
			},
			weapon: "Axe"
		},
		victory: {
			target: "20aaaa-War Victory"
		}
	},
	'20aad-Charge': {
	  name: '20aad-Charge',
		text: "You glance around, and see men falling all around you. The enemy troops are advancing, and it seems as though all hope is lost. You know that the only way to win this is to charge head on and face them, but you cannot stop the rout that has begun.\n\nThen you see it.\n\nA standard bearer, proudly walking towards the field of battle, accompanied by a whole troop of musicians. The booming of the drums and blast of the trumpets resonate through you - it's as almost as if a wave of revitalizing energy washed through you all. \n\nWith renewed courage and the sound of fate behind you, you all charge towards the oncoming foes.",
		modifier: { fight: true },
		enemy: {
			name: "SWORDSMAN",
			stats: {
				health: 50,
				strength: 10,
				defense: 1,
				wisdom: 1,
				luck: 1,
			},
			weapon: "sword"
		},
		victory: {
			target: "20aaaa-War Victory"
		}
	},
	'20aaaa-War Victory': {
	  name: '20aaaa-War Victory',
		text: "Another enemy of the King lay slain at your feet. \"Take this!\" yells your friend, and throws you a health potion. They grin at you as you pour the liquid into your mouth. \n\n\"Drink up you weak bastard!\" \n\nA mounted knight charges towards your friend from behind. With an outstretched arm you scream for him to move, but he doesn't hear you. The oncoming knight's enormous morningstar connects with your friend's spine with a sickening crunch, lifting him off his feet. As his body leaves the ground, his eyes roll back, the grass and hills and everything around you turns to ash, it burns away like a piece of forgotten parchment. \n\nYou're floating in darkness for what seems an eternity. \n\nYou wake up.",
		modifier: {
			health: 50
		},
		options: [
			{
				label: "Continue",
				target: "22-Home"
			}
		]
	},
	'22-Home': {
	  name: '22-Home',
		text: "What greets you is a confusing, but all too familiar sight. \n\nYour partner is sleeping in bed next to you, their chest rising and falling steadily with each breath. You stroke the soft skin of their back and wonder. Birds chirp outside, and a light breeze carries the smell of freshly baked bread. \n\nAll is still. You're home, finally.",
		modifier: {},
		options: [
			{
				label: "Get out of bed",
				target: "22a-Nightmares"
			},
			{
				label: "Wake your partner",
				target: "22a-Nightmares"
			},
			{
				label: "Check on kids",
				target: "22a-Nightmares"
			},
			{
				label: "Go back to sleep",
				target: "22a-Nightmares"
			}
		]
	},
	'22a-Nightmares': {
	  name: '22a-Nightmares',
		text: "Adjusting yourself in bed, your partner stirs, woken up by your movements. \"Good morning\", they say. But something is different about the way they spoke. You place your hand on their shoulder to roll them over. \n\nBurning eyes. \nA skinless face. \nA mouth contorted in pain. \n\nA howling scream erupts from their mouth, and you push yourself away in horror. As you fall out of the bed, your head strikes the ground with blinding pain. \n\nYou wake up.",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "22aa-Awoken"
			}
		]
	},
	'22aa-Awoken': {
	  name: '22aa-Awoken',
		text: "Laying in a pool of your own mushroom smelling vomit, you open your eyes once more. You're back in the prison. You glance down and see that you've been stripped down to the clothes you had when you got here, although your greatsword from the memory is still in your hand...\n\nWas any of that real? Surely if you've still got the weapon, then... You shake your head, helplessly.\n\nThe way ahead of you is now clear. Whatever was blocking it before you took the mushrooms must have cleared a path for you. Shaking your head and attempting to suppress your painful memories, you continue on.",
		modifier: {
			head: 'none',
			chest: 'Ragged shirt',
			hands: 'none',
			legs: 'Ragged pants',
			feet: 'Old boots',
			defense: -6,
			strength: -3
		},
		options: [
			{
				label: "Continue",
				target: "23-Corridor"
			}
		]
	},
	'19a-Tear Down': {
	  name: '19a-Tear Down',
		text: "The tapestry cascades to the ground, its images, forgotten. All that remains in its place is a small crack, out of which a slight breeze is blowing through. You decide to use the hilt of your weapon to smash it against the crack. \n\nSomething stirs. You hit it again. \n\nThere's a snort, followed by a grunt, then the sound of something sitting up. Something big. You decide to step back and ready yourself for whatever is on the other side of this wall. \n\nSuddenly the wall disintegrates in an explosion, and you're knocked off your feet. A shrouded figure steps through the hole.",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "20-Dark Figure"
			}
		]
	},
	'19b-Burn Tapestry': {
	  name: '19b-Burn Tapestry',
		text: "Using the torch, you light the corner of the tapestry on fire. The fire quickly spreads up the images, but too fast. It engulfs the tapestry and begins to spread through the entire room, causing the damaged wall behind it to crumble. You realize that you have to move now, lest you wish to become a charred corpse. \n\nAs you sprint towards your new exit, you catch a glimpse of a small figure behind the bars, whose bright saffron eyes glint as you run in the only direction left available to you.",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "23-Corridor"
			}
		]
	},
	'19c-Inspect': {
	  name: '19c-Inspect',
		text: "As you look closer at the tapestry, you notice that all of the figures fighting in the battle are... Wait a second. You know this battle. You were there. Memories rush back into your mind as you recall the tapestry's battle, The War of Deceit, in which the King was assassinated by his Royal Lords. You can almost hear the sound of swords clashing on armor. You can hear the screams of your friends, who died for the King's honor. \nYou smell blood. \nYou smell fire. \nYou smell fear.",
		modifier: {},
		options: [
			{
				label: "Tear it down",
				target: "19ca-Continue"
			}
		]
	},
	'19ca-Continue': {
	  name: '19ca-Continue',
		text: "In a sudden burst of rage, you rip the tapestry from its hangings and retreat, panting and covered in a slick sweat. \n\nSome memories are best left lost to time.",
		modifier: { defense: -1 },
		options: [
			{
				label: "Continue",
				target: "19a-Tear Down"
			}
		]
	},
	'20-Dark Figure': {
	  name: '20-Dark Figure',
		text: "You get to your feet, brushing rubble off your clothes. A tattered looking goblin steps through the opening, its piercing saffron eyes gazing at you. It has two sheathed daggers on its waist, and seems to whisper something as it stares at you. Something big looms behind it, blocking out your view of the exit.",
		modifier: {},
		options: [
			{
				label: "Fight",
				target: "20a-Fight Goblin"
			},
			{
				label: "Cry",
				target: "20b-Cry"
			},
			{
				label: "Ask for help",
				target: "20c-Help"
			},
			{
				label: "Say Nothing",
				target: "20d-Nothing"
			}
		]
	},
	'20a-Fight Goblin': {
	  name: '20a-Fight Goblin',
		text: "You rush at the goblin with a battle cry, but you're stopped mere feet away from it. You look down, and a giant black spear has entered your belly and exited the other side. The giant wielding it emerges from beside the goblin. You cough up blood. \n\n\"Tsk. Truly a shame to waste such talent.\" The goblin sighs, as you slip into darkness.",
		modifier: { death: true }
	},
	'20b-Cry': {
	  name: '20b-Cry',
		text: "Tears stream down your face, fearful of the armed goblin and whatever is behind it. \n\n\"Blimey mate, no need for the waterworks!\" the goblin shouts, and beckons you over. Sniffling, you walk up to the goblin and feel slightly foolish for resorting to tears. \n\n\"You don't need to say nothin, and don't ail me with your woes,\" the goblin says loudly. Jabbing a thumb towards the huge grey giant behind him, \"Gormush and I have our own problems. All I wanna know from you, is do you got coin?\"",
		modifier: {},
		options: [
			{
				label: "Fight",
				target: "20a-Fight Goblin"
			},
			{
				label: "Barter",
				target: "21-Goblin Merchant"
			},
			{
				label: "Ask for passage",
				target: "20ba-Passage"
			},
			{
				label: "Refuse",
				target: "20bb-Refuse"
			}
		]
	},
	'20c-Help': {
	  name: '20c-Help',
		text: "You begin to ask the goblin for help, but it holds up a small wrinkled hand in a signal for you to stop. \"You don't need to say nothin, and don't ail me with your woes,\" the goblin says loudly. Jabbing a thumb towards the huge grey giant behind him, \"Gormush and I have our own problems. All I wanna know from you, is do you got coin?\"",
		modifier: {},
		options: [
			{
				label: "Fight",
				target: "20a-Fight Goblin"
			},
			{
				label: "Barter",
				target: "21-Goblin Merchant"
			},
			{
				label: "Ask for passage",
				target: "20ba-Passage"
			},
			{
				label: "Refuse",
				target: "20bb-Refuse"
			}
		]
	},
	'20d-Nothing': {
	  name: '20d-Nothing',
		text: "\"Not a talker eh?\" sneers the goblin. \"Perfect. You don't need to say nothin,\" Jabbing a thumb towards the huge grey giant behind him, the goblin continues. \"Gormush and I have our own problems. All I wanna know from you, is do you got coin?\"",
		modifier: {},
		options: [
			{
				label: "Fight",
				target: "20a-Fight Goblin"
			},
			{
				label: "Barter",
				target: "21-Goblin Merchant"
			},
			{
				label: "Ask for passage",
				target: "20ba-Passage"
			},
			{
				label: "Refuse",
				target: "20bb-Refuse"
			}
		]
	},
	'21-Goblin Merchant': {
	  name: '21-Goblin Merchant',
		text: "\"Excellent choice, friend!\" The goblin merchant steps aside and waves its hand towards a large burlap sack that is propped up against the remains of the wall. You approach it slowly, as to not cause alarm. The giant standing behind the goblin tenses as you get closer. \n\nPeering inside, you discover that the goblin actually has some decent items that may help.",
		modifier: {},
		options: [
			{
				label: "Leather Helmet - 5 Gold",
				value: 5,
				target: "21a-Helmet"
			},
			{
				label: "Health Potion - 2 gold",
				value: 2,
				target: "21b-Health Potion"
			},
			{
				label: "Black Iron Longsword - 12 Gold",
				value: 12,
				target: "21c-Longsword"
			},
			{
				label: "Nothing",
				target: "20bb-Refuse"
			}
		]
	},
	'21a-Helmet': {
	  name: '21a-Helmet',
		text: "\"Anything else?\"",
		modifier: {
			head: "Leather Helmet",
			defense: 2,
			gold: -5
		},
		options: [
			{
				label: "Health Potion - 2 gold",
				value: 2,
				target: "21aa-Health and Helmet"
			},
			{
				label: "Black Iron Longsword - 12 Gold",
				value: 12,
				target: "21c-Longsword and Helmet"
			},
			{
				label: "Nothing",
				target: "21d-Nothing"
			}
		]
	},
	'21aa-Health and Helmet': {
	  name: '21aa-Health and Helmet',
		text: "\"Lovely stuff!\" cackles the goblin. \"Can I interest you in one last item?\"",
			modifier: {
				healthPotions: 1,
				gold: -2
			},
			options: [
				{
					label: "Black Iron Longsword - 12 Gold",
					value: 12,
					target: "21aaa-Longsword, Health and Helmet"
				},
				{
					label: "Nothing",
					target: "21d-Nothing"
				}
			]
	},
	'21c-Longsword and Helmet': {
	  name: '21c-Longsword and Helmet',
		text: "\"Lovely stuff!\" cackles the goblin. \"Can I interest you in one last item?\"",
		modifier: {
			weapon: "Black Iron Longsword",
			gold: -12
		},
		options: [
			{
				label: "Health Potion - 2 gold",
				value: 2,
				target: "21aaa-Health Potion, Longsword and Helmet"
			},
			{
				label: "Nothing",
				target: "21d-Nothing"
			}
		]
	},
	'21aaa-Longsword, Health and Helmet': {
	  name: '21aaa-Longsword, Health and Helmet',
		text: "\"Beautiful!\" the goblin cheers. \"You've bought all me wares.\"",
		modifier: {
			weapon: "Black Iron Longsword",
			gold: -12
		},
		options: [
			{
				label: "Finish Bartering",
				target: "21d-Nothing"
			}
		]
	},
	'21aaa-Health Potion, Longsword and Helmet': {
	  name: '21aaa-Potion, Longsword and Helmet',
		text: "\"Beautiful!\" the goblin cheers. \"You've bought all me wares.\"",
		modifier: {
			healthPotions: 1,
			gold: -2
		},
		options: [
			{
				label: "Finish Bartering",
				target: "21d-Nothing"
			}
		]
	},
	'21b-Health Potion': {
	  name: '21b-Health Potion',
		text: "\"Anything else?\"",
		modifier: {
			healthPotions: 1,
			gold: -2
		},
		options: [
			{
				label: "Helmet - 5 gold",
				value: 5,
				target: "21ba-Helmet and Health"
			},
			{
				label: "Black Iron Longsword - 12 Gold",
				value: 12,
				target: "21bb-Longsword and Health"
			},
			{
				label: "Nothing",
				target: "21d-Nothing"
			}
		]
	},
	'21ba-Helmet and Health': {
	  name: '21ba-Helmet and Health',
		text: "\"Lovely stuff!\" cackles the goblin. \"Can I interest you in one last item?\"",
		modifier: {
			head: "Leather Helmet",
			defense: 2,
			gold: -5
		},
		options: [
			{
				label: "Black Iron Longsword - 12 Gold",
				value: 12,
				target: "21baa-Longsword, Helmet and Health"
			},
			{
				label: "Nothing",
				target: "21d-Nothing"
			}
		]
	},
	'21bb-Longsword and Health': {
	  name: '21bb-Longsword and Health',
		text: "\"Lovely stuff!\" cackles the goblin. \"Can I interest you in one last item?\"",
		modifier: {
			weapon: "Black Iron Longsword",
			gold: -12
		},
		options: [
			{
				label: "Helmet - 5 gold",
				value: 5,
				target: "21bba-Helmet, Longsword and Health"
			},
			{
				label: "Nothing",
				target: "21d-Nothing"
			}
		]
	},
	'21baa-Longsword, Helmet and Health': {
	  name: '21baa-Longsword, Helmet and Health',
		text: "\"Beautiful!\" the goblin cheers. \"You've bought all me wares.\"",
		modifier: {
			weapon: "Black Iron Longsword",
			gold: -12
		},
		options: [
			{
				label: "Finish Bartering",
				target: "21d-Nothing"
			}
		]
	},
	'21bba-Helmet, Longsword and Health': {
	  name: '21bba-Helmet, Longsword and Health',
		text: "\"Beautiful!\" the goblin cheers. \"You've bought all me wares.\"",
		modifier: {
			head: "Leather Helmet",
			defense: 2,
			gold: -5
		},
		options: [
			{
				label: "Finish Bartering",
				target: "21d-Nothing"
			}
		]
	},
	'21c-Longsword': {
	  name: '21c-Longsword',
		text: "\"Anything else?\"",
		modifier: {
			weapon: "Black Iron Longsword",
			gold: -12
		},
		options: [
			{
				label: "Helmet - 5 gold",
				value: 5,
				target: "21ca-Helmet and Longsword"
			},
			{
				label: "Health Potion - 2 gold",
				value: 2,
				target: "21cb-Health and Longsword"
			},
			{
				label: "Nothing",
				target: "21d-Nothing"
			}
		]
	},
	'21ca-Helmet and Longsword': {
	  name: '21ca-Helmet and Longsword',
		text: "\"Lovely stuff!\" cackles the goblin. \"Can I interest you in one last item?\"",
		modifier: {
			head: "Leather Helmet",
			defense: 2,
			gold: -5
			},
		options: [
			{
				label: "Health Potion - 2 gold",
				value: 2,
				target: "21cba-Health, Helmet and Longsword"
			},
			{
				label: "Nothing",
				target: "21d-Nothing"
			}
		]
	},
	'21cb-Health and Longsword': {
	  name: '21cb-Health and Longsword',
		text: "\"Lovely stuff!\" cackles the goblin. \"Can I interest you in one last item?\"",
		modifier: {
			healthPotions: 1,
			gold: -2
		},
		options: [
			{
				label: "Helmet - 5 gold",
				value: 5,
				target: "21caa-Helmet, Health and Longsword"
			},
			{
				label: "Nothing",
				target: "21d-Nothing"
			}
		]
	},
	'21cba-Health, Helmet and Longsword': {
	  name: '21cba-Health, Helmet and Longsword',
		text: "\"Beautiful!\" the goblin cheers. \"You've bought all me wares.\"",
		modifier: {
			healthPotions: 1,
			gold: -5
		},
		options: [
			{
				label: "Finish Bartering",
				target: "21d-Nothing"
			}
		]
	},
	'21caa-Helmet, Health and Longsword': {
	  name: '21caa-Helmet, Health and Longsword',
		text: "\"Beautiful!\" the goblin cheers. \"You've bought all me wares.\"",
			modifier: {
				head: "Leather Helmet",
				defense: 2,
				gold: -5
			},
			options: [
				{
					label: "Finish Bartering",
					target: "21d-Nothing"
				}

			]
	},
	'20bb-Refuse': {
	  name: '20bb-Refuse',
		text: "\"Well 'ain't that a shame. I thought we were gonna strike a deal there.\" the goblin complains. \n\"Ah well. Come on Gormush, let's leave this sorry soul to their own fortune.\"",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "22-Two Paths"
			}
		]
	},
	'21d-Nothing': {
	  name: '21d-Nothing',
		text: "The goblin winks one saffron eye at you and says \"Great doin' business wit' ya. Oh and one more thing, if you see it - you'll know. Just make sure to place a hand on it. Sounds weird, I know, but just do it. That's all I'm allowed to tell ya.\"",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "22-Two Paths"
			}
		]
	},
	'22-Two Paths': {
	  name: '22-Two Paths',
		text: "The goblin snaps its long, green fingers, and both it and it's companion disappear in a puff of orange smoke. The way is clear. \n\nYou are about to step into the blast hole and go down the corridor, however, you notice a small path that was previously hidden behind the goblin. It's smaller than the one you were about to take, and it seems to descend aggressively somewhat.",
		modifier: {},
		options: [
			{
				label: "Small Path",
				target: "26-Small Path"
			},
			{
				label: "Continue On",
				target: "23-Corridor"
			}
		]
	},
	'23-Corridor': {
	  name: '23-Corridor',
		text: "Venturing into the corridor, you notice that the quality of air seems to have improved somewhat. Also, the ground seems to be steadily inclining. Could this be the way out? Your pace quickens with anticipation. \n\nAs you begin to jog, the incline continues to increase dramatically. After a few minutes, you have to resort to crawling on your hands and knees to stay on the path, which is becoming steeper with every step. Your determination to escape strengthens your resolve, and you push on.",
		modifier: {},
		options: [
			{
				label: "Continue Climbing",
				target: "24-Skeletal Knight"
			}
		]
	},
	'24-Skeletal Knight': {
	  name: '24-Skeletal Knight',
		text: "After a quarter mile, you finally climb to the top of the path. Hoisting your leg over the rim, your face is greeted with a brilliant light. \n\nSunlight. You've made it! You finally escaped from the cave! \n\n... \n\nBut before you can celebrate your escape, you hear a raspy voice from in front of you. \n\"Not so fast,\" declares a figure, obscured by the blinding sun. \"No-one leaves that cave until they have got past me.\" Squinting your eyes, you see who stands before you. Fully clad in engraved steel armor, a skeletal knight brandishes a long spear in a battle-ready stance.",
		modifier: {},
		options: [
			{
				label: "Question the Knight",
				target: "24a-Question"
			},
			{
				label: "Flee",
				target: "24b-Flee"
			},
			{
				label: "Say Nothing",
				target: "24d-Skeletal Knight Fight"
			},
			{
				label: "Attack",
				target: "24d-Skeletal Knight Fight"
			}
		]
	},
	'24a-Question': {
	  name: '24a-Question',
		text: "\"I do not have time to answer your foolish questions, mortal,\" the skeleton croaks. \"Prepare to die.\" The knight locks its spear to its side with both bony hands, and charges.",
		modifier: { fight: true },
		enemy: {
			name: "SKELETAL_KNIGHT",
			stats: {
				health: 140,
				strength: 6,
				defense: 5,
				wisdom: 3,
				luck: 3,
			},
			weapon: "War Spear"
		},
		victory: {
				target: "25-Skeletal Knight End"
		}
	},
	'24b-Flee': {
	  name: '24b-Flee',
		text: "You attempt to flee from the skeleton knight by turning around and jumping down the cliff-like path you previously scaled. Sliding down the stone floor, your speed continues to increase and all hope of controlling your descent evaporates. Both your clothing and skin are ripped from underneath you, causing agonizing pain. Your body collides with a wall, killing you instantly.",
		modifier: { death: true }
	},
	'24d-Skeletal Knight Fight': {
	  name: '24d-Skeletal Knight Fight',
		text: "Gripping your weapon tightly, you stare at the knight with determination in your eyes. You've made it this far, and this is just one last hurdle in your way. \n\n\"It appears that you understand the gravity of your situation. Very well.\" The skeleton steps forward. \"You will die here, and no-one will remember you.\" \n\nThe knight charges.",
		modifier: { fight: true },
		enemy: {
			name: "SKELETAL_KNIGHT",
			stats: {
				health: 140,
				strength: 6,
				defense: 5,
				wisdom: 3,
				luck: 3,
			},
			weapon: "War Spear"
		},
		victory: {
				target: "25-Skeletal Knight End"
		}
	},
	'25-Skeletal Knight End': {
	  name: '25-Skeletal Knight End',
		text: "Exhausted, you strike the final blow against the skeletal knight. The ethereal glow from deep inside its eye sockets extinguish, and it erupts into an arcane explosion. You collapse on the floor. \n\nIt's over. \nYou've won. \n\nBreathing in the cool, fresh air, you allow yourself a few moments of respite. \n\nCollecting yourself and standing victorious once more, you begin your trek towards the horizon in search of civilization. Maybe someone is out there.",
		modifier: { end: true },
	},
	'26-Small Path': {
	  name: '26-Small Path',
		text: "Deciding to venture down the smaller path, you crouch down to pass through the opening. Shifting your weight to your front food, you take a step through the gap but your foot finds nothing. Screaming, you plummet into darkness.",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "26a-Falling"
			}
		]
	},
	'26a-Falling': {
	  name: '26a-Falling',
		text: "After falling for a few seconds, you splash land into a deep body of water. Frantically swimming to the surface, you realize that this must be an old sewage system that was hidden behind the walls of the prison. Cursing the goblin for not imparting this knowledge unto you, you swim to a platform and lift yourself out of the water. \n\nIncredibly, you are unscathed, although any coin you had left must have slipped out of your pocket during your unexpected descent.",
		modifier: { gold: -50 },
		options: [
			{
				label: "Get out of the water",
				target: "27-Sewers"
			}
		]
	},
	'27-Sewers': {
	  name: '27-Sewers',
		text: "Cursing the goblin once more for your misfortune, you suddenly become very aware of the putrid stench that is assaulting your nostrils. Clearly these sewers haven't been maintained in years. You try not to imagine what diseases you may have picked up from swimming in the water. \n\nA distant growl fills the chamber, and reverberates all around you. Whatever made that noise must have heard you fall in. Although you're unsure what direction it came from, you can only assume it lies beyond, through one of the many tunnels around you. \n\nThere are several large sewage pipes around you, however, the only one not blocked by a gate is to your left.",
		modifier: {},
		options: [
			{
				label: "Go into open tunnel",
				target: "28-Gap"
			},
			{
				label: "Search in the water",
				target: "27a-Search"
			},
			{
				label: "Inspect the room",
				target: "27b-Inspect"
			},
			{
				label: "Pry open the gates",
				target: "27c-Pry Gates"
			}
		]
	},
	'27a-Search': {
	  name: '27a-Search',
		text: "You dive head first into the water and swim to the bottom, in the hopes that there might be something of value at the bottom. \n\nYou swim deeper and blindly grab at anything that you can carry. Your hands grab something solid, so you swim back to the surface and over to the platform. You're holding what looks like a large, round, metal disc. It appears that this disc is some kind of talisman, and while you continue to stare at it in wonder it begins to glow. \n\nA brilliant light emits from it, and some form of energy rushes out and into your body. Convulsing, you are lifted into the air. Then, the light dims, and the flow of energy stops. You are gently lowered to the ground and something feels different. \nYou feel stronger. \nYou slip the talisman of strength in your pocket as a keepsake, and leave the room behind with courage coursing through you.",
		modifier: {
			amulet: true,
			strength: 4
		},
		options: [
			{
				label: "Go into open tunnel",
				target: "28-Gap"
			}
		]
	},
	'27b-Inspect': {
	  name: '27b-Inspect',
		text: "Holding your nose, you decide to inspect the room that you find yourself in. The water and waste has long since stopped running, and the ground is heavily soiled. You swallow, and decide to dig through a pile of unidentified material that has piled up in front of a sewage gate. \n\nYour fingers brush against something hard, and you grab at it, thinking it may be some gold or other loot. \n\nYou're wrong. \nThe teeth of a giant rat embed themselves in your forearm, and you recoil back in horror as it leaps out of its hiding place. As you regain your balance, it lunges at you with gnashing teeth.",
		modifier: { fight: true },
		enemy: {
				name: "GIANT_RAT",
				stats: {
					health: 60,
					strength: 4,
					defense: 3,
					wisdom: 1,
					luck: 3,
				},
				weapon: "Teeth"
		},
		victory: {
				target: "27ba-Giant Rat Victory"
		}
	},
	'27ba-Giant Rat Victory': {
	  name: '27ba-Giant Rat Victory',
		text: "The rat slumps to the ground, black ooze dripping out of its mouth. You have killed it, but who knows what disease you now carry. \n\nFurious at your own stupidity, you break apart the hiding place from which the rat emerged in the possibility that something else might lurk there. Although there are no more creatures to be found, it looks as though the rat was collecting items that had fallen into these sewers. You snatch them up and decide to carry on your journey.",
		modifier: {
			head: "Lucky cap",
			luck: 1,
			gold: 7,
			weapon: "War Hammer",
		},
		options: [
			{
				label: "Go into open tunnel",
				target: "28-Gap"
			}
		]
	},
	'27c-Pry Gates': {
	  name: '27c-Pry Gates',
		text: "Although the gates are old, the ancient grime covering them has fossilized over the hinges and no amount of brute force will pry them open. You reevaluate your options.",
		modifier: {},
		options: [
			{
				label: "Go into open tunnel",
				target: "28-Gap"
			},
			{
				label: "Search in the water",
				target: "27a-Search"
			},
			{
				label: "Inspect the room",
				target: "27b-Inspect"
			}
		]
	},
	'28-Gap': {
	  name: '28-Gap',
		text: "Leaving the foul smelling room behind you, you step into the open tunnel, hoping you don't cross paths with whatever made that growl earlier. The tunnel continues winding on, until you come to a fairly wide gap, separating you from the next section of the sewer. It's definitely too far to jump, however, the remains of a narrow pipe juts out in front of you, which looks like it could support your weight.",
		modifier: {},
		options: [
			{
				label: "Go back",
				target: "27-Sewers"
			},
			{
				label: "Jump anyway",
				target: "28a-Death"
			},
			{
				label: "Cross the pipe",
				target: "28b-Pipe Cross"
			},
			{
				label: "Throw weapon over first",
				target: "28c-Throw weapon"
			}
		]
	},
	'28a-Death': {
	  name: '28a-Death',
		text: "Although the gap is too far to jump across, you attempt it anyway. With a running start, you leap from your side of the tunnel, arms outstretched. \n\nYou miss the other side by several feet and fall into the darkness below.",
		modifier: { death: true }
	},
	'28b-Pipe Cross': {
	  name: '28b-Pipe Cross',
		text: "Taking a deep breath before you place a foot on the narrow pipe, you prepare to cross the gap. The darkness looms below you, and you hope that luck is on your side.",
		modifier: {},
		options: [
			{
				label: "Check Your Luck",
				target: "28ba-Check Luck"
			}
		]
	},
	'28ba-Check Luck': {
	  name: '28ba-Check Luck',
		text: "Checking luck...",
		modifier: {
			luckCheck: true,
			event: 3
		}
	},
	'28baa-Gap Slip': {
	  name: '28baa-Gap Slip',
		text: "You slip during your attempt but somehow manage to catch yourself on the pipe. Hanging with nothing below you but uncertain darkness, you try to hoist yourself up.",
		modifier: {},
		options: [
			{
				label: "Check Your Luck",
				target: "28baaa-Gap Slip Check Luck"
			}
		]
	},
	'28baaa-Gap Slip Check Luck': {
	  name: '28baaa-Gap Slip Check Luck',
		text: "Checking luck...",
		modifier: {
			luckCheck: true,
			event: 4
		}
	},
	'28baaa-Gap Death': {
	  name: '28baaa-Gap Death',
		text: "With all your might, you pull yourself up halfway, but your sweaty palms betray you, and your hands slip from the pipe. \n\nYou plummet into darkness, and all light fades away.",
		modifier: { death: true }
	},
	'28baab-Pull up': {
	  name: '28baab-Pull up',
		text: "Mustering all your strength, you pull yourself up onto the pipe and stand up to cross once more. You are now shaking from the physical exertion, and crossing will be noticeably harder.",
		modifier: {},
		options: [
			{
				label: "Check Your Luck",
				target: "28ba-Check Luck"
			}
		]
	},
	'28bab-Gap Success': {
	  name: '28bab-Gap Success',
		text: "With balance and precision, you nimbly cross the pipe and make it to the other side. You glance over your shoulder at the imposing darkness from which you just crossed, and thank the Gods for your luck. You continue on.",
		modifier: {},
		options: [
			{
				label: "Continue",
				target: "29-Manticore"
			}
		]
	},
	'28c-Throw weapon': {
	  name: '28c-Throw weapon',
		text: "Deciding you'll have a much easier time crossing the pipe the lighter you are, you throw your weapon across. It lands easily on the other side, and you feel much more confident about balancing due to the decreased weight. \n\nYou step forward and attempt to cross the pipe.",
		modifier: {},
		options: [
			{
				label: "Check Your Luck",
				target: "28ca-Check Luck"
			}
		]
	},
	'28ca-Check Luck': {
	  name: '28ca-Check Luck',
		text: "Checking luck...",
		modifier: {
			luckCheck: true,
			event: 5
		}
	},
	'29-Manticore': {
	  name: '29-Manticore',
		text: "You resume your journey through the tunnel and it finally reaches a large circular room. Luckily, the bars that would have normally blocked your exit look like they had been torn from their hinges, and now lay to the side. This room is much warmer than the rest of the sewer. \n\nLooking around, you see mounds of something, obscured by the low light, tucked towards the edges of the room. In the gloomy distance, you hear an all too familiar growl. Suddenly, the sconces on the walls ignite with a magical flame, illuminating the beast before you. \n\nA manticore glares at you with its fierce yellow eyes. You had only heard about these in stories told to children, and wonder if you are dreaming. With a hideously human-looking face, it almost looks like it is grinning at you. It steps forward, putting one paw in front of the other, and flexes its bat-like wings. You also catch a glimpse of a scaly tail, tipped with an enormous barb. The manticore shakes its mane and stops a few feet from you, bearing its large fangs. White hot runes glow underneath the fur of the manticore's body, and you realize that it must have used magic to illuminate the room. \n\nA magic manticore. \n\nSurely you must be dreaming.",
		modifier: { fight: true },
		enemy: {
				name: "RUNED_MANTICORE",
				stats: {
					health: 120,
					strength: 6,
					defense: 4,
					wisdom: 5,
					luck: 1,
				},
				weapon: "Rune Strike"
		},
		victory: {
				target: "30-Manticore Victory"
		}
	},
	'30-Manticore Victory': {
	  name: '30-Manticore Victory',
		text: "WIth one last roar, the manticore falls to the floor, dead. \n\nYour mind is still swimming from the realization that you just defeated a creature previously thought to be a myth. The sconces remain lit, as do the runes covering the body of the manticore.",
		modifier: {},
		options: [
			{
				label: "Find an exit",
				target: "31-Undead Beastmaster Fight"
			},
			{
				label: "Make fire and rest",
				target: "30a-Rest"
			},
			{
				label: "Touch Manticore",
				target: "30b-Rune Upgrade"
			},
			{
				label: "Take a trophy",
				target: "30c-Manticore Trophy"
			}
		]
	},
	'30a-Rest': {
	  name: '30a-Rest',
		text: "You craft a fire using some clothing scraps and wood that you found nearby. Lighting it with one of the wall sconces, you sit down and bask in the fire's warm glow. After a short while, you doze off and wake up some time later feeling refreshed. The embers in the fire are still glowing, so you suppose that you couldn't have slept for longer than a few hours. Standing up, you survey your surroundings once more. \n\nThe manticore's body is gone. You hear a hoarse laugh from up ahead.",
			modifier: {
				health: 100
			},
			options: [
				{
					label: "Continue",
					target: "32-Undead Manticore Fight"
				}
			]
	},
	'32-Undead Manticore Fight': {
	  name: '32-Undead Manticore Fight',
		text: "\"So, you're finally awake,\" laughs the voice. \"I could have killed you while you slept, but where's the honor in that?\" \n\nLooking up you see that the voice belongs to a skeletal figure, who has some kind of animal fur draped over its shoulders. It wields a jagged whip at its waist, and standing next to it is... the manticore you killed. \n\nYou can clearly see the wounds that you inflicted upon its human face and its fur is soaked in its own blood, however, its eyes are now glowing with a blue fire. \"I don't appreciate people murdering my children,\" the necro-beastmaster barks, its face now stern. \"It is always such a pain to bring them back.\" The skeleton raises its whip, gives it an almighty crack, and raises a long bony finger in your direction. \n\n\"Attack\". \n\nThe undead manticore leaps towards you.",
		modifier: { fight: true },
		enemy: {
			name: "UNDEAD_MANTICORE",
			stats: {
				health: 80,
				strength: 4,
				defense: 3,
				wisdom: 1,
				luck: 2,
			},
			weapon: "Plague Rune Strike"
		},
		victory: {
			target: "32a-Undead Manticore Victory"
		}
	},
	'32a-Undead Manticore Victory': {
	  name: '32a-Undead Manticore Victory',
		text: "You strike the manticore down once more, but this time you make sure to obliterate its head with a firm stomp of your boot. Hopefully that should stop it from coming back again. \n\n\"MY CHILD!\" screeches the beastmaster. \"I am going to make you suffer, adventurer. Your journey ends here!\"",
		modifier: { fight: true },
		enemy: {
			name: "NECRO_BEASTMASTER",
			stats: {
				health: 110,
				strength: 5,
				defense: 3,
				wisdom: 6,
				luck: 2,
			},
			weapon: "Bladed Whip"
		},
		victory: {
			target: "33-Beastmaster End"
		}
	},
	'30b-Rune Upgrade': {
	  name: '30b-Rune Upgrade',
		text: "Whether as a sign of respect or just to brace yourself, you kneel down and place a hand on the beast's body. \n\nThe runes covering its body begin to emit a slow pulsating light. The runes now begin to slide off the body of the dead beast and climb their way up your arm. You recoil in terror, but it is already too late. \n\nThe runes now circle your entire body like an elaborate tattoo. They shine brightly and your fear quickly dissipates. No wonder the beast was so difficult to kill, these runes were granting it extra special power! \n\nYou breathe in as this new-found power courses through your veins. Gripping your weapon tightly, you look around the room for an exit.",
		modifier: {
			health: 100,
			strength: 3,
			defense: 2,
			wisdom: 1
		},
		options: [
			{
				label: "Continue",
				target: "31-Undead Beastmaster Fight"
			}
		]
	},
	"30c-Manticore Trophy": {
		name: "30c-Manticore Trophy",
		text: "You crouch down by the fell beast, rest a hand upon its flank and prepare your {{weapon}} to take a trophy. Upon touching it, the runes covering its body begin to emit a slow pulsating light. The runes now begin to slide off the body of the dead beast and climb their way up your arm. You recoil in terror, but it is already too late. \n\nThe runes now circle your entire body like an elaborate tattoo. They shine brightly and your fear quickly dissipates. No wonder the beast was so difficult to kill, these runes were granting it extra special power! \n\nYou breathe in as this new-found power courses through your veins. Gripping your weapon tightly, you look around the room for an exit.",
		modifier: {
			health: 100,
			strength: 3,
			defense: 2,
			wisdom: 1
		},
		options: [
			{
				label: "Continue",
				target: "31-Undead Beastmaster Fight"
			}
		]
	},
	'31-Undead Beastmaster Fight': {
	  name: '31-Undead Beastmaster Fight',
		text: "Looking around, it doesn't seem like there is an exit in this room. Surely it couldn't be a dead end? A bright white light, much like the ones that covered the now deceased manticore, emits from the end of the room. A skeletal figure steps through, a beast's fur draped over its shoulders and a jagged whip hanging by its side. \n\n\"You foul beast!\" cries the skeleton as it steps through the portal. \"You have killed one of my most favorite children. Once I have taken your life, I will make sure that its resurrected form will feast on your corpse!\" The necro-beastmaster uncoils its whip, and unleashes an almighty crack. \"You will suffer before the end.\" \n\nThe skeleton attacks.",
		modifier: { fight: true },
		enemy: {
			name: "NECRO_BEASTMASTER",
			stats: {
				health: 160,
				strength: 5,
				defense: 3,
				wisdom: 6,
				luck: 2,
			},
			weapon: "Bladed Whip"
		},
		victory: {
			target: "33-Beastmaster End"
		}
	},
	'33-Beastmaster End': {
	  name: '33-Beastmaster End',
		text: "Striking hard and true, you land the final blow on the beastmaster. Its undead corpse falls to the ground, defeated. \n\nA small roll of parchment, previously hidden under its fur cloak, falls to the ground at your feet. You unroll it and see that it is an incantation for a portal out of here. You recite the words on the parchment, and a portal opens up behind you. Taking one look back at the beastmaster and its manticore, you can't help but feel a pang of sorrow for their cursed existences. Hopefully you brought their souls some peace. \n\nYou step through the portal.",
		modifier: { end: true }
	},
	'00-Death': {
	  name: '00-Death',
		text: "Despite your best efforts, you have fallen at the hands of your foe.",
		modifier: { death: true }
	}
}


export default storylines;