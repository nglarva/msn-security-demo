// Dark Mode Toggle
document
  .getElementById("darkModeToggle")
  .addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const icon = this.querySelector("i");
    if (document.body.classList.contains("dark-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });

// Set colors based on theme
function getColors() {
  const isDarkMode = document.body.classList.contains("dark-mode");
  return {
    primary: "#4361ee",
    warning: "#ff9f1c",
    danger: "#e63946",
    success: "#2ec4b6",
    textColor: isDarkMode ? "#adb5bd" : "#495057",
    gridColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
  };
}

// Register ChartJS plugins
Chart.register(ChartDataLabels);

// Initialize Charts
function initCharts() {
  let colors = getColors();

  // Activity Chart
  let ctx1 = document.getElementById("activityChart").getContext("2d");
  new Chart(ctx1, {
    type: "line",
    data: {
      labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
      datasets: [
        {
          label: "Đã xử lý",
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: colors.primary,
          backgroundColor: "rgba(67, 97, 238, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Đang xử lý",
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: colors.warning,
          backgroundColor: "rgba(255, 159, 28, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Chưa xử lý",
          data: [12, 19, 3, 5, 2, 3, 7],
          borderColor: colors.danger,
          backgroundColor: "rgba(230, 57, 70, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: "index",
          intersect: false,
          backgroundColor: document.body.classList.contains("dark-mode")
            ? "rgba(39, 41, 61, 0.9)"
            : "rgba(255, 255, 255, 0.9)",
          titleColor: document.body.classList.contains("dark-mode")
            ? "#adb5bd"
            : "#495057",
          bodyColor: document.body.classList.contains("dark-mode")
            ? "#adb5bd"
            : "#495057",
          borderColor: document.body.classList.contains("dark-mode")
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 10,
          boxPadding: 5,
          usePointStyle: true,
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y;
              }
              return label;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { color: colors.gridColor },
          ticks: { color: colors.textColor },
        },
        y: {
          grid: { color: colors.gridColor },
          ticks: { color: colors.textColor },
          beginAtZero: true,
        },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      animation: {
        duration: 1000,
        easing: "easeOutQuart",
      },
    },
  });

  // Keyword Status Chart
  let ctx2 = document.getElementById("keywordStatusChart").getContext("2d");
  new Chart(ctx2, {
    type: "doughnut",
    data: {
      labels: ["An toàn", "Cần chú ý", "Nguy hiểm"],
      datasets: [
        {
          data: [65, 25, 10],
          backgroundColor: [colors.success, colors.warning, colors.danger],
          borderWidth: 2,
          borderColor: document.body.classList.contains("dark-mode")
            ? "rgba(39, 41, 61, 0.8)"
            : "rgba(255, 255, 255, 0.8)",
          hoverBackgroundColor: [
            "rgba(46, 196, 182, 0.8)",
            "rgba(255, 159, 28, 0.8)",
            "rgba(230, 57, 70, 0.8)",
          ],
          hoverBorderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateRotate: true,
        animateScale: true,
      },
      plugins: {
        legend: { display: false },
        datalabels: {
          color: "white",
          font: { weight: "bold", size: 12 },
          formatter: function (value, context) {
            return value + "%";
          },
          textShadowBlur: 5,
          textShadowColor: "rgba(0, 0, 0, 0.35)",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.raw;
              return `${label}: ${value}%`;
            },
          },
        },
      },
      cutout: "70%",
    },
  });

  // Sentiment Chart
  let ctx3 = document.getElementById("sentimentChart").getContext("2d");
  new Chart(ctx3, {
    type: "bar",
    data: {
      labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
      datasets: [
        {
          label: "Tích cực",
          data: [45, 52, 38, 41, 56, 65, 70],
          backgroundColor: colors.success,
          hoverBackgroundColor: "rgba(46, 196, 182, 0.8)",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.1)",
        },
        {
          label: "Trung lập",
          data: [30, 25, 36, 30, 25, 20, 15],
          backgroundColor: colors.warning,
          hoverBackgroundColor: "rgba(255, 159, 28, 0.8)",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.1)",
        },
        {
          label: "Tiêu cực",
          data: [25, 23, 26, 29, 19, 15, 15],
          backgroundColor: colors.danger,
          hoverBackgroundColor: "rgba(230, 57, 70, 0.8)",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.1)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: "easeOutQuart",
      },
      plugins: {
        legend: { display: false },
        datalabels: {
          color: "white",
          font: function (context) {
            const value = context.dataset.data[context.dataIndex];
            const size = value < 20 ? 9 : 11;
            return {
              weight: "bold",
              size: size,
            };
          },
          formatter: function (value, context) {
            // Tính tổng của cột
            let total = 0;
            const dataArr = context.chart.data.datasets.map((dataset) => {
              return dataset.data[context.dataIndex];
            });
            dataArr.forEach((val) => {
              total += val;
            });

            // Tính và trả về phần trăm
            const percentage = Math.round((value / total) * 100);
            return percentage > 5 ? percentage + "%" : "";
          },
          display: function (context) {
            return context.dataset.data[context.dataIndex] > 10;
          },
          align: "center",
          anchor: "center",
          clamp: true,
          clip: false,
          textShadowBlur: 5,
          textShadowColor: "rgba(0, 0, 0, 0.35)",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.dataset.label || "";
              const value = context.raw;

              // Tính tổng của cột
              let total = 0;
              context.chart.data.datasets.forEach((dataset) => {
                total += dataset.data[context.dataIndex];
              });

              // Tính phần trăm
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: { color: colors.gridColor },
          ticks: { color: colors.textColor, font: { size: 12 } },
        },
        y: {
          stacked: true,
          grid: { color: colors.gridColor },
          ticks: { color: colors.textColor, font: { size: 12 } },
          beginAtZero: true,
        },
      },
      // Plugin tùy chỉnh để hiển thị tổng số
      plugins: [
        {
          id: "totalLabels",
          afterDraw: function (chart) {
            const ctx = chart.ctx;
            ctx.save();
            ctx.font = "bold 12px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            ctx.fillStyle = document.body.classList.contains("dark-mode")
              ? "#adb5bd"
              : "#495057";

            // Tính tổng cho mỗi cột và hiển thị
            chart.data.labels.forEach((label, i) => {
              let total = 0;
              chart.data.datasets.forEach((dataset) => {
                total += dataset.data[i];
              });

              // Tính toán vị trí để hiển thị
              const meta = chart.getDatasetMeta(chart.data.datasets.length - 1);
              const x = meta.data[i].x;
              const y = meta.data[0].y - 10; // Vị trí phía trên cột

              // Hiển thị tổng
              ctx.fillText(total, x, y);
            });
            ctx.restore();
          },
        },
      ],
    },
  });
}

// Initialize on load
window.addEventListener("load", function () {
  initCharts();
});

// Update charts on theme change
document
  .getElementById("darkModeToggle")
  .addEventListener("click", function () {
    // Delay to allow theme to update first
    setTimeout(function () {
      initCharts();
    }, 100);
  });
