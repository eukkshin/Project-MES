export type ScheduleType = "PUBLIC" | "PERSONAL" | "NOTICE";

export interface Schedule {
  id: number;
  scheduleType: ScheduleType;
  title?: string;
  content: string;
  year: number;
  month: number;
  date: number;
  time: string | null;
  alarmEnabled: boolean;
  status: "대기" | "진행" | "완료";
  createdAt: string;
}