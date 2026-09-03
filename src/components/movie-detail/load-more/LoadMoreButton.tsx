"use client";

import AddIcon from "@mui/icons-material/Add";
import Button from "@/components/common/Button";

export default function LoadMoreButton({
  onClick,
  disabled = false,
  label = "더보기",
}: {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <div className="flex justify-center py-4">
      <Button
        onClick={onClick}
        disabled={disabled}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          color: "#fff",
          borderRadius: "0.5rem",
          padding: "0.625rem 1.25rem",
          fontSize: "0.875rem",
          gap: "0.25rem",
          "&:hover": {
            backgroundColor: "var(--color-brand-red)",
          },
          "&.Mui-disabled": {
            color: "rgba(255, 255, 255, 0.3)",
          },
        }}
      >
        {label}
        <AddIcon sx={{ fontSize: "1.125rem" }} />
      </Button>
    </div>
  );
}
