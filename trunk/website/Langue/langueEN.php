 <?php
	header( 'content-type: text/html; charset=utf-8' ); 
	
	//---------------------------------------------------------
	// PLAY THE GAME BUTTON
	//---------------------------------------------------------
	define('TXT_PLAY_BUTTON',"<p>Play the game </p><p>Now</p>");
	
	//---------------------------------------------------------
	// MAIN NAV
	//---------------------------------------------------------
	define('TXT_NAV_NEWS', 'News');
	define('TXT_NAV_RULES', 'Rules');
	define('TXT_NAV_MAPS', 'Maps');
	define('TXT_NAV_ABOUT', 'About');
	define('TXT_NAV_LANGUE', "<a href='?lang=fr'> French </a>");
	
	//---------------------------------------------------------
	// SLOGAN
	//---------------------------------------------------------
	define('TXT_SLOGAN', 'Time to be crushed');
	
	//---------------------------------------------------------
	// CHARACTERS SLIDESHOW
	//---------------------------------------------------------
	define('TXT_PLAYERS', "The Players");
	define('TXT_CHOOSE', "Choose yours");
	define('TXT_IFRAME_LANGUE', "en");
	define('TXT_RED', "Profoundly narcissistic creature who cannot stop embracing himself. Living in gloques and unhealthy places of this world, where he can live openly his vices and bad urges.");
	define('TXT_YELLOW', "Shy creature with not much insurance. Hides himself in his precious shell, to help him live in this cruel world.");
	define('TXT_BLUE', "Special humanoid, whimsical who's constantly daydreaming. He oozes happiness and serenity. His lost arms didn't affect at all his joy of living.");	
	define('TXT_WHITE', "Highly Greedy ; his sin of gluttony forced him to eat himself. He will never stop until he gets no more the opportunity to be delighted of his own flesh.");
	
	//---------------------------------------------------------
	// NEWS
	//---------------------------------------------------------
	// article 01 //
	define('TXT_NEWS_ARTICLE01', "	<h2>New website launched</h2> 
									<i>may 01, 2014</i>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sapien orci, elementum fringilla metus id, consectetur lacinia neque. Duis semper tortor arcu, nec ornare dolor volutpat lacinia. Suspendisse mollis sapien lectus, sed porttitor neque tincidunt vel. Praesent ullamcorper mi id facilisis eleifend. Quisque ultricies vulputate tortor sed sollicitudin.</p>
									<a href='#' >read all [ + ]</a>");
	// article 02 //
	define('TXT_NEWS_ARTICLE02',"	<h2>New skills blocks available</h2> 
									<i>may 05, 2014</i>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sapien orci, elementum fringilla metus id, consectetur lacinia neque. </p>
									<p>Duis semper tortor arcu, nec ornare dolor volutpat lacinia. Suspendisse mollis sapien lectus, sed porttitor neque tincidunt vel. </p>
									<a href='#rules'>see the new block [ + ]</a>");
	// article 03 //
	define('TXT_NEWS_ARTICLE03',"	<h2>New map event created</h2> 
									<i>may 11, 2014</i>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sapien orci, elementum fringilla metus id, consectetur lacinia neque. Duis semper tortor arcu, nec ornare dolor volutpat lacinia. Suspendisse mollis sapien lectus, sed porttitor neque tincidunt vel. Praesent ullamcorper mi id facilisis eleifend.</p>
									<a href='#maps'>see the new map event [ + ]</a>");
	
	//---------------------------------------------------------
	// RULES
	//---------------------------------------------------------
	/* The Hud */
	define('TXT_HUD','The Hud');
	define('TXT_BUY_MODE','Buy Mode');
	define('TXT_UNITS_COUNTER','Units Counter');
	define('TXT_SKILL_BLOCKS','Skill blocks');
	define('TXT_ACTUAL_BLOCK','Actual block to drops');
	define('TXT_NEXT_BLOCK','Next block to drops');
	define('TXT_PICKAXES','Pickaxes');
	define('TXT_INVENTORY_01','Inventory 01');
	define('TXT_INVENTORY_02','Inventory 01');
	/* Basic rules */
	define('TXT_BASIC_RULES','Basic rules');
	define('TXT_RULES_01','The goal is to reach the cursed ball in the sky by dropping blocks.');
	define('TXT_RULES_02','Once, one of the player reach the goal, he can use the overlord to destroy the others. The winner gets 10 sec to destroy all his opponent. He’ll gets an higher score if he destroys all of them in the allowed time.');
	define('TXT_RULES_03',"3 or more same colored blocks in contact will vanished.");
	define('TXT_RULES_04',"2 complementary blocks in contact will vanished.");
	define('TXT_RULES_04_CHROMATIC_CIRCLE',"You don’t remember your chromatic circle ?");
	define('TXT_RULES_04_CLICK_HERE',"Click here");
	define('TXT_RULES_05',"To get complementary blocks, you need to drop your block on another player. By doing that, all your blocks will turn into complementary blocks. So if yellow Kills blue, all yellow’s blocks will turn into orange block. ");
	define('TXT_RULES_06',"Gray block are neutral. Can only be destroyed by skills block or pickaxe.");
	define('TXT_RULES_07',"Pickaxes can be used to destroy any kind of blocks. Appear at 10 sec of interval. There’s a maximum of 2 at the same time.");
	define('TXT_RULES_08',"To reach your goal easily, you can drop your blocks on another player. It will gives you a spawn blocks and will allow you to spawn your victim wherever you want. Work as well with multiple kill.");
	/* Skill Blocks*/
	define('TXT_SKILL_BLOCKS_RULES',"To get those skill blocks, before joining a lobby, you need to go to the <b>skills menu</b> and select the skills you want for the match. However you’ll play without any special blocks. There is a maximum of <b>4</b> skills per match. ");
	/* Units */
	define('TXT_UNITS',"Units");
	define('TXT_UNITS_DESCRIPTION',"To buy skill blocks during a game, you need units. How do we get units ? Well, you gain units <b>during all the game</b>. There is one simple rule to know :");
	define('TXT_UNITS_RULES',"A colored block will generates units as long as it exist. A complementary one remove units. ");
	define('TXT_UNITS_BUY_MODE',"Also, there is two differents ways to buy your skill blocks during a game : ");
	define('TXT_UNITS_POWER_MODE_01',"Power mode");
	define('TXT_UNITS_POWER_MODE_02',"It boost the power of a bought skill.");
	define('TXT_UNITS_QUANTITY_MODE_01',"Quantity mode");
	define('TXT_UNITS_QUANTITY_MODE_02',"It boost his percent of apparition when buying the block skill.");
	
	//---------------------------------------------------------
	// ABOUT
	//---------------------------------------------------------
	/* The creator */
	define('TXT_ABOUT_CREATOR_TITLE',"The creator ");
	define('TXT_ABOUT_CREATOR_01'," Hi,I am a gamer driven by a passion for original games who's trying to bring something to an already huge industry by developping stuff based on new concepts. Originality without quality and enjoyment doesn't worth it, yet I want to create games with different and funny gameplay to fulfill my own thirst for diversity.");
	define('TXT_ABOUT_CREATOR_02'," I'm currently working in Quebec City (Canada) as the lone developer of <b>Another piece</b> Studio and I'm open to timely application to form a team of innovative people.");
	define('TXT_ABOUT_CREATOR_03',"You can contact me by writting to this email address if you have any interest:  ");
	define('TXT_ABOUT_CREATOR_04',". However, for now, I don't have anything to ensure employee (not even mine), but any profit will be invested back into the business in staff and stuff.");
	
	/* The project */
	define('TXT_ABOUT_PROJECT_TITLE',"The project");
	define('TXT_ABOUT_PROJECT_01',"Crushed Dream is my first creation majorly developed by myself, as a lone wolf. The principle is simple : players must crush one another in a frantic ascent toward the Winning Goal. Once reached, the winner must prove is supremacy by killing the survivors.");
	define('TXT_ABOUT_PROJECT_02',"Some people help me throughout the development for some game aspects and I thank them all in my in-game credits. This game is my spearhead to show to my futur teammates which kind of games I love to conceptualize and is also an opportunity for the gamers community to discover new gameplays for long-time existing game styles, but with a new twist. ");
	define('TXT_ABOUT_PROJECT_03',"I would like to build a core community around this game by releasing new content over time, thereby encouraging players to come back often to try newly delivered skills/features. I didn't opt for the most profitable business model for this game and I even would like to release it for free, but I aim to invest back gains into Crushed Dream's servers and, if the game becomes successful, in a new project where I won't be the only developer. I don't wish to compromise gameplay over a business model that milks players out of their money, being myself a player hating that kind of shit. Crushed Dream's cost will eventually raise progressively over time, when new features will be released,  but I will maintain it cheap, because an excessive cost wouldn't be justified for a game of this magnitude. There is an hope in a not so distant futur that I will accept players' requests for new content that they will have imagined, but for now, my head is filled with undeveloped ideas.");
	define('TXT_ABOUT_PROJECT_04',"Here what I would like to add in the next months: ");
	define('TXT_ABOUT_PROJECT_LIST_01',"Map events ;");
	define('TXT_ABOUT_PROJECT_LIST_02',"Leagues (if there are enough players to classify them) ;");
	define('TXT_ABOUT_PROJECT_LIST_03',"A new kind of block (Util Block) ;");
	define('TXT_ABOUT_PROJECT_LIST_04',"Dynamic music accelerating over ascent ;");
	define('TXT_ABOUT_PROJECT_LIST_05',"More characters ;");
	define('TXT_ABOUT_PROJECT_LIST_06',"Special move specific to each character ;");
	define('TXT_ABOUT_PROJECT_LIST_07',"Ect. ");
	
	/* Download button */
	define('TXT_DOWNLOAD_BOTTOM',"Download Crushed Dream ");
	
	//---------------------------------------------------------
	// FOOTER
	//---------------------------------------------------------
	/* Top button */
	define('TXT_NAV_TOP','Top');
	
	/* Copyright */
	define('TXT_FOOTER_COPYRIGHT','Copyright © Crushed Dream 2014  . All Rights Reserved.');
	define('TXT_FOOTER_DESIGN_BY','Website design by: ');
	
	//---------------------------------------------------------
	// ADAPTATIV CSS ACCORDING TO LANGUAGE
	//---------------------------------------------------------
	define('SLOGAN_WIDTH',"430px");
	define('NEWS_WIDTH',"150px");
	define('RULES_WIDTH',"150px");
	define('MAPS_WIDTH',"160px");
	define('ABOUT_WIDTH',"180px");
	
?>