/**
 * Created by lvzhaohua on 17/3/3.
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    factory(exports);
  } else {
    factory(root.jusfEcharts = root.jusfEcharts || {});
  }

})(
  typeof  window != 'undefined' ? window : this, function (exports) {
    var version = '1.0.0';

    var globalConfig = {
      commonTextColor: '#969696',
      commonFontSize: 14
    };

    /**
     * 通过div的id初始化成功chart，并返回
     * @param id
     * @returns {{myChart: *, gECharts: *, height: number}}
     */
    function getChart(id) {
      var myChart;
      var gECharts;
      try {
        var ec = require('echarts');
        gECharts = ec;
      } catch (err) {
        gECharts = echarts;
      }
      if (gECharts != null) {
        myChart = gECharts.init(document.getElementById(id), '-', 300);
      }

      var chartDivHeightRaw = document.getElementById(id).style.height;
      var chartDivHeight = document.getElementById(id).querySelector('div').style.height;
      var chartHeight = (chartDivHeightRaw != undefined && chartDivHeightRaw != '') ? chartDivHeightRaw :
        (chartDivHeight != undefined && chartDivHeight != '') ? chartDivHeight : '200';
      var height = chartHeight.replace('px', '');
      return {
        myChart: myChart,
        gECharts: gECharts,
        height: Number(height)
      }
    }

    /**
     * 获取已绘制单个图形的base64的url
     *
     * @param chart
     * @param params
     * @returns {string}
     */
    function getChartBase64Url(chart, params) {
      var url = '';
      try {
        if (params == undefined) {
          url = chart.getDataURL({
            excludeComponents: ['toolbox']
          });
        } else {
          url = chart
            .getDataURL({
              type: params.type != null ? params.type : 'png',
              pixelRatio: params.pixelRatio != null ? params.pixelRatio
                : 1,
              backgroundColor: params.backgroundColor != null ? params.backgroundColor
                : '#fff',
              excludeComponents: ['toolbox']
            });
        }
      } catch (err) {
        console.error(err)
      }

      return url;
    }


    /**
     * 赋值
     * @param obj
     * @param fromObj
     */
    function setOptionParam(fromObj, defaultObj) {
      return fromObj || defaultObj || {};
    }

    /**
     * 设置图形的基option
     * @param datas
     * @param defaultParams，{tooltipHint:function(params){},legendIsShow:true},提供不同绘制方法设置tooltip和legend是否show等等
     */
    function setBaseOption(datas, defaultParams) {
      var title = setOptionParam(datas.title);
      var tooltip = setOptionParam(datas.tooltip);
      var legend = setOptionParam(datas.legend);
      var toolbox = setOptionParam(datas.toolbox);
      var defaultParams = setOptionParam(defaultParams);

      var baseOption = {
        backgroundColor: datas.backgroundColor != null ? datas.backgroundColor : 'transparent',
        title: {
          show: title.isShow != null ? title.isShow : false,
          text: title.text != null ? title.text : '',
          x: 13,
          top: '1%',
          textStyle: {
            color: '#fff',
            fontSize: 18
          }
        },
        tooltip: {
          show: tooltip.isShow != null ? tooltip.isShow : true,
          trigger: defaultParams.trigger || 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: defaultParams.axisPointerType || 'line', // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {
              color: 'white',
              shadowBlur: 6,
              width: 2,
              shadouwColor: 'rgba(249,250,254,0.5)'
            },
            shadowStyle: {
              color: 'transparent'
            }
          },
          extraCssText: 'box-shadow: 8 1 3px #E2E3E7;',
          borderColor: '#E2E3E7',
          borderWidth: 2,
          padding: [12, 14, 10, 16],
          backgroundColor: "rgba(255,255,255,0.9)",
          formatter: function (params) {
            if (defaultParams.tooltipHint != undefined && defaultParams.tooltipHint instanceof Function) {
              return defaultParams.tooltipHint(params);
            }

            var hint = ( params.name || "") + '\t' + ':' + '\t' + (params.value != null ? params.value : "'-'");

            return hint;
          },
          textStyle: {
            color: globalConfig.commonTextColor,
            fontSize: globalConfig.commonFontSize
          }
        },
        legend: {
          data: legend.data || [],
          show: legend.isShow != undefined ? legend.isShow : (defaultParams.legendIsShow != undefined ? defaultParams.legendIsShow : false),
          left: 'center',
          width: '90%',
          y: '1.5%',
          itemHeight: 7,
          itemWidth: 15,
          orient: 'horizontal',
          textStyle: {
            fontSize: globalConfig.commonFontSize,
            color: globalConfig.commonTextColor
          }
        },
        toolbox: {
          right: '30',
          y: '1.5%',
          show: toolbox.isShow != undefined ? toolbox.isShow : true,
          feature: {
            saveAsImage: {
              show: true,
              backgroundColor: toolbox.backgroundColor || '#ffffff',
              iconStyle: {
                normal: {
                  borderColor: '#0084ff'
                }
              }
            }
          }
        },
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut'
      };

      if (datas.colors != undefined) {
        baseOption.color = datas.colors;
      } else if (datas.colors == null) {
        var length = 0;
        if (datas.series != undefined) {
          length = datas.series.length;
        }
        else {
          length = baseOption.legend.data.length;
        }

        var rawColors = defaultParams.colors || [];
        var colors = rawColors.concat(['#6190E3', '#F9BC2B', '#72AC4D', '#F36262', '#F78B44',
          '#5E9CD3', '#F09E69', '#B4B4B4', '#FDBF2D', '#18A92E',
          '#FC4920', '#FC7B2C']);

        var m = Math.floor(length / colors.length);
        var n = length % colors.length;
        var tColors = [];
        for (var i = 0; i < m; i++) {
          tColors = tColors.concat(colors);
        }
        tColors = tColors.concat(colors.slice(0, n));
        baseOption.color = tColors;
      }

      baseOption.legend.data = baseOption.legend.data.map(function (item) {
        return {
          name: item || '',
          icon: 'path://m 200 100 l 0 -20 c 30 -35 55 40 75 0 l 0 20 c -20 30 -55 -50 -75 0z'//波浪号
        }
      });

      return baseOption;
    }


    /**
     * 添加图形事件
     *
     * @param myChart
     * @param param
     */
    function addChartEvents(myChart, param) {
      if (param.clickFn != null && param.clickFn instanceof Function
        && param.clickParam != null) {
        myChart
          .on(
            'click',
            function (params) {
              if (param.clickParam instanceof Array) {
                var arrayP = [];
                for (var i = 0; i < param.clickParam.length; i++) {
                  arrayP
                    .push(params.data[param.clickParam[i]] != null ? params.data[param.clickParam[i]]
                      : params[param.clickParam[i]])
                }
                param.clickFn(arrayP);
              } else {
                param
                  .clickFn(params.data[param.clickParam] != null ? params.data[param.clickParam]
                    : params[param.clickParam])
              }
            })
      }
    }

    function drawBarModel(id, datas, type) {
      var chart = getChart(id);
      var myChart = chart.myChart;
      var curChart = this;
      curChart._ec = chart.gECharts;
      curChart._schemas = datas.schemas;

      try {
        // DOM重用时，清除遗留的图表信息
        if (myChart != null) {
          myChart.clear();

          // 设置option
          var option = {};
          if (type == 0) {
            option = curChart.initHrzBarOption(datas);
          }

          myChart.setOption(option);
          curChart._myChart = myChart;
        }
      } catch (err) {
        console.error(err)
      }
    }

    drawBarModel.prototype = {
      constructor: drawBarModel,
      _myChart: null,
      _ec: null,
      _schemas: null,//提示内容只有一组数据时，按照该内容进行提示
      _tooltipHint: function (params) {
        var curItem = this;
        var name = '';
        var hint = '';
        if (params instanceof Array) {
          if (curItem.schemas != null && curItem.schemas.length > 0 && params.length == 1) {
            var schemas = curItem.schemas;
            for (var k = 0; k < schemas.length; k++) {
              hint = hint + schemas[k].text + '：'
                + '<span style="color:' + (k == 0 || k == 1 ? '#FF7302;font-size:18px' : '#AA988A;font-size:14px')
                + ';margin-top: 5px;margin-bottom: 4px">'
                + (params[0].value != null ? (params[0].value[schemas[k].index] != null ? (params[0].value[schemas[k].index] + (schemas[k].unit || '')) : "'-'") : "'-'")
                + '</span><br>';
            }

            return hint;
          }

          /**
           * 多组数据提示内容如下
           */
          name = params[0].name;
          var pMul = Math.ceil(params.length / 10);

          var headHint = '<p style="font-size: 14px;color:#474747;margin-top: 4px;margin-bottom: 4px">' + name + '</p>';
          var total = 0;
          for (var i = params.length - 1; i < params.length && i > -1; i--) {
            var value = params[i];
            hint = hint + value.seriesName + '：'
              + '<span style="font-size: 18px;'
              + 'color:' + (value.color || '#969696')
              + ';margin-top: 5px;margin-bottom: 4px">' + (value.value != null ? value.value : ("'-'")) + (curItem.unit || '')
              + '</span>'
              + (pMul > 1 ? ((i + 1) % pMul == 0 ? '<br>' : ',\t') : '<br>');
            total = total + Number(value.value);
          }

          if (curItem.extraSchemas != null) {
            headHint = headHint
              + curItem.extraSchemas + '：'
              + '<span style="font-size: 18px;color:#777777;margin-top: 5px;margin-bottom: 4px">'
              + total + (curItem.unit || '') + '</span>' + '<br>';
          }

          hint = headHint + hint;

        } else {
          hint = params.seriesName + ': \t' + params.value;
        }

        return hint;
      },
      setGridConfig: function (option, datas, otherParam) {
        var xAxis = setOptionParam(datas.xAxis);
        var yAxis = setOptionParam(datas.yAxis);
        var otherParams = setOptionParam(otherParam);
        var series = setOptionParam(datas.series, []);
        var legendData = setOptionParam(setOptionParam(datas.legend).data, []);

        var legendIsShow = option.legend.show;
        var length = series.length > legendData.length ? legendData.length : series.length;

        var gridTop = (function (isShow, length) {
          var top = 50;
          if (isShow && length != null) {
            top = top + Math.ceil(length / 6) * 18;
          }
          return top;
        }(legendIsShow, length));

        option.yAxis = {
          type: 'category',
          name: yAxis.name || '',
          boundaryGap: false,
          data: yAxis.data,
          inverse: true,
          nameTextStyle: {
            color: globalConfig.commonTextColor,
            fontSize: globalConfig.commonFontSize
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: otherParams.axisLineShow != null ? otherParams.axisLineShow : true,
            lineStyle: {
              color: '#E2E0E3'
            }
          },
          axisLabel: {
            textStyle: {
              color: globalConfig.commonTextColor,
              fontSize: globalConfig.commonFontSize
            }
          }
        };
        option.xAxis = {
          type: 'value',
          name: xAxis.name || '',
          nameLocation: 'end',
          nameGap: 20,
          nameTextStyle: {
            color: globalConfig.commonTextColor,
            fontSize: globalConfig.commonFontSize
          },
          axisLabel: {
            show: false,
            textStyle: {
              color: globalConfig.commonTextColor,
              fontSize: globalConfig.commonFontSize
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        };
        option.grid = {
          show: true,//默认不显示
          left: 35,
          right: 50,
          top: gridTop || 50,
          bottom: '2%',
          containLabel: true,
          borderWidth: 0
        };

        if (xAxis.max) {
          option.xAxis.max = xAxis.max;
        }
      },
      initHrzBarOption: function (datas) {
        var curChart = this;
        var defaultParams = {
          legendIsShow: true,
          schemas: curChart._schemas,
          extraSchemas: datas.extraSchemas || '全部舆情',
          unit: '件',
          tooltipHint: curChart._tooltipHint,
          axisPointerType: 'shadow',
          colors: ['#30B7F7', '#FF8F45', '#7CC9F5', '#8ED585', '#FFBE77', '#F67587', '#9591CC']
        };

        var option = setBaseOption(datas, defaultParams);

        curChart.setGridConfig(option, datas);
        option.series = curChart.getHrzBarSeries(datas.series);

        return option;
      },
      getHrzBarSeries: function (seriesData) {
        var series = [];
        if (seriesData != null) {
          for (var i = 0; i < seriesData.length; i++) {
            var item = {
              type: 'bar',
              name: seriesData[i].name || '',
              stack: seriesData[i].stack,
              data: seriesData[i].data || [],
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  offset: [0, -2],
                  textStyle: {
                    color: globalConfig.commonTextColor,
                    fontSize: globalConfig.commonFontSize
                  },
                  formatter: function (params) {
                    if (params.seriesIndex != seriesData.length - 1) {
                      return '';
                    }
                    var total = 0;
                    for (var j = 0; j < seriesData.length; j++) {
                      total = total + seriesData[j].data[params.dataIndex];
                    }
                    return total;
                  }
                }
              },
              barMaxWidth: 26,
              itemStyle: {
                normal: {
                  borderWidth: 3,
                  borderColor: 'white'
                },
                emphasis: {
                  barWidth: 60,
                  shadowColor: '#A4A4A4',
                  shadowBlur: 8
                }
              }
            };

            series.push(item);
          }
        }

        return series;
      },
      addChartEvents: function (param) {
        var curParams = param || {};
        var curChart = this;
        addChartEvents(curChart._myChart, curParams);
      },
      getChartBase64Url: function (param) {
        var curParams = param || {};
        var curChart = this;
        return getChartBase64Url(curChart._myChart, curParams);
      },
      clear: function () {
        var curChart = this;
        curChart._myChart.clear();
      }
    }

    var eBar = {
      /**
       * 绘制水平方向
       * @param id
       * @param datas
       * @param param
       */
      drawHrzBar: function (id, datas, param) {
        var type = 0;//绘制水平方向的叠加柱状图
        var chart = new drawBarModel(id, datas, type);
        if (param != null) {
          chart.addChartEvents(param);
        }
        return chart;
      }
    };

    /**
     * 绘制普通折线图
     * @param id
     * @param datas
     * @param param
     */
    function drawLineModel(id, datas, type) {
      var chart = getChart(id);
      var myChart = chart.myChart;
      var curChart = this;
      curChart._ec = chart.gECharts;//获取echarts事例，可用于后续new
      curChart._schemas = datas.schemas != null ? datas.schemas : [];

      try {
        // DOM重用时，清除遗留的图表信息
        if (myChart != null) {
          myChart.clear();

          // 根据绘制类型type，获取设置option
          var option = {};
          if (type == 0) {
            option = curChart.initCommonLineOption(datas);
          } else if (type == 1) {
            option = curChart.initAreaLineOption(datas);
          }

          myChart.setOption(option);
          curChart._myChart = myChart;
        }
      } catch (err) {
        console.error(err)
      }
    }

    drawLineModel.prototype = {
      constructor: drawLineModel,
      _myChart: null,
      _schemas: null,
      _ec: null,
      _tooltipHint: function (params) {
        var curItem = this;
        var name = '';
        var hint = '';
        if (params instanceof Array) {
          if (curItem.schemas != null && curItem.schemas.length > 0 && params.length == 1) {
            var schemas = curItem.schemas;
            for (var k = 0; k < schemas.length; k++) {
              hint = hint + schemas[k].text + '：'
                + '<span style="color:' + (k == 0 || k == 1 ? '#FF7302;font-size:18px' : '#AA988A;font-size:14px')
                + ';margin-top: 5px;margin-bottom: 4px">'
                + (params[0].value != null ? (params[0].value[schemas[k].index] != null ? (params[0].value[schemas[k].index] + (schemas[k].unit || '')) : '-') : '-')
                + '</span><br>';
            }

            return hint;
          }

          /**
           * 多组数据提示内容如下
           */
          name = params[0].name;
          var pMul = Math.ceil(params.length / 10);

          hint = '<p style="font-size: 16px;color:#969696;margin-top: 4px;margin-bottom: 4px">' + name + '</p>';
          for (var i = 0; i < params.length; i++) {
            var value = params[i];
            var arr = value.value;
            if ((arr instanceof Array ) && arr.length > 0) {
              var length = arr.length;
              var startEnd = [[1, 0], [1, 2]];
              var getStartEnd = (length == 2 ? startEnd[0] : (length > 2 ? startEnd[1] : [0, 0]));
              hint = hint + (length != 1 ? ( arr[getStartEnd[1]] + '\t:\t' + '<span style="font-size: 16px;'
                + 'color:#FF7302;margin-top: 5px;margin-bottom: 4px">' + arr[getStartEnd[0]] + '</span>' + '<br>') : '');
            } else {
              hint = hint + value.seriesName + '：'
                + '<span style="font-size: 16px;'
                + 'color:' + (value.color || '#969696')
                + ';margin-top: 5px;margin-bottom: 4px">' + (value.value != null ? value.value : "'-'") + (curItem.unit || '')
                + '</span>'
                + (pMul > 1 ? ((i + 1) % pMul == 0 ? '<br>' : ',\t') : '<br>');
            }
          }

        } else {
          hint = params.seriesName + ': \t' + params.value;
        }

        return hint;
      },
      getDataZoom: function (option, datas, xAxis) {
        //设置X轴的缩放控件
        if ((datas.dataZoomIsShow != null && datas.dataZoomIsShow) || (xAxis.data.length > 13)) {
          option.grid.bottom = '46';
          option.grid.left = '50';
          option.grid.right = '86';
          option.dataZoom = [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0]
            },
            {
              type: 'inside',
              xAxisIndex: [0]
            }
          ];
          if (datas.dataZoomData != null && datas.dataZoomData.startValue != null && datas.dataZoomData.endValue != null) {
            option.dataZoom[0].startValue = datas.dataZoomData.startValue;
            option.dataZoom[0].endValue = datas.dataZoomData.endValue;
            option.dataZoom[1].startValue = datas.dataZoomData.startValue;
            option.dataZoom[1].endValue = datas.dataZoomData.endValue;
          } else {
            // var xAxisData = xAxis.data;
            // var length = xAxisData.length;
            // option.dataZoom[0].startValue = xAxisData[length - 7];
            // option.dataZoom[0].endValue = xAxisData[length - 1];
            // option.dataZoom[1].startValue = xAxisData[length - 7];
            // option.dataZoom[1].endValue = xAxisData[length - 1];
          }
        }
      },
      setGridConfig: function (option, datas, otherParam) {
        var curChart = this;

        var xAxis = setOptionParam(datas.xAxis);
        var yAxis = setOptionParam(datas.yAxis);
        var otherParams = setOptionParam(otherParam);
        var series = setOptionParam(datas.series, []);
        var legendData = setOptionParam(setOptionParam(datas.legend).data, []);

        var legendIsShow = option.legend.show;
        var length = series.length > legendData.length ? legendData.length : series.length;

        var gridTop = (function (isShow, length) {
          var top = 50;
          if (isShow && length != null) {
            top = top + Math.ceil(length / 6) * 18;
          }
          return top;
        }(legendIsShow, length));

        option.xAxis = {
          type: 'category',
          name: xAxis.name || '',
          boundaryGap: false,
          data: xAxis.data,
          nameTextStyle: {
            color: globalConfig.commonTextColor,
            fontSize: globalConfig.commonFontSize
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: otherParams.axisLineShow != null ? otherParams.axisLineShow : true,
            lineStyle: {
              color: '#D0CECF'
            }
          },
          axisLabel: {
            textStyle: {
              color: globalConfig.commonTextColor,
              fontSize: globalConfig.commonFontSize
            }
          }
        };
        option.yAxis = {
          type: 'value',
          name: yAxis.name || '',
          nameLocation: 'end',
          nameGap: 20,
          // interval: otherParams.interval || 50,//以50为单位显示y轴标签
          nameTextStyle: {
            color: globalConfig.commonTextColor,
            fontSize: globalConfig.commonFontSize
          },
          axisLabel: {
            textStyle: {
              color: globalConfig.commonTextColor,
              fontSize: globalConfig.commonFontSize
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#EAEAEC'
            }
          }
        };
        option.grid = {
          show: true,//默认不显示
          left: 35,
          right: 50,
          top: gridTop || 35,
          bottom: '2%',
          containLabel: true,
          borderWidth: 0,
          backgroundColor: new (curChart._ec).graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(170,213,248,0.05)' // 0% 处的颜色
            },
            {
              offset: 0.8,
              color: 'rgba(170,213,248,0.07)' // 70% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(170,213,248,0.1)' // 100% 处的颜色
            }], false)
        };

        if (yAxis.max) {
          option.yAxis.max = yAxis.max;
        } else {
          /**
           * 根据项目需求,添加max
           */
          var arr = [];
          var max = 0;
          var series = datas.series != null ? datas.series : [];
          if (otherParam == null) {
            for (var i = 0; i < series.length; i++) {
              var curMax = Math.max.apply(null, series[i].data);
              if (max < curMax) {
                max = curMax;
              }
            }
          } else {
            series.map(function (item) {
              item.data.map(function (subItem) {
                arr.push(subItem[1]);
              })
            })

            max = Math.max.apply(null, arr);
          }

          option.yAxis.max = max + 10;
          // if (max < 50) {
          //   option.yAxis.max = 50;
          // } else if (max < 200 && max >= 50) {
          //   option.yAxis.max = 200;
          // }
        }

        if (otherParams.interval != null) {
          option.yAxis.interval = otherParams.interval;
        }

        //设置X轴的缩放控件
        curChart.getDataZoom(option, datas, xAxis);
      },
      initCommonLineOption: function (datas) {
        var curChart = this;
        var defaultParams = {
          legendIsShow: true,
          schemas: curChart._schemas,
          tooltipHint: curChart._tooltipHint,
          colors: ['#336CAF', '#7CC9F5', '#8ED585', '#FFBE77', '#F67587', '#9591CC']
        };

        var option = setBaseOption(datas, defaultParams);

        curChart.setGridConfig(option, datas);
        option.series = curChart.getCommonLineSeries(datas.series);

        return option;
      },
      initAreaLineOption: function (datas) {
        var curChart = this;
        var defaultParams = {
          legendIsShow: false,
          schemas: curChart._schemas,
          tooltipHint: curChart._tooltipHint,
          colors: ['#709FD3', '#7CC9F5', '#8ED585', '#FFBE77', '#F67587', '#9591CC']
        };

        var option = setBaseOption(datas, defaultParams);

        curChart.setGridConfig(option, datas, {axisLineShow: false});//实际数据太大,修改配置
        // curChart.setGridConfig(option, datas, {interval: 25, axisLineShow: false});
        option.series = curChart.getAreaLineSeries(datas.series);

        return option;
      },
      getCommonLineSeries: function (seriesData) {
        var series = [];
        if (seriesData != null) {
          for (var i = 0; i < seriesData.length; i++) {
            var isShowSymbol = (seriesData[i].data != null && seriesData[i].data.length == 1) ? true : false;
            var item = {
              name: seriesData[i].name || '',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 8,
              showSymbol: isShowSymbol,
              data: seriesData[i].data || [],
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                emphasis: {
                  borderWidth: 3,
                  borderColor: 'white',
                  shadowColor: '#D6D7D9',
                  shadowBlur: 8
                }
              },
              markPoint: {
                data: seriesData[i].pointData || []
              }
            };

            series.push(item);
          }
        }

        return series;
      },
      getAreaLineSeries: function (seriesData) {
        var series = [];

        if (seriesData != null) {
          for (var i = 0; i < seriesData.length; i++) {
            var isShowSymbol = (seriesData[i].data != null && seriesData[i].data.length == 1) ? true : false;
            var item = {
              name: seriesData[i].name || '',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 8,
              areaStyle: {
                normal: {
                  opacity: 0.7,
                }
              },
              showSymbol: isShowSymbol,
              data: seriesData[i].data || [],
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                emphasis: {
                  borderWidth: 3,
                  borderColor: 'white',
                  shadowColor: '#D6D7D9',
                  shadowBlur: 8
                }
              },
              markPoint: {
                data: seriesData[i].pointData || []
              }
            };

            series.push(item);
          }
        }
        return series;
      },
      addChartEvents: function (param) {
        var curParams = param || {};
        var curChart = this;
        addChartEvents(curChart._myChart, curParams);
      },
      getChartBase64Url: function (param) {
        var curParams = param || {};
        var curChart = this;
        return getChartBase64Url(curChart._myChart, curParams);
      },
      clear: function () {
        var curChart = this;
        curChart._myChart.clear();
      }
    }


    var eLine = {
      /**
       * 案列：舆情分析--企业舆情趋势分析折线图
       * @param id,容器的id
       * @param datas，图形所需数据
       * @param param，额外配置，如：点击事件处理等
       * @returns {*}
       */
      drawCommonLine: function (id, datas, param) {
        var type = 0;//绘制多条折线图，无areaStyle
        var chart = new drawLineModel(id, datas, type);
        if (param != null) {
          chart.addChartEvents(param);
        }

        return chart;
      },
      drawAreaLine: function (id, datas, param) {
        var type = 1;//绘制区域折线图，有areaStyle
        var chart = new drawLineModel(id, datas, type);
        if (param != null) {
          chart.addChartEvents(param);
        }

        return chart;
      }
    }

    exports.version = version;
    exports.eBar = eBar;
    exports.eLine = eLine;
  }
);
