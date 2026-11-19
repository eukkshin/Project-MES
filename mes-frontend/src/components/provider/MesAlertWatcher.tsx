
'use client';

import React, { useEffect, useRef } from 'react';
import { FaTriangleExclamation, FaXmark } from 'react-icons/fa6';

import { useAuthStore } from '@/store/useAuthStore';
import { useMesAlertStore } from '@/store/useMesAlertStore';
import * as S from '@/assets/css/components/LiveAlertToast.styles';
import { useGetEquipment } from '@/hooks/useEquipment';
import { useGetSCMComponents } from '@/hooks/useSCM';

// 경보 기록 저장 키
const ALERT_STORAGE_KEY = 'mes-alerted-keys';

// 수동 설비 상태 변경 기록 키
const MANUAL_STATUS_KEY = 'mes-manual-equipment-status';

export default function MesAlertWatcher() {
  const { liveAlert, triggerLiveAlert, clearLiveAlert } =
    useMesAlertStore();

  const isAuth = useAuthStore((state) => state.isAuth);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const isAuthenticated = isInitialized && isAuth;

  // 컴포넌트가 유지되는 동안 경보 기록 관리
  const alertedKeysRef = useRef<Set<string> | null>(null);

  const equipmentQuery = useGetEquipment({
    enabled: isAuthenticated,
    refetchInterval: 15000,
  });

  const scmQuery = useGetSCMComponents({
    enabled: isAuthenticated,
    refetchInterval: 15000,
  });

  // 실제 설비 이상 / 재고 부족 감지
  useEffect(() => {
    if (!isAuthenticated) return;

    // 1. 새로고침 후에도 기존 경보 기록 복원
    if (alertedKeysRef.current === null) {
      try {
        const savedKeys = sessionStorage.getItem(ALERT_STORAGE_KEY);
        const parsedKeys = savedKeys ? JSON.parse(savedKeys) : [];

        alertedKeysRef.current = new Set<string>(
          Array.isArray(parsedKeys) ? parsedKeys : []
        );
      } catch {
        alertedKeysRef.current = new Set<string>();
      }
    }

    const alertedKeys = alertedKeysRef.current;

    const equipments = equipmentQuery.data ?? [];
    const components = scmQuery.data ?? [];

    // 경보 기록 저장 함수
    const saveAlertedKeys = () => {
      sessionStorage.setItem(
        ALERT_STORAGE_KEY,
        JSON.stringify([...alertedKeys])
      );
    };

    // 2. 설비가 정상으로 복구되면 기존 경보 기록 삭제
    equipments.forEach((e) => {
      if (e.status === 'NORMAL') {
        alertedKeys.delete(`eq-${e.id}-WARNING`);
        alertedKeys.delete(`eq-${e.id}-ERROR`);
      }
    });

    // 3. 부품 재고가 안전재고 이상으로 회복되면 기존 경보 기록 삭제
    components.forEach((c) => {
      const isRecovered =
        Number(c.stockQuantity) >= Number(c.minThreshold) &&
        c.status !== 'DANGER';

      if (isRecovered) {
        [...alertedKeys]
          .filter((key) => key.startsWith(`scm-${c.id}-`))
          .forEach((key) => alertedKeys.delete(key));
      }
    });

    // 4. 수동으로 변경한 설비 상태 확인
    const manualStatus = sessionStorage.getItem(MANUAL_STATUS_KEY);

    if (manualStatus) {
      try {
        const { id, nextStatus } = JSON.parse(manualStatus);

        const changedEquipment = equipments.find(
          (e) => e.id === Number(id) && e.status === nextStatus
        );

        if (changedEquipment) {
          // 수동 변경 상태는 경보 기록에 등록해 알림 방지
          alertedKeys.add(`eq-${changedEquipment.id}-${changedEquipment.status}`);

          // 수동 변경 기록은 확인 후 삭제
          sessionStorage.removeItem(MANUAL_STATUS_KEY);
        }
      } catch {
        sessionStorage.removeItem(MANUAL_STATUS_KEY);
      }
    }

    // 5. 설비 ERROR / WARNING 감지
    const dangerEq = equipments.find((e) => {
      const isDanger =
        e.status === 'ERROR' || e.status === 'WARNING';

      const key = `eq-${e.id}-${e.status}`;

      return isDanger && !alertedKeys.has(key);
    });

    if (dangerEq) {
      const key = `eq-${dangerEq.id}-${dangerEq.status}`;

      alertedKeys.add(key);
      saveAlertedKeys();

      triggerLiveAlert({
        title: `클린룸 설비 임계치 이탈 (${dangerEq.status})`,
        description: `${dangerEq.cleanroomZone} · ${dangerEq.equipmentName} (온도 ${dangerEq.temperature}℃ / 습도 ${dangerEq.humidity}%)`,
      });

      return;
    }

    // 6. 부품 안전재고 미달 감지
    const lowComp = components.find((c) => {
      const isLow =
        Number(c.stockQuantity) < Number(c.minThreshold) ||
        c.status === 'DANGER';

      const key = `scm-${c.id}-${c.stockQuantity}`;

      return isLow && !alertedKeys.has(key);
    });

    if (lowComp) {
      const key = `scm-${lowComp.id}-${lowComp.stockQuantity}`;

      alertedKeys.add(key);
      saveAlertedKeys();

      triggerLiveAlert({
        title: '핵심 부품 안전재고 미달 경보',
        description: `${lowComp.componentName} 현재 재고 ${lowComp.stockQuantity} EA (안전재고 ${lowComp.minThreshold} EA)`,
      });

      return;
    }

    // 복구로 삭제된 기록도 저장
    saveAlertedKeys();

  }, [
    isAuthenticated,
    equipmentQuery.data,
    scmQuery.data,
    triggerLiveAlert,
  ]);

  // 경보 발생 후 6초 뒤 자동 닫힘
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
