class Pages {
    constructor() {
        this.getLocalInfo();
        this.apiRequest();
        this.populationChart();
        this.coverageChart();
        this.attendanceChart();
        this.mapChart();
    }

    $ = selector => document.querySelector(selector);

    populationChart() {
        // 基于准备好的dom，初始化echarts实例
        let populationChart = echarts.init(this.$("#population-container"));
        let option = {
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
                name: '人口数量',
                data: [10, 23, 65, 36, 85, 43, 60],
                type: 'line',
                symbol: 'circle',
                // 设置折点大小
                symbolSize: 10,
                // 设置为光滑曲线
                smooth: true
            },]
        };
        // 使用刚指定的配置项和数据显示图表。
        populationChart.setOption(option);
    }

    coverageChart() {
        let coverageChart = echarts.init(this.$("#coverage-container"));
        let option = {
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    data: [
                        { value: 235, name: '视频广告' },
                        { value: 274, name: '联盟广告' },
                        { value: 310, name: '邮件营销' },
                        { value: 335, name: '直接访问' },
                        { value: 400, name: '搜索引擎' }
                    ]
                }
            ]
        }
        coverageChart.setOption(option);
    }

    attendanceChart() {
        let attendanceChart = echarts.init(this.$("#attendance-container"));
        let option = {
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
        // 使用刚指定的配置项和数据显示图表。
        attendanceChart.setOption(option);
    }

    mapChart() {
        let mapChart = echarts.init(this.$("#map-container"));

        mapChart.setOption({
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
                    areaColor: 'rgb(0,111,195)', //地图区域的颜色。
                    borderColor: 'rgb(129,202,244)', //边框线
                },
                emphasis: {//高亮状态下的多边形和标签样式。
                    label: {//文本
                        color: '#ADA',
                    },
                    itemStyle: {//区域
                        areaColor: 'rgb(0,152,198)'
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
        })
    }

    unitsNumberChart(container, params) {
        let totalChart = echarts.init(this.$(container));
        // 绘制图表
        totalChart.setOption({
            grid: {   // 直角坐标系内绘图网格
                containLabel: true   //gid区域是否包含坐标轴的刻度标签。为true的时候，
            },
            xAxis: {  //直角坐标系grid中的x轴,
                type: 'value',//坐标轴类型,分别有：
                splitLine: { show: false },//坐标轴在 grid 区域中的分隔线
                axisLabel: { show: false },//坐标轴刻度标签
                axisTick: { show: false },//坐标轴刻度
                axisLine: { show: false },//坐标轴轴线
            },
            yAxis: {
                type: 'category',
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: {
                    color: '#fff',
                    fontSize: 18
                },
                data: [params.title]//类目数据，在类目轴（type: 'category'）中有效。
            },
            series: [//系列列表。每个系列通过 type 决定自己的图表类型
                {
                    name: params.unit,//系列名称
                    type: 'bar',//柱状、条形图
                    barWidth: 22,//柱条的宽度,默认自适应
                    data: [params.number],//系列中数据内容数组
                    label: { //图形上的文本标签
                        show: true,
                        formatter: '{c}{a}',//标签内容格式器 {a}-系列名,{b}-数据名,{c}-数据值
                        color: '#fff',//标签字体颜色
                        fontSize: 18  //标签字号
                    },
                    itemStyle: {//图形样式
                        normal: {
                            barBorderRadius: 10,
                        }
                    },
                    color: "#22B6ED",
                    zlevel: 1//柱状图所有图形的 zlevel 值,
                },
                params.number &&
                {
                    type: 'bar',
                    barGap: '-100%',//不同系列的柱间距离，为百分比。
                    barWidth: 22,
                    data: [params.count],
                    color: '#fff',//柱条颜色
                    itemStyle: {
                        normal: {
                            barBorderRadius: 10
                        }
                    }
                }
            ]
        });
    }

    getLocalInfo() {
        let params = [
            "appid=61491654",
            "appsecret=1Yg7THbh",
            "version=v6",
            // "cityid=101100717"
        ]
        let url = "https://www.tianqiapi.com/api/?";

        url += params.join("&");

        fetch(url).then(res => res.json())
            .then(res => {
                this.$("#environmental-container").innerHTML = `
                <ul id="weather" class="jc-sa fd-column">
                    <li class="weather-item jc-sa ai-center">
                        <img src="./src/images/${res.wea_img}.png" />
                        <p>[ ${res.city} ]  更新时间：${res.date} ${res.week} ${res.update_time}</p>
                    </li>
                    <li class="weather-item mb-12 jc-sa">
                        <p class="fs-20">${res.wea}</p>
                        <p>${res.tem}℃ ~ ${res.tem1}℃ ~ ${res.tem2}℃</p>
                        <p>湿度：${res.humidity}</p>
                    </li>
                    <li class="weather-item">
                        <p class="f1">风向：${res.win}</p>
                        <p class="f1">风速等级：${res.win_speed}</p>
                        <p class="f1 nowrap">风速：${res.win_meter}</p>
                    </li>
                    <li class="weather-item">
                        <p class="f1">能见度：${res.visibility}</p>
                        <p class="f1">PM2.5：${res.air_pm25}</p>
                        <p class="f1">气压：${res.pressure}</p>
                    </li>
                    <li class="weather-item">
                        <p class="f1">空气质量：${res.air}</p>
                        <p class="f2">空气质量等级：${res.air_level}</p>
                    </li>
                    <li class="weather-item">
                        <p class="f1">${res.air_tips}</p>
                    </li>
                </ul>
            `
            })
    }

    async apiRequest() {
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

        this.unitsNumberChart("#total-container", {
            title: "单位总人数：",
            unit: "人",
            number: data.userTotal,
            count: data.userTotal
        });
        this.unitsNumberChart("#fieldwork-container", {
            title: "外勤人数占比：",
            unit: "%",
            number: data.waiScale,
            count: 100
        });
        this.unitsNumberChart("#fieldworkRatio-container", {
            title: "当前外勤在外人数：",
            unit: "人",
            number: data.waiOline,
            count: data.waiOline
        });
        this.unitsNumberChart("#report-container", {
            title: "累计报修数：",
            unit: "件",
            number: data.orderTotal,
            count: data.orderTotal
        });
        this.unitsNumberChart("#complete-container", {
            title: "维修完成数：",
            unit: "件",
            number: data.orderOver,
            count: data.orderOver
        });
        this.unitsNumberChart("#fieldworkTotal-container", {
            title: "外勤总人数：",
            unit: "人",
            number: data.waiTotal,
            count: data.waiTotal
        });
    }
}
