/**
 * Game translator who carries all dialogs
 */

const GAMELANGUAGES = ["es","pt"]
GAMELANGUAGE = 0;


const GAMEROOM = {
	hall     : ["Hall", "Corredor"],
	apartment: ["Apartment", "Apartamento"],
	terrace  : ["Terrace", "Terraço"],
	exit     : ["Exit", "Saída"]
}


const GAMEITEM = {
	clip: {
		name: ["Clip", "Grampo"],
		desc: [
			"A simple clip, usseful for opening locks.",
			"Um grampo simples, útil para abrir trancas."]
	},
	floorkey: {
		name: ["Floor Key", "Chave do Andar"],
		desc: [
			"Key that opens the way to the next floor.",
			"Chave que abre o caminho para o próximo andar."]
	},
	wrinkledbook: {
		name: ["Wrinkled Book", "Livro Amassado"],
		desc: [
			"Notebook with pages about chemistry, the notebook is covered with red spots on the pink pages.",
			"Caderno com páginas sobre química, o caderno está coberto de manchas vermelhas nas páginas cor de rosa."]
	},
	wrinkledsheet: {
		name: ["Wrinkled Sheet", "Folha Amassada"],
		desc: [
			"Pink sheet now stained red, only a few words are legible: \"...forgive me for...\""+
				" \"...i swear to meet you again...\" \"...i don't feel my legs anymore after they...\"",
			"Folha cor de rosa agora manchada de vermelho, apenas algumas palavras são legíveis: \"...me desculpe por...\""+
				" \"...eu juro te encontrar novamente...\" \"...eu não sinto mais minhas pernas depois que eles...\""]
	},
	diarypage: {
		name: ["Diary Page", "Página de Diário"],
		desc: [
			"\"...it seems that they cant' open doors despite they react to sound, i cannot find the exit, "+
				"maybe i left something behind or spent what i shouldn't have...\"",
			"\"...parece que eles não conseguem abrir portas apesar deles reagirem a som, não consigo encontrar a saída, "+
				"talvez eu tenha deixado algo para trás ou gasto o que não devia...\""]
	}
};


const GAMENPCDIALOG = {
	npc01: [
		["Now that the world is upside down it is each one for himself.",
		 "Resources are scarce, kindness can mean being killed.",
		 "Just get out."],
		["Agora que o mundo está de cabeça para baixo é cada um por si.",
		 "Os recursos são escassos, bondade pode significar ser morto.",
		 "Apenas dê o fora."]
	],
	npc02: [
		["I'm not so young anymore to be able to help you.",
		 "We'd better be apart, for the safety of both of us.",
		 "My younger brother lives upstairs, he would be the best help."],
		["Eu já não sou mais tão jovem para poder te ajudar.",
		 "É melhor ficarmos separados, para a segurança de nós dois.",
		 "Meu irmão mais novo mora no andar de cima, ele seria de melhor ajuda."]
	],
	npc03: [
		["I don't have time to take care of you, just get out.",
		 "You are not welcome.",
		 "I don't have resources to share."],
		 ["Eu não tenho tempo para cuidar de você, apenas saia.",
			"Você não é bem vindo.",
			"Não tenho recursos para dividir."]
	],
	npc04: [
		["Form a moment i thought they were able to open the door, you better go check it out again.",
		 "Maybe you should look on the other floors, there's nothing else here.",
		 "My older brother lives in this building too, please see if he is okay."],
		 ["Por um momento achei que eles conseguiram abrir a porta, é melhor você ir lá checar de novo.",
			"Talvez você devesse procurar nos outros andares, aqui não tem mais nada.",
			"Meu irmão mais velho mora nesse prédio também, por favor veja se ele está bem."]
	],
	npc05: [
		["I hope she is well...",
		 "..."],
		["Espero que ela esteja bem...",
		 "..."]
	],
	npc06: [
		["I thought it was safe here.",
		 "..."],
		["Eu pensei que aqui estaria seguro.",
		 "..."]
	]
}


