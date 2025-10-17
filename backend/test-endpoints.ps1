# 🧪 Script de prueba de endpoints - LUMO Rediseño

Write-Host "`n🚀 ================================" -ForegroundColor Green
Write-Host "🧪 PROBANDO NUEVOS ENDPOINTS" -ForegroundColor Green
Write-Host "================================`n" -ForegroundColor Green

$baseUrl = "http://localhost:3000"

# Test 1: Dashboard Stats
Write-Host "📊 Test 1: GET /api/dashboard" -ForegroundColor Cyan
Write-Host "──────────────────────────────────────" -ForegroundColor Gray
try {
    $dashboard = Invoke-RestMethod -Uri "$baseUrl/api/dashboard" -Method GET
    Write-Host "✅ Success!" -ForegroundColor Green
    Write-Host "   Promedio Lógica: $($dashboard.avgLogic)" -ForegroundColor White
    Write-Host "   Promedio Creatividad: $($dashboard.avgCreativity)" -ForegroundColor White
    Write-Host "   Promedio Escritura: $($dashboard.avgWriting)" -ForegroundColor White
    Write-Host "   Misiones Activas: $($dashboard.activeMissionsCount)" -ForegroundColor White
    Write-Host "   Total Estudiantes: $($dashboard.totalStudents)" -ForegroundColor White
    Write-Host "   Estudiantes Online: $($dashboard.studentsOnline)" -ForegroundColor White
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 2: Students List
Write-Host "👨‍🎓 Test 2: GET /api/students" -ForegroundColor Cyan
Write-Host "──────────────────────────────────────" -ForegroundColor Gray
try {
    $students = Invoke-RestMethod -Uri "$baseUrl/api/students" -Method GET
    Write-Host "✅ Success! Total: $($students.Count) estudiantes" -ForegroundColor Green
    $students | Select-Object -First 3 | ForEach-Object {
        Write-Host "   - $($_.name) (CI: $($_.ci)) | Stats: $($_.statLogic)/$($_.statCreativity)/$($_.statWriting) | Online: $($_.isOnline)" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 3: Students with Filter
Write-Host "🔍 Test 3: GET /api/students?filter=A-Z" -ForegroundColor Cyan
Write-Host "──────────────────────────────────────" -ForegroundColor Gray
try {
    $studentsFiltered = Invoke-RestMethod -Uri "$baseUrl/api/students?filter=A-Z" -Method GET
    Write-Host "✅ Success! Ordenados alfabéticamente" -ForegroundColor Green
    $studentsFiltered | Select-Object -First 3 | ForEach-Object {
        Write-Host "   - $($_.name)" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 4: Search by CI
Write-Host "🔎 Test 4: GET /api/students?search=1234567" -ForegroundColor Cyan
Write-Host "──────────────────────────────────────" -ForegroundColor Gray
try {
    $searchResults = Invoke-RestMethod -Uri "$baseUrl/api/students?search=1234567" -Method GET
    Write-Host "✅ Success! Encontrados: $($searchResults.Count)" -ForegroundColor Green
    $searchResults | ForEach-Object {
        Write-Host "   - $($_.name) (CI: $($_.ci))" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 5: Missions List
Write-Host "🎮 Test 5: GET /api/missions" -ForegroundColor Cyan
Write-Host "──────────────────────────────────────" -ForegroundColor Gray
try {
    $missions = Invoke-RestMethod -Uri "$baseUrl/api/missions" -Method GET
    Write-Host "✅ Success! Total: $($missions.Count) misiones" -ForegroundColor Green
    $missions | Select-Object -First 3 | ForEach-Object {
        $roles = if ($_.narrative) { $_.narrative.roles.Count } else { 0 }
        Write-Host "   - $($_.title) | Estado: $($_.status) | Roles: $roles" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 6: Mission by ID (with narrative)
Write-Host "📖 Test 6: GET /api/missions/1" -ForegroundColor Cyan
Write-Host "──────────────────────────────────────" -ForegroundColor Gray
try {
    $mission = Invoke-RestMethod -Uri "$baseUrl/api/missions/1" -Method GET
    Write-Host "✅ Success!" -ForegroundColor Green
    Write-Host "   Título: $($mission.title)" -ForegroundColor White
    Write-Host "   Resumen: $($mission.summary)" -ForegroundColor White
    if ($mission.narrative) {
        Write-Host "   Roles narrativos: $($mission.narrative.roles.Count)" -ForegroundColor White
        $mission.narrative.roles | ForEach-Object {
            Write-Host "      - $($_.title) (Habilidad: $($_.skill), Puntos: $($_.rewardPoints))" -ForegroundColor Gray
        }
    }
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 7: Notifications List
Write-Host "🔔 Test 7: GET /api/notifications" -ForegroundColor Cyan
Write-Host "──────────────────────────────────────" -ForegroundColor Gray
try {
    $notifications = Invoke-RestMethod -Uri "$baseUrl/api/notifications" -Method GET
    Write-Host "✅ Success! Total: $($notifications.Count) notificaciones" -ForegroundColor Green
    $notifications | Select-Object -First 3 | ForEach-Object {
        $readStatus = if ($_.read) { "✅ Leída" } else { "📬 Sin leer" }
        Write-Host "   - $($_.title) | $readStatus" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 8: Unread Notifications
Write-Host "📬 Test 8: GET /api/notifications?unread=true" -ForegroundColor Cyan
Write-Host "──────────────────────────────────────" -ForegroundColor Gray
try {
    $unreadNotifs = Invoke-RestMethod -Uri "$baseUrl/api/notifications?unread=true" -Method GET
    Write-Host "✅ Success! Sin leer: $($unreadNotifs.Count)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 9: Create Notification
Write-Host "✉️ Test 9: POST /api/notifications" -ForegroundColor Cyan
Write-Host "──────────────────────────────────────" -ForegroundColor Gray
try {
    $newNotif = @{
        title = "🧪 Test de notificación"
        body = "Esta es una notificación de prueba creada por el script de testing"
        senderId = 1
        targetStudentId = 1
        metadata = @{
            type = "test"
            timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        }
    } | ConvertTo-Json

    $created = Invoke-RestMethod -Uri "$baseUrl/api/notifications" -Method POST -Body $newNotif -ContentType "application/json"
    Write-Host "✅ Success! Notificación creada con ID: $($created.notification.id)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 10: Student by ID
Write-Host "👤 Test 10: GET /api/students/1" -ForegroundColor Cyan
Write-Host "──────────────────────────────────────" -ForegroundColor Gray
try {
    $student = Invoke-RestMethod -Uri "$baseUrl/api/students/1" -Method GET
    Write-Host "✅ Success!" -ForegroundColor Green
    Write-Host "   Nombre: $($student.name)" -ForegroundColor White
    Write-Host "   CI: $($student.ci)" -ForegroundColor White
    Write-Host "   Stats: Lógica $($student.statLogic) | Creatividad $($student.statCreativity) | Escritura $($student.statWriting)" -ForegroundColor White
    Write-Host "   Tiempo promedio: $($student.avgTimeMinutes) min" -ForegroundColor White
    Write-Host "   Misiones completadas: $($student.missionsCompleted)" -ForegroundColor White
    Write-Host "   Online: $($student.isOnline)" -ForegroundColor White
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "`n✅ ================================" -ForegroundColor Green
Write-Host "🎉 TESTS COMPLETADOS" -ForegroundColor Green
Write-Host "================================`n" -ForegroundColor Green
