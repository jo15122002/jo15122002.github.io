<?php
$to = "joyce.wagner@etu.univ-smb.fr";
$subject = "Contacted by ".$_POST['name'];
$name_field = $_POST['name'];
$email_field = $_POST['email'];
$message = $_POST['message'];

$headers = 'From: '.$_POST['email'].'' . "
" .
   'Reply-To: '.$_POST['email'].'' . "
" .
   'X-Mailer: PHP/' . phpversion();
 
$body = $message;

mail($to, $subject, $body, $headers);
header('Location: .');