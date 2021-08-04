import React from "react";
import { TextField, Button } from "@material-ui/core";

interface Props {
  searchFn(query: string): void;
}

export const SearchForm: React.FC<Props> = (props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    props.searchFn((formData.get("query") || "") as string);
  };

  return (
    <form onSubmit={handleSubmit} className={"form-data"}>
      <TextField id="standard-basic" type="text" name="query" label="Search keyword" variant="outlined" />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </form>
  );
};
