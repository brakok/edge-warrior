<?php
	require("/Langue/langChoice.php");
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Crushed Dream - Website </title>
        <link rel="stylesheet" type="text/css" href="CSS/style.css" />
		<!-- Stylesheet for responsive -->
		<link rel="stylesheet" type="text/css" href="CSS/mobile.css" />
		<!-- Stylesheet for slideshow -->
		<link rel="stylesheet" type="text/css" href="CSS/slideshow.css" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!-- Internet Explorer HTML5 enabling code: -->
        <!--[if IE]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <style type="text/css">
        .clear {
          zoom: 1;
          display: block;
        }
        </style>
        <![endif]-->    
    </head>
    <body>   
		<div class="wrapper">  
        <header>    
			<!-- Play the game Button -->
			<span id="PlayGame_BT">
				<a href="#">
					<p>Play the game </p>
					<p>Now</p>
				</a>
			</span>
			<div class="wrap"> 
				<nav class="clear">
					<ul>
						<li><a href="#updates"><?php echo TXT_NAV_NEWS ?></a></li>
						<li class="navDivid"></li>
						<li><a href="#rules"><?php echo TXT_NAV_RULES ?></a></li>
						<li class="navDivid"></li>
						<li><a href="#maps"><?php echo TXT_NAV_MAPS ?></a></li>
						<li class="navDivid"></li>
						<li><a href="#about"><?php echo TXT_NAV_ABOUT ?></a></li>
						<li class="navDivid"></li>
						<li><a href="#"><?php echo TXT_NAV_LANGUE ?></a></li>
					</ul>
				</nav>
				<div id="logo">
					<h1>Crushed Dream </h1>
					<span><p><?php echo TXT_SLOGAN ?></p></span>
				</div>
			</div>
			<!-- Characters Section -->
			<section id="characters">
				<p> <?php echo TXT_PLAYERS ?></p>
				<p> <?php echo TXT_CHOOSE ?></p>
				<iframe src="iframe/characters/characters.php?lang=<?php echo TXT_IFRAME_LANGUE ?>" scrolling="no" frameborder="0"></iframe>
				<section class="widescreen">				
					<!-- Red -->
					<div class="flip-container" id="red">
						<div class="front" ></div>
						<div class="back" >
							<p> <?php echo TXT_RED ?></p>
						</div>
					</div>
					<!-- Yellow -->
					<div class="flip-container" id="yellow">
						<div class="front" ></div>
						<div class="back">
							<p><?php echo TXT_YELLOW ?></p>
						</div>
					</div>
					<!-- Blue -->
					<div class="flip-container" id="blue">
						<div class="front" ></div>
						<div class="back" >
							<p><?php echo TXT_BLUE ?></p>
						</div>
					</div>
					<!-- White -->
					<div class="flip-container" id="white">
						<div class="front" ></div>
						<div class="back" >
							<p> <?php echo TXT_WHITE ?></p>
						</div>
					</div>	
				</section>
			</section>
        </header>
			<section id="content">
				<!-- Updates section -->             
				<article id="updates"> 
					<span><h2><?php echo TXT_NAV_NEWS ?></h2></span>
					<!-- News slideshow -->
					<div class="swiper-container">
						<div class="swiper-wrapper">
							<!-- Article #1 -->
							<div class="swiper-slide news1">
								<article>
									<?php echo TXT_NEWS_ARTICLE01 ?>
								</article>
							</div>
							<!-- Article #2 -->
							<div class="swiper-slide news2">
								<article> 
									<?php echo TXT_NEWS_ARTICLE02 ?>
								</article>
							</div>
							<!-- Article #3 -->
							<div class="swiper-slide news3">
								<article> 
									<?php echo TXT_NEWS_ARTICLE03 ?>
								</article>
							</div>
						</div>
						<div class="pagination"></div>
					</div>
					<!-- Script for the news slideshow -->
					<script src="Script/jquery-1.10.1.min.js"></script>
					<script src="Script/plugIn_slideshow.min.js"></script>
					<script src="Script/slideshow.js"></script>
				</article>
				<!-- Rules section --> 
				<article id="rules">
					<span><h2><?php echo TXT_NAV_RULES ?></h2></span>
						<section id="hud">
							<h2 class="wrap"><?php echo TXT_HUD ?></h2>
							<div id="hudContent">
								<div class="wrap"> 
									<article class="legendTXT">
										<p><span class="legendNB">1</span><?php echo TXT_BUY_MODE ?></p>
										<p><span class="legendNB">2</span><?php echo TXT_UNITS_COUNTER ?></p>
									</article>
									<article class="legendTXT">
										<p><span class="legendNB">3</span><?php echo TXT_SKILL_BLOCKS ?></p>
										<p><span class="legendNB">4</span><?php echo TXT_ACTUAL_BLOCK?></p>
									</article>
									<article class="legendTXT">
										<p><span class="legendNB">5</span><?php echo TXT_NEXT_BLOCK?></p>
										<p><span class="legendNB">6</span><?php echo TXT_PICKAXES?></p>
									</article>
									<article class="legendTXT">
										<p><span class="legendNB">7</span><?php echo TXT_INVENTORY_01 ?></p>
										<p><span class="legendNB">8</span><?php echo TXT_INVENTORY_02 ?></p>
									</article>
								</div>	
								<div id="hudImage"></div>
							</div>
						</section>
						<section id="basicRules">
							<h2 class="wrap"><?php echo TXT_BASIC_RULES ?></h2>
								<article class="rules">
									<div class="wrap">
										<!-- Rule #01 -->
										<div id="rules_part01"> 
											<p><?php echo TXT_RULES_01 ?></p>
										</div> 
										<div id="rules_part02"> 
											<p><?php echo TXT_RULES_02 ?></p>
											<img src="Images/winningGoal_Reach.png"/>
											<span>></span>
											<img src="Images/winningGoal_Final.png"/>
										</div> 
									</div>								
								</article>
								<article class="rules">
									<div class="wrap">
										<!-- Rule #02 -->
										<div id="rules_part04"> 
											<p><?php echo TXT_RULES_03 ?></p>
										</div> 
										<!-- Rule #03 -->
										<div id="rules_part05"> 
											<p><?php echo TXT_RULES_04 ?><i> [ <?php echo TXT_RULES_04_CHROMATIC_CIRCLE ?> ]</i><a href="#"><?php echo TXT_RULES_04_CLICK_HERE ?></a></p>
										</div> 
										<!-- Rule #04 -->
										<div id="rules_part06"> 
											<p><?php echo TXT_RULES_05 ?></p>
											<img src="Images/oppositeBlocks.png"/>
										</div> 
									</div>								
								</article>
								<article class="rules">
									<div class="wrap">
										<!-- Rule #05 -->
										<div id="rules_part07"> 
											<p><?php echo TXT_RULES_06 ?></p>
										</div> 
										<!-- Rule #06 -->
										<div id="rules_part08"> 
											<p><?php echo TXT_RULES_07 ?></p>
										</div> 
										<!-- Rule #08 -->
										<div id="rules_part09"> 
											<p><?php echo TXT_RULES_08 ?></p>
										</div> 
									</div>							
								</article>
						</section>
						<section id="skillBlocks">							
							<h2 class="wrap"><?php echo TXT_SKILL_BLOCKS ?></h2>
							<p class="wrap"><?php echo TXT_SKILL_BLOCKS_RULES ?></p>
							<!-- SkillBlocks slideshow -->
							<iframe src="iframe/skillBlocks/skillBlocks.php?lang=<?php echo TXT_IFRAME_LANGUE ?>" scrolling="no" frameborder="0"></iframe>
						</section>
						<section id="units">	
							<h2 class="wrap"><?php echo TXT_UNITS ?></h2>
							<div class="wrap">
								<p><?php echo TXT_UNITS_DESCRIPTION ?></p>
								<ul>
									<li><?php echo TXT_UNITS_RULES ?><img src="Images/unitsBlocks.png"/></li>
								</ul>
								<p><?php echo TXT_UNITS_BUY_MODE ?></p>
								<ul>
									<li><span><?php echo TXT_UNITS_POWER_MODE_01 ?></span> <?php echo TXT_UNITS_POWER_MODE_02 ?></li>
									<li><span><?php echo TXT_UNITS_QUANTITY_MODE_01 ?></span> <?php echo TXT_UNITS_QUANTITY_MODE_02 ?></li>
								</ul>
							</div>
						</section>
				</article>  
				<!-- Maps section --> 				
				<article id="maps">
					<span><h2>Mondes</h2></span>
					<!-- Slideshow iframe -->
					<iframe src="iframe/Maps/maps.html" scrolling="no" frameborder="0"></iframe>
				</article>
				<!-- About section --> 
				<article id="about">
					<span><h2>À propos</h2></span>
					<div class="wrap"> 
						<section id="creator">
							<h2> Le Créateur</h2>
							<article id="creatorTXT">
								<h2>Pascal Thibault Larouche</h2>
								<p>Salut, je suis un joueur ayant une passion pour les <b>jeux originaux</b> et qui tente de faire sa part dans une industrie déjà immense en voulant amener des <b>concepts nouveaux et intéressants</b>. L'originalité sans la qualité et le plaisir ne vaut pas la peine, alors je cherche à créer des jeux aux mécaniques différentes et amusantes pour combler ma propre soif de <b>diversité</b>. </p>
								<p>J'oeuvre dans la ville de Québec (Canada) comme seul développeur du studio <b>Another Piece</b> et je suis ouvert aux candidatures ponctuelles pour assembler une équipe de gens aux <b>idées originales</b> et aux envies de <b>divergence flagrantes</b>.</p>
								<p>Vous pouvez me contacter sur ce courriel pour me faire part d'un quelconque intérêt : <a href="mailto:another.piece.studio@gmail.com">another.piece.studio@gmail.com</a> . Cependant, pour l'instant, je n'ai pas encore de fonds pour assurer un emploi (ni même le mien), mais le moindre profit sera réinvesti dans le studio en équipement et personnel.</p>
								<div id="reseauxSociaux">
									<a href="https://www.facebook.com/pascal.thibaultlarouche?fref=ts" target="_blank" id="Facebook"> f </a>
									<a href="http://www.linkedin.com/pub/pascal-thibault-larouche/22/373/b34" target="_blank" id="LinkedIn"> in </a>
									<a href="https://plus.google.com/113884588779892943053/posts" target="_blank" id="GooglePlus"> <span>g<i>+</i></span></a>
								</div>
							</article>
						</section>
						<section id="project">
							<h2> Le Projet</h2>
							<article id="projectTXT">
								<p class="boldTXT">Crushed Dream est ma première création que j'ai développé en grande partie comme un loup solitaire. Le principe est simple: les joueurs doivent s'écraser les uns les autres dans une ascension frénétique vers l'objectif de fin. Lorsqu'il est atteint, le gagnant se doit d'éléminer le reste des survivants pour démontrer sa suprématie. </p>
								<p>	Ce premier jeu est mon fer de lance pour montrer à mes futurs coéquipiers le style de jeux que j'aime conceptualiser et aussi une opportunité pour la communauté des joueurs de ce monde de découvrir de nouvelles manières de jouer des styles existants depuis longtemps, mais avec une autre vision.</p>							
								<p>J'aimerais bâtir une communauté autour de ce jeu en ajoutant périodiquement du nouveaux contenus, ainsi incitant les joueurs à revenir souvent pour essayer les nouvelles fonctionnalités/habiletés introduites. Je n'ai pas opté pour le modèle le plus payant pour ce jeu et j'aurais bien aimé pouvoir l'offrir gratuitement, mais je vise à réinvestir les profits dans les serveurs et, si le jeu grossit beaucoup, dans un futur projet où il n'y aurait pas qu'un seul développeur. 
								Je ne souhaite pas m'enrichir sur les joueurs avec des modèles qui nuisent à l'expérience de jeux, étant moi-même un joueur et n'aimant pas particulièrement certains moyens de prendre les gens pour des vaches à lait. Le coût de ce jeu risque de monter progressivement au fil du temps, pour compenser avec les nouvelles choses intégrées, mais le jeu risque de toujours rester abordable, car un coût excessif ne serait pas justifié pour un jeu de cette envergure. 
								Il serait possible que dans un futur rapproché, j'accepte les requêtes des joueurs pour du nouveaux contenus qu'ils auront déterminés, mais pour l'instant, j'ai la  tête remplie d'idées non développées.</p> 
								<p class="boldTXT">Voici ce que j'aimerais intégrer dans le futur: </p>
								<ul>							
									<li>Des événements dans les cartes ;</li>
									<li>Des ligues (si le volume de joueur est assez important) ;</li>
									<li>Une nouvelle catégorie de blocs (Util Block, des blocs utilitaires) ;</li>
									<li>Une musique dynamique qui s'accère durant l'ascension ;</li>
									<li>Peut-être, plus de personnages ; </li>
									<li>Peut-être, des habiletés spéciales pour chaque personnage ;</li>
									<li>Etc. </li>
								</ul>
							</article>
						</section>
					</div>
					<!-- Link for downloading the game -->
					<a id="download" href="#">Télécharger Crushed Dream </a>
				</article>
			</section>
			<div id="push"></div>
		</div>
		<!-- Footer -->
        <footer>
			<div class="wrap"> 
				<nav class="clear">
					<ul>
						<li><a href="#updates">Nouvelles</a></li>
						<li><a href="#rules">Règlements</a></li>
						<li><a href="#maps">Mondes</a></li>
						<li><a href="#about">About </a></li>
					</ul>
				</nav>
				<a href="#" class="up">Haut </a>
				<p>Crushed Dream © copyright 2014. Tous droits réservés.</p>
			</div>
        </footer>  
        <!-- JavaScript Includes -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
        <script src="Script/jquery.scrollTo-min.js"></script>
        <script src="Script/script.js"></script>
    </body>
</html>
