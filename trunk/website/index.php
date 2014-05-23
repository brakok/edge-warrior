<?php
	require("/Langue/langChoice.php");
?>
<!DOCTYPE html>
<html>
    <head>
        <title><?php echo TXT_TITLE ?></title>
        <link rel="stylesheet" type="text/css" href="CSS/style.css" />
		<!-- Reset CSS stylesheet to increase broswer compatibility -->
		<link rel="stylesheet" type="text/css" href="CSS/reset.css" />
		<!-- Stylesheet for responsive -->
		<link rel="stylesheet" type="text/css" href="CSS/mobile.css" />
		<!-- Stylesheet for slideshow -->
		<link rel="stylesheet" type="text/css" href="CSS/slideshow.css" />
		<!-- Meta -->
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="description" content="Crushed dream est un jeu basé sur le concept d'écraser ses adversaires avec des blocs diversifiés" />
		<meta name="keywords" content="crushed dream,jeu,bloc, écraser, pascal thibault larouche, google chrome, chrome store, indie game, plateformer." />
		<!-- meta for facebook -->
		<meta property="og:image" content="http://crusheddream.azurewebsites.net/Images/ProjectBG.png" />
		<meta property="og:url" content="http://crusheddream.azurewebsites.net/" />
		<meta property="og:description" content="Crushed dream est un jeu basé sur le concept d'écraser ses adversaires avec des blocs diversifiés/ Crushed Dream is a game based on crushing others by dropping generated blocks on them. ." />
		<!-- Favicon -->
		<link rel="shortcut icon" href="http://crusheddream.azurewebsites.net/Images/CrushedDream_Favicon.ico" type="image/icon"> 
		<link rel="icon" href="http://crusheddream.azurewebsites.net/Images/CrushedDream_Favicon.ico" type="image/icon">
		<script src="Script/mobileScript.js"></script>
		<!-- Script for responsive menu -->
		<script src="http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"></script>
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
    <body onload="mobile()">   
		<div class="wrapper">  
        <header>    
			<!-- Play the game Button -->
			<span id="PlayGame_BT">
				<a href="https://chrome.google.com/webstore/detail/crushed-dream/ndgflpkljijaijbgplobeekebdfocelc">
					<?php echo TXT_PLAY_BUTTON ?>
				</a>
			</span>
			<div class="wrap"> 
				<nav class="clear">
					<ul id="menu">
						<li><a href="#updates"><?php echo TXT_NAV_NEWS ?></a></li>
						<li class="navDivid"></li>
						<li><a href="#rules"><?php echo TXT_NAV_RULES ?></a></li>
						<li class="navDivid"></li>
						<li><a href="#maps"><?php echo TXT_NAV_MAPS ?></a></li>
						<li class="navDivid"></li>
						<li><a href="#about"><?php echo TXT_NAV_ABOUT ?></a></li>
						<li class="navDivid"></li>
						<?php echo TXT_NAV_LANGUE ?>
					</ul>
				</nav>
				<?php echo TXT_NAV_LANGUE ?>
				<div id="logo">
					<h1>Crushed Dream</h1>
					<span><p style="width:<?php echo SLOGAN_WIDTH ?>"><?php echo TXT_SLOGAN ?></p></span>
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
					<span><h2 style="width:<?php echo NEWS_WIDTH ?>"><?php echo TXT_NAV_NEWS ?></h2></span>
					<!-- News slideshow -->
					<div class="device">
						<a class="arrow-left" href="#"></a> 
						<a class="arrow-right" href="#"></a>
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
				</div>
					<!-- Script for the news slideshow -->
					<script src="Script/jquery-1.10.1.min.js"></script>
					<script src="Script/plugIn_slideshow.min.js"></script>
					<script src="Script/slideshow.js"></script>
				</article>
				<!-- Rules section --> 
				<article id="rules">
					<span><h2 style="width:<?php echo RULES_WIDTH ?>;"><?php echo TXT_NAV_RULES ?></h2></span>
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
									<div id="hudImage_02"></div>
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
											<p><?php echo TXT_RULES_04 ?><i> [ <?php echo TXT_RULES_04_CHROMATIC_CIRCLE ?> ]</i><a href="http://fr.wikipedia.org/wiki/Cercle_chromatique" target="_blank"><?php echo TXT_RULES_04_CLICK_HERE ?></a></p>
										</div> 
										<!-- Rule #04 -->
										<div id="rules_part06"> 
											<p><?php echo TXT_RULES_05 ?></p>
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
					<span><h2 style="width:<?php echo MAPS_WIDTH ?>"><?php echo TXT_NAV_MAPS ?></h2></span>
					<!-- Slideshow iframe -->
					<iframe src="iframe/Maps/maps.html" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>
				</article>
				<!-- About section --> 
				<article id="about">
					<span><h2 style="width:<?php echo ABOUT_WIDTH ?>"><?php echo TXT_NAV_ABOUT ?></h2></span>
					<div class="wrap"> 
						<section id="creator">
							<h2><?php echo TXT_ABOUT_CREATOR_TITLE ?></h2>
							<article id="creatorTXT">
								<h2>Pascal Thibault Larouche</h2>
								<p><?php echo TXT_ABOUT_CREATOR_01 ?></p>
								<p><?php echo TXT_ABOUT_CREATOR_02 ?></p>
								<p><?php echo TXT_ABOUT_CREATOR_03 ?><a href="mailto:another.piece.studio@gmail.com">another.piece.studio@gmail.com</a><?php echo TXT_ABOUT_CREATOR_04 ?></p>
								<div id="reseauxSociaux">
									<a href="https://www.facebook.com/pascal.thibaultlarouche?fref=ts" target="_blank" id="Facebook"> f </a>
									<a href="http://www.linkedin.com/pub/pascal-thibault-larouche/22/373/b34" target="_blank" id="LinkedIn"> in </a>
									<a href="https://plus.google.com/113884588779892943053/posts" target="_blank" id="GooglePlus"> <span>g<i>+</i></span></a>
								</div>
							</article>
						</section>
						<section id="project">
							<h2><?php echo TXT_ABOUT_PROJECT_TITLE ?></h2>
							<article id="projectTXT">
								<p class="boldTXT"><?php echo TXT_ABOUT_PROJECT_01 ?></p>
								<p><?php echo TXT_ABOUT_PROJECT_02 ?></p>						
								<p><?php echo TXT_ABOUT_PROJECT_03 ?></p> 
								<p class="boldTXT"><?php echo TXT_ABOUT_PROJECT_04 ?></p>
								<ul>							
									<li><?php echo TXT_ABOUT_PROJECT_LIST_01 ?></li>
									<li><?php echo TXT_ABOUT_PROJECT_LIST_02 ?></li>
									<li><?php echo TXT_ABOUT_PROJECT_LIST_03 ?></li>
									<li><?php echo TXT_ABOUT_PROJECT_LIST_04 ?></li>
									<li><?php echo TXT_ABOUT_PROJECT_LIST_05 ?></li>
									<li><?php echo TXT_ABOUT_PROJECT_LIST_06 ?></li>
									<li><?php echo TXT_ABOUT_PROJECT_LIST_07 ?></li>
								</ul>
							</article>
						</section>
					</div>
					<!-- Link for downloading the game -->
					<a id="download" href="https://chrome.google.com/webstore/detail/crushed-dream/ndgflpkljijaijbgplobeekebdfocelc"><?php echo TXT_DOWNLOAD_BOTTOM ?></a>
				</article>
			</section>
			<div id="push"></div>
		</div>
		<!-- Footer -->
        <footer>
			<div class="wrap"> 
				<nav class="clear">
					<ul>
						<li><a href="#updates"><?php echo TXT_NAV_NEWS ?></a></li>
						<li><a href="#rules"><?php echo TXT_NAV_RULES ?></a></li>
						<li><a href="#maps"><?php echo TXT_NAV_MAPS ?></a></li>
						<li><a href="#about"><?php echo TXT_NAV_ABOUT ?></a></li>
					</ul>
				</nav>
				<a href="#" class="up"><?php echo TXT_NAV_TOP ?></a>
				<p><?php echo TXT_FOOTER_COPYRIGHT ?><span><?php echo TXT_FOOTER_DESIGN_BY ?><a href="http://audreylaganiere.com/" target="_blank">Audrey Laganière</a></span></p>
			</div>
        </footer>  
        <!-- JavaScript Includes -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
        <script src="Script/jquery.scrollTo-min.js"></script>
        <script src="Script/script.js"></script>
		<script src="Script/jquery.slicknav.js"></script>
		<script type="text/javascript">
			$(document).ready(function(){
				$('#menu').slicknav();
			});
		</script>
    </body>
</html>
