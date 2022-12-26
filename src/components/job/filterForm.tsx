import { EVENT, EventHandler, SORT } from "@/constants";
import { useJobContext } from "@/hooks";
import { StyledBox, StyledSelect, StyledTextField } from "@/styles";
import { Search } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useEffect, useState } from "react";

export const FilterForm: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>(SORT.priority);
  const [filter, setFilter] = useState<string>("all");

  const { priorities } = useJobContext();

  const handleSearch: EventHandler<React.ChangeEvent<HTMLInputElement>> = (
    event
  ) => {
    setSearch(event.target.value);
  };

  const handleSort: EventHandler<SelectChangeEvent> = (event) => {
    setSort(event.target.value);
  };

  const handleFilter: EventHandler<SelectChangeEvent> = (event) => {
    if (event.target.value !== "all") {
      setSort(SORT.priority);
    }
    setFilter(event.target.value);
  };

  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent(EVENT.listRefresh, {
        detail: { search, sort, filter },
      })
    );
  }, [search, sort, filter]);

  return (
    <StyledBox>
      <form id="filter-form">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth>
              <StyledTextField
                id="job-search"
                placeholder="Job Name"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                value={search}
                onChange={handleSearch}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={2}>
            <FormControl fullWidth size="small">
              <StyledSelect
                id="job-priority-sort"
                value={sort}
                onChange={handleSort}
                disabled={filter !== "all"}
              >
                <MenuItem value={SORT.priority}> Priority</MenuItem>
                <MenuItem value={SORT.name}> Name</MenuItem>
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={2}>
            <FormControl fullWidth size="small">
              <StyledSelect
                id="job-priority-filter"
                value={filter}
                onChange={handleFilter}
              >
                <MenuItem value={"all"}> All</MenuItem>
                {priorities.map((priority) => (
                  <MenuItem key={priority.name} value={priority.id}>
                    {priority.name}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </StyledBox>
  );
};
