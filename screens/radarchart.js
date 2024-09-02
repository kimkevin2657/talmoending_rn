// Define and export HTML content as a string
const htmlContent = data => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Radar Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
    html, body { margin: 0; padding: 0; height: 100%; }
    body { display: flex; justify-content: center; align-items: center; background-color: #FAFAFF; }
    .chart-container { width: 100%; height: 100%; }
    </style>
</head>
<body>
    <div class="chart-container">
        <canvas id="radarChart"></canvas>
    </div>
    <script>
    const ctx = document.getElementById('radarChart').getContext('2d');
    const chartData = {
        labels: ['백혈구수(WBC)', '적혈구수(RBC)', '혈소판(PLT)', '혈색소(Hb)', '적혈구용적(Hct)'],
        datasets: [{
            label: 'Blood Counts',
            data: [${data.WBC}, ${data.RBC}, ${data.PLT}, ${data.Hb}, ${data.Hct}],
            fill: true,
            backgroundColor: 'rgba(202, 184, 255, 0.2)',
            borderColor: '#4267B2',
            pointBackgroundColor: '#4267B2',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#4267B2'
        }]
    };
    const chart = new Chart(ctx, {
        type: 'radar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scale: {
                ticks: { display: false, beginAtZero: true },
                pointLabels: { fontSize: 32, fontColor: '#3C5A99' },
                r: { angleLines: { display: false }, suggestedMin: 0, suggestedMax: 100 }
            },
        }
    });
    </script>
</body>
</html>
    `;
};

export default htmlContent;
