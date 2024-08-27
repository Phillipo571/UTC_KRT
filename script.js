document.getElementById('converter-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const utcDateInput =
        document.getElementById('utc-date').value;
        const utcTimeInput =
        document.getElementById('utc-time').value;

        if (!utcDateInput || !utcTimeInput)
            {
            document.getElementById('result-container').innerText = "날짜와 시간을 모두 입력하세요.";
            return;
            }

        try {
            const [year, month, day] =
            utcDateInput.split('-').map(Number);
            const [hours, minutes, seconds] =
            utcTimeInput.split(':').map(Number);
            const secondsSafe = seconds !== undefined ? seconds : 0;
            const utcDateTime = new
            Date(Date.UTC(year, month - 1, day, hours, minutes, secondsSafe));

            if
            (isNaN(utcDateTime.getTime())) {
                throw new Error("잘못된 형식입니다. 올바른 형식으로 입력하세요.");
            }
        
            const krtDateTime = new Date(utcDateTime.getTime() + 9 * 60 * 60 * 1000);

            const datePart = `${krtDateTime.getUTCFullYear()}-${String(krtDateTime.getUTCMonth() + 1).padStart(2, '0')}-${String(krtDateTime.getUTCDate()).padStart(2, '0')}`;
                
            const timePart = `${String(krtDateTime.getUTCHours()).padStart(2, '0')}:${String(krtDateTime.getUTCMinutes()).padStart(2, '0')}:${String(krtDateTime.getUTCSeconds()).padStart(2, '0')}`;

            document.getElementById('date-box').innerText = datePart;
            document.getElementById('time-box').innerText = timePart;
            } catch (error) {
            document.getElementById('result-container').innerText = error.message;
        }
    }
);