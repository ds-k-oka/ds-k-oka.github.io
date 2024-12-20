<?php
$logFile = __DIR__ . '/kickback_log.txt';
$key = isset($_GET['xuid']) ? $_GET['xuid'] : null;
$currentDateTime = date('Y-m-d H:i:s');

// パラメータが存在するかチェック
if ($key !== null) {
    // ログメッセージの作成
    $logMessage = "{$currentDateTime} - Key parameter: {$key}" . PHP_EOL;
    // ログに出力
    file_put_contents($logFile, $logMessage, FILE_APPEND);
    // 成功レスポンス
    echo "200 OK";
} else {
    // エラーレスポンス
    http_response_code(400);
    echo "No 'key' parameter provided.";
}
?>