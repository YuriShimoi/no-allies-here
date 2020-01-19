var selected = "";
var gametextloop;
var textrunnigflag = 0;
var inventory;

function makeGuest(dialog, loot){
	var guest = {
		dialog: dialog,
		loot: loot
	}
	return guest;
}

function makeRoom(name, is_lock=false, loot=false, guest=false, has_zombie=false, observed=false){
	
	var room = {
		name:    name,
		locked:  is_lock,
		zombie:  has_zombie,
		guest:   guest,
		loot:    loot,
		observed: observed
	};

	return room;
}

function generateRooms(level){
	rooms = [];
	rooms.push(makeRoom(GAMEROOM.hall[GAMELANGUAGE]));
	var roomitem;

	switch(level){
	case 1: // ===========================================================================
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 11"));
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 12", false, false, false, true));

		roomitem = {};
		roomitem[GAMEITEM.clip.name[GAMELANGUAGE]] = 1;
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 13", false, roomitem));
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 14"));

		roomitem = {};
		roomitem[GAMEITEM.floorkey.name[GAMELANGUAGE]] = 1;
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 15", true, roomitem));
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 16"));
		break;
	case 2: // ===========================================================================
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 21", false, false, false, true));
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 22", true));
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 23"));

		roomitem = {};
		roomitem[GAMEITEM.clip.name[GAMELANGUAGE]] = 1;
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 24", false, roomitem));
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 25"));

		roomitem = {};
		roomitem[GAMEITEM.floorkey.name[GAMELANGUAGE]] = 1;
		var keyguest = makeGuest(GAMENPCDIALOG.npc01[GAMELANGUAGE], roomitem);
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 26", true, false, keyguest));
		break;
	case 3: // ===========================================================================
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 31", true, false, false, true));
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 32"));

		roomitem = {};
		roomitem[GAMEITEM.clip.name[GAMELANGUAGE]] = 1;
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 33", true, roomitem));
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 34"));

		roomitem = {};
		roomitem[GAMEITEM.floorkey.name[GAMELANGUAGE]] = 1;
		var keyguest = makeGuest(GAMENPCDIALOG.npc02[GAMELANGUAGE], roomitem);
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 35", true, false, keyguest));
		roomitem = {};
		roomitem[GAMEITEM.clip.name[GAMELANGUAGE]] = 2;
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 36", false, roomitem));
		break;
	case 4: // ===========================================================================
		roomitem = {};
		roomitem[GAMEITEM.floorkey.name[GAMELANGUAGE]] = 1;
		var keyguest = makeGuest(GAMENPCDIALOG.npc03[GAMELANGUAGE], roomitem);
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 41", true, false, keyguest));
		
		roomitem = {};
		roomitem[GAMEITEM.clip.name[GAMELANGUAGE]] = 1;
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 42", false, roomitem));
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 43"));

		roomitem = {};
		roomitem[GAMEITEM.clip.name[GAMELANGUAGE]] = 1;
		var guest = makeGuest(GAMENPCDIALOG.npc04[GAMELANGUAGE], roomitem);
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 44", false, false, guest));

		roomitem = {};
		roomitem[GAMEITEM.wrinkledbook.name[GAMELANGUAGE]] = 1;
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 45", true, roomitem));
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 46", false, false, false, true));
		break;
	case 5: // ===========================================================================
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 51"));
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 52", true, false, false, true));

		roomitem = {};
		roomitem[GAMEITEM.wrinkledsheet.name[GAMELANGUAGE]] = 1;
		var guest = makeGuest(GAMENPCDIALOG.npc05[GAMELANGUAGE], roomitem);
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 53", false, false, guest));
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 54"));

		roomitem = {};
		roomitem[GAMEITEM.floorkey.name[GAMELANGUAGE]] = 1;
		var keyguest = makeGuest(GAMENPCDIALOG.npc06[GAMELANGUAGE], roomitem);
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 55", true, false, keyguest));
		
		roomitem = {};
		roomitem[GAMEITEM.diarypage.name[GAMELANGUAGE]] = 1;
		rooms.push(makeRoom(GAMEROOM.apartment[GAMELANGUAGE]+" 56", false, roomitem));

		break;
	case 6: // ===========================================================================
		// terrace
		rooms = [makeRoom(GAMEROOM.exit[GAMELANGUAGE])];
		break;
	}
	return rooms;
}


