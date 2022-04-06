import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import type { APICredential } from '@prisma/client';
import * as React from 'react';
import { useDeleteAPICredentialMutation } from 'redux/api';

const columns = ({
  onClickDelete,
  onClickEdit,
}: {
  onClickDelete: (id: string) => void;
  onClickEdit: (id: string) => void;
}): GridColDef[] => [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'name', width: 130 },
  { field: 'apiKey', headerName: 'apiKey', width: 130 },
  { field: 'apiSecret', headerName: 'apiSecret', width: 130 },
  { field: 'type', headerName: 'type', width: 130 },
  {
    field: 'col5',
    headerName: 'Name 5',
    width: 150,

    renderCell: ({ id }) => {
      return (
        <Button
          onClick={() => {
            onClickEdit(id.toString());
          }}>
          Edit
        </Button>
      );
    },
  },
  {
    field: 'col6',
    headerName: 'Name 6',
    width: 150,
    renderCell: ({ id }) => {
      return (
        <Button
          onClick={() => {
            onClickDelete(id.toString());
          }}>
          Delete
        </Button>
      );
    },
  },
];

export const APICredentialTable: React.FC<{ apis: APICredential[] }> = ({
  apis,
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | undefined>();
  const [deleteAPICredential, { isLoading }] = useDeleteAPICredentialMutation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div style={{ height: 400, width: '100%', marginTop: 20 }}>
      <DataGrid
        rows={apis}
        columns={columns({
          onClickDelete: (id: string) => {
            setSelectedId(id);
            handleClickOpen();
          },
          onClickEdit: (id: string) => {
            setSelectedId(id);
            console.log(`==== id ===`);
            console.log(id);
            console.log('==== end log ===');
          },
        })}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You really want to delete this api credential
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              if (selectedId) {
                deleteAPICredential({ id: selectedId });
              }
            }}
            autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
