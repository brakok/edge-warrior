<?php
	require("/Langue/langChoice.php");
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Crushed Dream - Maps </title>
		<!-- Stylesheet for slideshow -->
		<link rel="stylesheet" href="CSS/slideshow.css">
	</head>
	<body>
	<div class="device">
		<!-- Arrows -->
		<a class="arrow-left" href="#"></a> 
		<a class="arrow-right" href="#"></a>
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<!-- Skill block#01 - Fire Pulse -->
				<div class="swiper-slide"> 
					<div id="firePulse"  class="skillBlocks">
						<h3> <?php echo TXT_FIRE_PULSE ?></h3>
						<p><?php echo TXT_FIRE_PULSE_DESCRIPTION ?></p>
					</div>
				</div>
				<!-- Skill block#02 - Jaw Fall -->
				<div class="swiper-slide"> 
					<div id="jawFall" class="skillBlocks">
						<h3> <?php echo TXT_JAW_FALL ?></h3>
						<p><?php echo TXT_JAW_FALL_DESCRIPTION ?></p>
					</div>
				</div>
				<!-- Skill block#03 - Eclipse -->
				<div class="swiper-slide">
					<div id="eclipse" class="skillBlocks">
						<h3> <?php echo TXT_ECLIPSE ?></h3>
						<p><?php echo TXT_ECLIPSE_DESCRIPTION ?></p>
					</div>
				</div>
				<!-- Skill block#04 - Pisky Box -->
				<div class="swiper-slide">
					<div id="peskyBox" class="skillBlocks">
						<h3> <?php echo TXT_PESKY_BOX ?></h3>
						<p><?php echo TXT_PESKY_BOX_DESCRIPTION ?></p>
					</div>
				</div>
				<!-- Skill block#05 - Deflector-->
				<div class="swiper-slide">
					<div id="deflector" class="skillBlocks">
						<h3> <?php echo TXT_DEFLECTOR ?></h3>
						<p><?php echo TXT_DEFLECTOR_DESCRIPTION ?></p>
					</div>
				</div>
				<!-- Skill block#06 - Time Zone -->
				<div class="swiper-slide">
					<div id="timeZone" class="skillBlocks">
						<h3> <?php echo TXT_TIME_ZONE ?></h3>
						<p><?php echo TXT_TIME_ZONE_DESCRIPTION ?></p>
					</div>
				</div>
			</div>
		</div>
		<div class="pagination"></div>
	</div>	
	<!-- Script for the slideshow -->
	<script src="Script/jquery-1.10.1.min.js"></script>
	<script src="Script/plugIn_slideshow.min.js"></script>
	<script src="Script/slideshow.js"></script>
	
	<!-- JavaScript Includes -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
        <script src="Script/script.js"></script>
	</body>
</html>