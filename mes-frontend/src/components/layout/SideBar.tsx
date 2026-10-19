"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaChartLine,
  FaChevronRight,
  FaClipboardCheck,
  FaGear,
  FaIndustry,
  FaLayerGroup,
  FaMicrochip,
  FaSliders,
  FaUsers,
  FaWarehouse,
} from "react-icons/fa6";

import * as S from "@/assets/css/components/Sidebar.styles";

const menuGroups = [
  {
    title: "WORKSPACE",
    items: [
      {
        label: "대시보드",
        href: "/admin",
        icon: FaLayerGroup,
      },
    ],
  },
  {
    title: "MES 업무",
    items: [
      {
        label: "라인공정제어",
        href: "/admin/process",
        icon: FaIndustry,
      },
      {
        label: "핵심부품 SCM",
        href: "/admin/components",
        icon: FaWarehouse,
      },
      {
        label: "비전품질검사",
        href: "/admin/quality",
        icon: FaClipboardCheck,
      },
      {
        label: "클린룸 & 설비",
        href: "/admin/cleanroom",
        icon: FaMicrochip,
      },
      {
        label: "실시간 통합관제",
        href: "/admin/analytics",
        icon: FaChartLine,
      },
    ],
  },
  {
    title: "시스템 관리",
    items: [
      {
        label: "기준정보관리",
        href: "/master-data",
        icon: FaSliders,
      },
      {
        label: "사용자관리",
        href: "/users",
        icon: FaUsers,
      },
      {
        label: "시스템환경설정",
        href: "/settings",
        icon: FaGear,
      },
    ],
  },
];

export const SideBar = () => {
  const pathname = usePathname();

  return (
    <S.AsideContainer>
      <S.Brand as={Link} href="/admin">
        <S.BrandIcon>
          <FaIndustry />
        </S.BrandIcon>

        <S.BrandText>
          <strong>Smart MES</strong>
          <span>MANAGEMENT SYSTEM</span>
        </S.BrandText>
      </S.Brand>

      <S.Navigation>
        {menuGroups.map((group) => (
          <S.MenuSection key={group.title}>
            <S.SectionTitle>{group.title}</S.SectionTitle>

            <S.MenuList>
              {group.items.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin" &&
                    pathname.startsWith(`${item.href}/`));

                return (
                  <li key={item.href}>
                    <S.MenuItem as={Link} href={item.href} $active={isActive}>
                      <Icon />

                      <span>{item.label}</span>

                      {isActive && <FaChevronRight />}
                    </S.MenuItem>
                  </li>
                );
              })}
            </S.MenuList>
          </S.MenuSection>
        ))}
      </S.Navigation>

      <S.SidebarBottom>
        <S.SystemIndicator>
          <S.StatusDot />
          시스템 운영 중
        </S.SystemIndicator>

        <S.Version>Smart MES v1.2.0</S.Version>
      </S.SidebarBottom>
    </S.AsideContainer>
  );
};
