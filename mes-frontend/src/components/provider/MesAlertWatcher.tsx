// src/components/provider/MesAlertWatcher.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaTriangleExclamation, FaXmark } from 'react-icons/fa6';

import { fetchComponents, fetchEquipment } from '@/api/mes.http';
import { useAuthStore } from '@/store/useAuthStore';
import { useMesAlertStore } from '@/store/useMesAlertStore';
import * as S from '@/assets/css/components/LiveAlertToast.styles';

export default function MesAlertWatcher() {
  const { liveAlert, triggerLiveAlert, clearLiveAlert } = useMesAlertStore();
  const isAuth = useAuthStore((state) => state.isAuth);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const isAuthenticated = isInitialized && isAuth;

  // 동일 경보가 15초 폴링마다 중복으로 계속 뜨는 것을 방지
  const alertedKeysRef = useRef<Set<string>>(new Set());

  const equipmentQuery = useQuery({
    queryKey: ['equipment'],
    queryFn: fetchEquipment,
    enabled: isAuthenticated,
    refetchInterval: 15000,
  });

  const scmQuery = useQuery({
    queryKey: ['scm-components'],
    queryFn: fetchComponents,
    enabled: isAuthenticated,
    refetchInterval: 15000,
  });

  // 실제 설비 이상 / 재고 부족 감지 시 LiveAlertToast 트리거
  useEffect(() => {
    if (!isAuthenticated) return;

    const eqRaw = equipmentQuery.data;
    const equipments = Array.isArray(eqRaw)
      ? eqRaw
      : (eqRaw?.equipments ?? eqRaw?.equipment ?? eqRaw?.data ?? []);

    const compRaw = scmQuery.data;
    const components = Array.isArray(compRaw)
      ? compRaw
      : (compRaw?.components ?? compRaw?.scm ?? compRaw?.data ?? []);

    // 설비가 정상으로 복구되면 기존 경보 기록 삭제
    if (Array.isArray(equipments)) {
      equipments.forEach((e: any) => {
        if (e.status === 'NORMAL') {
          alertedKeysRef.current.delete(`eq-${e.id}-WARNING`);
          alertedKeysRef.current.delete(`eq-${e.id}-ERROR`);
        }
      });
    }

    //부품 재고가 안전재고 이상으로 보충되면 기존 경보 기록 삭제
    if (Array.isArray(components)) {
      components.forEach((c: any) => {
        const isRecovered =
          Number(c.stockQuantity) >= Number(c.minThreshold) && c.status !== 'DANGER';
        if (isRecovered) {
          alertedKeysRef.current.delete(`scm-${c.id}`);
        }
      });
    }

    // 1. 클린룸 설비 ERROR / WARNING 감지
    const dangerEq = Array.isArray(equipments)
      ? equipments.find((e: any) => {
          const isDanger = e.status === 'ERROR' || e.status === 'WARNING';
          const key = `eq-${e.id}-${e.status}`;
          return isDanger && !alertedKeysRef.current.has(key);
        })
      : undefined;

    if (dangerEq) {
      const key = `eq-${dangerEq.id}-${dangerEq.status}`;
      alertedKeysRef.current.add(key);
      triggerLiveAlert({
        title: `클린룸 설비 임계치 이탈 (${dangerEq.status})`,
        description: `${dangerEq.cleanroomZone} · ${dangerEq.equipmentName} (온도 ${dangerEq.temperature}℃ / 습도 ${dangerEq.humidity}%)`,
      });
      return;
    }

    // 2. 부품 안전재고 미달 감지
    const lowComp = Array.isArray(components)
      ? components.find((c: any) => {
          const isLow = Number(c.stockQuantity) < Number(c.minThreshold) || c.status === 'DANGER';
          const key = `scm-${c.id}-${c.stockQuantity}`;
          return isLow && !alertedKeysRef.current.has(key);
        })
      : undefined;

    if (lowComp) {
      const key = `scm-${lowComp.id}-${lowComp.stockQuantity}`;
      alertedKeysRef.current.add(key);
      triggerLiveAlert({
        title: '핵심 부품 안전재고 미달 경보',
        description: `${lowComp.componentName} 현재 재고 ${lowComp.stockQuantity} EA (안전재고 ${lowComp.minThreshold} EA)`,
      });
    }
  }, [isAuthenticated, equipmentQuery.data, scmQuery.data, triggerLiveAlert]);

  // liveAlert가 열리면 정확히 6초(6000ms) 후 자동 닫힘
  useEffect(() => {
    if (!liveAlert) return;

    const timer = window.setTimeout(() => {
      clearLiveAlert();
    }, 6000);

    return () => window.clearTimeout(timer);
  }, [liveAlert, clearLiveAlert]);

  if (!liveAlert) return null;

  return (
    <S.LiveAlertToast role="alert">
      <S.AlertIconBox>
        <FaTriangleExclamation />
      </S.AlertIconBox>

      <div style={{ flex: 1 }}>
        <strong>{liveAlert.title}</strong>
        <p>{liveAlert.description}</p>
      </div>

      <S.CloseBtn
        type="button"
        onClick={clearLiveAlert}
        aria-label="실시간 경보 닫기"
      >
        <FaXmark />
      </S.CloseBtn>
    </S.LiveAlertToast>
  );
}