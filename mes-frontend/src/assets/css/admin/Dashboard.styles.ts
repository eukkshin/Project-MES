import styled from "styled-components";

export { Eyebrow } from "./Admin.styles";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100%;
  min-height: 0;
  min-width: 0;
`;

export const DashboardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DashboardTitle = styled.h1`
  margin: 0;
  color: #172033;
  font-size: 27px;
  font-weight: 800;
  letter-spacing: -0.8px;
`;

export const DashboardDescription = styled.p`
  margin: 0;
  color: #94a3b8;
  font-size: 13px;
  line-height: 1.6;
`;

export const CalendarLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  min-width: 0;
  min-height: 0;

  > * {
    flex: 1;
    min-height: 0;
    min-width: 0;
  }
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: 100%;
`;
