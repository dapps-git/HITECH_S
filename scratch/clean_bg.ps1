Add-Type -AssemblyName System.Drawing

$filePaths = @(
    "c:\projects\HITECH\hitech-app\public\images\prod_passenger_car.png",
    "c:\projects\HITECH\hitech-app\public\images\prod_lcv.png",
    "c:\projects\HITECH\hitech-app\public\images\prod_truck_bus.png",
    "c:\projects\HITECH\hitech-app\public\images\prod_suv_pickup.png",
    "c:\projects\HITECH\hitech-app\public\images\prod_catalytic.png",
    "c:\projects\HITECH\hitech-app\public\images\prod_dpf_service.png"
)

foreach ($filePath in $filePaths) {
    if (Test-Path $filePath) {
        $bmp = [System.Drawing.Bitmap]::FromFile($filePath)
        $newBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height)
        $g = [System.Drawing.Graphics]::FromImage($newBmp)
        $g.DrawImage($bmp, 0, 0, $bmp.Width, $bmp.Height)
        $g.Dispose()
        $bmp.Dispose()

        for ($x = 0; $x -lt $newBmp.Width; $x++) {
            for ($y = 0; $y -lt $newBmp.Height; $y++) {
                $c = $newBmp.GetPixel($x, $y)
                # Check for light grey / off-white background pixels
                if ($c.R -gt 210 -and $c.G -gt 210 -and $c.B -gt 210) {
                    $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
                }
            }
        }

        # Save cleaned PNG file
        $tempPath = $filePath + ".tmp.png"
        $newBmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $newBmp.Dispose()
        
        Remove-Item $filePath -Force
        Move-Item $tempPath $filePath -Force
        Write-Host "Successfully converted background to transparent for: $filePath"
    }
}
