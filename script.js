document.addEventListener('DOMContentLoaded', () => {
  const deskTypeSelect = document.getElementById('deskType');
  const membershipTierContainer = document.getElementById('membershipTierContainer');
  const membershipTierSelect = document.getElementById('membershipTier');
  const deskNumberSelect = document.getElementById('deskNumber');
  const bookingForm = document.getElementById('bookingForm');
  const confirmationMessage = document.getElementById('confirmationMessage');

  const individualDesks = 10;
  const teamDesks = 5;

  deskTypeSelect.addEventListener('change', () => {
      const deskType = deskTypeSelect.value;
      deskNumberSelect.innerHTML = '<option value="" disabled selected>Select...</option>';

      if (deskType === 'individual') {
          membershipTierContainer.classList.remove('hidden');
          for (let i = 1; i <= individualDesks; i++) {
              deskNumberSelect.innerHTML += `<option value="${i}">Desk ${i}</option>`;
          }
      } else if (deskType === 'team') {
          membershipTierContainer.classList.add('hidden');
          for (let i = 1; i <= teamDesks; i++) {
              deskNumberSelect.innerHTML += `<option value="${i}">Desk ${i + individualDesks}</option>`;
          }
      }
  });

  bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const deskType = deskTypeSelect.value;
      const deskNumber = deskNumberSelect.value;
      const hours = parseInt(document.getElementById('hours').value, 10);
      let totalCost = 0;

      if (deskType === 'individual') {
          const membershipTier = membershipTierSelect.value;
          const rates = {
              basic: 10,
              premium: 15,
              executive: 20
          };
          totalCost = rates[membershipTier] * hours;
      } else if (deskType === 'team') {
          totalCost = 25 * hours;
      }

      confirmationMessage.innerHTML = `
          <p>You have successfully booked Desk ${deskNumber} for ${hours} hour(s).</p>
          <p>Total Cost: $${totalCost}</p>
      `;
  });
});
