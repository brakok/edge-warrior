  <?php 
 
  	if ($_GET['lang'] != null){
		$lang = $_GET['lang'];
	}
	else if(isset($_COOKIE['lang'])){ 
		$lang=$_COOKIE['lang'];
	}
	else{
		$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,2); 
	}
	
  	 if ($lang=='fr') {           // si la langue est 'fr' (français) on inclut le fichier fr-lang.php
  	     include('/Langue/langueFR.php'); 
  	 } 
	 else if ($lang=='en') {      // si la langue est 'en' (anglais) on inclut le fichier en-lang.php
  	     include('/Langue/langueEN.php'); 
  	 } 
	 
	$expire = 365*24*3600;
	setcookie('lang',$lang,time()+ $expire);
  	 
 ?>