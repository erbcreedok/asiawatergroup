<?php
require_once('PHPMailer/class.phpmailer.php');

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';                    // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->SMTPSecure = 'ssl';
$mail->Username = 'asia.watttter.group@gmail.com';                 // SMTP username
$mail->Password = 'AWG12345';                   // SMTP password
$mail->Port = '465';                                          // TCP port to connect to

$mail->From = 'asia.watttter.group@gmail.com';
$mail->FromName = 'asia.watttter.group@gmail.com';
$mail->addAddress('asia.watttter.group@gmail.com');               // Name is optional

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = $_POST['subject'];
$mail->Body    = $_POST['message'];

if (!$mail->send()) {
    return $mail->ErrorInfo;
} else {
    return true;
}
