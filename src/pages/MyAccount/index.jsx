import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { EarnyContext } from '../../context/EarnyContext';
import { Avatar, Skeleton } from '@mui/material';
import Validation from '../../helpers/validation.helper';
import UserService from '../../services/user.service';
import Loading from '../../components/Loading';
const MyAccount = props => {
    const { auth, handleSnackClick, auth_token } = useContext(EarnyContext);
    const [updateUser, setUpdateUser] = useState({...auth, password: ''});
    const setName = e => {
        if(e.target.value.length == 0){
            return setUpdateUser({...updateUser, name: auth.name });
        }  
        setUpdateUser({...updateUser, name: e.target.value});
    };
    const setPhone = e => {
        if(e.target.value.length == 0){
            return setUpdateUser({...updateUser, phone: auth.phone });
        }  
        setUpdateUser({...updateUser, phone: '+57'+e.target.value});
    };
    const setEmail = e => {
        if(e.target.value.length == 0){
            return setUpdateUser({...updateUser, email: auth.email });
        }  
        setUpdateUser({...updateUser, email: e.target.value});
    };
    const setPassword = e => {
        if(e.target.value.length == 0){
            return setUpdateUser({...updateUser, password: '' });
        }  
        setUpdateUser({...updateUser, password: e.target.value});
    };
    let existChanges = false;
    if (auth){
        existChanges = updateUser.name != auth.name || updateUser.phone != auth.phone || updateUser.email != auth.email || updateUser.password.length > 0;
    }
    useEffect(() => setUpdateUser({...auth, password: ''}), [auth]);
    const handleSubmit = e => {
        e.preventDefault();
        const alertProps = {
            severity: 'error',
            variant: 'filled',
        };
        const body = {};
        if( updateUser.name != auth.name ){
            if( Validation.validRealName(updateUser.name) ){
                body.name = updateUser.name;
            }else{
                alertProps.message = 'Tu nombre no es válido.';
                return handleSnackClick(alertProps);
            }
        }
        if( updateUser.phone != auth.phone ){
            if( Validation.validPhoneNumber(updateUser.phone) ){
                body.phone = updateUser.phone;
            }else{
                alertProps.message = 'Tu telefono no es válido.';
                return handleSnackClick(alertProps);
            }
        }
        if( updateUser.email != auth.email ){
            if( Validation.validEmail(updateUser.email) ){
                body.email = updateUser.email;
            }else{
                alertProps.message = 'Tu email no es válido.';
                return handleSnackClick(alertProps);
            }
        }
        if( updateUser.password.length > 0){
            if( Validation.isSecurePassword(updateUser.password) ){
                body.password = updateUser.password;
            }else{
                alertProps.message = 'Tu contraseña es muy débil.';
                return handleSnackClick(alertProps);
            }
        }
        handleSnackClick({
            severity: 'info',
            message: 'Esto puede tardar unos segundos.',
            variant: 'filled',
        });
        UserService.updateMe(auth_token, body)
            .then(result => {
                if(result.error){
                    alertProps.message = 'Intentalo denuevo en unos minutos.';
                    return;
                }
                alertProps.severity = 'success';
                alertProps.message = 'Tu usuario ha sido actualizado con éxito. Recarga para ver los cambios.';
            })
            .catch( err => {
                if(err.message){
                  alertProps.message = err.message;
                  return;
                }
                alertProps.message = 'Ha ocurrido un error.';
              })
            .finally(() => {
                handleSnackClick(alertProps);
            });

    };
  return (
    <section className="m-auto w-3/4">
        {
        auth ? 
            <>
                <h2 className='bebas-neue-regular text-4xl text-app-100 select-none drop-shadow-xl flex items-center gap-3'>
                    <Avatar
                                sx={{bgcolor: '#4E54C8'}}
                                className="size-24 text-5xl text-center flex border-2 border-grey-200 justify-center items-center cursor-pointer relative">
                                { auth.name.split(' ').slice(0, 2).reduce((p, c) => p + c[0],'').toUpperCase() }
                    </Avatar>
                    {auth.name}
                </h2>
                <form onSubmit={handleSubmit} className='mt-10 m-auto flex flex-col gap-3 w-1/2 bg-black p-4
                rounded-sm
                [&>span]:py-3 [&>span]:border-b [&>span]:border-white [&>span]:border-opacity-30
                [&>span]:flex [&>span]:gap-3 [&>span]:items-center
                [&>span>input]:flex-grow
                [&>span>input]:px-2 [&>span>input]:py-1 [&>span>input]:rounded-md [&>span>input]:outline-none
                [&>span>label]:font-medium [&>span>label]:text-app-100'>

                    <h3 className='roboto-bold text-app-100 text-xl'>Actualiza tus datos</h3>
                    <span>
                        <label>Nombre: </label>
                        <input type="text" placeholder={auth.name} onChange={setName}/>
                    </span>
                    <span>
                        <label>Teléfono: </label>
                        <input type="number" placeholder={auth.phone} onChange={setPhone}/>
                    </span>
                    <span>
                        <label>Email: </label>
                        <input type="text" placeholder={auth.email} onChange={setEmail}/>
                    </span>
                    <span>
                        <label>Contraseña: </label>
                        <input type="password" placeholder='******' onChange={setPassword}/>
                    </span>
                    {
                        existChanges && <button className='px-3 py-2 bg-app-purple text-white rounded-sm'>Guardar</button>
                    }
                </form>
            </>
            :
            <>
                <h2 className='bebas-neue-regular text-4xl text-app-100 select-none drop-shadow-xl flex items-center gap-3'>
                    <Skeleton className='size-24' variant='circular'/>
                    <Skeleton variant='rectangular' className='flex-grow h-18'/>
                </h2>
            </>
        }

    </section>
  );
};
MyAccount.propTypes = {};
export default MyAccount;