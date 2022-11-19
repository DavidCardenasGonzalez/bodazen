import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Page from '../containers/Page';
import UsersTable from '../components/UsersTable';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
  title: {
    marginBottom: theme.spacing(5),
  },
  datagrid: {
    flexGrow: 1,
  },
}));

function Employee() {
  const theme = useTheme();
  const history = useHistory();
  const classes = useStyles(theme);

  const onCreateUser = () => {
    history.push('/employee/create');
  };

  const getActionButtons = () => (
    <Grid container direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
      <Grid item>
        <Button variant="outlined" color="primary" onClick={onCreateUser}>Crear Empleado</Button>
      </Grid>
    </Grid>
  );

  const getBreadcrumbs = () => [
    {
      name: 'All Documents',
      link: '/',
    },
    {
      name: 'Empleados',
    },
  ];

  return (
    <Page
      title="Empleados"
      breadcrumbs={getBreadcrumbs()}
      actionItems={getActionButtons()}
    >
      <UsersTable className={classes.datagrid} />
    </Page>
  );
}

export default Employee;
