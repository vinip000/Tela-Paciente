import './style.css'

interface Appointment {
  id: string
  title: string
  date: string
  time: string
  status: 'confirmed' | 'pending' | 'concluded'
}

interface Notification {
  id: string
  title: string
  time: string
}

// Mock data
const appointments: Appointment[] = [
  {
    id: '1',
    title: 'Consulta Inicial',
    date: '15/10/2025',
    time: '10:00',
    status: 'confirmed'
  },
  {
    id: '2',
    title: 'Exames de Retina',
    date: '22/10/2025',
    time: '14:30',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Consulta de Retorno',
    date: '05/09/2025',
    time: '09:00',
    status: 'concluded'
  }
]

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Sua consulta do dia 15/10 foi confirmada',
    time: '2 horas atrás'
  },
  {
    id: '2',
    title: 'Lembrete: Atualizar seus dados cadastrais',
    time: '1 dia atrás'
  },
  {
    id: '3',
    title: 'Nova campanha de doação disponível',
    time: '3 dias atrás'
  }
]

// Get the next appointment
function getNextAppointment(): Appointment | undefined {
  return appointments.find(a => a.status !== 'concluded')
}

// Render status badge
function renderStatusBadge(status: string): string {
  const statusClass = `status-${status}`
  const statusText = {
    confirmed: 'confirmado',
    pending: 'pendente',
    concluded: 'concluído'
  }
  return `<span class="appointment-status ${statusClass}">${statusText[status as keyof typeof statusText]}</span>`
}

// Render appointments list
function renderAppointments(): string {
  return appointments
    .map(apt => `
      <div class="appointment-item">
        <div class="appointment-details">
          <div class="appointment-title">📋 ${apt.title}</div>
          <div class="appointment-date">📅 ${apt.date} ⏰ ${apt.time}</div>
        </div>
        ${renderStatusBadge(apt.status)}
      </div>
    `)
    .join('')
}

// Render notifications
function renderNotifications(): string {
  return notifications
    .map(notif => `
      <div class="notification-item">
        <div class="notification-dot"></div>
        <div class="notification-content">
          <div class="notification-title">● ${notif.title}</div>
          <div class="notification-time">${notif.time}</div>
        </div>
      </div>
    `)
    .join('')
}

// Format date from YYYY-MM-DD to DD/MM/YYYY
function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

