// ---- PAGE NAVIGATION ----
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'))
  document.getElementById(page).classList.remove('hidden')
  if (page === 'dashboard')     loadDashboard()
  if (page === 'members')       loadMembers()
  if (page === 'contributions') loadContributions()
  if (page === 'loans')         loadLoans()
}

// ---- DASHBOARD ----
async function loadDashboard() {
  const members       = await fetch('https://chama-back-production.up.railway.app/api/members').then(r => r.json())
  const contributions = await fetch('https://chama-back-production.up.railway.app/api/contributions/total').then(r => r.json())
  const loans         = await fetch('https://chama-back-production.up.railway.app/api/loans').then(r => r.json())
  const activeLoans   = loans.filter(l => l.status === 'approved' || l.status === 'repaying')

  document.getElementById('total-members').textContent = members.length
  document.getElementById('total-contributions').textContent = `KSh ${contributions.total.toLocaleString()}`
  document.getElementById('active-loans').textContent = activeLoans.length
}

// ---- MEMBERS ----
async function loadMembers() {
  const members = await fetch('https://chama-back-production.up.railway.app/api/members').then(r => r.json())
  const list = document.getElementById('members-list')
  list.innerHTML = members.length === 0
    ? '<p class="empty">No members yet</p>'
    : members.map(m => `
      <div class="user-card">
        <div class="user-left">
          <div class="avatar">${m.name.charAt(0).toUpperCase()}</div>
          <div class="user-info">
            <h3>${m.name}</h3>
            <p>${m.email} · ${m.phone}</p>
            <span class="badge ${m.role}">${m.role}</span>
          </div>
        </div>
        <button class="delete-btn" onclick="deleteMember('${m._id}')">Remove</button>
      </div>`).join('')

  // Populate member dropdowns
  populateMemberDropdowns(members)
}

async function addMember() {
  const name     = document.getElementById('member-name').value.trim()
  const email    = document.getElementById('member-email').value.trim()
  const phone    = document.getElementById('member-phone').value.trim()
  const password = document.getElementById('member-password').value.trim()

  if (!name || !email || !phone || !password) return alert('Fill in all fields')

  await fetch('https://chama-back-production.up.railway.app/api/members', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, password })
  })

  document.getElementById('member-name').value     = ''
  document.getElementById('member-email').value    = ''
  document.getElementById('member-phone').value    = ''
  document.getElementById('member-password').value = ''
  loadMembers()
}

async function deleteMember(id) {
  if (!confirm('Remove this member?')) return
  await fetch(`https://chama-back-production.up.railway.app/api/members/${id}`, { method: 'DELETE' })
  loadMembers()
}

// ---- CONTRIBUTIONS ----
async function loadContributions() {
  const contributions = await fetch('https://chama-back-production.up.railway.app/api/contributions').then(r => r.json())
  const list = document.getElementById('contributions-list')
  list.innerHTML = contributions.length === 0
    ? '<p class="empty">No contributions yet</p>'
    : contributions.map(c => `
      <div class="user-card">
        <div class="user-info">
          <h3>${c.memberId?.name || 'Unknown'}</h3>
          <p>${c.month} · KSh ${c.amount.toLocaleString()}</p>
        </div>
        <span class="badge paid">${c.status}</span>
      </div>`).join('')
}

async function addContribution() {
  const memberId = document.getElementById('contribution-member').value
  const amount   = document.getElementById('contribution-amount').value
  const month    = document.getElementById('contribution-month').value.trim()

  if (!memberId || !amount || !month) return alert('Fill in all fields')

  await fetch('https://chama-back-production.up.railway.app/api/contributions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ memberId, amount: Number(amount), month })
  })

  document.getElementById('contribution-amount').value = ''
  document.getElementById('contribution-month').value  = ''
  loadContributions()
}

// ---- LOANS ----
async function loadLoans() {
  const loans = await fetch('https://chama-back-production.up.railway.app/api/loans').then(r => r.json())
  const list = document.getElementById('loans-list')
  list.innerHTML = loans.length === 0
    ? '<p class="empty">No loans yet</p>'
    : loans.map(l => `
      <div class="user-card">
        <div class="user-info">
          <h3>${l.memberId?.name || 'Unknown'}</h3>
          <p>KSh ${l.amount.toLocaleString()} · Balance: KSh ${l.balance?.toLocaleString()}</p>
          <span class="badge ${l.status}">${l.status}</span>
        </div>
        <div>
          ${l.status === 'pending' ? `<button onclick="approveLoan('${l._id}')">Approve</button>` : ''}
          ${l.status === 'approved' || l.status === 'repaying'
            ? `<button onclick="repayLoan('${l._id}')">Repay</button>` : ''}
        </div>
      </div>`).join('')
}

async function requestLoan() {
  const memberId = document.getElementById('loan-member').value
  const amount   = document.getElementById('loan-amount').value
  const interest = document.getElementById('loan-interest').value || 10

  if (!memberId || !amount) return alert('Fill in all fields')

  await fetch('https://chama-back-production.up.railway.app/api/loans', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ memberId, amount: Number(amount), interest: Number(interest) })
  })

  document.getElementById('loan-amount').value   = ''
  document.getElementById('loan-interest').value = ''
  loadLoans()
}

async function approveLoan(id) {
  await fetch(`https://chama-back-production.up.railway.app/api/loans/${id}/approve`, { method: 'PUT' })
  loadLoans()
}

async function repayLoan(id) {
  const amount = prompt('Enter repayment amount (KSh):')
  if (!amount) return
  await fetch(`https://chama-back-production.up.railway.app/api/loans/${id}/repay`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: Number(amount) })
  })
  loadLoans()
}

// ---- HELPERS ----
function populateMemberDropdowns(members) {
  const options = members.map(m => `<option value="${m._id}">${m.name}</option>`).join('')
  document.getElementById('contribution-member').innerHTML = options
  document.getElementById('loan-member').innerHTML = options
}
loadDashboard();