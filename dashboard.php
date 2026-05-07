<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION['username'])) {

    // Redirect to login page
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>

<h2>Dashboard</h2>

<?php
echo "<h3>Welcome, " . $_SESSION['username'] . "!</h3>";
?>

<p>You are successfully logged in using PHP Session.</p>

<a href="logout.php">Logout</a>

</body>
</html>