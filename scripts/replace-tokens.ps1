#replace-tokens.ps1
# 解除Windows文件鎖定
Get-ChildItem -Recurse | Unblock-File -Confirm:$false

# 交互式輸入
do {
  $projectName = Read-Host "輸入新項目名稱 (需符合npm命名規範)"
} until ($projectName -match '^(?:@[a-z0-9-~][a-z0-9-._~]*/)?[a-z0-9-~][a-z0-9-._~]*$')

$currentYear = Get-Date -Format "yyyy"

# 批量替換(UTF-8處理)
$files = @('package.json', 'README.md', 'src/config/project.json')
foreach ($file in $files) {
    if (Test-Path $file) {
        $content = (Get-Content $file -Raw)
        $content = $content.Replace('{{PROJECT_NAME}}', $projectName).Replace('{{CURRENT_YEAR}}', $currentYear)
        Set-Content $file -Value $content -Encoding UTF8 -NoNewline
    } else {
        Write-Warning "文件 $file 不存在，跳過。"
    }
}

# 自動執行依賴安裝
npm install --silent