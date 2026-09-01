"use client";

import { getGenres } from "@/api/actions";
import {
  AppleTVLogo,
  DisneyPlusLogo,
  NetflixLogo,
  PrimeVideoLogo,
} from "@/components/common/OttLogo";
import { useApi } from "@/hooks/apiHook";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";
import { Genre } from "streaming-availability";
import {
  StreamingAvailabilityCatalog,
  StreamingAvailabilityShowType,
} from "@/type/apiType";

export default function SideFilter({
  showType,
  setShowType,
  catalogs,
  setCatalogs,
  selectGenre,
  setSelectGenre,
  setYearRange,
  yearRange,
}: {
  showType: StreamingAvailabilityShowType;
  setShowType: (showType: StreamingAvailabilityShowType) => void;
  catalogs: StreamingAvailabilityCatalog[];
  setCatalogs: (catalogs: StreamingAvailabilityCatalog[]) => void;
  selectGenre: string;
  setSelectGenre: (selectGenre: string) => void;
  setYearRange: (yearRange: number[]) => void;
  yearRange: number[];
}) {
  const labelClasses = {
    fontSize: "1rem",
    fontWeight: "bold",
    margin: 0,
  };

  const checkboxClasses = {
    padding: "0.25rem",
    color: "#fff",
    textColor: "#fff",
    "&.Mui-checked": {
      color: "var(--color-brand-red)",
      textColor: "#fff",
    },
  };

  const { data: genres } = useApi<Genre[]>(["genres"], () => getGenres());

  const handleGenreChange = (e: SelectChangeEvent<string>) => {
    setSelectGenre(e.target.value);
  };

  const handleYearChange = (_e: Event, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) return;
    setYearRange(newValue);
  };

  const handleShowTypeChange = (
    _e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setShowType(value as StreamingAvailabilityShowType);
  };

  const handleCatalogChange =
    (id: StreamingAvailabilityCatalog) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCatalogs(
        e.target.checked
          ? [...catalogs, id]
          : catalogs.filter((catalog) => catalog !== id),
      );
    };

  return (
    <>
      <div className="flex flex-col gap-4 md:max-w-60 max-w-24">
        <FormControl className="show-type">
          <h4>영화 / 시리즈</h4>
          <RadioGroup
            value={showType}
            name="show-type"
            onChange={handleShowTypeChange}
          >
            <FormControlLabel
              value="movie"
              sx={labelClasses}
              control={<Radio sx={checkboxClasses} />}
              label="영화"
            />
            <FormControlLabel
              value="series"
              sx={labelClasses}
              control={<Radio sx={checkboxClasses} />}
              label="시리즈"
            />
          </RadioGroup>
        </FormControl>
        <FormGroup className="catalog-type">
          <h4>카탈로그</h4>
          <div className="grid grid-cols-1 gap-1">
            <FormControlLabel
              sx={labelClasses}
              control={
                <Checkbox
                  sx={checkboxClasses}
                  checked={catalogs.includes("netflix")}
                  onChange={handleCatalogChange("netflix")}
                />
              }
              label={<NetflixLogo className="md:w-21 md:h-10 w-16 h-10" />}
            />
            <FormControlLabel
              sx={labelClasses}
              control={
                <Checkbox
                  sx={checkboxClasses}
                  checked={catalogs.includes("prime")}
                  onChange={handleCatalogChange("prime")}
                />
              }
              label={<PrimeVideoLogo className="md:w-21 md:h-10 w-16 h-10" />}
            />
            <FormControlLabel
              sx={labelClasses}
              control={
                <Checkbox
                  sx={checkboxClasses}
                  checked={catalogs.includes("disney")}
                  onChange={handleCatalogChange("disney")}
                />
              }
              label={<DisneyPlusLogo className="md:w-16 md:h-16 w-10 h-10" />}
            />
            <FormControlLabel
              sx={labelClasses}
              control={
                <Checkbox
                  sx={checkboxClasses}
                  checked={catalogs.includes("apple")}
                  onChange={handleCatalogChange("apple")}
                />
              }
              label={<AppleTVLogo className="md:w-20 md:h-16 w-16 h-10" />}
            />
          </div>
        </FormGroup>
        <FormControl className="genre-select bg-brand-black">
          <InputLabel id="genre-select-label" sx={{ color: "#fff" }}>
            장르
          </InputLabel>
          <Select
            labelId="genre-select-label"
            id="genre-select"
            value={selectGenre}
            label="장르"
            onChange={handleGenreChange}
            sx={{
              color: "#fff",
              textColor: "#fff",
              borderColor: "#fff",
              backgroundColor: "var(--color-brand-black)",
              "& .MuiSelect-icon": {
                color: "#fff",
                textColor: "#fff",
              },
            }}
          >
            <MenuItem value="all">전체</MenuItem>
            {genres?.map((genre) => (
              <MenuItem
                key={genre.id}
                value={genre.id.toString()}
                sx={{
                  backgroundColor: "var(--color-brand-black)",
                  color: "#fff",
                  textColor: "#fff",
                  "& .MuiSelect-icon": {
                    color: "#fff",
                    textColor: "#fff",
                  },
                  "&:hover": {
                    backgroundColor: "var(--color-brand-red-muted)",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "var(--color-brand-red)",
                  },
                }}
              >
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="mx-2">
          <h4>연도</h4>
          <Slider
            getAriaLabel={() => "Minimum distance"}
            value={yearRange}
            onChange={handleYearChange}
            getAriaValueText={(value: number) => `${value}`}
            step={1}
            valueLabelDisplay="auto"
            min={1990}
            max={2026}
          />
          <div className="text-xl">
            {yearRange[0]}년 ~ {yearRange[1]}년
          </div>
        </div>
      </div>
    </>
  );
}
