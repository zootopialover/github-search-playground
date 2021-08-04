import React from "react";
import { GitHubRepository } from "../models";
import Avatar from '@material-ui/core/Avatar';
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import moment from "moment";

interface Props {
  repositories?: Array<GitHubRepository>;
  total?: number;
  fetchData?: any
}

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: 200,
    editable: false,
    disableColumnMenu: true,
  },
  {
    field: "owner",
    headerName: "Owner",
    width: 200,
    editable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      const { owner } = params.row;
      if (owner) {
        return (
          <span>
            <Avatar src={owner.avatar_url} alt={owner.login} />{" "}
            <span>{owner.login}</span>
          </span>
        );
      } else {
        return "Unknown";
      }
    },
  },
  {
    field: "stargazers_count",
    headerName: "Stars",
    width: 190,
    editable: false,
    disableColumnMenu: true,
  },
  {
    field: "created_at",
    headerName: "Created at",
    width: 200,
    editable: false,
    disableColumnMenu: true,
    valueFormatter: (params) => {
      const valueFormatted = moment(params.row.created_at).format("DD/MM/YYYY");
      return valueFormatted;
    },
  },
];

export const ListRepositories: React.FC<Props> = ({ repositories = [], total = 0, fetchData }) => {
  const [page_number, setPageNumber] = React.useState(1);
  const [sortModel, setSortModel] = React.useState([
    {
      field: 'name',
      sort: 'asc' as any,
    },
  ]);
  
  const handlePageChange = (page: number) => {
    if(fetchData) {
      const searchParams = { page };
      fetchData(searchParams, sortModel[0]);
    }
    setPageNumber(page);
  }

  const handleSortChange = (model: any) => {
    if(fetchData) {
      const searchParams = { page: page_number };
      fetchData(searchParams, model[0]);
    }
    setSortModel(model);
  }

  return (
    <div className={"result-table"}>
      <DataGrid
        rows={repositories}
        columns={columns}
        pageSize={20}
        rowCount={total}
        paginationMode="server"
        onPageChange={(newPage: number) => handlePageChange(newPage)}
        sortModel={sortModel}
        onSortModelChange={(model: any) => handleSortChange(model)}
      />
    </div>
  );
};
