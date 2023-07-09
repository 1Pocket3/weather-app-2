import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import { TableCell, TextField } from '@mui/material';


const useStyles = makeStyles((theme: any) => ({
  filterRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  filterInput: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.grey[800],
    color: '#fff',
  },
  tableCell: {
    color: '#fff',
  },
  chartContainer: {
    marginTop: theme.spacing(4),
  },
}));

const FilterRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
  marginRight: "5px",
});

const FilterInput = styled(TextField)({
  marginRight: '1rem',
  backgroundColor: '#333',
  color: '#fff',
});

const TableCellStyled = styled(TableCell)({
  color: '#fff',
  cursor: "pointer"
});

export { useStyles, FilterRow, FilterInput, TableCellStyled };
