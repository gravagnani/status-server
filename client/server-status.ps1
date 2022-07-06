$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add("Content-Type", "application/json")

$body = "{`"server_code`": `"C1`"}"

while($true) {
    $response = Invoke-RestMethod 'http://localhost:3000' -Method 'POST' -Headers $headers -Body $body
    $response | ConvertTo-Json

    Start-Sleep -Seconds 300;
}
