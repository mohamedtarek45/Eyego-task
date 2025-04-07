import ProtectRoute from "@/components/ProtectRoute";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectRoute>{children}</ProtectRoute>;
}
