<?php

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
    exit;
}

header('Content-Type: application/json');

// Helper function to sanitize input
function clean($value) {
    return trim(htmlspecialchars($value ?? '', ENT_QUOTES, 'UTF-8'));
}

// Collect and sanitize inputs
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

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email address.'
    ]);
    exit;
}

// Email settings
$to = 'info@bcmk.co.zm'; // CHANGE to your receiving email
$subject = 'New Quote Request - BCMK';

// Build email body
$body = "You have received a new quote request:\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Phone: $phone\n";
$body .= "Service: $service\n\n";
$body .= "Message:\n$message\n";

// Email headers
$headers = [
    'From' => 'BCMK Website <no-reply@bcmk.co.zm>',
    'Reply-To' => $email,
    'Content-Type' => 'text/plain; charset=UTF-8'
];

// Send email
$sent = mail($to, $subject, $body, $headers);

// Respond to frontend
if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Your message has been sent successfully.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send message. Please try again later.'
    ]);
}
