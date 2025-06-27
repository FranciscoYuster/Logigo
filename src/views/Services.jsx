import React from 'react';

const carouselItems = [
  {
    src: '/Images/Registro de productos.mov',
    alt: 'Registro de productos',
    title: 'Registro de productos fácil y rápido',
    desc: 'Los usuarios pueden agregar productos de manera sencilla, especificando su nombre, cantidad, precio y detalles importantes. Todo se guarda en tiempo real y es accesible desde cualquier dispositivo.'
  },
  {
    src: '/Images/Control de stock.mov',
    alt: 'Control de stock',
    title: 'Control de stock en tiempo real',
    desc: 'Los usuarios tienen acceso inmediato a la cantidad de productos disponibles, sin tener que hacer cálculos o revisar múltiples fuentes.'
  },
  {
    src: '/Images/Informes y reportes.png',
    alt: 'Informes y reportes',
    title: 'Informes y reportes de inventario',
    desc: 'Los usuarios pueden generar informes detallados del estado de su inventario, lo que facilita la toma de decisiones para el negocio.'
  },
  {
    src: '/Images/Interfaz amigable.mov',
    alt: 'Interfaz amigable',
    title: 'Interfaz amigable y sencilla',
    desc: 'A diferencia de otros sistemas complejos, Logigo tiene una interfaz intuitiva que permite a los usuarios navegar sin problemas, sin necesidad de capacitación técnica.'
  }
];

const Services = () => {
  return (
    <div className="view-container">
      <div className="container-fluid my-5 text-center text-white">
        <h1 className="text-white">¡Services!</h1>
        <p className="text-white"> 
          Sistema de Inventario diseñado para optimizar la gestión y el control de activos.
        </p>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {carouselItems.map((_, idx) => (
              <button
                key={idx}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={idx}
                className={idx === 0 ? 'active' : ''}
                aria-current={idx === 0 ? 'true' : undefined}
                aria-label={`Slide ${idx + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {carouselItems.map((item, idx) => (
              <div className={`carousel-item${idx === 0 ? ' active' : ''}`} key={idx}>
                {item.src.endsWith('.mov') ? (
                  <video className="d-block w-100 img-fluid" controls autoPlay loop muted>
                    <source src={item.src} type="video/mp4" />
                    Tu navegador no soporta el video.
                  </video>
                ) : (
                  <img src={item.src} className="d-block w-100 img-fluid" alt={item.alt} />
                )}
                <div className="carousel-caption d-none d-md-block">
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
