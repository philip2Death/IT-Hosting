// 注意：此文件不使用 "use client", 保持為服務端組件
export const dynamic = 'force-dynamic';

import TicketsClient from './TicketsClient';

export default function TicketsPage() {
  // 此處可以加入一些服務端邏輯（例如：從資料庫讀取資料）
  // 或僅僅是渲染客戶端組件
  return <TicketsClient />;
}
