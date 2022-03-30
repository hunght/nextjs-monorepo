import { Skeleton, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { isEmpty, isNil } from 'ramda';
import * as React from 'react';
import type { FC } from 'react';

type Props = {
  loading: boolean;
  onClickAdd: (data: {
    apiKey: string;
    apiSecret: string;
    name: string;
  }) => void;
};

export const AddNewAPICard: FC<Props> = ({ onClickAdd, loading }) => {
  const [apiKey, setApiKey] = React.useState('');
  const [apiName, setApiName] = React.useState('');
  const [apiSecret, setApiSecret] = React.useState('');
  if (loading) {
    <Skeleton />;
  }
  return (
    <Card sx={{}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Add new API
        </Typography>
        <TextField
          fullWidth
          onChange={(e) => {
            setApiName(e.target.value);
          }}
          value={apiName}
          label="Name"
          variant="standard"
        />
        <TextField
          fullWidth
          onChange={(e) => {
            setApiKey(e.target.value);
          }}
          value={apiKey}
          label="API Key"
          variant="standard"
        />
        <TextField
          fullWidth
          onChange={(e) => {
            setApiSecret(e.target.value);
          }}
          value={apiSecret}
          label="API Secret"
          variant="standard"
        />
      </CardContent>
      <CardActions>
        <Button
          disabled={isEmpty(apiKey) || isEmpty(apiSecret) || isEmpty(apiName)}
          size="medium"
          color="primary"
          onClick={() => {
            onClickAdd({ apiKey, apiSecret, name: apiName });
          }}>
          Add
        </Button>
        <Button size="small" color="info">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};
