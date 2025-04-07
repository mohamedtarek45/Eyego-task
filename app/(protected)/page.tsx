import Chart from "@/components/Chart";
import Header from "@/components/Header";
import Table from "@/components/Table";

const Page = async () => {
  const response = await fetch(
    "https://67a26ed1409de5ed525569e4.mockapi.io/users",
    {cache:"no-store"}
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  console.log("sercer side from page");
  return (
    <>
      <div className="w-full sm:w-[85%] min-h-screen  mx-auto flex flex-col items-center ">
        <Header />
        <Chart data={data}/>
        <Table data={data} />
      </div>
    </>
  );
};

export default Page;
