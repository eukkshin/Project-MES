import type { Metadata } from "next";
import LoginClientPage from "./auth/login/LoginClientPage";

export const metadata: Metadata = {
  title: "로그인",
};

export default function Home() {
  return <LoginClientPage />;
}
