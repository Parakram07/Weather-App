<?php
$city = $_GET['city'];  // Get the city from the JavaScript request

$query = "SELECT * FROM weather_data
          WHERE city = '$city'
          AND timestamp >= DATE_SUB(NOW(), INTERVAL 7 DAY)
          ORDER BY timestamp ASC";

$result = mysqli_query($connection, $query);

$pastWeatherData = array();

while ($row = mysqli_fetch_assoc($result)) {
    $pastWeatherData[] = array(
        'date' => date('Y-m-d H:i:s', strtotime($row['timestamp'])),
        'temperature' => $row['temperature'],
        'icon' => $row['.icon'], // Replace with your column name for the weather icon
        'description' => $row['description']
    );
}
echo json_encode($pastWeatherData);
?>
