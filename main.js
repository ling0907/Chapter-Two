// 全局数据存储
let chartData = {
    line: {
        dates: ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
        maxTemps: [32, 33, 34, 34, 33, 31, 30, 29, 30, 29, 26, 23, 21, 25, 31],
        minTemps: [19, 19, 20, 22, 22, 21, 22, 16, 18, 18, 17, 14, 15, 16, 16]
    },
    bar: {
        years: ['FY2013', 'FY2014', 'FY2015', 'FY2016', 'FY2017', 'FY2018', 'FY2019'],
        values: [10770, 16780, 24440, 30920, 37670, 48200, 57270]
    },
    horizontalBar: {
        categories: ['家政、家教、保姆等生活服务', '飞机票、火车票', '家具', '手机、手机配件', '计算机及其配套产品', '汽车用品', '通信充值、游戏充值', '个人护理用品', '书报杂志及音像制品', '餐饮、旅游、住宿', '家用电器', '食品、饮料、烟酒、保健品', '家庭日杂用品', '保险、演出票务', '服装、鞋帽、家用纺织品', '数码产品', '其他商品和服务', '工艺品、收藏品'],
        rates: [0.959, 0.951, 0.935, 0.924, 0.893, 0.892, 0.865, 0.863, 0.860, 0.856, 0.854, 0.835, 0.826, 0.816, 0.798, 0.765, 0.763, 0.670]
    },
    area: {
        months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        companyA: [198, 215, 245, 222, 200, 236, 201, 253, 236, 200, 266, 290],
        companyB: [203, 236, 200, 236, 269, 216, 298, 333, 301, 349, 360, 368],
        companyC: [185, 205, 226, 199, 238, 200, 250, 209, 246, 219, 253, 288]
    },
    histogram: {
        ranges: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'],
        frequencies: [5, 12, 25, 35, 28, 20, 15, 10, 6, 3]
    },
    pie: {
        sources: [
            { name: '直接访问', value: 335 },
            { name: '邮件营销', value: 310 },
            { name: '联盟广告', value: 234 },
            { name: '视频广告', value: 135 },
            { name: '搜索引擎', value: 1548 }
        ]
    },
    donut: {
        categories: [
            { name: '电子产品', value: 350 },
            { name: '家居用品', value: 250 },
            { name: '服装鞋帽', value: 200 },
            { name: '食品饮料', value: 120 },
            { name: '其他', value: 80 }
        ]
    },
    scatter: {
        data: []
    },
    error: {
        data2017: [4605.2, 4710.3, 5168.9, 4767.2, 4947, 5203, 6047.4, 5945.5, 5219.6, 5038.1, 5196.3, 5698.6],
        data2018: [5200, 5254.5, 5283.4, 5107.8, 5443.3, 5550.6, 6400.2, 6404.9, 5483.1, 5330.2, 5543, 6199.9]
    },
    radar: {
        personal: [85, 70, 60, 75, 80, 65],
        average: [65, 65, 65, 65, 65, 65]
    },
    errorBar: {
        categories: ['条件A', '条件B', '条件C', '条件D', '条件E'],
        values: [25.3, 32.7, 41.5, 38.2, 29.6],
        errors: [1.2, 2.1, 3.4, 2.8, 1.9]
    }
};

// 初始化散点图数据
for (let i = 0; i < 100; i++) {
    chartData.scatter.data.push({
        x: Math.round(Math.random() * 100),
        y: Math.round(Math.random() * 100)
    });
}

// Excel文件处理函数
function processExcelFile(file, callback) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // 获取第一个工作表
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            
            // 将工作表转换为JSON
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            
            callback(jsonData);
        } catch (error) {
            showNotification('Excel文件处理失败: ' + error.message, true);
        }
    };
    
    reader.readAsArrayBuffer(file);
}

// 通用Excel数据处理函数
function processExcelData(jsonData, chartType, updateCallback) {
    try {
        // 跳过标题行（如果有）
        let startIndex = 0;
        if (jsonData.length > 0) {
            // 根据不同图表类型判断是否需要跳过标题行
            switch(chartType) {
                case 'line':
                    startIndex = isNaN(parseFloat(jsonData[0][1])) ? 1 : 0;
                    break;
                case 'bar':
                    startIndex = isNaN(parseFloat(jsonData[0][1])) ? 1 : 0;
                    break;
                case 'horizontalBar':
                    startIndex = isNaN(parseFloat(jsonData[0][1])) ? 1 : 0;
                    break;
                case 'area':
                    startIndex = isNaN(parseFloat(jsonData[0][1])) ? 1 : 0;
                    break;
                case 'histogram':
                    startIndex = isNaN(parseFloat(jsonData[0][1])) ? 1 : 0;
                    break;
                case 'pie':
                    startIndex = isNaN(parseFloat(jsonData[0][1])) ? 1 : 0;
                    break;
                case 'scatter':
                    startIndex = isNaN(parseFloat(jsonData[0][0])) ? 1 : 0;
                    break;
                case 'error':
                    startIndex = isNaN(parseFloat(jsonData[0][0])) ? 1 : 0;
                    break;
                case 'radar':
                    startIndex = isNaN(parseFloat(jsonData[0][0])) ? 1 : 0;
                    break;
                case 'errorBar':
                    startIndex = isNaN(parseFloat(jsonData[0][1])) ? 1 : 0;
                    break;
                default:
                    startIndex = 0;
            }
        }
        
        // 处理数据
        const processedData = [];
        for (let i = startIndex; i < jsonData.length; i++) {
            const row = jsonData[i];
            if (row.length > 0 && row.some(cell => cell !== undefined && cell !== null && cell !== '')) {
                processedData.push(row);
            }
        }
        
        if (processedData.length === 0) {
            showNotification('Excel文件中没有有效数据', true);
            return;
        }
        
        // 调用回调函数更新图表数据
        updateCallback(processedData);
        
        return true;
    } catch (error) {
        showNotification('Excel文件格式错误: ' + error.message, true);
        return false;
    }
}

