 <?php
	header( 'content-type: text/html; charset=utf-8' );
	//---------------------------------------------------------
	// WEBSITE TITLE
	//---------------------------------------------------------
	define('TXT_TITLE','Crushed Dream');
	
	//---------------------------------------------------------
	// PLAY THE GAME BUTTON
	//---------------------------------------------------------
	define('TXT_PLAY_BUTTON',"<p style='margin:-5px 0 0px;font-size:25px'>Jouer au jeu </p><p style='font-size:95px;letter-spacing:3px;'>ICI</p>");
	
	//---------------------------------------------------------
	// MAIN NAV
	//---------------------------------------------------------
	define('TXT_NAV_NEWS', 'Nouvelles');
	define('TXT_NAV_RULES', 'Règlements');
	define('TXT_NAV_MAPS', 'Mondes');
	define('TXT_NAV_ABOUT', 'À propos');
	define('TXT_NAV_LANGUE', "<a href='?lang=en'> English </a>");
	
	//---------------------------------------------------------
	// SLOGAN
	//---------------------------------------------------------	
	define('TXT_SLOGAN', "Écrasement en vue");
	
	//---------------------------------------------------------
	// CHARACTERS SLIDESHOW
	//---------------------------------------------------------
	define('TXT_PLAYERS', "Les personnages");
	define('TXT_CHOOSE', "Choisis le tiens");
	define('TXT_IFRAME_LANGUE', "fr");
	define('TXT_RED', "Être profondément narcissique qui ne peut cesser de s'enlacer à tout moment. Côtoie les lieux malsains et glauques de ce monde, où il vit ouvertement ses vices et pulsions.");
	define('TXT_YELLOW', "Créature timide ayant peu d'assurance. Se cache dans son précieux coquillage, afin de survivre dans ce monde un peu trop cruel pour elle.");
	define('TXT_BLUE', "Humanoïde particulier, lunatique rêvassant constamment. Il suinte le bonheur et la sérénité. Ses bras en moins n'affectent en aucun cas sa bonne humeur.");
	define('TXT_WHITE', "Glouton émérite ; sa gourmandise le pousse à se dévorer lui-même. Il n'aura de cesse que lorsqu'il n'aura plus la possibilité de se délecter de ses propres chairs.");
	
	//---------------------------------------------------------
	// NEWS
	//---------------------------------------------------------
	// article 01 //
	define('TXT_NEWS_ARTICLE01', "	<h2>Évènements de carte<span class='newUpdate'>Nouveau</span></h2> 
									<i>01 juin, 2014</i>
									<p>Et oui! Voici une preuve que lorsque vous jouez, je me prépare déjà à vous donner de nouvelles choses. Les cartes existantes ont maintenant un événement qui leur est propre pour les rendre distinctives. Essayez les et utilisez les à votre avantage pour mettre vos ennemis hors d'état de nuire!</p>");
	// article 02 //
	define('TXT_NEWS_ARTICLE02', "	<h2>Lancement du jeu</h2> 
									<i>22 mai, 2014</i>
									<p>Une bonne étape de faite! Le jeu est officiellement sorti, néanmoins une bonne partie du travail reste à faire, alors je retrousse mes manches et je me  prépare à livrer du nouveau contenu. </p><p>Revenez régulièrement pour voir ce jeu évoluer en quelque chose de plus gros, plus rapide et plus gras! </p>");
	// article 03 //
	define('TXT_NEWS_ARTICLE03', "	<h2>Nouveau site web</h2> 
									<i>22 mai, 2014</i>
									<p>Avec le lancement du jeu, un magnifique site web a été développé pour vous donner plus d'information sur le jeu, sur moi et sur mon projet. Espérons un jour que je pourrai ajouter du contenu sur ce site en parlant au 'nous' au lieu du 'je'. N'hésitez pas à me faire part de vos commentaires à l'adresse courriel cachée dans ce site.</p>");
	// article 04 //
	define('TXT_NEWS_ARTICLE04', "<h2> Un arc-en-ciel sous terre</h2> 
									<i>22 mai, 2014</i>
									<p>Nos quatre combattants ont sombré dans des lieux glauques et cruels, ayant pour seul moyen de sortir de s'écraser les uns les autres! Toi, viens les aider! Clique sur le lien en haut à gauche et donne-toi le moyen d'en réchapper au moins un. Envoye, clique je te dis! Je suis là pour te procurer du plaisir, faut seulement tu me donnes un coup de pouce. </p>");
									
	//---------------------------------------------------------
	// RULES
	//---------------------------------------------------------
	/* The Hud */
	define('TXT_HUD',"L'interface");
	define('TXT_BUY_MODE',"Mode d'achat");
	define('TXT_UNITS_COUNTER',"Compteur d'unité");
	define('TXT_SKILL_BLOCKS','Bloc de compétences');
	define('TXT_ACTUAL_BLOCK','Bloc actuel à utiliser');
	define('TXT_NEXT_BLOCK','Prochain bloc à utiliser');
	define('TXT_PICKAXES','Pioches');
	define('TXT_INVENTORY_01','Inventaire #01');
	define('TXT_INVENTORY_02','Inventaire #02');
	/* Basic rules */
	define('TXT_BASIC_RULES','Règles de base');
	define('TXT_RULES_01',"Le but du jeu est d'atteindre l'objectif de fin et puis d'écraser ses adversaires.");
	define('TXT_RULES_02',"Une fois qu'un des joueurs a atteint le but, il peut ensuite s'incarner en l'objectif pour détruire le reste de ses ennemis. Il détient environ 10 sec pour tous les détruire. Il aura des points supplémentaires s'il les élimine tous dans le temps imparti.");
	define('TXT_RULES_03',"3 blocs, ou plus, de la même couleur, se touchant disparaiteront.");
	define('TXT_RULES_04'," 2 blocs complémentaires se touchant s'annuleront.");
	define('TXT_RULES_04_CHROMATIC_CIRCLE',"Tu ne te souviens plus du cercle chromatique ?");
	define('TXT_RULES_04_CLICK_HERE_LINK',"http://fr.wikipedia.org/wiki/Cercle_chromatique");
	define('TXT_RULES_04_CLICK_HERE',"Clique ici");
	define('TXT_RULES_05',"Afin d'obtenir des blocs complémentaires, tu dois écraser un autre joueur à l'aide de tes blocs. Cela tournera tes blocs en blocs complémentaires. Donc si Yellow tue Blue, tous les blocs de Yellow se changeront en bloc orange. ");
	define('TXT_RULES_06',"Les blocs gris sont neutres. Destructibles seulement par un bloc de compétences ou une pioche.");
	define('TXT_RULES_07',"Les pioches détruisent tous les types de blocs. Elles apparaissent à 15 secondes d'intervalle. Maximum de 2 pioches disponibles en même temps.");
	define('TXT_RULES_08',"Pour atteindre ton but plus facilement, tu dois écraser tes adversaires. Cela te donnera un bloc d'apparition et te permettera de faire revivre tes victimes où bon te semble. Marche autant sur les meurtres multiples.");
	/* Skill Blocks*/
	define('TXT_SKILL_BLOCKS_RULES',"Pour avoir des blocs de compétences durant le jeu, tu dois, avant de joindre le lobby, aller dans le <b>menu de compétences</b> et sélectionner les blocs de compétences que tu désires avoir pour la partie. Il y a un maximum de <b>4</b> compétences par partie. ");
	/* Units */
	define('TXT_UNITS',"Unités");
	define('TXT_UNITS_DESCRIPTION',"Tu peux acheter plus d'un blocs de compétences durant le jeu. Pour ce faire, tu as besoin d'unités. Comment en avoir ? En fait, tu en obtiens<b>tout au long de la partie</b>. Il y a une simple règle à retenir:");
	define('TXT_UNITS_RULES'," Un bloc de couleur génère des unités tant qu'il existe. Un bloc de votre couleur complémentaire, diminue vos unités. ");
	define('TXT_UNITS_BUY_MODE'," Aussi, il y a deux méthodes différentes pour acheter vos compétences, durant la partie: ");
	define('TXT_UNITS_POWER_MODE_01',"Mode puissance");
	define('TXT_UNITS_POWER_MODE_02',"Augmente la puissance de la compétence achetée.");
	define('TXT_UNITS_QUANTITY_MODE_01',"Mode quantité");
	define('TXT_UNITS_QUANTITY_MODE_02',"Augmente le pourcentage de chance d'apparition de la compétence achetée.");
	
	//---------------------------------------------------------
	// ABOUT
	//---------------------------------------------------------
	/* The creator */
	define('TXT_ABOUT_CREATOR_TITLE',"Le créateur ");
	define('TXT_ABOUT_CREATOR_01',"Salut, je suis un joueur ayant une passion pour les jeux originaux et qui tente de faire sa part dans une industrie déjà immense en voulant amener des concepts nouveaux et intéressants. L'originalité sans la qualité et le plaisir ne vaut pas la peine, alors je cherche à créer des jeux aux mécaniques différentes et amusantes pour combler ma propre soif de diversité. ");
	define('TXT_ABOUT_CREATOR_02',"J'oeuvre dans la ville de Québec (Canada) comme seul développeur du studio <b>Another Piece</b> et je suis ouvert aux candidatures ponctuelles pour assembler une équipe de gens aux idées originales et aux envies de divergences flagrantes.");
	define('TXT_ABOUT_CREATOR_03',"Vous pouvez me contacter sur ce courriel pour me faire part d'un quelconque intérêt : ");
	define('TXT_ABOUT_CREATOR_04',". Cependant, pour l'instant, je n'ai pas encore de fonds pour assurer un emploi (ni même le mien), mais le moindre profit sera réinvesti dans le studio en équipement et personnel.");
	
	/* The project */
	define('TXT_ABOUT_PROJECT_TITLE',"Le projet");
	define('TXT_ABOUT_PROJECT_01',"Crushed Dream est ma première création que j'ai développé en grande partie comme un loup solitaire. Le principe est simple: les joueurs doivent s'écraser les uns les autres dans une ascension frénétique vers l'objectif de fin. Lorsqu'il est atteint, le gagnant se doit d'éliminer le reste des survivants pour démontrer sa suprématie."); 
	define('TXT_ABOUT_PROJECT_02',"Certaines personnes m'ont aidé au fil du développement pour certains aspects et je les remercie tous dans les crédits du jeu. Ce premier jeu est mon fer de lance pour montrer à mes futurs coéquipiers le style de jeux que j'aime conceptualiser et aussi une opportunité pour la communauté des joueurs de ce monde de découvrir de nouvelles manières de jouer des styles existants depuis longtemps, mais avec une autre vision.");
	define('TXT_ABOUT_PROJECT_03',"J'aimerais bâtir une communauté autour de ce jeu en ajoutant périodiquement du nouveau contenu, incitant ainsi les joueurs à revenir souvent pour essayer les nouvelles fonctionnalités/habiletés introduites. Je n'ai pas opté pour le modèle le plus payant pour ce jeu et j'aurais bien aimé pouvoir l'offrir gratuitement, mais je vise à réinvestir les profits dans les serveurs et, si le jeu grossit beaucoup, dans un futur projet où il n'y aurait pas qu'un seul développeur. Je ne souhaite pas m'enrichir sur les joueurs avec des modèles qui nuisent à l'expérience de jeux, étant moi-même un joueur et n'aimant pas particulièrement certains moyens de prendre les gens pour des vaches à lait. Le coût de ce jeu risque de monter progressivement au fil du temps, pour compenser avec les nouvelles choses intégrées, mais le jeu risque de toujours rester abordable, car un coût excessif ne serait pas justifié pour un jeu de cette envergure. Il serait possible que dans un futur rapproché, j'accepte les requêtes des joueurs pour du nouveau contenu qu'ils auront déterminés, mais pour l'instant, j'ai la  tête remplie d'idées non développées.");
	define('TXT_ABOUT_PROJECT_04',"Voici ce que j'aimerais intégrer dans le futur: ");
	define('TXT_ABOUT_PROJECT_LIST_01',"Des événements dans les cartes ;");
	define('TXT_ABOUT_PROJECT_LIST_02',"Des ligues (si le volume de joueur est assez important) ;");
	define('TXT_ABOUT_PROJECT_LIST_03',"Une nouvelle catégorie de blocs(Des blocs utilitaires) ;");
	define('TXT_ABOUT_PROJECT_LIST_04',"Une musique dynamique qui s'accélère durant l'ascension ;");
	define('TXT_ABOUT_PROJECT_LIST_05',"Plus de personnages ; ");
	define('TXT_ABOUT_PROJECT_LIST_06',"Des habiletés spéciales, spécifiques à chaque personnage ;");
	define('TXT_ABOUT_PROJECT_LIST_07',"Etc. ");
	
	/* Download button */
	define('TXT_DOWNLOAD_BOTTOM',"Télécharger Crushed Dream ");
	
	//---------------------------------------------------------
	// FOOTER
	//---------------------------------------------------------
	/* Top button */
	define('TXT_NAV_TOP','Haut');
	
	/* Copyright */
	define('TXT_FOOTER_COPYRIGHT','Copyright © Another Piece Studio 2014. Tous droits réservés.');
	define('TXT_FOOTER_DESIGN_BY','Conception et design par: ');
	
	//---------------------------------------------------------
	// ADAPTATIV CSS ACCORDING TO LANGUAGE
	//---------------------------------------------------------
	define('SLOGAN_WIDTH',"390px");
	define('NEWS_WIDTH',"220px");
	define('RULES_WIDTH',"210px");
	define('MAPS_WIDTH',"160px");
	define('ABOUT_WIDTH',"180px");
	
 
?>