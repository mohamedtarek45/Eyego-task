const Th = ({
  handleSort,
  sortConfig,
  visibleName,
  name,
}: {
  handleSort: (column: string) => void;
  sortConfig:
    | []
    | {
        col: string;
        dir: "ASC" | "DESC";
      }[];
  visibleName: string;
  name: string;
}) => {
  const x = sortConfig.findIndex((item) => item.col === name);
  return (
    <th
      className="py-2 px-4 w-1/5 text-sm font-semibold text-gray-600 hover:cursor-pointer"
      onClick={() => handleSort(name)}
    >
      {visibleName}

      {x !== -1 && (
        <span className="ml-2 text-green-500">
          {sortConfig[x].dir === "ASC" ? "↓" : "↑"}
        </span>
      )}
    </th>
  );
};

export default Th;