// Main render function
function renderApp() {
  const app = document.querySelector<HTMLDivElement>('#app')!
  const nextAppointment = getNextAppointment()
  
  app.innerHTML = `
    <!-- HEADER -->
    <header class="header">
      <div class="header-left">
        <div class="header-brand">
          <div class="header-brand-icon">🌸</div>
          <div>
            <div>Cuidado Floral</div>
            <div class="header-subtitle">Rede Feminina de Combate ao Câncer - Itapema</div>
          </div>
        </div>
      </div>
      
      <div class="header-right">
        <div class="notification-bell">
          🔔
          <span class="notification-badge">2</span>
        </div>
        <div class="user-info">
          <div class="user-name">Paciente Ana</div>
        </div>
        <button class="logout-btn">Sair</button>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <div class="container">
      <h1 class="page-title">Minha Área</h1>
      <p class="page-subtitle">Bem-vinda de volta! Aqui você pode acompanhar seus atendimentos e atualizar seus dados.</p>

      <!-- TOP CARDS -->
      <div class="cards-grid">
        <!-- Cadastro Card -->
        <div class="card">
          <div class="card-header">
            <div class="card-icon">📄</div>
            <h2 class="card-title">Cadastro</h2>
          </div>
          <p class="card-description">Atualize suas informações pessoais e histórico médico</p>
          <button class="btn-primary">+ Atualizar Dados</button>
        </div>

        <!-- Atendimentos Card -->
        <div class="card">
          <div class="card-header">
            <div class="card-icon">📅</div>
            <h2 class="card-title">Atendimentos</h2>
          </div>
          <div class="card-content">
            ${nextAppointment ? `
              <div class="appointment-info">
                <span class="appointment-label">Próximo:</span>
                <span class="appointment-value">${nextAppointment.date}, ${nextAppointment.time}</span>
              </div>
            ` : '<div class="appointment-info"><span class="appointment-label">Sem agendamentos próximos</span></div>'}
            <div class="appointment-info">
              <span class="appointment-label">Total:</span>
              <span class="appointment-value">${appointments.length} agendados</span>
            </div>
          </div>
        </div>

        <!-- Notificações Card -->
        <div class="card">
          <div class="card-header">
            <div class="card-icon">🔔</div>
            <h2 class="card-title">Notificações</h2>
          </div>
          <div class="card-content">
            <div class="appointment-info">
              <span class="appointment-label">Você tem</span>
              <span class="appointment-value">2 notificações não lidas</span>
            </div>
          </div>
        </div>
      </div>

      <!-- BOTTOM SECTIONS -->
      <div class="sections-grid">
        <!-- Histórico de Atendimentos -->
        <div class="appointments-section">
          <div class="section-header">
            <h3 class="section-title">
              <span class="section-icon">📋</span>
              Histórico de Atendimentos
            </h3>
            <button class="btn-secondary" id="request-appointment-btn">+ Solicitar Atendimento</button>
          </div>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;">Seus agendamentos e consultas</p>
          ${renderAppointments()}
        </div>

        <!-- Notificações Recentes -->
        <div class="notifications-section">
          <h3 class="section-title">
            <span class="section-icon">🔔</span>
            Notificações Recentes
          </h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;">Atualizações e lembretes importantes</p>
          ${renderNotifications()}
        </div>
      </div>
    </div>

    <!-- MODAL PARA SOLICITAR ATENDIMENTO -->
    <div id="appointment-modal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Solicitar Atendimento</h2>
          <span class="modal-close">&times;</span>
        </div>
        <form id="appointment-form">
          <div class="form-group">
            <label for="appointment-title">Título do Atendimento</label>
            <input type="text" id="appointment-title" required placeholder="Ex: Consulta de Oncologia">
          </div>
          <div class="form-group">
            <label for="appointment-date">Data</label>
            <input type="date" id="appointment-date" required>
          </div>
          <div class="form-group">
            <label for="appointment-time">Horário</label>
            <input type="time" id="appointment-time" required>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-cancel" id="cancel-btn">Cancelar</button>
            <button type="submit" class="btn-confirm">Solicitar</button>
          </div>
        </form>
      </div>
    </div>
  `

  // Add event listeners
  setupEventListeners()
}

// Setup event listeners
function setupEventListeners() {
  const updateBtn = document.querySelector('.btn-primary')
  const logoutBtn = document.querySelector('.logout-btn')
  const notificationBell = document.querySelector('.notification-bell')
  const requestAppointmentBtn = document.querySelector('#request-appointment-btn')
  const modal = document.querySelector('#appointment-modal')
  const modalClose = document.querySelector('.modal-close')
  const cancelBtn = document.querySelector('#cancel-btn')
  const appointmentForm = document.querySelector('#appointment-form') as HTMLFormElement

  if (updateBtn) {
    updateBtn.addEventListener('click', () => {
      alert('Formulário de atualização de dados será aberto')
    })
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      alert('Desconectando...')
    })
  }

  if (notificationBell) {
    notificationBell.addEventListener('click', () => {
      alert('Abrindo notificações...')
    })
  }

  // Modal event listeners
  if (requestAppointmentBtn) {
    requestAppointmentBtn.addEventListener('click', () => {
      if (modal) {
        (modal as HTMLElement).style.display = 'block'
      }
    })
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      if (modal) {
        (modal as HTMLElement).style.display = 'none'
      }
    })
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      if (modal) {
        (modal as HTMLElement).style.display = 'none'
      }
    })
  }

  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      if (modal) {
        (modal as HTMLElement).style.display = 'none'
      }
    }
  })

  // Form submission
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (event) => {
      event.preventDefault()
      
      const titleInput = document.querySelector('#appointment-title') as HTMLInputElement
      const dateInput = document.querySelector('#appointment-date') as HTMLInputElement
      const timeInput = document.querySelector('#appointment-time') as HTMLInputElement
      
      if (titleInput && dateInput && timeInput) {
        const newAppointment: Appointment = {
          id: (appointments.length + 1).toString(),
          title: titleInput.value,
          date: formatDate(dateInput.value),
          time: timeInput.value,
          status: 'pending'
        }
        
        appointments.push(newAppointment)
        
        // Close modal
        if (modal) {
          (modal as HTMLElement).style.display = 'none'
        }
        
        // Reset form
        appointmentForm.reset()
        
        // Re-render app
        renderApp()
        
        // Show success message
        alert('Solicitação de atendimento enviada com sucesso!')
      }
    })
  }
}

// Initialize app
renderApp()