const GAMEMESSAGE = {
	action: {
		inspect: {
			name : ["Inspect", "Observar"],
			quote: {
				terrace: [
					"The only way out.",
					"A única saída"],
				hall: [
					"Only the entrance hall of the apartments.",
					"Apenas o corredor de entrada dos apartamentos."],
				emptyroom: [
					["There is no noise coming form the inside.",
					 "There doesn't seem to be anyone in there.",
					 "You knock on the door, but no one answers."],
					["Não há nenhum barulho vindo de dentro.",
					 "Não parece haver ninguém lá dentro.",
					 "Você bate na porta, mas ninguém responde."]
				],
				zombieroom: [
					["You hear sounds of footsteps dragging on the floor.",
					 "Someone is grunting inside.",
					 "You knock on the door, someone knocks back."],
					["Você ouve sons de passos arrastados no chão.",
					 "Alguém está grunhindo lá dentro.",
					 "Você bate na porta, alguém bate de volta."]
				]
			}
		},
		enter: {
			name : ["Enter", "Entrar"],
			quote: {
				die: [
					"There was one where you were, what a pity, someone will remain in your place.",
					"Havia um deles onde você estava, que pena, alguém continuará no seu lugar."],
				founditem: [
					"Some supplies are left there, some things seem useful.",
					"Alguns suprimentos restaram aqui, algumas coisas parecem úteis."],
				foundnpc: [
					"There is only one person inside hidden, he sends you away.",
					"Há apenas uma pessoa dentro escondida, ela te manda embora."],
				nothing: [
					"There's nothing here.",
					"Não há nada aqui."]
			}
		},
		unlock: {
			name : ["Unlock Door", "Destrancar Porta"],
			quote: {
				success: [
					"You unlock the door, but the clip broke.",
					"Você destrancou a porta, mas o grampo quebrou."],
				failed: [
					"There is nothing that can be used to unlock the door.",
					"Não há nada que possa ser usado para destrancar a porta."]
			}
		},
		lurein: {
			name : ["Lure in", "Atrair para dentro"],
			quote: [
				"You lure him, and he seems to be busy with the other person now, before you leave you take:",
				"Você o atraiu, e ele parece estar ocupado com a outra pessoa agora, antes de sair você pega:"]
		},
		lureout: {
			name : ["Lure out", "Atrair para fora"],
			quote: [
				"",
				""]
		},
		moveup: {
			name : ["Climb Stairs", "Subir Escadas"],
			quote: [
				"You go up the stairs, towards the next floor.",
				"Você sobe as escadas, rumo ao próximo andar."]
		},
		exit: {
			name : ["Exit", "Saída"]
		}
	},
	message: {
		start: [
			"Few things are useful in the now devastated cities,<br>"+
				" but a building's terrace looks like a good place.<br>Climb the floors to the top.",
			"Poucas coisas são úteis nas cidades agora devastadas,<br>"+
				" mas o terraço de um prédio parece um bom lugar.<br>Suba os andares até o topo."],
		die: [
			"One of them caught you while you were distracted, what a pity, someone will remain in your place.",
			"Um deles te pegou enquanto você estava distraído, que pena, alguém continuará no seu lugar."],
		moveup: [
			"Moving to next floor...",
			"Indo para o próximo andar..."],
		end: [
			"Freedom scares you, but you decide to leave.<br> Thanks for rising.",
			"A liberdade te assusta, mas você decide sair.<br> Obrigado por (se) jogar."]
	},
	menu: {
		language : ["Language: English", "Idioma: Português"],
		start    : ["Play", "Jogar"],
		credits  : [
			"By. Yurius564 - it is recommended to play on Chrome.",
			"By. Yurius564 - recomenda-se jogar no Chrome."],
		inventory: ["inventory", "inventário"],
		comments : ["comments", "observações"],
		action   : ["actions", "ações"]
	},
	misc: {
		thedooris: ["The door is ", "A porta está "],
		locked   : ["locked. ", "trancada. "],
		unlocked : ["unlocked. ", "destrancada. "],
		founditem: ["You Found:", "Você encontrou:"],
		floor    : ["º floor", "º andar"]
	}
}



function setLanguage(lang){
	if(typeof(lang) == "number") {
		GAMELANGUAGE = lang;
		return GAMELANGUAGES[lang];
	}
	else {
		GAMELANGUAGE = GAMELANGUAGES.indexOf(lang);
		return GAMELANGUAGES.indexOf(lang);
	}
}