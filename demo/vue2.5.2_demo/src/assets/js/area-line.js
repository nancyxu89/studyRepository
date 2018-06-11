export const AreaLine = {
  drawAearLine(datas, id, echarts) {
    var firstPoint = []
    var unit = '家'
    var xAxisData = datas.axisData.map(function(item, index) {
      if (index === 0) {
        firstPoint.push(item)
        return {value: item, textStyle: {align: 'left'}}
      } else {
        return item
      }
    })
    var seriesData = []
    var tmpItem = {
      data: datas.series[0].data.map(function(item, index) {
        if (index === 0) {
          firstPoint.push(item)
        }
        return 1
      }),
      type: 'line',
      symbol: 'none',
      itemStyle: {
        normal: {
          color: 'transparent'
        },
        emphasis: {
          color: 'transparent'
        }
      },
      markLine: {
        symbol: 'none',
        lineStyle: {
          normal: {
            type: 'solid',
            color: '#e2eaf0'
          }
        }
        // data: [[{"y": "48%", x: 45}, {"y": "48%", x: '98%'}],
        //   [{"y": 12, "x": 45}, {"y": 12, "x": "98%"}]]
      },
      z: 1,
      zlevel: 0,
      tooltip: {
        show: false
      }
    }
    seriesData.push(tmpItem)
    datas.series.map(function(item, index) {
      seriesData.push(
        {
          name: item.name,
          data: item.data,
          type: 'line',
          smooth: true,
          symbol: 'emptyCircle',
          symbolSize: 6,
          z: 10,
          itemStyle: {
            normal: {
              color: '#4c91d1'
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0, color: 'rgba(71, 169, 244, 0.39)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(200,236,255,0)' // 100% 处的颜色
              }], false)
            }
          },
          markArea: {
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0, color: 'rgba(229, 243, 255,0.1)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(255, 255, 255,0.1)' // 100% 处的颜色
                }], false)
              }
            },
            data: [[
              {
                y: '32'
              },
              {
                y: '90%'
              }
            ]]
          }
        }
      )
    })

    var myChart = echarts.init(document.getElementById(id))
    var option = {
      grid: {
        left: 0,
        right: '16px',
        top: '32px',
        bottom: '12px',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        showContent: true,
        axisPointer: {
          type: 'cross',
          lineStyle: {
            type: 'dash',
            color: '#015293'
          },
          crossStyle: {
            color: '#015293'
          }
        },
        formatter: function(params) {
          var val = params[0]
          return val.axisValue + '<br/>' + val.marker + val.seriesName + ':\t' + val.value + unit + '\t'
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#6a6a6a',
            align: 'right'
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        name: '单位:\t\t' + unit,
        type: 'value',
        nameTextStyle: {
          color: '#6a6a6a',
          padding: [0, 0, 0, 24]
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#6a6a6a'
          }
        },
        axisTick: {
          show: false
        }
      },
      series: seriesData
    }

    myChart.clear()
    myChart.setOption(option)
    /**
     * 以下代码,为了添加标线,模拟中间、顶部坐标轴分线
     */
    var ops = myChart.convertToPixel('grid', firstPoint)
    option.series[0].markLine['data'] = [[{'y': '50.5%', x: ops[0]}, {'y': '50.5%', x: '98%'}],
      [{'y': 32, 'x': ops[0]}, {'y': 32, 'x': '98%'}]]
    myChart.clear()
    myChart.setOption(option)
  }
}
