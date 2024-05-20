// 初始化圖表
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '價格',
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// 表單提交事件
document.getElementById('dateForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    try {
        const response = await fetch(`/api?startDate=${startDate}&endDate=${endDate}`);
        const data = await response.json();

        // 解析 JSON 數據
        const labels = data.map(item => item.data_date);
        const prices = data.map(item => item.local_price);

        // 更新圖表數據
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = prices;
        myChart.update(); // 更新圖表

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});