class Pages {
    constructor() {
        fetch("http://fix.shdong.cn/api/daping/data").then(res => res.json()).then(res => {
            this.charts("attendance", res.result.logsY);
            this.charts("map", res.result.position);
            this.getNumber(res.result.num);

        });
        this.charts("population");
        this.charts("coverage");
        this.charts("faultType");
        this.dataTimer();
        this.localInfoTimer();
    }

    $ = selector => document.querySelector(selector);

    dataTimer = _ => {
        clearInterval(this.preDataTimer);
        this.refreshData();
        this.preDataTimer = setInterval(this.dataTimer, 10000);
    }

    localInfoTimer = _ => {
        clearInterval(this.preLocalInfoTimer);
        this.getLocalInfo();
        this.preLocalInfoTimer = setInterval(_ => {
            this.localInfoTimer();
            localStorage.removeItem("localInfo");
        }, 10800000);
    }

    dateFormat(fmt, date) {
        let ret;
        let opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt;
    }

    getBeforeDate(date, before) {
        date.setDate(date.getDate() - before);
        let dateArray = [];
        for (let i = 0; i < before; i++) {
            dateArray.push((date.getMonth() + 1) + "-" + date.getDate());
            date.setDate(date.getDate() + 1);
        }
        return dateArray;
    }

    charts(container, data) {
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
                        data: this.getBeforeDate(new Date(), 7),
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
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 13 // 让字体变小
                            }
                        }
                    },
                    /* 数据配置，若有多条折线则在数组中追加{name: , data: } */
                    series: [{
                        name: '出勤数',
                        data,
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
                        // bottom: "100",
                        zoom: 4.5,
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
                        layoutCenter: ['90%', '-42%'],
                        layoutSize: 450,
                        regions: [{
                            name: '临汾市',
                            selected: true
                        }]

                    },
                    tooltip: {
                        show: true,
                        formatter: '{b}'
                    },

                    visualMap: {
                        show: false,
                        min: 100, //最小值
                        max: 300, //最大值
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
                            data,
                            itemStyle: {//样试。
                                normal: {//默认样试
                                    color: '#d6f628'
                                }
                            },
                            label: {
                                normal: {
                                    position: 'right',
                                    show: false
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
            case "faultType":
                option = {
                    title: {
                        text: '报修常见故障类型及占比',
                        textStyle: {
                            color: "#00ffff",
                            fontSize: "22",
                            fontWeight: "400"
                        },
                        x: 'center'
                    },

                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        bottom: "center",
                        top: "center",
                        data: ['网络故障: 33%', '信号异常: 30%', '设备故障: 17%', '其他故障: 15%', '基站故障: 5%'],
                        textStyle: {
                            color: "#",
                            fontSize: "13"
                        },
                        show: false
                    },
                    color: ['#83a4d4', "#4286f4", '#12c2e9', '#FEAC5E', '#f64f59'],
                    series: [
                        {
                            name: '报修故障类型占比',
                            type: 'pie',
                            radius: '45%',
                            center: ['50%', '36%'],
                            data: [
                                { value: 33, name: '网络故障: 33%' },
                                { value: 30, name: '信号异常: 30%' },
                                { value: 17, name: '设备故障: 17%' },
                                { value: 15, name: '其他故障: 15%' },
                                { value: 5, name: '基站故障: 5%' }
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            label: {
                                show: true,
                                textStyle: {
                                    fontSize: "15"
                                }
                            }
                        }
                    ]
                };
                break;
        }
        echarts.init(this.$(`#${container}-container`)).setOption(option);
    }

    getNumber(data) {
        [
            { id: "fieldworkTotal", text: "外勤总人数：", data: data.waiTotal, style: `margin-top: 12px;` },
            { id: "fieldworkRatio", text: "外勤人数占比：", data: data.waiScale + "%", style: `background-size: 100%, ${data.waiScale}%; margin-top: 12px;` },
            { id: "todayRepairOrder", text: "今日报修订单总数：", data: data.todayOrder, style: "margin-top: 12px;" },
            { id: "todayRepairRecord", text: "今日维修记录总数：", data: data.todayLogs, style: "margin-top: 12px;" },
            { id: "total", text: "总人数：", data: data.userTotal },
            { id: "report", text: "报修订单：", data: data.orderTotal },
            { id: "complete", text: "完成订单：", data: data.orderOver }
        ].map(item => {
            this.$(`#${item.id}-container`).innerHTML = `
                <p>${item.text}</p>
                <div class="progress-bar" style="${item.style}" title="${item.data}">
                    <span style="width: 100%; ${((Number(item.data) || item.data == 0) && (item.text != "总人数：")) ? (item.data >= 80 ? `text-align: right;` : `padding-left: ${item.data}%`) : `text-align:center;`}">${item.data}</span>
                </div>
            `
        })
    }

    async getLocalInfo(localInfo) {
        if (localStorage.getItem("localInfo")) {
            localInfo = JSON.parse(localStorage.getItem("localInfo"));
        } else {
            localInfo = await fetch("https://www.tianqiapi.com/api/?appid=61491654&appsecret=1Yg7THbh&version=v6&cityid=101100717").then(res => res.json());
            localStorage.setItem("localInfo", JSON.stringify(localInfo));
        }

        Object.keys(localInfo).forEach(key => {
            if (!localInfo[key]) {
                localInfo[key] = "暂缺";
            }
        });

        if (localInfo.wea_img) {
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
        } else {
            this.$("#environmental-container").innerHTML = `<p class="text-center">${localInfo.errmsg}</p>`
        }
    }

    async refreshData() {
        const data = (await fetch("http://fix.shdong.cn/api/daping/lists").then(res => res.json())).result;
        [
            { id: "reportOrderList", param: "order" },
            { id: "reportRecordList", param: "logs" }
        ].forEach(item => {
            this.$(`#${item.id}-container`).innerHTML = `
            <table class="table f1" border="1">
                <tbody>
                ${data[item.param].map(item => (
                `<tr>
                    <td>${item.name}</td>
                    <td title="${item.text}">${(item.text.length > 7) ? (item.text.substring(0, 7) + "...") : item.text}</td>
                    <td>${item.time}</td>
                </tr>`
            )).join(String())}
                </tbody>
            </table>`
        });
    }
}
