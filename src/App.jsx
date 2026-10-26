import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

function LinkButton({ children, href, variant = 'text', onClick, download, type = 'button', disabled = false }) {
  const className = `button button--${variant}`
  return href ? (
    <a className={className} href={href} download={download}>
      {children}
    </a>
  ) : (
    <button className={className} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  )
}

function Section({ id, number, title, children, className = '' }) {
  return (
    <section className={`section ${className}`} id={id}>
      <div className="section__label">{number} — {title}</div>
      {children}
    </section>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [
    ['Perfil', '#perfil'],
    ['Fundamentos', '#fundamentos'],
    ['Stack', '#stack'],
    ['Proyectos', '#proyectos'],
    ['Formación', '#formacion'],
    ['Contacto', '#contacto'],
  ]
  return (
    <header className="header shell">
      <a className="wordmark" href="#inicio">Leandro Jerez</a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Cerrar' : 'Menú'}
      </button>
      <nav className={open ? 'nav nav--open' : 'nav'} id="navigation" aria-label="Navegación principal">
        {links.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a className="nav__cv" href="/cv-leandro-jerez.pdf" download>CV (PDF)</a>
      </nav>
    </header>
  )
}

function TableRow({ label, children }) {
  return (
    <div className="table-row">
      <div className="table-row__label">{label}</div>
      <div>{children}</div>
    </div>
  )
}

function ProjectRow({ project }) {
  return (
    <article className="project">
      <div className="project__number">{project.number}</div>
      <div className="project__body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <dl className="project__details">
          <div><dt>Rol</dt><dd>{project.role}</dd></div>
          <div><dt>Arquitectura</dt><dd>{project.result}</dd></div>
        </dl>
        <div className="project__tech">{project.tech}</div>
      </div>
      <div className="project__links">
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer">Demo</a>
        )}
        <a href={project.repo} target="_blank" rel="noreferrer">GitHub ↗</a>
      </div>
    </article>
  )
}

function ContactForm() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formRef.current) return

    setStatus('sending')

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'TU_SERVICE_ID'
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'TU_TEMPLATE_ID'
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'TU_PUBLIC_KEY'

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      setStatus('success')
      formRef.current.reset()
    } catch (error) {
      console.error('Error al enviar el correo:', error)
      setStatus('error')
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
      <div className="form-field">
        <label htmlFor="user_name">Nombre / Empresa</label>
        <input
          id="user_name"
          type="text"
          name="user_name"
          placeholder="Ej. María Gómez — Tech Recruiter"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="user_email">Correo electrónico</label>
        <input
          id="user_email"
          type="email"
          name="user_email"
          placeholder="correo@empresa.com"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="message">Mensaje o propuesta</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Hola Leandro, te escribo por una propuesta..."
          required
        />
      </div>

      <LinkButton
        type="submit"
        variant="light"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Enviando mensaje...' : 'Enviar mensaje'}
      </LinkButton>

      {status === 'success' && (
        <div className="form-status" role="status">
          ✓ Mensaje enviado correctamente. Te responderé a la brevedad.
        </div>
      )}
      {status === 'error' && (
        <div className="form-status" role="alert">
          ✕ Hubo un problema al enviar. Por favor, escríbeme directo a leandro.jerez.dev@gmail.com.
        </div>
      )}
    </form>
  )
}

