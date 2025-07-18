import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/app/_components/header"
import { Footer } from "@/app/_components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vật Tư Nông Nghiệp - Cung cấp vật tư nông nghiệp chất lượng cao",
  description:
    "Chuyên cung cấp hạt giống, phân bón, thuốc BVTV, máy móc nông nghiệp chính hãng với giá cả cạnh tranh nhất thị trường.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
