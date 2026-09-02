"use client";

import { useResize } from "@/hooks/resize";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

export default function ContentPagination({
  totalCount = 1,
  onChange,
  className,
}: {
  totalCount?: number;
  onChange?: (page: number) => void;
  className?: string;
}) {
  const pageSize = useResize();

  const [internalPage, setInternalPage] = useState(1);
  const currentPage = totalCount ?? internalPage;

  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));

  const handleChange = (value: number) => {
    if (totalCount === undefined) {
      setInternalPage(value);
    }
    onChange?.(value);
  };

  return (
    <div className={`flex justify-center ${className ?? ""}`}>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={(_, value) => handleChange(value)}
        siblingCount={1}
        boundaryCount={1}
        disabled={pageCount <= 1}
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#fff",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            color: "#fff",
            backgroundColor: "var(--color-brand-red)",
            "&:hover": {
              backgroundColor: "var(--color-brand-red-hover)",
            },
          },
          "& .MuiPaginationItem-root:hover": {
            color: "#fff",
            backgroundColor: "rgba(228, 57, 70, 0.2)",
          },
        }}
      />
    </div>
  );
}
