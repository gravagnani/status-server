$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add("Content-Type", "application/json")

$url = "https://status-server-service.herokuapp.com/expired=N"
$body = "{`"server_code`": `"C1`"}"

$wait = 300

while($true) {
    $response = Invoke-RestMethod $url -Method 'POST' -Headers $headers -Body $body
    
    $response | ConvertTo-Json
    
    Start-Sleep -Seconds $wait;
}
