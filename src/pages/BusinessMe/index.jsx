import PropTypes from "prop-types";
import BusinessPane from "../../components/BusinessPane";
import { useContext, useEffect, useState } from "react";
import BusinessService from "../../services/business.service";
import { EarnyContext } from "../../context/EarnyContext";
import { Fab, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Validation from "../../helpers/validation.helper";

const BusinessMe = (props) => {
  const [businessPage, setBusinessPage] = useState([]);
  const [ modalOpen, setModalOpen ] = useState(false);
  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);
  const [business, setBusiness ] = useState({name: ''});
  const [page, setPage] = useState(1);
  const { setLoading, handleSnackClick, auth_token, auth, navigate } = useContext(EarnyContext);
  const formOnAddBusiness = e => {
    const alertProps = {
        severity: 'error',
        variant: 'filled',
      };
    e.preventDefault();
    if(!Validation.validBusinessname(business.name)){
        alertProps.message = 'Tu nombre de empresa no es válido.';
        return handleSnackClick(alertProps);
    }
    setLoading(true);
    BusinessService.addBusiness(business, auth_token)
        .then(resp => {
            if(resp.error){
            alertProps.message = resp.message;
            }else{
            alertProps.message = `¡Qué bien! ${business.name} ha visto la luz.`;
            alertProps.severity = 'success';
            setBusinessPage([...businessPage, resp]);
            handleModalClose();
            }
        })
        .catch(err => {
            if(err.message){
            alertProps.message = err.message;
            return;
            }
            alertProps.message = 'Ha ocurrido un error.';
        })
        .finally( () => {
            handleSnackClick(alertProps);
            setLoading(false);
        });
  };

  useEffect(() => {
    setLoading(true);
    const alertProps = {
      severity: "error",
      variant: "filled",
    };
    BusinessService.getMe(auth_token)
      .then((result) => {
        if (result.error) {
          if (result.message) {
            alertProps.message = result.message;
          } else {
            alertProps.message = "¡Ups! Parece que ha ocurrido un problema.";
          }
          handleSnackClick(alertProps);
          setBusinessPage([]);
        } else {
          setBusinessPage(result);
        }
      })
      .catch((err) => {
        if (err.message) {
          alertProps.message = err.message;
        } else {
          alertProps.message = "¡Ups! Parece que ha ocurrido un problema.";
        }
        handleSnackClick(alertProps);
        setBusinessPage([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);


  return (
    <section className="m-auto w-3/4">
      <h2 className="bebas-neue-regular text-4xl text-app-100 select-none">
        Tus Negocios
      </h2>
      <p className="roboto-medium text-app-100 mb-2 select-none">
        ¡Nos encanta ver que progresas!
      </p>
      <BusinessPane page={businessPage} />
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
      >
        <section className='bg-app-purple p-4 text-app-100 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <h2 className="bebas-neue-regular text-4xl select-none">
                Inicia tu emprendimiento
            </h2>
            <form className="w-full flex flex-col items-center" onSubmit={formOnAddBusiness}>
                <span className=" w-full
                    [&>input]:w-full [&>input]:block [&>input]:outline-none [&>input]:bg-app-100 [&>input]:text-app-700
                    [&>input]:px-2 [&>input]:py-1 [&>input]:rounded-md
                    [&>h3]:mr-4">
                    <h3 className="roboto-bold-italic">Nombre de tu negocio:</h3>
                    <input type="text" onChange={e => setBusiness({...business, name: e.target.value})} autoComplete='name'/>
                </span>
                <button
                className='rounded-full mt-3 bg-app-100 text-app-700 px-4 py-2 hover:bg-app-600 hover:text-app-100 transition-colors'>
                    ¡Vamos!
                </button>
            </form>
        </section>
      </Modal>
      <Fab
        className="!fixed bottom-3 right-3 !bg-black !text-white"
        onClick={() => handleModalOpen()}
      >
        <AddIcon className="text-xl" />
      </Fab>
    </section>
  );
};
BusinessMe.propTypes = {};
export default BusinessMe;
