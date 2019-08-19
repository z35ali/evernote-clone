import React from 'react';
import fire from '../config/Fire';
import 'bootstrap/dist/css/bootstrap.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      password2: '',
      signup: false
    };
  }

  loginFailed = () => {
    toast.error('Incorrect Login', {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1500
    });
  };

  signUpFailed = () => {
    toast.error('Sign Up Error', {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1500
    });
  };

  passwordsNotMatch = () => {
    toast.error('Passwords Do Not Match', {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1500
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        console.log(error);
        this.loginFailed();
      });
  };

  signup = e => {
    e.preventDefault();
    if (this.state.password === this.state.password2) {
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(u => {})
        .then(u => {
          console.log(u);
        })
        .catch(error => {
          console.log(error);
          this.signUpFailed();
        });
    } else {
      this.passwordsNotMatch();
    }
  };

  render() {
    return (
      <div className='col-md-6'>
        <h1>{this.state.signup ? 'Sign Up' : 'Log In'}</h1>
        <form>
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>Email address</label>
            <input
              value={this.state.email}
              onChange={this.handleChange}
              type='email'
              name='email'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter email'
            />
            <small id='emailHelp' className='form-text text-muted'>
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>Password</label>
            <input
              value={this.state.password}
              onChange={this.handleChange}
              type='password'
              name='password'
              className='form-control'
              id='exampleInputPassword1'
              placeholder='Password'
            />
          </div>
          {this.state.signup ? (
            <>
              <label htmlFor='exampleInputPassword2'>Confirm Password</label>
              <input
                value={this.state.password2}
                onChange={this.handleChange}
                type='password'
                name='password2'
                className='form-control'
                id='exampleInputPassword2'
                placeholder='Confirm Password'
              />
              <br />
            </>
          ) : (
            <></>
          )}
          <button
            type='submit'
            onClick={e => {
              e.preventDefault();
              if (!this.state.signup) {
                this.login(e);
              }
              this.setState({
                signup: false
              });
            }}
            className='btn btn-primary'
            style={{ backgroundColor: '#29487d', borderColor: '#29487d' }}
          >
            Login
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              if (this.state.signup) {
                this.signup(e);
              }
              this.setState({
                signup: true
              });
            }}
            style={{ marginLeft: '25px' }}
            className='btn btn-success'
          >
            Signup
          </button>
        </form>
      </div>
    );
  }
}
export default Login;
