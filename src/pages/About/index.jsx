import PropTypes from "prop-types";
import me from "/me.png";
const About = (props) => {
  return (
    <section className="w-3/4 m-auto">
      <h2 className="bebas-neue-regular text-4xl text-app-100 select-none">
        Sobre mí
      </h2>
      <p className="roboto-medium text-app-100 mb-2 select-none flex gap-3">
        <img src={me} className="w-60 rounded-full" />
        <span className='roboto-regular'>
          <p className=''>
            Soy - en definitiva - una persona que ama el conocimiento y cree en
            todo el futuro que es posible edificar con él. Estudiante de tercer
            semestre en la Universidad Nacional de Colombia; dedico mi tiempo
            libre al aprendizaje de nuevas tecnologías y el desarrollo de
            diversos proyectos a partir de éstas.
          </p>
          <ul className='list-none [&>li]:my-2'>
              <li>
                <h2 className="font-medium list-none">Nombre:</h2> Juan Esteban
                Arango Zapata.
              </li>
              <li>
                <h2 className="font-medium list-none">Edad:</h2> 18 años.
              </li>
              <li>
                <h2 className="font-medium list-none">Ubicación:</h2> Medellín,
                Antioquia.
              </li>
              <li>
                <h2 className="font-medium list-none">Redes:</h2>
                <p className="flex">
                    <a href="https://www.linkedin.com/in/juan-e-arango-z-7617792ab"><img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png" width="40"/></a>
                    <a href="https://github.com/EsJuan-az"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="40"/></a>
                    <a href="mailto:juarangoz@unal.edu.co"><img src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png" width="40"/></a>
                    <a href="https://stackoverflow.com/users/23618356/juan-esteban-arango-zapata"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png" width="50"/></a>
                    <a href="https://www.fiverr.com/juan_es_05?up_rollout=true"><img src="https://freelogopng.com/images/all_img/1656739457fiverr-transparent-logo.png" width="40"/></a>
                    <a href="https://www.freelancer.com.co/u/juarangozx?sb=t"><img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/freelancer_logo_icon_171122.png" width="40"/></a>
                </p>
              </li>

          </ul>
        </span>
      </p>
    </section>
  );
};
About.propTypes = {};
export default About;