const projects = [
  {
    number: '01',
    title: 'ALIA — Simulador de Inversiones',
    description: 'Plataforma financiera para la simulación de carteras y seguimiento de activos en los mercados Merval, CEDEARs y NASDAQ con actualización de cotizaciones y análisis de rendimiento.',
    role: 'Arquitectura Backend & Modelado de Datos',
    tech: 'JAVA / NODE.JS / POSTGRESQL / DOCKER / REACT',
    result: 'Integración de datos bursátiles, persistencia transaccional y entorno contenedorizado.',
    repo: 'https://github.com/Lean-dev1/ALIA/tree/dev',
  },
  {
    number: '02',
    title: 'MasQueMascotas',
    description: 'Sistema full-stack diseñado para centralizar adopciones directas y conectar refugios con adoptantes mediante una arquitectura de servicios desacoplada.',
    role: 'Desarrollo Backend & Full-Stack (Colaborativo)',
    tech: 'NODE.JS / EXPRESS / REACT / DOCKER / POSTGRESQL',
    result: 'Diseño de API RESTful, lógica de dominio y orquestación con Docker Compose.',
    repo: 'https://github.com/faustinaretamar/MasQueMascotas',
  },
  {
    number: '03',
    title: 'Motor ARPG 2D (Inspirado en Path of Exile)',
    description: 'Videojuego de rol de acción en 2D desarrollado íntegramente en Java. Implementa mecánicas de progresión, cálculo dinámico de atributos, sistema de combate, inventario y detección de colisiones en tiempo real.',
    role: 'Ingeniería de Software & Diseño Orientado a Objetos',
    tech: 'JAVA / POO AVANZADA / PATRONES DE DISEÑO / TDA',
    result: 'Aplicación intensiva de polimorfismo, máquinas de estados, bucle de juego (game loop) y estructuras de datos.',
    repo: 'https://github.com/Lean-dev1/VideoJuego-en-2d',
  },
  {
    number: '04',
    title: 'Neonflex Web',
    description: 'Aplicación web comercial orientada a la automatización de presupuestos a medida, gestión de catálogo y optimización del flujo de ventas para el rubro de cartelería.',
    role: 'Diseño de Sistema & Desarrollo Full-Stack',
    tech: 'JAVASCRIPT / REACT / NODE.JS / EXPRESS / POSTGRESQL',
    result: 'Digitalización de reglas de negocio para cotizaciones y reducción de tiempos operativos.',
    repo: 'https://github.com/Lean-dev1/Neonflex-web',
  },
]

