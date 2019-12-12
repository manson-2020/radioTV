class Pages {
    constructor() {
        this.timer();
        this.charts("population");
        this.charts("coverage");
        this.charts("attendance");
        this.charts("map");
    }

    $ = selector => document.querySelector(selector);

    timer = _ => {
        this.apiRequest();
        setInterval(this.timer, 30000);
    }

    charts(container) {
        let option = {};
        switch (container) {
            case "population":
                option = {
                    /* 线条颜色，可设置多个颜色 */
                    color: ['#ffa82f'],
                    /* 图像四周边距设置 */
                    grid: {
                        // left: 30,
                        top: 30,
                        // right: 20,
                        bottom: 30
                    },
                    /* 图例说明 */
                    legend: {
                        // 图例排项 vertical-"竖向"; horizontal-"横向"
                        orient: 'horizontal',
                        // 图例组件离容器左侧的距离
                        right: 60,
                        top: 0,
                        //图例文字的样式
                        textStyle: {
                            color: '#6ab2ec',
                        },
                        // 与series中每个name一一对应
                        data: ['人口数量']
                    },
                    /* 鼠标悬浮时显示数据 */
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: ['2015', '2016', '2017', '2018', '2019'],
                        //设置轴线的属性
                        axisLine: {
                            lineStyle: {
                                color: '#6ab2ec',
                            }
                        },
                        //调整x轴的lable
                        axisLabel: {
                            textStyle: {
                                fontSize: 15 // 让字体变小
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',

                        axisLabel: {
                            formatter(v) {
                                let numStr = v.toString();
                                let decimal = "";
                                switch (true) {
                                    case numStr.length > 8:
                                        decimal = numStr.substring(numStr.length - 8, numStr.length - 8);
                                        return parseFloat(parseInt(v / 100000000) + '.' + decimal) + 'y';
                                    case numStr.length > 5:
                                        decimal = numStr.substring(numStr.length - 4, numStr.length - 4)
                                        return parseFloat(parseInt(v / 10000) + '.' + decimal) + 'w';
                                    case numStr.length == 5:
                                        decimal = numStr.substring(numStr.length - 3, numStr.length - 4)
                                        return parseFloat(parseInt(v / 10000) + '.' + decimal) + 'w';
                                    default:
                                        return numStr;
                                }
                            },
                            textStyle: {
                                fontSize: 15 // 让字体变小
                            }
                        },
                        max: 95000,
                        min: 85000,
                        splitNumber: 5,
                        // 控制网格线是否显示
                        splitLine: {
                            show: true,
                            //  改变轴线颜色
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#132a6e']
                            }
                        },
                        //设置轴线的属性
                        axisLine: {
                            lineStyle: {
                                color: '#6ab2ec',
                            }
                        }
                    },
                    /* 数据配置，若有多条折线则在数组中追加{name: , data: } */
                    series: [{
                        name: '人口数量',
                        data: [91000, 92000, 93000, 94000, 95000],
                        type: 'line',
                        symbol: 'circle',
                        // 设置折点大小
                        symbolSize: 10,
                        // 设置为光滑曲线
                        smooth: true
                    }]
                };
                break;
            case "coverage":
                option = {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
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
                            data: ['广播人口', '电视人口', '广播节目', '电视节目', '农村广播', '农村电视'],
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#6ab2ec"
                                }
                            },
                            splitLine: {
                                show: false
                            },
                            axisLabel: {
                                textStyle: {
                                    fontSize: 12 // 让字体变小
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: "#6ab2ec"
                                }
                            },
                            splitLine: {
                                show: false
                            },
                            max: 100,
                            min: 90,
                            axisLabel: {
                                textStyle: {
                                    fontSize: 15 // 让字体变小
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '覆盖率',
                            type: 'bar',
                            barWidth: '60%',
                            data: [98.94, 99.25, 97.85, 97.46, 98.58, 99.01]
                        }
                    ]
                };
                break;
            case "attendance":
                option = {
                    /* 线条颜色，可设置多个颜色 */
                    color: ['#ffa82f'],
                    /* 图像四周边距设置 */
                    grid: {
                        left: 30,
                        top: 30,
                        right: 20,
                        bottom: 30
                    },
                    /* 图例说明 */
                    legend: {
                        // 图例排项 vertical-"竖向"; horizontal-"横向"
                        orient: 'horizontal',
                        // 图例组件离容器左侧的距离
                        right: 60,
                        top: 0,
                        //图例文字的样式
                        textStyle: {
                            color: '#6ab2ec',
                        },
                        // 与series中每个name一一对应
                        data: ['出勤率']
                    },
                    /* 鼠标悬浮时显示数据 */
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: ['2014', '2015', '2016', '2017', '2018', '2019', '2020'],
                        //设置轴线的属性
                        axisLine: {
                            lineStyle: {
                                color: '#6ab2ec',
                            }
                        },
                        //调整x轴的lable
                        axisLabel: {
                            textStyle: {
                                fontSize: 10 // 让字体变小
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        // 控制网格线是否显示
                        splitLine: {
                            show: true,
                            //  改变轴线颜色
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#132a6e']
                            }
                        },
                        //设置轴线的属性
                        axisLine: {
                            lineStyle: {
                                color: '#6ab2ec',
                            }
                        }
                    },
                    /* 数据配置，若有多条折线则在数组中追加{name: , data: } */
                    series: [{
                        name: '出勤率',
                        data: [10, 23, 65, 36, 85, 43, 60],
                        type: 'line',
                        symbol: 'circle',
                        // 设置折点大小
                        symbolSize: 10,
                        // 设置为光滑曲线
                        smooth: true
                    },
                    ]
                };
                break;
            case "map":
                option = {
                    title: {
                        text: '',
                        left: 'center'
                    },
                    geo: {
                        show: true,
                        roam: true, //是否允许鼠标滚动放大，缩小
                        map: '山西',
                        label: {//图形上的文本标签，可用于说明图形的一些数据信息
                            show: false, //是否显示文本
                            color: '#CCC', //文本颜色
                        },
                        itemStyle: {//地图区域的多边形 图形样式。 默认样试。
                            areaColor: '#006fc3', //地图区域的颜色。
                            borderColor: '#81caf4', //边框线
                        },
                        emphasis: {//高亮状态下的多边形和标签样式。
                            label: {//文本
                                color: '#ADA',
                            },
                            itemStyle: {//区域
                                areaColor: '#0098c6'
                            }
                        },

                    },
                    tooltip: {
                        show: true,
                    },

                    visualMap: {
                        show: false,
                        min: 0, //最小值
                        max: 600, //最大值
                        inRange: {
                            color: ['rgb(255,255,255)', 'rgb(153,211,232)', 'rgb(239,239,130)'] //颜色
                        },
                        textStyle: {
                            color: '#fff'
                        },
                    },
                    series: [
                        {
                            type: 'effectScatter', //样试
                            coordinateSystem: 'geo', //该系列使用的坐标系
                            data: [//数据
                                { name: '', value: [111.5, 36.2, 330] }
                            ],
                            itemStyle: {//样试。
                                normal: {//默认样试
                                    color: '#d6f628'
                                }
                            },
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            //标记的大小,可以设置数组或者函数返回值的形式
                            symbolSize: val => val[2] / 15,
                            rippleEffect: {//涟漪特效相关配置。
                                brushType: 'stroke' //波纹的绘制方式
                            },
                            hoverAnimation: true, //鼠标移入放大圆
                        }
                    ]
                };
                break;
        }
        echarts.init(this.$(`#${container}-container`)).setOption(option);
    }

    async apiRequest() {
        const localInfo = await fetch("https://www.tianqiapi.com/api/?appid=61491654&appsecret=1Yg7THbh&version=v6&cityid=101100717").then(res => res.json())

        this.$("#environmental-container").innerHTML = `
            <ul id="weather" class="jc-sa fd-column">
                <li class="weather-item jc-sa ai-center">
                    <img src="./src/images/${localInfo.wea_img}.png" />
                    <p>[ ${localInfo.city} ]  更新时间：${localInfo.date} ${localInfo.week} ${localInfo.update_time}</p>
                </li>
                <li class="weather-item mb-12 jc-sa">
                    <p class="fs-20">${localInfo.wea}</p>
                    <p>${localInfo.tem}℃ ~ ${localInfo.tem1}℃ ~ ${localInfo.tem2}℃</p>
                    <p>湿度：${localInfo.humidity}</p>
                </li>
                <li class="weather-item">
                    <p class="f1">风向：${localInfo.win}</p>
                    <p class="f1">风速等级：${localInfo.win_speed}</p>
                    <p class="f1 nowrap">风速：${localInfo.win_meter}</p>
                </li>
                <li class="weather-item">
                    <p class="f1">PM2.5：${localInfo.air_pm25}</p>
                    <p class="f1">气压：${localInfo.pressure}</p>
                    <p class="f1">能见度：${localInfo.visibility}</p>
                </li>
                <li class="weather-item">
                    <p class="f1">空气质量：${localInfo.air}</p>
                    <p class="f2">空气质量等级：${localInfo.air_level}</p>
                </li>
                <li class="weather-item">
                    <p class="f1">${localInfo.air_tips}</p>
                </li>
            </ul>
        `


        const data = (await fetch("http://192.168.1.12:9002/api/daping/data").then(res => res.json())).result;
        [
            { id: "reportOrderList", param: "order" },
            { id: "reportRecordList", param: "logs" }
        ].map(item => {
            this.$(`#${item.id}-container`).innerHTML = `
            <table class="table f1" border="1">
                <tbody>
                ${data[item.param].map(item => (
                `<tr>
                    <td>${item.name}</td>
                    <td>${item.text}</td>
                    <td>${item.time}</td>
                </tr>`
            )).join(String())}
                </tbody>
            </table>`
        });

        [
            { id: "fieldworkTotal", text: "外勤总人数：", data: data.waiTotal, style: "margin-top: 12px;" },
            { id: "fieldworkRatio", text: "外勤人数占比：", data: data.waiTotal + "%", style: `background-size: 100%, ${data.waiScale}%; margin-top: 12px;` },
            { id: "todayRepairOrder", text: "今日报修订单总数：", data: data.todayOrder, style: "margin-top: 12px;" },
            { id: "todayRepairRecord", text: "今日维修记录总数：", data: data.todayLogs, style: "margin-top: 12px;" },
            { id: "total", text: "今日维修记录总数：", data: data.waiTotal },
            { id: "report", text: "今日维修记录总数：", data: data.orderTotal },
            { id: "complete", text: "今日维修记录总数：", data: data.orderOver }
        ].map(item => {
            this.$(`#${item.id}-container`).innerHTML = `
                <p>${item.text}</p>
                <div class="progress-bar" style="${item.style}">${item.data}</div>
            `
        })
    }
}
