import Header from "../components/header";
import Sidebar from "../components/sidebar";



export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header/>
      <div className="flex flex-row ">
        <Sidebar/>
        <main className="flex-1 mt-[65px] ml-64">
          {children}
        </main>
    </div>
</>
  );
}

