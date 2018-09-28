import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propTypes, reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import BackgroundImage from '../../assets/image/bg-3.jpg';
import { Notification, translate, userLogin } from 'react-admin';

const LoginPage = styled.div`
   background-image: url(${BackgroundImage});
   position: absolute;
   background-position: center;
   background-size: cover;
   background-repeat: no-repeat;
   width: 100%;
   height: 100%;
`;

const StyledCard = styled(Card)`
    minWidth: 300,
    marginTop: '6em'
`;

const StyledField = styled(Field)`
   margintop: 1em;
`;

const StyledCardActions = styled(CardActions)`
   padding: 0 1em 1em 1em;
`;

const StyledForm = styled.div`
   padding: 0 1em 1em 1em;
`;

const LoginBox = styled.div`
   width: 460px;
   margin: 10% auto;
   opacity: 0.9;
`;

const LoginBoxBody = styled.div`
   background-color: rgba(254, 254, 254, 0.82);
   padding: 40px 60px 40px 60px;
   border-radius: 0 0 10px 10px;
   border-top: 0;
   color: #666;
   flex-grow: 2;
`;

const LoginLogo = styled.div`
   font-size: 35px;
   text-align: center;
   font-weight: 300;
   color: white;
   background-color: rgba(64, 110, 153, 0.73);
`;

// see http://redux-form.com/6.4.3/examples/material-ui/
const renderInput = ({
   meta: { touched, error } = {},
   input: { ...inputProps },
   ...props
}) => (
   <TextField
      error={!!(touched && error)}
      helperText={touched && error}
      {...inputProps}
      {...props}
      fullWidth
   />
);

class Login extends Component {
   login = auth =>
      this.props.userLogin(
         auth,
         this.props.location.state
            ? this.props.location.state.nextPathname
            : '/'
      );

   render() {
      const { handleSubmit, isLoading, translate } = this.props;
      return (
         <LoginPage>
            <LoginBox>
               <StyledCard>
                  <LoginLogo>{process.env.REACT_APP_NAME}</LoginLogo>
                  <LoginBoxBody>
                     <form onSubmit={handleSubmit(this.login)}>
                        <StyledForm>
                           <StyledField
                              name="username"
                              component={renderInput}
                              label={translate('ra.auth.username')}
                              disabled={isLoading}
                           />
                           <StyledField
                              name="password"
                              component={renderInput}
                              label={translate('ra.auth.password')}
                              type="password"
                              disabled={isLoading}
                           />

                           <StyledCardActions>
                              <Button
                                 variant="raised"
                                 type="submit"
                                 color="primary"
                                 disabled={isLoading}
                                 fullWidth
                              >
                                 {isLoading && (
                                    <CircularProgress size={25} thickness={2} />
                                 )}
                                 {translate('ra.auth.sign_in')}
                              </Button>
                           </StyledCardActions>
                           <Grid container alignItems="center">
                              <Grid item xs={6}>
                                 <a href="/account/register">
                                    {' '}
                                    Don't have an account?{' '}
                                 </a>
                              </Grid>
                              <Grid item xs={6}>
                                 <a href="/account/register">
                                    {' '}
                                    Forgot password?{' '}
                                 </a>
                              </Grid>
                           </Grid>
                        </StyledForm>
                     </form>
                  </LoginBoxBody>
               </StyledCard>
               <Notification />
               <p
                  style={{
                     textAlign: 'right',
                     color: 'white',
                     marginBottom: 0
                  }}
               >
                  {' '}
                  VersaSuite™ 2018
               </p>
               <p style={{ textAlign: 'right', color: 'white' }}>
                  {' '}
                  Version {process.env.REACT_APP_VERSION}{' '}
               </p>
            </LoginBox>
         </LoginPage>
      );
   }
}

Login.propTypes = {
   ...propTypes,
   authProvider: PropTypes.func,
   classes: PropTypes.object,
   previousRoute: PropTypes.string,
   translate: PropTypes.func.isRequired,
   userLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });

const enhance = compose(
   translate,
   reduxForm({
      form: 'signIn',
      validate: (values, props) => {
         const errors = {};
         const { translate } = props;
         if (!values.username) {
            errors.username = translate('ra.validation.required');
         }
         if (!values.password) {
            errors.password = translate('ra.validation.required');
         }
         return errors;
      }
   }),
   connect(
      mapStateToProps,
      { userLogin }
   )
);

export default enhance(Login);
