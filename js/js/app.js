// Función para el inicio de sesión
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validación básica
    if (!email || !password) {
        alert('Por favor, complete todos los campos.');
        return;
    }
    
    // En una aplicación real, aquí se haría una petición al servidor
    // Simulamos un inicio de sesión exitoso
    console.log(`Iniciando sesión con email: ${email}`);
    
    // Redirigir a la página de reservas
    window.location.href = 'reservas.html';
}

// Función para mostrar el modal de recuperación de contraseña
function showForgotPassword() {
    const modal = document.getElementById('forgotPasswordModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Función para cerrar el modal de recuperación de contraseña
function closeForgotPassword() {
    const modal = document.getElementById('forgotPasswordModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Función para enviar el correo de recuperación
function sendRecoveryEmail() {
    const recoveryEmail = document.getElementById('recoveryEmail').value;
    
    if (!recoveryEmail) {
        alert('Por favor, ingrese su correo electrónico.');
        return;
    }
    
    // En una aplicación real, aquí se haría una petición al servidor
    console.log(`Enviando correo de recuperación a: ${recoveryEmail}`);
    
    alert('Se ha enviado un enlace de recuperación a su correo electrónico.');
    closeForgotPassword();
}

// Función para el registro de nuevo usuario
function register() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const address = document.getElementById('address').value;
    const age = document.getElementById('age').value;
    
    // Validación básica
    if (!firstName || !lastName || !email || !address || !age) {
        alert('Por favor, complete todos los campos.');
        return;
    }
    
    if (age < 1 || age > 120) {
        alert('Por favor, ingrese una edad válida.');
        return;
    }
    
    // En una aplicación real, aquí se haría una petición al servidor
    console.log(`Registrando usuario: ${firstName} ${lastName}, ${email}`);
    
    alert('¡Registro exitoso! Ahora puede iniciar sesión.');
    
    // Redirigir a la página de inicio de sesión
    window.location.href = 'index.html';
}

// Función para hacer una reserva
function makeReservation() {
    const date = document.getElementById('reservationDate').value;
    const time = document.getElementById('reservationTime').value;
    const court = document.getElementById('courtSelect').value;
    
    // Validación
    if (!date || !time || !court) {
        alert('Por favor, complete todos los campos para hacer la reserva.');
        return;
    }
    
    // Formatear la fecha para mostrarla
    const dateObj = new Date(date);
    const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    
    // Formatear la hora
    let formattedTime = '';
    if (time === '07:00') formattedTime = '07:00 - 08:00';
    else if (time === '08:00') formattedTime = '08:00 - 09:00';
    else if (time === '09:00') formattedTime = '09:00 - 10:00';
    else if (time === '10:00') formattedTime = '10:00 - 11:00';
    else if (time === '11:00') formattedTime = '11:00 - 12:00';
    else if (time === '12:00') formattedTime = '12:00 - 13:00';
    else if (time === '13:00') formattedTime = '13:00 - 14:00';
    else if (time === '14:00') formattedTime = '14:00 - 15:00';
    else if (time === '15:00') formattedTime = '15:00 - 16:00';
    else if (time === '16:00') formattedTime = '16:00 - 17:00';
    else if (time === '17:00') formattedTime = '17:00 - 18:00';
    else if (time === '18:00') formattedTime = '18:00 - 19:00';
    else if (time === '19:00') formattedTime = '19:00 - 20:00';
    else if (time === '20:00') formattedTime = '20:00 - 21:00';
    
    // Guardar los datos en localStorage para mostrarlos en la página de éxito
    localStorage.setItem('lastReservation', JSON.stringify({
        court: court,
        date: formattedDate,
        time: formattedTime
    }));
    
    // En una aplicación real, aquí se haría una petición al servidor
    console.log(`Reservando cancha ${court} para el ${formattedDate} a las ${time}`);
    
    // Redirigir a la página de reserva exitosa
    window.location.href = 'reserva-exitosa.html';
}

// Función para cancelar una reserva
function cancelReservation(reservationId) {
    if (confirm('¿Está seguro de que desea cancelar esta reserva?')) {
        // En una aplicación real, aquí se haría una petición al servidor
        console.log(`Cancelando reserva con ID: ${reservationId}`);
        
        // Simular eliminación de la reserva
        alert('Reserva cancelada exitosamente.');
        
        // Recargar la página para actualizar la lista
        // En una aplicación real, se actualizaría solo el elemento eliminado
        location.reload();
    }
}

// Función para cargar los datos de la última reserva en la página de éxito
function loadReservationDetails() {
    if (window.location.pathname.includes('reserva-exitosa')) {
        const lastReservation = JSON.parse(localStorage.getItem('lastReservation'));
        
        if (lastReservation) {
            document.getElementById('successCourt').textContent = lastReservation.court;
            document.getElementById('successDate').textContent = lastReservation.date;
            document.getElementById('successTime').textContent = lastReservation.time;
        } else {
            // Datos por defecto si no hay reserva en localStorage
            document.getElementById('successCourt').textContent = '3';
            document.getElementById('successDate').textContent = '12/10/2025';
            document.getElementById('successTime').textContent = '08:00 - 09:00';
        }
    }
}

// Inicializar la fecha mínima para reservas (hoy)
function initDatePicker() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Formatear la fecha para el input date (YYYY-MM-DD)
    const formattedDate = tomorrow.toISOString().split('T')[0];
    
    const dateInput = document.getElementById('reservationDate');
    if (dateInput) {
        dateInput.min = formattedDate;
        
        // Establecer la fecha por defecto a mañana
        dateInput.value = formattedDate;
    }
}

// Inicializar la aplicación cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
    loadReservationDetails();
    initDatePicker();
    
    // Cerrar modal si se hace clic fuera de él
    window.onclick = function(event) {
        const modal = document.getElementById('forgotPasswordModal');
        if (event.target === modal) {
            closeForgotPassword();
        }
    };
});