// 显示通知消息
function showNotification(message, isError = false) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '4px';
    notification.style.color = 'white';
    notification.style.zIndex = '9999';
    notification.style.fontSize = '14px';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    
    // 根据是否错误设置背景色
    notification.style.backgroundColor = isError ? '#ff4d4f' : '#52c41a';
    
    // 设置消息文本
    notification.textContent = message;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// 初始化所有图表
document.addEventListener('DOMContentLoaded', function() {
    // 标签页切换功能
    const tabs = document.querySelectorAll('.nav-tab');
    const pages = document.querySelectorAll('.chart-page');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabs.forEach(t => t.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');
            
            // 渲染当前页面的图表
            renderChart(targetId);
        });
    });
    
    // 延迟初始渲染第一个图表，确保DOM完全加载
    setTimeout(function() {
        renderChart('line-chart');
    }, 100);
    
    // 响应式调整
    window.addEventListener('resize', function() {
        const activePage = document.querySelector('.chart-page.active');
        if (activePage) {
            resizeChart(activePage.id);
        }
    });
});

// 渲染指定图表
function renderChart(chartId) {
    switch(chartId) {
        case 'line-chart':
            renderLineChart();
            break;
        case 'bar-chart':
            renderBarChart();
            break;
        case 'horizontal-bar-chart':
            renderHorizontalBarChart();
            break;
        case 'area-chart':
            renderAreaChart();
            break;
        case 'histogram-chart':
            renderHistogramChart();
            break;
        case 'pie-donut-chart':
            renderPieDonutChart();
            break;
        case 'scatter-chart':
            renderScatterChart();
            break;
        case 'error-chart':
            renderBoxplotChart();
            break;
        case 'radar-chart':
            renderRadarChart();
            break;
        case 'error-bar-chart':
            renderErrorBarChart();
            break;
    }
}

// 调整指定图表大小
function resizeChart(chartId) {
    switch(chartId) {
        case 'line-chart':
            if (window.lineChartInstance) window.lineChartInstance.resize();
            break;
        case 'bar-chart':
            if (window.barChartInstance) window.barChartInstance.resize();
            break;
        case 'horizontal-bar-chart':
            if (window.horizontalBarChartInstance) window.horizontalBarChartInstance.resize();
            break;
        case 'area-chart':
            if (window.areaChartInstance) window.areaChartInstance.resize();
            break;
        case 'histogram-chart':
            if (window.histogramChartInstance) window.histogramChartInstance.resize();
            break;
        case 'pie-donut-chart':
            if (window.pieDonutChartInstance) window.pieDonutChartInstance.resize();
            break;
        case 'scatter-chart':
            if (window.scatterChartInstance) window.scatterChartInstance.resize();
            break;
        case 'error-chart':
            if (window.boxplotChartInstance) window.boxplotChartInstance.resize();
            break;
        case 'radar-chart':
            if (window.radarChartInstance) window.radarChartInstance.resize();
            break;
        case 'error-bar-chart':
            if (window.errorBarChartInstance) window.errorBarChartInstance.resize();
            break;
    }
}

// 1. 折线图
function renderLineChart() {
    const chartDom = document.getElementById('line-chart-wrapper');
    if (!chartDom) {
        console.error('Line chart container not found');
        return;
    }
    
    if (window.lineChartInstance) {
        window.lineChartInstance.dispose();
    }
    
    window.lineChartInstance = echarts.init(chartDom);
    const option = {
        title: {
            text: '4月-18日最高最低温度',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['最高温度', '最低温度'],
            top: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: chartData.line.dates
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            }
        },
        series: [
            {
                name: '最高温度',
                type: 'line',
                data: chartData.line.maxTemps,
                itemStyle: {
                    color: '#ff7f0e'
                }
            },
            {
                name: '最低温度',
                type: 'line',
                data: chartData.line.minTemps,
                itemStyle: {
                    color: '#1f77b4'
                }
            }
        ]
    };
    window.lineChartInstance.setOption(option);
    
    // 确保图表正确渲染
    setTimeout(() => {
        window.lineChartInstance.resize();
    }, 100);
}

// 2. 柱状图
function renderBarChart() {
    const chartDom = document.getElementById('bar-chart-wrapper');
    if (!chartDom) {
        console.error('Bar chart container not found');
        return;
    }
    
    if (window.barChartInstance) {
        window.barChartInstance.dispose();
    }
    
    window.barChartInstance = echarts.init(chartDom);
    const option = {
        title: {
            text: '淘宝天猫GMV',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: chartData.bar.years
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} 亿元'
            }
        },
        series: [
            {
                name: 'GMV',
                type: 'bar',
                data: chartData.bar.values,
                itemStyle: {
                    color: '#2ca02c'
                }
            }
        ]
    };
    window.barChartInstance.setOption(option);
    
    // 确保图表正确渲染
    setTimeout(() => {
        window.barChartInstance.resize();
    }, 100);
}

// 3. 水平柱状图
function renderHorizontalBarChart() {
    const chartDom = document.getElementById('horizontal-bar-chart-wrapper');
    if (!chartDom) return;
    
    if (window.horizontalBarChartInstance) {
        window.horizontalBarChartInstance.dispose();
    }
    
    window.horizontalBarChartInstance = echarts.init(chartDom);
    const option = {
        title: {
            text: '线上替代率',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        yAxis: {
            type: 'category',
            data: chartData.horizontalBar.categories
        },
        series: [
            {
                name: '替代率',
                type: 'bar',
                data: chartData.horizontalBar.rates,
                itemStyle: {
                    color: '#d62728'
                }
            }
        ]
    };
    window.horizontalBarChartInstance.setOption(option);
}

// 4. 堆积图
function renderAreaChart() {
    const chartDom = document.getElementById('area-chart-wrapper');
    if (!chartDom) return;
    
    if (window.areaChartInstance) {
        window.areaChartInstance.dispose();
    }
    
    window.areaChartInstance = echarts.init(chartDom);
    const option = {
        title: {
            text: '物流成本统计',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['公司A费用', '公司B费用', '公司C费用'],
            top: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: chartData.area.months
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '公司A费用',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: chartData.area.companyA,
                itemStyle: {
                    color: '#9467bd'
                }
            },
            {
                name: '公司B费用',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: chartData.area.companyB,
                itemStyle: {
                    color: '#8c564b'
                }
            },
            {
                name: '公司C费用',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: chartData.area.companyC,
                itemStyle: {
                    color: '#e377c2'
                }
            }
        ]
    };
    window.areaChartInstance.setOption(option);
}

