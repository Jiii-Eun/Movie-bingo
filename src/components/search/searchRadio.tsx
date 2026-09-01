import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function SearchRadio({
  name,
  id,
  label,
}: {
  name: string;
  id: string;
  label: string;
}) {
  return (
    <>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label={label} />
      </FormGroup>
    </>
  );
}
