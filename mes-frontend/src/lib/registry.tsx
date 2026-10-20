"use client";

import { useServerInsertedHTML } from 'next/navigation';
import React, { useState } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
  /* 서버사이드 랜더링은 웹페이지의 화면을 서버에서 미리 그려서 사용자에게 보내는 방식 */
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });
  // 클라이언트 사이드에서는 그대로 렌더링
  if (typeof window !== "undefined") {
    return <>{children}</>;
  }

  // 서버 사이드에서는  StyleSheetManager로 감싸서 스타일 수집
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
