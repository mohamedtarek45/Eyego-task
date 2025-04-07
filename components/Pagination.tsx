"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationDemo({
  page,
  setPage,
  numberOfPages,
}: {
  page: number;
  setPage: (page: number) => void;
  numberOfPages: number;
}) 
{
  const pagesToShow: number[] = [];
  if (page > 1) pagesToShow.push(page - 1);
  pagesToShow.push(page);
  if (page < numberOfPages) pagesToShow.push(page + 1);
  const showEndEllipsis = page + 1 < numberOfPages - 1;
  const showLastPage = page + 1 < numberOfPages;
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="hover:cursor-pointer"
            onClick={() => page > 1 && setPage(page - 1)}
          />
        </PaginationItem>
        {pagesToShow.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              className="hover:cursor-pointer"
              onClick={() => setPage(p)}
              isActive={page === p}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        {showEndEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {showLastPage && (
          <PaginationItem>
            <PaginationLink
              className="hover:cursor-pointer"
              onClick={() => setPage(numberOfPages)}
              isActive={page === numberOfPages}
            >
              {numberOfPages}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            className="hover:cursor-pointer"
            onClick={() => page < numberOfPages && setPage(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
