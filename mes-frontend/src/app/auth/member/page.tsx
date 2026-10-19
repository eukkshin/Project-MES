import type { Metadata } from "next";
import MemberClientPage from "./MemberClientPage";

export const metadata: Metadata = {
  title: "회원가입",
};

export default function MemberPage() {
  return <MemberClientPage />;
}