function makeDialog(text, speed=100){
	clearTimeout(gametextloop);
	$("#dialog-text").html("");
	textrunnigflag += 1;
	var myflag = textrunnigflag;

	speed = speed<1?1000:speed>100?10:1000/speed;
	
	function appendDialog(text, myflag){
		if(myflag != textrunnigflag)
			return;
		
		$("#dialog-text").append(text);
	}

	for(var i in text){
		gametextloop = setTimeout(appendDialog, speed*i, text[i], myflag);
	}
}


function fillInventory(inventory){
	var list = $("#items-list");
	
	var html = "";
	for(var i in inventory){
		html += "<li class='item' item='" + i + "'>"+
							i + " <span class='item-qnt'>x" + inventory[i] + "</span>" +
						"</li>";
	}
	list.append(html);
	
	
	$("#items-list .item").click(function(){
		item = $(this).attr("item");
		switch(item){
			case GAMEITEM.clip.name[GAMELANGUAGE]:
				makeDialog(GAMEITEM.clip.desc[GAMELANGUAGE], 40);
				break;
			case GAMEITEM.floorkey.name[GAMELANGUAGE]:
				makeDialog(GAMEITEM.floorkey.desc[GAMELANGUAGE], 40);
				break;
			case GAMEITEM.wrinkledbook.name[GAMELANGUAGE]:
				makeDialog(GAMEITEM.wrinkledbook.desc[GAMELANGUAGE], 30);
				break;
			case GAMEITEM.wrinkledsheet.name[GAMELANGUAGE]:
				makeDialog(GAMEITEM.wrinkledsheet.desc[GAMELANGUAGE], 30);
				break;
			case GAMEITEM.diarypage.name[GAMELANGUAGE]:
				makeDialog(GAMEITEM.diarypage.desc[GAMELANGUAGE], 30);
				break;
		}
	});
}
function putInventory(items, inventory){
	var invmessage = GAMEMESSAGE.misc.founditem[GAMELANGUAGE];

	for(var i in items){
		if(Object.keys(inventory).includes(i)){
			inventory[i] += items[i];
		}
		else {
			inventory[i] = items[i];
		}

		invmessage += "<br> " + i + " x" + items[i];
	}
	message(invmessage);

	return inventory;
}
function clearInventory(){
	$("#items-list").html("");
}


function fillRooms(rooms){
	var list = $("#rooms-list");
	

	var html = "";
	for(var i in rooms){
		html += "<li class='room' room='" + rooms[i].name + "'>"+
							rooms[i].name +
						"</li>";
	}
	list.append(html);
}
function clearRooms(){
	$("#rooms-list").html("");
}


function fillActions(room, inventory, zombie_here){
	var actions = [GAMEMESSAGE.action.inspect.name[GAMELANGUAGE]];

	if(selected == GAMEROOM.exit[GAMELANGUAGE]){
		actions.push(GAMEMESSAGE.action.exit.name[GAMELANGUAGE]);
	}
	else{
		if(selected == GAMEROOM.hall[GAMELANGUAGE]){
			if(Object.keys(inventory).includes(GAMEITEM.floorkey.name[GAMELANGUAGE])){
				if(inventory[GAMEITEM.floorkey.name[GAMELANGUAGE]] > 0){
					actions.push(GAMEMESSAGE.action.moveup.name[GAMELANGUAGE]);
				}
			}
		}
		else{
			if(room.locked){
				if(Object.keys(inventory).includes(GAMEITEM.clip.name[GAMELANGUAGE])){
					actions.push(GAMEMESSAGE.action.unlock.name[GAMELANGUAGE]);
				}
			}
			else {
				actions.push(GAMEMESSAGE.action.enter.name[GAMELANGUAGE]);
			}
	
			if(room.observed && !room.locked && room.zombie){
				actions.push(GAMEMESSAGE.action.lureout.name[GAMELANGUAGE]);
			}
	
			if(!room.locked && room.guest && zombie_here){
				actions.push(GAMEMESSAGE.action.lurein.name[GAMELANGUAGE]);
			}
		}
	}


	var html = "";
	for(var i in actions){
		html += "<li class='action' action='" + actions[i] + "'>"+
							actions[i] +
						"</li>";
	}
	$("#actions-list").append(html);
}
function clearActions(){
	$("#actions-list").html("");
}


