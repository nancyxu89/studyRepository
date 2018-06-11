(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    factory(exports);
  } else {
    factory(root.jusfD3Force = root.jusfD3Force || {});
  }

})(typeof window != 'undefined' ? window : this, function (exports) {
  var d3 = require('d3/d3');
  if (typeof d3 === "undefined") throw new Error("Please include D3.js Library first.");
  /**
   * 泡沫云图.
   */
  var defaultOpt = {
      startColor: '',
      endColor: '',
      colorStep: 6,
    },
    padding = {
      left: 20,
      right: 30,
      top: 50,
      bottom: 20
    };

  /**
   * 获取节点权重
   * @param  {Node} d [description]
   * @return {Number}   [description]
   */
  function weightFunction(d) {
    return d.size || 1;
  };

  function labelFunction(d) {
    return d.name;
  };

  function cloneObj(oldObj) { //复制对象方法
    if (typeof(oldObj) != 'object') return oldObj;
    if (oldObj == null) return oldObj;
    var newObj = {};
    for (var i in oldObj)
      newObj[i] = cloneObj(oldObj[i]);
    return newObj;
  }

  /**
   * js原生extend
   * @returns {*}
   */
  function extendObj() {
    var args = arguments;
    if (args.length < 2) return;
    var defaultObj = args[0];

    var rawObj = cloneObj(defaultObj); //调用复制对象方法
    for (var n = 1; n < args.length; n++) {
      for (var i in args[n]) {
        rawObj[i] = args[n][i];
      }
    }
    return rawObj;
  }

  /**
   * 通过设置宽高拐点半径绘制提示框背景
   * @param w
   * @param h
   * @param cx
   * @param cy
   * @returns {string}
   */
  function getSVGPath(w, h, cx, cy) {
    var r = Math.sqrt(cx * cx + cy * cy);
    var pointer1 = {x: 0, y: cy};
    var pointer2 = {x: cx, y: 0};
    var pointer3 = {x: w + cx, y: 0};
    var pointer4 = {x: w + cx * 2, y: cy};
    var pointer5 = {x: w + cx * 2, y: h + cy};
    var pointer6 = {x: w + cx, y: h + cy * 2};
    var pointer7 = {x: cx, y: h + cy * 2};
    var pointer8 = {x: 0, y: h + cy};

    var pointer22 = {x: (pointer6.x + pointer7.x) / 2, y: pointer6.y + 8};
    var pointer11 = {x: pointer22.x + 6, y: pointer6.y};
    var pointer33 = {x: pointer22.x - 6, y: pointer6.y};

    var path = 'm {x1} {y1} a {cx1} {cy1} 0 0 1 {x2} {y2} l {x3} {y3} a {cx2} {cy2} 0 0 1 {x4} {y4} l {x5} {y5} a {cx3} {cy3} 0 0 1 {x6} {y6} l {px1} {py1} l {px2} {py2} l {px3} {py3} l {x7} {y7} a {cx4} {cy4} 0 0 1 {x8} {y8} l {x1} {y1}z';
    var result = path.replace('{x1}', pointer1.x)
      .replace('{y1}', pointer1.y)
      .replace('{cx1}', r)
      .replace('{cy1}', r)
      .replace('{x2}', pointer2.x - pointer1.x)
      .replace('{y2}', pointer2.y - pointer1.y)
      .replace('{x3}', pointer3.x - pointer2.x)
      .replace('{y3}', pointer3.y - pointer2.y)
      .replace('{cx2}', r)
      .replace('{cy2}', r)
      .replace('{x4}', pointer4.x - pointer3.x)
      .replace('{y4}', pointer4.y - pointer3.y)
      .replace('{x5}', pointer5.x - pointer4.x)
      .replace('{y5}', pointer5.y - pointer4.y)
      .replace('{cx3}', r)
      .replace('{cy3}', r)
      .replace('{x6}', pointer6.x - pointer5.x)
      .replace('{y6}', pointer6.y - pointer5.y)
      .replace('{px1}', pointer11.x - pointer6.x)
      .replace('{py1}', pointer11.y - pointer6.y)
      .replace('{px2}', pointer22.x - pointer11.x)
      .replace('{py2}', pointer22.y - pointer11.y)
      .replace('{px3}', pointer33.x - pointer22.x)
      .replace('{py3}', pointer33.y - pointer22.y)
      .replace('{x7}', pointer7.x - pointer33.x)
      .replace('{y7}', pointer7.y - pointer33.y)
      .replace('{cx4}', r)
      .replace('{cy4}', r)
      .replace('{x8}', pointer8.x - pointer7.x)
      .replace('{y8}', pointer8.y - pointer7.y)
      .replace('{x1}', pointer1.x - pointer8.x)
      .replace('{y1}', pointer1.y - pointer8.y);

    return result;
  }

  /**
   * 词云
   * @param {div} id容器
   * @param { Object } option  配置参数
   * @constructor
   */
  function BubbleCloudChart(id, option) {
    var el = document.getElementById(id);
    option = extendObj({}, defaultOpt, option);
    option.width = option.width || (el != null ? el.offsetWidth : 480);
    option.height = option.height || (el != null ? el.offsetHeight : 360);
    var me = this;

    me.domElement = el;
    me.domID = id;
    me.width = option.width || 480;
    me.height = option.height || 360;
    me.colors = option.colors || me.colors || new gradientColor(option.startColor, option.endColor, option.colorStep);
    option.colorFunction && (me.colorFunction = option.colorFunction);

    option.weightFunction && (me.weightFunction = option.weightFunction);
    option.labelFunction && (me.labelFunction = option.labelFunction);
    me.clickHandler = option.clickHandler;
    me._force = d3.layout.force()
      .gravity(0)
      .charge(0)
      .on("tick", function (d) {
        me._force_tickHandler.bind(me)(d);
      })
      .on("end", function (d) {
        me._tickEnd = true;
        me._bubbles.attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")"
        });
      });
    me._option = option;
  }

  BubbleCloudChart.prototype = {
    constructor: BubbleCloudChart,
    domID: '',
    /**
     * 绘制容器
     * @type {Element}
     */
    domElement: null,
    /**
     * 泡沫的最小半径.
     * @type {number}
     */
    minRadius: 20,
    /**
     * 泡沫的最大半径.
     * @type {number}
     */
    maxRadius: 50,
    /**
     * 名称的最小半径.
     * @type {number}
     */
    minFontSize: 10,
    /**
     * 名称的最大半径.
     * @type {number}
     */
    maxFontSize: 18,
    /**
     * 节点颜色
     * @type {Array}
     */
    colors: ['#FFA101', '#FEC834', '#FEC866', '#FEC434', '#FCDB7E', '#FCECCA'],
    /**
     * 自定义泡沫名称获取方法,可指定每个泡沫的名称.
     * @type {function}
     */
    labelFunction: function (d) {
      return d.name;
    },
    /**
     * 自定义泡沫权重获取方法,可指定每个泡沫的权重,将依据权重比率自动设置泡沫尺寸.
     * @type {function}
     */
    weightFunction: function (d) {
      var weight = (d.size || (d.value != undefined && d.value != '' && d.value != '-')) ? d.value : (Math.round(Math.random() * 30))
      return weight;
    },
    /**
     * 自定义泡沫颜色获取方法,可指定每个泡沫的颜色.
     * @type {function}
     */
    colorFunction: function (d) {

    },
    /**
     * 点击事件监听.
     * @type {function}
     */
    clickHandler: null,
    /**
     * 自定义绘制方法,若未设置则使用默认方法.
     * @type {function}
     */
    customDrawFunction: function (g, d, radius, color, index) {
      g.append("circle")
        .attr('colorType', color)
        .attr("r", radius)
        .style("fill", color)
        .style("opacity", "1");
    },
    /**
     * 泡沫间扩散距离的填充,可影响泡沫云图的疏密度.
     * @type {number}
     */
    collisionPadding: 5,
    /**
     * 泡沫间的最小扩散距离,可影响泡沫云图的疏密度.
     * @type {number}
     */
    minCollisionRadius: 30,
    iconPadding: 150,
    _repulsion: 0.818,
    _force: null,
    _svg: null,
    _ballGroup: null,
    _bubbles: null,
    _legend: null,
    _radiusScale: null,
    _fontSizeScale: null,
    _colorIndexScale: null,
    _width: 0,
    _height: 0,
    _tickEnd: false,
    _data: null,
    _schemas: null,//用于显示提示框信息
    _tooltipWidth: 170,//设置提示框效果
    _tooltipHeight: 80,
    _tooltipCX: 4,
    _tooltipCY: 4,
    _url: null,

    init: function () {
      var me = this;
      me._width = me.width - padding.right - padding.left;
      me._height = me.height - padding.top - padding.bottom;

      me._radiusScale = d3.scale.linear().range([me.minRadius, me.maxRadius]);
      me._fontSizeScale = d3.scale.linear().range([me.minFontSize, me.maxFontSize]);
      me._colorIndexScale = d3.scale.linear().range([0, me.colors.length - 1]);
      me._force.size([me._width, me._height]);

      d3.select(me.domElement).selectAll('svg').remove();
      me._svg = d3.select(me.domElement)
        .append("svg")
        .attr("width", me.width)
        .attr("height", me.height);

      //创建渐进色,用于mouseover时g的fill
      var defs = me._svg.append('defs');
      me._svg.selectAll('radialGradient').remove();

      for (var i = 0; i < me.colors.length; i++) {
        var radialGradient = defs.append('radialGradient')
          .attr('id', 'MyGradient' + me.colors[i]);
        radialGradient.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', me.colors[i]);
        radialGradient.append('stop')
          .attr('offset', '85%')
          .attr('stop-color', me.colors[i]);
        radialGradient.append('stop')
          .attr('offset', '86%')
          .attr('stop-color', 'white');
        radialGradient.append('stop')
          .attr('offset', '92%')
          .attr('stop-color', 'white');
        radialGradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', 'gold');
      }

      var styleConfig = '.tooltipContainerClass {display:-ms-flexbox;display:flex;align-items: center;border-radius:6px;width: 170px;height: 80px;position: absolute;border: solid 2px #E0E0E0;opacity:0;background-color:white;}' + '\n' +
        '.tooltipContainerClass::before, .tooltipContainerClass::after {font-size: 0;line-height: 0;content: \'\';position: absolute;display: block;left: 76px;bottom: -20px;border-width: 10px;border-style: solid dashed dashed solid;border-color: #E0E0E0 transparent transparent transparent;}' + '\n' +
        '.tooltipContainerClass::after{border-color: #fff transparent transparent transparent;bottom: -17px;}' + '\n' +
        '.hintColumnItem{margin:0px;padding:0px;}' + '\n' +
        '.categoryItemLf{font-size:14px;color: #cccccc;margin-left:16px;padding:0px;}' + '\n' +
        '.categoryItemRf{font-size:18px;color: gold;margin:0px;padding:0px}';


      var style = me._svg.append('style')
        .attr('type', 'text/css')
        .text(styleConfig);

    },
    setData: function (value) {
      var me = this;
      if (arguments.length < 1) return me._data;
      me._data = value || [];

      var labelFunction = me.labelFunction || labelFunction;
      var weightFunction = me.weightFunction || weightFunction;

      me._radiusScale.domain([
        d3.min(me._data, weightFunction),
        d3.max(me._data, weightFunction)
      ]);

      me._fontSizeScale.domain([
        d3.min(me._data, weightFunction),
        d3.max(me._data, weightFunction)
      ]);
      me._colorIndexScale.domain([
        d3.min(me._data, weightFunction) - 1,
        d3.max(me._data, weightFunction) + 1
      ]);
      me._svg.selectAll(".node").remove();

      me._ballGroup = me._svg.append("g")
        .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
        .attr("class", "node");

      me._bubbles = me._ballGroup.selectAll("g")
        .data(me._data)
        .enter()
        .append("g")
        .style("cursor", "pointer");

      var colorsLength = me.colors.length;
      me._bubbles.each(function (d, index) {
        var weight = weightFunction(d);
        var radius = me._radiusScale(weight);
        var color = me.colorFunction(d);
        if (!color) {
          //根据权值设置节点颜色
          var colorIndex = Math.round(me._colorIndexScale(weight));
          color = me.colors[colorsLength - colorIndex - 1];
        }

        if (color == undefined) {
          color = me.colors[Math.floor(Math.random() * colorsLength)];
          color = color || me.colors[colorsLength - 1];
        }

        return me.customDrawFunction(d3.select(this), d, radius, color, index);
      })
        .on('mouseover', function (d) {
          if ((d.value == undefined && d.name == undefined) ||
            ((d.value == '' || d.value == '-') && (d.name == '' || d.name == '-'))) {
            d3.select(this).style('cursor', 'default');
            return;
          }
          var color = d3.select(this).select('circle').attr('colorType');
          d3.select(this).select('circle').style('fill', function () {
            return 'url(#MyGradient' + color + ')'
          });
          d3.select(this).select('circle').attr('stroke-width', 1.2).attr('stroke', 'gold');

          me._showTooltip(d);
        })
        .on('mouseout', function (d) {
          var color = d3.select(this).select('circle').attr('colorType');
          d3.select(this).select('circle').style('fill', color);
          d3.select(this).select('circle').attr('stroke-width', 0);

          me._tooltipContainer.setAttribute('style', 'opacity:0');
        })
        .on('mouseup', function (d) {
          if ((d.value == undefined && d.name == undefined) ||
            ((d.value == '' || d.value == '-') && (d.name == '' || d.name == '-'))) {
            return;
          }
          if (me.clickHandler instanceof Function) me.clickHandler.call(null, d);
        });

      var textAll = me._bubbles.selectAll('text')
        .data(function (item) {
          var txts = labelFunction(item);
          if (!(txts instanceof Array)) {
            txts = [txts];
          }
          return txts.map(function (txt) {
            return {
              txt: txt,
              length: txts.length,
              fs: me._fontSizeScale(weightFunction(item))
            }
          })
        })
        .enter()
        .append("text")
        .attr({
          "text-anchor": "middle",
          "dy": function (item) {
            var len = item.length;
            var idx = arguments[1];
            return (-len * 1.2 / 2 + idx * 1.2 + 0.8) + 'em';
          },
          "font-size": function (item) {
            return item.fs
          },
          "fill": "#FFFFFF",
          "font-family": "微软雅黑",
          "cursor": 'pointer'
        });

      //text中添加tspan，用于超过4个字的分成2段显示
      var textSpans = textAll.each(function (d) {
        return d;
      })
        .selectAll('tspan')
        .data(function (d) {
          var length = d.txt != undefined ? d.txt.length : 0;
          var result = [{content: d.txt || '', isSingle: true}];
          if (length == 4) {
            result = [{content: d.txt.slice(0, 2)}, {content: d.txt.slice(2, 4)}]
          } else if (length > 5) {
            var middle = Math.round(length / 2);
            result = [{content: d.txt.slice(0, middle)}, {content: d.txt.slice(middle, length)}];
          }
          return result;
        })
        .enter()
        .append('tspan')
        .attr('x', function (d) {
          var dist = textAll.attr('dy').replace('em', '');
          return dist - 0.11 + 'em';
        })
        .attr('dy', function (item) {
          var len = item.content.length;
          if (item.isSingle) {
            return (-3 * 1.2 / 2 + 2.2) + 'em';
          }

          //出现2行文本时
          var idx = arguments[1];
          return (-(len > 2 ? 2 : len) * 1.2 / 2 + idx * 1.2 + 1.1) + 'em';
        })
        .text(function (d) {
          return d.content;
        });

      d3.select('body').select('#' + me.domID + 'TooltipContainer').remove();
      me._tooltipContainer = document.createElement('div');
      me._tooltipContainer.id = me.domID + 'TooltipContainer';
      me._tooltipContainer.setAttribute('class', 'tooltipContainerClass');
      // me._tooltipContainer.setAttribute('style', 'opacity:0;position:absolute;left:0;right:0');

      me._setTooltip();

      this._data.forEach(function (d, i) {
        d.fr = Math.max(me.minCollisionRadius, me._radiusScale(weightFunction(d)));
      });

      me._tickEnd = false;
      me._force.nodes(this._data).start();

      while (!me._tickEnd) {
        me._force.tick();
      }
    },
    resize: function () {
      var me = this;
      me.width = me.domElement != null ? me.domElement.offsetWidth : 480;
      me.height = me.domElement != null ? me.domElement.offsetHeight : 360;
      me.init();
      me.setData(me._data);
    },
    _setSchemas: function (schemas) {
      var me = this;
      me._schemas = schemas;
    },
    _setTooltip: function () {
      var me = this;
      var itemP;
      var middleDiv = document.createElement('div');


      for (var i = 0; me._schemas != null && i < me._schemas.length; i++) {
        itemP = document.createElement('p');
        itemP.setAttribute('class', 'hintColumnItem');
        var subItem1 = document.createElement('span');
        subItem1.id = me.domID + '-change-left-' + i;
        subItem1.setAttribute('class', 'categoryItemLf');
        subItem1.innerText = me._schemas[i].text + ':';
        var subItem2 = document.createElement('span');
        subItem2.id = me.domID + '-change-' + i;
        subItem2.setAttribute('class', 'categoryItemRf');
        itemP.appendChild(subItem1);
        itemP.appendChild(subItem2);

        middleDiv.appendChild(itemP);
      }


      if (me._schemas == null || me._schemas == 0) {
        itemP = document.createElement('p');
        itemP.setAttribute('class', 'hintColumnItem');
        var subItem1 = document.createElement('span');
        subItem1.id = me.domID + '-change-left-0';
        subItem1.setAttribute('class', 'categoryItemLf');
        subItem1.innerText = ':';
        var subItem2 = document.createElement('span');
        subItem2.id = me.domID + '-change-0';
        subItem2.setAttribute('class', 'categoryItemRf');
        itemP.appendChild(subItem1);
        itemP.appendChild(subItem2);

        middleDiv.appendChild(itemP);
      }

      me._tooltipContainer.appendChild(middleDiv);
      document.body.appendChild(me._tooltipContainer);
    },
    _showTooltip: function (gData) {
      var me = this;
      if (me._schemas != null && me._schemas.length > 0) {
        for (var i = 0; i < me._schemas.length; i++) {
          var unit = me._schemas[i]["unit"] || '';
          document.getElementById(me.domID + '-change-' + i).innerText = ' ' + gData[me._schemas[i]["icon"]] + unit;
        }
      } else {
        document.getElementById(me.domID + '-change-left-0').innerText = gData.name + ': ';
        document.getElementById(me.domID + '-change-0').innerText = ' ' + gData.value;
      }

      var event = d3.event || event || window.event;
      var left = (event.clientX - me._tooltipWidth / 2) + "px";
      var top = (event.clientY - me._tooltipHeight - gData.fr) + "px";//兼容性:Safari、chrome、Firefox、opera

      var style = 'opacity: 1;' + 'left:' + left + ';top:' + top;
      me._tooltipContainer.setAttribute('style', style);
    },
    _force_tickHandler: function (e) {
      this._bubbles.each(this._gravity(e.alpha * 0.1))
        .each(this._collide(this._repulsion));
    },
    _gravity: function (a) {
      var cx = this._width / 2;
      var cy = this._height / 2;
      var ax = a / 3;
      var ay = a;

      return function (d) {
        d.x += (cx - d.x) * ax;
        d.y += (cy - d.y) * ay;
      }
    },
    _collide: function (j) {
      var data = this._data;
      var collisionPadding = this.collisionPadding;
      return function (d) {
        data.forEach(function (d2) {
          if (d !== d2) {
            var x = d.x - d2.x;
            var y = d.y - d2.y;
            var dis = Math.sqrt(x * x + y * y);
            var minDis = d.fr + d2.fr + collisionPadding;
            if (dis < minDis) {
              dis = (dis - minDis) / dis * j;
              var mx = x * dis;
              var my = y * dis;
              d.x -= mx;
              d.y -= my;
              d2.x += mx;
              d2.y += my;
            }
          }
        });
      }
    },
    getChartSVGUrl: function () {
      var curChart = this;

      var serializer = new XMLSerializer();
      var source = serializer.serializeToString(curChart._svg.node());
      source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
      var svgUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
      return svgUrl;
    },
    download: function () {
      var curChart = this;
      var url = curChart.getChartSVGUrl();
      var canvas = document.createElement("canvas");

      canvas.width = curChart.width;
      canvas.height = curChart.height;

      var context = canvas.getContext("2d");
      var image = new Image;
      image.src = url;

      image.onload = function () {
        context.drawImage(image, 0, 0);
        var a = document.createElement("a");
        a.download = curChart.domID + ".png";
        a.href = canvas.toDataURL("image/png");
        a.click();
      };
    }
  }

  function gradientColor(startColor, endColor, step) {
    startRGB = this.colorRgb(startColor); //转换为rgb数组模式
    startR = startRGB[0];
    startG = startRGB[1];
    startB = startRGB[2];

    endRGB = this.colorRgb(endColor);
    endR = endRGB[0];
    endG = endRGB[1];
    endB = endRGB[2];

    sR = (endR - startR) / step; //总差值
    sG = (endG - startG) / step;
    sB = (endB - startB) / step;

    var colorArr = [];
    for (var i = 0; i < step; i++) {
      //计算每一步的hex值
      var hex = this.colorHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
      colorArr.push(hex);
    }
    return colorArr;
  }

  // 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
  gradientColor.prototype.colorRgb = function (sColor) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      var sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return sColorChange;
    } else {
      return sColor;
    }
  };

  // 将rgb表示方式转换为hex表示方式
  gradientColor.prototype.colorHex = function (rgb) {
    var _this = rgb;
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
      var strHex = "#";
      for (var i = 0; i < aColor.length; i++) {
        var hex = Number(aColor[i]).toString(16);
        hex = hex < 10 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    } else if (reg.test(_this)) {
      var aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      } else if (aNum.length === 3) {
        var numHex = "#";
        for (var i = 0; i < aNum.length; i += 1) {
          numHex += (aNum[i] + aNum[i]);
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }

  var drawBubbleCloud = function (id, datas, config) {
    var chart = new BubbleCloudChart(id, config);
    var schemas = datas.schemas != null ? datas.schemas : [];

    chart.init();
    chart._setSchemas(schemas);
    chart.setData(datas.data);

    return chart;
  }

  exports.drawBubbleCloud = drawBubbleCloud;

});
