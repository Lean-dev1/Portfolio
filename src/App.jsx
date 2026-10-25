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
          <div><dt>Resultado</dt><dd>{project.result}</dd></div>
        </dl>
        <div className="project__tech">{project.tech}</div>
      </div>
      <div className="project__links">
        <a href="#contacto">Demo</a>
        <a href="#contacto">Código</a>
      </div>
    </article>
  )
}

function ContactForm() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formRef.current) return

    setStatus('sending')

    // Puedes usar variables de entorno o pegar tus strings directamente aquí
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
          placeholder="Hola Leandro, te escribo por una oportunidad / proyecto..."
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
    title: 'MasQueMascotas',
    description: 'Plataforma full-stack para gestionar adopciones directas y facilitar la conexión verificable entre refugios y adoptantes.',
    role: 'Arquitectura y desarrollo full-stack',
    tech: 'NODE.JS / EXPRESS / REACT / DOCKER',
    result: 'Flujo centralizado de publicación, consulta y contacto.',
  },
  {
    number: '02',
    title: 'Simulador de Inversiones — FL Agency',
    description: 'Sistema de seguimiento de acciones del Merval, CEDEARs y NASDAQ con actualización de cotizaciones en tiempo real.',
    role: 'Backend y modelado de datos',
    tech: 'PYTHON / POSTGRESQL / DOCKER / REACT',
    result: 'Información financiera consolidada en una única interfaz.',
  },
  {
    number: '03',
    title: 'Herramientas Neon Flex Premium',
    description: 'Herramientas internas para la generación consistente de presupuestos y la gestión ordenada de activos digitales.',
    role: 'Diseño de sistema y desarrollo full-stack',
    tech: 'JAVASCRIPT / REACT / NODE.JS',
    result: 'Reducción de tareas manuales en la operación comercial.',
  },
]

export default function App() {
  return (
    <>
      <Header />
      <main>
        <section className="hero shell" id="inicio">
          <div className="eyebrow">Buenos Aires, Argentina · GMT-3</div>
          <h1>Diseño de Sistemas y<br />Desarrollo Full-Stack.</h1>
          <p className="hero__intro">
            Diseño arquitecturas de software y desarrollo sistemas mantenibles con React, Node.js, Python, PostgreSQL y Docker. Orquesto el ciclo completo de construcción aplicando fundamentos teóricos sólidos, modelado de dominio e inteligencia artificial para evolucionar productos con precisión.
          </p>
          <div className="hero__actions">
            <LinkButton href="#proyectos" variant="primary">Ver proyectos</LinkButton>
            <LinkButton href="#contacto">Contactar</LinkButton>
          </div>
          <div className="facts">
            <div><span>Ubicación</span><strong>Buenos Aires, AR</strong></div>
            <div><span>Formación</span><strong>Universidad Siglo 21</strong></div>
            <div><span>Enfoque</span><strong>Arquitectura · Full-Stack</strong></div>
            <div><span>Contacto</span><a href="#contacto">Enviar mensaje</a></div>
          </div>
        </section>

        <div className="shell">
          <Section id="perfil" number="01" title="Perfil y Arquitectura">
            <div className="profile-grid">
              <div className="prose">
                <p>Construyo sistemas robustos, escalables y testeables, con especial atención al modelado del dominio, la definición de requerimientos y la claridad de las interfaces. Busco que cada decisión estructural pueda explicarse y sostenerse.</p>
                <p>Priorizo los principios de ingeniería antes que las herramientas de moda. Dirijo y acelero la implementación técnica apoyándome en flujos asistidos por IA, asegurando control de calidad, arquitectura limpia y coherencia de punta a punta.</p>
              </div>
              <div>
                <h3 className="subheading">Fundamentos Teóricos</h3>
                <ul className="foundation-list">
                  {[
                    'Programación Orientada a Objetos (POO)',
                    'Paradigma Funcional',
                    'Estructuras de Datos Lineales y No Lineales',
                    'Complejidad Algorítmica (Big O)',
                    'Principios SOLID',
                    'Patrones de Diseño',
                    'Arquitectura Cliente-Servidor',
                    'Diseño de APIs REST',
                    'Modelado Entidad-Relación',
                  ].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </Section>

          <Section id="stack" number="02" title="Stack técnico">
            <div className="text-table">
              <TableRow label="Frontend">React, TypeScript, JavaScript, HTML, CSS</TableRow>
              <TableRow label="Backend">Node.js, Express, Python, Java, APIs REST</TableRow>
              <TableRow label="Bases de datos">PostgreSQL, MongoDB, SQL, modelado relacional</TableRow>
              <TableRow label="Infraestructura">Docker, Docker Compose, Linux, despliegues reproducibles</TableRow>
              <TableRow label="Herramientas">Git, GitHub, Postman, Figma, Orquestación con IA</TableRow>
            </div>
          </Section>

          <Section id="proyectos" number="03" title="Proyectos">
            <div className="project-list">
              {projects.map((project) => <ProjectRow project={project} key={project.number} />)}
            </div>
          </Section>

          <Section id="formacion" number="04" title="Formación">
            <div className="education">
              <TableRow label="2024 — ACTUALIDAD"><strong>Universidad Siglo 21</strong><br />Licenciatura en Informática</TableRow>
              <TableRow label="2024"><strong>Desarrollo Full-Stack</strong><br />Arquitectura de aplicaciones web, APIs y bases de datos</TableRow>
              <TableRow label="2023"><strong>Fundamentos de programación</strong><br />Algoritmos, estructuras de datos y orientación a objetos</TableRow>
            </div>
          </Section>
        </div>

        <Section id="contacto" number="05" title="Contacto" className="contact">
          <div className="shell contact__inner">
            <div className="contact-grid">
              <div>
                <h2>Contacto</h2>
                <p>Disponible para prácticas profesionales, posiciones junior y proyectos freelance con objetivos y alcance definidos.</p>
                <a className="contact__email" href="mailto:leandro.jerez.dev@gmail.com">leandro.jerez.dev@gmail.com</a>
                <div className="contact__links">
                  <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
                  <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
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