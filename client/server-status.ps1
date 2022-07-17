param(
    [Parameter(Mandatory)]
    [string]$s,
        
    [Parameter(Mandatory)]
    [string]$w
)

$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add("Content-Type", "application/json")

$url = "https://status-server-service.herokuapp.com"
$body = "{`"server_code`": `"$s`"}"

$wait = $w

while ($true) {

    try {
        $response = Invoke-RestMethod $url -Method 'POST' -Headers $headers -Body $body
        
        Write-Host "$(Get-Date -format 'u') - Updated Server " $response.server_code

    }
    catch {
        Write-Host "StatusCode:" $_.Exception.Response.StatusCode.value__ 
        Write-Host "StatusDescription:" $_.Exception.Response.StatusDescription
    }

    Start-Sleep -Seconds $wait;
}
