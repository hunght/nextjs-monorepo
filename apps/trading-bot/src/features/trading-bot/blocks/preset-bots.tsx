import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { Grid, TextField } from '@mui/material';
import * as React from 'react';

export const PresetBots: React.FC = ({ children }) => {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ flexGrow: 1, overflowY: 'auto' }}>
      <TreeItem nodeId="1" label="Select existing bots">
        {children}
      </TreeItem>
      <TreeItem nodeId="5" label="Or create bot from preset config">
        <TreeItem nodeId="10" label="TradeAlts Safer Settings">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <TextField fullWidth value={1} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth value={2} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth value={3} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth value={4} />
            </Grid>
          </Grid>
        </TreeItem>
        <TreeItem nodeId="6" label="Lite v3" />
        <TreeItem nodeId="8" label="UltraLite v6" />
      </TreeItem>
    </TreeView>
  );
};
