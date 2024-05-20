import PropTypes from "prop-types";
import BusinessPane from "../../components/BusinessPane";
import { useContext, useEffect, useState } from "react";
import BusinessService from "../../services/business.service";
import { EarnyContext } from "../../context/EarnyContext";
import { Fab, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Validation from "../../helpers/validation.helper";
import Loading from "../../components/Loading";
import AddBusiness from "../../components/AddBusiness";

const BusinessMe = (props) => {
  const [businessPage, setBusinessPage] = useState([]);
  const [ modalOpen, setModalOpen ] = useState(false);
  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);
  const [business, setBusiness ] = useState({name: '', description: ''});
  const [page, setPage] = useState(1);
  const [ isLoading, setLoading ] = useState(false);
  const { handleSnackClick, auth_token } = useContext(EarnyContext);

  
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
      <BusinessPane page={businessPage} isLoading={isLoading}/>
      <Modal
        className='backdrop-blur-[2px]'
        open={modalOpen}
        onClose={handleModalClose}
      >
        <AddBusiness
          setBusinessPage={setBusinessPage}
          businessPage={businessPage}
          handleModalClose={handleModalClose}/>
      </Modal>
      <Fab
        variant="extended"
        className="!fixed bottom-3 right-3 !bg-black !text-white"
        onClick={() => handleModalOpen()}
      >
        <AddIcon className="text-xl" sx={{ mr: 1 }}/>
        Emprende
      </Fab>
    </section>
  );
};
BusinessMe.propTypes = {};
export default BusinessMe;
