
const Th = ({
  handleSort,
  sortConfig,
  visibleName,
  name,
}: {
  handleSort: (column: string) => void;
  sortConfig:
    | []
    | [
        {
          col: string;
          dir: "ASC" | "DESC";
        }
      ];
  visibleName: string;
  name: string;
}) => {
  
  return (
    <th
      className="py-2 px-4 w-1/5 text-sm font-semibold text-gray-600 hover:cursor-pointer"
      onClick={() => handleSort(name)}
    >
      {visibleName}
      
      {sortConfig.findIndex((item) => item.col === name) !== -1 && (
        <span className="ml-2 text-green-500">
          
          {
         /* @ts-expect-error: We are sure that `find` returns a value when the index is found. */
          sortConfig.find((item) => item.col === name).dir === "ASC"
            ? "↓"
            : "↑"}
        </span>
      )}
    </th>
  );
};

export default Th;
