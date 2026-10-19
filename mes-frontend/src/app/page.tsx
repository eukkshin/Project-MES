import type { Metadata } from "next";
import LoginClientPage from "./auth/login/LoginClientPage";

const metadata: Metadata = {
  title: "로그인",
};

export default function Home() {
  return <LoginClientPage />;
}
