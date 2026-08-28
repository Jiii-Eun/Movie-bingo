import { ButtonProps, Button as MuiButton, SxProps } from "@mui/material";

export default function Button({
  children,
  sx,
  isIcon = false,
  ...props
}: ButtonProps & { sx?: SxProps; isIcon?: boolean }) {
  return (
    <MuiButton
      sx={[
        { minWidth: 0 },
        ...(isIcon
          ? [
              {
                borderRadius: "50%",
                padding: "0.4rem",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "var(--color-brand-red)",
                },
              },
            ]
          : []),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