function clearAll(){
	$(".game-list").html("");
}


function loadFloor(level, inventory={}){
	var zombie_here = false;
	clearAll();

	$("#level-title").text(level + GAMEMESSAGE.misc.floor[GAMELANGUAGE]);
	loadTransition(GAMEMESSAGE.message.moveup[GAMELANGUAGE]);
	if(level == 6){
		$("#level-title").text(GAMEROOM.terrace[GAMELANGUAGE]);
	}
		
	var rooms = generateRooms(level);
	fillRooms(rooms);
	fillInventory(inventory);

	$("#rooms-list .room").click(function(){
		$("#rooms-list .room").removeClass("room-selected");
		$(this).addClass("room-selected");

		selected = $(this).attr("room");

		var dialog = "";
		var speeddialog = 40;
		if(selected == GAMEROOM.exit[GAMELANGUAGE]){
			makeDialog(GAMEMESSAGE.action.inspect.quote.terrace[GAMELANGUAGE], 10);
			
			clearActions();
			fillActions(rooms[0], inventory, zombie_here);
		}
		else {
			var r = 0;
			for(r in rooms){
				if(rooms[r].name == selected){
					break;
				}
			}
	
			if(rooms[r].observed){
				if(selected == GAMEROOM.hall[GAMELANGUAGE]){
					dialog = GAMEMESSAGE.action.inspect.quote.hall[GAMELANGUAGE];
				}
				else{
					dialog += GAMEMESSAGE.misc.thedooris[GAMELANGUAGE];
					if(rooms[r].locked){
						dialog += GAMEMESSAGE.misc.locked[GAMELANGUAGE];
					}
					else{
						dialog += GAMEMESSAGE.misc.unlocked[GAMELANGUAGE];
					}
					
					var quotes;
					if(rooms[r].zombie){
						// just a zombie
						quotes = GAMEMESSAGE.action.inspect.quote.zombieroom[GAMELANGUAGE];
					}
					else{
						// has a guest or nothing here
						quotes = GAMEMESSAGE.action.inspect.quote.emptyroom[GAMELANGUAGE];
					}
					dialog += quotes[Math.floor(Math.random() * quotes.length)];
				}
			}
			else {
				if(selected == GAMEROOM.hall[GAMELANGUAGE]){
					dialog += "...";
				}
				else{
					dialog += GAMEMESSAGE.misc.thedooris[GAMELANGUAGE];
					if(rooms[r].locked){
						dialog += GAMEMESSAGE.misc.locked[GAMELANGUAGE];
					}
					else{
						dialog += GAMEMESSAGE.misc.unlocked[GAMELANGUAGE];
					}
				}
			}
			
			makeDialog(dialog, 40);
			
			clearActions();
			fillActions(rooms[r], inventory, zombie_here);
		}


		$("#actions-list .action").click(function(){
			var action = $(this).attr("action");
			var this_room = $(".room[room='"+selected+"']");
			var corredor = $(".room[room='Corredor']");

			var r = 0;
			for(r in rooms){
				if(rooms[r].name == selected){
					break;
				}
			}

			switch(action){
				case GAMEMESSAGE.action.inspect.name[GAMELANGUAGE]:
					rooms[r].observed = true;
					if(rooms[r].zombie){
						this_room.addClass("zombie-here");
					}

					break;
				case GAMEMESSAGE.action.enter.name[GAMELANGUAGE]:
					// die for a zombie or collect items
					rooms[r].observed = true;
					if(rooms[r].zombie){
						// die
						gameover(GAMEMESSAGE.action.enter.quote.die[GAMELANGUAGE]);
						return;
					}
					if(rooms[r].loot){
						// take room loot
						inventory = putInventory(rooms[r].loot, inventory);
						rooms[r].loot = false;

						clearInventory();
						fillInventory(inventory);
						break;
					}
					if(rooms[r].guest){
						// talk to guest
						var dialog = rooms[r].guest.dialog[Math.floor(Math.random() * rooms[r].guest.dialog.length)];
						message(GAMEMESSAGE.action.enter.quote.foundnpc[GAMELANGUAGE] + "<br> - " + dialog);

						break;
					}
					message(GAMEMESSAGE.action.enter.quote.nothing[GAMELANGUAGE]);

					break;
				case GAMEMESSAGE.action.unlock.name[GAMELANGUAGE]:
					// use grampo to open the room
					if(Object.keys(inventory).includes(GAMEITEM.clip.name[GAMELANGUAGE])){
						if(inventory[GAMEITEM.clip.name[GAMELANGUAGE]] > 0){
							inventory[GAMEITEM.clip.name[GAMELANGUAGE]] -= 1;
							clearInventory();
							fillInventory(inventory);
							rooms[r].locked = false;

							message(GAMEMESSAGE.action.unlock.quote.success[GAMELANGUAGE]);
						}
						else {
							message(GAMEMESSAGE.action.unlock.quote.failed[GAMELANGUAGE]);
						}
					}
					break;
				case GAMEMESSAGE.action.lureout.name[GAMELANGUAGE]:
					// zombie go to corredor
					this_room.removeClass("zombie-here");
					corredor.addClass("zombie-here");
					rooms[r].zombie = false;

					zombie_here = true;
					break;
				case GAMEMESSAGE.action.lurein.name[GAMELANGUAGE]:
					// zombie go to room
					rooms[r].observed = true;
					this_room.addClass("zombie-here");
					corredor.removeClass("zombie-here");
					rooms[r].zombie = true;

					var items_found = "";

					for(var i in rooms[r].guest.loot){
						if(Object.keys(inventory).includes(i)){
							inventory[i] += rooms[r].guest.loot[i];
						}
						else {
							inventory[i] = rooms[r].guest.loot[i];
						}

						items_found += "<br> " + i + " x" + rooms[r].guest.loot[i];
					}

					message(GAMEMESSAGE.action.lurein.quote[GAMELANGUAGE] + items_found);

					rooms[r].guest = false;
					clearInventory();
					fillInventory(inventory);

					zombie_here = false;
					break;
				case GAMEMESSAGE.action.moveup.name[GAMELANGUAGE]:
					// next level
					level += 1;
					inventory[GAMEITEM.floorkey.name[GAMELANGUAGE]] -= 1;
					message(GAMEMESSAGE.action.moveup.quote[GAMELANGUAGE]);
					loadFloor(level,inventory);
					break;
				case GAMEMESSAGE.action.exit.name[GAMELANGUAGE]:
					gameover(GAMEMESSAGE.message.end[GAMELANGUAGE]);
					break;
			}

			if(action != GAMEMESSAGE.action.lureout.name[GAMELANGUAGE] && zombie_here){
				gameover(GAMEMESSAGE.message.die[GAMELANGUAGE]);
				return;
			}

			$(".room[room='" + selected + "']").trigger("click");
		});
	});


	if(level < 6){
		$(".room[room='"+GAMEROOM.hall[GAMELANGUAGE]+"']").trigger("click");
	}
	else{
		$(".room[room='"+GAMEROOM.exit[GAMELANGUAGE]+"']").trigger("click");
	}
}

function gotoStartMenu(){
	$("#game-start-menu").removeAttr("hidden");
}

function gameover(overmessage){
	message(overmessage,gotoStartMenu);
}




$("#language-set").click(function(){
	var nextlang = (GAMELANGUAGE + 1) % GAMELANGUAGES.length;
	setLanguage(GAMELANGUAGES[nextlang]);
	
	$(this).html(GAMEMESSAGE.menu.language[GAMELANGUAGE]);
	$("#start-button").html(GAMEMESSAGE.menu.start[GAMELANGUAGE]);
	$("#credits").html(GAMEMESSAGE.menu.credits[GAMELANGUAGE]);
	$("#inventory-title").html(GAMEMESSAGE.menu.inventory[GAMELANGUAGE]);
	$("#action-title").html(GAMEMESSAGE.menu.action[GAMELANGUAGE]);
	$("#comments-title").html(GAMEMESSAGE.menu.comments[GAMELANGUAGE]);
});


$("#start-button").click(function(){
	$("#game-start-menu").attr("hidden",true);

	// START ALL
	message(GAMEMESSAGE.message.start[GAMELANGUAGE]);
	loadFloor(1);
});