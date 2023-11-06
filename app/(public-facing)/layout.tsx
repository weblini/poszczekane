import Footer from "app/_components/Footer";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
        {children}
        <Footer />
    </>
  )
}