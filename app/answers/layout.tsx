import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Answers - Clubverse",
  description: "Get instant answers about Clubverse",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnswersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
