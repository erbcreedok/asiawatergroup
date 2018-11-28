<?php
require_once('PHPMailer/class.phpmailer.php');

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';                    // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->SMTPSecure = 'ssl';
$mail->Username = 'yes.service.mailer@gmail.com';                 // SMTP username
$mail->Password = 'YesService123';                   // SMTP password
$mail->Port = '465';                                          // TCP port to connect to

$mail->From = 'yes.service.mailer@gmail.com';
$mail->FromName = 'yes.service.mailer@gmail.com';
$mail->addAddress('zakaz@yes-service.kz');               // Name is optional

$mail->isHTML(false);                                  // Set email format to HTML

$mail->Subject = $_POST['subject'];
$mail->Body    = $_POST['message'];

if (!$mail->send()) {
    return $mail->ErrorInfo;
} else {
    return true;
}
