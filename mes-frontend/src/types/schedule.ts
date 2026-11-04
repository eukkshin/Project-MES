export type ScheduleType = "PUBLIC" | "PERSONAL" | "NOTICE";

export type ScheduleStatus = "대기" | "진행" | "완료";

export type ApiScheduleStatus = 
| 'PENDING'
| 'IN_PROGRESS'
| 'COMPLETED'

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
  status: ScheduleStatus
  createdAt: string;
}

//백엔드에 보내는 데이터
export interface ScheduleRequest{
  scheduleType: ScheduleType;
  title?:string;
  content: string;
  scheduleDate: string;
  time: string | null;
  alarmEnabled: boolean;
  status: ApiScheduleStatus;
}

export interface ApiSchedule {
  id: number;
  scheduleType: ScheduleType;
  title: string | null;
  content: string;
  scheduleDate: string;
  time: string | null;
  alarmEnabled: boolean | number | string;
  status: ApiScheduleStatus;
  createdAt: string;
}