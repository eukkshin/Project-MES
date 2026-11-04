export interface Schedule {
  id: string;
  year: number;
  month: number;
  date: number;
  time: string | null;
  content: string;
  alarmEnabled: boolean;
  status: "대기" | "진행" | "완료";
  createdAt: string;
}