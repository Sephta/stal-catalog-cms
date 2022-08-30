import React  from 'react';
import {useLocation} from 'react-router-dom';
import { getGitHubUrl } from '../components/common/getGitHubUrl';

const Login = (props) => {
  const location = useLocation();
  let from = location.state?.from?.pathname || '/';

  return (
    <div>
      <h1>LOGIN</h1>
      <p><a href={getGitHubUrl(from)}>Login with GitHub</a></p>
    </div>
  );
};

export default Login;