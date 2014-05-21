 <?php  
 
  	if (isset($_GET['lang'])){
		$lang = $_GET['lang'];
	} 
	else if(isset($_COOKIE['lang'])) {
		$lang = $_COOKIE['lang'];
	} 
	else { 
		$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,2);
	} 
	
  	if ($lang == 'fr') {           // si la langue est 'fr' (français) on inclut le fichier fr-lang.php
  	     include('/langue/langueFR.php'); 
  	} 
	else if ($lang == 'en') {      // si la langue est 'en' (anglais) on inclut le fichier en-lang.php
  	     include('/langue/langueEN.php'); 
  	} 
	else {          
  	     include('/langue/langueFR.php'); 
  	 } 
	  
	//définition de la durée du cookie (1 an)
	$expire = 365*24*3600;
	//enregistrement du cookie au nom de lang
	setcookie('lang',$lang,time()+ $expire);
	
  	 
 ?>