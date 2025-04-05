#!/bin/bash

# 確保腳本在失敗時立即退出
set -euo pipefail

# 統一設置行尾符號為 LF
git config --global core.autocrlf true

# 項目名稱輸入
read -p "Enter new project name: " PROJECT_NAME

# 跳轉到上一層目錄
cd ..

# 倉庫創建與錯誤處理
if ! gh repo create "$PROJECT_NAME" --template philip2Death/Next.js15-Tailwind-v4-Starter --clone; then
    echo "❌ Error: 倉庫創建失敗，請檢查："
    echo "1. GitHub 帳號權限"
    echo "2. 項目名稱是否已存在"
    echo "3. 網路連線狀態"
    exit 1
fi

# 目錄跳轉保護
if ! cd "$PROJECT_NAME"; then
    echo "❌ 錯誤：無法進入項目目錄 $PROJECT_NAME"
    exit 1
fi

# 依賴安裝與追蹤
{
    echo "[INF] 開始安裝依賴..."
    if ! npm install; then
        echo "❌ npm install 失敗"
        exit 1
    fi
    echo "[PERF] 初始化耗時: $((SECONDS / 60))分$((SECONDS % 60))秒"
    
    # 測試報告生成（忽略首次無報告的錯誤）
    npx playwright show-report --last 2>/dev/null || echo "[WARN] 無現有測試報告"
} > "./perf-report.txt"



# 提交版本控制
git add . --verbose
git commit -m "chore: 從模板初始化 (ref: v0.1.0)"