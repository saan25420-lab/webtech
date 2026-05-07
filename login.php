<?php
session_start();

// Simple username and password
$valid_username = "admin";
$valid_password = "1234";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check login
    if ($username == $valid_username && $password == $valid_password) {

        // Store username in session
        $_SESSION['username'] = $username;

        // Redirect to dashboard
        header("Location: dashboard.php");
        exit();

    } else {
        $error = "Invalid Username or Password!";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login Page</title>
</head>
<body>

<h2>Login Page</h2>

<form method="post">

    Username:
    <input type="text" name="username" required><br><br>

    Password:
    <input type="password" name="password" required><br><br>

    <input type="submit" value="Login">

</form>

<?php
if(isset($error)) {
    echo "<p style='color:red;'>$error</p>";
}
?>

</body>
</html>