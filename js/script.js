document.addEventListener('DOMContentLoaded', () => {

    // --- Defaults ---
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');

    // Set Date to Today
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;

    // Set Time to Now + 1 Hour (rounded to nearest 30 mins)
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(Math.ceil(now.getMinutes() / 30) * 30);
    const timeString = now.toTimeString().slice(0, 5);
    timeInput.value = timeString;


    // --- Trip Type Chips ---
    const tripTypeChips = document.querySelectorAll('#tripTypeChips .chip');
    const tripTypeInput = document.getElementById('tripType');

    tripTypeChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Remove active class from all
            tripTypeChips.forEach(c => c.classList.remove('active'));
            // Add active class to clicked
            chip.classList.add('active');
            // Update hidden input
            tripTypeInput.value = chip.dataset.value;
        });
    });


    // --- Quick Time Options ---
    const timeChips = document.querySelectorAll('.time-chip');

    timeChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const now = new Date();

            if (chip.dataset.offset) {
                // Add minutes
                now.setMinutes(now.getMinutes() + parseInt(chip.dataset.offset));
            } else if (chip.dataset.time) {
                // Set specific time (e.g. 20:00)
                const [hours, mins] = chip.dataset.time.split(':');
                now.setHours(hours);
                now.setMinutes(mins);
            }

            // Format to HH:MM
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            timeInput.value = `${hours}:${minutes}`;
        });
    });


    // --- Form Validation Helper ---
    function showError(input, message) {
        input.style.borderColor = '#ff4444';
        input.style.boxShadow = '0 0 0 4px rgba(255,68,68,0.1)';

        // Remove error styling after 3 seconds
        setTimeout(() => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        }, 3000);
    }

    function validatePhone(phone) {
        // Indian phone number validation (10 digits)
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone.replace(/\s+/g, ''));
    }


    // --- Form Submission (WhatsApp) ---
    const bookingForm = document.getElementById('carBookingForm');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get Values
        const tripType = tripTypeInput.value;
        const pickup = document.getElementById('pickup').value.trim();
        const drop = document.getElementById('drop').value.trim();
        const date = dateInput.value;
        const time = timeInput.value;
        const carType = document.getElementById('carType').value;
        const passengers = document.getElementById('passengers').value;
        const name = document.getElementById('name').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();

        // Validation
        let hasError = false;

        if (!name) {
            showError(document.getElementById('name'));
            hasError = true;
        }

        if (!whatsapp || !validatePhone(whatsapp)) {
            showError(document.getElementById('whatsapp'));
            hasError = true;
        }

        if (!pickup) {
            showError(document.getElementById('pickup'));
            hasError = true;
        }

        if (!drop) {
            showError(document.getElementById('drop'));
            hasError = true;
        }

        if (hasError) {
            // Show error message
            const errorMsg = document.createElement('div');
            errorMsg.textContent = '⚠️ Please fill in all required fields correctly';
            errorMsg.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #ff4444, #cc0000);
                color: white;
                padding: 15px 25px;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(255,68,68,0.4);
                z-index: 10000;
                font-weight: 600;
                animation: slideIn 0.3s ease-out;
            `;
            document.body.appendChild(errorMsg);

            setTimeout(() => {
                errorMsg.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => errorMsg.remove(), 300);
            }, 3000);

            return;
        }

        // Format date nicely
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        // Construct Message
        const message = `*🚗 New Car Booking Request*

*Name:* ${name}
*WhatsApp:* ${whatsapp}
*Trip Type:* ${tripType}
*Car Type:* ${carType}
*Passengers:* ${passengers}

*📍 Pickup:* ${pickup}
*📍 Drop:* ${drop}
*📅 Date:* ${formattedDate}
*🕐 Time:* ${time}

_Sent from Aradhya Car Travels website_`;

        // WhatsApp URL
        const phoneNumber = '7675847434';
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Show success message
        const successMsg = document.createElement('div');
        successMsg.innerHTML = '✅ Redirecting to WhatsApp...';
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00cc66, #009944);
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,204,102,0.4);
            z-index: 10000;
            font-weight: 600;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(successMsg);

        // Open WhatsApp after short delay
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            successMsg.remove();
        }, 1000);
    });


    // --- Smooth Scroll for Sticky Button and Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // --- Add CSS animations ---
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);


    // --- Input Focus Effects ---
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.01)';
            input.parentElement.style.transition = 'transform 0.2s';
        });

        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });

});