// 5. 直方图
function renderHistogramChart() {
    const chartDom = document.getElementById('histogram-chart-wrapper');
    if (!chartDom) return;
    
    if (window.histogramChartInstance) {
        window.histogramChartInstance.dispose();
    }
    
    window.histogramChartInstance = echarts.init(chartDom);
    
    // 将区间字符串转换为数值范围
    const ranges = chartData.histogram.ranges.map(range => {
        const parts = range.split('-');
        return [parseFloat(parts[0]), parseFloat(parts[1])];
    });
    
    // 生成模拟原始数据，类似于matplotlib的hist
    const histogramData = [];
    chartData.histogram.frequencies.forEach((freq, index) => {
        for (let i = 0; i < freq; i++) {
            // 在每个区间内生成随机值
            const range = ranges[index];
            const value = range[0] + (range[1] - range[0]) * Math.random();
            histogramData.push(value);
        }
    });
    
    // 使用ECharts的自定义直方图实现
    const option = {
        title: {
            text: '人脸识别数据分布',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const dataIndex = params[0].dataIndex;
                return `置信度区间: ${chartData.histogram.ranges[dataIndex]}<br/>频次: ${chartData.histogram.frequencies[dataIndex]}`;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: chartData.histogram.ranges,
            name: '置信度区间',
            nameLocation: 'middle',
            nameGap: 25,
            axisLabel: {
                interval: 0,
                rotate: 30
            }
        },
        yAxis: {
            type: 'value',
            name: '频次',
            nameLocation: 'middle',
            nameGap: 40
        },
        series: [
            {
                name: '频次',
                type: 'bar',
                barWidth: '100%', // 柱子宽度100%，使它们相邻，形成直方图效果
                data: chartData.histogram.frequencies,
                itemStyle: {
                    color: '#17becf',
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    window.histogramChartInstance.setOption(option);
}

// 6. 饼图/环形图
let currentChartType = 'pie'; // 默认显示饼图

function renderPieDonutChart() {
    const chartDom = document.getElementById('pie-donut-chart-wrapper');
    if (!chartDom) return;
    
    if (window.pieDonutChartInstance) {
        window.pieDonutChartInstance.dispose();
    }
    
    window.pieDonutChartInstance = echarts.init(chartDom);
    
    // 根据当前图表类型渲染不同的图表
    const option = currentChartType === 'pie' ? {
        title: {
            text: '网站流量来源分布饼图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: chartData.pie.sources.map(item => item.name)
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '70%',
                center: ['50%', '60%'],
                data: chartData.pie.sources,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    } : {
        title: {
            text: '销售额分布环形图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: chartData.donut.categories.map(item => item.name)
        },
        series: [
            {
                name: '销售额',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '60%'],
                data: chartData.donut.categories,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    
    window.pieDonutChartInstance.setOption(option);
}

// 切换图表类型
function switchChartType(type) {
    currentChartType = type;
    
    // 更新按钮状态
    document.getElementById('pie-switch-btn').classList.remove('active');
    document.getElementById('donut-switch-btn').classList.remove('active');
    
    if (type === 'pie') {
        document.getElementById('pie-switch-btn').classList.add('active');
        document.getElementById('pie-description').style.display = 'block';
        document.getElementById('donut-description').style.display = 'none';
        document.getElementById('pie-api').style.display = 'block';
        document.getElementById('donut-api').style.display = 'none';
        document.getElementById('pie-input').style.display = 'block';
        document.getElementById('donut-input').style.display = 'none';
    } else {
        document.getElementById('donut-switch-btn').classList.add('active');
        document.getElementById('pie-description').style.display = 'none';
        document.getElementById('donut-description').style.display = 'block';
        document.getElementById('pie-api').style.display = 'none';
        document.getElementById('donut-api').style.display = 'block';
        document.getElementById('pie-input').style.display = 'none';
        document.getElementById('donut-input').style.display = 'block';
    }
    
    // 重新渲染图表
    renderPieDonutChart();
}

// 8. 散点图
function renderScatterChart() {
    const chartDom = document.getElementById('scatter-chart-wrapper');
    if (!chartDom) return;
    
    if (window.scatterChartInstance) {
        window.scatterChartInstance.dispose();
    }
    
    window.scatterChartInstance = echarts.init(chartDom);
    const option = {
        title: {
            text: '随机数据散点分布',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return `X: ${params.value[0]}<br/>Y: ${params.value[1]}`;
            }
        },
        xAxis: {},
        yAxis: {},
        series: [{
            symbolSize: 10,
            data: chartData.scatter.data.map(point => [point.x, point.y]),
            type: 'scatter',
            itemStyle: {
                color: '#ff7f0e'
            }
        }]
    };
    window.scatterChartInstance.setOption(option);
}

// 9. 箱线图
function renderBoxplotChart() {
    const chartDom = document.getElementById('error-chart-wrapper');
    if (!chartDom) return;
    
    if (window.boxplotChartInstance) {
        window.boxplotChartInstance.dispose();
    }
    
    window.boxplotChartInstance = echarts.init(chartDom);
    
    // 使用全局数据或默认数据
    const data2018 = chartData.error.data2018 || [5200, 5254.5, 5283.4, 5107.8, 5443.3, 5550.6, 
                                                          6400.2, 6404.9, 5483.1, 5330.2, 5543, 6199.9];
    const data2017 = chartData.error.data2017 || [4605.2, 4710.3, 5168.9, 4767.2, 4947, 5203, 
                                                          6047.4, 5945.5, 5219.6, 5038.1, 5196.3, 5698.6];
    
    // 计算箱形图所需的五个关键值
    function calculateBoxData(data) {
        const sorted = [...data].sort((a, b) => a - b);
        const q1 = sorted[Math.floor(sorted.length * 0.25)];
        const median = sorted[Math.floor(sorted.length * 0.5)];
        const q3 = sorted[Math.floor(sorted.length * 0.75)];
        const min = sorted[0];
        const max = sorted[sorted.length - 1];
        
        return [min, q1, median, q3, max];
    }
    
    const boxData2018 = calculateBoxData(data2018);
    const boxData2017 = calculateBoxData(data2017);
    
    const option = {
        title: {
            text: '发电量箱形图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                const data = params.data;
                return `
                    最小值: ${data[0]}<br/>
                    第一四分位数: ${data[1]}<br/>
                    中位数: ${data[2]}<br/>
                    第三四分位数: ${data[3]}<br/>
                    最大值: ${data[4]}
                `;
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'value',
            name: '发电量'
        },
        yAxis: {
            type: 'category',
            data: ['2017年', '2018年']
        },
        series: [
            {
                name: '箱形图',
                type: 'boxplot',
                data: [boxData2017, boxData2018],
                itemStyle: {
                    borderWidth: 2
                }
            }
        ]
    };
    
    window.boxplotChartInstance.setOption(option);
}

// 10. 雷达图
function renderRadarChart() {
    const chartDom = document.getElementById('radar-chart-wrapper');
    if (!chartDom) return;
    
    if (window.radarChartInstance) {
        window.radarChartInstance.dispose();
    }
    
    window.radarChartInstance = echarts.init(chartDom);
    const option = {
        title: {
            text: '霍兰德职业兴趣测试',
            left: 'center'
        },
        tooltip: {},
        legend: {
            data: ['个人兴趣', '平均兴趣'],
            top: 30
        },
        radar: {
            indicator: [
                { name: '现实型(R)', max: 100 },
                { name: '研究型(I)', max: 100 },
                { name: '艺术型(A)', max: 100 },
                { name: '社会型(S)', max: 100 },
                { name: '企业型(E)', max: 100 },
                { name: '常规型(C)', max: 100 }
            ]
        },
        series: [{
            name: '职业兴趣',
            type: 'radar',
            data: [
                {
                    value: chartData.radar.personal,
                    name: '个人兴趣',
                    itemStyle: {
                        color: '#ff7f0e'
                    }
                },
                {
                    value: chartData.radar.average,
                    name: '平均兴趣',
                    itemStyle: {
                        color: '#1f77b4'
                    }
                }
            ]
        }]
    };
    window.radarChartInstance.setOption(option);
}

// 11. 误差棒图
function renderErrorBarChart() {
    const chartDom = document.getElementById('error-bar-chart-wrapper');
    if (!chartDom) return;
    
    if (window.errorBarChartInstance) {
        window.errorBarChartInstance.dispose();
    }
    
    window.errorBarChartInstance = echarts.init(chartDom);
    const data = chartData.errorBar.categories.map((category, index) => {
        return [
            category,
            chartData.errorBar.values[index],
            chartData.errorBar.values[index] - chartData.errorBar.errors[index], // 下限
            chartData.errorBar.values[index] + chartData.errorBar.errors[index]  // 上限
        ];
    });
    
    const option = {
        title: {
            text: '不同实验条件下的测量结果',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const data = params[0].data;
                return `
                    实验条件: ${data[0]}<br/>
                    测量值: ${data[1]}<br/>
                    标准误差: ${data[2] ? (data[1] - data[2]).toFixed(1) : 'N/A'}<br/>
                    置信区间: [${data[2] ? data[2].toFixed(1) : 'N/A'}, ${data[3] ? data[3].toFixed(1) : 'N/A'}]
                `;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: chartData.errorBar.categories
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '测量值',
                type: 'bar',
                data: chartData.errorBar.values,
                itemStyle: {
                    color: '#2ca02c'
                }
            },
            {
                name: '误差棒',
                type: 'custom',
                renderItem: function(params, api) {
                    const xValue = api.value(0);
                    const yValue = api.value(1);
                    const highValue = api.value(3);
                    const lowValue = api.value(2);
                    
                    const x = api.coord([xValue, yValue])[0];
                    const y = api.coord([xValue, yValue])[1];
                    const highY = api.coord([xValue, highValue])[1];
                    const lowY = api.coord([xValue, lowValue])[1];
                    
                    const width = 20;
                    
                    return {
                        type: 'group',
                        children: [
                            // 垂直线
                            {
                                type: 'line',
                                shape: {
                                    x1: x, y1: highY,
                                    x2: x, y2: lowY
                                },
                                style: {
                                    stroke: '#333',
                                    lineWidth: 2
                                }
                            },
                            // 上横线
                            {
                                type: 'line',
                                shape: {
                                    x1: x - width/2, y1: highY,
                                    x2: x + width/2, y2: highY
                                },
                                style: {
                                    stroke: '#333',
                                    lineWidth: 2
                                }
                            },
                            // 下横线
                            {
                                type: 'line',
                                shape: {
                                    x1: x - width/2, y1: lowY,
                                    x2: x + width/2, y2: lowY
                                },
                                style: {
                                    stroke: '#333',
                                    lineWidth: 2
                                }
                            }
                        ]
                    };
                },
                data: data,
                z: 100
            }
        ]
    };
    window.errorBarChartInstance.setOption(option);
}

// 提交新数据 - 折线图
function submitLineData() {
    const datesInput = document.getElementById('line-dates').value;
    const maxTempsInput = document.getElementById('line-max-temps').value;
    const minTempsInput = document.getElementById('line-min-temps').value;
    
    if (!datesInput || !maxTempsInput || !minTempsInput) {
        showNotification('请填写所有字段', true);
        return;
    }
    
    const dates = datesInput.split(',').map(s => s.trim());
    const maxTemps = maxTempsInput.split(',').map(s => parseFloat(s.trim()));
    const minTemps = minTempsInput.split(',').map(s => parseFloat(s.trim()));
    
    if (dates.length !== maxTemps.length || dates.length !== minTemps.length) {
        showNotification('数据长度不一致', true);
        return;
    }
    
    if (maxTemps.some(isNaN) || minTemps.some(isNaN)) {
        showNotification('请输入有效的数字', true);
        return;
    }
    
    // 更新数据
    chartData.line = {
        dates: dates,
        maxTemps: maxTemps,
        minTemps: minTemps
    };
    
    // 重新渲染图表
    renderLineChart();
    
    // 显示成功通知
    showNotification('数据已成功更新');
    
    // 清空输入框
    document.getElementById('line-dates').value = '';
    document.getElementById('line-max-temps').value = '';
    document.getElementById('line-min-temps').value = '';
}

// 处理折线图Excel文件
function handleLineExcelFile(input) {
    if (input.files && input.files[0]) {
        processExcelFile(input.files[0], function(jsonData) {
            try {
                // 跳过标题行（如果有）
                const startIndex = isNaN(parseFloat(jsonData[0][1])) ? 1 : 0;
                
                const dates = [];
                const maxTemps = [];
                const minTemps = [];
                
                for (let i = startIndex; i < jsonData.length; i++) {
                    const row = jsonData[i];
                    if (row.length >= 3) {
                        dates.push(String(row[0]));
                        maxTemps.push(parseFloat(row[1]));
                        minTemps.push(parseFloat(row[2]));
                    }
                }
                
                if (dates.length === 0) {
                    showNotification('Excel文件中没有有效数据', true);
                    return;
                }
                
                // 更新数据
                chartData.line = {
                    dates: dates,
                    maxTemps: maxTemps,
                    minTemps: minTemps
                };
                
                // 重新渲染图表
                renderLineChart();
                
                // 显示成功通知
                showNotification('Excel文件数据已成功导入');
                
                // 清空输入框
                document.getElementById('line-dates').value = dates.join(',');
                document.getElementById('line-max-temps').value = maxTemps.join(',');
                document.getElementById('line-min-temps').value = minTemps.join(',');
            } catch (error) {
                showNotification('Excel文件格式错误: ' + error.message, true);
            }
        });
    }
}

// 提交新数据 - 柱状图
function submitBarData() {
    const yearsInput = document.getElementById('bar-years').value;
    const valuesInput = document.getElementById('bar-values').value;
    
    if (!yearsInput || !valuesInput) {
        showNotification('请填写所有字段', true);
        return;
    }
    
    const years = yearsInput.split(',').map(s => s.trim());
    const values = valuesInput.split(',').map(s => parseFloat(s.trim()));
    
    if (years.length !== values.length) {
        showNotification('数据长度不一致', true);
        return;
    }
    
    if (values.some(isNaN)) {
        showNotification('请输入有效的数字', true);
        return;
    }
    
    // 更新数据
    chartData.bar = {
        years: years,
        values: values
    };
    
    // 重新渲染图表
    renderBarChart();
    
    // 显示成功通知
    showNotification('数据已成功更新');
    
    // 清空输入框
    document.getElementById('bar-years').value = '';
    document.getElementById('bar-values').value = '';
}

// 处理柱状图Excel文件
function handleBarExcelFile(input) {
    if (input.files && input.files[0]) {
        processExcelFile(input.files[0], function(jsonData) {
            try {
                // 跳过标题行（如果有）
                const startIndex = isNaN(parseFloat(jsonData[0][1])) ? 1 : 0;
                
                const years = [];
                const values = [];
                
                for (let i = startIndex; i < jsonData.length; i++) {
                    const row = jsonData[i];
                    if (row.length >= 2) {
                        years.push(String(row[0]));
                        values.push(parseFloat(row[1]));
                    }
                }
                
                if (years.length === 0) {
                    showNotification('Excel文件中没有有效数据', true);
                    return;
                }
                
                // 更新数据
                chartData.bar = {
                    years: years,
                    values: values
                };
                
                // 重新渲染图表
                renderBarChart();
                
                // 显示成功通知
                showNotification('Excel文件数据已成功导入');
                
                // 更新输入框
                document.getElementById('bar-years').value = years.join(',');
                document.getElementById('bar-values').value = values.join(',');
            } catch (error) {
                showNotification('Excel文件格式错误: ' + error.message, true);
            }
        });
    }
}

// 提交新数据 - 水平柱状图
function submitHorizontalBarData() {
    const categoriesInput = document.getElementById('horizontal-categories').value;
    const ratesInput = document.getElementById('horizontal-rates').value;
    
    if (!categoriesInput || !ratesInput) {
        showNotification('请填写所有字段', true);
        return;
    }
    
    const categories = categoriesInput.split(',').map(s => s.trim());
    const rates = ratesInput.split(',').map(s => parseFloat(s.trim()));
    
    if (categories.length !== rates.length) {
        showNotification('数据长度不一致', true);
        return;
    }
    
    if (rates.some(isNaN)) {
        showNotification('请输入有效的数字', true);
        return;
    }
    
    // 更新数据
    chartData.horizontalBar = {
        categories: categories,
        rates: rates
    };
    
    // 重新渲染图表
    renderHorizontalBarChart();
    
    // 显示成功通知
    showNotification('数据已成功更新');
    
    // 清空输入框
    document.getElementById('horizontal-categories').value = '';
    document.getElementById('horizontal-rates').value = '';
}

// 处理水平柱状图Excel文件
function handleHorizontalBarExcelFile(input) {
    if (input.files && input.files[0]) {
        processExcelFile(input.files[0], function(jsonData) {
            processExcelData(jsonData, 'horizontalBar', function(processedData) {
                const categories = [];
                const rates = [];
                
                for (const row of processedData) {
                    if (row.length >= 2) {
                        categories.push(String(row[0]));
                        rates.push(parseFloat(row[1]));
                    }
                }
                
                // 更新数据
                chartData.horizontalBar = {
                    categories: categories,
                    rates: rates
                };
                
                // 重新渲染图表
                renderHorizontalBarChart();
                
                // 显示成功通知
                showNotification('Excel文件数据已成功导入');
                
                // 更新输入框
                document.getElementById('horizontal-categories').value = categories.join(',');
                document.getElementById('horizontal-rates').value = rates.join(',');
            });
        });
    }
}

// 提交新数据 - 堆积图
function submitAreaData() {
    const monthsInput = document.getElementById('area-months').value;
    const companyAInput = document.getElementById('area-company-a').value;
    const companyBInput = document.getElementById('area-company-b').value;
    const companyCInput = document.getElementById('area-company-c').value;
    
    if (!monthsInput || !companyAInput || !companyBInput || !companyCInput) {
        showNotification('请填写所有字段', true);
        return;
    }
    
    const months = monthsInput.split(',').map(s => s.trim());
    const companyA = companyAInput.split(',').map(s => parseFloat(s.trim()));
    const companyB = companyBInput.split(',').map(s => parseFloat(s.trim()));
    const companyC = companyCInput.split(',').map(s => parseFloat(s.trim()));
    
    if (months.length !== companyA.length || months.length !== companyB.length || months.length !== companyC.length) {
        showNotification('数据长度不一致', true);
        return;
    }
    
    if (companyA.some(isNaN) || companyB.some(isNaN) || companyC.some(isNaN)) {
        showNotification('请输入有效的数字', true);
        return;
    }
    
    // 更新数据
    chartData.area = {
        months: months,
        companyA: companyA,
        companyB: companyB,
        companyC: companyC
    };
    
    // 重新渲染图表
    renderAreaChart();
    
    // 显示成功通知
    showNotification('数据已成功更新');
    
    // 清空输入框
    document.getElementById('area-months').value = '';
    document.getElementById('area-company-a').value = '';
    document.getElementById('area-company-b').value = '';
    document.getElementById('area-company-c').value = '';
}

// 提交新数据 - 直方图
function submitHistogramData() {
    const rangesInput = document.getElementById('histogram-ranges').value;
    const frequenciesInput = document.getElementById('histogram-frequencies').value;
    
    if (!rangesInput || !frequenciesInput) {
        showNotification('请填写所有字段', true);
        return;
    }
    
    const ranges = rangesInput.split(',').map(s => s.trim());
    const frequencies = frequenciesInput.split(',').map(s => parseFloat(s.trim()));
    
    if (ranges.length !== frequencies.length) {
        showNotification('数据长度不一致', true);
        return;
    }
    
    if (frequencies.some(isNaN)) {
        showNotification('请输入有效的数字', true);
        return;
    }
    
    // 更新数据
    chartData.histogram = {
        ranges: ranges,
        frequencies: frequencies
    };
    
    // 重新渲染图表
    renderHistogramChart();
    
    // 显示成功通知
    showNotification('数据已成功更新');
    
    // 清空输入框
    document.getElementById('histogram-ranges').value = '';
    document.getElementById('histogram-frequencies').value = '';
}

// 提交新数据 - 饼图
function submitPieData() {
    const sourcesInput = document.getElementById('pie-sources').value;
    
    if (!sourcesInput) {
        showNotification('请填写数据', true);
        return;
    }
    
    const lines = sourcesInput.trim().split('\n');
    const sources = [];
    
    for (const line of lines) {
        const parts = line.split(',');
        if (parts.length !== 2) {
            showNotification('数据格式错误，请使用 名称,值 格式', true);
            return;
        }
        
        const name = parts[0].trim();
        const value = parseFloat(parts[1].trim());
        
        if (isNaN(value)) {
            showNotification('请输入有效的数字', true);
            return;
        }
        
        sources.push({ name, value });
    }
    
    // 更新数据
    chartData.pie = {
        sources: sources
    };
    
    // 重新渲染图表
    renderPieDonutChart();
    
    // 显示成功通知
    showNotification('数据已成功更新');
    
    // 清空输入框
    document.getElementById('pie-sources').value = '';
}

// 提交新数据 - 环形图
function submitDonutData() {
    const categoriesInput = document.getElementById('donut-categories').value;
    
    if (!categoriesInput) {
        showNotification('请填写数据', true);
        return;
    }
    
    const lines = categoriesInput.trim().split('\n');
    const categories = [];
    
    for (const line of lines) {
        const parts = line.split(',');
        if (parts.length !== 2) {
            showNotification('数据格式错误，请使用 名称,值 格式', true);
            return;
        }
        
        const name = parts[0].trim();
        const value = parseFloat(parts[1].trim());
        
        if (isNaN(value)) {
            showNotification('请输入有效的数字', true);
            return;
        }
        
        categories.push({ name, value });
    }
    
    // 更新数据
    chartData.donut = {
        categories: categories
    };
    
    // 重新渲染图表
    renderPieDonutChart();
    
    // 显示成功通知
    showNotification('数据已成功更新');
    
    // 清空输入框
    document.getElementById('donut-categories').value = '';
}

// 提交新数据 - 散点图
function submitScatterData() {
    const xValuesInput = document.getElementById('scatter-x-values').value;
    const yValuesInput = document.getElementById('scatter-y-values').value;
    
    if (!xValuesInput || !yValuesInput) {
        showNotification('请填写所有字段', true);
        return;
    }
    
    const xValues = xValuesInput.split(',').map(s => parseFloat(s.trim()));
    const yValues = yValuesInput.split(',').map(s => parseFloat(s.trim()));
    
    if (xValues.length !== yValues.length) {
        showNotification('数据长度不一致', true);
        return;
    }
    
    if (xValues.some(isNaN) || yValues.some(isNaN)) {
        showNotification('请输入有效的数字', true);
        return;
    }
    
    // 更新数据
    const data = [];
    for (let i = 0; i < xValues.length; i++) {
        data.push({
            x: xValues[i],
            y: yValues[i]
        });
    }
    
    chartData.scatter = {
        data: data
    };
    
    // 重新渲染图表
    renderScatterChart();
    
    // 显示成功通知
    showNotification('数据已成功更新');
    
    // 清空输入框
    document.getElementById('scatter-x-values').value = '';
    document.getElementById('scatter-y-values').value = '';
}

// 提交新数据 - 箱线图
function submitErrorData() {
    const data2017Input = document.getElementById('error-data-2017').value;
    const data2018Input = document.getElementById('error-data-2018').value;
    
    if (!data2017Input || !data2018Input) {
        showNotification('请填写所有字段', true);
        return;
    }
    
    const data2017 = data2017Input.split(',').map(s => parseFloat(s.trim()));
    const data2018 = data2018Input.split(',').map(s => parseFloat(s.trim()));
    
    if (data2017.some(isNaN) || data2018.some(isNaN)) {
        showNotification('请输入有效的数字', true);
        return;
    }
    
    // 更新数据
    chartData.error = {
        data2017: data2017,
        data2018: data2018
    };
    
    // 重新渲染图表
    renderBoxplotChart();
    
    // 显示成功通知
    showNotification('数据已成功更新');
    
    // 清空输入框
    document.getElementById('error-data-2017').value = '';
    document.getElementById('error-data-2018').value = '';
}

// 提交新数据 - 雷达图
function submitRadarData() {
    const personalInput = document.getElementById('radar-personal').value;
    const averageInput = document.getElementById('radar-average').value;
    
    if (!personalInput || !averageInput) {
        showNotification('请填写所有字段', true);
        return;
    }
    
    const personal = personalInput.split(',').map(s => parseFloat(s.trim()));
    const average = averageInput.split(',').map(s => parseFloat(s.trim()));
    
    if (personal.length !== 6 || average.length !== 6) {
        showNotification('请输入6个值', true);
        return;
    }
    
    if (personal.some(isNaN) || average.some(isNaN)) {
        showNotification('请输入有效的数字', true);
        return;
    }
    
    // 更新数据
    chartData.radar = {
        personal: personal,
        average: average
    };
    
    // 重新渲染图表
    renderRadarChart();
    
    // 显示成功通知
    showNotification('数据已成功更新');
    
    // 清空输入框
    document.getElementById('radar-personal').value = '';
    document.getElementById('radar-average').value = '';
}

// 提交新数据 - 误差棒图
function submitErrorBarData() {
    const categoriesInput = document.getElementById('error-bar-categories').value;
    const valuesInput = document.getElementById('error-bar-values').value;
    const errorsInput = document.getElementById('error-bar-errors').value;
    
    if (!categoriesInput || !valuesInput || !errorsInput) {
        showNotification('请填写所有字段', true);
        return;
    }
    
    const categories = categoriesInput.split(',').map(s => s.trim());
    const values = valuesInput.split(',').map(s => parseFloat(s.trim()));
    const errors = errorsInput.split(',').map(s => parseFloat(s.trim()));
    
    if (categories.length !== values.length || categories.length !== errors.length) {
        showNotification('数据长度不一致', true);
        return;
    }
    
    if (values.some(isNaN) || errors.some(isNaN)) {
        showNotification('请输入有效的数字', true);
        return;
    }
    
    // 更新数据
    chartData.errorBar = {
        categories: categories,
        values: values,
        errors: errors
    };
    
    // 重新渲染图表
    renderErrorBarChart();
    
    // 显示成功通知
    showNotification('数据已成功更新');
    
    // 清空输入框
    document.getElementById('error-bar-categories').value = '';
    document.getElementById('error-bar-values').value = '';
    document.getElementById('error-bar-errors').value = '';
}

// 刷新数据
function refreshChart(chartId) {
    switch(chartId) {
        case 'line-chart':
            // 生成随机折线图数据
            const dates = ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
            const maxTemps = Array.from({length: 15}, () => Math.round(Math.random() * 15 + 20));
            const minTemps = Array.from({length: 15}, () => Math.round(Math.random() * 10 + 10));
            
            chartData.line = {
                dates: dates,
                maxTemps: maxTemps,
                minTemps: minTemps
            };
            renderLineChart();
            showNotification('折线图数据已刷新');
            break;
            
        case 'bar-chart':
            // 生成随机柱状图数据
            const years = ['FY2013', 'FY2014', 'FY2015', 'FY2016', 'FY2017', 'FY2018', 'FY2019'];
            const values = Array.from({length: 7}, () => Math.round(Math.random() * 40000 + 10000));
            
            chartData.bar = {
                years: years,
                values: values
            };
            renderBarChart();
            showNotification('柱状图数据已刷新');
            break;
            
        case 'horizontal-bar-chart':
            // 生成随机水平柱状图数据
            const categories = ['家政、家教、保姆等生活服务', '飞机票、火车票', '家具', '手机、手机配件', '计算机及其配套产品', '汽车用品', '通信充值、游戏充值', '个人护理用品', '书报杂志及音像制品', '餐饮、旅游、住宿', '家用电器', '食品、饮料、烟酒、保健品', '家庭日杂用品', '保险、演出票务', '服装、鞋帽、家用纺织品', '数码产品', '其他商品和服务', '工艺品、收藏品'];
            const rates = Array.from({length: 18}, () => Math.random() * 0.4 + 0.6);
            
            chartData.horizontalBar = {
                categories: categories,
                rates: rates
            };
            renderHorizontalBarChart();
            showNotification('水平柱状图数据已刷新');
            break;
            
        case 'area-chart':
            // 生成随机堆积图数据
            const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
            const companyA = Array.from({length: 12}, () => Math.round(Math.random() * 100 + 150));
            const companyB = Array.from({length: 12}, () => Math.round(Math.random() * 150 + 180));
            const companyC = Array.from({length: 12}, () => Math.round(Math.random() * 80 + 170));
            
            chartData.area = {
                months: months,
                companyA: companyA,
                companyB: companyB,
                companyC: companyC
            };
            renderAreaChart();
            showNotification('堆积图数据已刷新');
            break;
            
        case 'histogram-chart':
            // 生成随机直方图数据
            const ranges = ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'];
            const frequencies = Array.from({length: 10}, () => Math.round(Math.random() * 30 + 5));
            
            chartData.histogram = {
                ranges: ranges,
                frequencies: frequencies
            };
            renderHistogramChart();
            showNotification('直方图数据已刷新');
            break;
            
        case 'pie-donut-chart':
            // 生成随机饼图/环形图数据
            const sources = [
                { name: '直接访问', value: Math.round(Math.random() * 500 + 300) },
                { name: '邮件营销', value: Math.round(Math.random() * 300 + 200) },
                { name: '联盟广告', value: Math.round(Math.random() * 200 + 150) },
                { name: '视频广告', value: Math.round(Math.random() * 150 + 100) },
                { name: '搜索引擎', value: Math.round(Math.random() * 1000 + 1000) }
            ];
            
            const categories = [
                { name: '电子产品', value: Math.round(Math.random() * 200 + 200) },
                { name: '家居用品', value: Math.round(Math.random() * 150 + 150) },
                { name: '服装鞋帽', value: Math.round(Math.random() * 100 + 150) },
                { name: '食品饮料', value: Math.round(Math.random() * 100 + 100) },
                { name: '其他', value: Math.round(Math.random() * 50 + 50) }
            ];
            
            chartData.pie = {
                sources: sources
            };
            
            chartData.donut = {
                categories: categories
            };
            
            renderPieDonutChart();
            showNotification(currentChartType === 'pie' ? '饼图数据已刷新' : '环形图数据已刷新');
            break;
            
        case 'scatter-chart':
            // 生成随机散点图数据
            const data = [];
            for (let i = 0; i < 100; i++) {
                data.push({
                    x: Math.round(Math.random() * 100),
                    y: Math.round(Math.random() * 100)
                });
            }
            
            chartData.scatter = {
                data: data
            };
            renderScatterChart();
            showNotification('散点图数据已刷新');
            break;
            
        case 'error-chart':
            // 生成随机箱线图数据
            const data2017 = Array.from({length: 12}, () => Math.round(Math.random() * 2000 + 4000));
            const data2018 = Array.from({length: 12}, () => Math.round(Math.random() * 2000 + 5000));
            
            chartData.error = {
                data2017: data2017,
                data2018: data2018
            };
            renderBoxplotChart();
            showNotification('箱线图数据已刷新');
            break;
            
        case 'radar-chart':
            // 生成随机雷达图数据
            const personal = Array.from({length: 6}, () => Math.round(Math.random() * 40 + 60));
            const average = Array.from({length: 6}, () => Math.round(Math.random() * 20 + 55));
            
            chartData.radar = {
                personal: personal,
                average: average
            };
            renderRadarChart();
            showNotification('雷达图数据已刷新');
            break;
            
        case 'error-bar-chart':
            // 生成随机误差棒图数据
            const errorBarCategories = ['条件A', '条件B', '条件C', '条件D', '条件E'];
            const errorBarValues = errorBarCategories.map(() => Math.round(Math.random() * 30 + 20));
            const errorBarErrors = errorBarCategories.map(() => Math.round(Math.random() * 5 + 1));
            
            chartData.errorBar = {
                categories: errorBarCategories,
                values: errorBarValues,
                errors: errorBarErrors
            };
            renderErrorBarChart();
            showNotification('误差棒图数据已刷新');
            break;
    }
}

// 导出图表功能
function exportChart(chartId) {
    let chartInstance;
    let fileName;
    
    switch(chartId) {
        case 'line-chart':
            chartInstance = window.lineChartInstance;
            fileName = '折线图';
            break;
        case 'bar-chart':
            chartInstance = window.barChartInstance;
            fileName = '柱状图';
            break;
        case 'horizontal-bar-chart':
            chartInstance = window.horizontalBarChartInstance;
            fileName = '水平柱状图';
            break;
        case 'area-chart':
            chartInstance = window.areaChartInstance;
            fileName = '堆积图';
            break;
        case 'histogram-chart':
            chartInstance = window.histogramChartInstance;
            fileName = '直方图';
            break;
        case 'pie-donut-chart':
            chartInstance = window.pieDonutChartInstance;
            fileName = currentChartType === 'pie' ? '饼图' : '环形图';
            break;
        case 'scatter-chart':
            chartInstance = window.scatterChartInstance;
            fileName = '散点图';
            break;
        case 'error-chart':
            chartInstance = window.boxplotChartInstance;
            fileName = '箱线图';
            break;
        case 'radar-chart':
            chartInstance = window.radarChartInstance;
            fileName = '雷达图';
            break;
        case 'error-bar-chart':
            chartInstance = window.errorBarChartInstance;
            fileName = '误差棒图';
            break;
    }
    
    if (chartInstance) {
        const url = chartInstance.getDataURL({
            type: 'png',
            pixelRatio: 2,
            backgroundColor: '#fff'
        });
        
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName + '.png';
        a.click();
    }
}