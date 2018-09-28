import React from 'react';
import { connect } from 'react-redux';
import { unlock, logout } from 'store/auth/actions';
import Clock from 'versa-clock';
import Date from 'components/misc/Date';

class Lockscreen extends React.Component {
   state = {
      password: ''
   };

   handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({ [name]: value });
   }

   render() {
      const { user } = this.props;

      return (
         <div className="auth-container lockpage">
            <div className="auth-row">
               <div className="auth-cell">
                  <div className="container-fluid">
                     <div className="row">
                        <div className="text-center col-sm-12">
                           <Clock showDiem={false} />
                           <Date />
                        </div>
                     </div>
                     <div className="row lock-info">
                        <div className="text-center col-sm-12">
                           <form
                              autoComplete="off"
                              onSubmit={this.unlock.bind(this)}
                           >
                              <div className="form-group">
                                 <label
                                    className="control-label"
                                    htmlFor="lockFormGroup"
                                 >
                                    {user.displayName}
                                 </label>
                                 <img
                                    alt="avatar"
                                    height="128"
                                    src="/assets/image/user-avatar.png"
                                    width="128"
                                 />
                                 <input
                                    onChange={this.handleInputChange.bind(this)}
                                    type="password"
                                    name="password"
                                    id="lockFormGroup"
                                    className="form-control"
                                    placeholder="Password"
                                 />
                                 <button
                                    className="hidden btn btn-default"
                                    type="submit"
                                 >
                                    Unlock
                                 </button>
                              </div>
                           </form>
                        </div>
                     </div>
                     <div className="row">
                        <div className="help-block text-center">
                           Enter your password to retrieve your session
                        </div>
                     </div>
                     <div className="row text-center">
                        <a role="button" onClick={this.logout.bind(this)}>
                           Or sign in as a different user
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   logout(e) {
      e.preventDefault();
      this.props.logout();
   }

   unlock(e) {
      e.preventDefault();
      this.props.unlock(this.state.password);
   }
}

export default connect(
   (state, ownProps) => ({ user: state.getIn(['auth', 'user']).toJS() }),
   { unlock, logout }
)(Lockscreen);
