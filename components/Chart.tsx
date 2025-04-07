import DoughnutChart from "./DoughnutChart";
type fetchDataProps =
  | {
      id: number;
      name: string;
      email: string;
      age: number;
      status: boolean;
      country: string;
    }[]
  | [];

const Chart = ({ data }: { data: fetchDataProps }) => {
  const statusCounts = {
    active: data.filter((user) => user.status).length,
    inactive: data.filter((user) => !user.status).length,
  };

  const ageGroups = {
    "<20": 0,
    "20-30": 0,
    "30-40": 0,
    "40+": 0,
  };

  data.forEach((user) => {
    if (user.age < 20) ageGroups["<20"]++;
    else if (user.age <= 30) ageGroups["20-30"]++;
    else if (user.age <= 40) ageGroups["30-40"]++;
    else ageGroups["40+"]++;
  });

  return (
    <div className=" w-full mx-auto flex flex-col sm:flex-row  justify-evenly  items-center my-10">
      <DoughnutChart
        Adress="Age"
        labels={Object.keys(ageGroups)}
        values={Object.values(ageGroups)}
        labelName="Users"
        color={["#B5E48C", "#99D98C", "#76C893", "#52B69A"]}
      />
      <DoughnutChart
        Adress="Status"
        labels={Object.keys(statusCounts)}
        values={Object.values(statusCounts)}
        labelName="Users"
        color={["rgb(97, 227, 109)", "rgb(232, 89, 89)"]}
      />
    </div>
  );
};

export default Chart;
