import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { EarnyContext } from '../../context/EarnyContext';
import Loading from '../Loading';



const UserForm = ({isLogin = true, isUserData = false, onSubmit}) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
  }); 
  const { isLoading } = useContext(EarnyContext);
  const [ accept, setAccept ] = useState(false);
  const setEmail = ({target: {value}}) => {
    const newLoginData = {
      ...loginData,
      email: value,
    };
    setLoginData(newLoginData);
  };
  const setPassword = ({target: {value}}) => {
    const newLoginData = {
      ...loginData,
      password: value,
    };
    setLoginData(newLoginData);
  };
  const setName = ({target: {value}}) => {
    const newUserData = {
      ...userData,
      name: value,
    };
    setUserData(newUserData);
  };
  const setPhone = ({target: {value}}) => {
    const newUserData = {
      ...userData,
      phone: '+57' + value,
    };
    setUserData(newUserData);
  };
  const btnMsg = isUserData ? 'Regístrate' : 'Ingresa';
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(e, {...loginData, ...userData});
    }} className={`rounded-md roboto-medium bg-app-700 text-app-100 p-3 w-9/12 m-auto flex flex-col gap-4 items-center
    relative
    [&>span]:w-full
    [&>span>input]:w-full [&>span>input]:block [&>span>input]:outline-none [&>span>input]:bg-app-100 [&>span>input]:text-app-700
    [&>span>input]:px-2 [&>span>input]:py-1 [&>span>input]:rounded-md
    [&>span>h3]:mr-4`}>

    { isLogin && 
      <>
        <span>
            <h3 className="roboto-bold-italic">* Email:</h3>
            <input type="text" onChange={setEmail}/>
        </span>
        <span>
          <h3 className="roboto-bold-italic">* Contraseña:</h3>
          <input type="password" autoComplete="current-password" onChange={setPassword}/>
      </span>
      </>
    }

    { 
    isUserData && 
    <>
      <span>
        <h3 className="roboto-bold-italic">* Telefono:</h3>
        <span className='flex items-center gap-[1px]'>
          <label className='p-1 bg-app-100 px-2 text-app-700 border-r-app-700 rounded-md rounded-r-none'>+57</label>
          <input type="number" onChange={setPhone} className='w-full rounded-md rounded-l-none bg-app-100 text-app-700 px-2 py-1 outline-none'/>
        </span>
      </span>
      <span>
        <h3 className="roboto-bold-italic">* Nombre:</h3>
        <input type="text" onChange={setName} autoComplete='name'/>
      </span>
      <span className='flex gap-2'>
        
        <p className="roboto-bold-italic text-sm">
        <input type="checkbox" className='size-4 mr-4' onChange={(e) => setAccept(e.target.checked)}/>
          Estoy de acuerdo con las <a className='text-app-purple underline' href="https://www.freeprivacypolicy.com/live/ec4deb7f-0daa-4cee-9520-06e2376a54ba">políticas de privacidad y tratamiento de datos.</a>
        </p>
      </span>
    </>
    }
    {
    isLoading &&
      <Loading/>
    }
    <button disabled={isUserData && !accept}
    className='rounded-full bg-app-100 text-app-700 px-4 py-2 hover:bg-app-600 hover:text-app-100 transition-colors disabled:opacity-10'>
      { btnMsg }
    </button>
    </form>
  );
};

UserForm.propTypes = {
  isLogin: PropTypes.bool,
  isUserData: PropTypes.bool,
  onSubmit: PropTypes.func,
  errors: PropTypes.object,
};

export default UserForm;