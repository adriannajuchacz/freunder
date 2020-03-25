import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { login } from "../../actions/authActions";

export class Register extends Component {
  render() {
    return (
      <div>
        <Grid container justify="center" alignItems="center">
          <Grid item md={6} xs={10}>
            <Box borderColor="primary.main" borderRadius={16} p={4} border={1}>
              <form>
                <FormControl fullWidth>
                  <TextField
                    id="standard-basic"
                    margin="normal"
                    label="email"
                  />
                  <br />
                  <TextField id="standard-basic" margin="normal" label="name" />
                  <br />
                  <TextField
                    id="standard-basic"
                    margin="normal"
                    type="password"
                    label="password"
                  />
                  <br />
                  <TextField
                    id="standard-basic"
                    margin="normal"
                    type="password"
                    label="re-enter password"
                  />
                  <br />
                </FormControl>
                <Grid container justify="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    margin="normal"
                    onClick={login()}
                  >
                    Register
                  </Button>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Register;
