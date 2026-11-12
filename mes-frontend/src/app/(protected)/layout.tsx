"use client";


import AuthGuard from "@/components/auth/AuthGuard";
import MessageNotificationProvider from '@/components/message/MessageNotificationProvider'
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <MessageNotificationProvider>
        {children}
      </MessageNotificationProvider>
    </AuthGuard>
  );
}