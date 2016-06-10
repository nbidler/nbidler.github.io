<?php
require_once('email_config.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');

//  Validate POST inputs
$message = [];
$output = [
    'success' => null,
    'messages' => []
];
$output['messages'] = [];
//  Sanitize name field
$message['name'] = filter_input(INPUT_POST, 'inputName', FILTER_VALIDATE_REGEXP, ['options'=>['regexp'=>'/^[A-Za-z]+ [A-Za-z]+$/']]);
if (empty($message['name'])) {
    $output['success'] = false;
    $output['messages'][] = 'missing name key';
}
//  Validate email field
$message['email'] = filter_input(INPUT_POST, 'inputEmail', FILTER_VALIDATE_REGEXP, ['options'=>['regexp'=>'/^[A-Za-z0-9]*\.*[A-Za-z0-9]+\@[A-Za-z]+\.[A-Za-z]+$/']]);
if (empty($message['email']) || $message['email'] === false) {
    $output['success'] = false;
    $output['messages'][] = 'invalid email key';
} else {
    $message['email'] = $_POST['inputEmail'];
}
//  Sanitize message field
$message['message'] = filter_input(INPUT_POST, 'inputMsg', FILTER_SANITIZE_STRING);
if (empty($message['message'])) {
    $output['success'] = false;
    $output['messages'][] = 'missing message key';
}
if ($output['success'] !== null) {
    echo json_encode($output);
    http_response_code(400);
    exit();
}

$mail = new PHPMailer;
//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication


$mail->Username = EMAIL_USER;                 // SMTP username
$mail->Password = EMAIL_PASS;                 // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
$mail->smtpConnect($options);
$mail->From = $message['email'];
$mail->FromName = $message['name'];
$mail->addAddress('nbidler.secondary@gmail.com', 'Nick');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
$mail->addReplyTo($message['email'], $message['name']);
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Email from nbidler.com!';
$mail->Body    = $message['message'];
$mail->AltBody = htmlentities($message['message']);

//  Attempt email send, output result to client
if(!$mail->send()) {
    $output['success'] = false;
    $output['messages'][] = $mail->ErrorInfo;
} else {
    $output['success'] = true;
}
echo json_encode($output);
?>
