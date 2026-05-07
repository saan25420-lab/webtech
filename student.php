<?php

$students = array(

    array(
        "name" => "Saan",
        "id" => "23-50003-1",
        "department" => "CSE",
        "cgpa" => "3.85"
    ),

    array(
        "name" => "Rahim",
        "id" => "23-50010-2",
        "department" => "CS",
        "cgpa" => "3.70"
    )

);

echo json_encode($students);

?>