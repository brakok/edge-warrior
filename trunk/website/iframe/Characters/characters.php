<?php
	require("/Langue/langChoice.php");
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Crushed Dream - Maps </title>
		<!-- Stylesheet for slideshow -->
		<link rel="stylesheet" href="CSS/characterSlideshow.css">
	</head>
	<body>
	<div class="device">
		<!-- Arrows -->
		<a class="arrow-left" href="#"></a> 
		<a class="arrow-right" href="#"></a>
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<!-- RED -->
				<div id="red" class="swiper-slide">
					<div class="text" >
						<p><?php echo TXT_RED ?></p>
					</div>
				</div>
				<!-- YELLOW -->
				<div id="yellow" class="swiper-slide">
					<div class="text">
						<p> <?php echo TXT_YELLOW ?></p>
					</div>
				</div>
				<!-- BLUE -->
				<div id="blue" class="swiper-slide">
					<div class="text">
						<p> <?php echo TXT_BLUE ?> </p>
					</div>
				</div>
				<!-- WHITE -->
				<div id="white" class="swiper-slide">
					<div class="text">
						<p> <?php echo TXT_WHITE ?></p>
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