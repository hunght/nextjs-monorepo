import { Button, Checkbox } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import type { TradingBot } from '@prisma/client';
import * as React from 'react';

const columns = ({
  onClickDelete,
  onClickEdit,
  onSelectCurrentAPI,
}: {
  onClickDelete: (id: string) => void;
  onClickEdit: (id: string) => void;
  onSelectCurrentAPI: (id: string) => void;
}): GridColDef[] => [
  { field: 'botId', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'name', width: 530 },
  {
    field: 'col5',
    headerName: '',
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
    headerName: '',
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
  {
    field: 'col7',
    headerName: 'Current API',
    width: 150,
    renderCell: ({ id }) => {
      return (
        <Checkbox
          onClick={() => {
            onSelectCurrentAPI(id.toString());
          }}
        />
      );
    },
  },
];

type Props = {
  apis: TradingBot[];
  onDeleteItem: (id: string) => void;
};

export const TradingBotTable: React.FC<Props> = ({ apis, onDeleteItem }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | undefined>();

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
          onSelectCurrentAPI: (id: string) => {
            setSelectedId(id);
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
                onDeleteItem(selectedId);
                handleClose();
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
