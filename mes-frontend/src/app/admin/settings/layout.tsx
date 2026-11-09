'use client';

import AuthGuard from "@/components/auth/AuthGuard";
import React from "react";

export default function SettingsLayout({children}: {children: React.ReactNode}){
    return (
        <AuthGuard requiredRole="ADMIN">
            {children}
        </AuthGuard>
  );
}