export default function App() {
  return (
    <>
      <Header />
      <main>
        <section className="hero shell" id="inicio">
          <div className="eyebrow">Buenos Aires, Argentina · GMT-3</div>
          <h1>Ingeniero de Software y<br />Especialista en Desarrollo Backend.</h1>
          <p className="hero__intro">
            Diseño y construyo servicios backend robustos, APIs escalables y arquitecturas de datos con Node.js, Python, PostgreSQL y Docker. Orquesto el ciclo completo de ingeniería aplicando fundamentos teóricos sólidos y modelado de dominio para resolver problemas complejos de negocio.
          </p>
          <div className="hero__actions">
            <LinkButton href="#proyectos" variant="primary">Ver proyectos</LinkButton>
            <LinkButton href="#contacto">Contactar</LinkButton>
          </div>
          <div className="facts">
            <div><span>Ubicación</span><strong>Buenos Aires, AR</strong></div>
            <div><span>Formación</span><strong>Ing. en Informática (UBA)</strong></div>
            <div><span>Especialidad</span><strong>Arquitectura & Backend</strong></div>
            <div><span>Contacto</span><a href="#contacto">Enviar mensaje</a></div>
          </div>
        </section>

        <div className="shell">
          <Section id="perfil" number="01" title="Perfil y Enfoque">
            <div className="profile-grid">
              <div className="prose">
                <p>
                  Construyo sistemas backend robustos, escalables y mantenibles, con especial atención al modelado del dominio, la integridad transaccional y la claridad en la arquitectura. Me atrae especialmente el diseño de infraestructuras bancarias y sistemas críticos, donde la consistencia de los datos y la tolerancia a fallos no son opcionales. Orquesto el ciclo de desarrollo combinando fundamentos teóricos sólidos para construir el software con precisión.
                </p>

                <div className="personal-notes">
                  <h3>Más allá del código</h3>
                  <p>
                    Mi relación con la informática empezó de chico y de la forma más práctica posible. Rompiendo sin querer las computadoras de mi mamá y metiéndome de lleno a investigar cómo arreglarlas por mi cuenta. A esa curiosidad técnica se sumó mi fascinación por los videojuegos, particularmente el <em>God of War</em>. Las ganas de crear uno propio me llevaron a descubrir cómo se programaban por dentro, y ahí supe a qué quería dedicarme. Hoy me encuentro cursando Ingeniería en Informática en la Universidad de Buenos Aires.
                  </p>
                  <p>
                    Más allá del software puro, me apasiona la frontera donde el código interactúa con el mundo físico: la electrónica, la robótica y la inteligencia artificial. Mi mayor aspiración profesional es dominar e integrar estas áreas para construir tecnología de alto impacto que aporte al desarrollo productivo y tecnológico en mi país, Argentina.
                  </p>
                
                </div>
              </div>

              <div>
                <figure className="portrait-card">
                  <img
                    src="/emma.png"
                    alt="Retrato de Leandro Jerez"
                    className="portrait-img"
                  />
                  <figcaption className="portrait-caption">
                    <span>Leandro Jerez</span>
                    <span>Buenos Aires, AR</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </Section>

          <Section id="fundamentos" number="02" title="Fundamentos Teóricos">
            <div className="text-table">
              <TableRow label="Paradigmas de Programación">
                Programación Orientada a Objetos (POO), Paradigma Funcional, Inmutabilidad, Programación Asíncrona
              </TableRow>
              <TableRow label="Teoría de Algoritmos (TDA)">
                Programación Dinámica, Divide y Vencerás, Algoritmos Greedy, Estructuras Lineales y No Lineales (Grafos, Árboles), Complejidad Computacional (Big O)
              </TableRow>
              <TableRow label="Calidad y Diseño de Software">
                Test-Driven Development (TDD), Principios SOLID, Patrones de Diseño (GoF), Clean Architecture, Separación de Responsabilidades
              </TableRow>
              <TableRow label="Sistemas y Backend">
                Arquitectura Cliente-Servidor, Diseño de APIs RESTful, Concurrencia, Idempotencia y Tolerancia a Fallos
              </TableRow>
              <TableRow label="Ingeniería de Datos">
                Modelado Entidad-Relación (DER), Normalización, Transaccionalidad (Propiedades ACID), Integridad Referencial e Indexación
              </TableRow>
            </div>
          </Section>

          <Section id="stack" number="03" title="Stack técnico">
            <div className="text-table">
              <TableRow label="Backend & APIs">Node.js, Express, Python, Java, Diseño de APIs REST, Microservicios</TableRow>
              <TableRow label="Bases de datos">PostgreSQL, SQL, Modelado relacional y NoSQL</TableRow>
              <TableRow label="Infraestructura">Docker, Linux, Entornos reproducibles</TableRow>
              <TableRow label="Frontend (Complementario)">React, JavaScript</TableRow>
              <TableRow label="Herramientas & Flujo">Git, GitHub, Uso inteligente de herramientas IA</TableRow>
            </div>
          </Section>

          <Section id="proyectos" number="04" title="Proyectos">
            <div className="project-list">
              {projects.map((project) => <ProjectRow project={project} key={project.number} />)}
            </div>
          </Section>

          <Section id="formacion" number="05" title="Formación">
            <div className="education">
              <TableRow label="2023 - Actualidad"><strong>Universidad de Buenos Aires (UBA)</strong><br />Ingeniería en Informática</TableRow>
             
            </div>
          </Section>
        </div>

        <Section id="contacto" number="06" title="Contacto" className="contact">
          <div className="shell contact__inner">
            <div className="contact-grid">
              <div>
                <h2>Contacto</h2>
                <p>Disponible para el desarrollo de arquitecturas backend, integración de sistemas, consultoría técnica y proyectos de ingeniería de software con alcance definido.</p>
                <a className="contact__email" href="mailto:leandro31jerez@gmail.com">leandro31jerez@gmail.com</a>
                <div className="contact__links">
                  <a href="https://www.linkedin.com/in/leandro-emmanuel-jerez-8094511ba/" target="_blank" rel="noreferrer">LinkedIn</a>
                  <a href="https://github.com/Lean-dev1" target="_blank" rel="noreferrer">GitHub</a>
                </div>
                <div className="response-time">Tiempo de respuesta habitual: 24 horas.</div>
              </div>

              <ContactForm />
            </div>
          </div>
        </Section>
      </main>
      <footer className="footer shell">
        <span>© 2026 Leandro Jerez</span>
        <span>Buenos Aires, Argentina</span>
      </footer>
    </>
  )
}