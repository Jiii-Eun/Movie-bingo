import Alert from "@mui/material/Alert";

export default function Error({ error }: { error: Error }) {
  return (
    <Alert severity="error" className="mb-4">
      Error: {error.message}
    </Alert>
  );
}
