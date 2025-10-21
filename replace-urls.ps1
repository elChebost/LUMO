# PowerShell script to replace hardcoded URLs with API_URL import

Write-Host "🔍 Replacing hardcoded URLs in frontend..." -ForegroundColor Cyan
Write-Host ""

$count = 0
$files = @(
    "frontend/src/pages/Students.jsx",
    "frontend/src/pages/Settings.jsx",
    "frontend/src/pages/Login.jsx",
    "frontend/src/pages/Dashboard.jsx",
    "frontend/src/hooks/useNotifications.js",
    "frontend/src/components/StudentFormModal.jsx",
    "frontend/src/components/NotificationComposer.jsx",
    "frontend/src/components/Navbar.jsx",
    "frontend/src/components/MissionModal.jsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $modified = $false
        
        # Check if file has hardcoded URL
        if ($content -match "const API_URL = 'http://localhost:(3000|4000)") {
            Write-Host "✓ $file - Adding import and removing hardcoded URL" -ForegroundColor Green
            
            # Add import if not exists
            if ($content -notmatch "import.*API_URL.*from") {
                $content = "import { API_URL } from '../config/api.js';`n" + $content
            }
            
            # Remove const API_URL line
            $content = $content -replace "const API_URL = 'http://localhost:\d+(\/api)?';`n", ""
            $content = $content -replace "const API_URL = `"http://localhost:\d+(\/api)?`";`n", ""
            
            $modified = $true
            $count++
        }
        
        # Replace inline URLs
        if ($content -match "http://localhost:3000") {
            $content = $content -replace "http://localhost:3000/api", "/api"
            $content = $content -replace "http://localhost:3000`$", ""
            $content = $content -replace "http://localhost:3000", ""
            $modified = $true
        }
        
        if ($modified) {
            Set-Content -Path $file -Value $content -NoNewline
        }
    }
}

# Special case: vite.config.js
if (Test-Path "frontend/vite.config.js") {
    $content = Get-Content "frontend/vite.config.js" -Raw
    if ($content -match "http://localhost:4000") {
        $content = $content -replace "http://localhost:4000", "http://localhost:3000"
        Set-Content -Path "frontend/vite.config.js" -Value $content -NoNewline
        Write-Host "✓ frontend/vite.config.js - Port corrected" -ForegroundColor Green
        $count++
    }
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ Completed: $count files modified" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
