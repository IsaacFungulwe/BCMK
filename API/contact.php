<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

// Always return JSON
header('Content-Type: application/json');

// Allow only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
    exit;
}

// Sanitize helper
function clean($value) {
    return trim(htmlspecialchars($value ?? '', ENT_QUOTES, 'UTF-8'));
}

// Collect inputs
$name    = clean($_POST['name'] ?? '');
$email   = clean($_POST['email'] ?? '');
$phone   = clean($_POST['phone'] ?? '');
$service = clean($_POST['service'] ?? '');
$message = clean($_POST['message'] ?? '');

// Validate required fields
if ($name === '' || $email === '' || $phone === '' || $service === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Please fill in all required fields.'
    ]);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email address.'
    ]);
    exit;
}

$mail = new PHPMailer(true);

try {
    // SMTP CONFIGURATION (cPanel email)
    $mail->isSMTP();
    $mail->Host       = 'mail.bcmk.co.zm';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'no-reply@bcmk.co.zm';
    $mail->Password = getenv('SMTP_PASS');
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Email setup
    $mail->setFrom('no-reply@bcmk.co.zm', 'BCMK Website');
    $mail->addAddress('info@bcmk.co.zm');
    $mail->addReplyTo($email, $name);

    // Email content
    $mail->isHTML(false);
    $mail->Subject = 'New Quote Request - BCMK Enterprises';

    $mail->Body =
        "You have received a new quote request:\n\n" .
        "Name: {$name}\n" .
        "Email: {$email}\n" .
        "Phone: {$phone}\n" .
        "Service: {$service}\n\n" .
        "Message:\n{$message}\n";

    $mail->send();

    echo json_encode([
        'success' => true,
        'message' => 'Your message has been sent successfully.'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Message could not be sent. Please try again later.'
    ]);
}
