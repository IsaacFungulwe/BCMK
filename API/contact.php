<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize input data
    $name    = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email   = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone   = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
    $service = filter_var($_POST['service'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    if (empty($name) || empty($email) || empty($service)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
        exit;
    }

    // Email Configuration
    $to = "bcmkenterprisesltd@gmail.com"; // Your email
    $subject = "New Quote Request: $service";
    
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Service: $service\n\n";
    $email_content .= "Message:\n$message\n";

    $headers = "From: $email";

    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Server failed to send email.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>