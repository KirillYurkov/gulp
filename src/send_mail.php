<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Укажите путь к PHPMailer относительно расположения send_mail.php
$phpMailerPath = __DIR__ . '/PHPMailer-master';

// Проверяем, существует ли папка PHPMailer-master
if (!is_dir($phpMailerPath)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Папка PHPMailer-master не найдена по пути: ' . $phpMailerPath
    ]);
    exit;
}

// Подключаем файлы
require $phpMailerPath . '/src/PHPMailer.php';
require $phpMailerPath . '/src/Exception.php';
require $phpMailerPath . '/src/SMTP.php';

// Проверка существования файлов
$files = [
    $phpMailerPath . '/src/PHPMailer.php',
    $phpMailerPath . '/src/Exception.php',
    $phpMailerPath . '/src/SMTP.php'
];

foreach ($files as $file) {
    if (!file_exists($file)) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Файл не найден: ' . $file]);
        exit;
    }
}


try {
    $mail = new PHPMailer(true);

    // Получаем данные из формы
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message']));

    // Настройки SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'kirillyurkov694@gmail.com';
    $mail->Password = 'enmtixkymuniwhzd';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Настройки письма
    $mail->setFrom($email, $name);
    $mail->addAddress('kirillyurkov694@gmail.com', 'Recipient Name');
    $mail->isHTML(true);
    $mail->Subject = 'Новая заявка с сайта';
    $mail->Body = "Имя: $name\nEmail: $email\nСообщение: $message";

    if ($mail->send()) {
        echo json_encode(['success' => true, 'message' => 'Спасибо!Ваше сообщение успешно отправлено.']);
        // echo '<h2>Спасибо!</h2><p>Ваше сообщение успешно отправлено.</p>';
        exit;
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка отправки']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Ошибка: ' . $e->getMessage()]);
}
